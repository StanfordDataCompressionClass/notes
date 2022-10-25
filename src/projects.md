# Projects

The project is an important part of the course (and constitutes `30%` of the course grade). This documentation serves as an introduction to the project expectations, deliverables etc.

## Project Logistics

Following are the due dates for different components of the project. All (except final presentation) will be due on Gradescope. More details for each component will be provided in the subsequent sections.

|                                                    | Weightage | Description                                    | Due Date <br/> (midnight PT)          |
|----------------------------------------------------|-----------|------------------------------------------------|---------------------------------------|
| [Proposal](#i-project-proposal)                    | 5%        | One page proposal                              | 11/4, Fri                             |
| [Milestone Report](#ii-project-milestone)          | 5%        | Upto two pages progress report + code (if any) | 11/28, Mon                            |
| [Final Presentation](#iii-final-presentation)      | 5%        | 5 min presentation + 5 min QnA                 | 12/08, Thu 4:30pm-7:30pm (last class) |
| [Final Report and Code](#iv-final-report-and-code) | 15%       | Detailed report and code submission            | 12/16, Fri                            |



## Project Expectations

The main goal of the project is to give you all some experience of working on a problem related to data compression. Ideally, the project will involve some component of reading, understanding and also implementation of a compression technique. 

The expectation for the project is as follows: 
- Literature review of a compression method/area. You are expected to work with your mentor in understanding the topic you choose, and narrow down on a concrete problem to work on for the project. 
- Implement the compression method (either using SCL or otherwise). You will work with your project mentor to ensure that your implementation is well documented and tested. 
- Finally, write a report explaining the theoretical ideas + implementation details behind your method. 

Given that the quarter is short, the problem on which you will work on will be a bit concrete. Please find a list of topics suggested by instructors [below](#project-suggestions). You are welcome to come up with your own ideas applying compression to your domain of interest or simply exploring a particular theoretical result or practical technique. Please work with the instructors to ensure the feasibility of the project in the given time frame.

The expected team size for each project is 1-2 students. Groups of 3 are also ok in exceptional circumstances given the scope of the project. Each project will also be assigned a mentor from the teaching staff. The project team and the mentor can decide to meet as per need. 


## Project Deliverables

### I. Project Proposal 
**Due: 11/4, Fri, midnight PT**

Please use the time till the deadline to explore and decide what project you would like to work on. **Before you submit the proposal, ensure to have at least one 10 minute 1-on-1 chat with the teaching staff (as a team), and finalize on the project idea.** The list of finalized project ideas will be maintained here: [EE274 Project sign-up spreadsheet](https://docs.google.com/spreadsheets/d/1tcqttFB4fx4ekcOlHASbtBMISmcTRRqQ7UGHN4mXO_Y/edit?usp=sharing). Once the project is finalized, we will assign a project mentor (Kedar/Shubham/Pulkit/Tsachy) who can help you with references for the project, help with programming, etc. As we are a small class, ideally we would not like to repeat the exact same project. The teaching team will help you modify your idea appropriately in case someone else is working on the exact same project.

For deliverable, we will follow a similar template as our friends from [CS231N](http://cs231n.stanford.edu/project.html). For the project proposal please submit a 1-page summary on what your project idea is, and an approximate timeline as to what you are planning to achieve by week-x etc. Some questions the proposal should answer:

- What is the problem that you will be investigating? Why is it interesting?
- What reading will you examine to provide context and background?
- What method or algorithm are you proposing? If there are existing implementations and/or theoretical justifications, will you use them and how? How do you plan to improve or modify such implementations? You don't have to have an exact answer at this point, but you should have a general sense of how you will approach the problem you are working on.
- How will you evaluate your results? Qualitatively, what kind of results do you expect (e.g. plots or figures)? Quantitatively, what kind of analysis will you use to evaluate and/or compare your results (e.g. what performance metrics or statistical tests)?



### II. Project Milestone 
**Due: 11/28, Mon, midnight PT**

As for the project milestone, please submit a two-page write-up on the technique/method you chose and link to your in-progress code as a GitHub repo (if any). 

[MORE DETAILS TO FOLLOW]

### III. Final presentation
**Due: 12/08, Fri, 4:30pm-7:30pm**

The Final presentation will be during the last class (note we will have a longer last class slot!). **The presentation will involve lightning talks: (short 5min talk + 5min QnA).** 

Attendance is mandatory for the presentation. In case you are not able to make it after 5:50pm on `12/08`, please inform us beforehand, and we will try to schedule your presentation earlier. You will work with your mentor on making sure the presentation is interesting and useful to your classmates :). 

[MORE DETAILS TO FOLLOW]

### IV. Final report and code 
**Due: 12/16, Fri, midnight PT**

- The final submission involves a 3-4 page report on your project idea. It should introduce the problem, describe in detail the technical details, and also briefly talk about results and other implementation details. 

- You also need to submit a link to your code repository. The expectation is to submit a well documented and well tested code which is reproducible, and something someone else (or even you) can build upon. 

Your mentor will work with you on setting expectations, and helping you review the report/code before the submission.

[MORE DETAILS TO FOLLOW]

## Project Suggestions

Here is a (non-exhaustive) list of projects which the teaching staff came up with. You can pick/modify one of these projects, or just use these as inspiration to choose one of your own!

**1. [BWT](https://en.wikipedia.org/wiki/Burrows–Wheeler_transform): Burrows Wheeler Transform for searching over compressed text**

*Potential Mentor*: Kedar  

We briefly touched the world of BWT based compressors in HW2. The project will go beyond HW2 and implement fast and efficient versions of BWT transforms. It will also explore how to use BWT for searching over compressed data.

**2. [CTW](https://en.wikipedia.org/wiki/Context_tree_weighting): Context Tree Weighting**

*Potential Mentor*: Shubham

We learned that `k-th` order probability model can be used with arithmetic coding to achieve good compression. However, the larger the `k`, the slower the adaptability of the model. CTW tries to solve this problem by "mixing" the distributions of different order efficiently. This project will involve understanding the CTW algorithm, understanding why CTW has such good theoretical properties (Rissanen lower bound etc.) and implementing it in SCL.

A few useful links: [ppt](https://docs.google.com/presentation/d/1LUbo-6mLpYTwcELOLlRR4ohku9j2kCiQj_2sYPh0uWA/edit#slide=id.g5eaf3d9f0e_0_75), [ctw-cpp-implementation](https://github.com/fumin/ctw), [original paper](https://www.cs.cmu.edu/~aarti/Class/10704_Fall16/CTW.pdf), [lecture notes](https://web.stanford.edu/class/ee477/lectures2011/lecture4.pdf)

**3. [Bits-back coding](https://bjlkeng.github.io/posts/lossless-compression-with-latent-variable-models-using-bits-back-coding/) and compression of data with permutation invariance**

*Potential Mentor*: Kedar  

We learnt about `rANS` in class. `rANS` has an interesting property that we decode in the reverse direction vs the encoding. This property can be used to great effect with a technique called "bits-back coding". 

Recent [paper](https://arxiv.org/abs/2107.09202) and [implementation](https://github.com/facebookresearch/multiset-compression) show that it is possible to have a very general method which allows saving bits by not saving the order in the data (utilizing permutation invariance). This uses bits-back coding underneath. This project will involve understanding and re-implementing this method in SCL.

**4. Tabular data compression using [Chow-Liu trees](https://en.wikipedia.org/wiki/Chow–Liu_tree)** 

*Potential Mentor*: Shubham

Tabular data is quite commonly found in data logs, log files, etc. and is typically compressed as-is using gzip. A recent [paper](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5641593/) proposes a way to exploit the dependencies between columns to improve compression. The goal of the project is to understand the paper, and implement an equivalent variant using SCL. This project will involve implementing and testing the performance of various existing compressors on variety of real life tabular datasets. 

**5. Adaptive Huffman codes, and other variants**

*Potential Mentor*: Pulkit

Huffman coding algorithm is a very useful and versatile algorithm. This project explores some variants of the standard algorithm to improve its performance. We will explore two of such variations in this project. In the first part of the project, we will implement Depth-limited huffman coding as a part of SCL ([original paper](https://www.ics.uci.edu/~dan/pubs/LenLimHuff.pdf), [Charles Bloom's blog](http://cbloomrants.blogspot.com/2010/07/07-03-10-length-limitted-huffman-codes.html)).
The second part of the project would entail implementing [Dynamic Huffman tree](https://en.wikipedia.org/wiki/Adaptive_Huffman_coding) as part of SCL. Dynamic Huffman coding deals with the question of how can we update huffman tree as the source distribution changes in practice.

**6. PPM, PPMD** 

*Potential Mentor*: Shubham/Kedar/Pulkit

[PPM: prediction by partial matching](https://en.wikipedia.org/wiki/Prediction_by_partial_matching) is a very interesting algorithm for adaptive coding based on context matching. This project involves understanding and implementing this idea.

**7. LZ77 optimized implementation**

*Potential Mentor*: Shubham

The most widely used general purpose compressors (gzip, zstd) are based on LZ77. The SCL implementation of LZ77 uses a simplistic greedy parsing strategy and uses static codes for encoding  the match lengths and offsets. In addition, the SCL LZ77 doesn’t have a sliding window or a chained-hash implementation. In this project, we will work towards creating a better LZ77 implementation in SCL based on existing works such as gzip, zstd as well as other resources such as this [blog post](https://glinscott.github.io/lz/index.html) by Glinn Scott. After the implementation is finished, we will perform experiments to better analyze how the performance varies with the parameters.

**8. LZ78/LZW in SCL**

*Potential Mentor*: Shubham

In the class we discussed the LZ77 compression algorithm and its practical implementation. There are other universal compressors which are quite interesting and have as good/better properties than LZ77. This project involves understanding and implementing LZ78 and/or Lempel-Ziv-Welsh (LZW) algorithm in SCL.

**9. Alias method for speeding up rANS**  

*Potential Mentor: Kedar*

rANS decoding is bottle-necked by the binary search of the `slot` (as we learnt in the class). The alias method can be used for speeding this part up! This project will involve understanding the alias method, and implementing it in SCL for speeding up rANS decoding. For reference, see blog by Fabian Giesen [here](https://fgiesen.wordpress.com/2014/02/18/rans-with-static-probability-distributions/).

**10. Recompression**  

*Potential Mentor: Shubham*

In many scenarios we use suboptimal compression formats like gzip or jpeg due to legacy support and compatibility reasons. Significant storage savings can be obtained if the data were to be stored in a modern optimized format. However, there is often a requirement to be able to exactly recover the original compressed file, which might not be possible with a simple transcoding approach. In this project we will explore the idea of recompression, which is a technique to compress a file in a new format while preserving the original compressed file. The project will involve implementing a known or novel recompression technique and understanding the invertibility of the recompression. Some existing recompression works include [brunsli](https://github.com/google/brunsli) and [lepton](https://github.com/dropbox/lepton) for JPEG, and [precomp-cpp](https://github.com/schnaader/precomp-cpp) for gzip.

**11. Hardware acceleration for compression**

*Potential Mentor*: Shubham

Many of the widely used compression algorithms rely heavily on hardware acceleration, e.g., utilizing SIMD and AVX2 instructions on CPU. In addition, there is much interest in exploring the use of GPUs to accelerate compression. This project will first identify a particular existing or novel usage of hardware acceleration in a compression setting, followed by implementation of this acceleration. We will demonstrate the speedup obtained vs. an efficient implementation without acceleration and explain the core ideas behind the speedup. Some example optimized code bases include [Zstd](https://github.com/facebook/zstd), [FSE](https://github.com/Cyan4973/FiniteStateEntropy), [BSC](https://github.com/IlyaGrebnov/libbsc) and [DietGPU](https://github.com/facebookresearch/dietgpu).


### Open Ended project ideas

The ideas below are not fleshed out yet, but project groups can talk to the instructors to come up with a concrete idea: 

1. Understanding and implementing different image/video perceptual metrics in SCL (eg: SSIM, MS-SSIM, VMAF, etc.).

    *Potential Mentor: Pulkit*

2. Implement a lossless image compressor beating PNG in SCL. (NOTE: there are compressors such as JPEG-XL, AVIF, which already do this, but you can go beyond those!) 

   *Potential Mentor: Kedar*

3. Attempt the CLIC image compression challenge! (a bit more challenging): [http://compression.cc/tasks/](http://compression.cc/tasks/)

    *Potential Mentor: Kedar/Pulkit*

4. *Joint image compression:* Often very similar images are stored (e.g., same scene captured twice from slightly different angles) but are compressed independently of each other. In this project we explore the possibility of better compression by jointly compressing the images (one idea could be to stitch them into a video and use video compression algorithms). Find/generate a suitable dataset and implement an algorithm (lossless or lossy). Demonstrate the savings achieved by joint vs. individual compression.

    *Potential Mentor: Tsachy/Pulkit*

5. Compression can be used to estimate entropy of a random variable. In this project we will explore the idea of using compression to estimate entropy of a random variable. We will implement a simple compression algorithm and use it to estimate entropy of a random variable. We will then compare the performance of this algorithm with other entropy estimation techniques and/or use it for a practical application such as anomaly detection and/or prediction in high-dimensional datasets via compression in a dataset you care about. 

    *Potential Mentor: Tsachy/Pulkit*

6. NN-based lossy compressors vs. more traditional lossy compressors vs. the fundamental limits. Comparison between recent NN-based lossy compressors and more traditional ones based on vector quantization in terms of rate-distortion-complexity tradeoffs, experimenting on simulated data for which we know and can compare to the fundamental limits.  

   *Potential Mentor: Tsachy/Pulkit*

7. Lossy compression of text under a meaningful distortion measure. Explore achievable rate distortion tradeoffs and/or fundamental limits in this space. 

   *Potential Mentor: Tsachy/Shubham*

8. Neural audio compression: explore the recent work by Meta using neural nets for audio compression.  

    *Potential Mentor: Tsachy*

9. *Genome in a tweet:* The question to answer is can we compress a child's genome in a single tweet (~280 bytes) assuming side-information of the genomes of their parents is availabein a tweet?. The project will try to answer this question theoretically, and practically by implementing a compressor.
The project can also explore practically implementing ideas from distributed compression.

    *Potential Mentor*: Kedar/Shubham






