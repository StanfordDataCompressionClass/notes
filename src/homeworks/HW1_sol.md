# EE274: Homework-1

- **Focus area:** Prefix-free codes, Basic Information theory
- **Due Date:** Oct 21, midnight
- **Weightage:** 20%
- **Total Points:** 115
- **Submission Instructions:** Provided at the end of HW (ensure you read these!)
- **Submission link:** 
  - For written part: [HW1-Written](https://www.gradescope.com/courses/436519/assignments/2326752)
  - For programming part: [HW1-Code](https://www.gradescope.com/courses/436519/assignments/2326764)

### Q1: Basic Information theory  (*20 points*)

1. [5 points] Let $X$ be a random variable over positive integers with a distribution 
$$ P_X(X=k) = 2^{-k}, k \geq 1$$ 
Compute the entropy $H(X)$ of random variable $X$. What are the optimal code-lengths for a prefix-free code designed for distribution $P_X$?

    **Solution**
    $$ H(X) = \sum_{k=1}^{\infty} 2^{-k} \log_2 \frac{1}{2^{-k}} = \sum_{k=1}^{\infty} k 2^{-k} = 2 $$
    where the last equality comes from summing an [arithmetico-geometric progression](https://en.wikipedia.org/wiki/Arithmetico-geometric_sequence). 

    The optimal code-lengths for a prefix-free code designed for distribution $P_X$ is $k$ for $X=k$ by using the $\left\lceil \log_2
   \frac{1}{p(symbol)} \right\rceil$ rule.   
    
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
Then show that:
$$ H(Y) \leq 2 $$ 
For what distribution of the random variable $Y$ does the equality hold, i.e. $H(Y) = 2$? 
HINT: KL-Divergence and it's properties will be helpful to show this.

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

### Q2. Uniquely decodable codes (*20 points*)

We mainly explored the prefix-free codes in class. But there is a much broader class of codes, the uniquely decodable codes. In this question, we will show that even with the uniquely decodable codes, we cannot do better than the Entropy. 

1. [5 points] Consider the code `C1` below. Is `C1` uniquely decodable? Give a decoding procedure for `C1` if you claim it is uniquely decodable. Briefly justify your decoding procedure. 
    ```
    A -> 10
    B -> 00
    C -> 11
    D -> 110
    ```

The code-lengths for the uniquely decodable code are denoted as $l_1, l_2, \ldots, l_{|\mathcal{U}|}$. Also, we denote the codelength of the n-tuple $u^n$ as $L(u^n)$. In particular, if $u_i = r$ for example, then $L(u_i) = l_r$. 

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

   This procedure works because only `C` and `D` share a prefix but `C` is shorter than `D` but differ in only `1 bit` whereas there is no symbol which is being encoded using only `1 bit`.

2. [5 points] Show that $$\left( \sum_{i=1}^{|\mathcal{U}|} 2^{-L(u_i)} \right)^n = \sum_{u^n \in \mathcal{U}^n} 2^{-L(u^n)} $$

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

3. [5 points] Let $l_{max} = \max_{i=1}^{|\mathcal{U}|} L(u_i)$. Then we can rewrite the summation as: $$\sum_{u^n \in \mathcal{U}^n} 2^{-L(u^n)} = \sum_{j=1}^{n.l_{max}} |\{u^n| L(u^n) = j\}|. 2^{-j}$$ 

   NOTE: Rewriting summation is a common proof trick, and is a useful one to watch out for!
Using `Q2.2` and the identity above, show that:

   $$\left( \sum_{i=1}^{|\mathcal{U}|} 2^{-L(u_i)} \right)^n \leq n.l_{max}$$
    
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


4. [5 points] Using `Q2.3` show that uniquely decodable codes satisfy Kraft's inequality. i.e. 

    $$\left( \sum_{i=1}^{|\mathcal{U}|} 2^{-L(u_i)} \right) \leq 1$$

    **Solution**

    Using `Q2.3`, we have that $\left( \sum_{i=1}^{|\mathcal{U}|} 2^{-L(u_i)} \right)^n \leq n.l_{max}$ **for any $n$-tuple** of a uniquely-decodable code! Therefore, taking $n$-th root on both sides and taking limit as $n$ goes to infinity, we get that

    $$
    \begin{align}
    \left( \sum_{i=1}^{|\mathcal{U}|} 2^{-L(u_i)} \right) \leq \lim_{n \to \infty} \(n\cdot l_{max}\)^{\frac{1}{n}} = 1
    \end{align}
    $$
    therefore showing that Kraft's inequality holds for uniquely decodable codes.

Note that, as *uniquely decodable* codes satisfy the Kraft's Inequality similar to *prefix-free codes*, `Q2.4` shows that $H(U)$ is also the fundamental limit on the average codelength $\mathbb{E}[L(U)]$ for any uniquely decodable codes. Proof of this statement is same as proof for prefix-free codes as we only use Kraft's Inequality in showing that $\mathbb{E}[L(X)] \geq H(X)$ (see [lecture notes](https://stanforddatacompressionclass.github.io/notes/lossless_iid/entropy.html) for more details).

### Q3. Huffman coding on real data (*20 points*)

In class, we have studied compression for sources where we knew the distribution of data beforehand. In most real-life scenarios, this is not the case. Often times, we use the empirical distribution of the data and design a code for this distribution. Then we encode the data with this distribution. For the decoding to work, we also need to transmit the distribution or the code in some way. This problem focuses on compression of a provided file with Huffman coding.

The provided starter code in hw1_p3.py does the following:
1. Loop over the file in blocks of size 50 KB.
2. For each block, compute the empirical distribution from the data. This simply means we get the counts of each possible byte value $\{0, 1, 2, \ldots, 255\}$ in the block and normalize by the block length to get an approximate empirical probability distribution.
3. Apply Huffman encoding on the block assuming this empirical distribution.
4. Encode the empirical distribution in bits so that decoder knows what probability distribution to use for decoding.
5. Final encoding is the encoding from step 4 concatenated with the encoding from step 3.

To understand the overall process, you can go over the provided `encode_block` and `decode_block` functions. Note that the decoding of the probability distribution from the bit array also needs to return the length of the encoding so that the Huffman decoding can start from the next bit.

1. [10 points] Implement the encoding and decoding of probability distribution step above (Step 4) in the functions `encode_prob_dist` & `decode_prob_dist` respectively. There are multiple ways to encode this, and we are not looking for the most optimized implementation here. Note that we are working with 50 KB blocks here, while the alphabet size is just 256. So as long as your implementation is not absurdly bad, the overhead will be small.
Verify that your implementation is correct by running
    ```
    py.test -s -v HWs/HW1/hw1_p3.py
    ```
   
    **Solution**

    One way to encode and decode the probability distribution is by using [pickle](https://docs.python.org/3/library/pickle.html). Students have various different ways to serialize and deserialize the probability table, and we have accepted all of them as valid solutions as long as they pass they end-to-end encoding-decoding test.

    ```python
    def encode_prob_dist(prob_dist: ProbabilityDist) -> BitArray:
        """Encode a probability distribution as a bit array
    
        Args:
            prob_dist (ProbabilityDist): probability distribution over 0, 1, 2, ..., 255
                (note that some probabilities might be missing if they are 0).
    
        Returns:
            BitArray: encoded bit array
        """
        #########################
        # ADD CODE HERE
        # bits = BitArray(), bits.frombytes(byte_array), uint_to_bitarray might be useful to implement this
        # raise NotImplementedError("You need to implement encode_prob_dist")
    
        # pickle prob dist and convert to bytes
        pickled_bits = BitArray()
        pickled_bits.frombytes(pickle.dumps(prob_dist))
        len_pickled = len(pickled_bits)
        # encode length of pickle
        length_bitwidth = 32
        length_encoding = uint_to_bitarray(len_pickled, bit_width=length_bitwidth)
    
        encoded_probdist_bitarray = length_encoding + pickled_bits
        #########################
    
        return encoded_probdist_bitarray
   ```
   
   ```python
    def decode_prob_dist(bitarray: BitArray) -> Tuple[ProbabilityDist, int]:
        """Decode a probability distribution from a bit array
    
        Args:
            bitarray (BitArray): bitarray encoding probability dist followed by arbitrary data
    
        Returns:
            prob_dit (ProbabilityDist): the decoded probability distribution
            num_bits_read (int): the number of bits read from bitarray to decode probability distribution
        """
        #########################
        # ADD CODE HERE
        # bitarray.tobytes() and bitarray_to_uint() will be useful to implement this
        # raise NotImplementedError("You need to implement decode_prob_dist")
        # first read 32 bits from start to get the length of the pickled sequence
        length_bitwidth = 32
        length_encoding = bitarray[:length_bitwidth]
        len_pickled = bitarray_to_uint(length_encoding)
        # bits to bytes
        pickled_bytes = bitarray[length_bitwidth: length_bitwidth + len_pickled].tobytes()
    
        prob_dist = pickle.loads(pickled_bytes)
        num_bits_read = length_bitwidth + len_pickled
        #########################
        return prob_dist, num_bits_read
   ```

2. [5 points] Now download the Sherlock Holmes novel "The Hound of the Baskervilles by Arthur Conan Doyle" using the following command. 
    ```sh
    curl -o HWs/HW1/sherlock.txt https://www.gutenberg.org/files/2852/2852-0.txt
    ```
    Run the following commands to compress the file using your newly developed compressor, decompress it back, and verify that the decompression succeeds.

    ```sh
    python HWs/HW1/hw1_p3.py -i HWs/HW1/sherlock.txt -o HWs/HW1/sherlock.txt.huffz
    python HWs/HW1/hw1_p3.py -d -i HWs/HW1/sherlock.txt.huffz -o HWs/HW1/sherlock.txt.decompressed
    cmp HWs/HW1/sherlock.txt HWs/HW1/sherlock.txt.decompressed
    ```
    Nothing should be printed on the terminal as a result of the last command if the files match.
    
    - Report the size of your compressed file. You can run `wc -c sherlock.txt.huffz` to print the size.
    - How much is the overhead due to storing the probability distribution? **Note:** One easy way to check this to replace `encode_prob_dist` with a version that just returns `BitArray()`. Obviously the decoding won't work with this change!
    - Print the obtained huffman tree on sherlock.txt by using the `print_huffman_tree` function. What do you observe? Does the printed Huffman tree make sense? Why or why not?

    **Solution**
    - The size of the compressed file using implementation as given in solution above is `221804` bytes.
    - The size of the compressed file without probability table is `214409 bytes`. So the overhead using our approach is `7395 bytes` (~$3.45\%$).
    - We get a huge Huffman tree, so we are skipping reproducing it here in the solution manual. But the observed Huffman tree makes sense with frequently occurring vowels and punctuation getting lower lengths compared to rarely occurring characters like `X` or unassigned ASCII codes. 

3. [5 points] Now run gzip on the file (command: `gzip < HWs/HW1/sherlock.txt > HWs/HW1/sherlock.txt.gz`) and report the size of the gzip file (`sherlock.txt.gz`). What happens if you run our Huffman compressor on the gzipped file above? Do you see any further reduction in size? Why/why not?

    **Solution**
    - The size of the compressed file using gzip is `134718 bytes`.
    - The size of the compressed file using our Huffman compressor on the gzipped file is `143409 bytes`. So there is no further reduction in size but instead an increase in size! This is because the Huffman compressor is not able to compress the file further as the file is already compressed using gzip which uses Huffman coding as part of its compression procedure. Gzip also uses LZ77 as described in the note in the problem.

You will observe that gzip does significantly better than the Huffman coding, even if we ignore the overhead from part 3. One of the reasons for this is because gzip compresses data in blocks instead of at the level of single-symbol like we implemented in this problem. Another reason is that gzip uses a more sophisticated algorithm called LZ77. LZ77 is a lossless compression algorithm that is based on the observation that many files contain repeated patterns. LZ77 uses a sliding window to find repeated patterns and replaces them with a pointer to the location of the pattern. This is a very powerful technique that is used in many compression algorithms. We will study LZ77 in more detail in future class and next homework.

### Q4: Shannon Code(s) (*30 points*)

1. [5 points] In class we saw one version of the Shannon codes; the [tree-based construction](https://stanforddatacompressionclass.github.io/notes/lossless_iid/prefix_free_codes.html#designing-prefix-free-codes). Let's call it the `ShannonTreeEncoder` and the `ShannonTreeDecoder`. Manually calculate what the codewords should be for the following distributions:

    ```python
    ProbabilityDist({"A": 0.25, "B": 0.25, "C": 0.25, "D": 0.25})
    ProbabilityDist({"A": 0.5, "B": 0.25, "C": 0.12, "D": 0.13})
    ProbabilityDist({"A": 0.9, "B": 0.1})
    ```
   
    **Solution**
    - For the first distribution, the codewords should be `{"A": BitArray("00"), "B": BitArray("01"), "C": BitArray("10"), "D": BitArray("11")}`.
    - For the second distribution, the codewords should be `{"A": BitArray("0"), "B": BitArray("10"), "C": BitArray("1110"), "D": BitArray("110")}`.
    - For the third distribution, the codewords should be `{"A": BitArray("0"), "B": BitArray("1000")}`.


2. [10 points] Complete the code for the `ShannonTreeEncoder` in `hw1_p4.py`. Also, complete the `test_shannon_tree_coding_specific_case()` to check the correctness of your codewords in part 1 against your implemented code. 

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

As a fun exercise, we are going to look at another code construction of the *Shannon code*, which also achieves code-lengths $ l(
symbol) = \left\lceil \log_2 \frac{1}{p(symbol)} \right\rceil $. The construction is actually much simpler than the one
we discussed, but is a bit harder to justify. Here we go:

a. Given the probabilities $p_1, p_2, \ldots, p_k$, sort them in the descending order. WLOG let $$ p_1 \geq p_2 \geq \ldots \geq p_k$$
b. compute the cumulative probabilities $c_1, c_2, \ldots, c_k$ such that:
   $$ \begin{aligned}
   c_1 &= 0 \\
   c_2 &= p_1 \\
   c_3 &= p_1 + p_2 \\
   &\ldots \\
   c_k &= p_1 + p_2 + \ldots + p_{k-1}
   \end{aligned} $$
c. Note that we can represent any real number between $[0,1)$ in binary as $b0.b_1 b_2 b_3 \ldots $, where $b_1, b_2,
   b_3, \ldots$ are some bits. For example:
   $$ \begin{aligned}
   0.5 &= b0.1 \\
   0.25 &= b0.01 \\
   0.3 &= b0.010101...
   \end{aligned} $$ This is very similar to how we represent real numbers using "decimal" floating point value, but it
   is using "binary" floating point values (This is actually similar to how computers represent floating point numbers
   internally!)

d. If the "binary" floating point representation is clear, then the Shannon code for symbol $r$ of codelength $ l_r =
   \left\lceil \log_2 \frac{1}{p_r} \right\rceil $ can be obtained by simply truncating the binary floating point
   representation of $c_r$.

The full implementation of this version of Shannon codes can be found in SCL [Shannon codes](https://github.com/kedartatwawadi/stanford_compression_library/blob/dfb15ecaa7ac060180531146c25a803d20bf8d8f/compressors/shannon_coder.py)

This version of Shannon codes is much simpler that the Tree based construction we have. But, it is not obvious why it works. i.e. why should the construction lead to prefix-free codes.

3. [5 points] Given a binary string, $x = b_1 b_2 \ldots b_k$, let $R(x)$ be the real number $b0.b_1b_2b_3 \ldots b_k$ corresponding to it lying between $[0,1)$. For example: `10110 -> b0.10110`. Show that, a binary string $y$ has $x$ as its prefix, if and only if:

    $$R(x) \leq R(y) < R(x) + 2^{-k}$$

    **Solution**

    Since $x$ is a prefix of $y$, then $y$ must be of the form of $0.xb_{k+1} b_{k+2} \ldots b_{k+m}$, where $b_{k+1}, b_{k+2}, \ldots, b_{k+m}$ are some bits. This means that $$ R(y) = R(x) + b_{k+1} 2^{-k-1} + b_{k+2} 2^{-k-2} + \ldots + b_{k+m} 2^{-k-m} = R(x) + \sum_{i=1}^m b_{k+i} 2^{-k-i}$$

    Therefore, 

    $$
    \begin{aligned}
    R(y) - R(x) &= \sum_{i=1}^m b_{k+i} 2^{-k-i} \\
    &\leq \sum_{i=1}^m 2^{-k-i} \\
    &= 2^{-k} \sum_{i=1}^m 2^{-i} \\
    &< 2^{-k} \times 1 \\
    &= 2^{-k}
    \end{aligned}
    $$

    and

    $$
    \begin{aligned}
    R(y) - R(x) &= \sum_{i=1}^m b_{k+i} 2^{-k-i} \\
    & \geq 0
    \end{aligned}
    $$

    where we have used the fact that $b_{k} \in \{0,1\} \forall k$.

    Therefore, $R(x) \leq R(y) < R(x) + 2^{-k}$.


4. [5 points] Using the property in `Q4.3` prove that any Prefix-free code with lengths $l_1,l_2,\ldots,l_k$, satisfies:
$$ \sum_{i=1}^n 2^{-l_i} \leq 1 $$
i.e. we have an alternative proof for the Kraft inequality. 

    **Solution**

    As shown in previous part, since each prefix-free code of codelength $l_i$ occupies non-overlapping $2^{-l_i}$ fraction of length in $\[0, 1\)$, therefore

    $$ \sum_{i=1}^n 2^{-l_i} \leq 1 $$

    showing the Kraft's inequality.

5. [5 points] Using the property in `part 3` show that the construction of the Shannon codes does indeed lead to prefix-free codes. 

    **Solution**

    Let $x$ and $y$ be two symbols, and $c(x)$ and $c(y)$ be cumulative probabilities as described in the Shannon code construction. WLOG assume that $p(x) \geq p(y)$. Then given the provided construction of codewords, since we sort the probabilities before calculating the cumulative probabilities, we have that $c(x) \leq c(y)$. Let, $ L(x) =\left\lceil \log_2 \frac{1}{p(x)} \right\rceil $ be the codelength of symbol $x$, and $R(x_{tr})$ and $R(y_{tr})$ be the real numbers (as described in `Q4.3`) corresponding to the truncated binary representation of $x_{tr}$ and $y_{tr}$ codewords as described in Shannon code construction. Then, by using `Q4.3`, it is sufficient to prove that $R(y_{tr}) \geq R(x_{tr}) + 2^{-L(x)}$ to show that our construction of Shannon tree is prefix-free, i.e. we need to show that any two truncated cumulative probabilities numbers represented as a real-line number differ by at least $2^{-\text{codelength}}$ of the corresponding codeword. To show this, note that, 

    $$ 
    \begin{aligned}
    c(y) - c(x) &\geq p(x) \\
    &\geq 2^{-L(x)} \\
    \implies c(y) - R(x_{tr}) &\geq 2^{-L(x)}
    \end{aligned}
    $$

    where first inequality follows from the definition of cumulative probability $c(x)$ and $c(y)$, the  second inequality follows from the fact that $L(x) \geq \log_2 \frac{1}{p(x)}$ and the implies comes from the fact that truncating a number can only decrease it and therefore $R(x_{tr}) \leq c(x)$.

    Finally, note that if $c(x) = b0.c_1c_2\ldots$ and $c(y) = b0.d_1d_2\ldots$, then $R(x_{tr}) = b0.c_1c_2\ldots d_{L(x)}$ and $R(y_{tr}) = b0.d_1d_2\ldots d_{L(y)}$ because of the truncation step. Therefore,

    $$
    \begin{aligned}
    c(y) - R(x_{tr}) &\geq 2^{-L(x)} \\
    \implies b0.d_1d_2\ldots - b0.c_1c_2\ldots d_{L(x)} &\geq 2^{-L(x)} \\
    b0.d_1d_2\ldots d_{L(x)} - b0.c_1c_2\ldots d_{L(x)} &\geq 2^{-L(x)}  \\
    b0.d_1d_2\ldots d_{L(y)} - b0.c_1c_2\ldots d_{L(x)} &\geq 2^{-L(x)}  \\
    \implies R(y_{tr}) - R(x_{tr}) &\geq 2^{-L(x)}  \\
    \end{aligned}
    $$

    where first implies follows from representing the numbers in binary, third line follows from the fact that since we have a difference in two binary numbers $\geq 2^{-L(x)}$, therefore the number represented by truncating first number to first $L(x)$ binary digits should be higher than the second number, and the fourth line follows from the fact that $L(x) \leq L(y)$ given our code construction and final implies comes from the definition of $R(y_{tr})$ and $R(x_{tr})$.

    This implies from `Q4.3` that $x$ and $y$ will have prefix-free codes using the described construction of Shannon code for any arbitrary two symbols.


### Q5: Camping Trip (*20 points*)

During one of the camping trips, Pulkit was given $n$ rope segments of lengths $l_1, l_2,\ldots, l_n$ by Kedar, and was asked to join all the ropes into a single long segment of length $\sum_{i=1}^n l_i$. Pulkit can only join two ropes at a time and the "effort" in joining ropes $i, j$ using a knot is $l_i + l_j$. Pulkit is lazy and would like to minimize his "effort" to join all the segments together.  

1. [5 points] Do you see any parallels with the problem and one of the prefix-free codes you have learnt? Please justify your answer.

    **Solution**

    Yes, the problem is connected to `Huffman Codes`. The cost of joining a rope into the final segment is proportional to number of times it is used in the knotting process. We will need to pay a larger penalty for a rope if it is used for creating a knot earlier, than later. We can visualize the process of creating the final long segment as a prefix-free tree construction where nodes represent the cost of joining the ropes and depth of the node indicates how many times the particular rope corresponding to this node was used for creating the final segment. Mathematically, the problem is same as 

    $$ \min_{\text{prefix-free code}} \sum_{i=1}^n l_i \cdot d_i $$

    where $l_i$ is the length of the rope and $d_i$ is the number of times the rope is knotted.

    We have seen this optimization problem before in class when we were constructing `Huffman tree`! 


2. [5 points] Let $E_{opt}$ optimal value for the effort. Without solving the problem, can Pulkit get an estimate of what the $E_{opt}$ would be? Leaving your answer in terms of inequalities is fine.

    **Solution**

    To map the problem precisely to Huffman Tree construction as seen in class, we need to ensure that we are optimizing over probability distribution over ropes. This can be trivially done by normalizing the rope lengths. Let $p_i = \frac{l_i}{\sum_{i=1}^n l_i}$ be the probability corresponding to Huffman tree for rope $i$. Then, the problem can be mapped to the following optimization problem:

    $$ \min_{\text{prefix-free code}} \left (\sum_{i=1}^n p_i \cdot d_i \right) \times \left( \sum_{i=1}^n l_i \right)$$

    Note that $\sum_{i=1}^n p_i = l_i$ is constant given rope-lengths. We can now use the fact that the optimal value of the above optimization problem is equal to the entropy of the probability distribution over ropes $H(P)$ scaled by the sum of rope-lengths. Therefore, 

    $$\left(\sum_{i=1}^n l_i\right) \cdot H(P) \leq E_{opt} \leq \left(\sum_{i=1}^n l_i\right) \cdot \left(H(P) + 1 \right) $$

    where $H(P) = \sum_i p_i \log_2 \frac{1}{p_i}$ is the entropy of the probability distribution over ropes as defined above.

3. [10 points] Implement the function `compute_minimum_effort()` in the file `hw1_p5.py`.  
HINT: You may use one of the prefix-free code implementations in the SCL Library

    **Solution**

    ```python
    def compute_minimal_effort(rope_lengths_arr: List[float]) -> float:
        """
        lengths_arr -> list of rope lengths (positive floating points)
        output -> the value of the minimum effort in joining all the ropes together 
        """
        effort = None
        ###########################################################
        # Q5.3: Add code here to compute the minimal effort
        ###########################################################
        # raise NotImplementedError
    
        from compressors.huffman_coder import HuffmanTree
        from core.prob_dist import ProbabilityDist
    
        # create a prob_dist out of the rope_lengths_arr
        rope_lengths_dict = {f"rope_id_{ind}": val for ind, val in enumerate(rope_lengths_arr)}
        prob_dist = ProbabilityDist.normalize_prob_dict(rope_lengths_dict)
        encoding_table = HuffmanTree(prob_dist).get_encoding_table()
    
        # compute minimal effort as the average codelength of huffman code
        effort = 0
        for rope_id in encoding_table:
            effort += len(encoding_table[rope_id]) * rope_lengths_dict[rope_id]
    
        ###########################################################
        return effort   
    ```



### Q6: HW1 Feedback *(5 points)* 
Please answer the following questions, so that we can adjust the difficulty/nature of the problems for the next HWs.

1. How much time did you spent on the HW in total?
2. Which question(s) did you enjoy the most? 
3. Are the programming components in the HWs helping you understand the concepts better?
4. Did the HW1 questions complement the lectures?
5. Any other comments?
