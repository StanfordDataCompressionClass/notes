# EE274: Homework-1

- **Focus area:** Prefix-free codes, Basic Information theory
- **Due Date:** Oct 21, midnight
- **Weightage:** 20%
- **Total Points:** 115
- **Submission Instructions:** Provided at the end of HW (ensure you read these!)
- **Submission link:** 
  - For written part: [HW1-Written](https://www.gradescope.com/courses/436519/assignments/2326752)
  - For programming part: [HW1-Code](https://www.gradescope.com/courses/436519/assignments/2326764)

The Homework-1 is designed to explore some interesting concepts related to the most basic component of most of the real world algorithms, the prefix-free codes. Enjoy!

*Please ensure that you follow the [Stanford Honor Code](https://communitystandards.stanford.edu/policies-guidance/honor-code) while doing the homework. You are encouraged to discuss the homework with your classmates, but you should write your own solutions and code. You are also encouraged to use the internet to look up the syntax of the programming language, but you should not copy-paste code from the internet. If you are unsure about what is allowed, please ask the instructors.* 

**Note for the coding part**<br>
Before starting the coding related HW1 questions ensure following instructions from HW0 are followed:
- Ensure you are using the latest version of the SCL `EE274/HWs` github branch. To ensure run the following command in the SCL repository you cloned from HW0:
   ```sh
   git status
   ```   
  You should get an output saying `On branch EE274/HWs`. If not, run the following command to switch to the correct branch:
   ```sh
   git checkout EE274/HWs
   ```
  Finally ensure you are on the latest commit by running:
   ```sh
   git pull
   ```
  You should see a `HW1` folder in the `HWs` folder.
- Ensure you are in the right conda environment you created in `HW0`. To ensure run the following command:
   ```sh
   conda activate ee274_env
   ```
- Update the requirements in the conda environment by running the following command in `stanford_compression_library` folder:
   ```sh
   python -m pip install -r requirements.txt
   ```
- Ensure you have `stanford_compression_library` folder added to your `PYTHONPATH` by running the following command:
   ```sh
   echo \$PYTHONPATH
   ```
  You should see the path to the `stanford_compression_library` folder. If not, run the following command to add it to your `PYTHONPATH`:
   ```sh
   export PYTHONPATH=\$PYTHONPATH:/path/to/stanford_compression_library
   ```
  You can also add this line to your `~/.bashrc` file to make sure it is added every time you open a new terminal.


### Q1: Basic Information theory  (*20 points*)

1. [5 points] Let $X$ be a random variable over positive integers with a distribution 
$$ P_X(X=k) = 2^{-k}, k \geq 1$$ 
Compute the entropy $H(X)$ of random variable $X$. What are the optimal code-lengths for a prefix-free code designed for distribution $P_X$?
2. [5 points] Provide an optimal prefix-free code design for the distribution $P_X$. 
3. [10 points] Let $Y$ be a random variable over positive integers such that $\mathbb{E}(Y) = 2$. 
Then show that:
$$ H(Y) \leq 2 $$ 
For what distribution of the random variable $Y$ does the equality hold, i.e. $H(Y) = 2$? 
HINT: KL-Divergence and it's properties will be helpful to show this.

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

2. [5 points] Show that $$\left( \sum_{i=1}^{|\mathcal{U}|} 2^{-L(u_i)} \right)^n = \sum_{u^n \in \mathcal{U}^n} 2^{-L(u^n)} $$

3. [5 points] Let $l_{max} = \max_{i=1}^{|\mathcal{U}|} L(u_i)$. Then we can rewrite the summation as: $$\sum_{u^n \in \mathcal{U}^n} 2^{-L(u^n)} = \sum_{j=1}^{n.l_{max}} |\{u^n| L(u^n) = j\}|. 2^{-j}$$ 

   NOTE: Rewriting summation is a common proof trick, and is a useful one to watch out for!
Using `Q2.2` and the identity above, show that:

   $$\left( \sum_{i=1}^{|\mathcal{U}|} 2^{-L(u_i)} \right)^n \leq n.l_{max}$$

4. [5 points] Using `Q2.3` show that uniquely decodable codes satisfy Kraft's inequality. i.e. 

$$\left( \sum_{i=1}^{|\mathcal{U}|} 2^{-L(u_i)} \right) \leq 1$$

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

3. [5 points] Now run gzip on the file (command: `gzip < HWs/HW1/sherlock.txt > HWs/HW1/sherlock.txt.gz`) and report the size of the gzip file (`sherlock.txt.gz`). What happens if you run our Huffman compressor on the gzipped file above? Do you see any further reduction in size? Why/why not?

You will observe that gzip does significantly better than the Huffman coding, even if we ignore the overhead from part 3. One of the reasons for this is because gzip compresses data in blocks instead of at the level of single-symbol like we implemented in this problem. Another reason is that gzip uses a more sophisticated algorithm called LZ77. LZ77 is a lossless compression algorithm that is based on the observation that many files contain repeated patterns. LZ77 uses a sliding window to find repeated patterns and replaces them with a pointer to the location of the pattern. This is a very powerful technique that is used in many compression algorithms. We will study LZ77 in more detail in future class and next homework.

### Q4: Shannon Code(s) (*30 points*)

1. [5 points] In class we saw one version of the Shannon codes; the [tree-based construction](https://stanforddatacompressionclass.github.io/notes/lossless_iid/prefix_free_codes.html#designing-prefix-free-codes). Let's call it the `ShannonTreeEncoder` and the `ShannonTreeDecoder`. Manually calculate what the codewords should be for the following distributions:

    ```python
    ProbabilityDist({"A": 0.25, "B": 0.25, "C": 0.25, "D": 0.25})
    ProbabilityDist({"A": 0.5, "B": 0.25, "C": 0.12, "D": 0.13})
    ProbabilityDist({"A": 0.9, "B": 0.1})
    ```

2. [10 points] Complete the code for the `ShannonTreeEncoder` in `hw1_p4.py`. Also, complete the `test_shannon_tree_coding_specific_case()` to check the correctness of your codewords in part 1 against your implemented code. 

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

4. [5 points] Using the property in `Q4.3` prove that any Prefix-free code with lengths $l_1,l_2,\ldots,l_k$, satisfies:
$$ \sum_{i=1}^n 2^{-l_i} \leq 1 $$
i.e. we have an alternative proof for the Kraft inequality. 

5. [5 points] Using the property in `part 3` show that the construction of the Shannon codes does indeed lead to prefix-free codes. 



### Q5: Camping Trip (*20 points*)

During one of the camping trips, Pulkit was given $n$ rope segments of lengths $l_1, l_2,\ldots, l_n$ by Kedar, and was asked to join all the ropes into a single long segment of length $\sum_{i=1}^n l_i$. Pulkit can only join two ropes at a time and the "effort" in joining ropes $i, j$ using a knot is $l_i + l_j$. Pulkit is lazy and would like to minimize his "effort" to join all the segments together.  

1. [5 points] Do you see any parallels with the problem and one of the prefix-free codes you have learnt? Please justify your answer.
2. [5 points] Let $E_{opt}$ optimal value for the effort. Without solving the problem, can Pulkit get an estimate of what the $E_{opt}$ would be? Leaving your answer in terms of inequalities is fine.
3. [10 points] Implement the function `compute_minimum_effort()` in the file `hw1_p5.py`.  
HINT: You may use one of the prefix-free code implementations in the SCL Library

### Q6: HW1 Feedback *(5 points)* 
Please answer the following questions, so that we can adjust the difficulty/nature of the problems for the next HWs.

1. How much time did you spent on the HW in total?
2. Which question(s) did you enjoy the most? 
3. Are the programming components in the HWs helping you understand the concepts better?
4. Did the HW1 questions complement the lectures?
5. Any other comments?

### Submission Instructions
Please submit both the written part and your code on Gradescope in their respective submission links. **We will be using both autograder and manual code evaluation for evaluating the coding parts of the assignments.** You can see the scores of the autograded part of the submissions immediately. For code submission ensure following steps are followed for autograder to work correctly:

- As with HW0, you only need to submit the modified files as mentioned in the problem statement.
  - Compress the `HW1` folder into a zip file. One way to obtain this zip file is by running the following zip command in the `HWs` folder, i.e.
    ```sh
    cd HWs
    zip -r HW1.zip HW1
    ```
    Note: To avoid autograder errors, ensure that the directory structure is maintained and that you have compressed `HW1` folder containing the relevant files and not `HWs` folder, or files inside or something else. Ensure the name of the files inside the folder are exactly as provided in the starter code, i.e. `hw1_p4.py`, `hw1_p5.py` etc. In summary, your zip file should be uncompressed to following directory structure (with same names):
    ```
    HW1
    ├── hw1_p3.py
    ├── hw1_p4.py
    └── hw1_p5.py
    ```
  
- Submit the zip file (`HW1.zip` obtained above) on Gradescope Programming Part Submission Link. Ensure that the autograded parts runs and give you correct scores. 

**Before submitting the programming part on Gradescope, we strongly recommend ensuring that the code runs correctly locally.**
