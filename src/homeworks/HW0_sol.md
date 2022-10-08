# EE274: Homework-0 Solutions

- **Focus area:** Preliminaries
- **Due Date:** Oct 6
- **Weightage:** 5%
- **Total Points:** 50


### 1. Python, SCL setup (*10 points*)
1. **Output of Command in 1.2**

   Your output to the command 
    ```sh
    python --version
    ```
   should look something like
   ```sh
    Python 3.8.13
   ```
   
2. **Output of Command in 1.5**

    Your output to the command 
     ```sh
     find . -name "*.py" -exec py.test -s -v {} +
     ```
    should look something like
    ```sh
     ============================================================================================= test session starts ==============================================================================================
   platform darwin -- Python 3.8.13, pytest-6.2.5, py-1.10.0, pluggy-1.0.0 -- /Users/pulkittandon/miniforge3/envs/SCL/bin/python
   cachedir: .pytest_cache
   rootdir: /Users/pulkittandon/PycharmProjects/stanford_compression_library
   collected 31 items                                                                                                                                                                                             
   
   core/encoded_stream.py::test_padder PASSED
   core/encoded_stream.py::test_header PASSED
   core/encoded_stream.py::test_encoded_block_reader_writer PASSED
   core/prob_dist.py::ProbabilityDistTest::test_creation_entropy PASSED
   core/prob_dist.py::ProbabilityDistTest::test_prob_creation_and_validation PASSED
   core/prob_dist.py::ProbabilityDistTest::test_sorted_prob_dist PASSED
   core/prob_dist.py::ProbabilityDistTest::test_validation_failure XFAIL
   core/data_stream.py::test_list_data_stream PASSED
   core/data_stream.py::test_file_data_stream PASSED
   core/data_stream.py::test_uint8_file_data_stream PASSED
   core/data_block.py::test_data_block_basic_ops PASSED
   utils/bitarray_utils.py::test_get_bit_width PASSED
   utils/bitarray_utils.py::test_bitarray_to_int PASSED
   utils/bitarray_utils.py::test_float_to_bitarrays PASSED
   compressors/golomb_coder.py::test_golomb_encode_decode PASSED
   compressors/shannon_coder.py::test_shannon_coding PASSED
   compressors/universal_uint_coder.py::test_universal_uint_encode_decode PASSED
   compressors/universal_uint_coder.py::test_universal_uint_encode PASSED
   compressors/shannon_fano_elias_coder.py::test_shannon_fano_elias_coding PASSED
   compressors/tANS.py::test_generated_lookup_tables PASSED
   compressors/tANS.py::test_check_encoded_bitarray PASSED
   compressors/tANS.py::test_tANS_coding tANS coding: avg_log_prob=1.499, tANS codelen: 1.502
   tANS coding: avg_log_prob=0.815, tANS codelen: 0.819
   tANS coding: avg_log_prob=1.422, tANS codelen: 1.427
   PASSED
   compressors/fano_coder.py::test_fano_coding PASSED
   compressors/baseline_compressors.py::test_alphabet_encode_decode PASSED
   compressors/baseline_compressors.py::test_fixed_bitwidth_encode_decode PASSED
   compressors/baseline_compressors.py::test_fixed_bitwidth_file_encode_decode PASSED
   compressors/rANS.py::test_check_encoded_bitarray PASSED
   compressors/rANS.py::test_rANS_coding rANS coding: avg_log_prob=1.499, rANS codelen: 1.504
   rANS coding: avg_log_prob=1.484, rANS codelen: 1.489
   rANS coding: avg_log_prob=1.430, rANS codelen: 1.435
   rANS coding: avg_log_prob=2.585, rANS codelen: 2.590
   rANS coding: avg_log_prob=0.815, rANS codelen: 0.819
   PASSED
   compressors/huffman_coder.py::test_huffman_coding_dyadic 
   Avg Bits: 1.0, optimal codelen: 1.0, Entropy: 1.0
   Avg Bits: 1.527, optimal codelen: 1.527, Entropy: 1.5
   Avg Bits: 1.794, optimal codelen: 1.794, Entropy: 1.75
   PASSED
   external_compressors/zlib_external.py::test_zlib_encode_decode PASSED
   external_compressors/zlib_external.py::test_zlib_file_encode_decode PASSED
   
   ======================================================================================== 30 passed, 1 xfailed in 8.94s =========================================================================================
     ```
   
