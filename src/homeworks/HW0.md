# EE274: Homework-0 

- **Focus area:** Preliminaries
- **Due Date:** Oct 6
- **Weightage:** 5%
- **Total Points:** 50
- **Submission Instructions:** Provided at the end of HW (ensure you read these!)
- **Submission link:** 
  - For written part: [HW0-Written](https://www.gradescope.com/courses/436519/assignments/2296014)
  - For programming part: [HW0-Code](https://www.gradescope.com/courses/436519/assignments/2296215) 

The Homework-0 is designed to get you familiarized with the basic pre-requisites for the course + programming setup we will be using during the quarter. Please post any questions on Ed, or feel free to contact the instructors during the office hours. We will be supporting Linux and Mac OS. Windows users are welcome to use the Linux subsystem, or use a virtual machine, or use Stanford [Farmshare](https://web.stanford.edu/group/farmshare/cgi-bin/wiki/index.php/FarmShare_2) server resources.

Please ensure that you follow the [Stanford Honor Code](https://communitystandards.stanford.edu/policies-guidance/honor-code) while doing the homework. You are encouraged to discuss the homework with your classmates, but you should write your own solutions and code. You are also encouraged to use the internet to look up the syntax of the programming language, but you should not copy-paste code from the internet. If you are unsure about what is allowed, please ask the instructors.

### 1. Python, SCL setup (*10 points*)
We will be using python as the programming language during the course for the assignments and for code demonstrations during the course. If you are not familiar with python, please take a look at the [python tutorial](https://cs231n.github.io/python-numpy-tutorial/) contributed by our friends from the CS231n course.

Usually it is more convenient and safer to install python packages in a *virtual environment*. We will be using conda to do this

1. Install miniconda ([https://docs.conda.io/en/latest/miniconda.html](https://docs.conda.io/en/latest/miniconda.html)). Please follow the instructions to install miniconda on your machine
2. Create a virtual conda env using the python version `3.8.2` (higher versions should be also ok)

    ```sh
    # create a new conda environment
    conda create --name ee274_env python=3.8
    
    # activate the new conda environment
    conda activate ee274_env
    ```
    Once you complete this step, you should see a prompt such as:
    ```sh
    (ee274_env) ➜   
    ```
    This indicates that you are now in a virtual environment we created, which uses python 3.8. The virtualenv is useful to install packages etc. in an isolated environment without corrupting the rest of the machine. More details: [https://uoa-eresearch.github.io/eresearch-cookbook/recipe/2014/11/20/conda/](https://uoa-eresearch.github.io/eresearch-cookbook/recipe/2014/11/20/conda/)
    
    Please run the following command to check the python version installed. **Submit the output of this command in gradescope for credit.**
    ```sh
    (ee274_env) ➜ python --version
    ```

3. For most of the course assignments and in-class demonstrations, we will be using the [Stanford Compression Library](https://github.com/kedartatwawadi/stanford_compression_library) (SCL). Please clone the library as follows: 
    ```sh
    git clone https://github.com/kedartatwawadi/stanford_compression_library.git
    cd stanford_compression_library
    ```

4. Let us know install the required packages for the library.
    ```sh
    python -m pip install -r requirements.txt
    ```

5. To use the library, we need to add the dir of the library to the `PYTHONPATH`. You can do that using the command below:
    ```sh
    export PYTHONPATH=$PYTHONPATH:\$(pwd)
    ```
    Once that is done, let us ensure the library is installed correctly by running unit tests. **Submit the output of this command in gradescope for credit.**
    ```sh
    find . -name "*.py" -exec py.test -s -v {} +
    ```

    *NOTE:* We use the [pytest](https://docs.pytest.org/en/7.1.x/) framework to run tests in SCL. Each file of SCL also contains the tests for the block of code implemented in the file. The test functions are named as `def test_xxx(...)`. For example, the file `core/data_block.py` contains a class `DataBlock` and a test `test_data_block_basic_ops()` to test its operations. Usually these tests are a great way to understand how the block of code in the file works. You can run individual tests as:
    
    ```sh
    py.test -s -v core/data_block.py
    ```
    
    Feel free to look at different compressors in the `compressors/` folder, and the tests to get yourself familiar with them!

6. We will be using `EE274/HWs` branch of `SCL` for releasing HWs. Checkout to the branch for getting access to HW problem templates.
    ```sh
    git checkout EE274/HWs
    ```
   You should see a `HWs/HW0` folder containing template files for the rest of the assignment.

### 2. Probability and Coin Toss (*20 points*)
Kedar is a big [Cricket](https://en.wikipedia.org/wiki/Cricket) fan. In cricket (like many other sports), there is a coin toss in the beginning to determine which team gets the first chance to bat. However, Kedar thinks that the coin being used is *biased* and lands as *Heads* (`H`) much more often than *tails* (`T`). Let the probability of the coin landing on `H` be $p$.

Shubham suggests to Kedar that this problem can be solved (i.e we can get a *fair* coin) by tossing the coin twice! If we get a `H,T`sequence in the two tosses, then we mark it as a heads, while if we get a `T,H` sequence we can mark this as a tails. If we get a `H,H` or `T,T` then discard the result and start over!

1. [5 points] Do you think Shubham's solution is right? Please justify. 

2. [5 points] What is the expected number of coin flips needed to get one `H` or `T` outcome using Shubham's method?

3. [5 points] Kedar is still not convinced and thinks that we should really implement this idea to see if it works. Please help out Shubham by implementing the function `shubhams_fair_coin_generator()` in the file `HWs/HW0/hw0_p2.py`. 
NOTE: please run all of this in the `(ee274_env)` environment which you created and that you are in the correct branch of the `SCL` repo (`EE274/HWs`). Ensure that the tests except those in `HWs` folder pass before you start implementing the function.

4. [5 points] It is always a good practice to write tests to ensure the implementation is correct (even if you think theoretically it is alright :)). Please implement `test_shubhams_fair_coin_generator()` function in `HWs/HW0/hw0_p2.py`. You can test your code by running:

    ```sh
    py.test -s -v HWs/HW0/hw0_p2.py
    ```

5. (NOT GRADED, THINK FOR FUN!): Do you think Shubham's solution is *optimal*? For example, Shubham is using at least `2` biased coin tosses to generate `1` fair coin toss. This seems wasteful in some cases (for example, if the coin is almost unbiased). Can you improve upon the *average* number of biased coin tosses needed to generate one fair coin toss?  



### 3. Universal Integer Compression (*20 points*)
We will use [Stanford Compression Library](https://github.com/kedartatwawadi/stanford_compression_library) throughout the course. In this problem, we will familiarize ourselves a bit with the data structures in SCL. 

Take a look at [intro to SCL wiki article](https://github.com/kedartatwawadi/stanford_compression_library/wiki/Introduction-to-the-Stanford-Compression-Library) to familiarize yourself with the library. We will use a simple compressor `compressors/universal_uint_coder.py` as an example. 

1. [5 points] First let's get familiarized with how to use an encoder/decoder. The function `test_universal_uint_encode_decode` shows a simple way to do so. In the example, we encode and decode a list of unsigned integers `[0, 0, 1, 3, 4, 100]`. Modify the test to encode `[23, 30, 100012]` and report the length of the `encoded_bitarray`.

2. [5 points] Let's now try to understand how the `compressors/universal_uint_coder.py` works. Given an unsigned integer `u`, what is the length of the code output by `encode_symbol`? 

3. [5 points] Briefly explain how the `decode_symbol` function works, and how is it able to decode the input losslessly. 

4. [5 points] The `compressors/universal_uint_coder.py` unfortunately only encodes unsigned integers. How will you extend the uint coder to create an encoder/decoder which handles signed integers? Add you code in the file `HWs/HW0/hw0_p3.py`. NOTE: you mainly have to implement `encode_symbol` and `decode_symbol` functions. At the end, the test as present in the file (`test_universal_integer_encode_decode`) should pass. Report the length of the `encoded_bitarray` output by the test on Gradescope.

### Submission Instructions
Please submit both the written part and your code on Gradescope in their respective submission links. **We will be using both autograder and manual code evaluation for evaluating the coding parts of the assignments.** You can see the scores of the autograded part of the submissions immediately. For code submission ensure following steps are followed for autograder to work correctly:

- You only need to submit the modified files as mentioned in the problem statement. For example, for problem 2, you only need to submit the modified `HWs/HW0/hw0_p2.py` file and for problem 3, you only need to submit the modified `HWs/HW0/hw0_p3.py` file.
- Compress the HW0 folder into a zip file. One way to obtain this zip file is by running the following zip command in the `HWs` folder, i.e.
  ```sh
  cd HWs
  zip -r HW0.zip HW0
  ```
  Note: To avoid autograder errors, ensure that the directory structure is maintained and that you have compressed `HW0` folder containing the relevant files and not `HWs` folder, or files inside or something else. Ensure the name of the files inside the folder are exactly as provided in the starter code, i.e. `hw0_p2.py` and `hw0_p3.py`. In summary, your zip file should be uncompressed to following directory structure (with same names):
  ```
  HW0
  ├── hw0_p2.py
  └── hw0_p3.py
  ```
  
- Submit the zip file (`HW0.zip` obtained above) on Gradescope Programming Part Submission Link. Ensure that the autograded parts runs and give you correct scores. 

**Before submitting the programming part on Gradescope, we strongly recommend ensuring that the code runs correctly locally.**




