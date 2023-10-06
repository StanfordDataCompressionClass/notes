# Exercise

To make sure we understand the abstractions and various classes introduced, lets take a look at the following exercise. This was a problem from year 2022 homework, and so to make it most useful it might be best to treat it as such! 

*The solution to the exercise and how to use SCL in a Google colab notebook is also available [here](https://colab.research.google.com/drive/1zf5Kk6rhf0mhfYjIQx8inx1TpwVpYLTg?usp=sharing).*

We will use a simple pedagogical compressor `compressors/universal_uint_coder.py` as an example, and then use it to implement a more complex compressor `HWs/tutorial/universal_int_coder.py`. To access the starter file, ensure you are in the `EE274_Fall23/HWs` branch of `SCL`. Checkout to the branch for getting access to tutorial (and HW problem templates).
    
```sh
 git checkout EE274_Fall23/HWs
 ```

Let's start with understanding the `compressors/universal_uint_coder.py` compressor ([link](https://github.com/kedartatwawadi/stanford_compression_library/blob/main/scl/compressors/universal_uint_coder.py)). The compressor is a simple implementation of a universal compressor for unsigned integers. First let us note the structure of the compressor. The compressor has three main components:

- *UniversalUintEncoder*: This class is used to encode a list of unsigned integers to a bitarray. It subclasses from `DataEncoder` class as described in detail in the [basics](./basics.md). Therefore, we only need to implement the `encode_block` function. In this particular case, we can encode symbols individually and concatenate them to output the final bitstream. Hence, we can use the `encode_symbol` function to encode each symbol individually. The `encode_symbol` function takes in an unsigned integer and returns a bitarray. 

- *UniversalUintDecoder*: This class is used to decode a bitarray to a list of unsigned integers. It subclasses from `DataDecoder` class as described in detail in the [basics](./basics.md). Therefore, we only need to implement the `decode_block` function. Similar to `encode_block`, we can decode symbols individually and append them to a list to output the final list of symbols. Hence, we can use the `decode_symbol` function to decode each symbol individually. The `decode_symbol` function takes in a bitarray and returns an unsigned integer and the number of bits consumed to decode the symbol.

Next, we will understand the functioning of the compressor by going through the following exercise. Look at the compressor helper [docstring](https://github.com/kedartatwawadi/stanford_compression_library/blob/d221a3208d46e6faab21d05e9b21e87dc088d9ae/scl/compressors/universal_uint_coder.py#L1C7-L1C7) for more details on the compressor. 

1. First, let's get familiarized with how to use an encoder/decoder. The file `test_universal_uint_encode_decode` shows a simple way to do so. In the example, we encode and decode a list of unsigned integers `[0, 1, 3, 4, 100]`. Modify the test to encode `[23, 30, 100012]` and report the length of the `encoded_bitarray`.

    **Solution**

    The length of the encoded bitarray with symbols `[23, 30, 100012]` is `54`.

Next, let's now try to understand how the compressor losslessly compresses unsigned integers.

2. Given an unsigned integer `u`, what is the length of the code output by `encode_symbol`? 

   **Solution**

   We need $\lfloor log_2(u) \rfloor + 1$ bits to represent an unsigned integer `u` in it's binary form (for $u = 0$, we need 1 bit) and again $\lfloor log_2(u) \rfloor + 1$ bits to encode the length in the unary as described in `compressors/universal_uint_coder.py` (again for $u = 0$, we need 1 bit for this). Therefore, we need $2\times(\lfloor log_2(u) \rfloor + 1)$ bits to encode an unsigned integer `u` (and 2 bits if $u = 0$).

3. Briefly explain how the `decode_symbol` function works, and how is it able to decode the input losslessly. 
   
   **Solution**

   The `decode_symbol` function first finds the number of bits in the binary encoding of the symbol by utilizing the unary coding. In unary coding (as used by `compressors/universal_uint_coder.py`), if the length of the symbol is $n$, it is encoded as $(n-1)$ `1`s followed by one `0`. So in the first part of the code, decoder goes through the bits till it finds a `0` to find the length of the binary encoding.

   ```python
        # initialize num_bits_consumed
        num_bits_consumed = 0

        # get the symbol length
        while True:
            bit = encoded_bitarray[num_bits_consumed]
            num_bits_consumed += 1
            if bit == 0:
                break
        num_ones = num_bits_consumed
   ```
   Next, it uses the knowledge of number of bits (say `num_ones`) in the binary representation of the unsigned integer to read the next `num_ones` bits and convert it to an unsigned integer. 

   ```python
        # decode the symbol
        symbol = bitarray_to_uint(
            encoded_bitarray[num_bits_consumed: num_bits_consumed + num_ones]
        )
        num_bits_consumed += num_ones
   ```

4. The `compressors/universal_uint_coder.py` unfortunately only encodes unsigned integers. How will you extend the uint coder to create an encoder/decoder which handles compressing signed integers losslessly? Add your code in the file `HWs/tutorial/universal_int_coder.py`. NOTE: you mainly have to implement `encode_symbol` and `decode_symbol` functions. At the end, the test as present in the file (`test_universal_integer_encode_decode`) should pass. Report the length of the `encoded_bitarray` output by the test on Gradescope.

    **Solution**

   One way of implementing a `universal_interger_coder` by utilizing the `universal_uint_coder` coder is by doing a mapping of negative integers to positive integers. There are multiple possible way to do so and we accept all of them as a solution. One simple way to do the same is by mapping negative integers to positive integers in a zig-zag fashion as follows:

   ```
    0 -> 0
   +1 -> 1
   -1 -> 2
   +2 -> 3
   -2 -> 4
   .
   .
   .
   ``` 
   The `encode_symbol` for `universal_interger_coder` can be implemented as follows:

   ```python
   def encode_symbol(self, x: int):
        assert isinstance(x, int)

        #########################
        # ADD CODE HERE
        # Use the self.uint_encoder here
        # raise NotImplementedError
        if x <= 0:
            return self.uint_encoder.encode_symbol(2*(-x))
        else:
            return self.uint_encoder.encode_symbol(2*x - 1)
        ########################
    ```

   The `decode_symbol` for `universal_interger_coder` can be implemented as follows:
   ```python
   def decode_symbol(self, encoded_bitarray):
        #########################
        # ADD CODE HERE
        # Use the self.uint_decoder here
        # raise NotImplementedError
        x, num_bits = self.uint_decoder.decode_symbol(encoded_bitarray)
        return (-x//2, num_bits) if x % 2 == 0 else ((x+1)//2, num_bits)
        ########################
   ```
   
    The length of the `encoded_bitarray` output using our implementation is `66`.