### 2. Probability and Coin Toss (*20 points*)
Kedar is a big [Cricket](https://en.wikipedia.org/wiki/Cricket) fan. In cricket (like many other sports), there is a coin toss in the beginning to determine which team gets the first chance to bat. However, Kedar thinks that the coin being used is *biased* and lands as *Heads* (`H`) much more often than *tails* (`T`). Let the probability of the coin landing on `H` be $p$.

Shubham suggests to Kedar that this problem can be solved (i.e we can get a *fair* coin) by tossing the coin twice! If we get a `H,T`sequence in the two tosses, then we mark it as a heads, while if we get a `T,H` sequence we can mark this as a tails. If we get a `H,H` or `T,T` then discard the result and start over!

1. [5 points] Do you think Shubham's solution is right? Please justify.  

   **Solution**

   Shubham's solution is right. Scheme only terminates when `H,T` or `T,H` sequences are received, which because of IID (independent and identically distributed) nature of our coin tosses and symmetry have the same probability.  In fact, the iterative scheme can be thought of as a Geometric Random variable. After every two tosses, the scheme terminates with probability of $p_{success}=2p(1-p)$ (getting either a `H,T` or `T,H` sequence) and we are back to initial state with a probability of $p_{failure}=\left(p^2 + (1-p)^2\right)$ (getting `H,H` or `T,T` sequence). If the scheme terminates after n sequences of these two tosses, we declare it heads or tails with the same probability of 
   
    $$ \begin{aligned}
    p_{shubham-head} &= p_{failure}^{n-1} * p(H)*P(T) \\ &= p_{failure}^{n-1} * p(T)*P(H) \\ &= p_{shubham-tail}
    \end{aligned} $$
   

2. [5 points] What is the expected number of coin flips needed to get one `H` or `T` outcome using Shubham's method?
   
   **Solution**

   Using the fact that Shubham's solution is a Geometric Random variable with $p_{success}=2p(1-p)$ and involves two coin tosses per iteration, the expected number of coin flips needed to get one `H` or `T` outcome using Shubham's method is 
   $$
   \mathbb{E}(tosses) = 2 * 1/p_{success} = 1/p(1-p)
   $$

3. [5 points] Kedar is still not convinced and thinks that we should really implement this idea to see if it works. Please help out Shubham by implementing the function `shubhams_fair_coin_generator()` in the file `HWs/HW0/hw0_p2.py`. 
NOTE: please run all of this in the `(ee274_env)` environment which you created and that you are in the correct branch of the `SCL` repo (`EE274/HWs`). Ensure that the tests except those in `HWs` folder pass before you start implementing the function.

   **Solution**

   ```python
   def shubhams_fair_coin_generator():
        """
        TODO:
        use the biased_coin_generator() function above to implement the fair coin generator

        Outputs:
            toss (str): H, T
            num_biased_tosses (int): number of times the biased_coin_generator() was called to generate the output
        """
        toss = None
        num_biased_tosses = 0

        ##############################
        # ADD CODE HERE
        # raise NotImplementedError
        while True:
            toss1, toss2 = biased_coin_generator(), biased_coin_generator()
            num_biased_tosses += 2
            if toss1 != toss2:
                toss = toss1
                break
        ##############################

        return toss, num_biased_tosses
   ```

4. [5 points] It is always a good practice to write tests to ensure the implementation is correct (even if you think theoretically it is alright :)). Please implement `test_shubhams_fair_coin_generator()` function in `HWs/HW0/hw0_p2.py`. You can test your code by running:

    ```sh
    py.test -s -v HWs/HW0/hw0_p2.py
    ```
   
    **Solution**
    
   ```python
   def test_shubhams_fair_coin_generator():
        """
        TODO:
        write a test to check whether the shubhams_fair_coin_generator() is really generating fair coin tosses

        Also, check if the num_biased_tosses matches the answer which you computed in part 2.
        """

        # perform the experiment
        # feel free to reduce this when you are testing
        num_trials = 10000
        tosses = []
        num_biased_tosses_list = []
        for _ in range(num_trials):
            toss, num_biased_tosses = shubhams_fair_coin_generator()

            # check if the output is indeed in H,T
            assert toss in ["H", "T"]
            tosses.append(toss)
            num_biased_tosses_list.append(num_biased_tosses)

        # NOTE: We are using the DataBlock object from SCL.
        # Take a look at `core/data_block.py` to understand more about the class
        # the get_empirical_distribution() outputs a ProbDist class. Take a look at
        # `core/prob_dist.py` to understand this object better
        tosses_db = DataBlock(tosses)
        empirical_dist_tosses = tosses_db.get_empirical_distribution()

        #############################################
        # ADD CODE HERE
        # 1. add test here to check if empirical_dist_tosses is close to being fair
        # 2. add test to check if avg value of num_biased_tosses matches what you expect
        # (both within a reasonable error range)
        # You can use np.testing.assert_almost_equal() to check if two numbers are close to some error margin
        # raise NotImplementedError
        np.testing.assert_almost_equal(
            empirical_dist_tosses.probability("H"), 0.5, decimal=1,  err_msg="Probability of H is not 0.5",
        )
        np.testing.assert_almost_equal(
            empirical_dist_tosses.probability("T"), 0.5, decimal=1, err_msg="Probability of T is not 0.5",
        )

        expected_num_biased_tosses = sum(num_biased_tosses_list) / len(num_biased_tosses_list)
        np.testing.assert_almost_equal(
            expected_num_biased_tosses, 1/(0.8*0.2), decimal=1,
            err_msg="Expected Number of biased tosses is not 1/(p*(1-p))",
        )
        #############################################
   ```

