# EE274: Homework-2

- **Focus area:** Lossless compression
- **Due Date:** Nov 6, midnight
- **Weightage:** 20%
- **Total Points:** 140
- **Submission Instructions:** Provided at the end of HW (ensure you read these!)
- **Submission link:** 
  - For written part: [HW2-Written](https://www.gradescope.com/courses/436519/assignments/2375606)
  - For programming part: [HW2-Code](https://www.gradescope.com/courses/436519/assignments/2375607)

### Q1: Conditional Entropy (*20 points*)
In this problem we will get familiar with conditional entropy and its properties. 

We learnt a few properties of conditional entropy in class: 
- $H(X) \geq H(X|Y)$
- $H(X,Y) = H(X) + H(X|Y)$

We will use these properties to show some other useful properties about conditional entropy and solve some fun problems!

1. [5 points] Let $f(X) = Z$ be an arbitrary function which maps $X \in \mathcal{X}$ to a discrete set $Z \in \mathcal{Z}$. Then show that: $H(f(X)|X) = 0$. Can you intuitively explain why this is the case? 

    **Solution**

    Given a value of $X=x$, $f(X)$ has a deterministic value $f(x)$. Therefore $H(f(X)|X=x) = 0$ and
 
    $H(f(X)|X) = \sum_x p(x, f(x)) H(f(X) | X = x) = \sum_x 0 $

2. [5 points] Show that $H(f(X)) \leq H(X)$, i.e. processing the data in any form is just going to reduce the entropy. Also, show that the equality holds if the function $f$ is invertible, i.e. if there exists a function $g$ such that $g(f(X)) = X$. Can you intuitively explain why this is the case?

    **Solution**

    Let's use the chain rule of entropy in two different ways:

    $$
    \begin{align}
    H(X, f(X)) &= H(X) + H(f(X)|X) = H(X) \\
    H(X, f(X)) &= H(f(X)) + H(X|f(X)) \geq H(f(X))
    \end{align}
    $$

    since $H(f(X)|X) = 0$ and $H(X|f(X)) \geq 0$. Therefore, $H(X) \geq H(f(X))$.

    The equality holds when $H(X|f(X)) = 0$. This holds when $X$ is a deterministic function of $f(X)$ implying that $f(X)$ is invertible. Intuitively, if there is a one-to-one mapping between $X$ and $f(X)$, then the entropy of $X$ is the same as the entropy of $f(X)$ as all we are doing is changing the alphabets but not the probability distribution across those alphabets! 
    

3. [4 points] In the HW1 of the 2023 edition of EE274, Kedar and Shubham had an assignment to compress the Sherlock novel (lets call it $x_{orig}$). Kedar computed the empirical `0th` order distribution of the letters and used those with Arithmetic coding to compress $x_{orig}$, and received average codelength $L_1$. While working on the assignment, Shubham accidentally replaced all letters with lowercase (i.e `A -> a`, `B -> b` etc.). Lets call this modified text $x_{lowercase}$. Shubham compressed $x_{lowercase}$ with the same algorithm as Kedar, and got average codelength $L_2$. Do you expect $L_1 \geq L_2$, or $L_2 \geq L_1$. Justify based on properties of Arithmetic coding and `Q1.2`.

    **Solution**

    We know that $H(X) \geq H(f(X))$. Since Shubham replaced all capital letters with lowercase, the operation can only reduce the entropy, i.e. $H(x_{orig}) \geq H(x_{lowercase})$. We also know that arithmetic coder achieves entropy of any given probability distribution, and hence, $L_1 \geq L_2$.

4. [6 points] We say that random variables $X_1, X_2, \ldots, X_n$ are pairwise independent, if any pair of random variables $(X_i,X_j), i \neq j$ are independent. Let $X_1, X_2, X_3$ be 3 pairwise independent random variables, identically distributed as $Bern(0.5)$. Then show that:

   1. [3 points] $H(X_1,X_2,X_3) \leq 3$, when is equality achieved?
   2. [3 points] $H(X_1,X_2,X_3) \geq 2$, when is equality achieved?

   **Solution**

    Using chain rule of entropy and the fact that $X_i$ are pairwise independent, we have:    
    $$
    \begin{align}
    H(X_1,X_2,X_3) &= H(X_1) + H(X_2 | X_1) + H(X_3 | X_1, X_2) \\
    &= H(X_1) + H(X_2) + H(X_3 | X_1, X_2) \\
    &= 1 + 1 + H(X_3 | X_1, X_2) \\
    &= 2 + H(X_3 | X_1, X_2)
    \end{align}
    $$

    where $H(X_2 | X_1) = H(X_1)$ since $X_2$ and $X_1$ are independent. But note that, $H(X_3 | X_1, X_2)$ need not be always $0$ as our random variables are pairwise independent but need not be mutually independent! Third line follows from the fact that $X_i$ are $Bern(0.5)$ and hence $H(X_i) = 1$.
   
    1. To show this note that: $H(X_3 | X_1, X_2) \leq H(X_3) = 1$, since conditioning reduces entropy. This equality is achieved when $X_3$ is independent of $X_1$ and $X_2$, i.e. random variables are mutually independent.
    2. To show this note that: $H(X_3 | X_1, X_2) \geq 0$, since entropy is always positive. From `Q1.1` this equality is achieved when $X_3$ is a function of $X_1, X_2$. Since the marginal distribution of $X_3$ is $Bern(0.5)$, you can show that only function which satisfies this property is $X_3 = X_1 \oplus X_2$.

5. *[NOT GRADED, THINK FOR FUN!]* Let $Z_1, Z_2, \ldots, Z_k$ be i.i.d $Bern(0.5)$ random variables. Then show that using the $Z_i's$, you can generate $n=2^k - 1$ pairwise independent random variables, identically distributed as $Bern(0.5)$. 

    **Solution**

    Consider all possible xor combinations of $Z_i$, i.e. $Z_1, Z_2, \ldots, Z_k, Z_1 \oplus Z_2, Z_1 \oplus Z_3, Z_2 \oplus Z_3, \ldots, Z_1 \oplus Z_2 \oplus Z_3 \oplus \ldots \oplus Z_k$. We can see that each of these random variables are pairwise independent since $Z_i$ are i.i.d. and $Bern(0.5)$. Hence, we can generate $n=2^k - 1$ pairwise independent random variables, identically distributed as $Bern(0.5)$.
 
### Q2: Generating random non-uniform data (*25 points*)

Consider the problem of sampling a non-uniform discrete distribution, from uniform distributions. 

Let's assume that we are given a single sample of random variable `U`, uniformly distributed in the unit interval `[0,1)` (e.g. `U = numpy.random.rand()`). The goal is to generate samples from a non-uniform distribution $P$. We will assume that $P$ is a *rational distribution*. i.e. for any symbol $s$, $P(s) = n_s/M$, where $n_s, M$ are integers. 

1. [5 points] Given a non-uniform rational distribution, we can sample a single random value $X_1 \sim P$ from `U` by finding the cumulative distribution bin in which the sample `U` falls since the cumulative distribution also lies between `[0,1)`. For example, if $P$ is the distribution such as `P = {A: 2/7, B: 4/7, C: 1/7}`, then we output the symbols `A,B,C` based on the intervals in which they lie as follows:
    ```
    if U in [0.0, 2/7) -> output A
    if U in [2/7, 6/7) -> output B
    if U in [6/7, 1.0) -> output C
    ```
    Generalize the above algorithm to any given rational distribution, and describe it in a few lines. For a distribution of alphabet size $k$ (e.g. $k=3$ in the example above), what is the time/memory complexity of your algorithm wrt $k$? 

    **Solution**

    We can use the cumulative distribution function to find the bin in which the sample `U` falls and output the sample corresponding to that bin. The cumulative distribution function is defined as: $F(x) = \sum_{i=1}^{x} P(i)$. We can find the bin in which the sample `U` falls by finding the smallest $x$ such that $F(x) > U$ and then output symbol `x`. We can use `binary search` for finding the bin. The time complexity of this algorithm is $O(log(k))$, where $k$ is the size of the alphabet. The memory complexity is $O(k)$, since we need to store the cumulative distribution function.

2. [5 points] Complete the function `generate_samples_vanilla` in `hw2_p2.py` which takes in a non-uniform  rational distribution `P` and returns `data_size` number of samples from it. You can assume that the distribution is given as a dictionary, where the keys are the symbols and the values are the frequency of occurrence in the data. For example, the distribution `P = {A: 2/7, B: 4/7, C: 1/7}` can be represented as `P = Frequencies({'A': 2, 'B': 4, 'C': 1})`. Ensure that your code passes the `test_vanilla_generator` test in `hw2_p2.py`. Feel free to add more test cases.

    **Solution**

    ```python
    def generate_samples_vanilla(freqs: Frequencies, data_size):
        """
        Generate data samples with the given frequencies from uniform distribution [0, 1) using the basic approach
        :param freqs: frequencies of symbols (see Frequencies class)
        :param data_size: number of samples to generate
        :return: DataBlock object with generated samples
        """
        prob_dist = freqs.get_prob_dist()
    
        # some lists which might be useful
        symbol_list = list(prob_dist.cumulative_prob_dict.keys())
        cumul_list = list(prob_dist.cumulative_prob_dict.values())
        cumul_list.append(1.0)
    
        generated_samples_list = []  # <- holds generated samples
        for _ in range(data_size):
            # sample a uniform random variable in [0, 1)
            u = np.random.rand()
    
            ###############################################
            # ADD DETAILS HERE
            ###############################################
    
            # NOTE: side="right" corresponds to search of type a[i-1] <= t < a[i]
            bin = np.searchsorted(cumul_list, u, side="right") - 1
            s = symbol_list[bin]
            generated_samples_list.append(s)
            ###############################################
    
        return DataBlock(generated_samples_list)
    ```

3. [5 points] Given a single sample of a uniform random variable `U`, how can you extend your algorithm in `Q2.1` to sample $n=2$ i.i.d random values $X_1, X_2 \sim P$? Provide a concrete algorithm for `P= {A: 2/7, B: 4/7, C: 1/7}`. Generalize your method to an arbitrary number of samples $n$ and describe it in a few sentences. 

    **Solution**

    We can sample $n$ i.i.d random values $X_1, X_2, \ldots, X_n \sim P$ by first calculating the cumulative distribution corresponding to all possible symbols of block length `n` and then following the procedure as described above. Note this method scales very poorly with `n` since the size of the alphabet increases exponentially with `n`.

4. [5 points] Pulkit suggested that we can slightly modify Arithmetic Entropy Coder (`AEC`) we learnt in the class to sample a potentially infinite number of i.i.d samples $X_1, X_2, \ldots, X_n \sim P$ given any rational distribution $P$ from a single uniform random variable sample `U`! You can look at Pulkit's implementation `generate_samples_aec` in `hw2_p2.py` to get an idea of how to exploit `AEC`. Can you justify the correctness of Pulkit's method in a few lines?

    **Note**: Even though we say that we can sample potentially infinite number of samples, in practice we are limited by the precision of floats.

    **Solution**

    Pulkit's solution first samples a random number `U` and then truncates it to 32 bits. Then it artificially considers the truncated sample as the output of an arithmetic encoder coming from data with same probability as distribution we want to sample from. Finally, it outputs a random bit sequence based on the output of arithmetic decoding on this encoded bitstream. The scheme works because we know that the probability of the uniform random variable lying in an interval in $[0,1)$  is proportional to the interval length and an arithmetic encoder-decoder pair works by dividing the number line between $[0,1)$ in interval lengths proportional to the probability of corresponding n-block symbols. Therefore, we can recover an arbitrary `n` bit symbol (upto precision of floats) with correct probabilities as given distribution by simply using arithmetic encoding followed by arithmetic decoding. 

5. [5 points] Now lets say, you have to sample data $X_0, X_1, \ldots, X_n$ from a Markov distribution $Q$. Recall for a Markov Chain, $Q(X_0, X_1, \ldots, X_n) = Q(X_0)Q(X_1|X_0) \ldots Q(X_n|X_{n-1})$. Can you use your technique from `Q2.3` or the technique suggested by Pulkit in `Q2.4` to sample any number of samples $n$ with distribution $Q$ from a single uniform random variable sample `U in [0,1)`? Describe the algorithm in a few lines.

    **Solution**

    We can use either of the techniques in `Q2.3` or `Q2.4` to sample from a markov chain by simply modifying the probability distribution of n-block symbols to be the markov chain distribution. For example, we can use technique in `Q2.3` by calculating the cumulative distribution corresponding to all possible symbols of block length `n` using the described markov chain probability decomposition and then following the procedure as described in `Q2.3`. We can use technique in `Q2.4` by considering the truncated sample as the output of an arithmetic encoder coming from data with same probability as markov chain distribution we want to sample from (See Slide 33 of lecture slide on [non-IID data](https://stanforddatacompressionclass.github.io/Fall22/static_files/L8_slide.pdf)).

### Q3: Compression with side information (*20 points*)
Lets consider a simple puzzle: 
- Let $X$ be a 3 bit random variable where each bit is i.i.d $Ber(0.5)$, i.e. $X$ is uniformly distributed  in $\{000,001,010,011,100,101,110,111\}$ with probability $1/8$, 
- and $Y= X \oplus e$, where $e \in \{000,001,010,100\}$ and is independent of $X$. The distribution of $e$ is unknown, i.e $Y$ can be different from $X$ in just a one bit position. 

1. [5 points] Show that $H(X) = 3, H(X|Y) \leq 2$.

   **HINT**: Consider $H(X,e|Y)$ and write it in two different ways

    **Solution**
    $$ H(X) = -\sum_{x \in \{000,001,010,011,100,101,110,111\}} P(x) \log_2 P(x) = 3 $$

    For computing $H(X|Y)$, let's consider $H(X,e|Y)$ in two different ways as suggested in the Hint:

    $$
    \begin{align}
    H(X,e|Y) &= H(X|Y) + H(e|X, Y) \\
    &= H(X|Y)\\
    \end{align}
    $$

    since $e= X \oplus Y$ and thus is a function of $X$ and $Y$ implying $H(e|X, Y) = 0$ from `Q1.1`.
    Similarly, we can write $H(X,e|Y)$ as:

    $$
    \begin{align}
    H(X,e|Y) &= H(e|Y) + H(X|e, Y) \\
    &= H(e|Y) \\
    &\leq H(e) \\
    &= 2
    \end{align}
    $$

    where again since $X$ is a function of $e$ and $Y$, therefore $H(X|e, Y) = 0$ from `Q1.1`. Inequality follows from conditioning inequality $\left(H(X|Y) \leq H(X)\right)$ and $H(e) = 2$ since $e$ is uniformly distributed  in $\{000,001,010,100\}$ with probability $1/4$.

2. [5 points] Kakashi wants to losslessly encode $X$ and send it to Sasuke. What is the optimal compression scheme for Kakashi? 

    **Solution**

    Kakashi needs 3 bits to encode $X$ since $H(X) = 3$. Kakashi can just send $X$ as is to Sasuke as none-of-the-lossless encoder can do better than this.

3. [5 points] Now lets say both Kakashi and Sasuke have access to $Y$, i.e. $Y$ is the side-information available to both Kakashi and Sasuke (through side-information ninjutsu :P). In that case, show that Kakashi can do better than in `Q3.2`, by using `2 bits` to transmit $X$.

    **Solution**

    Now since the entropy of $H(X|Y)\leq2$, Kakashi should be able to get away by just transmitting 2 bits instead. The hint is in the derivation of $H(X|Y)$ in `Q3.3`. Since both Kakashi and Sasuke has access to both $X$ and $Y$, Kakashi can just transmit $e= X \oplus Y$, and Sasuke can recover $X$ from $e$ by $X = Y \oplus e$. We need 2 bits to encode $e$, e.g. by using the following scheme:

| e   | 2-bit encoding |
|-----|----------------|
| 000 | 00             |
| 001 | 01             |
| 010 | 10             |
| 100 | 11             |

4. [5 points] Unfortunately Kakashi lost access to $Y$, and only knows $X$ but Sasuke still has access to the side information $Y$. Show that in this case Kakashi can still losslessly encode $X$ and send it to Sasuke using `2 bits`, i.e. surprisingly we just need the side-information at the decoder, and not necessarily at the encoder.

    **Solution**
    This problem has a very elegant visualization by noticing that $e$ only has `1` or `0` ones and thus flips at most one bit of $X$ (or [hamming distance](https://en.wikipedia.org/wiki/Hamming_distance) $\leq 1$). Let us represent $X$ on a unit cube where each axis represents one bit of $X$

    ![](./figures/puzzle_sol_1.png)
    
    Now notice that $e$ flips at most one bit of $X$ and thus can be represented by a line segment on the unit cube. The following figure shows the possible $Y$ values for $X=000$ (red) and $X=111$ (blue). 
    
    ![Figure 2](./figures/puzzle_sol_2.png)

Note how these are distinct sets, hence if you knew $Y$ and also knew that $X$ is either $000$ or $111$, you are able to decode $X$. Thus, Kakashi can send $X$ using 2 bits by basically pairing symbols with hamming distance $> 2$. For instance one possible encoding is:

| X          | 2-bit encoding |
|------------|----------------|
| 000 or 111 | 00             |
| 001 or 110 | 01             |
| 010 or 101 | 10             |
| 100 or 011 | 11             |


NOTE: It is quite fascinating that we need side-information only at the decoder. This property can be generalized to more general scenarios (Slepian-Wolf compression), and is the foundation for distributed data compression. 


### Q4 LZ77 compression for small data (*25 points*)

In this problem, we will understand how LZ77 compression perform on small files and how to improve its performance. Recall that the LZ77 algorithm looks for matches in a window storing the previously seen data and then encodes the match lengths, match offsets and unmatched characters (literals). We use the LZ77 implementation provided in SCL for the experiments below, and you can take a look at the code [here](https://github.com/kedartatwawadi/stanford_compression_library/blob/main/compressors/lz77.py) to understand the details better. We have provided a set of small json files in the `p4_data/github_data` directory. Run the script `python hw2_p4.py -i p4_data/github_data` which produces the following output:

```
Compressing without using a seed input
Number of files: 134
Total uncompressed size (in bits): 956272
Normalized uncompressed size (in avg. bits/file): 7136
Total size after compressing the files individually (in bits): 337093
Total size after compressing the files jointly (in bits): 87258
```

Ignore the first line for a moment. We see that we have `134` relatively small files with average size of `7136 bits`. If we compress the files individually and then sum the sizes, we get a total of `337093 bits`, whereas if we concatenate the files and then compress them as a single block ("jointly") the compressed size is just `87258 bits`! 

1. [4 points] Give two reasons why concatenating the files together provides a reduction in file size.

   **HINT**: One of the reasons is applicable even if the files were from completely distinct sources and had no similarity whatsoever.

    **Solution**

    1. The first reason is that the LZ77 algorithm works best if it can find longer matches within the past symbols in a file. If we concatenate the files, then the LZ77 algorithm will be able to find longer matches within the concatenated file compared to the original small file. 
    2. The second reason is that now we have increased the block size for LZ77, and thus the LZ77 algorithm will be able to converge closer to the entropy (see Slide 29 in [LZ77 slides](https://stanforddatacompressionclass.github.io/Fall22/static_files/L9_slide.pdf)). Another related reason is that compressed files have a bunch of overhead due to headers, etc. which gets amortized for larger files.

Ideally one would just combine these small files into bigger batches for the best compression. However, we sometimes need to store, transmit or compress small files. For example, we need to transmit short JSON messages/network packets between servers when latency is important, and we can't batch requests. Another common use case is when databases use small data pages for fast random access. Small files also show up when we are working with resource constrained devices that cannot hold large files. 

To improve the compression on small files, we consider a slight modification of the LZ77 algorithm we studied in class. Both the compressor and the decompressor now take an additional seed input, which is just a sequence of bytes. The idea is simple: instead of starting the LZ77 compressor with an empty window, we instead initialize the window with a seed input (and appropriately update the other indexing data structures). The same seed input should be used during compression and decompression to enable recovery. 

The overall system architecture needs to maintain these seed inputs (which might be specific to particular data categories), and make sure the encoders and decoders can access these. The seed inputs are usually constrained to be small to avoid extra overhead.

We provide a sample seed input for the above dataset in `p4_data/github_data_seed_input.txt`. Run `python hw2_p4.py -i p4_data/github_data -s p4_data/github_data_seed_input.txt` to obtain the following:

```
Loading seed input from p4_data/github_data_seed_input.txt
Number of files: 134
Total uncompressed size (in bits): 956272
Normalized uncompressed size (in avg. bits/file): 7136
Total size after compressing the files individually (in bits): 208231
Total size after compressing the files jointly (in bits): 86222
```

2. [6 points] We see a significant reduction in the total size for compressing the files individually (`337093` bits to `208231` bits). Based on your understanding of the LZ77 algorithm and your answer to  `Q4.1`, explain why this is the case. You might find it useful to look both at the json files in `p4_data/github_data/` and the seed input in `p4_data/github_data_seed_input.txt`.

    **Solution**

    Seed file consists of data which is similar to the input files. Thus, LZ77 algorithm is able to find more matches in the seed file while compressing the individual files resulting in better compression of the individual files better.

3. [2 points] Why is the impact of using the seed input negligible when we compress the files jointly?

    **Solution**
    Since the concatenated file already consists of the data present in individual files, adding a seed file with similar data as the individual files does not help in finding significantly more matches. Therefore, we get negligible benefit on using the seed file when we compress the files jointly. We might get some benefit for the initial part of the concatenated file, but for most later parts the benefit is minimal. 

4. [3 points] The provided seed input file is less than 1 KB in size. If you were allowed to choose an arbitrarily large seed input, how might you design it to minimize the compressed size for this specific dataset. 

   **HINT**: Think about the best case scenario for LZ77 parsing - longest possible matches and no literals. 

    **Solution**

    Concatenating all files and using them as a seed file can be a good choice. This will result in the LZ77 algorithm finding the longest possible matches and no literals. Thus, we will get the best possible compression.

5. [10 points] Now you will create a seed input for another dataset provided in the `p4_data/pokemon_data` directory. We will evaluate your submissions on a test dataset which has similar files as the `p4_data/pokemon_data` directory. Your submission should satisfy the following:
   - name the seed input file as `p4_data/pokemon_data_seed_input.txt`
   - the seed input file should be less than 1 KB large
   - the total size for compressing the files individually should reduce to at least 2x when using the seed input (vs. when not using it) for both the `pokemon_data` set and the autograder submission
   
    **Solution**

    The seed file we used can be found at [here](data/pokemon_data_seed_input.txt). The total size for compressing the files individually reduces by $\sim2\times$ when using the seed input for both the `pokemon_data` set and the autograder submission.
    

**Note:** 
- To learn more about small data compression using seed inputs and how it is used in practice, you can have a look at Yann Collet's IT-forum talk available on [YouTube](https://www.youtube.com/watch?v=jl9ncLcMlVY&t=126s&ab_channel=StanfordResearchTalks). Yann is also our guest speaker in the class and will be giving a talk on 10/27 during class hours! 
- zstd uses the term "dictionary" to refer to what we called seed inputs above.

### Q5: Burrows Wheeler Transform and compression (*50 points*)

*DISCLAIMER: This problem looks longer but is actually simpler :P*

You might be familiar with Fourier transforms, DCT transform, wavelet transform, etc. for images and audio signals. These transforms are widely used as they are invertible and make the data easier to analyse, compress, etc.

In this problem, we will learn about a few lossless transform for textual data, which have been used for various applications, including data compression. 

**I. The BWT algorithm:**

In 1994, David Wheeler and Michael Burrows discovered (co-incidentally at the DEC Research Labs in Palo Alto!) an invertible transform for textual data, which supposedly made the data easier to compress. In this question, we will learn more about the BWT algorithm and its properties.

The BWT forward transform works the following way: 
- *STEP-I* 
  
  Let's say you are given a sequence `BANANA`. The first thing you do is add a delimiter `~` to the end. Thus, our new sequence is now: `BANANA~`. Note that the delimiter is a unique character we are sure never occurs in the input sequence, and is useful to mark the ending of our sequence

- *STEP-II* 

  In the next step, we form all cyclic rotations of the word `BANANA~`. As the sequence length is `n=7`, we will have `7` such rotations. 

    ```py
    Input string: BANANA
    # all cyclic rotations
    BANANA~
    ~BANANA
    A~BANAN
    NA~BANA
    ANA~BAN
    NANA~BA
    ANANA~B
    ```
  
- *STEP-III* 

  Sort these strings lexico-graphically. This results in `n` permutations of a string of length `n` resulting in a `n X n` 2D table &mdash; called a Burrows Wheeler's Matrix (BWM). The `7 X 7` BWM for our example is shown below:

    ```py
    # sorted strings
    ANANA~B
    ANA~BAN
    A~BANAN
    BANANA~
    NANA~BA
    NA~BANA
    ~BANANA
    ```

- *STEP-IV*

  Now consider the string formed by last letters of the sorted strings. This new string is the BWT transform of the input! 

    ```
    BANANA -> BNN~AAA
    ```
  
1. [5 points] Here are some other examples of BWT: 
    ```
    BANANA -> BNN~AAA
    abracadabraabracadabraabracadabra -> rrdd~aadrrrcccraaaaaaaaaaaabbbbbba
    hakunamatata -> hnmtt~aauaaka
    ```
    Notice that the BWT forward transform of `x_input = BANANA -> BNN~AAA` has the letters of `BANANA~` permuted, i.e. `BWT(x_input)` is just reordering the letters in the input in a particular way. Justify in a few lines why `BWT(x_input)` is a permutation of the string `x_input~` (`x_input~` -> `x_input` concatenated with the delimiter `~`).

    **Solution**
    Since we are taking circular rotations of the string, each character of the string `x_input~` will be present in the last column of list of strings (output of Step-II). Sorting this list of strings only changes the order of the last characters (output of Step-I). Thus, `BWT(x_input)` is a permutation of the string `x_input~`.

2. [5 points] Manually compute and show the BWT transform for `panama`, using the method above. Show your work to get credit (that is you can't just write the final transform but show the steps described above).

   **Solution:** 

    - Step-II: calculate cyclic rotations of `panama~`

    ```py
    Input string: PANAMA~
    # all cyclic rotations
    PANAMA~
    ~PANAMA
    A~PANAM
    MA~PANA
    AMA~PAN
    NAMA~PA
    ANAMA~P
    ```
   
    - STEP-III: Sort these strings lexico-graphically. 
    ```py
    # sorted strings
    AMA~PAN
    ANAMA~P
    A~PANAM
    MA~PANA
    NAMA~PA
    PANAMA~
    ~PANAMA
    ```
   
    - Step-IV: BWT forward transform is last letters of the sorted strings. 
    
    Therefore, BWT forward transform of `panama` is `NPMAA~A`

3. [10 points] Implement the BWT (forward) transform in the `hw2_p5.py` file, `BurrowsWheelerTransform::forward` function. Remember to add a delimiter in the input string (you can use `~` as delimiter as `~` has the highest ascii value). You may use the `test_bwt_transform()` (by commenting out the inverse bwt part) to test your implementation. What is the complexity of your BWT forward transform implementation for an input of length `n`? 

    **Solution**
    
    ```python
    def forward(self, data_block: DataBlock):
        """
        Generates the forward transform of BWT
        NOTE: for consistency all forward and inverse functions take in as input
        a DataBlock
        """

        # create a string using data_block
        input_block_str = "".join(data_block.data_list)

        ###############################################
        # ADD DETAILS HERE
        # to generate bwt_str (BWT transformed string)
        # Note: remember to add the delimiter to the string!
        ###############################################
        bwt_str = ""

        # STEP-1: add a delimiter
        input_block_str += self.delimiter

        # STEP-2: get all cyclic rotations, and sort
        N = len(input_block_str)
        cyclic_rotations = []
        cur_str = input_block_str
        for _ in range(N):
            cur_str = cur_str[-1] + cur_str[:-1]
            cyclic_rotations.append(cur_str)
        cyclic_rotations.sort()

        # STEP-3: pick the last column and make a single string
        bwt_str = "".join([rot_str[-1] for rot_str in cyclic_rotations])

        ###############################################

        data_bwt_block = DataBlock(list(bwt_str))
        return data_bwt_block
    ```
    The forward transform involves creating a $n$-length list of $O(n)$ length strings, followed by
    sorting the $O(n)$ length strings. Assuming sorting is $O(n\log n)$ comparisons and each comparison is $O(n)$ (since we are working with $n$-length strings), the overall complexity will be $O(n^2\log n)$.

**II. The Inverse BWT Algorithm**

The surprising part is that BWT is actually a fully invertible transform, i.e. we can fully retrieve back the original input from the BWT transform e.g. we can recover input string `BANANA~` from the BWT transform `BNN~AAA`. The inverse transform works by retrieving the Burrows Wheeler Matrix (BWM) one column at a time. The inverse BWT proceeds in the following way:

- In the beginning we only have the BWT transform which is the last column of the BWM. We show the BWT transform and the BWM below.

    ```py
    # STEP-0
    ------B
    ------N
    ------N
    ------~
    ------A
    ------A
    ------A
    ```

- Notice that each column is a permutation of `BANANA~`. As the rows of BWM are lexicographically sorted, we can retrieve the first column on BWM by sorting the last column.

    ```py
    # STEP-1
    A-----B
    A-----N
    A-----N
    B-----~
    N-----A
    N-----A
    ~-----A
    ```

- Due to the cyclic rotations which we used to form the BWM, we can now copy over the last column to the beginning, and we have the first two letters for each row of BWM (although in the incorrect order). We can sort these rows to get the first two columns of the BWM.

    ```py
    # STEP-2
    A-----B  -> BA-----                   AN-----
    A-----N  -> NA-----                   AN-----
    A-----N  -> NA-----                   A~-----
    B-----~  -> ~B-----   ===> SORT ===>  BA-----
    N-----A  -> AN-----                   NA-----
    N-----A  -> AN-----                   NA-----
    ~-----A  -> A~-----                   ~B-----
    ```

- We can now repeat the procedure, since we know the last column is the BWT transformed string:

    ```py
    # STEP 1,2 (repeated)
    AN----B  -> BAN----                   ANA----
    AN----N  -> NAN----                   ANA----
    A~----N  -> NA~----                   A~B----
    BA----~  -> ~BA----   ===> SORT ===>  BAN----
    NA----A  -> ANA----                   NAN----
    NA----A  -> ANA----                   NA~----
    ~B----A  -> A~B----                   ~BA----
    ```

- Continuing, this way, we can retrieve the full BWM, and then just pick the row which ends with `~`
    
    ```py
    # BWM
    ANANA~B
    ANA~BAN
    A~BANAN
    BANANA~    ===> BANANA~  ---> :D
    NANA~BA
    NA~BANA
    ~BANANA
    ```


4. [5 points] Manually compute the inverse of `tgca~aa`. Show your work to get credit (that is you can't just write the final inverse transform but show the steps described above).

    **Solution**
    
    We fill in the BWM matrix as described above.
    - STEP-0:
      ```py
      # STEP-0
      ------T
      ------G
      ------C
      ------A
      ------~
      ------A
      ------A
      ```
    - STEP-1:
      ```py
      A-----T
      A-----G
      A-----C
      C-----A
      G-----~
      T-----A
      ~-----A
      ```
    - STEP-2:
      ```py
      A-----T -> TA-----                   AC-----
      A-----G -> GA-----                   AT-----
      A-----C -> CA-----                   A~-----
      C-----A -> AC-----   ===> SORT ===>  CA-----
      G-----~ -> ~G-----                   GA-----
      T-----A -> AT-----                   TA-----
      ~-----A -> A~-----                   ~G-----
      ```
      
    - Repeating steps 1-2 above we get:
      ```py
      # STEP 1,2 (repeated)
      ACA~GAT  
      ATACA~G
      A~GATAC
      CA~GATA
      GATACA~
      TACA~GA
      ~GATACA
      ```
      
    Therefore, the inverse-BWT of `tgca~aa` is `gataca`.
      
5. [10 points] Implement the BWT inverse transform in `hw2_p5.py` in the `BurrowsWheelerTransform::inverse` function. Please add (some) inline comments describing your algorithm. What is the time, memory complexity of your BWT inverse transform implementation for an input of length `n`?

    **Solution**
    
    ```python
    def inverse(self, bwt_block: DataBlock):
        """
        Generates the inverse of the BWT.
        NOTE: for consistency all forward and inverse functions take in as input
        a DataBlock
        """
        bwt_block_str = "".join(bwt_block.data_list)
        N = len(bwt_block_str)

        ###############################################
        # ADD DETAILS HERE
        # to generate output_str
        # Note: remember to remove the delimiter from the string!
        ###############################################
        output_str = ""

        # decoding loop
        bwm_list = ["" for i in range(N)]
        for _ in range(N):
            bwm_list = [bwt_block_str[i] + bwm_list[i] for i in range(N)]
            bwm_list.sort()

        # find the string which ends with delimiter
        output_str = ""
        for _str in bwm_list:
            if _str.endswith(self.delimiter):
                output_str = _str
                break
        # strip the delimiter and return the input
        output_str = output_str.strip(self.delimiter)

        ###############################################

        return DataBlock(list(output_str))   
    ```
    The reverse transform involves $n$ sorting operations, each applied on $n$ strings of length $O(n)$. Each sort operation has complexity $O(n\times n\log n)$ because we operate with $O(n)$ length strings. Thus the overall time complexity is $O(n^3\log n)$.

    The memory complexity is $O(n^2)$ because we need to store the matrix.

6. [5 points] Notice that the BWT forward transform of typical english language words/sentences have lots of repeated letters. For example: 

    ```py
    # BWT forward transforms of some english words
    BANANA -> BNN~AAA
    abracadabraabracadabraabracadabra -> rrdd~aadrrrcccraaaaaaaaaaaabbbbbba
    hakunamatata -> hnmtt~aauaaka
    
    # first 300 letters of sherlock novel
    The Project Gutenberg eBook of The Hound of the Baskervilles, by Arthur Conan DoyleThis eBook is for the use of anyone anywhere in the United States andmost other parts of the world at no cost and with almost no restrictionswhatsoever. You may copy it, give it away or re-use it under the termsof the
    -->
    yernteedfe.htsfedt,yosgs,ekeeyuttkedsytrroefnrrfftedester  ee       ~e   n    pB th mwn   eielnnnnhhhhnrvsshhhr  ljtthdvhbtktlrohooooo r twtTTtttttwtTtrv th    nwgooosrylia ldraioeuauaoU  oaanns    srooCyiBBc fwcmm YHD oueoeoee  etoePAaeeiiteuuatmoooencsiassiiSiu ai     o rcsraoo h- Gierasy  bapaonne
    ```

    So in a way BWT forward transform is approximately sorting the input strings. Can you think of why BWT has this property? 

    **HINT**: In the BWM, the first $n-1$ rows form cyclic suffixes of the last column.

    **Solution**

    As the hint suggests, the first $n-1$ rows of the BWM form cyclic suffixes of the last column. Since the first $n-1$ rows are sorted, this means the last column will consist of consecutive characters which share the same suffix. Since English has lots of repeated words, this results in lots of repeated letters in the last column of the cyclic BWM and hence in the BWT forward transform. For instance, consider a large english sentence with frequent occurrence of the word `the`, say `Arguably one of the most popular anime is One Piece. The characters, the arc, the manga illustrations are all amazing`. The BWT forward transform on this sentence results in clustering of all the suffixes of every character in this string. This results in `t` present in all occurrences of word`the` being clustered together in the last column everytime there is `he` in the first two columns of BWM.

    ```py
    ...
    ...
    he most popular anime...t
    he characters, the ar...t
    he arc, the manga ill...t
    he manga illustration...t
    ...
    ...
    ```

**III. Using BWT for compression**

As we saw in `Q2.8`, BWT tends to club letters of the input string together. We will use this property to see if we can improve compression. To do this, we also implement another invertible transform called the Move to Front (MTF) transform. The Move To Front transform keeps a table of the symbols in the data, and moves the most recent symbol to the top of the table. The transform output is the index of the symbols in this changing table and thus the symbols that are more frequent in a local context get a lower index. The MTF forward and inverse transforms are already implemented and included in `hw2_p5.py` and are described quite well in the wikipedia article here: [https://en.wikipedia.org/wiki/Move-to-front_transform](https://en.wikipedia.org/wiki/Move-to-front_transform). 


Here are some sample outputs on applying MTF transform: 
```
Input str: aaabbbaaacccaaa
MTF: [97, 0, 0, 98, 0, 0, 1, 0, 0, 99, 0, 0, 1, 0, 0]
```

```
Input str: rrdd~aadrrrcccraaaaaaaaaaaabbbbbba
MTF: [114, 0, 101, 0, 126, 100, 0, 2, 3, 0, 0, 102, 0, 0, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 102, 0, 0, 0, 0, 0, 1]
```

We use the BWT, MTF transforms to transform the first `50,000` characters (lets call this the `input_data`) of our sherlock novel and analyze the entropy of the empirical distribution of the transformed string. (this output can be obtained by running the test `test_bwt_mtf_entropy` if you are curious!). The output obtained is as below:

```
Input data: 0-order Empirical Entropy: 4.1322
Input data + BWT: 0-order Empirical Entropy: 4.1325
Input data + MTF: 0-order Empirical Entropy: 4.6885
Input data + BWT + MTF: 0-order Empirical Entropy: 2.8649
```

7. [10 points] Let's try to understand the compression results above a bit better: 
   1. Given a good implementation of an Arithmetic coder, what is approximate average codelength you might expect on compressing the `input_data` using its empirical 0-order distribution (i.e. just the symbol counts)? 
   2. Notice that the empirical entropy of `input_data` is almost the same as that of `bwt_data = BWT(input_data)`. In fact the empirical entropy of `bwt_data` is slightly higher than that of `input_data` (`4.1325 vs 4.1322`). Justify why is this the case.
   3. Notice that empirical entropy of `mtf_bwt_data = MTF(BWT(input_data))` is much lower than that of the `input_data` (`2.8649` vs `4.1322`). Can you think of why this is the case? 
   4. Based on the numbers you have, describe a compression scheme which achieves average codelength of approximately `~2.87 bits/symbol` on the `input_data`?. You don't need to implement this compressor, but ensure you clearly describe the steps involved in encoding and decoding. You are free to use any compressors you have learnt in the class.

   Feel free to experiment with the test functions, to print transformed data or to build better intuition with custom examples. Please include any relevant outputs in your submission which you found useful to answer these questions.

    **Solution**

    1. The average codelength will be approximately `4.1322` bits per symbol as Arithmetic coder is a lossless compression algorithm which can compress to entropy.
    2. Since BWT only permutes the characters in a string (`Q5.1`), the frequency count to 0th order is still the same for the input and the BWT transformed data. In-fact, we add a character to the list of characters in input string during the BWT transform: the delimiter character `~`. Hence, the entropy of `input_data` and `bwt_data` is such that $H(input) \lesssim H(BWT)$.
    3. As seen in `Q5.6`, BWT forward transform results in repeating characters which are present in frequent words or group of words because of sorting along suffixes. Since MTF symbol reduces the locally most frequent symbols to lower indices, the MTF transform on BWT transformed data results in a string with lower entropy.
    4. We can use BWT followed by MTF and finally Arithmetic coding to achieve the desired average codelength. The steps involved in encoding and decoding are as follows:
        1. BWT transform the input data.
        2. MTF transform the BWT transformed data.
        3. Encode the MTF transformed data using Arithmetic coding.
        4. Decode the Arithmetic coded data.
        5. Inverse MTF transform the decoded data.
        6. Inverse BWT transform the MTF transformed data.

*NOTE:* compressors such as `bzip2`, and `bsc` in fact use BWT and MTF transforms along with a few other tricks to obtain great compression. BWT algorithms have also found another surprising use: they allow efficient searching over compressed text! Here are more references in case you are interested:
1. [bzip2](https://sourceware.org/bzip2/), [bsc](http://libbsc.com/)
2. wikipedia article: [https://en.wikipedia.org/wiki/Burrows%E2%80%93Wheeler_transform](https://en.wikipedia.org/wiki/Burrows%E2%80%93Wheeler_transform)
3. BWT for searching over compressed text: [slides](https://www.cs.cmu.edu/~ckingsf/bioinfo-lectures/bwt.pdf)


