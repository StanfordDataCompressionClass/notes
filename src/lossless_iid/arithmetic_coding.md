# Arithmetic coding

## Recap -> Issues with symbol codes: 

Lets consider the simple distribution below and think about what designing prefix-free codes for the same
```py
P = {A: 0.1, B: 0.9}
H(P) = 0.47
```

It is clear that as there are just two symbols, the only reasonable prefix-free code design here is: 
```
A -> 0, B -> 1
Huffman code (or any other prefix-free code) = 1 bit
```
So the average codelength for huffman code for this data is 1 bit. If we compare it with the entropy $H(P) = 0.47$ of the distribution,
our average codelength (`1 bit`) is quite off. Ideally for a symbol $s$, ideally we want to use $l(s) = \log_2 \frac{1}{P(s)}$ bits (to achieve $H(P)$). But, as we are using a symbol code, we cant use fractional bits.
Thus, there is always going to an overhead of upto  `~1 bit` per symbol with symbol codes. Thus the expected codelength $L \leq H(P) + 1$ with Huffman codes. 

One solutionto this problem, which was by considering block codes. i.e. we consider tuples of symbols from the alphabet as a new "symbol" and construct a Huffman code using that. 
For example, we can consider blocks of size 2: `P = {AA: 0.01, AB: 0.09, BA: 0.09, BB: 0.81}`. Here is the Huffman tree:

```py
block_size: 1, entropy: 0.47, avg_codelen: 1.00 bits/symbol

  |--A
·-|  
  |--B
block_size: 2, entropy: 0.47, avg_codelen: 0.65 bits/symbol

       |--BA
  |--·-|  
  |    |    |--AA
  |    |--·-|  
  |         |--AB
·-|  
  |--BB
```

We see that `BB` has probability `0.81`, so it receives the shortest codelength of `1 bit`. The aaverage codelength in this case is `0.65 bits/symbol` which is definitely an improvement over the `1 bit/symbol`. 
The idea here is that, as we are using fixed codes per "symbol", as now the symbols are tuples of size 2, the overhead gets amortized to 2 symbols from the alphabet. 

We can continue doing this by considering larger blocks of data. For example, with blocks of size $k$, the new alphabet size is $2^k$, and the overhead due to Huffman coding should be `~1/k` (or lower). 
Here is an example of applying the Huffman coding on blocks of size 3,4,5: 

```py
block_size: 3, entropy: 0.47, avg_codelen: 0.53 bits/symbol

                      |--AAA
                 |--·-|  
                 |    |--BAA
            |--·-|  
            |    |    |--ABA
            |    |--·-|  
            |         |--AAB
       |--·-|  
       |    |--ABB
  |--·-|  
  |    |    |--BBA
  |    |--·-|  
  |         |--BAB
·-|  
  |--BBB

```

```py
## Huffman code for blocks
block_size: 1, entropy: 0.47, avg_codelen: 1.00 bits/symbol
block_size: 2, entropy: 0.47, avg_codelen: 0.65 bits/symbol
block_size: 3, entropy: 0.47, avg_codelen: 0.53 bits/symbol
block_size: 4, entropy: 0.47, avg_codelen: 0.49 bits/symbol
block_size: 5, entropy: 0.47, avg_codelen: 0.48 bits/symbol
```

We already see that the with block size `4` we are already quite close to the entropy of `0.47`. So, this is quite great, and should help us solve our problem of reaching the entropy limit.
In general the convergence of Huffman codes on blocks goes as:

1. Huffman codes

$$ H(X) \leq \mathbb{E}[l(X)] \leq H(X) + 1 $$

2. Huffman codes on blocks of size B

$$ H(X) \leq \frac{\mathbb{E}[l(X_1^B)]}{B} \leq H(X) + \frac{1}{B}$$


However there is a practical issue. Do you see it? As a hint (and also because it looks cool!) here is the huffman tree for block size `5`: 


