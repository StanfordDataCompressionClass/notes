# Introduction to lossless coding

Data compression, is one area of EECS which we are aware of and unknowingly make use of thousands of times a day.
But, not many engineers are aware of how things work *under the hood*.
Each text, image and video is compressed before it gets transmitted and shared across devices using compression
schemes/formats such as `GZIP, JPEG, PNG, H264 ...` and so on. A lot of these compression schemes are somewhat domain
specific, for example typically use `GZIP` for text files, while we have `JPEG` for images.
While there is significant domain expertise involved in designing these schemes,
there are lots of commonalities and fundamental similarities.

Our focus in the first half of the course is going to be to understand these common techniques part of all of these
compression techniques, irrespective of the domain. The goal is to also build an *intuition* for these fundamental
ideas, so that we can appropriately tweak them when eventually designing real-life and domain-specific compression
techniques. With that in mind, we are going to start with very simple hypothetical but relevant scenarios, and try
to tackle these. As we will see, understanding these simpler cases will help us understand the fundamental details of
compression.

Let's start with a simple example:

> Let's say we are given a large random text file consisting of `4` letters $A, B, C, D$. To be more precise, each
> letter
> of the text file is generated randomly by picking a letter from the set $\mathcal{S} = \{A, B, C, D\} $ independently
> and with uniform probability. i.e.

$$P(A) = P(B) = P(C) = P(D) = 1/4 $$

An example of such a file is given below. Let's say we have such a file containing $1,000,000$ letters.

```
ACABDADCBDDCABCDADCBDCADCBDACDACDBAAAAACDACDA...
```

Now if one examines this file, then the size of the file is going to be `1,000,000` bytes, as can be seen below.

```
➜ ls -l sample_ABCD_uniform.txt 
-rw-rw-r-- 1 kedar kedar 1000000 Jun 23 19:27 sample_ABCD_uniform.txt
```

This is quite obvious as we are using 1 byte (or `8 bits/symbol`) to represent each alphabet. In fact, if we look at the
bits in the file, we see that each symbol has a unique *codeword*, given by the ASCII table:

| Symbol | ASCII code |
|--------|------------|
| A      | 1000001    |
| B      | 1000010    |
| C      | 1000011    |
| D      | 1000100    |

Every time we write text to a file, the programming language *encodes* the text file using ASCII encoding table -- to
map the characters and other punctuations to binary data. Also, when we read the file back, the binary data is
read `8 bits` at a time and then *decoded* back to the character.

Now, the question we want to answer is "*Can we reduce the size of the file?*"

To be more precise, we will restrict ourselves to *Symbol codes*, which are encoding schemes where we have a unique
binary string (called a *codeword*) for every symbol.

~~~admonish question title="Quiz-1: Fixed Bitwidth Encoding"
For the example above where our file contains random letters from the set $\mathcal{S} = \{A, B, C, D\}$, 
the ASCII code gives us a compression of `8 bits/symbol`. Can we design a *symbol code* which 
achieves better compression and is *lossless*, i.e. a *lossless compression* scheme? 
~~~

## Fixed Bitwidth encoding

If we look at the ASCII code table, we see that all the codes start `1000`, which is kind of redundant. It is useful if
we have other letters in the file, but in this case we only have 4 letters. Thus, we don't need all the 8-bits! In
fact, we can just use `2 bits/symbol` to represent them all as follows:

| Symbol | ASCII code |
| -- | -- |
| A | 00 |
| B | 01 |
| C | 10 |
| D | 11 |

Note that this is lossless compression, as during decoding as well we can just read `2` bits at a time and map them
to `A,B,C,D`. Thus, this simple idea has given us a *compression* of **4x**!

