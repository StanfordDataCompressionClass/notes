# EE274: Homework-2

- **Focus area:** Lossless compression
- **Due Date:** Nov 6, midnight
- **Weightage:** 20%
- **Total Points:** 140
- **Submission Instructions:** Provided at the end of HW (ensure you read these!)
- **Submission link:** 
  - For written part: [HW2-Written](https://www.gradescope.com/courses/436519/assignments/2375606)
  - For programming part: [HW2-Code](https://www.gradescope.com/courses/436519/assignments/2375607)

The Homework-2 is designed to learn more about lossless compressors we use in our daily lives. Enjoy!

*Please ensure that you follow the [Stanford Honor Code](https://communitystandards.stanford.edu/policies-guidance/honor-code) while doing the homework. You are encouraged to discuss the homework with your classmates, but you should write your own solutions and code. You are also encouraged to use the internet to look up the syntax of the programming language, but you should not copy-paste code from the internet. If you are unsure about what is allowed, please ask the instructors.* 

**Note for the coding part**<br>
Before starting the coding related HW1 questions ensure following instructions from HW0 are followed:
- Ensure you are using the latest version of the SCL `EE274/HWs` GitHub branch. To ensure run the following command in the SCL repository you cloned from HW0:
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
  You should see a `HW2` folder in the `HWs` folder.
- Ensure you are in the right conda environment you created in `HW0`. To ensure run the following command:
   ```sh
   conda activate ee274_env
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

### Q1: Conditional Entropy (*20 points*)
In this problem we will get familiar with conditional entropy and its properties. 

We learnt a few properties of conditional entropy in class: 
- $H(X) \geq H(X|Y)$
- $H(X,Y) = H(Y) + H(X|Y)$

We will use these properties to show some other useful properties about conditional entropy and solve some fun problems!

1. [5 points] Let $f(X) = Z$ be an arbitrary function which maps $X \in \mathcal{X}$ to a discrete set $Z \in \mathcal{Z}$. Then show that: $H(f(X)|X) = 0$. Can you intuitively explain why this is the case? 

2. [5 points] Show that $H(f(X)) \leq H(X)$, i.e. processing the data in any form is just going to reduce the entropy. Also, show that the equality holds if the function $f$ is invertible, i.e. if there exists a function $g$ such that $g(f(X)) = X$. Can you intuitively explain why this is the case?

3. [4 points] In the HW1 of the 2023 edition of EE274, Kedar and Shubham had an assignment to compress the Sherlock novel (lets call it $x_{orig}$). Kedar computed the empirical `0th` order distribution of the letters and used those with Arithmetic coding to compress $x_{orig}$, and received average codelength $L_1$. While working on the assignment, Shubham accidentally replaced all letters with lowercase (i.e `A -> a`, `B -> b` etc.). Lets call this modified text $x_{lowercase}$. Shubham compressed $x_{lowercase}$ with the same algorithm as Kedar, and got average codelength $L_2$. Do you expect $L_1 \geq L_2$, or $L_2 \geq L_1$. Justify based on properties of Arithmetic coding and `Q1.2`.

4. [6 points] We say that random variables $X_1, X_2, \ldots, X_n$ are pairwise independent, if any pair of random variables $(X_i,X_j), i \neq j$ are independent. Let $X_1, X_2, X_3$ be 3 pairwise independent random variables, identically distributed as $Bern(0.5)$. Then show that:

   1. [3 points] $H(X_1,X_2,X_3) \leq 3$, when is equality achieved?
   2. [3 points] $H(X_1,X_2,X_3) \geq 2$, when is equality achieved?

5. *[NOT GRADED, THINK FOR FUN!]* Let $Z_1, Z_2, \ldots, Z_k$ be i.i.d $Bern(0.5)$ random variables. Then show that using the $Z_i's$, you can generate $n=2^k - 1$ pairwise independent random variables, identically distributed as $Bern(0.5)$. 
 
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

2. [5 points] Complete the function `generate_samples_vanilla` in `hw2_p2.py` which takes in a non-uniform  rational distribution `P` and returns `data_size` number of samples from it. You can assume that the distribution is given as a dictionary, where the keys are the symbols and the values are the frequency of occurrence in the data. For example, the distribution `P = {A: 2/7, B: 4/7, C: 1/7}` can be represented as `P = Frequencies({'A': 2, 'B': 4, 'C': 1})`. Ensure that your code passes the `test_vanilla_generator` test in `hw2_p2.py`. Feel free to add more test cases.

3. [5 points] Given a single sample of a uniform random variable `U`, how can you extend your algorithm in `Q2.1` to sample $n=2$ i.i.d random values $X_1, X_2 \sim P$? Provide a concrete algorithm for `P= {A: 2/7, B: 4/7, C: 1/7}`. Generalize your method to an arbitrary number of samples $n$ and describe it in a few sentences. 

4. [5 points] Pulkit suggested that we can slightly modify Arithmetic Entropy Coder (`AEC`) we learnt in the class to sample a potentially infinite number of i.i.d samples $X_1, X_2, \ldots, X_n \sim P$ given any rational distribution $P$ from a single uniform random variable sample `U`! You can look at Pulkit's implementation `generate_samples_aec` in `hw2_p2.py` to get an idea of how to exploit `AEC`. Can you justify the correctness of Pulkit's method in a few lines?

    **Note**: Even though we say that we can sample potentially infinite number of samples, in practice we are limited by the precision of floats.

5. [5 points] Now lets say, you have to sample data $X_0, X_1, \ldots, X_n$ from a Markov distribution $Q$. Recall for a Markov Chain, $Q(X_0, X_1, \ldots, X_n) = Q(X_0)Q(X_1|X_0) \ldots Q(X_n|X_{n-1})$. Can you use your technique from `Q2.3` or the technique suggested by Pulkit in `Q2.4` to sample any number of samples $n$ with distribution $Q$ from a single uniform random variable sample `U in [0,1)`? Describe the algorithm in a few lines.

### Q3: Compression with side information (*20 points*)
Lets consider a simple puzzle: 
- Let $X$ be a 3 bit random variable where each bit is i.i.d $Ber(0.5)$, i.e. $X$ is uniformly distributed  in $\{000,001,010,011,100,101,110,111\}$ with probability $1/8$, 
- and $Y= X \oplus e$, where $e \in \{000,001,010,100\}$ and is independent of $X$. The distribution of $e$ is unknown, i.e $Y$ can be different from $X$ in just a one bit position. 

1. [5 points] Show that $H(X) = 3, H(X|Y) \leq 2$.

   **HINT**: Consider $H(X,e|Y)$ and write it in two different ways

2. [5 points] Kakashi wants to losslessly encode $X$ and send it to Sasuke. What is the optimal compression scheme for Kakashi? 

3. [5 points] Now lets say both Kakashi and Sasuke have access to $Y$, i.e. $Y$ is the side-information available to both Kakashi and Sasuke (through side-information ninjutsu :P). In that case, show that Kakashi can do better than in `Q3.2`, by using `2 bits` to transmit $X$.

4. [5 points] Unfortunately Kakashi lost access to $Y$, and only knows $X$ but Sasuke still has access to the side information $Y$. Show that in this case Kakashi can still losslessly encode $X$ and send it to Sasuke using `2 bits`, i.e. surprisingly we just need the side-information at the decoder, and not necessarily at the encoder.

NOTE: It is quite fascinating that we need side-information only at the decoder. This property can be generalized to more general scenarios, and is the foundation for distributed data compression. We will learn more on the same in one of Tsachy's special topics lectures at the end of the course! 


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

3. [2 points] Why is the impact of using the seed input negligible when we compress the files jointly?

4. [3 points] The provided seed input file is less than 1 KB in size. If you were allowed to choose an arbitrarily large seed input, how might you design it to minimize the compressed size for this specific dataset. 

   **HINT**: Think about the best case scenario for LZ77 parsing - longest possible matches and no literals. 

5. [10 points] Now you will create a seed input for another dataset provided in the `p4_data/pokemon_data` directory. We will evaluate your submissions on a test dataset which has similar files as the `p4_data/pokemon_data` directory. Your submission should satisfy the following:
   - name the seed input file as `p4_data/pokemon_data_seed_input.txt`
   - the seed input file should be less than 1 KB large
   - the total size for compressing the files individually should reduce to at least 2x when using the seed input (vs. when not using it) for both the `pokemon_data` set and the autograder submission

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

2. [5 points] Manually compute and show the BWT transform for `panama`, using the method above. Show your work to get credit (that is you can't just write the final transform but show the steps described above).

3. [10 points] Implement the BWT (forward) transform in the `hw2_p5.py` file, `BurrowsWheelerTransform::forward` function. Remember to add a delimiter in the input string (you can use `~` as delimiter as `~` has the highest ascii value). You may use the `test_bwt_transform()` (by commenting out the inverse bwt part) to test your implementation. What is the complexity of your BWT forward transform implementation for an input of length `n`? 

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

5. [10 points] Implement the BWT inverse transform in `hw2_p5.py` in the `BurrowsWheelerTransform::inverse` function. Please add (some) inline comments describing your algorithm. What is the time, memory complexity of your BWT inverse transform implementation for an input of length `n`?

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


*NOTE:* compressors such as `bzip2`, and `bsc` in fact use BWT and MTF transforms along with a few other tricks to obtain great compression. BWT algorithms have also found another surprising use: they allow efficient searching over compressed text! Here are more references in case you are interested:
1. [bzip2](https://sourceware.org/bzip2/), [bsc](http://libbsc.com/)
2. wikipedia article: [https://en.wikipedia.org/wiki/Burrows%E2%80%93Wheeler_transform](https://en.wikipedia.org/wiki/Burrows%E2%80%93Wheeler_transform)
3. BWT for searching over compressed text: [slides](https://www.cs.cmu.edu/~ckingsf/bioinfo-lectures/bwt.pdf)

### Submission Instructions
Please submit both the written part and your code on Gradescope in their respective submission links. **We will be using both autograder and manual code evaluation for evaluating the coding parts of the assignments.** You can see the scores of the autograded part of the submissions immediately. For code submission ensure following steps are followed for autograder to work correctly:

- As with HW0, you only need to submit the modified files as mentioned in the problem statement.
  - Compress the `HW2` folder into a zip file. One way to obtain this zip file is by running the following zip command in the `HWs` folder, i.e.
    ```sh
    cd HWs
    zip -r HW2.zip HW2
    ```
    Note: To avoid autograder errors, ensure that the directory structure is maintained and that you have compressed `HW2` folder containing the relevant files and not `HWs` folder, or files inside or something else. Ensure the name of the files inside the folder are exactly as provided in the starter code, i.e. `hw2_p2.py`, `hw2_p5.py` etc. In summary, your zip file should be uncompressed to following directory structure (with same names):
    ```
    HW2
    ├── hw2_p2.py
    ├── hw2_p4.py
    ├── hw2_p5.py
    └── p4_data
        └──pokemon_data_seed_input.txt
    ```
  
- Submit the zip file (`HW2.zip` obtained above) on Gradescope Programming Part Submission Link. Ensure that the autograded parts runs and give you correct scores. 

**Before submitting the programming part on Gradescope, we strongly recommend ensuring that the code runs correctly locally.**
