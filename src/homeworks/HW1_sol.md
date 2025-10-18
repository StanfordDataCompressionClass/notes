# EE274 (Fall 25): Homework-1 Solution

- **Focus area:** Prefix-free codes, Basic Information theory
- **Due Date:** Oct 14, midnight (11:59 PM)
- **Weightage:** 15%
- **Total Points:** 135

### 0. Python, SCL setup (*10 points*)
1. **Output of Command in 1.2**

   Your output to the command 
    ```sh
    python --version
    ```
   should look something like
   ```sh
    Python 3.9.18
   ```
   
2. **Output of Command in 1.5**

    Your output to the command 
    ```sh
    find scl -name "*.py" -exec py.test -s -v {} +
    ```
    should look something like

    ```sh
    ================================================================= test session starts =================================================================
    platform linux -- Python 3.9.23, pytest-8.4.2, pluggy-1.6.0 -- /home/jiwon/miniconda3/envs/ee274_env/bin/python3.9
    cachedir: .pytest_cache
    rootdir: /home/jiwon/stanford_compression_library
    collected 57 items                                                                                                                                    

    scl/utils/bitarray_utils.py::test_basic_bitarray_operations PASSED
    scl/utils/bitarray_utils.py::test_get_bit_width PASSED
    scl/utils/bitarray_utils.py::test_bitarray_to_int PASSED
    scl/utils/bitarray_utils.py::test_float_to_bitarrays PASSED
    scl/core/prob_dist.py::ProbabilityDistTest::test_creation_entropy PASSED
    scl/core/prob_dist.py::ProbabilityDistTest::test_prob_creation_and_validation PASSED
    scl/core/prob_dist.py::ProbabilityDistTest::test_sorted_prob_dist PASSED
    scl/core/prob_dist.py::ProbabilityDistTest::test_validation_failure XFAIL
    scl/core/data_stream.py::test_list_data_stream PASSED
    scl/core/data_stream.py::test_file_data_stream PASSED
    scl/core/data_stream.py::test_uint8_file_data_stream PASSED
    scl/core/encoded_stream.py::test_padder PASSED
    scl/core/encoded_stream.py::test_header PASSED
    scl/core/encoded_stream.py::test_encoded_block_reader_writer PASSED
    scl/core/data_block.py::test_data_block_basic_ops PASSED
    scl/external_compressors/zlib_external.py::test_zlib_encode_decode PASSED
    scl/external_compressors/zlib_external.py::test_zlib_file_encode_decode PASSED
    scl/external_compressors/pickle_external.py::test_pickle_data_compressor PASSED
    scl/external_compressors/zstd_external.py::test_zstd_encode_decode PASSED
    scl/external_compressors/zstd_external.py::test_zstd_file_encode_decode PASSED
    scl/compressors/tANS.py::test_generated_lookup_tables PASSED
    scl/compressors/tANS.py::test_check_encoded_bitarray PASSED
    scl/compressors/tANS.py::test_tANS_coding tANS coding: avg_log_prob=1.499, tANS codelen: 1.502
    tANS coding: avg_log_prob=0.815, tANS codelen: 0.819
    tANS coding: avg_log_prob=1.422, tANS codelen: 1.427
    PASSED
    scl/compressors/shannon_coder.py::test_shannon_coding PASSED
    scl/compressors/typical_set_coder.py::test_is_typical PASSED
    scl/compressors/typical_set_coder.py::test_typical_set_coder_roundtrip PASSED
    scl/compressors/fixed_bitwidth_compressor.py::test_alphabet_encode_decode PASSED
    scl/compressors/fixed_bitwidth_compressor.py::test_fixed_bitwidth_encode_decode PASSED
    scl/compressors/fixed_bitwidth_compressor.py::test_text_fixed_bitwidth_file_encode_decode PASSED
    scl/compressors/universal_uint_coder.py::test_universal_uint_encode_decode PASSED
    scl/compressors/universal_uint_coder.py::test_universal_uint_encode PASSED
    scl/compressors/lz77_sliding_window.py::LZ77WindowTest::test_LZ77Window PASSED
    scl/compressors/lz77_sliding_window.py::LZ77WindowTest::test_LZ77Window_get_byte_out_of_range_too_big XFAIL
    scl/compressors/lz77_sliding_window.py::LZ77WindowTest::test_LZ77Window_get_byte_out_of_range_too_small XFAIL
    scl/compressors/lz77_sliding_window.py::test_lz77_encode_decode PASSED
    scl/compressors/lz77_sliding_window.py::test_lz77_sequence_generation PASSED
    scl/compressors/lz77_sliding_window.py::LZ77DecoderWindowTooSmallTest::test_LZ77DecoderWindowTooSmall XFAIL
    scl/compressors/lz77_sliding_window.py::test_lz77_multiblock_file_encode_decode PASSED
    scl/compressors/rANS.py::test_check_encoded_bitarray PASSED
    scl/compressors/rANS.py::test_rANS_coding rANS coding: avg_log_prob=1.499, rANS codelen: 1.504
    rANS coding: avg_log_prob=1.484, rANS codelen: 1.489
    rANS coding: avg_log_prob=1.430, rANS codelen: 1.435
    rANS coding: avg_log_prob=2.585, rANS codelen: 2.590
    rANS coding: avg_log_prob=0.815, rANS codelen: 0.819
    PASSED
    scl/compressors/lz77.py::test_empirical_int_huffman_encoder_decoder PASSED
    scl/compressors/lz77.py::test_log_scale_binned_integer_encoder_decoder PASSED
    scl/compressors/lz77.py::test_lz77_encode_decode PASSED
    scl/compressors/lz77.py::test_lz77_sequence_generation PASSED
    scl/compressors/lz77.py::test_lz77_multiblock_file_encode_decode PASSED
    scl/compressors/huffman_coder.py::test_huffman_coding_dyadic 
    Avg Bits: 1.0, optimal codelen: 1.0, Entropy: 1.0
    Avg Bits: 1.527, optimal codelen: 1.527, Entropy: 1.5
    Avg Bits: 1.794, optimal codelen: 1.794, Entropy: 1.75
    PASSED
    scl/compressors/golomb_coder.py::test_golomb_encode_decode PASSED
    scl/compressors/shannon_fano_elias_coder.py::test_shannon_fano_elias_coding PASSED
    scl/compressors/prefix_free_compressors.py::test_build_prefix_free_tree_from_code PASSED
    scl/compressors/arithmetic_coding.py::test_bitarray_for_specific_input PASSED
    scl/compressors/arithmetic_coding.py::test_arithmetic_coding  avg_log_prob=1.473, avg_codelen: 1.512
    avg_log_prob=1.447, avg_codelen: 1.482
    avg_log_prob=1.429, avg_codelen: 1.442
    avg_log_prob=2.585, avg_codelen: 2.606
    PASSED
    scl/compressors/arithmetic_coding.py::test_adaptive_arithmetic_coding  avg_log_prob=1.473, avg_codelen: 1.512
    avg_log_prob=1.447, avg_codelen: 1.492
    avg_log_prob=1.429, avg_codelen: 1.462
    avg_log_prob=2.585, avg_codelen: 2.612
    PASSED
    scl/compressors/arithmetic_coding.py::test_adaptive_order_k_arithmetic_coding 
    k: 0, expected_bitrate=1.585, avg_codelen: 1.589
    k: 1, expected_bitrate=1.585, avg_codelen: 1.591
    k: 2, expected_bitrate=1.000, avg_codelen: 1.016
    k: 3, expected_bitrate=1.000, avg_codelen: 1.025
    PASSED
    scl/compressors/elias_delta_uint_coder.py::test_elias_delta_uint_encode_decode PASSED
    scl/compressors/elias_delta_uint_coder.py::test_elias_delta_uint_encode PASSED
    scl/compressors/range_coder.py::test_range_coding 
    avg_log_prob=1.499, avg_codelen: 1.506
    avg_log_prob=1.484, avg_codelen: 1.490
    avg_log_prob=1.430, avg_codelen: 1.436
    avg_log_prob=0.000, avg_codelen: 0.006
    PASSED
    scl/compressors/fano_coder.py::test_fano_coding PASSED

    =========================================================== 53 passed, 4 xfailed in 51.27s ============================================================
   ```
   
