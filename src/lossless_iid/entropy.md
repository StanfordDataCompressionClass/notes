# Entropy & Neg-log likelihood thumb rule

In this lecture, our goal is to understand where the thumb rule  $l_{optimal}(symbol) \approx \log_2 \frac{1}{p(symbol)}$ for prefix-free code-lengths came from. To understand this, we are going to take a brief detour and get a sneak-peek into the area of Information Theory. 

Information theory is the *science of information*, and is an area which tries to understand the fundamental nature of what is *information*, how do we store it, how do we communicate it etc. The whole field (along with some of the most fundamental results in the field) was laid down in a single seminal paper [A Mathematical theory of Communication](https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf) by Claude Shannon in 1948. 

Rather than talking about information in philosophical terms, we are going to understand information theory mathematically. We are going to first define some quantities and properties central to information theory. As we will see, understanding the mathematical properties of these quantities is what will lead us to the *intuition* and understanding of information theory. 

## Entropy
So, lets get started: the first property, or *information-theoretic measure* we are going to define is the *Entropy*. The entropy, although a term overloaded with a lot of meaning in the (math/science) pop culture, has a precise definition in information theory. 

~~~admonish note title="Entropy"
Let $X$ be a random variable, with alphabet $\{1, 2, \ldots, k\}$ and discrete probability distribution $P = \{ p_1, p_2, \ldots, p_k\}$. i.e. one can imagine the samples generate by the random variable $X$ to be independent and identically distributed as per distribution $P$. 

Then the entropy $H(X)$ of the random variable is defined as:

$$ H(X) = \sum_{i=1}^k p_i \log_2 \frac{1}{p_i} $$
~~~

Some comments: 
- As you can see, $H(X)$ is a simple function of the distribution $P$. So, some works also denote $H(X)$ as a $H(P)$. We will use both of these notations interchangeably; but note that that the $H(X)$ notation is more precise and will be more helpful when we deal with more complex distributions (like Markov distributions). 
- Another way to look at $H(X)$ is as expectation over the negative-log likelihood function $NLL(X) = \log_2 \frac{1}{P(X)}$
$$
\begin{aligned}
H(X) &= \mathbb{E}_P\left[ NLL(X) \right] \\
H(X) &= \mathbb{E}_P\left[ \log_2 \frac{1}{P(X)} \right] \\
     &= \sum_{i=1}^k p_i \log_2 \frac{1}{p_i} \\
\end{aligned}
$$
Although, this feels a bit weird, the neg-log likelihood function is a completely legitimate function of the random variable $X$. All the different viewpoints are useful in different scenarios

## Properties of Entropy
Now that we have defined *Entropy*, lets take a look at some properties of $H(X)$. To prove most of these properties, we are going to need a simple but a very profound property of convex functions: the *Jensen's inequality*. 

### Jensen's inequality
~~~admonish note title="Jensen's inequality"
Let $f(x)$ be a convex function. Let $X$ be a random variable on $\{1, 2, \ldots, k\}$ with discrete probability distribution $P = \{p_1, p_2, \ldots, p_k\}$ be some probability distribution. Then:
$$
\mathbb{E} [f(X)] \geq f(\mathbb{E}[X])
$$

Similarly if $g(X)$ is a concave function, then the reverse inequality is true: 
$$
\mathbb{E} [g(X)] \leq g(\mathbb{E}[X])
$$

In both cases, equality holds iff (if and only if) $x_1 = x_2 = \ldots = x_k$
~~~
The Jensen's inequality can be also understood succinctly using the figure below. for clarity lets assume that $X$ takes values in $\{x_1, x_2\}$. 

