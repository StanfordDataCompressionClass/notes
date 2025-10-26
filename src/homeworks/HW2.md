# EE274 (Fall 25): Homework-2

- **Focus area:** Lossless Compression
- **Due Date:** Oct 28, midnight (11:59 PM)
- **Weightage:** 15%
- **Total Points:** 115 (Written 85 + Programming 30)
- **Submission Instructions:** Provided at the end of HW (ensure you read these!)
- **Submission link:** 
  - For written part (85 points): [HW2-Written](https://www.gradescope.com/courses/1140353/assignments/6957549)
  - For programming part (30 points): [HW2-Code](https://www.gradescope.com/courses/1140353/assignments/6957544)

*Please ensure that you follow the [Stanford Honor Code](https://communitystandards.stanford.edu/policies-guidance/honor-code) while doing the homework. You are encouraged to discuss the homework with your classmates, but you should write your own solutions and code. You are also encouraged to use the internet to look up the syntax of the programming language, but you should not copy-paste code from the internet. If you are unsure about what is allowed, please ask the instructors.* 

**Note for the coding part**<br>
Before starting the coding related questions ensure following instructions from HW1 are followed:
- Ensure you are using the latest version of the SCL `EE274/HWs` GitHub branch. To ensure run the following command in the SCL repository you cloned from HW1:
   ```sh
   git status
   ```   
  You should get an output saying `On branch EE274_Fall25/HWs`. If not, run the following command to switch to the correct branch:
   ```sh
   git checkout EE274_Fall25/HWs
   ```
  Finally ensure you are on the latest commit by running:
   ```sh
   git pull
   ```
  You should see a `HW2` folder in the `HWs` folder.
- Ensure you are in the right conda environment you created in `HW1`. To ensure run the following command:
   ```sh
   conda activate ee274_env
   ```
- Before starting, ensure the previous tests are passing as expected. To do so, run following from `stanford_compression_library` folder:
   ```sh
   find scl -name "*.py" -exec py.test -s -v {} +
   ```
  and ensure tests except in HW folders pass.


### Q1: Camping Trip (*20 points*)

During one of the camping trips, Pulkit was given $n$ rope segments of lengths $l_1, l_2,\ldots, l_n$ by Kedar, and was asked to join all the ropes into a single long segment of length $\sum_{i=1}^n l_i$. Pulkit can only join two ropes at a time and the "effort" in joining ropes with length $l_i$ and $l_j$ using a knot is $l_i + l_j$. Pulkit is lazy and would like to minimize his "effort" to join all the segments together. 

For instance, consider $n=3$, and $l_1, l_2, l_3 = 4, 5 ,6$. One could first combine $l_1$ and $l_2$ leading to an effort of $4+5=9$, followed by combining $l_1+l_2$ and $l_3$ with effort of $9+6=15$. This corresponds to a total effort of $9+15=24$. On the other hand, if one combines $l_2$ and $l_3$ first, that would lead to a first step cost of $5+6=11$, and total effort of $11+15=26$. Thus the first approach in this example would lead to a lower total effort.
1. [5 points] Do you see any parallels between the problem and one of the prefix-free codes you have learnt about? Please justify your answer.
2. [5 points] Let $E_{opt}$ be the optimal (minimal) value for the effort required to join all the segments. Without solving the problem, can Pulkit get an estimate of what the $E_{opt}$ would be? Provide a lower bound and an upper bound as a function of the rope lengths. 
3. [10 points] Implement the function `compute_minimum_effort()` in the file `hw2_p1.py`.  
HINT: One way to solve this is to use one of the prefix-free code implementations in the SCL Library. You may import it under TODO section.

### Q2: Generating random non-uniform data (*25 points*)

Consider the problem of sampling a non-uniform discrete distribution, given samples from a uniform distribution. 

Let's assume that we are given a single sample of random variable `U`, uniformly distributed in the unit interval `[0,1)` (e.g. `U = numpy.random.rand()`). The goal is to generate samples from a non-uniform discrete distribution $P$. We will assume that $P$ is a *rational distribution*. i.e. for any symbol $s$, $P(s) = n_s/M$, where $n_s, M$ are integers. 

1. [5 points] Given a non-uniform rational distribution, we can sample a single random value $X_1 \sim P$ from `U` by finding the cumulative distribution bin in which the sample `U` falls since the cumulative distribution also lies between `[0,1)`. For example, if $P$ is the distribution such as `P = {A: 2/7, B: 4/7, C: 1/7}`, then we output the symbols `A,B,C` based on the intervals in which they lie as follows:
    ```
    if U in [0.0, 2/7) -> output A
    if U in [2/7, 6/7) -> output B
    if U in [6/7, 1.0) -> output C
    ```
    Generalize the above algorithm to any given rational distribution, and describe it in a few lines. For a distribution of alphabet size $k$ (e.g. $k=3$ in the example above), what is the time/memory complexity of your algorithm wrt $k$? 

2. [5 points] Complete the function `generate_samples_vanilla` in `hw2_p2.py` which takes in a non-uniform  rational distribution `P` and returns `data_size` number of samples from it. You can assume that the distribution is given as a dictionary, where the keys are the symbols and the values are the frequency of occurrence in the data. For example, the distribution `P = {A: 2/7, B: 4/7, C: 1/7}` can be represented as `P = Frequencies({'A': 2, 'B': 4, 'C': 1})`. Ensure that your code passes the `test_vanilla_generator` test in `hw2_p2.py`. Feel free to add more test cases.

3. [5 points] Given a single sample of a uniform random variable `U`, how can you extend your algorithm in part `2.1` above to sample $n=2$ i.i.d random values $X_1, X_2 \sim P$? Provide a concrete algorithm for `P= {A: 2/7, B: 4/7, C: 1/7}`. Generalize your method to an arbitrary number of samples $n$ and describe it in a few sentences. 

4. [5 points] Pulkit suggested that we can slightly modify Arithmetic Entropy Coder (`AEC`) we learnt in the class to sample a potentially infinite number of i.i.d samples $X_1, X_2, \ldots, X_n \sim P$ given any rational distribution $P$ from a single uniform random variable sample `U`! You can look at Pulkit's implementation `generate_samples_aec` in `hw2_p2.py` to get an idea of how to exploit `AEC`. Can you justify the correctness of Pulkit's method in a few lines?

    **Note**: Even though we say that we can sample potentially infinite number of samples, in practice we are limited by the precision of floats.

5. [5 points] Now let's say that you have to sample data $X_0, X_1, \ldots, X_n$ from a Markov distribution $Q$. Recall for a Markov Chain, $Q(X_0, X_1, \ldots, X_n) = Q(X_0)Q(X_1|X_0) \ldots Q(X_n|X_{n-1})$. Can you use your technique from `Q2.3` or the technique suggested by Pulkit in `Q2.4` to sample any number of samples $n$ with Markov distribution $Q$ from a single uniform random variable sample `U in [0,1)`? Describe the algorithm in a few lines.

### Q3: Conditional Entropy (*20 points*)
In this problem we will get familiar with conditional entropy and its properties. 

We learnt a few properties of conditional entropy in class: 
- $H(X) \geq H(X|Y)$
- $H(X,Y) = H(Y) + H(X|Y)$

We will use these properties to show some other useful properties about conditional entropy and solve some fun problems!

1. [5 points] Let $f(X) = Z$ be an arbitrary function which maps $X \in \mathcal{X}$ to a discrete set $Z \in \mathcal{Z}$. Then show that: $H(f(X)|X) = 0$. Can you intuitively explain why this is the case? Make sure to provide both theoretical proof and intuitive explanation.

2. [5 points] Show that $H(f(X)) \leq H(X)$, i.e. processing the data in any form is just going to reduce the entropy. Also, show that the equality holds if the function $f$ is invertible, i.e. if there exists a function $g$ such that $g(f(X)) = X$. Can you intuitively explain why this is the case? Make sure to provide both theoretical proof and intuitive explanation.

3. [4 points] In the HW1 of the 2025 edition of EE274, Pulkit and Shubham had an assignment to compress the Sherlock novel (let's call it $x_{orig}$). Pulkit computed the empirical `0th` order distribution of the letters and used those with Arithmetic coding to compress $x_{orig}$, and received average codelength $L_1$. While working on the assignment, Shubham accidentally replaced all letters with lowercase (i.e `A -> a`, `B -> b` etc.). Let's call this modified text $x_{lowercase}$. Shubham compressed $x_{lowercase}$ with the same algorithm as Pulkit, and got average codelength $L_2$. Do you expect $L_1 \geq L_2$, or $L_2 \geq L_1$. Justify based on properties of Arithmetic coding and `Q3.2`.

4. [6 points] We say that random variables $X_1, X_2, \ldots, X_n$ are pairwise independent, if any pair of random variables $(X_i,X_j), i \neq j$ are independent. Let $X_1, X_2, X_3$ be three pairwise independent random variables, identically distributed as $Ber({1\over 2})$. Then show that:

   1. [3 points] $H(X_1,X_2,X_3) \leq 3$. When is equality achieved?
   2. [3 points] $H(X_1,X_2,X_3) \geq 2$. When is equality achieved?

5. *[NOT GRADED, THINK FOR FUN!]* Let $Z_1, Z_2, \ldots, Z_k$ be i.i.d $Ber({1\over 2})$ random variables. Then show that using the $Z_i's$, you can generate $n=2^k - 1$ pairwise independent random variables, identically distributed as $Ber({1\over 2})$. 


### Q4: Bits-Back coding and rANS (*45 points*)

In class, we learnt about rANS. We started with the basic idea of encoding a uniform distribution on `{0, ..., 9}` (see Introduction section in [notes](https://stanforddatacompressionclass.github.io/notes/lossless_iid/ans.html)) and then extended it to non-uniform distributions. In this problem we will look at a different way of thinking about rANS, which will help us understand the modern entropy coder.

Let's start by first generalizing our idea of encoding a uniform distribution on `{0, ..., 9}` to a uniform distribution on `{0, ..., M-1}`, where `M` can be thought of as number of symbols in the alphabet. The encoding works as following:

```python
def encode_symbol(state, s, M):
    state = (state * M + s) 
    return state
```
The encoder maintains a single state, which we increase when we encode a symbol. Finally, we save the state by simply writing it out in the binary form. This function is implemented in `hw2_p4.py` as `UniformDistEncoder`.

1. [2 points] Write a `decode_symbol` pseudocode which takes in the encoded state `state` and `M` and returns the symbol `s` and the updated state `state`. Show that your decoder along with above encoding is lossless, i.e. we can recover the original symbol `s` from the encoded state `state` and `M`.

2. [3 points] Show that given data in `{0, ..., M-1}`, the encoder/decoder pair can be used to
   achieve lossless compression with `~ log2(M)` bits/symbol as we encode large number of symbols.

3. [5 points] Now, implement your decoder in `hw2_p4.py` as `UniformDistDecoder`. Specifically, you just need to implement `decode_op` function. Ensure that your code passes the `test_uniform_coder` test in `hw2_p4.py`. Feel free to add more test cases.

Now, we want to implement a compressor which works well for non-uniform data. We will use the base encode/decode functions from `UniformDistEncoder`, `UniformDistDecoder` and approach this problem from a new perspective. In class, we learned $H(X,Z) = H(X) + H(Z|X)$ for any two random-variables $X$ and $Z$. We will use this property to encode the data $X$. Note that this identity implies
$$ H(X) = H(X,Z) - H(Z|X)$$

Interpreting this intuitively, it should be possible to encode data `X` in the following two steps:

a. Encode `X,Z` together using a joint distribution `P(X,Z)`. Assuming an ideal compressor, this will require `H(X,Z)` bits. 

b. Decode `Z|X` from the encoded state using distribution `P(Z|X)`. Again, assuming an ideal compressor, this lets us _recover_ `H(Z|X)` bits. 

Step b gives you an intuition for the question name -- `bits-back`! Here `Z` is an additional random variable, typically latent variable (latent means hidden).
Be careful while reading this step, as it is not a compressor for `X` but a decompressor for `Z|X`! This compressor assumes knowledge of `X` and decodes `Z` from the encoded state. 
More concretely, we will have an encoder-decoder pair which will work as follows:

```python
def encode_symbol(state, X):
    state, Z = decode_zgx(state, X) # decode Z|X from state; knows X. returns Z and updated state.
    state = encode_xz(state, (X, Z)) # use this Z, and known X, to encode X,Z together. returns updated state.
    
    return state


def decode_symbol(state):
    state, (X, Z) = decode_xz(state) # decode X,Z from state. returns X,Z and updated state.
    state = encode_zgx(state, Z, X) # encode Z|X by updating state; knows X. returns updated state.
    
    return state, X
```

Note that how the encode step now involves both a decoding and an encoding step from another compressor! This is one of the key idea behind bits-back coding. We will now implement the above encoder/decoder pair for non-uniform data. 

To see the idea, let's work out a simple case together. As usual let's assume that the non-uniform input is parametrized by frequencies `freq_list[s] for s in {1,..,num_symbols}` and `M = sum(freq_list)`. For instance, if we have 3 symbols `A,B,C` with probabilities `probs = [2/7, 4/7, 1/7]`, then we can think of frequencies as `freq_list = [2,4,1]` and `M = 7`. 
We can also create cumulative frequency dict as we saw in class, i.e. `cumul = {A: 0, B: 2, C: 6}`.

 We will assume `Z` to be a uniform random variable in `{0, ..., M-1}`. Then, we can think of `X` as a function of `Z` as follows:
```python
def X(Z):
    for s in symbols:
        if cumul(s) <= Z < cumul(s) + freq_list[s]:
            return s
```
i.e. `X` is the symbol `s` such that `Z` lies in the interval `[cumul(s), cumul(s)+freq_list[s])`. This is shown in the figure below for the example above. 

![BB_ANS_1](./BB_ANS.png)

For example if `Z = 4`, then `X = B` as `cumul(B) = 2 <= 4 < 6 = cumul(B) + freq_list[B]`.

4. [2 points] What are the values of $H(X), H(Z), H(X|Z)$ in the above example?

5. [3 points] What is the distribution and entropy of $Z$ given $X$, i.e. $P(Z|X)$ and $H(Z|X=x)$ in the above example? Note that $H(Z|X=x)$ is a function of `x` and hence you need to report it for each symbol `x` in the alphabet `A,B,C`.

Now, let's implement the encoder/decoder pair for the above example. We will use the following notation:
- `state` is the encoded state
- `s` is the symbol to be encoded (`X`)
- `freq_list` is the list of frequencies of the symbols
- We want to code the above scheme utilizing the joint compressors over `X, Z` (where `Z` is the latent variable). `Z` is uniformly distributed in `{0, ..., M-1}`. 
  - `combined_symbol` is the joint random variable `Y = (X, Z)`. In our example, we only need to encode `Z` as `X` is a deterministic function of `Z`, i.e. `combined_symbol = Z` and will be in `{0, ..., M-1}`. For above example, say we want to encode `Y = (B, 4)`, then we only need to encode `Z = 4` as `X=B` is implied.
  - `fake_locator_symbol` is the value of `Z|X=x` relative to `cumul(x)`. This is a function of `X=x`. For above example of `X = B`, `Z|X=B` can be `{2, 3, 4, 5}` and hence `fake_locator_symbol` can be `{0, 1, 2, 3}` respectively as `cumul(B) = 2`.
  - Therefore, `combined_symbol` and `fake_locator_symbol` allows us to have encoder/decoder pair for both `(X,Z)` and `Z|X`. Continuing our example, if we were to encode `Y = (X=B, Z=4)`, we will encode it as `combined_symbol = 4` and `fake_locator_symbol = 2`. Conversely, if we were to decode `combined_symbol = 4`, we will decode it as `Y = (Z=4, X=B)` and infer that `fake_locator_symbol=2`.
  
6. [5 points] We have implemented the `encode_symbol` function for `NonUniformDistEncoder`. Looking at the pseudocode above and the example, explain briefly how it works. Specifically, explain how `encode_symbol` achieves the relevant `decode_zgx` and `encode_xz` functions given in pseudocode in the context of example above.

7. [10 points] Now implement the `decode_symbol` function for `NonUniformDistEncoder`. You can use the `encode_op` and the `decode_op` from uniform distribution code. Ensure that your code passes the `test_non_uniform_coder` test in `hw2_p4.py`.  Feel free to add more test cases.

8. [5 points] Show that for a symbol `s` with frequency `freq[s]`, the encoder uses `~ log2(M/freq[s])` bits and is hence optimal.

Great, we have now implemented a bits-back encoder/decoder pair for a non-uniform distribution. Let us now see how it is equivalent to rANS we studied in class. As a reminder, the rANS base encoding step looks like

```python
def rans_base_encode_step(x,s):
   x_next = (x//freq[s])*M + cumul[s] + x%freq[s]
   return x_next
```

9. [5 points] Justify that `encode_symbol` in `NonUniformDistEncoder` performs the same operation as above.

Similarly, as a reminder, the rANS base decoding step looks like
```python
def rans_base_decode_step(x):
   # Step I: find block_id, slot
   block_id = x//M
   slot = x%M
   
   # Step II: Find symbol s
   s = find_bin(cumul_array, slot) 
   
   # Step III: retrieve x_prev
   x_prev = block_id*freq[s] + slot - cumul[s]

   return (s,x_prev)
```

10. [5 points] Justify that `decode_symbol` in `NonUniformDistEncoder` performs the same operation as above.

Therefore, bits-back coding is equivalent to rANS! Thinking again in terms of $H(X) = H(X,Z) - H(Z|X)$, it allows us to interpret rANS in terms of latent variables $Z$ in a more intuitive way. This question was highly motivated by the [IT-Forum talk by James Townsend in 2022](https://stanford.zoom.us/rec/play/8aIVScMUklFQB5fClrMox6oVUiaMcYqQuhaMotkKI55VWUXLO6nFF8hK8jDVSlvbohSTZ_yG4JUXOsfp.IFXkcq1pGLBPJvmL).
   
### Q5: HW2 Feedback *(5 points)* 
Please answer the following questions, so that we can adjust the difficulty/nature of the problems for the next HWs.

1. How much time did you spent on the HW in total?
2. Which question(s) did you enjoy the most? 
3. Are the programming components in the HWs helping you understand the concepts better?
4. Did the HW2 questions complement the lectures?
5. Any other comments?

### Submission Instructions
Please submit both the written part and your code on Gradescope in their respective submission links. **We will be using both autograder and manual code evaluation for evaluating the coding parts of the assignments.** You can see the scores of the autograded part of the submissions immediately. For code submission ensure following steps are followed for autograder to work correctly:

- As with HW1, you only need to submit the modified files as mentioned in the problem statement.
  - Compress the `HW2` folder into a zip file. One way to obtain this zip file is by running the following zip command in the `HWs` folder, i.e.
    ```sh
    cd HWs
    zip -r HW2.zip HW2
    ```
    Note: To avoid autograder errors, ensure that the directory structure is maintained and that you have compressed `HW2` folder containing the relevant files and not `HWs` folder, or files inside or something else. Ensure the name of the files inside the folder are exactly as provided in the starter code, i.e. `hw2_p2.py`, `hw2_p4.py` etc. In summary, your zip file should be uncompressed to following directory structure (with same names):
    ```
    HW2
    ├── hw2_p1.py
    ├── hw2_p2.py
    └── hw2_p4.py
    ```
  
- Submit the zip file (`HW2.zip` obtained above) on Gradescope Programming Part Submission Link. Ensure that the autograded parts runs and give you correct scores. 

**Before submitting the programming part on Gradescope, we strongly recommend ensuring that the code runs correctly locally.**