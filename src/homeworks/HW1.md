# EE274 (Fall 23): Homework-1

- **Focus area:** Prefix-free codes, Basic Information theory
- **Due Date:** Oct 18, midnight (11:59 PM)
- **Weightage:** 15%
- **Total Points:** 135
- **Submission Instructions:**
  - Provided at the end of HW (ensure you read these!)
  - We will be using both manual and auto-grading for the assignment submissions. Please follow the submission instructions carefully to ensure you get full credit for your submissions.
- **Submission link:** 
  - For written part: [HW1-Written](https://www.gradescope.com/courses/625620/assignments/3459512)
  - For programming part: [HW1-Code](https://www.gradescope.com/courses/625620/assignments/3466287)
- Please post any questions on Ed, or feel free to contact the instructors during the office hours. We will be supporting Linux and Mac OS. Windows users are welcome to use the Linux subsystem, or use a virtual machine, or use Stanford [Farmshare](https://web.stanford.edu/group/farmshare/cgi-bin/wiki/index.php/FarmShare_2) server resources.

**NOTE:** The homework looks longer that it actually is! We try to be verbose with the questions for clarity.

### 0. Python, SCL setup (*10 points*)
We will be using python as the programming language during the course for the assignments and for code demonstrations during the course. If you are not familiar with python, please take a look at the [python tutorial](https://cs231n.github.io/python-numpy-tutorial/) contributed by our friends from the CS231n course.

Usually it is more convenient and safer to install python packages in a *virtual environment*. We will be using conda to do this

1. Install miniconda (https://docs.conda.io/en/latest/miniconda.html). Please follow the instructions to install miniconda on your machine
2. Create a virtual conda env using the python version `3.9` (higher versions should be also ok)

    ```sh
    # create a new conda environment
    conda create --name ee274_env python=3.9
    
    # activate the new conda environment
    conda activate ee274_env
    ```
    Once you complete this step, you should see a prompt such as:
    ```sh
    (ee274_env) ➜   
    ```
    This indicates that you are now in a virtual environment we created, which uses python 3.9. The virtualenv is useful to install packages etc. in an isolated environment without corrupting the rest of the machine. More details: https://uoa-eresearch.github.io/eresearch-cookbook/recipe/2014/11/20/conda/
    
    Please run the following command to check the python version installed. **Submit the output of this command in gradescope for credit.**
    ```sh
    (ee274_env) ➜ python --version
    ```

3. For most of the course assignments and in-class demonstrations, we will be using the [Stanford Compression Library](https://github.com/kedartatwawadi/stanford_compression_library) (SCL). 

   Please clone the library as follows: 

   ```sh
   git clone https://github.com/kedartatwawadi/stanford_compression_library.git
   cd stanford_compression_library
   ```

4. Install the library. This installs the SCL library in an editable way so you do not need to reinstall when you modify any files. This also installs any dependencies of SCL.
    ```sh
    pip install -e .
    ```

   Once this is done let us ensure the library is installed correctly by running unit tests. **Submit the output of this command in gradescope for credit.**
   
   ```sh
   find scl -name "*.py" -exec py.test -s -v {} +
   ```

*NOTE:* We use the [pytest](https://docs.pytest.org/en/7.1.x/) framework to run tests in SCL. Each file of SCL also contains the tests for the block of code implemented in the file. The test functions are named as `def test_xxx(...)`. For example, the file `core/data_block.py` contains a class `DataBlock` and a test `test_data_block_basic_ops()` to test its operations. Usually these tests are a great way to understand how the block of code in the file works. You can run individual tests as:
    
```sh
py.test -s -v scl/core/data_block.py
```

Feel free to look at different compressors in the `compressors/` folder, and the tests to get yourself familiar with them!

6. We will be using `EE274_Fall23/HWs` branch of `SCL` for releasing HWs. Checkout to the branch for getting access to HW problem templates.
    ```sh
    git checkout EE274_Fall23/HWs
    ```
You should see a `scl/HWs/HW1` folder containing template files for the rest of the assignment. Going ahead, we will refer to files relative to `scl` folder in your `stanford_compression_library` folder. For example, `HWs/HW1/hw1_p1.py` refers to the file `stanford_compression_library/scl/HWs/HW1/hw1_p1.py`.

For more details about SCL and to get comfortable with it, we also created a SCL tutorial. You can find the SCL tutorial linked [here](today).

### 1. Probability and Coin Toss (*20 points*)
Kedar is a big [Cricket](https://en.wikipedia.org/wiki/Cricket) fan. In cricket (like many other sports), there is a coin toss in the beginning to determine which team gets the first chance to bat. However, Kedar thinks that the coin being used is *biased* and lands as *Heads* (`H`) much more often than *tails* (`T`). Let the probability of the coin landing on `H` be $p$.

Shubham suggests to Kedar that this problem can be solved (i.e. we can get a *fair* coin) by tossing the coin twice! If we get a `H,T`sequence in the two tosses, then we mark it as a heads, while if we get a `T,H` sequence we can mark this as a tails. If we get a `H,H` or `T,T` then discard the result and start over!

1. [5 points] Do you think Shubham's solution is right? Please justify. 

2. [5 points] What is the expected number of coin flips needed to get one `H` or `T` outcome using Shubham's method?

3. [5 points] Kedar is still not convinced and thinks that we should really implement this idea to see if it works. Please help out Shubham by implementing the function `shubhams_fair_coin_generator()` in the file `HWs/HW1/hw1_p1.py`. 
NOTE: please run all of this in the `(ee274_env)` environment which you created and that you are in the correct branch of the `SCL` repo (`EE274_Fall23/HWs`). Ensure that the tests except those in `HWs` folder pass before you start implementing the function.

4. [5 points] It is always a good practice to write tests to ensure the implementation is correct (even if you think theoretically it is alright :)). Please implement `test_shubhams_fair_coin_generator()` function in `HWs/HW1/hw1_p1.py`. You can test your code by running:

    ```sh
    py.test -s -v HWs/HW1/hw1_p1.py
    ```

5. (NOT GRADED, THINK FOR FUN!): Do you think Shubham's solution is *optimal*? For example, Shubham is using at least `2` biased coin tosses to generate `1` fair coin toss. This seems wasteful in some cases (for example, if the coin is almost unbiased). Can you improve upon the *average* number of biased coin tosses needed to generate one fair coin toss?

### Q2: Basic Information theory  (*20 points*)

1. [5 points] Let $X$ be a random variable over positive integers with a distribution 
$$ P_X(X=k) = 2^{-k}, k \geq 1$$ 
Compute the entropy $H(X)$ of random variable $X$. What are the optimal code-lengths for a prefix-free code designed for distribution $P_X$?
2. [5 points] Provide an optimal prefix-free code design for the distribution $P_X$. 
3. [10 points] Let $Y$ be a random variable over positive integers such that $\mathbb{E}(Y) = 2$. 
Then show that:
$$ H(Y) \leq 2 $$ 
For what distribution of the random variable $Y$ does the equality hold, i.e. $H(Y) = 2$? 

    **HINT:** KL-Divergence and it's properties will be helpful to show this.


### Q3. Uniquely decodable codes (*25 points*)

We mainly explored prefix-free codes in class. But there is a much broader class of codes, the uniquely decodable codes. A code is uniquely decodable if no two sequences (of length 1 or more) of input symbols (say $x^n$ and $y^m$) can produce the same encoding, and hence one can uniquely determine the input sequence from the encoding. In this question, we will show that even with the uniquely decodable codes, we cannot do better than the Entropy. 

1. [5 points] Consider the code `C1` below. Is `C1` uniquely decodable? Implement a decoder for the code below. Briefly justify your decoding procedure. 
    ```
    A -> 10
    B -> 00
    C -> 11
    D -> 110
    ```

Consider an alphabet $\mathcal{U}$ and a uniquely decodable code with code lengths for $u \in \mathcal{U}$ denoted by $L(u)$. Also, we denote the codelength of the n-tuple $u^n$ as $L(u^n) = \sum_{i=1}^n L(u_i)$.

2. [5 points] Show that $$\left( \sum_{u \in \mathcal{U}} 2^{-L(u)} \right)^n = \sum_{u^n \in \mathcal{U}^n} 2^{-L(u^n)} $$

3. [5 points] Let $l_{max} = \max_{u \in \mathcal{U}} L(u)$. Then we can rewrite the summation as: $$\sum_{u^n \in \mathcal{U}^n} 2^{-L(u^n)} = \sum_{j=1}^{n.l_{max}} |\{u^n| L(u^n) = j\}|. 2^{-j}$$ 

   NOTE: Rewriting summation is a common proof trick, and is a useful one to watch out for!
Using `Q4.2` and the identity above, show that:

   $$\left( \sum_{i=1}^{|\mathcal{U}|} 2^{-L(u_i)} \right)^n \leq n.l_{max}$$

4. [5 points] Using `Q4.3` show that uniquely decodable codes satisfy Kraft's inequality i.e. 

$$\left( \sum_{u\in\mathcal{U}} 2^{-L(u)} \right) \leq 1$$

5. [5 points] Now show that for any uniquely decodable code for $U$ with codeword lengths $L(U)$, $$\mathbb{E}[L(U)] \geq H(U) .$$
  Also argue that for any uniquely decodable code, it is possible to construct a prefix-free code with the same codeword lengths. 

This means that uniquely decodable codes generally do not provide any benefits over prefix-free codes and instead have a more complicated decoding procedure!


**NOTE:** We saw a similar proof for prefix-free codes in the class!

### Q4: Shannon Code(s) (*25 points*)

In class, we saw one version of the Shannon codes; the [tree-based construction](https://stanforddatacompressionclass.github.io/notes/lossless_iid/prefix_free_codes.html#designing-prefix-free-codes).

1. [5 points]  Let's call it the `ShannonTreeEncoder` and the `ShannonTreeDecoder`. Manually calculate what the codewords should be for the following distributions:

    ```python
    ProbabilityDist({"A": 0.25, "B": 0.25, "C": 0.25, "D": 0.25})
    ProbabilityDist({"A": 0.5, "B": 0.25, "C": 0.12, "D": 0.13})
    ProbabilityDist({"A": 0.9, "B": 0.1})
    ```

2. [10 points] Complete the code for the `ShannonTreeEncoder` in `hw1_p4.py`. Also, complete the `test_shannon_tree_coding_specific_case()` to check the correctness of your codewords in part 1 against your implemented code. If you encounter errors, you should identify the failing test case and fix any issues. Note: we will be using automated tests to grade your code, so it is important that you do not change the function signatures. We will have more test cases for grading, so feel free to add more test cases of your own of your own when working on the problem. 

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
    decoded_symbol = decoding_table[state]
    num_bits_consumed = codelen_table[decoded_symbol]
    return decoded_symbol, num_bits_consumed
```

3. [5 points] Based on the pseudo-code above, explain in a few sentences how the table based decoding works. Why do you need to output both the decoded symbol and the number of bits consumed?

4. [5 points] Complete the `ShannonTableDecoder` in `hw1_p4.py` by implementing the `create_decoding_table` function. You can verify if your implementation is correct by using `test_shannon_table_coding_end_to_end` function.


### Q5. Huffman coding on real data (*30 points*)

In class, we have studied compression for sources where we knew the distribution of data beforehand. In most real-life scenarios, this is not the case. Often times, we use the empirical distribution of the data and design a code for this distribution. Then we encode the data with this distribution. For the decoding to work, we also need to transmit the distribution or the code in some way. This problem focuses on compression of a provided file with Huffman coding.

Before we start with the code, let's look at how important it is to transmit the distribution faithfully to achieve lossless compression. 

1. [10 points] Consider the probability distribution represented as a mapping from a symbol to its probability: `{A: 0.11, B: 0.09, C: 0.09, D: 0.71}`. 

    a. What are the codeword lengths for the symbols in the Huffman code?
    
    After a harrowing cab experience in US, Pulkit wants to send a codeword `BADCAB` to Shubham to describe his frustration. Shubham and Pulkit had agreed to use Huffman encoding for such communications in the past. He encodes the codeword `BADCAB` using the original distribution `{A: 0.11, B: 0.09, C: 0.09, D: 0.71}`, and sends both the codeword and this distribution  to Shubham (so that Shubham is able to decode it on his end by building a Huffman tree on his own). 

    b. Unfortunately,  Shubham decodes the message to be `CADBAC` instead of `BADCAB` making him confused. What might have gone wrong during this communication between the two?

    **HINT:** notice the specific encoded and decoded symbols in the message.

    Pulkit-Shubham realized this issue and fixed it. 

    c. In the spirit of frugality, Pulkit decides to transmit a rounded distribution with just one significant decimal (`{A: 0.1, B: 0.1, C: 0.1, D: 0.7}`). What are the codeword lengths for the symbols in the Huffman code for this distribution? Are there multiple possible Huffman code lengths? Why?

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
    - Also, you will hear about [Canonical Huffman code](https://en.wikipedia.org/wiki/Canonical_Huffman_code) in class, which provides an alternative to solve some of these issues in practice. You do not need it for this question.

Verify that your implementation is correct by running
    ```
    py.test -s -v HWs/HW1/hw1_p5.py
    ```
If you encounter errors, you should identify the failing test case and fix any issues. Note: we will be using automated tests to grade your code, so it is important that you do not change the function signatures and that your code passes these tests. We will have more test cases for grading, so feel free to add more test cases of your own when working on the problem. But these should be sufficient to get you started.

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
    
    - Report the size of your compressed file. You can run `wc -c sherlock.txt.huffz` to print the size.
    - How much is the overhead due to storing the probability distribution? **Note:** One easy way to check this to replace `encode_prob_dist` with a version that just returns `BitArray()`. Obviously the decoding won't work with this change!
    - Print the obtained huffman tree on sherlock.txt by using the `print_huffman_tree` function. What do you observe? Does the printed Huffman tree make sense? Why or why not?
   
4. [3 points] What happens if you repeatedly use this compressor on the file (`sherlock.txt -> sherlock.txt.huffz -> sherlock.txt.huffz.huffz -> ...`)? Does the file size keep getting smaller? Why or why not? 

5. [2 points] Now run gzip on the file (command: `gzip < HWs/HW1/sherlock.txt > HWs/HW1/sherlock.txt.gz`) and report the size of the gzip file (`sherlock.txt.gz`). 

You will observe that gzip does significantly better than the Huffman coding, even if we ignore the overhead from part 3. While gzip uses Huffman coding internally, it also relies on other ideas that we will learn about in the coming lectures. 

### Q6: HW1 Feedback *(5 points)* 
Please answer the following questions, so that we can adjust the difficulty/nature of the problems for the next HWs.

1. How much time did you spent on the HW in total?
2. Which question(s) did you enjoy the most? 
3. Are the programming components in the HWs helping you understand the concepts better?
4. Did the HW1 questions complement the lectures?
5. Any other comments?

### Submission Instructions

Please submit both the written part and your code on Gradescope in their respective submission links. **We will be using both autograder and manual code evaluation for evaluating the coding parts of the assignments.** You can see the scores of the autograded part of the submissions immediately. For code submission ensure following steps are followed for autograder to work correctly:

- You only need to submit the modified files as mentioned in the problem statement. For example, for problem 1, you only need to submit the modified `HWs/HW1/hw1_p1.py` file; for problem 4, you only need to submit the modified `HWs/HW1/hw1_p4.py` file; and so-on.
- Compress the `HW1` folder into a zip file. One way to obtain this zip file is by running the following zip command in the `HWs` folder, i.e.
  ```sh
  cd HWs
  zip -r HW1.zip HW1
  ```
  Note: To avoid autograder errors, ensure that the directory structure is maintained and that you have compressed `HW1` folder containing the relevant files and not `HWs` folder, or files inside or something else. Ensure the name of the files inside the folder are exactly as provided in the starter code, i.e. `hw1_p4.py`, `hw1_p5.py` etc. In summary, your zip file should be uncompressed to following directory structure (**with same names**):
  ```
  HW1
  ├── hw1_p1.py
  ├── hw1_p4.py
  └── hw1_p5.py
  ```
  
- Submit the zip file (`HW1.zip` obtained above) on Gradescope Programming Part Submission Link. Ensure that the autograded parts runs and give you correct scores. 

**Before submitting the programming part on Gradescope, we strongly recommend ensuring that the code runs correctly locally.**