### 1. Probability and Coin Toss (*20 points*)
Kedar is a big [Cricket](https://en.wikipedia.org/wiki/Cricket) fan. In cricket (like many other sports), there is a coin toss in the beginning to determine which team gets the first chance to bat. However, Kedar thinks that the coin being used is *biased* and lands as *Heads* (`H`) much more often than *tails* (`T`). Let the probability of the coin landing on `H` be $p$.

Shubham suggests to Kedar that this problem can be solved (i.e. we can get a *fair* coin) by tossing the coin twice! If we get a `H,T`sequence in the two tosses, then we mark it as a heads, while if we get a `T,H` sequence we can mark this as a tails. If we get a `H,H` or `T,T` then discard the result and start over!

1. [5 points] Do you think Shubham's solution is right? Please justify.  

   **Solution**

   Shubham's solution is right. Scheme only terminates when `H,T` or `T,H` sequences are received, which because of IID (independent and identically distributed) nature of our coin tosses and symmetry have the same probability.  In fact, the iterative scheme can be thought of as a Geometric Random variable. After every two tosses, the scheme terminates with probability of $p_{success}=2p(1-p)$ (getting either a `H,T` or `T,H` sequence) and we are back to initial state with a probability of $p_{failure}=\left(p^2 + (1-p)^2\right)$ (getting `H,H` or `T,T` sequence). If the scheme terminates after n sequences of these two tosses, we declare it heads or tails with the same probability of 

    $$
    \begin{aligned}
    p_{shubham-head} &= p_{failure}^{n-1} * p(H)*P(T) \\ &= p_{failure}^{n-1} * p(T)*P(H) \\ &= p_{shubham-tail}
    \end{aligned}
    $$

2. [5 points] What is the expected number of coin flips needed to get one `H` or `T` outcome using Shubham's method?
   
   **Solution**

   Using the fact that Shubham's solution is a Geometric Random variable with $p_{success}=2p(1-p)$ and involves two coin tosses per iteration, the expected number of coin flips needed to get one `H` or `T` outcome using Shubham's method is 
    
    $$
    \mathbb{E}(tosses) = 2 * 1/p_{success} = 1/p(1-p)
    $$

3. [5 points] Kedar is still not convinced and thinks that we should really implement this idea to see if it works. Please help out Shubham by implementing the function `shubhams_fair_coin_generator()` in the file `HWs/HW1/hw1_p1.py`. 
NOTE: please run all of this in the `(ee274_env)` environment which you created and that you are in the correct branch of the `SCL` repo (`EE274_Fall23/HWs`). Ensure that the tests except those in `HWs` folder pass before you start implementing the function.

   **Solution**

   ```python
   def shubhams_fair_coin_generator():
        """
        TODO:
        use the biased_coin_generator() function above to implement the fair coin generator

        Outputs:
            toss (str): "H" or "T"
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

4. [5 points] It is always a good practice to write tests to ensure the implementation is correct (even if you think theoretically it is alright :)). Please implement `test_shubhams_fair_coin_generator()` function in `HWs/HW1/hw1_p1.py`. You can test your code by running the following command in `stanford_compression_library/scl` folder:

    ```sh
    py.test -s -v HWs/HW1/hw1_p1.py
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
        # defined by the `decimal` argument.
        # NOTE: With 10000 trials, you can expect the empirical probability to match within `decimal=2` (2 decimal places)
        # and the average value of `num_biased_tosses` to match within `decimal=1` (1 decimal place). You can always
        # increase the num_trials to get better accuracy. The default value of `decimal=7` is too strict for our purpose.
        np.testing.assert_almost_equal(
            empirical_dist_tosses.probability("H"), 0.5, decimal=2,  err_msg="Probability of H is not 0.5",
        )
        np.testing.assert_almost_equal(
            empirical_dist_tosses.probability("T"), 0.5, decimal=2, err_msg="Probability of T is not 0.5",
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

    Yes, Shubham's solution is not optimal. We can improve upon the *average* number of biased coin tosses by carefully utilizing the cases of `H,H` and `T,T` sequences instead of throwing them away. For those of you who are aware of entropy, this problem has close relationship to the entropy! [Here](https://stanforddatacompressionclass.github.io/notes/coinflipext.pdf) is a detailed analysis of this problem by Michael Mitzenmacher.     


### Q2: Basic Information theory  (*20 points*)

1. [5 points] Let $X$ be a random variable over positive integers with a distribution $$P_X(X=k) = 2^{-k}, k \geq 1$$ 
Compute the entropy $H(X)$ of random variable $X$. What are the optimal code-lengths for a prefix-free code designed for distribution $P_X$?

   **Solution**
   
   $$
   H(X) = \sum_{k=1}^{\infty} 2^{-k} \log_2 \frac{1}{2^{-k}} = \sum_{k=1}^{\infty} k 2^{-k} = 2
   $$ 
   
   where the last equality comes from summing an [arithmetico-geometric progression](https://en.wikipedia.org/wiki/Arithmetico-geometric_sequence). The optimal code-lengths for a prefix-free code designed for distribution $P_X$ is $k$ for $X=k$ by using the $\left\lceil \log_2 \frac{1}{p(symbol)} \right\rceil$ rule.
   
2. [5 points] Provide an optimal prefix-free code design for the distribution $P_X$. 
   
   **Solution**
   One optimal prefix-free code design for the distribution $P_X$ is (note you can change `0` with `1` WLOG):
    $$ \begin{array}{|c|c|} \hline
    symbol & code \\ \hline
    1 & 0 \\ \hline
    2 & 10 \\ \hline
    3 & 110 \\ \hline
    4 & 1110 \\ \hline
    \vdots & \vdots \\ \hline
    \end{array}$$

3. [10 points] Let $Y$ be a random variable over positive integers such that $\mathbb{E}(Y) = 2$. 
Then show that:$$ H(Y) \leq 2 $$ 
For what distribution of the random variable $Y$ does the equality hold, i.e. $H(Y) = 2$? 
    **HINT:** KL-Divergence and it's properties will be helpful to show this.

   **Solution**
   Let's take KL divergence between the distribution $P_Y$ and the distribution $P_X$ defined in `Q1.1`.
   
   $$
    \begin{aligned}
    D_{KL}(P_Y||P_X) &= \sum_{k=1}^{\infty} P_Y(k) \log \frac{P_Y(k)}{P_X(k)} \\
    &= \sum_{k=1}^{\infty} P_Y(k) \log \frac{P_Y(k)}{2^{-k}} \\
    &= \sum_{k=1}^{\infty} k P_Y(k) - P_Y(k) \log \frac{1}{P_Y(k)} \\
    &= \mathbb{E}(Y) - H(Y) \\
    \end{aligned}
   $$
   where the last line uses the definition of expectation and entropy.

   Since we know that $D_{KL}(P_Y||P_X)$ is non-negative and $\mathbb{E}(Y) = 2$, we have that $H(Y) \leq 2$ showing the asked inequality.

   We also know that the equality in KL divergence holds when $P_Y = P_X$ and hence the equality holds for geometric distribution as described in part `Q1.1`, i.e. $$ P_Y(Y=k) = 2^{-k}, k \geq 1$$ 

### Q3. Uniquely decodable codes (*25 points*)

We mainly explored prefix-free codes in class. But there is a much broader class of codes, the uniquely decodable codes. A code is uniquely decodable if no two sequences (of length 1 or more) of input symbols (say $x^n$ and $y^m$) can produce the same encoding, and hence one can uniquely determine the input sequence from the encoding. In this question, we will show that even with the uniquely decodable codes, we cannot do better than the Entropy. 

1. [5 points] Consider the code `C1` below. Is `C1` uniquely decodable? Implement a decoder for the code below. Briefly justify your decoding procedure. 
    ```
    A -> 10
    B -> 00
    C -> 11
    D -> 110
    ```
    **Solution**
   The code `C1` is uniquely decodable. The decoding procedure is as follows:
   - read first two bits
   - if the read bits are `10`, then the decoded symbol is `A`
   - if the read bits are `00`, then the decoded symbol is `B`
   - if the read bits are `11`, then 
     - calculate number of `0`s in the remaining encoded bitstream till you get first `1`. say this number is $0_k$.
     - if $0_k$ is `odd`, then output `D` followed by $\frac{0_k - 1}{2}$ `B`.
     - if $0_k$ is `even`, then output `C` followed by $\frac{0_k}{2}$ `B`.
   - repeat the above procedure till you have decoded all the symbols.

   This procedure works because only `C` and `D` share a prefix but `C` is shorter than `D` but differ in only `1 bit` whereas there is no symbol which is being encoded using only `1 bit`. Hence, the decoding procedure is unambiguous.   

Consider an alphabet $\mathcal{U}$ and a uniquely decodable code with code lengths for $u \in \mathcal{U}$ denoted by $L(u)$. Also, we denote the codelength of the n-tuple $u^n$ as $L(u^n) = \sum_{i=1}^n L(u_i)$.

**HINT**: For parts `Q3.2` and `Q3.3`, you might find it easier to gain intuition by starting with small values of $|\mathcal{U}|$ and $n$ (e.g., binary alphabet with $n=1$ or $2$) and manually expanding the summations.

2. [5 points] Show that $$\left( \sum_{u \in \mathcal{U}} 2^{-L(u)} \right)^n = \sum_{u^n \in \mathcal{U}^n} 2^{-L(u^n)} $$

    **Solution**
    $$
    \begin{align}
    \left( \sum_{i=1}^{|\mathcal{U}|} 2^{-L(u_i)}\right)^{n} = \left( \sum\limits_{u \in \mathcal{U}} 2^{-L(u)}\right)^{n} &= \left( \sum\limits_{u_{1}} 2^{-L(u_{1})}\right)\cdot \left( \sum\limits_{u_{2}} 2^{-L(u_{2})}\right)\cdot ... \cdot \left( \sum\limits_{u_n} 2^{-L(u_{n})}\right)
    \\&=  \sum\limits_{u_{1}} \sum\limits_{u_{2}} ...  \sum\limits_{u_{n}}\prod\limits_{i=1}^n 2^{-L(u_{i})}
    \\&=\sum\limits_{u_{1}, ... u_{n}} 2^{-\sum_{i=1}^n L(u_{i})}
    \\&=\sum_{u^n \in \mathcal{U}^n} 2^{-L(u^n)}
    \end{align}
    $$
    where 
   - first line just rewrites the $n$th power of the Kraft sum as a product of $n$ distinct sums by renaming the variable.
   - second line pulls the sums out since the summation variables are all different.
   - third line moves product into the exponent where it becomes a sum
   - fourth line just uses the fact the code length of $u^n$ is simply the sum of code lengths of the symbols $u_1,\dots,u_n$.
   
3. [5 points] Let $l_{max} = \max_{u \in \mathcal{U}} L(u)$. Then we can rewrite the summation as: $$\sum_{u^n \in \mathcal{U}^n} 2^{-L(u^n)} = \sum_{j=1}^{n \cdot l_{max}} |\{u^n| L(u^n) = j\}| \cdot 2^{-j}$$ 

   NOTE: Rewriting summation is a common proof trick, and is a useful one to watch out for!
Using `Q3.2` and the identity above, show that:

   $$\left( \sum_{i=1}^{|\mathcal{U}|} 2^{-L(u_i)} \right)^n \leq n\cdot l_{max}$$

    **Solution**
   
    Let the maximum codelength be $l_{max} = \max_i l_k$. Then note that,

    $$
    \begin{align}
    \sum_{u^n \in \mathcal{U}^n} 2^{-L(u^n)} &=\sum\limits_{i=1}^{n\cdot l_{max}} \vert\lbrace u^{n} \vert L(u^{n}) = i \rbrace \vert \cdot 2^{-i}
    \end{align}
    $$

    Here we have clubbed the sum according to values of $2^{-L(u^{n})}$. This implies using result from `Q2.2` that 

     $$
     \begin{align}
     \left( \sum_{i=1}^{|\mathcal{U}|} 2^{-L(u_i)} \right)^n &= \sum_{u^n \in \mathcal{U}^n} 2^{-L(u^n)} \\
     &= \sum\limits_{i=1}^{n\cdot l_{max}} \vert\lbrace u^{n} \vert L(u^{n}) = i \rbrace \vert \cdot 2^{-i} \\
     &\leq \sum\limits_{i=1}^{n\cdot l_{max}} 2^i \cdot 2^{-i} = n\cdot l_{max}
     \end{align}
     $$

    where the last inequality uses the fact that the code is uniquely decodable and for such a code, the set of $n$-tuples giving a $i$ length bit sequence can be at most $2^i$.

4. [5 points] Using `Q3.3` show that uniquely decodable codes satisfy Kraft's inequality i.e. 

    $$\left( \sum_{u\in\mathcal{U}} 2^{-L(u)} \right) \leq 1$$

    **Solution**

    Using `Q2.3`, we have that $\left( \sum_{i=1}^{|\mathcal{U}|} 2^{-L(u_i)} \right)^n \leq n.l_{max}$ **for any $n$-tuple** of a uniquely-decodable code! Therefore, taking $n$-th root on both sides and taking limit as $n$ goes to infinity, we get that

    $$
    \begin{align}
    \left( \sum_{i=1}^{|\mathcal{U}|} 2^{-L(u_i)} \right) \leq \lim_{n \to \infty} (n\cdot l_{max})^{\frac{1}{n}} = 1
    \end{align}
    $$
    
    therefore showing that Kraft's inequality holds for uniquely decodable codes.

5. [5 points] Now show that for any uniquely decodable code for $U$ with codeword lengths $L(U)$, $$\mathbb{E}[L(U)] \geq H(U) .$$
  **NOTE:** We saw a similar proof for prefix-free codes in the class!<br>
  <br>
  Also argue that for any uniquely decodable code, it is possible to construct a prefix-free code with the same codeword lengths. 

    This means that uniquely decodable codes generally do not provide any benefits over prefix-free codes and instead have a more complicated decoding procedure!

    **Solution**

    <!-- **ToDo: expand**
    - Since uniquely decodable codes follow Kraft's inequality, same proof shows that expected codeword length is lower bounded by entropy.
    - Scheme to get a prefix-free code from uniquely decodable code would then be to extract the codelengths from the uniquely decodable code and then use the same code-lengths to construct a prefix-free code similar to Huffman tree. -->
    Let $q(u)=c 2^{-L(u)}$ be a PMF where the normalizing constant $c$ is chosen such that the probability sums to 1, i.e. $$c = \frac{1}{\sum_{u \in \mathcal{U}} 2^{-L(u)}}.$$ By the Kraft-McMillan Inequality, we know that $c \geq 1$.

    Let $p(u)$ be a PMF of $U$. Consider 

    $$
    \begin{aligned}
    E[L(U)]-H(U)&=\sum_{u \in \mathcal{U}} p(u) L(u)-\sum_{u \in \mathcal{U}} p(u) \log_2 \frac{1}{p(u)}\\
    & = -\sum_{u \in \mathcal{U}} p(u) \log_2 2^{-L(u)}+\sum_{u \in \mathcal{U}} p(u) \log_2 p(u)\\
    &=\sum_{u \in \mathcal{U}} p(u) \log_2 \frac{p(u)}{2^{-L(u)}} \\
    &=\sum_{u \in \mathcal{U}} p(u) \log_2 \frac{p(u)}{q(u) / c} \\
    &=\sum_{u \in \mathcal{U}} p(u) \log_2 \frac{p(u)}{q(u)} + \sum_{u \in \mathcal{U}} p(u) \log_2 c \\
    &= D_{KL}(p \Vert q) + \log_2 c \geq 0
    \end{aligned}
    $$
    where the last inequality holds since relative entropy is non-negative and $c \geq 1$. Thus $$E[L(U)] \geq H(U).$$

    Scheme to get a prefix-free code from uniquely decodable code would then be to extract the codelengths from the uniquely decodable code and then use the same code-lengths to construct a prefix-free code similar to Huffman tree.

### Q4: Shannon Code(s) (*25 points*)

In class, we saw one version of the Shannon codes; the [tree-based construction](https://stanforddatacompressionclass.github.io/notes/lossless_iid/prefix_free_codes.html#designing-prefix-free-codes).

1. [5 points]  Let's call it the `ShannonTreeEncoder` and the `ShannonTreeDecoder`. Manually calculate what the codewords should be for the following distributions:

    ```python
    ProbabilityDist({"A": 0.25, "B": 0.25, "C": 0.25, "D": 0.25})
    ProbabilityDist({"A": 0.5, "B": 0.25, "C": 0.12, "D": 0.13})
    ProbabilityDist({"A": 0.9, "B": 0.1})
    ```

    **Solution**
    - For the first distribution, the codewords should be `{"A": BitArray("00"), "B": BitArray("01"), "C": BitArray("10"), "D": BitArray("11")}`.
    - For the second distribution, the codewords should be `{"A": BitArray("0"), "B": BitArray("10"), "C": BitArray("1110"), "D": BitArray("110")}`.
    - For the third distribution, the codewords should be `{"A": BitArray("0"), "B": BitArray("1000")}`.

2. [10 points] Complete the code for the `ShannonTreeEncoder` in `hw1_p4.py`. Also, complete the `test_shannon_tree_coding_specific_case()` to check the correctness of your codewords in part 1 against your implemented code. If you encounter errors, you should identify the failing test case and fix any issues. Note: we will be using automated tests to grade your code, so it is important that you do not change the function signatures. We will have more test cases for grading, so feel free to add more test cases of your own of your own when working on the problem. 

    **Solution**
    ```python
    def generate_shannon_tree_codebook(cls, prob_dist):
        # sort the probability distribution in decreasing probability
        sorted_prob_dist = ProbabilityDist.get_sorted_prob_dist(
            prob_dist.prob_dict, descending=True
        )
        codebook = {}

        ############################################################
        # ADD CODE HERE
        # raise NotImplementedError
        import math
        from utils.bitarray_utils import uint_to_bitarray

        cur_state = 0 # tracks the next unused node
        cur_codelen = 1

        for s in sorted_prob_dist.prob_dict:
            codelen = math.ceil(sorted_prob_dist.neg_log_probability(s))
            cur_state = cur_state << (codelen-cur_codelen)
            cur_codelen = codelen
            codebook[s] = uint_to_bitarray(cur_state, bit_width=codelen)
            cur_state += 1
        ############################################################

        return codebook   
    ```
    ```python
    def test_shannon_tree_coding_specific_case():
        # NOTE -> this test must succeed with your implementation
        ############################################################
        # Add the computed expected codewords for distributions presented in part 1 to these list to improve the test
        # raise NotImplementedError
        distributions = [
                ProbabilityDist({"A": 0.5, "B": 0.5}),
                ProbabilityDist({"A": 0.25, "B": 0.25, "C": 0.25, "D": 0.25}),
                ProbabilityDist({"A": 0.5, "B": 0.25, "C": 0.12, "D": 0.13}),
                ProbabilityDist({"A": 0.9, "B": 0.1}),
            ]
        expected_codewords = [
                {"A": BitArray("0"), "B": BitArray("1")},
                {"A": BitArray("00"), "B": BitArray("01"), "C": BitArray("10"), "D": BitArray("11")},
                {"A": BitArray("0"), "B": BitArray("10"), "C": BitArray("1110"), "D": BitArray("110")},
                {"A": BitArray("0"), "B": BitArray("1000")},
            ]
        ############################################################
    
        def test_encoded_symbol(prob_dist, expected_codeword_dict):
            """
            test if the encoded symbol is as expected
            """
            encoder = ShannonTreeEncoder(prob_dist)
            for s in prob_dist.prob_dict.keys():
                assert encoder.encode_symbol(s) == expected_codeword_dict[s]
    
        for i, prob_dist in enumerate(distributions):
            test_encoded_symbol(prob_dist, expected_codeword_dict=expected_codewords[i])   
    ```
---

We have also studied the tree-parsing based decoding for Shannon codes (or prefix-free codes in general). This decoding has already been implemented in the `ShannonTreeDecoder`. The core tree-parsing logic can be found in [here](https://stanforddatacompressionclass.github.io/notes/lossless_iid/prefix_free_codes.html). The tree-parsing based decoder works well however includes too many if/else conditions which leads to branching -- this is pretty bad for modern hardware. ([Here](https://stackoverflow.com/questions/9820319/why-is-a-cpu-branch-instruction-slow#:~:text=A%20branch%20instruction%20is%20not,sequential%20instructions%20being%20executed%20simultaneously) is some additional information about this inefficiency for those interested.)

In this next subproblem, we will implement another decoder which we call the `ShannonTableDecoder`. The `ShannonTableDecoder` works by creating a *decoding lookup table* and then using it for decoding symbols without branching. 

As an example, lets consider the following simple code:
```python
encoding_table = {"A": 0, "B": 10, "C": 110, "D": 111}
```

In this case, the `ShannonTableDecoder` keeps track of data using following tables:
```python
decoding_table = {
    000: "A",
    001: "A",
    010: "A",
    011: "A",
    100: "B",
    101: "B",
    110: "C",
    111: "D",
}
codelen_table = {
    "A": 1,
    "B": 2,
    "C": 3,
    "D": 3,
}
max_codelen = 3
```

The tables can be then used for decoding as per the pseudo-code below.  

```python
def decode_symbol_table(encoded_bitarray):
    state = encoded_bitarray[:max_codelen] 
    decoded_symbol = decoding_table[str(state)]
    num_bits_consumed = codelen_table[decoded_symbol]
    return decoded_symbol, num_bits_consumed
```

3. [5 points] Based on the pseudo-code above, explain in a few sentences how the table based decoding works. Why do you need to output both the decoded symbol and the number of bits consumed?

    **Solution**
    `decode_symbol_table(encoded_bitarray)` takes the first `max_codelen` bits from the `encoded_bitarray` and uses it as a key to look up the `decoding_table` to get the decoded symbol. It then uses the decoded symbol to look up the `codelen_table` to get the number of bits consumed. It then returns the decoded symbol and the number of bits consumed. The number of bits consumed is needed to know where to start the next decoding from.

4. [5 points] Complete the `ShannonTableDecoder` in `hw1_p4.py` by implementing the `create_decoding_table` function. You can verify if your implementation is correct by using `test_shannon_table_coding_end_to_end` function.

    **Solution**
    ```python
    @staticmethod
    def create_decoding_table(prob_dist: ProbabilityDist):
        """
        :param prob_dist: ProbabilityDist object
        :return:
            decoding_table: dictionary mapping str to symbols
            codelen_table: dictionary mapping symbols to code-length
            max_codelen: maximum code-length of any symbol in the codebook
        """
        # create the encoding table
        encoding_table = ShannonTreeEncoder.generate_shannon_tree_codebook(prob_dist)
        ############################################################
        # ADD CODE HERE
        # NOTE: You might find the following utility functions useful:
        # - ProbabilityDist.neg_log_probability
        # - scl.utils.bitarray_utils.uint_to_bitarray and scl.utils.bitarray_utils.bitarry_to_uint

        # NOTE: IMPORTANT - The keys of decoding_table must be strings (not BitArray).
        #                   This is because BitArray type is not hashable. You can
        #                   still use BitArray to construct the codeword but before
        #                   indexing into decoding_table simply convert to string like
        #                   str(bitarray).

        # we now create the decoding table based on the encoding table
        # first get the maximum length
        max_codelen = max(len(code) for code in encoding_table.values())

        # create a empty table of size 2^{max_codelen}
        decoding_table = {}
        codelen_table = {}
        # let's fill the decoding table
        for s, code in encoding_table.items():
            codelen = len(code)
            start_index = bitarray_to_uint(code + "0" * (max_codelen - codelen))
            num_indices = 1 << (max_codelen - codelen)
            for ind in range(start_index, start_index + num_indices):
                decoding_table[str(uint_to_bitarray(ind, bit_width=max_codelen))] = s
            codelen_table[s] = codelen
        return decoding_table, codelen_table, max_codelen
    ```

### Q5. Huffman coding on real data (*30 points*)

In class, we have studied compression for sources where we knew the distribution of data beforehand. In most real-life scenarios, this is not the case. Often times, we use the empirical distribution of the data and design a code for this distribution. Then we encode the data with this distribution. For the decoding to work, we also need to transmit the distribution or the code in some way. This problem focuses on compression of a provided file with Huffman coding.

Before we start with the code, let's look at how important it is to transmit the distribution faithfully to achieve lossless compression. 

1. [10 points] Consider the probability distribution represented as a mapping from a symbol to its probability: `{A: 0.11, B: 0.09, C: 0.09, D: 0.71}`. 

    a. What are the codeword lengths for the symbols in the Huffman code?

    **Solution**
    Building the huffman tree,
    ```mermaid
        graph TD
        N1["B<br/>(p=0.09)"]:::endnode
        N2("C<br/>(p=0.09)"):::endnode
        N3("A<br/>(p=0.11)"):::endnode
        N4("D<br/>(p=0.71)"):::endnode
        N5("N1<br/>(p=0.18)") --> N1
        N5 --> N2
        N6("N2<br/>(p=0.29)") --> N3
        N6 --> N5
        N7("*<br/>(p=1.0)") --> N4
        N7 --> N6
        
        style N5 fill:#dddddd
        style N6 fill:#dddddd
        style N7 fill:#dddddd
    ```

    the codeword lengths are
    `{A: 2, B: 3, C: 3, D: 1}`

    After a harrowing cab experience in the US, Pulkit wants to send a codeword `BADCAB` to Shubham to describe his frustration. Shubham and Pulkit had agreed to use Huffman encoding for such communications in the past. He encodes the codeword `BADCAB` using a Huffman code for the original distribution `{A: 0.11, B: 0.09, C: 0.09, D: 0.71}`, and sends both the codeword and this distribution  to Shubham (so that Shubham is able to decode it on his end by building a Huffman tree on his own). 

    b. Unfortunately,  Shubham decodes the message to be `CADBAC` instead of `BADCAB` making him confused. What might have gone wrong during this communication between the two?

    **HINT:** notice the specific encoded and decoded symbols in the message.

    **Solution**
    When Shubham built his Huffman tree, he inverted the codewords for `B` and `C` since they have the same codelengths, and hence decoded the message incorrectly by switching the two letters in his decoding. Recall that, huffman codes are not unique and hence the codeword lengths are not enough to reconstruct the Huffman tree. The order of the symbols in the distribution is also important to reconstruct the Huffman tree. 

    Pulkit-Shubham realized this issue and fixed it. 

    c. In the spirit of frugality, Pulkit decides to transmit a rounded distribution with just one significant decimal (`{A: 0.1, B: 0.1, C: 0.1, D: 0.7}`). What are the codeword lengths for the symbols in the Huffman code for this distribution? Are there multiple possible Huffman code lengths? Why?

    **Solution**

    There are multiple possible Huffman code lengths since the distribution is not unique. For example, the distribution `{A: 2, B: 3, C: 3, D: 1}` or `{A: 3, B: 3, C: 2, D: 1}` are valid huffman codeword lengths for each character depending on how the ties were broken in merging the first symbol.

    These issues suggest that it is important to transmit the distribution faithfully to achieve lossless compression. In addition, the encoder and the decoder must share the same deterministic algorithm to construct the Huffman tree from the distribution.

With this context, look at the provided starter code in `hw1_p5.py` which does the following:
1. Loop over the file in blocks of size 50 KB.
2. For each block, compute the empirical distribution from the data. This simply means we get the counts of each possible byte value $\{0, 1, 2, \ldots, 255\}$ in the block and normalize by the block length to get an approximate empirical probability distribution.
3. Apply Huffman encoding on the block assuming this empirical distribution.
4. Encode the empirical probability distribution in bits so that decoder knows what probability distribution to use for decoding.
5. Final encoding is the encoding from step 4 concatenated with the encoding from step 3.

To understand the overall process, you should go through the provided code and specifically the `encode_block` and `decode_block` functions. 

2. [10 points] Implement the encoding and decoding of probability distribution step above (Step 4) in the functions `encode_prob_dist` & `decode_prob_dist` respectively. There are multiple ways to encode this, and we are not looking for the most optimized implementation here. Note that we are working with 50 KB blocks here, while the alphabet size is just 256. So as long as your implementation is not absurdly bad, the overhead will be small. You might find the following pointers useful as you implement the function: 
    - The input `bitarray` to `decode_prob_dist` can include more than the encoding of the probability distribution itself. Thus, it should only read as much as it needs and return the number of bits read so that the Huffman decoding can start from the next bit.
    - Python dictionaries are [OrderedDicts](https://stackoverflow.com/questions/39980323/are-dictionaries-ordered-in-python-3-6). If you are using dictionaries to represent probability distribution, then it is critical to maintain this ordering while creating Huffman trees during encoding/decoding. See the Pulkit-Shubham communication fiasco above for an example of what can go wrong if the order is not preserved.
    - Python's `float` type is equivalent to the `double` type in C (see [this](https://docs.python.org/3/library/stdtypes.html#numeric-types-int-float-complex) for a refresher). As long as you provide the same exact distribution to the encoder and decoder, all is well!
      - **IMPORTANT**: Unless you are feeling particularly adventurous, we strongly recommend using the provided helper functions `float_to_bitarray64` and `bitarray64_to_float` for conversion between `float` and `BitArray`.
    - Also, you will hear about [Canonical Huffman code](https://en.wikipedia.org/wiki/Canonical_Huffman_code) in class, which provides an alternative to solve some of these issues in practice. You do not need it for this question.

Verify that your implementation is correct by running
    ```
    py.test -s -v HWs/HW1/hw1_p5.py
    ```
If you encounter errors, you should identify the failing test case and fix any issues. Note: we will be using automated tests to grade your code, so it is important that you do not change the function signatures and that your code passes these tests. We will have more test cases for grading, so feel free to add more test cases of your own when working on the problem. But these should be sufficient to get you started.
   
**Solution**

We first encode the number of symbols with a 32-bit integer, followed by pairs of (symbol - 8 bit, probability - 64 bit). Students can have various different ways to serialize and deserialize the probability table, and we have accepted all of them as valid solutions as long as the pass they end-to-end encoding-decoding test.

```python
def encode_prob_dist(prob_dist: ProbabilityDist) -> BitArray:
    """Encode a probability distribution as a bit array

    Args:
        prob_dist (ProbabilityDist): probability distribution over 0, 1, 2, ..., 255
            (note that some probabilities might be missing if they are 0).

    Returns:
        BitArray: encoded bit array
    """
    prob_dict = prob_dist.prob_dict # dictionary mapping symbols to probabilities

    #########################
    # ADD CODE HERE
    # You can find int_to_bitarray8 and float_to_bitarray64 useful
    # to encode the symbols and the probabilities respectively.
    # uint_to_bitarray from utils.bitarray_utils can also come in handy
    # to encode any other integer values your solution requires.
    
    num_symbols = len(prob_dict)
    encoded_probdist_bitarray = uint_to_bitarray(num_symbols, bit_width=32)
    for symbol, prob in prob_dict.items():
        encoded_probdist_bitarray += int_to_bitarray8(symbol)
        encoded_probdist_bitarray += float_to_bitarray64(prob)

    #########################

    return encoded_probdist_bitarray
```

```python
def decode_prob_dist(bitarray: BitArray) -> Tuple[ProbabilityDist, int]:
    """Decode a probability distribution from a bit array

    Args:
        bitarray (BitArray): bitarray encoding probability dist followed by arbitrary data

    Returns:
        prob_dist (ProbabilityDist): the decoded probability distribution
        num_bits_read (int): the number of bits read from bitarray to decode probability distribution
    """
    #########################
    # ADD CODE HERE
    # You can find bitarray8_to_int and bitarray64_to_float useful
    # to decode the symbols and the probabilities respectively.
    # bitarray_to_uint from utils.bitarray_utils can also come in handy
    # to decode any other integer values your solution requires.
    prob_dict = {}
    num_bits_read = 0
    num_symbols = bitarray_to_uint(bitarray[num_bits_read:num_bits_read+32])
    num_bits_read += 32
    for _ in range(num_symbols):
        symbol = bitarray8_to_int(bitarray[num_bits_read:num_bits_read+8])
        num_bits_read += 8
        prob = bitarray64_to_float(bitarray[num_bits_read:num_bits_read+64])
        num_bits_read += 64
        prob_dict[symbol] = prob
    
    # raise NotImplementedError("You need to implement decode_prob_dist")
    #########################

    prob_dist = ProbabilityDist(prob_dict)
    return prob_dist, num_bits_read
```

3. [5 points] Now download the Sherlock Holmes novel "The Hound of the Baskervilles by Arthur Conan Doyle" using the following command. 
    ```sh
    curl -o HWs/HW1/sherlock.txt https://www.gutenberg.org/files/2852/2852-0.txt
    ```
    Run the following commands to compress the file using your newly developed compressor, decompress it back, and verify that the decompression succeeds.

    ```sh
    python HWs/HW1/hw1_p5.py -i HWs/HW1/sherlock.txt -o HWs/HW1/sherlock.txt.huffz
    python HWs/HW1/hw1_p5.py -d -i HWs/HW1/sherlock.txt.huffz -o HWs/HW1/sherlock.txt.decompressed
    cmp HWs/HW1/sherlock.txt HWs/HW1/sherlock.txt.decompressed
    ```
    Nothing should be printed on the terminal as a result of the last command if the files match.
    
    - Report the size of your compressed file. You can run `wc -c HWs/HW1/sherlock.txt.huffz` to print the size.
    - How much is the overhead due to storing the probability distribution? **Note:** One easy way to check this to replace `encode_prob_dist` with a version that just returns `BitArray()`. Obviously the decoding won't work with this change!
    - Print the obtained huffman tree on sherlock.txt by using the `print_huffman_tree` function (commented in `encode_block` function of `HuffmanEmpiricalEncoder`). What do you observe? Does the printed Huffman tree make sense? Why or why not?

**Solution**
- The size of the compressed file using implementation as given in solution above is `207797` bytes.
- The size of the compressed file without probability table is `202392 bytes`. So the overhead using our approach is `5405 bytes` (~$2.67\%$).
- We get a huge Huffman tree, so we are skipping reproducing it here in the solution manual. But the observed Huffman tree makes sense with frequently occurring vowels and punctuation getting lower lengths compared to rarely occurring characters like `X` or unassigned ASCII codes. 

4. [3 points] What happens if you repeatedly use this compressor on the file (`sherlock.txt -> sherlock.txt.huffz -> sherlock.txt.huffz.huffz -> ...`)? Does the file size keep getting smaller? Why or why not? 

**Solution**
The size of `sherlock.txt.huffz.huffz` is `217122 bytes`, which is larger than `sherlock.txt.huffz` (`207797 bytes`). After the first compression, the data becomes more random and less compressible, leading to larger file sizes in subsequent compressions due to various overhead factors. Widely used compressors like gzip and zstd generally guarantee that the file size will not increase by more than some small number of bytes for any random input, which is useful to prevent blowup. This can be achieved by falling back to storing the input uncompressed if the compression does not reduce the size.

5. [2 points] Now run gzip on the file (command: `gzip < HWs/HW1/sherlock.txt > HWs/HW1/sherlock.txt.gz`) and report the size of the gzip file (`sherlock.txt.gz`). 

You will observe that gzip does significantly better than the Huffman coding, even if we ignore the overhead from part 3. While gzip uses Huffman coding internally, it also relies on other ideas that we will learn about in the coming lectures. 

**Solution**

The size of the gzip file is `128141 bytes`, which is significantly smaller than our Huffman coded file of size `207797 bytes`.

One of the reasons for this is because gzip compresses data in blocks instead of at the level of single-symbol like we implemented in this problem. Another reason is that gzip uses a more sophisticated algorithm called LZ77. LZ77 is a lossless compression algorithm that is based on the observation that many files contain repeated patterns. LZ77 uses a sliding window to find repeated patterns and replaces them with a pointer to the location of the pattern. This is a very powerful technique that is used in many compression algorithms. We will study LZ77 in more detail in future class and next homework.