![Jensen's inequality](images/jensen.svg)

- If one looks at the LHS: $ \mathbb{E} [f(X)] = p_1 f(x_1) + p_2f(x_2) $, then it can be understood as simply a weighted average with weights $p_1, p_2$ over the points $f(x_1), f(x_2)$. This weighted average corresponds to a point somewhere on the segment joining points $f(x_1)$ and $f(x_2)$
- If one looks at the RHS: $f(\mathbb{E}[X]) = f(p_1x_1 + p_2x_2)$. Thus, the RHS corresponds to the value of the convex function $f$ at the weighted averaged point $p_1x_1 + p_2x_2$. It is clear from the figure that because of the "bowl-shaped* nature of $f$, $\mathbb{E} [f(X)] \geq f(\mathbb{E}[X])$. 
- It is also clear from the figure why the equality condition holds true iff $x_1 = x_2$

We won't prove the Jensen's inequality here, but it is useful to understand and visualize the inequality. For a rigorous proof look at [the wiki article on Jensen's Inequality](https://en.wikipedia.org/wiki/Jensen%27s_inequality). In the simple discrete case, it can be proved using induction.

Okay, we are all set to look at some properties of *Entropy*. As you can guess, in our case, we will be specifically using Jensen's inequality on the concave function $\log_2(.)$.

#### **1. Non-negativity of Entropy: $H(X) \geq 0$**:  
It is easy to see that $H(X) \geq 0$. The reason is that: $\log_2 \frac{1}{p_i} \geq 0$, as $0 \leq p_i \leq 1$
$$
\begin{aligned}
H(X) &= \sum_{i=1}^k p_i \log_2 \frac{1}{p_i} \\
     &\geq  \sum_{i=1}^k p_i \times 0 \\
     &= 0
\end{aligned}
$$

#### **2. Upper bound on Entropy: $H(X) \leq log_2 k$**: 
We know that $H(X) \geq 0$. We can also compute an upper bound on $H(X)$: 
$$
\begin{aligned}
H(X) &= \mathbb{E}_P \log_2 \frac{1}{p(X)} \\
     &\leq \log_2 \mathbb{E}_P \frac{1}{p(X)} \\
     &= \log_2 \sum_{i=1}^k p_i * \frac{1}{p_i} \\
     &= \log_2 k
\end{aligned}
$$
The first step of the proof follows from Jensen's inequality for the Concave function $\log_2(.)$. Also, note that the equality $H(X) = \log_2 k$ is possible only if: $$ \log_2 \frac{1}{p_1} = \log_2 \frac{1}{p_2} = \ldots = \log_2 \frac{1}{p_k}$$
which implies that $$p_1=p_2=\ldots=p_k \iff H(X) = \log_2 k $$

#### **3. Joint entropy of independent random variables**:  
If we have random variables $X_1, X_2$, we can define their entropy simply as the entropy of the pair $(X_1,X_2)$. The joint entropy is denoted 
as $H(X_1, X_2)$ and can be expanded as 
$$H(X_1, X_2) = \sum_{x_1, x_2} P(X_1=x_1, X_2=x_2) \log_2 \frac{1}{P(X_1=x_1, X_2=x_2)}$$

Now if $X_1$ and $X_2$ are independent random variables, then we have
$$
\begin{align}
H(X_1, X_2) &= \sum_{x_1, x_2} P(X_1=x_1, X_2=x_2) \log_2 \frac{1}{P(X_1=x_1, X_2=x_2)}\\
&= \sum_{x_1, x_2} P(X_1=x_1) P(X_2=x_2) \log_2 \frac{1}{P(X_1=x_1) P(X_2=x_2)}\\
&= \sum_{x_1, x_2} P(X_1=x_1) P(X_2=x_2) \log_2 \frac{1}{P(X_1=x_1)} + \sum_{x_1, x_2} P(X_1=x_1) P(X_2=x_2) \log_2 \frac{1}{P(X_2=x_2)}\\
&= \sum_{x_1} P(X_1=x_1)  \log_2 \frac{1}{P(X_1=x_1)} \sum_{x_2}P(X_2=x_2) + \sum_{x_2}P(X_2=x_2) \log_2 \frac{1}{P(X_2=x_2)}\sum_{x_1}P(X_1=x_1) \\
&= \sum_{x_1} P(X_1=x_1)  \log_2 \frac{1}{P(X_1=x_1)}+ \sum_{x_2}P(X_2=x_2) \log_2 \frac{1}{P(X_2=x_2)}\\
&= H(X_1) + H(X_2)\\
\end{align}
$$

Thus, the joint entropy of independent random variables is simply the sum of their individual entropies. This generalizes to $n$ independent random variables using induction. In particular, if the $n$-tuple $X^n = (X_1,\dots,X_n)$ consists of i.i.d. random variables distributed like $X$, then $H(X^n) = nH(X)$. The general case of dependent random variables and their joint entropy is studied in a later chapter. 

#### **4. Entropy as a lower bound: $ H(X) \leq \mathbb{E}_P \log_2 \frac{1}{q(X)} $ for any distribution $q(X)$:**  

Let us spell out this property in a bit more detail. Given any probability distribution $q(X)$, the following is true: $$  H(X) \leq \mathbb{E}_P \log_2 \frac{1}{q(X)} $$ the equality holds iff $q(X) = p(X)$, i.e. we want to show that 
$$
\begin{aligned}
0 &\leq \mathbb{E}_P \log_2 \frac{1}{q(X)} - H(X)\\
  &= \mathbb{E}_P \log_2 \frac{1}{q(X)} - \mathbb{E}_P \log_2 \frac{1}{p(X)}\\
  &= \mathbb{E}_P \log_2 \frac{p(X)}{q(X)}
\end{aligned}
$$
Okay, so proving the lower bound property is equivalent to showing that $\mathbb{E}_P \log_2 \frac{p(X)}{q(X)} \geq 0$. Any idea how can we do this? 

The idea is again to use *Jensen's inequality*: 

$$
\begin{aligned}
\mathbb{E}_P \log_2 \frac{p(X)}{q(X)} &= - \mathbb{E}_P \log_2 \frac{q(X)}{p(X)} \\
 &\geq - \log_2 \mathbb{E}_P \frac{q(X)}{p(X)} \\
 &\geq - \log_2 \sum_{i=1}^k p_i * \frac{q_i}{p_i} \\
 &\geq - \log_2 \sum_{i=1}^k q_i \\
 &\geq - \log_2 1 \\
 &= 0 
\end{aligned}
$$

Note that we used *Jensen's inequality* in step (2), but the sign of the inequality is reversed because of the negation. 
We also know that equality holds iff 
$$
\frac{q_1}{p_1} = \frac{q_2}{p_2} = \ldots  = \frac{q_k}{p_k}
$$
i.e. if $q(X) = p(X)$!

Alright! This proves our property as
$$ \mathbb{E}_P \log_2 \frac{q(X)}{p(X)} \geq 0 \rightarrow H(X) \leq \mathbb{E}_P \log_2 \frac{1}{q(X)} $$

Let's pause a bit and think about what this property is telling: 
-  Essentially we are telling that $H(X)$ is the solution to the minimization problem: 
$$ H(X) = \min_{q(X)} \mathbb{E}_P \log_2 \frac{1}{q(X)}  $$ 
We will see that this characterization is often quite useful. 
- Another corollary we proved is that $$ \mathbb{E}_P \log_2 \frac{q(X)}{p(X)} = \sum_{i=1}^k p_i \log_2 \frac{p_i}{q_i} \geq 0 $$
for any two distributions $p, q$. The quantity on the right is also known as the *KL-Divergence* $D_{KL}(p||q)$ between the two distributions. 


~~~admonish example title="KL-Divergence"
Let $P = \{ p_1, p_2, \ldots, p_k\}$ and $Q = \{ q_1, q_2, \ldots, q_k\}$ be two given probability distributions. Then the KL-Divergence is defined as:

$$ D_{KL}(p||q) = \sum_{i=k} p_i \log_2 \frac{p_i}{q_i} $$

The following property holds for $D_{KL}(p||q)$:

$$ D_{KL}(p||q) \geq 0$$ 
 
Equality holds iff $p=q$
~~~

The KL-Divergence is a very important information theoretic quantity, which we will revisit!

---
Okay, now that we have defined and got a bit familiar with some of the information theoretic measures, we are all set to understand where the thumb rule  $l_{optimal}(symbol) \approx \log_2 \frac{1}{p(symbol)}$ comes from!


To do so, let's try to answer the question: 

~~~admonish question title="Question: Optimal prefix-free code"

Given a probability distribution $p_1, p_2, \ldots, p_k$,

1. What is the optimal prefix-free code for this distribution? 
2. What is the best compression it can achieve?
~~~

## Optimal prefix-free codes

The question seems quite daunting! How can we even go about approaching this one? The space of all prefix-free codes is quite large, and not very structured. 

Luckily, based on the converse of Kraft's inequality, we know that the space of all prefix-free codes can be characterized by the inequality: 

$$ \sum_{i=1}^k 2^{-l_i} \leq 1$$ 
where $l_i$ represent the code-lengths (i.e the depths of the nodes in the prefix-free tree)


Thus, the problem of finding the *optimal prefix-free code* given a probability distribution $p_1, p_2, \ldots, p_k$ can be formulated as a concise optimization problem.

~~~admonish note title="Optimal prefix-free code"
The problem of finding *optimal prefix-free code* given a probability distribution $p_1, p_2, \ldots, p_k$ can be formulated as: 

Given probabilities $p_1, p_2, \ldots, p_k$, solve for code-lengths $l_i \in \mathbb{N}$, such that: 
$$ \begin{aligned}
\text{minimize   } &\sum_{i=1}^k p_i l_i \\
\text{under the constraint } &\sum_{i=1}^k 2^{-l_i} \leq 1
\end{aligned} $$
~~~

Quite elegant! We have disassociated the problem of finding optimal prefix-free codes from unclear search spaces over trees and so on. Instead, we now just have this concrete optimization problem. Unfortunately we have integers $l_i$ to optimize over; and integer optimization problems might not be a feasible problem in general. In this case however, we can indeed solve this problem! We will look at a solution in the next lecture. 

For this lecture, our goal is to see what best average compression performance we can achieve, i.e what is the solution (or a lower bound) to the minimization objective $\sum_{i=1}^k p_i l_i = \mathbb{E}_P [L]$


### Lower bounding the average codelength

Okay, lets try to see how we can obtain a lower bound for $\sum_{i=1}^k p_i l_i$, given the constraint that $\sum_{i=1}^k 2^{-l_i} \leq 1$. 

Let's start by adding a *dummy* length $l_{k+1}$, so that: 
$$ \sum_{i=1}^{k+1} 2^{-l_i} = 1$$ 
The benefit of this formulation is that we can now imagine $2^{-l_i} = q_i$ as probability values, and use the plethora of properties we proved earlier! Note that $l_{k+1}$ might not be an integer, but that is okay.

Let's also define $p_{k+1} = 0$, so that the new objective is equal to the average codelength. 

$$ \mathbb{E}_P [L] = \sum_{i=1}^k p_i l_i = \sum_{i=1}^{k+1} p_i l_i $$

Okay, now that we have the setup ready, let us try to analyze the average codelength: 


$$
\begin{aligned}
\sum_{i=1}^{k+1} p_i l_i   &= \sum_{i=1}^{k+1} p_i \log_2  2^{l_i}\\

&= \sum_{i=1}^{k+1} p_i \log_2 \frac{1}{2^{-l_i}} \\ 
&= \sum_{i=1}^{k+1} p_i \log_2 \frac{1}{q_i} \\ 
\end{aligned}
$$

All we have done until now is some basic math yoga, but the outcome is that we have transformed the objective $\sum_{i=1}^{k+1} p_i l_i$ into a form more amenable for our purpose. Do you now see the lower bound? 

Using the **property 3** of entropy for distribution $P$ and $Q$ proved above, we can now show that: 

$$
\begin{aligned}
\sum_{i=1}^{k+1} p_i l_i  &= \sum_{i=1}^{k+1} p_i \log_2 \frac{1}{2^{-l_i}} \\ 
&= \sum_{i=1}^{k+1} p_i \log_2 \frac{1}{q_i} \\ 
&\geq \sum_{i=1}^{k+1} p_i \log_2 \frac{1}{p_i}  \\
&=  \sum_{i=1}^{k} p_i \log_2 \frac{1}{p_i}  \\
&= H(X)
\end{aligned}
$$

**Thus, the lower bound on average codelength of any prefix-free code is the Entropy $H(X)$!** It is also easy to see that the equality holds if and only if: 
$p_i = q_i = 2^{-l_i}$ for all $i \in \{1, 2, \ldots, k\}$. 

To summarize the important theorem:

~~~admonish example title="Theorem-3: Entropy as a lower bound on avg. codelength"
Given a distribution $p_1, p_2, ..., p_k$ for data. Any prefix-free code with code-lengths $l_1, l_2, \ldots, l_k$ will have average codelength lower bounded by the entropy $H(X)$ of the source distribution $P$:

$$
\begin{aligned}
\sum_{i=1}^{k} p_i l_i  
&\geq  \sum_{i=1}^{k} p_i \log_2 \frac{1}{p_i}  \\
&= H(X)
\end{aligned}
$$

The equality holds if and only if: 
$p_i = 2^{-l_i}$ for all $i \in \{1, 2, \ldots, k\}$, i.e:

$$ l_i = \log_2 \frac{1}{p_i} $$
~~~

Some observations/comments: 
#### **1. Thumb-rule justification**
Notice that the equality condition tells us that optimal compression can be achieved by the prefix-free code iff: 

$$ l_i = \log_2 \frac{1}{p_i} $$

and, this is the justification for the thumb rule $l_{optimal}(symbol) \approx \log_2 \frac{1}{p(symbol)}$, we discussed in the previous lecture and used for construction of Shannon code. 

#### **2. Shannon code performance**
Another point to note is that, we can never achieve avg codelength equal to entropy $H(X)$, unless $p_i = 2^{-l_i}$, i.e. all the probabilities $p_i$ are powers of $2$. This can be quite unlikely in real life, which is a bit of a bummer. 

The positive news is that we can in fact get quite close to $H(X)$. 

Let's analyze the performance of Shannon code. We know that Shannon code has code-lengths $l_i = \left\lceil \log_2 \frac{1}{p_i} \right\rceil$, thus the average codelength is: 

$$
\begin{aligned}
\sum_{i=1}^{k} p_i l_i  
&\leq  \sum_{i=1}^{k} p_i  \left\lceil \log_2 \frac{1}{p_i} \right\rceil \\
&\leq \sum_{i=1}^{k} p_i  ( \log_2 \frac{1}{p_i} + 1 ) \\
&= \sum_{i=1}^{k} p_i  \log_2 \frac{1}{p_i} + 1 \\
&= H(X) + 1
\end{aligned}
$$

Thus, Shannon code guarantees that we can always achieve average code-lengths within $1$ bit of the optimal. This is quite promising! 

Essentially, unless the entropy $H(X)$ is very low, we are not missing much by using Shannon codes. 

#### **3. Coding in blocks**
As discussed above Shannon codes only guarantee performance up to 1 bit of entropy, and this gap is too much in some scenarios, especially with highly compressible data. In such cases, one common strategy is to code in blocks. This simply means we can treat an input $n$-tuple $X^n = (X_1,\dots,X_n)$ as a symbol in a bigger alphabet, and apply Shannon code to this alphabet. So we split the input stream into blocks of size $n$ symbols, encode each block and concatenate the results. Here again, Shannon codes get us to within 1 bit of entropy and hence we have (denoting the expected code length by $\bar{l}$):
$$\bar{l}(X^n) \leq H(X^n) + 1$$

Using the properties of joint entropy for i.i.d. random variables, and dividing by $n$ we get
$$\frac{1}{n}\bar{l}(X^n) \leq H(X) + \frac{1}{n}$$
which means coding in blocks of $n$ brings us within $\frac{1}{n}$ bits of entropy. This means we can get arbitrary close to entropy using block coding and hence entropy is not only the lower bound, but it is also achievable. In the next chapter, we will look at some examples of this phenomenon where we'll see how the average code length improves as we code with bigger and bigger blocks. But there is no free lunch with block coding! Note that a naive implementation would lead to a complexity exponential in $n$ as if the alphabet size is $k$ per-symbol, with block-coding the number of symbols in the alphabet an encoder needs to handle expands to a size of $k^n$. Moreover, we now have a decoding delay of $n$ since we cannot just go and decode a single symbol until we get the entire block. In later chapters, we will look at clever implementations that successfully get the benefits of block coding while reducing this penalty.

#### **4. Entropy as a lower bound for uniquely decodable codes**

We showed that $H(X)$ lower bounds the average code-lengths for prefix-free codes. But, what about general symbol codes which are uniquely decodable (or *lossless*)? 

We saw that even for general uniquely decodable symbol codes, the Kraft inequality holds true. i.e: 
$$ \sum_{i=1}^k 2^{-l_i} \leq 1$$
Notice that this is precisely the only property we use for proving the lower bound on $H(X)$, and so, entropy is in fact a lower bound on average code-lengths for general uniquely decodable codes. 

#### **5. Mismatched coding and KL-divergence**
We saw above that the code optimized of a source $P$ will have code lengths $l_i \approx \log_2 \frac{1}{p_i}$. This achieves expected code length close to entropy:
$$\bar{l} = \sum p_i l_i \approx \sum p_i  \log_2 \frac{1}{p_i} = H(P)$$

Now, consider a scenario where we optimize a code for source distribution $Q$ but then use it for a source with distribution $P$. In this case, the code lengths will be  $l_i \approx \log_2 \frac{1}{q_i}$ and the average code length will be 
$$
\begin{align}
\bar{l} &= \sum p_i l_i \\
&\approx \sum p_i  \log_2 \frac{1}{q_i} \\
&= \sum p_i  \log_2 \frac{1}{p_i} + \sum p_i  \log_2 \frac{p_i}{q_i} \\
&= H(P) + D(P||Q) 
\end{align}
$$
In this scenario, the optimal code length was $H(P)$ but the actual average code length exceeds it by $D(P||Q)$. Thus the KL-divergence is the penalty for mismatched coding for using the incorrect distribution for designing the code. Later in the class we will study universal codes which imply existence of distributions that can closely approximate any distribution from a large class, meaning that a single code (over a block) is able to perform well irrespective of the actual source distribution.

## Entropy beyond data compression

Given a random variable $X$ over $\{1, 2, \ldots, k\}$ with distribution $P = \{ p_1, p_2, \ldots, p_k \}$, we know that the fundamental limit on compression of the random variable $X$ using symbol codes is $H(X)$. 

$H(X)$ is sometimes also referred to as the self-information of the random variable $X$, as in a way, we are saying that the amount of information (on an average) in each instantiation of the random variable $X$ is $H(X)$ bits. This is quite natural, as we should not be able to compress an input better than the amount of information it is worth. 

The discussion, although a bit hand-wavy is quite fundamental. Due to this, we see $H(X)$ popping up at lots of other places as a fundamental limit of a problem, and not just in case of compression. 

For example, here are a few scenarios, for which the answer is related to $H(X)$. Try to solve them for fun!

**1. Simulating non-uniform random variables:** Lets say you want to simulate a random variable $X$ over $\{1, 2, \ldots k\}$ with distribution $P = \{ p_1, p_2, \ldots, p_k \}$. To simulate the random variable, you are only allowed to use fair coin tosses. In that case, what is fundamental limit on the average number of coins you would have to toss to simulate $X$? 

**2. Simulating a fair coin using a biased coin:** Lets now say you have a biased coin with probability of `H/T` to be $p, 1-p$ respectively. The goal is to use this coin to simulate a fair coin. One simple way to do this is to toss the coin twice, and associate `(H,T)` as heads, and `(T,H)` as tails. If we get `(H,H), (T,T)`, then we discard the result and toss again. Is this the optimal strategy though? Can you do better? What is the fundamental limit on the average number of biased coins you would have to toss do to obtain a fair coin?

**3. Biased binary search:** We are familiar that given a sorted array of size $k$, we can locate a query $q$ in one of the $n$ bins using $\lceil \log_2 k \rceil$ comparisons. However, a lot of times, we already have a good idea which bins the query might lie in. Can we accelerate the binary-search in this case? To be more precise, lets say you have a bias that the query will lie in each of the bins with probability $p_1, p_2, \ldots, p_k$. (usually this bias is uniform, i.e $p_i = 1/n$). In such a scenario what is the fundamental limit on the average number of comparisons you have to do to locate the query $q$?

Although all these scenarios seem very different, they are essentially related to *Entropy* $H(X)$, and use the property that the self information, the amount of bits corresponding to random variable $X$ is $H(X)$. This key intuition led to a very diverse and vibrant area of mathematics called *Information Theory*. What we saw in today's lecture is just a small glimpse into information theory, but if you are interested please take a look at the course [EE 276](https://web.stanford.edu/class/ee276/), and the resources listed there.

## Summary and next lecture
To summarize this lecture:
1. **Entropy:** We took a detour into information theory and understood some properties of entropy $H(X)$. 
2. **Entropy as a limit of compression:** We derived the properties of $H(X)$ and used them to show that $H(X)$ is the fundamental limit on the compression, i.e. the average codelength of any prefix-free code designed for compressing a given source $X$ is always lower bounded by $H(X)$. 

Although we were able to show that $H(X)$ is the fundamental limit on average codelength, and that we can always come within 1 bit of the fundamental limit using Shannon codes, it is a bit unsatisfactory as we don't know if Shannon Code is the optimal prefix code. 

In the next lecture, we are doing to discuss **Huffman Code**, which is the answer to the question: 
> Given a random variable with instances sampled i.i.d with probability distribution $P = \{p_1, p_2, \ldots, p_k\}$, what is the best prefix free code for this source?