```py
block_size: 5, entropy: 0.47, avg_codelen: 0.48 bits/symbol

            |--BABBB
       |--·-|  
       |    |              |--BBABA
       |    |         |--·-|  
       |    |         |    |--ABBBA
       |    |    |--·-|  
       |    |    |    |    |--BABBA
       |    |    |    |--·-|  
       |    |    |         |--AABBB
       |    |--·-|  
       |         |                        |--BBAAA
       |         |                   |--·-|  
       |         |                   |    |--AABAB
       |         |              |--·-|  
       |         |              |    |    |--AAABB
       |         |              |    |--·-|  
       |         |              |         |--ABBAA
       |         |         |--·-|  
       |         |         |    |         |--AABBA
       |         |         |    |    |--·-|  
       |         |         |    |    |    |              |--AAAAB
       |         |         |    |    |    |         |--·-|  
       |         |         |    |    |    |         |    |--AABAA
       |         |         |    |    |    |    |--·-|  
       |         |         |    |    |    |    |    |         |--AAAAA
       |         |         |    |    |    |    |    |    |--·-|  
       |         |         |    |    |    |    |    |    |    |--BAAAA
       |         |         |    |    |    |    |    |--·-|  
       |         |         |    |    |    |    |         |    |--ABAAA
       |         |         |    |    |    |    |         |--·-|  
       |         |         |    |    |    |    |              |--AAABA
       |         |         |    |    |    |--·-|  
       |         |         |    |    |         |--BAAAB
       |         |         |    |--·-|  
       |         |         |         |         |--BABAA
       |         |         |         |    |--·-|  
       |         |         |         |    |    |--ABABA
       |         |         |         |--·-|  
       |         |         |              |    |--BAABA
       |         |         |              |--·-|  
       |         |         |                   |--ABAAB
       |         |    |--·-|  
       |         |    |    |    |--ABBAB
       |         |    |    |--·-|  
       |         |    |         |--BABAB
       |         |--·-|  
       |              |         |--BBAAB
       |              |    |--·-|  
       |              |    |    |--BAABB
       |              |--·-|  
       |                   |    |--ABABB
       |                   |--·-|  
       |                        |--BBBAA
  |--·-|  
  |    |         |--BBBAB
  |    |    |--·-|  
  |    |    |    |--BBBBA
  |    |--·-|  
  |         |    |--BBABB
  |         |--·-|  
  |              |--ABBBB
·-|  
  |--BBBBB

```

The issue is that, as we increase the block size $B$, our codebook size increases exponentially as $|\mathcal{X}|^B$.
The larger the codebook size the more complicated the encoding/decoding becomes, the more memory we need, the higher the latency etc. For example, if we look at the tree above, the codebook size is $2^5 = 32$. This is quite manageable. 
However, this wouldn't have been the case if our alphabet size was $256$ instead of $2$. In that case, block code of size `5` has a codebook = $2^{40}$, which is definitely unmanageable.


Thus, even though with block size $B$, we obtain compression as close as `1/B bits/symbol` to entropy $H(X)$, the idea doesn't hold ground practically. 
That is, in fact the problem which Arithmetic coding solves: 

## Arithmetic coding: Introduction

Arithmetic coding solves the problems we discussed with the block-based Huffman coder: 

1. **Entire datas as a single block**: Arithmetic coding encodes entire data as a single block: For data $x_1^n$, the `block_size = n` 
i.e. the entire data is a single block!

2. **codewords are computed on a fly**: As the block size for arithmetic coding is the entire data, the codebook size would have been massive ($$|\mathcal{X}|^n). The codeword is computed on *on the fly*
No need to pre-compute the codebook beforehand.

3. **compression efficiency**: Arithmetic coding is optimal in terms of compression. ->  *theoretically* the performance can be shown to be:  
$$ H(X) \leq \frac{\mathbb{E}[l(X_1^n)]}{B} \leq H(X) + \frac{2}{n}$$
i.e. `~2 bits` of overhead for the *entire* sequence


Thus, we see that Arithmetic coding solves our problem of achieving average compression equal to $H(X)$, at the same 
---

# How does Arithmetic coding work? 


---

# Primer: the number line (in binary)

