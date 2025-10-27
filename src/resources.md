# Resources
Interested in data compression? Great! We list a few resources (apart from the lecture notes) which might be useful to take a look. 

NOTE: If you find a resource which you found useful and is not listed here, please file an github issue at https://github.com/stanfordDataCompressionClass/notes.

## 1. Software
A great way to learn about data compression is to play around with the compression algorithms themselves. 
1. [Stanford compression Library](https://github.com/kedartatwawadi/stanford_compression_library): A library of compression algorithms implemented in native python for accessibility and educational purpose. Take a look at the tutorials (in progress)  to get started! We will also be using the library as a basis for the course assignments.
2. [Audio Compression code/book](https://ccrma.stanford.edu/events/python-programs-and-book-building-audio-coder-and-deep-learning-audio) A python based implementation of audio compression, in form of tutorials. 
3. [Introduction to Digital Video compression](https://github.com/leandromoreira/digital_video_introduction): Great hands-on tutorial on digital video coding.
4. [H264 in Python](https://github.com/balbekov/PyH264): Experimental implementation of H264 in pure Python

## 2. Video Resources
Interested in data compression? Here are some nice youtube videos to watch to get an introduction. Most of them are beginner-friendly and are useful to get a sense of the data compression. 

Here are a set of videos to watch at leisure to get an intuition for compression:
1. [Compressor Head playlist](https://www.youtube.com/watch?v=Eb7rzMxHyOk&list=PLOU2XLYxmsIJGErt5rrCqaSGTMyyqNt2H&ab_channel=GoogleDevelopers): This is a series of short talks by a google engineer. Very good introductory videos
2. [Huffman Coding (Tom Scott)](https://youtu.be/JsTptu56GM8): I love Tom Scott and how well he explains things. Here is a nice video on Huffman coding
3. [Why Snow looks terrible on video](https://youtu.be/r6Rp-uo6HmI), [Why Night scenes look bad on video](https://youtu.be/h9j89L8eQQk): Very nice two videos by Tom Scott again which gives a brief peek into video compression algorithms
4. [PNG Image Compression](https://youtu.be/EFUYNoFRHQI): video on PNG lossless compression
5. [JPEG compression](https://youtu.be/0me3guauqOU): A bit more detailed video on JPEG compression
6. [Arithmetic coding series](https://youtube.com/playlist?list=PLE125425EC837021F): Great sequence of lectures Information theory in general and particularly on Arithmetic coding. One of the best I found on this subject.
7. [Designing Data Compression Solutions](https://www.youtube.com/watch?v=G5n37deW3uw): Talk by Yann Collet (author of zstd and lz4) what comes next once you have your great compression idea.

## 3. Textbooks, research papers
Although there are no textbooks which exactly correspond to the course material, but here are few books which might be relevant. 

1. [Elements of Information Theory](http://staff.ustc.edu.cn/~cgong821/Wiley.Interscience.Elements.of.Information.Theory.Jul.2006.eBook-DDU.pdf): Classic textbook on Information Theory
2. [Introduction to Data Compression, Guy E. Blelloch](https://www.cs.cmu.edu/~guyb/realworld/compression.pdf): Set of lecture notes/book on Data Compression by Guy E. Blelloch, CMU 2013
3. [Data Compression Explained, Matt Mahoney](http://mattmahoney.net/dc/dce.html): A nice set of lecture notes on Data Compression by Matt Mahoney.
4. [JPEG paper](https://web.stanford.edu/class/ee398a/handouts/papers/Wallace%20-%20JPEG%20-%201992.pdf): Summary of JPEG by Gregory K. Wallace
5. [OpenZL: A Graph-Based Model for Compression](https://arxiv.org/abs/2510.03203): General approach to building domain-specific compressors

## 4. Blogs/websites
The web is filled with great engineers and researchers writing blogs related to Data Compression. We list a few below:

1. [Christopher Olah's Blog](https://colah.github.io/posts/2015-09-Visual-Information/): A fun visual introduction to Information Theory.
2. [Yann Collet's Blog](http://fastcompression.blogspot.com/): Great blog by Yann Collet on implemeting fast and efficient data compression algorithms
3. [Fabian Giesen's blog](https://fgiesen.wordpress.com/category/compression/): Blog by Fabian Giesen. (The parts related to rANS implementation are particularly great!)
4. [On understanding zlib](https://www.euccas.me/zlib/): Introduction to zlib by Euccas Chen.
5. [Modern LZ Compression](https://glinscott.github.io/lz/index.html#toc4): Walk-through of modern LZ compressors by Gary Linscott.
6. [DCT](http://weitz.de/dct/): A nice blog post on DCT by Prof. Dr. Edmund Weitz
7. [DCT History](https://www.cse.iitd.ac.in/~pkalra/col783-2017/DCT-History.pdf): A small red on the history of DCT by Nasir Ahmed.
8. [Tossing a Biased Coin](./coinflipext.pdf): An accessible exploration of how to generate fair randomness from a biased coin by Michael Mitzenmacher.

## 5. Course notes from EE 376C (Stanford)

The notes from EE376C are provided below, covering universal techniques in lossless and lossy compression, as well as applications in prediction and denoising. Students can refer to these notes for a deeper understanding of universal compression techniques including the proofs of universality.

1. [Part 1: Lempel-Ziv Compression](ee376c_notes/Part1_LZ.pdf)
2. [Part 2: Context-Tree Weighting](ee376c_notes/Part2_CTW.pdf)
3. [Part 3: Universal Denoising](ee376c_notes/Part3_Denoising.pdf)
4. [Part 4: Universal Lossy Compression](ee376c_notes/Part4_Lossy_compression.pdf)