In general, if we have $k = |\mathcal{S}|$ different symbols in our text file, then using this simple idea we can
represent/*encode* the data using $\lceil \log_2 k \rceil$ bits.

## Going beyond Fixed Bitwidth encoding

Now, this `2 bits/symbol` compression is all well and good, but works only if some letters are fully absent from our
text file. For example, if now our file the letters $C, D$ were absent and only the letters $\{A,B\}$ were present, then
we could go from `2 bits/symbol` to `1 bit/symbol`, by assigning codes a follows:

| Symbol | ASCII code |
| -- | -- |
| A | 0 |
| B | 1 |

But, what if $C,D$ were present, but in a smaller proportion? Is it possible to achieve better compression?
Here is a more precise question:

~~~admonish question title="Quiz-2: Beyond Fixed Bitwidth encoding"
Lets say that our random text file contains the letters $S = \{A, B, C, D \}$, such that each letter is sampled
independently with probability: $$P(A) = 0.49, P(B) = 0.49, P(C) = P(D) = 0.01 $$
Then can we design a *symbol code* which achieves lossless compression better than `2 bits/symbol`? 
~~~

Clearly, if we stick with fixed bitwidth encoding, then irrespective of the distribution of letters in our file, we are
always going to get compression of `2 bits/symbol` for all the `4` symbols, and so of course we can't achieve
compression better than `2 bits/symbol`. But, intuitively we know that most of the time we are only going to encounter
symbol $A$ or $B$, and hence we should be able to compress our file closer to `1 bit/symbol`. To improve compression,
the idea here is to go for *variable length codes*, where the code length of each symbol can be different.

But, designing *variable length codes* which are also *lossless* is a bit tricky. In the fixed bitwidth scenario, the
decoding was simple: we always looked at `2 bits` at a time, and just performed a reverse mapping using the code table
we had. In case of *variable length codes*, we don't have that luxury as we don't really know how many bits does the
next codeword consists of.

Thus, the *variable length codes* need to have some special properties which makes it both lossless and also
convenient to decode.

Instead of just mentioning the property, we are going to try to discover and reverse engineer this property! With that
in mind, I am going to present the solution to the **Quiz-2**, but what you have to do is figure out the decoding
procedure! So here is one possible code:

| Symbol | codewords |
| -- | -- |
| A | 0|
| B | 10 |
| C | 110 |
| D | 111 |

Some questions for you to answer:

~~~admonish question title="Quiz-3: Variable length symbol code"
For the variable code above, answer the following questions: 
1. Are we doing better than `2 bits/symbol` in terms of the average compression? 
2. Is the code really lossless?
3. How can we perform the decoding?  
~~~

Even before we try to answer these questions, lets try to first eyeball the designed code and see if we can
understand something! We see that the code for $A$ is now just `1` bit instead of `2`. At the same time, the code
lengths for $C,D$ are `3` instead of `2`. So, in a way, we are reducing the code length for symbols which are more
frequent, while increasing the code length for symbols which occur less frequently, which intuitively makes sense if
we want to reduce the average code length of our file!

**Compression ratio**: Lets try to answer the first question: "*Are we doing better than `2 bits/symbol` in terms of the
average compression?*" To do this, we are going to compute $\mathbb{E}(L)$, the average code length of the code:

$$ \begin{aligned}
\mathbb{E}(L) &= p(A)*1 + p(B)*2 + p(C)*3 + p(4)*3 \\
&= 0.49*1 + 0.49*2 + 0.01*3 + 0.01*3 \\
&= 1.53
\end{aligned} $$

So, although in the worst case this increases the symbol code length from `2` to `3`, we have been able to reduce the
average code length from `2` to `1.53`, which although is not as good as `1 bit/symbol` we see when $C, D$ were
completely absent, it is still an improvement from `2 bits/symbol`. Great!

**Lossless Decoding**: Now that we have answered the first question, lets move to the second one: "*Is the code really
lossless?*"

Okay, lets get back to the code we have:

| Symbol | codewords |
| -- | -- |
| A | 0|
| B | 10 |
| C | 110 |
| D | 111 |

Let's take an example string and see how the encoding/decoding proceeds:

```
input_string = ABCADBBA
```

The encoding proceeds in the same way as earlier: for every symbol, we look at the lookup table and write the
corresponding bits to the file. So, the encoding for our sample string looks like:

```python
input_string = ABCADBBA
encoding = concat(0, 10, 110, 0, 111, 10, 10, 0)
= 010110011110100
```

Now, lets think about how we can decode this bit sequence: `010110011110100`. The issue with using a *variable length
code*, unlike before where we used `2` bits for each symbol is that we don't know where each code ends beforehand. For
example, we don't know how to decode symbol no. `7` directly. but let's see how we can decode the input sequentially,
one symbol at a time.

1. The first bit of `010110011110100` is `0`. We see that only one codeword (corresponding to $A$) starts with `0`, so
   we can be confident that the first letter was an $A$! At this time we have consumed `1` bit, and so to decode the
   second symbol we have to start reading from the second bit.

2. Let's now focus our attention on the remaining bits: `10110011110100`. Now, the first bit is a `1`. Unfortunately
   $B,C,D$ have codewords which start with a `1`, so lets read another bit: `10`. Okay! we have a match with the symbol
   $B$. We can also be confident that the second symbol is indeed $B$, as no other codeword begins with `10`. Thus, our
   decoded string until now is `A,B`

3. We can continue in the same way and decode the remaining symbols one at a time, by following the following procedure,
   to recover the input string: `ABCADBBA`.

Below is a pseudocode to decode a single symbol using the matching scheme described above.

```python
codewords_table = {A: 0, B: 10, C: 110, D: 111}


def decode_symbol(encoded_bitstring, codewords_table):
    temp_bits = ""

    # read until we find a match with a codeword in the codewords_table
    while not find_match(temp_bits, codewords_table):
        temp_bits += encoded_bitstring.read_next_bit()

    decoded_symbol = find_match(temp_bits, codewords_table)
    return decoded_symbol
```

Note, that one reason why our decoding procedure works is because no codeword is an initial segment of another codeword,
i.e. no two codewords are prefixes of each other. Thus, if
codeword for $B$ is `10`, then no other codeword can begin with `10`. This kind of *Symbol codes* are known as
**prefix-free codes** (or simply **Prefix Codes**). As we just saw, we can confidently say that if a code is *
prefix-free*, then it indeed leads to lossless compression, and a convenient decoding procedure.

Note that *prefix-free codes* aren't the only way of designing *symbol codes* which are lossless. For example, consider
the following code

| Symbol | codewords |
| -- | -- |
| A | 0|
| B | 01 |
| C | 011 |
| D | 111 |

Notice that codeword for $C$ starts with `01` which is in fact the codeword for $B$ (similarly for $B$ and $A$). Thus,
this code is not *prefix-free* and our decoding procedure described above will fail. For example if we encode a $C$
-> `011...`, our decoding procedure will always output a $B$, as it would find a match at `01` itself. Note that
although our simple decoding scheme above fails, lossless decoding is still possible. Although, the decoding scheme
might be more complicated as, we have to read "future bits" to determine if a $B$ or a $C$ was encoded here.

As a fun exercise, can you try to figure out how the decoding works for this code?

~~~admonish question title="Quiz-4: Non-prefix free code example"

Can you think of a decoding procedure which works for this code? (*Hint: It sometimes helps to think in the 
reverse direction*)

| Symbol | codewords |
| -- | -- |
| A | 0|
| B | 01 |
| C | 011 |
| D | 111 |
~~~

To summarize: the key idea to learn from the design of our code is that

~~~admonish info title="Key-Idea 1: Prefix-free codes"
If no codeword in a *symbol code* is a prefix of each other, then the *symbol code* is a *prefix-free code*. 

Prefix-free codes by design are lossless compression schemes which allow for a convenient decoding scheme. 
~~~

Another name for *prefix-free* codes is *instantaneous codes* as the decoding procedure is in a sense "instantaneous",
i.e. we don't have to read bits written by future symbols to decode the current symbols.

## Next Lecture

In this lecture, we discussed the design of a simple *prefix-free code* which improves upon the compression of a
non-uniform source from `2 bits/symbol` to `1.53 bits/symbol` by using variable length codewords. We also briefly
discussed how the decoding might proceed.

In the next lecture we will take this discussion further and try to answer the following questions:

1. **Implementing the decoding**: We will see how to transform our simple decoding procedure into an efficient
   algorithm, which we can implement in practice

2. **Designing prefix-free codes**: We will discuss how to design prefix-free codes to obtain better compression.  