5. (NOT GRADED, THINK FOR FUN!): Do you think Shubham's solution is *optimal*? For example, Shubham is using at least `2` biased coin tosses to generate `1` fair coin toss. This seems wasteful in some cases (for example, if the coin is almost unbiased). Can you improve upon the *average* number of biased coin tosses needed to generate one fair coin toss?  
   
   **Solution**

    Yes, Shubham's solution is not optimal. We can improve upon the *average* number of biased coin tosses by carefully utilizing the cases of `H,H` and `T,T` sequences instead of throwing them away. For those of you who are aware of entropy, this problem has close relationship to the entropy! [Here](http://www.eecs.harvard.edu/~michaelm/coinflipext.pdf) is a detailed analysis of this problem by Michael Mitzenmacher. 



### 3. Universal Integer Compression (*20 points*)
We will use [Stanford Compression Library](https://github.com/kedartatwawadi/stanford_compression_library) throughout the course. In this problem, we will familiarize ourselves a bit with the data structures in SCL. 

Take a look at [intro to SCL wiki article](https://github.com/kedartatwawadi/stanford_compression_library/wiki/Introduction-to-the-Stanford-Compression-Library) to familiarize yourself with the library. We will use a simple compressor `compressors/universal_uint_coder.py` as an example. 

1. [5 points] First let's get familiarized with how to use an encoder/decoder. The file `test_universal_uint_encode_decode` shows a simple way to do so. In the example, we encode and decode a list of unsigned integers `[0, 0, 1, 3, 4, 100]`. Modify the test to encode `[23, 30, 100012]` and report the length of the `encoded_bitarray`.

    **Solution**

    The length of the encoded bitarray with symbols `[23, 30, 100012]` is `54`.

2. [5 points] Let's now try to understand how the `compressors/universal_uint_coder.py` works. Given an unsigned integer `u`, what is the length of the code output by `encode_symbol`? 

   **Solution**

   We need $\lfloor log_2(u) \rfloor + 1$ bits to represent an unsigned integer `u` in it's binary form (for $u = 0$, we need 1 bit) and again $\lfloor log_2(u) \rfloor + 1$ bits to encode the length in the unary as described in `compressors/universal_uint_coder.py` (again for $u = 0$, we need 1 bit for this). Therefore, we need $2\times(\lfloor log_2(u) \rfloor + 1)$ bits to encode an unsigned integer `u` (and 2 bits if $u = 0$).

3. [5 points] Briefly explain how the `decode_symbol` function works, and how is it able to decode the input losslessly. 
   
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

4. [5 points] The `compressors/universal_uint_coder.py` unfortunately only encodes unsigned integers. How will you extend the uint coder to create an encoder/decoder which handles signed integers? Add you code in the file `HWs/HW0/hw0_p3.py`. NOTE: you mainly have to implement `encode_symbol` and `decode_symbol` functions. At the end, the test as present in the file (`test_universal_integer_encode_decode`) should pass. Report the length of the `encoded_bitarray` output by the test on Gradescope.

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