![h:250](https://user-images.githubusercontent.com/1708665/195666574-59533bd7-b67c-4fe8-8a6f-3a04a29d9af5.png)



```py
# floating point values in binary
0.3333 = # b0.... ?
0.6666 = #?
```

---

# Primer: the number line (in binary)

![h:250](https://user-images.githubusercontent.com/1708665/195666574-59533bd7-b67c-4fe8-8a6f-3a04a29d9af5.png)



```py
# floating point values in binary
from utils.bitarray_utils import float_to_bitarrays
_, binary_exp = float_to_bitarrays(0.3333333, 20)

0.3333 = b0.010101...
0.6666 = b0.101010...
```

---

# Arithmetic Encoding

We will consider the following running example: 

```py
P = ProbabilityDist({A: 0.3, B: 0.5, C: 0.2})
x_input = BACB
```

We want to encode the sequence $x_1^n = BACB$ sampled from the distribution $P$. 


---

# Arithmetic Encoding


1. **STEP I**: Find an *interval* (or a *range*) `[L,H)`, corresponding to the *entire sequence* $x_1^n$ 

```py
        x_input -> |------------------[.....)------------|
                   0               low     high          1 
```

2. **STEP II**: Communicate the *interval* `[L,H)` *efficiently*
(i.e. using less number of bits)
```py
         x_input -> [L,H) -> 011010
```


---
# Arithmetic coding example
![h:550](https://user-images.githubusercontent.com/1708665/195671863-f6b894a3-f18e-4e62-883e-b7595a1a0003.jpg)

---

# Arithmetic coding example
![h:550](https://user-images.githubusercontent.com/1708665/195671855-1d048cea-ad31-4a20-8149-e9bfe68da2ac.jpg)

---

# Arithmetic coding example
![h:550](https://user-images.githubusercontent.com/1708665/195671851-7fc549b8-d2a3-4fa9-b9c7-8bb311df5ed7.jpg)

---

# Arithmetic coding example
![h:550](https://user-images.githubusercontent.com/1708665/195671847-0d550641-7da3-4127-8e92-dd4f251d7f3b.jpg)

---

# Arithmetic coding example
![h:550](https://user-images.githubusercontent.com/1708665/195671842-0728b8a8-3718-4022-a594-b77b561f71aa.jpg)

---

# Arithmetic coding example
![h:550](https://user-images.githubusercontent.com/1708665/195671837-28b3955a-4710-4877-9d97-2290191ae94b.jpg)

---

# Arithmetic coding example
![h:550](https://user-images.githubusercontent.com/1708665/195671828-f2dd9392-c40b-4586-b67c-3f5c4acf810e.jpg)

---

# Arithmetic coding example

1. **STEP I**: Find an *interval* (or a *range*) `[L,H)`, corresponding to the *entire sequence* $x_1^n$ 

```py
prob = ProbabilityDist({A: 0.3, B: 0.5, C: 0.2})
x_input = BACB

# find interval corresp to BACB
ENCODE: B -> [L,H) = [0.30000,0.80000)
ENCODE: A -> [L,H) = [0.30000,0.45000)
ENCODE: C -> [L,H) = [0.42000,0.45000)
ENCODE: B -> [L,H) = [0.42900,0.44400)
```
Thus, the final interval is: `x_input -> [0.429, 0.444)`

---
# Arithmetic coding pseudo-code

```py
class ArithmeticEncoder:
    ...

    def shrink_range(self, L, H, s):
        rng = H - L
        new_L = L + (rng * self.P.cumul[s])
        new_H = new_L + (rng * self.P.probs(s))
        return new_L, new_H

    def find_interval(self, x_input):
        L,H = 0.0, 1.0
        for s in x_input:
            L,H = self.shrink_range(L,H,s)
        return L,H

    def encode_block(self, x_input):
        # STEP1
        L,H = self.find_interval(x_input)

        # STEP-II
        ...
```

--- 
# Arithmetic coding example-2

```
P = {A: 0.2, B: 0.4, C: 0.4}
x_input = BAAB
```

--- 
# Arithmetic coding example:2

```
P = {A: 0.4, B: 0.4, C: 0.2}
x_input = BACA
```
```py
ENCODE: B -> [L,H) = [0.40000,0.80000)
ENCODE: A -> [L,H) = [0.40000,0.56000)
ENCODE: C -> [L,H) = [0.52800,0.56000)
ENCODE: A -> [L,H) = [0.52800,0.54080)
```
---

# STEP-I: Find the interval [L,H)

```py
P = {A: 0.3, B: 0.5, C: 0.2}
x_input = BACB
L = [0.429, 0.444)
```

1. **Observation**: Interval size reduces as we encode more symbols

2. <span style="color:purple;"> **QUIZ-1**: What is the size of the interval (`H-L`) for the input $X_1^n$?</span>


---



# STEP-I: Find the interval [L,H)

```py
P = {A: 0.3, B: 0.5, C: 0.2}
x_input = BACB
L = [0.429, 0.444)
```

1. **Observation**: Interval size reduces as we encode more symbols

2. <span style="color:purple;"> **QUIZ-1**: What is the size of the interval (`H-L`) for the input $X_1^n$?</span>

$$
\begin{align*} 
(H - L) &= p(x_1)*p(x_2)...p(x_n) \\
        &= \prod_{i=1}^n p(x_i) \\
        & = p(x_1^n)
\end{align*}$$



---

# Arithmetic Encoding

```py
P = {A: 0.3, B: 0.5, C: 0.2}
x_input = BACB
L = [0.429, 0.444)
```

1. **STEP-I**: Find an *interval* (or a *range*) `[L,H)`
corresponding to the *entire sequence* $x_1^n$ 

2. **STEP-II**: Communicate the interval $[L,H)$ using a value $Z \in [L,H)$

For example: $Z = \frac{(L+H)}{2}$, i.e. the midpoint of the range. 
(in our example `Z = 0.4365`)

---

# Arithmetic decoding

<span style="color:purple;">**Quiz-2:**</span> If the decoder knows:
- `n=4` 
- `P = {A: 0.3, B: 0.5, C: 0.2}`
- `Z = 0.4365` 

<span style="color:purple;">How can it decode the entire input sequence? $X_1^n$.</span>

--- 
# Arithmetic decoding - example

![h:550](https://user-images.githubusercontent.com/1708665/195691372-900a32af-7f78-4e3b-8a83-a69e83cd7163.jpg)

---
# Arithmetic decoding - example
![h:550](https://user-images.githubusercontent.com/1708665/195691369-7eba6c98-c411-4599-9c59-dfb0934d8859.jpg)

---
# Arithmetic decoding - example
![h:550](https://user-images.githubusercontent.com/1708665/195691365-719c0536-a812-48f4-a836-d352fb837f0d.jpg)

---
# Arithmetic decoding - example
![h:550](https://user-images.githubusercontent.com/1708665/195691361-392b8f54-73f6-4951-bfdc-22d6a018d1a6.jpg)

---
# Arithmetic decoding - example
![h:550](https://user-images.githubusercontent.com/1708665/195691359-5fbf1d74-09ed-43ca-a81a-0c2fc52f9d65.jpg)

---
# Arithmetic decoding - example
![h:550](https://user-images.githubusercontent.com/1708665/195691354-1f75e589-1493-4276-87bb-b7bb133a6eae.jpg)

---
# Arithmetic decoding

```py
Z = 0.4365
ENCODE: B -> [L,H) = [0.30000,0.80000)
ENCODE: A -> [L,H) = [0.30000,0.45000)
ENCODE: C -> [L,H) = [0.42000,0.45000)
ENCODE: B -> [L,H) = [0.42900,0.44400)
------------------------------
DECODE: B -> [L,H) = [0.30000,0.80000)
DECODE: A -> [L,H) = [0.30000,0.45000)
DECODE: C -> [L,H) = [0.42000,0.45000)
DECODE: B -> [L,H) = [0.42900,0.44400)
```

---
# Arithmetic decoding-pseudocode

```py
class ArithmeticDecoder:
    ...
    def shrink_range(self, L, H, s):
        ...
        return new_L, new_H

    def decode_symbol(self, L, H, Z):
        rng = H - L
        search_list = L + (self.P.cumul * rng)
        symbol_ind = np.searchsorted(search_list, Z)
        return self.P.alphabet[symbol_ind]

    def decode_block(self, Z, n):
        L,H = 0.0, 1.0
        for _ in range(n): #main decoding loop
            s = self.decode_symbol(L, H, Z)
            L,H = self.shrink_range(L,H,s)
```

--- 

# Arithmetic decoding: 
<span style="color:purple;">**Quiz-2:**</span> If the decoder knows:
- `n=4` 
- `P = {A: 0.3, B: 0.5, C: 0.2}`
- `Z = 0.4365` 

**Ans ->** The decoder creates intervals same as the ones encoder creates, and find which symbol corresponds to the interval in which `Z` lies. 

---

# Arithmetic encoding

1. **STEP-I**: Find an *interval* (or a *range*) `[L,H)`
corresponding to the *entire sequence* $x_1^n$ (`[0.429, 0.444]`)

2. **STEP-II**: Find the midpoint of the interval $[L,H)$, $Z = \frac{(L+H)}{2}$.  (`Z =0.4365`) 

3. **STEP-III:** Write the binary expansion of $Z$ to the bitstream -> 
eg: `Z = 0.4365 = b0.01101111101...` 
then the final <span style="color:red;"> `encoded_bitstream = 01101111101...` </span>


---

# Arithmetic encoding

1. **STEP-I**: Find an *interval* (or a *range*) `[L,H)`
corresponding to the *entire sequence* $x_1^n$ (`[0.429, 0.444]`)

2. **STEP-II**: Find the midpoint of the interval $[L,H)$, $Z = \frac{(L+H)}{2}$.  (`Z =0.4365`) 

3. **STEP-III:** Write the binary expansion of $Z$ to the bitstream -> 
eg: `Z = 0.4365 = b0.01101111101...` 
then the final <span style="color:red;"> `encoded_bitstream = 01101111101...` </span>

<span style="color:purple;"> **Quiz-4:** $Z$'s binary representation can be long, can also have infinite bits. 
How can we fix this? </span>

---
# Communicating the interval `[L,H)`

![h:550](https://user-images.githubusercontent.com/1708665/195694955-dac0a2cf-7e79-4c0d-8ad5-fad43fb258b2.jpg)

---
# Communicating the interval `[L,H)`

![h:550](https://user-images.githubusercontent.com/1708665/195694952-5a4772a0-7e17-4b67-a1c8-17526c9a1d66.jpg)


---
# Arithmetic coding example:

1. **STEP-I**: Find an *interval* (or a *range*) $[L,H)$
corresponding to the *entire sequence* $x_1^n$ (`[0.429, 0.444]`)

2. **STEP-II**: Find the midpoint of the interval $[L,H)$, $Z = \frac{(L+H)}{2}$.  (`Z =0.4365`) 

3. **STEP-III:** Truncate $Z$ to $k$ bits ($\hat{Z}$)
e.g: 
```
L,H = 0.429, 0.444
Z = 0.4365 = b0.01101111101...
Z_hat = b0.011011111 ~ 0.4296
```
Final Encoding = <span style="color:red;"> `encoded_bitstream = 011011111` </span> 

---
# Communicating the interval `[L,H)`

1. **Cond 1:** Truncate $Z$ to $\hat{Z}$ with $k$ bits, so that $ \hat{Z} \in [L,H)$

2. **Cond 2:** If $\hat{Z}$ has binary representation: `Z_hat = b0.011011111` for example, then we also need, any extension of it $Z_{ext} \in [L, H)$. 

For eg: 

```
Z_hat = b0.011011111
Z_ext = b0.01101111111011110101..
```

<span style="color:purple;">**Quiz-5:** Why so?</span>


---
# Communicating the interval `[L,H)`

1. **Cond 1:** Truncate $Z$ to $\hat{Z}$ with $k$ bits, so that $ \hat{Z} \in [L,H)$

2. **Cond 2:** If $\hat{Z}$ has binary representation: `Z_hat = b0.011011111` for example, then we also need, any extension of it $Z_{ext} \in [L, H)$. 

The two conditions can be written together as: 
$$ [\hat{Z}, \hat{Z} + 2^{-k}) \in [L,H)$$

---
# Communicating the interval `[L,H)`

Given the interval $[L,H)$, and $Z = \frac{(L+H)}{2}$, truncate $Z$ to $k$ bits so that: 

$$ [\hat{Z}, \hat{Z} + 2^{-k}) \in [L,H)$$

<span style="color:purple;"> **Quiz-6**: What should the $k$ be? </span> 

```
## Examples 
# Ex1: L=0.429, H=0.444, Z = 0.4365.. how many digits we can truncate from Z?

## Ex2: L=0.552398714,H=0.5524123
Z = 0.5524058..., how many digits we can truncate Z from? 
```

---

# Communicating the interval `[L,H)`

Given the interval $[L,H)$, and $Z = \frac{(L+H)}{2}$, truncate $Z$ to $k$ bits so that: 

$$ [\hat{Z}, \hat{Z} + 2^{-k}) \in [L,H)$$

<span style="color:purple;"> **Quiz-6**: What should the $k$ be? </span> 

- Shorter the interval, $|H-L|$, the more the number of bits we need to use. 


---

# Communicating the interval `[L,H)`

Given the interval $[L,H)$, and $Z = \frac{(L+H)}{2}$, truncate $Z$ to $k$ bits so that: 

$$ [\hat{Z}, \hat{Z} + 2^{-k}) \in [L,H)$$

<span style="color:purple;"> **Quiz-6**: What should the $k$ be? </span> 

- Shorter the interval, $|H-L|$, the more the number of bits we need to use. 
- the numbers of bits we need to truncate $Z$ by is: 

$$ k \leq \left\lceil {log_2 \frac{1}{(H-L)}} \right \rceil + 1 $$


--- 
# Arithmetic Encoding pseudo-code

```py
class ArithmeticEncoder:
    def shrink_range(self, L, H, s):
        ...
    def find_interval(self, x_input):
        L,H = 0.0, 1.0
        for s in x_input:
            L,H = self.shrink_range(L,H,s)
        return L,H

    def encode_block(self, x_input):
        # STEP-1 find interval
        L,H = self.find_interval(x_input)

        # STEP-II,III communicate interval
        Z = (L+H)/2 
        num_bits = ceil(log2((H-L))) + 1
        _, code = float_to_bitarray(Z, num_bits)
        return code
```
---
# Arithmetic decoding-pseudocode

```py
class ArithmeticDecoder:
    ...
    def shrink_range(self, L, H, s):
        ...

    def decode_symbol(self, L, H, Z):
        ...

    def decode_block(self, code, n):
        Z = bitarray_to_float(code)

        # start decoding
        L,H = 0.0, 1.0
        for _ in range(n): #main decoding loop
            s = self.decode_symbol(L, H, Z)
            L,H = self.shrink_range(L,H,s)

        # add code to remove additional bits read
```

---
# Arithmetic coding compression performance: 

- Size of interval $H-L = \log_2{1}{p(x_1^n)}$
- $k \leq \log_2 {1}{H-L} + 2$

<span style="color:purple;"> **Quiz-7**: What is the codelength for arithmetic coding? </span>


---
# Arithmetic coding compression performance: 

- Size of interval $H-L = \log_2{1}{p(x_1^n)}$
- $k \leq \log_2 {1}{H-L} + 2$

<span style="color:purple;"> **Quiz-7**: What is the codelength for arithmetic coding? </span>

$$ codelen = k \leq \log_2 \frac{1}{p(x_1^n)} + 2 $$


---
# Arithmetic coding compression performance: 

- Size of interval $H-L = \log_2{1}{p(x_1^n)}$
- $k \leq \log_2 {1}{H-L} + 2$

<span style="color:purple;"> **Quiz-7**: What is the codelength for arithmetic coding? </span>

$$ codelen = k \leq \log_2 \frac{1}{p(x_1^n)} + 2 $$

Thus, Arithmetic coding is within `2` bits of the optimal on the *ENTIRE* sequence! 

---
# Arithmetic coding compression performance: 


**THEOREM:** Arithmetic coding achieves average codelength:

$$ H(X) \leq \frac{\mathbb{E}[l(X_1^n)]}{B} \leq H(X) + \frac{2}{n}$$

---
# Arithmetic coding Summary

1. Given *any* distribution $P$, achieves *optimal* compression. Thus, Arithmetic coding allows for `model` and `entropy coding` separation. 

2. Encoding, decoding is linear time and quite efficient! 

3. As we are not saving a large codebook, memory requirements are not very high

4. Can work very well with changing distribution $P$. 
i.e. Adaptive algorithms work well with Arithmetic coding


---

# Arithmetic coding in practice
<span style="color:purple;"> **Quiz-8**: Whar are the practical issues with our Arithmetic encoding/decoding?</span>

Hint -> 
```py
prob = ProbabilityDist({A: 0.3, B: 0.5, C: 0.2})
x_input = BACBBCCBA

# find interval corresp to BACB
ENCODE: B -> [L,H) = [0.30000,0.80000)
ENCODE: A -> [L,H) = [0.30000,0.45000)
ENCODE: C -> [L,H) = [0.42000,0.45000)
ENCODE: B -> [L,H) = [0.42900,0.44400)
ENCODE: C -> [L,H) = [0.44100,0.44400)
ENCODE: C -> [L,H) = [0.44340,0.44400)
ENCODE: B -> [L,H) = [0.44358,0.44388)
ENCODE: A -> [L,H) = [0.44358,0.44367)
```

---

# Arithmetic coding in practice
<span style="color:purple;"> **Quiz-8**: Whar are the practical issues with our Arithmetic encoding/decoding?</span>

**Ans ->** The interval becomes too small very quickly
and we run out of bits to represent `L,H`. 
```py
prob = ProbabilityDist({A: 0.3, B: 0.5, C: 0.2})
x_input = BACBBCCBA

# find interval corresp to BACB
ENCODE: B -> [L,H) = [0.30000,0.80000)
ENCODE: A -> [L,H) = [0.30000,0.45000)
ENCODE: C -> [L,H) = [0.42000,0.45000)
ENCODE: B -> [L,H) = [0.42900,0.44400)
...
```

---

# Arithmetic coding in practice

<span style="color:purple;"> **Quiz-9**: What can we do to avoid the interval `[L,H)` from getting too small?</span>

Hint -> 
```py
L = 0.429 = b0.0110110...
H = 0.444 = b0.01110001...
```


---

# Arithmetic coding in practice

<span style="color:purple;"> **Quiz-9**: What can we do to avoid the interval `[L,H)` from getting too small?</span>

**Idea:** If `L`, `H` start with `011` then any value lying inside the interval `[L,H)` also will start with `011`! 
```py
L = 0.429 = b0.0110110...
H = 0.444 = b0.01110001...
Z_hat = b0.011...
```

---

# Arithmetic coding in practice 
<span style="color:purple;"> **Quiz-9**: What can we do to avoid the interval `[L,H)` from getting too small?</span>

**Idea:** If `L`, `H` start with `011` then any value lying inside the interval `[L,H)` also will start with `011`! 

**Rescale:**: Already output bits `011`, and rescale `L,H`
```py
L = 0.429 = b0.0110110...
H = 0.444 = b0.01110001...

Rescaled: L=0.8580, H=0.8880, bitarray='0'
Rescaled: L=0.7160, H=0.7760, bitarray='01'
Rescaled: L=0.4320, H=0.5520, bitarray='011'
ENCODE: B -> [L,H) = [0.42900,0.44400)
```


--- 
# Arithmetic Encoding with rescaling

```py
class ArithmeticEncoder:
    def shrink_range(self, L, H, s):
        ...
    def rescale_range(self, L, H):
        ...
    def find_interval(self, x_input):
        L,H, bitarray = 0.0, 1.0, Bitarray("")
        for s in x_input:
            L,H = self.shrink_range(L,H,s)
            L,H, bits = self.rescale_range(L,H)
            bitarray += bits
        return L,H, bitarray
```

---
# Arithmetic Encoding with rescaling

```py
def rescale_range(self, L, H):
    bitarray = ""
    while (L >= 0.5) or (H < 0.5):
        if (L < 0.5) and (H < 0.5):
            bitarray+= "0"
            L,H = L*2, H*2
        elif ((L >= 0.5) and (H >= 0.5)):
            bitarray += "1"
            L,H = (L - 0.5)*2, (H - 0.5)*2    
    return L, H, bitarray
```
---
# Arithmetic Encoding with rescaling

**Rescale:**: Already output bits which are same between $L,H$ (`011`), and rescale $L,H$. 
```py
L = 0.429 = b0.0110110...
H = 0.444 = b0.01110001...

Rescaled: L=0.8580=b0.11011..., H=0.8880, bitarray='0'
Rescaled: L=0.7160=b0.1011... , H=0.7760, bitarray='01'
Rescaled: L=0.4320=b0.011...  , H=0.5520, bitarray='011'
ENCODE: B -> [L,H) = [0.42900,0.44400)
```

<span style="color:purple;"> **Quiz-10**: There is one case in which our algorithm can still have L,H being really close. What is that?</span>



---
# Arithmetic Encoding with rescaling

Lots of Variants of Arithmetic coding; mainly come from how they implement the rescaling. 

1. **Arithmetic coding:** Bit-based rescaling -> keeping a count of the mid-ranges etc. 

2. **Range Coding** Byte (8-bit based rescaling), word-based rescaling -> 

3. Variants on the above based on how compressors handle the edge case ($L$ starts with `b0.0` and $H$ starts with `b0.1..`, but the interval is very small)

---
# Arithmetic/Range coders in practice


---
# What are the problems with Arithmetic coding

Although Arithmetic coding algorithms are very fast, they are not fast enough!

