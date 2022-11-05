# Rate Distortion Theory

## Entropy, Conditional entropy Recap:

In case of lossless compression we saw information theoretic quantities such as entropy: $H(X)$, conditional entropy: $H(X|Y)$ etc. 

To recap:
1. **Entropy**: Let $X$ be a random variable, with alphabet $\{1, 2, \ldots, k\}$ and discrete probability distribution $P = \{ p_1, p_2, \ldots, p_k\}$. i.e. one can imagine the samples generate by the random variable $X$ to be independent and identically distributed as per distribution $P$. 

    Then the entropy $H(X)$ of the random variable is defined as:
$$ H(X) = \sum_{i=1}^k p_i \log_2 \frac{1}{p_i} $$

2. **Joint Entropy**: The joint entropy of discrete random variables $X,Y$ with distribution $P(x,y)$ is simply the entropy of the joint random variable $X,Y$. 

$$ H(X,Y) = \sum_{x,y} p(x,y) \log_2 \frac{1}{p(x,y} $$

3.  **Conditional Entropy/Relative Entropy** The conditional entropy between two discrete random variables $X,Y$ is defined as:

$$ H(Y|X) = \sum_{x,y} p(x,y) \log_2 \frac{1}{p(y|x)}$$

Note that $H(Y|X)$ has alternative definitions:

$$H(Y|X) = \sum_x P(x)H(Y|X=x)$$

i.e. it is the average of the entropies $H(Y|X=x)$





## Mutual Information

For today's discussion another important information theoretic quantity which would be interesting to us is the mutual information $I(X;Y)$

~~~admonish note title="Mutual Information"
Let $X,Y$ be two random variables with joint distribution $p(x,y)$. Then we define the mutual information between $X,Y$ as:

$$I(X;Y) = H(X) + H(Y) - H(X,Y)$$
~~~

One intuitive explanation for mututal information is that it is the difference between sum of individial entropies and the joint entropy between two random variables $X,Y$, and so in a way capture how much information is common between $X,Y$. 

Mutual information has some nice properties, which we will use: 

1. **property-1: $I(X;Y) = I(Y;X)$**: It is clear from the symmetry that mutual information between $X,Y$ is equal to mutual information between $Y,X$

$$I(X;Y) = H(X) + H(Y) - H(X,Y)$$


2. **property-2: $I(X;Y) = H(X) - H(X|Y)$**: 
This can be shown using the property of joint entropy: $H(U,V) = H(U) + H(V|U)$.
   $$
   \begin{align*}
   I(X;Y) &= H(X) + H(Y) - H(X,Y) \\
          &= H(X) + H(Y) - H(Y) - H(X|Y) \\
          &= H(X) - H(X|Y) 
   \end{align*}
   $$

3. **property-3: $I(X;Y) = D_{KL}(p(x,y)||p(x)p(y))$**: 

   $$
   \begin{align*}
   I(X;Y) &= H(X) + H(Y) - H(X,Y) \\
          &= \sum_{x} p(x) \log_2 \frac{1}{p(x)} +  \sum_{y} p(y) \log_2 \frac{1}{p(y)} + \sum_{x,y} p(x,y) \log_2 \frac{1}{p(x,y)} \\
          &= \sum_{x,y} p(x,y) \log_2 \frac{p(x)p(y)}{p(x,y)} \\
          &= D_{KL}(p(x,y)||p(x)p(y))
   \end{align*}
   $$

4. **property-4: $I(X;Y) \geq 0$**: This follows from the non-negativity of the $D_{KL}$ and the *property-3*. 


Mutual Information has a very important connection to lossy compression, but even beyond that in Information theory in general. For more information look at the [EE276 course notes on communication capacity](https://web.stanford.edu/class/ee276/files/lec/Ee276-lec9.pdf)


## Lossy Compression setup

Let us recap the lossy compression setup, and now that we are going to discuss this in detail, let us define it more concretely. 


Lets say we are given a sequence of random variables $X_1, X_2, \ldots, X_k$, Our goal is to encode this sequence $X_1^k$ to $n=\log_2(N)$ bits, using a *lossy encoder*. We also decode back the $N$ bits to reconstruction $Y_1, Y_2, \ldots, Y_k$, using a *lossy decoder*. 
```
## Encoding
X_1,X_2, ..., X_k ====> [LOSSY ENCODER] ==>  0100011...1 (n = log2(N) bits) 

## Decoding
0100011...1 (N bits) ======> [LOSSY DECODER] ==>
Y_1, Y_2, \ldots, Y_k
```


At this point, we need a few more terms to understand the performance of our *lossy compressor*:

1. **Rate $R$**: the compression rate $R$ is defined as, the average number of bits used per source symbols:

$$ R = \frac{\log_2(N)}{k} = n/k$$


2. **distortion $D$**: As the compression is not lossless, we also need to know how far the reconstruction $Y_1^k$ is from the input $X_1^k$. 
$$ \text{distortion} \rightarrow d(X_1^k, Y_1^k)$$

For simplicity lets stick to per-symbol distortion like mean square error, or hamming distortion. 
Thus, 

$$ d(X_1^k, Y_1^k) = \sum_k d(X_i, Y_i)$$

For example: 

$$ \begin{align*}
\text{hamming distortion} &\rightarrow d(x,y) = \mathbb{1}(x\neq y) \\
\text{mse distortion} &\rightarrow d(x,y) = (x-y)^2
\end{align*}
$$

3. **Average Distortion** We mainly care about the *average distortion*: 
$$ \text{expected distortion} \rightarrow \bar{D} = \mathbb{E}[d(X_1^k, Y_1^k)] $$ 
over the random variables $X_1^k, Y_1^k$. 


## Rate-distortion function

One interesting question to answer is: 
*"What is the best rate R we can achieve for distortion at max D*"? i.e. If the target distortion of our lossy compressor is $D$, what is the best we can compress the data $X_1^k$ to? We define this optimal rate to be $R(D)$, the rate-distortion function. 

Thus: 

$$ R(D) \triangleq \min_{\text{all lossy compressors s.t.} \bar{D} \leq D}  R$$

This is the precise problem Shannon solved. 
~~~admonish note title="Shannon's lossy compression theorem"
Let $X_1,X_2,\ldots$ be data generated i.i.d. Then, the optimal rate $R(D)$ for a given maximum distortion $D$ is:

$$ R(D) = \min_{\mathbb{E}d(X,Y) \leq D} I(X;Y)$$

where the expectation in the minimum is over distributions $q(x,y) = p(x)q(y|x)$, where $q(y|x)$ are any arbitrary conditional distributions.
~~~

Here are some examples:

### Example-1: $R(D)$ for bernoulli r.v: 
Let $X \sim Bern(0.5)$. and let $d(x,y) = \mathbb{1}(x\neq y)$ i.e the Hamming distortion. Then: 

$$ R(D) = \begin{cases}
      1 - h(D) & 0 \leq D \leq 0.5\\
      0 & D > 0.5
    \end{cases} 
$$

where $h(D)$ -> binary entropy function of $Bern(p) = h(p)$. 

The $R(D)$ formula is not very intuitive. But, it is clear that: 

1. $R(D)$ decreases as $D$ increases; this should be expected as the bits required should reduce if the allowed distortion $D$ is increasing.

2. $R(D) = 0$ if $D > 0.5$; This is also quite intuitve as if allowed distortion is $D > 0.5$, we can always just decode all zeros $Y_1^k = 000000...00$. For all zeros, the average distortion is $0.5$. 

### Example-2: $R(D)$ for gaussian r.v.: 

Let's take a look at another example: Let $X \sim \mathcal{N}(0,1)$, i.e. the data samples $X_1, X_2, \ldots$ are distributed as unit gaussians. Also, lets consider the distortion to be the mean square distortion: $d(x,y) = (x-y)^2$ i.e the mse distortion. Then: 

$$ R(D) = \begin{cases}
      \frac{1}{2} \log_2 \frac{1}{D} & 0 \leq D \leq 1.0\\
      0 & D > 1
    \end{cases} 
$$

Let's try to intuitively understand why this is the case: 

![Note Nov 3, 2022-1](https://user-images.githubusercontent.com/1708665/200032503-e0b7b247-4e4c-4ea2-844e-e7864cf35186.jpg)

- If $X_i$'s are i.i.d $\mathcal{N}(0,1)$, then it is clear that with high probability: 

$$ \sqrt {\sum_{i=1}^k (X_i)^2} \lesssim \sqrt{k}$$

- This mainly follows from the law of large numbers, and that the variance of $X_i$ is $1$. Thus, we can say that $X_1^k$ will lie in a k-dimensional sphere of radius $\sqrt{k}$, with high probability. 

For the remaining discussion, we can thus focus our attention on vectors $X_1^k$, only lying inside this sphere of radius $\sqrt{k}$. 

- Now, lets say we want to cover this k-dimensional sphere of radius $\sqrt{k}$ with k-dimensional spheres of radius $\sqrt{Dk}$. How many spheres do we need? 

We can approximate this number based on the volumes of the spheres: 

$$
\begin{align*}
N &\geq \frac{Volume(\sqrt{k})}{Volume(\sqrt{Dk})} \\
&= \sqrt{1/D}^k
\end{align*}
$$

Although this approximation might feel very loose, as the dimension $k$ increases, it can be shown that the number of spheres of radius $\sqrt{Dk}$ required to cover the sphere of radius $\sqrt{k}$, is indeed approximately equal to:

$$ N \approx \left(\frac{1}{D}\right)^{k/2} $$

- Note that we can use these $N$ spheres of radius $\sqrt{Dk}$, as centroids for vector quantization, as we saw in the last lecture, and we would get a distortion of at max $D$, as the squared distance between any point in the $\sqrt{k}$ sized circle is at max $D$ with one of the $N$ centroids. 

- Thus our $R(D)$, the rate for distortion at maximum $D$ is: 

$$
\begin{align*}
R(D) \leq \frac{\log_2 N}{k} \approx \frac{1}{2} \log_2 \frac{1}{D}
\end{align*}
$$

Hope this hand-wavey "proof" gives an intuition for the $R(D)$ function for unit gaussian. The proof logic can however be made more precise. 

NOTE: Similar idea proof holds for general distributions, using typical sequences balls. We won't be able to go much into the details of the Shannon's lossy compression theorem in the course unfortunately, but here are lecture notes in case you are interested: [EE376a Lossy compression notes](https://web.stanford.edu/class/ee376a/files/2017-18/lecture_12.pdf)


We can also experiment with this idea, here is the R-D curve for unit gaussian and the practical performance in $k=2$. We see that the R-D performance even with $k=2$ is quite reasonable. 

![RD](https://user-images.githubusercontent.com/1708665/200065773-94db5436-f2d4-4422-b0ee-4c7ab673731c.png)


We can also see the convergence as $k$ increases:
```py
## Rate: 1, optimal_mse: 0.25
k: 1, N: 2,   Rate: 1, mse_loss: 0.37
k: 2, N: 4,   Rate: 1, mse_loss: 0.36
k: 4, N: 16,  Rate: 1, mse_loss: 0.33
k: 8, N: 256, Rate: 1, mse_loss: 0.29
...
```


## Achieving the R(D) in general

We saw briefly how we can achieve the $R(D)$ optimal function using vector quantization for data distributed as i.i.d unit gaussians. 

The Broad idea of using vector quantization can be actually shown to asymptotically optimal for any data distribution. i.e. as the dimension of data $k$ increases, using vector quantization, we can achieve optimal $R(D)$ performance. 

Although the convergence w.r.t $k$ can be slow. In the next lecture we will see how we can accelerate this convergence. 













