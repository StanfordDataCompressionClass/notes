Let us go over the main library structure.

## Library Structure -- Useful Building Blocks
The main library folder is `scl`. The `scl` directory structure is as follows:

```
├── compressors
│   ├── arithmetic_coding.py
│   ├── elias_delta_uint_coder.py
│   ├── fano_coder.py
│   ├── fixed_bitwidth_compressor.py
│   ├── ... (more compressors)
├── core
│   ├── data_block.py
│   ├── data_encoder_decoder.py
│   ├── data_stream.py
│   ├── encoded_stream.py
│   └── prob_dist.py
├── external_compressors
│   ├── pickle_external.py
│   ├── zlib_external.py
│   └── zstd_external.py
└── utils
    ├── bitarray_utils.py
    ├── misc_utils.py
    ├── test_utils.py
    └── tree_utils.py
```

The directories are self-explanatory, but here are some more details:
- [/core](https://github.com/kedartatwawadi/stanford_compression_library/tree/main/scl/core): This contains the core part of the library which is common to almost all compressors. For eg: classes to represent input data, encoded bitarrays, Encoders, Decoders
- [/compressors](https://github.com/kedartatwawadi/stanford_compression_library/tree/main/scl/compressors): This includes compressors implemented natively in SCL. 
- [/external_compressors](https://github.com/kedartatwawadi/stanford_compression_library/tree/main/scl/external_compressors): SCL-like interface to external compressors (such as `zlib` etc.) 
- [/utils](https://github.com/kedartatwawadi/stanford_compression_library/tree/main/scl/utils): general utility functions for debugging, bitarray manipulation, testing etc. 

## 1. The `core` library

We noticed that most of the compressors share a lot of commonalities. For example, a lot of them encode data in blocks and write to bits. The core library implements the basic frameworks and classes common to all compressors. We elaborate some of them below. 

### 1.1 [DataBlock](https://github.com/kedartatwawadi/stanford_compression_library/blob/main/scl/core/data_block.py)
The encoders and decoders in SCL operate on blocks of data. Each input block is of type `DataBlock`. The `DataBlock` can be thought of as a thin wrapper around a list of input symbols. Let's take a look at the [class definition](https://github.com/kedartatwawadi/stanford_compression_library/blob/d221a3208d46e6faab21d05e9b21e87dc088d9ae/scl/core/data_block.py#L5C9-L5C9):

   ```python
   class DataBlock:
       """
       wrapper around a list of symbols.
   
       The class is a wrapper around a list of symbols (self.data_list). The data_block is typically used
       to represent input to the data encoders (or output from data decoders)
   
       Some utility functions (useful generally for compression) implemented are:
       - size
       - alphabet
       - empirical_distribution
       - entropy
       """
   
       def __init__(self, data_list: List):
           self.data_list = data_list
   
       @property
       def size(self):
           return len(self.data_list)
           
       ...
   ```

As you can see, the main data is stored in the `self.data_list` attribute, the other functions are helper functions which are useful in multiple places in the code. 

One useful think in the SCL is that unit tests are present in the same file at the bottom, and are very useful as usage examples. For example, lets take a look at the [tests for DataBlock](https://github.com/kedartatwawadi/stanford_compression_library/blob/d221a3208d46e6faab21d05e9b21e87dc088d9ae/scl/core/data_block.py#L109):

   ```python
   def test_data_block_basic_ops():
       """checks basic operations for a DataBlock"""
       data_list = [0, 1, 0, 0, 1, 1]
   
       # create data block object
       data_block = DataBlock(data_list)
   
       # check size
       assert data_block.size == 6
   
       # check counts
       counts_dict = data_block.get_counts(order=0)
       assert counts_dict[0] == 3
   
       # check empirical dist
       prob_dist = data_block.get_empirical_distribution(order=0)
       assert prob_dist.prob_dict[0] == 0.5
   
       # check entropy
       entropy = data_block.get_entropy(order=0)
       assert entropy == 1.0
   ``` 

   The tests above are useful for also checking out the various pre-implemented methods for the classes e.g. you can see how once you define the `data_block`, you can use `data_block.get_entropy(order=0)` to get 0th order entropy of the data, or `data_block.get_empirical_distribution(order=0)` to get the empirical distribution of the data.

### 1.2 [DataEncoder and DataDecoder](https://github.com/kedartatwawadi/stanford_compression_library/blob/main/scl/core/data_encoder_decoder.py) 

Another abstraction in `core` library is that of `DataEncoder` and `DataDecoder`. Any compressor consists of an *Encoder* and a *Decoder*. The encoder maps input symbols (`DataBlock`) to bits (`BitArray`) while the decoder does the reverse mapping (bits to output symbols). In case of SCL, all encoders are subclasses of `DataEncoder` and all decoders are subclasses of `DataDecoder`. Let's take a look at the class definitions to understand better: 

```python
class DataEncoder(abc.ABC):
    ...
    def encode_block(self, data_block: DataBlock):
        ...
        # return encoded_bitarray
        raise NotImplementedError
    ...


class DataDecoder(abc.ABC):
    ...
    def decode_block(self, bitarray: BitArray):
        ...
        # return decoded_block, num_bits_consumed
        raise NotImplementedError
   ...
```
For now let's focus on the `encode_block` and `decode_block` member functions, which are inverses of each other. The `encode_block` function of `DataEncoder` maps input `DataBlock` to a `BitArray`, while the `decode_block` function of `DataDecoder` does the reverse. Note that `decode_block` also returns the `num_bits_consumed`. This is useful as the input `BitArray` might contain bits written by other encoders, and so the `decode_block` might not consume all the bits. We will see how this is useful in combining multiple encoders. 

The `encode_block` and `decode_block` functions are the core logic of any compressor, and is usually the only part subclassing encoders/decoders need to implement. Here is an example of the  

The `DataEncoder` and `DataDecoder` also contains other functions which are useful to convert our encoder/decoders until practical coders which can handle multiple blocks of data etc. Do take a look at the [`encode`, `decode`, `encode_file`](https://github.com/kedartatwawadi/stanford_compression_library/blob/main/scl/core/data_encoder_decoder.py) functions if you are interested! 

### 1.3 [ProbabilityDist](https://github.com/kedartatwawadi/stanford_compression_library/blob/main/scl/core/prob_dist.py) 
The final abstraction in `core` library that we will discuss is that of `ProbabilityDist`. The `ProbabilityDist` class is used to represent probability distributions. The class is a thin wrapper around a dictionary which maps symbols to their probabilities (`prob_dict`). It provides some useful member properties to extract relevant information, such as the `alphabet` (list of symbols) and `prob_list` (list of probabilities). Take a look at the class definition and some of the function methods below:

```python
class ProbabilityDist:
    ...
    def __init__(self, prob_dict=None):
        self._validate_prob_dist(prob_dict)

        # NOTE: We use the fact that since python 3.6, dictionaries in python are
        # also OrderedDicts. https://realpython.com/python-ordereddict/
        self.prob_dict = prob_dict
    ...
    def __repr__(self):
        return f"ProbabilityDist({self.prob_dict.__repr__()}"
    ...
    @property
    def alphabet(self):
        return list(self.prob_dict)

    @property
    def prob_list(self):
        return [self.prob_dict[s] for s in self.alphabet]

    @classmethod
    def get_sorted_prob_dist(cls, prob_dict, descending=False):
        """
        Returns ProbabilityDist class object with sorted probabilities.
        By default, returns Probabilities in increasing order (descending=False), i.e.,
        p1 <= p2 <= .... <= pn (python-default)
        """
        return cls(dict(sorted(prob_dict.items(), key=lambda x: x[1], reverse=descending)))
    ...
    def cumulative_prob_dict(self):
    ...
    def entropy(self):
    ...
    def probability(self, symbol):
    ...
    def neg_log_probability(self, symbol):
    ... 
```

It also provides some useful functions to manipulate the probability distributions. We will see in the construction of various codes such as Huffman code that sorting the probabilities is a useful operation and so the `ProbabilityDist` class provides `get_sorted_prob_dist` function to get the `prob_dict` in sorted order. Other such operations include computing cumulative probabilities (`cumulative_prob_dict`), computing entropy (`entropy`), probability of a particular symbol (`probability(symbol)`), negative log probability of a particular symbol (`neg_log_probability(symbol)`), etc. Please have a look at the class definition for more details.

## 2. The `compressors` library 

We natively implemented some of the compressors in the `compressors` library. The `compressors` library is contains these compressors. We will give a detailed example below but please refer to the library for further exploration.

For instance, let's look at the [Shannon Coder](https://github.com/kedartatwawadi/stanford_compression_library/blob/main/scl/compressors/shannon_coder.py) we have seen in class. It subclasses from [Prefix-free Coder](https://github.com/kedartatwawadi/stanford_compression_library/blob/main/scl/compressors/prefix_free_compressors.py) which in-turn subclasses from `DataEncoder` and `DataDecoder` from the `core` library. `Prefix-free Coder` has implementations of `PrefixFreeEncoder`, `PrefixFreeDecoder` and `PrefixFreeTree` which are utility abstract classes
useful for implementing any prefix free code. `Shannon Coder` is one specific example of a prefix free code.

Let's first look at the encoding part of the Shannon Coder. You will notice that `encode_block` function is already implemented in the `PrefixFreeCoder` class: `encode_block` function just loops over each symbol in the input and concatenate the bitstreams. Therefore, we only need to implement the `encode_symbol` function in the inherited `ShannonEncoder` part. Let's take a look at the `encode_symbol` function in the `ShannonEncoder` class:

```python
class ShannonEncoder(PrefixFreeEncoder):
    """
    PrefixFreeEncoder already has a encode_block function to encode the symbols once we define a encode_symbol function
    for the particular compressor.
    """

    def __init__(self, prob_dist: ProbabilityDist):
        self.prob_dist = prob_dist
        self.encoding_table = ShannonEncoder.generate_shannon_codebook(self.prob_dist)

    @classmethod
    def generate_shannon_codebook(cls, prob_dist):
        # sort the probability distribution in decreasing probability and get cumulative probability which will be
        # used for encoding
        sorted_prob_dist = ProbabilityDist.get_sorted_prob_dist(
            prob_dist.prob_dict, descending=True
        )
        cum_prob_dict = sorted_prob_dist.cumulative_prob_dict

        codebook = {}
        for s in sorted_prob_dist.prob_dict:
            # get the encode length for the symbol s
            encode_len = math.ceil(sorted_prob_dist.neg_log_probability(s))

            # get the code as a truncated floating point representation
            _, code = float_to_bitarrays(cum_prob_dict[s], encode_len)
            codebook[s] = code
        return codebook

    def encode_symbol(self, s):
        return self.encoding_table[s]
```
As evident, it encodes individual symbol by creating a codebook based on sorted probabilities. Look at the [readme for this script](https://github.com/kedartatwawadi/stanford_compression_library/blob/d221a3208d46e6faab21d05e9b21e87dc088d9ae/scl/compressors/shannon_coder.py#L1) or refer to [class notes](https://stanforddatacompressionclass.github.io/notes/lossless_iid/prefix_free_codes.html#designing-prefix-free-codes) for details.

Next, let's look at the decoding part of the Shannon Coder. You will again notice that `decode_block` function is already implemented in the `PrefixFreeCoder` class: `decode_block` function just loops over the bitstream and utilizes efficient decoding of prefix-free codes to output individual symbol and the bits consumed during decoding (as explained above in `DataDecoder` class). Therefore, we only need to implement the `decode_symbol` function in the inherited `ShannonDecoder` part. Let's take a look at the `decode_symbol` function in the `ShannonDecoder` class:

```python
class ShannonDecoder(PrefixFreeDecoder):
    """
    PrefixFreeDecoder already has a decode_block function to decode the symbols once we define a decode_symbol function
    for the particular compressor.
    PrefixFreeTree provides decode_symbol given a PrefixFreeTree
    """

    def __init__(self, prob_dist: ProbabilityDist):
        encoding_table = ShannonEncoder.generate_shannon_codebook(prob_dist)
        self.tree = PrefixFreeTree.build_prefix_free_tree_from_code(encoding_table)

    def decode_symbol(self, encoded_bitarray: BitArray) -> Tuple[Any, BitArray]:
        decoded_symbol, num_bits_consumed = self.tree.decode_symbol(encoded_bitarray)
        return decoded_symbol, num_bits_consumed
```

Here you see something interesting: we were able to use `PrefixFreeTree` class to implement the `decode_symbol` function. This is because the Shannon code is just a special case of a prefix-free code, and so we can use the `PrefixFreeTree` to first get the encoding tree used to encode the message given probability distribution and then use it to decode the message. Obviously in practice, we also need to communicate or be able to replicate the probability distribution used to encode the message at the decoder, but we will ignore that for now. 

Again, please look at the corresponding files to get better understanding of the code.

## 3. The `external_compressors` library
This library includes implementation of external compressors so that they can be natively used within SCL, such as [zstd](https://github.com/facebook/zstd) and [zlib](https://www.zlib.net). These might be beneficial to use in some cases, for example, if you want to compare the performance of a compressor with a state-of-the-art compressor, or use them in conjunction with a lossy compressor technique you implement in SCL. Please look at the folder with test cases for examples on how to use these.

## 4. The `utils` library

Finally, we cover `utils` library which has some useful functions for debugging, bitarray manipulation, testing etc. The naming should be evident, and you should visit them while working on problem sets or contributing to the SCL to get help from these helper functions. Feel free to contribute back if you think you have some useful functions to add to the library.

Some notable ones are:

### 4.1 [bitarray_utils.uint_to_bitarray](https://github.com/kedartatwawadi/stanford_compression_library/blob/d221a3208d46e6faab21d05e9b21e87dc088d9ae/scl/utils/bitarray_utils.py#L27)
This function converts an unsigned integer to a bitarray. For example, `uint_to_bitarray(5, 4)` will return `BitArray('0b0101')`. It is very useful in encoding lengths to help decode a bitstream.

### 4.2 [bitarray_utils.bitarray_to_uint](https://github.com/kedartatwawadi/stanford_compression_library/blob/d221a3208d46e6faab21d05e9b21e87dc088d9ae/scl/utils/bitarray_utils.py#L36)
This function implements reverse of previous method, i.e. it converts a bitarray to an unsigned integer. For example, `bitarray_to_uint(BitArray('0b0101'))` will return `5`. As expected, it will be very useful in decoding lengths from a bitstream.

### 4.3 [tree_utils.BinaryNode](https://github.com/kedartatwawadi/stanford_compression_library/blob/d221a3208d46e6faab21d05e9b21e87dc088d9ae/scl/utils/tree_utils.py#L6C7-L6C17) 
This class implements a binary tree node. It is useful in implementing prefix-free trees, or trees in general. It also has some useful debugging functions such as `print_tree` which can be used to print the tree in a nice format.

### 4.4 [test_utils.get_random_data_block](https://github.com/kedartatwawadi/stanford_compression_library/blob/d221a3208d46e6faab21d05e9b21e87dc088d9ae/scl/utils/test_utils.py#L17C5-L17C26)
This function can be used to generate random data blocks with given probability distribution. It is useful for generating random test data during testing of compressors.

### 4.5 [test_utils.try_lossless_compression](https://github.com/kedartatwawadi/stanford_compression_library/blob/d221a3208d46e6faab21d05e9b21e87dc088d9ae/scl/utils/test_utils.py#L73)
This function can be used to test if a compressor is lossless. It takes a compressor (encoder-decoder pair), and a data block as input, and checks if the compressor is able to losslessly compress the data block. It is useful for testing if a compressor is lossless.
