---
title: Convex Optimization
layout: post
subtitle: 머신러닝과 데이터사이언스
author: kurtyoon # 작성자
# banner: https://bit.ly/32PAjtM 배너 이미지
categories:
  - Machine Learning
tags:
  - Optimization
  - Data Science
article: "최적화 알고리즘에 대해서 공부하고 정리한 내용이다." # 포스트 내용 함축
date: "2023-12-22 12:00:00 +0900"
sidebar: []
use_math: true
published: false
comments: true
---

## Convex Optimization

대표적인 최적화 알고리즘

## Optimization problem in standard form

**최적화**: 주어진 문제에 대한 best solution을 찾았음을 의미함

minimize $f_0(x)$

subject to (constraint 구속조건: 최적화를 진행함에 있어 지켜야 하는 제한조건)

$\space \space \space \space \space \space \space \space \space \space \space \space \space \space \space \space f_i(x) \le 0, \space i = 1, 2, ... , m$ → inequality constraint

$\space \space \space \space \space \space \space \space \space \space \space \space \space \space \space \space h_i(x) = 0, \space i = 1, 2, ..., p$ → equality constraint

- $x \in R^n$
- $f_0 : R^n \rightarrow R$ 은 objective 혹은 cost function ← 최적화 대상 (objective function or cost function에 대해 minimum을 찾았음을 의미)
- $f_i: R^n \rightarrow R$ 은 inequality function을 의미한다
- $h_i: R^n \rightarrow R$ 은 equality function을 의미한다

예를 들어 경로를 찾는 문제에 대해서 최적의 경로를 찾았다고 하려면 어떤 기준으로 최적의 경로라고 해야 한다.

시간을 최소화 하는 최적경로 혹은 거리를 최소화 하는 최적경로 같은 objective를 알려야 한다.

즉, xx에 대한 최적 경로임을 같이 알려줘야 한다.

또한, 시간을 최소화 하는 최적경로에 대해서 구속조건을 포함해야 한다. 구속조건으로는 대중교통 혹은 자가용 등 여러 조건이 있을 수 있다.

`최적`이라는 표현을 하려면 object를 정의해야 하며, 이에 대한 구속조건 또한 정의해야 한다.

사실 Machine Learning 자체도 최적화이다.

linear regression을 예로 들었을 때, $(x^{(1)}, y^{(1)}), (x^{(2)}, y^{(2)}), ...$ 라는 데이터가 주어졌을 때,

$\sum_{n=1}^{N}(y^{(n)} - \theta^Tx^{(n)})$을 최소화 하기 위한 $\theta$를 찾는 문제이다. 해당 최적화의 해를 찾는 방법으로 normal equation 혹은 gradient descent를 사용했다.

## Convex optimization problem

최적화 문제 중에서도 특별히 만족해야 하는 성질이 있는 문제이다. 주어진 성질을 만족할 때 해를 찾는 방법을 알고 있다.

해당 방법은 global solution이다. 이가 convect optimization을 powerful하게 만드는 이유이다.

$$
\text{minimize} \space f_0(x) \\ \text{subject} \space to \\\ f_i(x) \le 0, \space i=1, 2, ..., m  \\ a_i^Tx = b_i, \space i = 1, 2,  ... , p
$$

따라서 해당 최적화 문제가 convex인지 아닌지를 판별하는 것이 중요하고, 기술에 따라서 convex인지 아닌지가 달라지기 때문에 convex하게 만드는 것이 중요하다

어떤 최적화 문제가 convex optimization을 만족하기 위해서는 먼저 objective function $f_0(x)$이 convex function임을 만족해야 한다. 또한, inequality function $f_i(x)$이 convex function이어야 한다. 그리고 equality function은 linear 해야 한다. 해당 경우를 모두 만족할 떄, convex optimization problem이라고 한다.

convex function: $f(\lambda x + (1-\lambda) y) \le \lambda f(x) + (1-\lambda)f(y), \space 0 \le \lambda \le 1$

![image](https://i.esdrop.com/d/f/hhaNifrpr0/u4nBz0QrvQ.png)

$\lambda$가 0과 1 사이에 위치할 때, 해당 점에서의 함수값이 $f(\lambda x + (1 - \lambda) y)$가 된다. 위의 그림에서는 $x=w_1, y=w_2$이다.

$\lambda f(x) + (1-\lambda)f(y)$는 $(x, f(x))$와 $(y, f(y))$를 직선으로 연결했을 떄 $\lambda$에 의해 결정되는 점을 의미한다.

즉, 함수가 해당 직선보다 아래에 위치해야 함을 의미한다. 해당 경우에서 convex를 만족한다.

## Dual problem and KKT conditions

원래 주어지는 최적화 문제를 primal problem이라고 한다. 해당 문제는 objective function이 존재하고, inequality constraint와 equality constraint를 포함하고 있다. 여기서 우리는 해당 문제를 dual problem으로 만들어야 한다. 즉, 새로운 모양의 최적화 문제를 만듦을 의미한다.

primal problem의 해를 $p^\*$이라고 하고, dual problem의 해를 $d^\*$라고 할 때, 일반적으로는 $p^\* \ge d^\*$의 관계가 성립한다. 이때, convex problem에 한해서는 $p^\* = d^\*$하게 된다.

## Lagrangian

일반적인 최적화 problem에 대해서 objective와 constraint가 다음과 같이 주어진다고 가정하자.

minimize $f_0(x)$

subject to

$f_i(x) \le 0, \space i = 1, 2, ..., m$

$h_i(x) = 0, \space i = 1, 2, ... ,p$

1. Lagrangian이라고 하는 함수를 정의한다. $L: R^n$ x $R^m$ x $R^p$ → $R$ with dom L = $D$ x $R^m$ x $R^p$

   우리는 원래 $x$에 대한 minimize를 하려한다. 이때, 새로 정의하는 Lagrangian은 다음과 같다

   $$
   L(x, \lambda, \nu) = f_0(x) + \sum_{i=1}^m \lambda_if_i(x) + \sum_{i=1}^{p} \nu_i h_i(x)
   $$

위의 수식과 같이 objective + 계수를 붙인 inequality constraint + 계수를 붙인 equality constraint이다. 이때, 곱해지는 계수들은 Lagrange multiplier이라고 한다

$\lambda_i$의 경우 inequality constraint를 위한 Lagrange multiplier이라고 하고, $\nu_i$의 경우 equality constraint를 위한 Lagrange multiplier라고 한다.

## Lagrange dual function

1. Lagrange dual function을 정의한다 $g: R^m$ x $R^p$ → $R$. 수식은 다음과 같다

$$
g(\lambda, \nu) = min_{x \in D} L(x, \lambda, \nu) = inf_{x \in D} (f_0(x) + \sum_{i=1}^{m}\lambda_if_i(x) + \sum_{i=1}^{p}\nu_ih_i(x))
$$

1에서 구한 Lagrangian에 대해서 x에 대해 최솟값을 취한다면 $\lambda$와 $\nu$에 대한 함수가 만들어 진다.

1. Lagrange dual problem을 정의한다

maximize $g(\lambda, \nu)$

subject to $\lambda \ge 0$

constraint로 inequality Lagrange mulitplier이 주어진다.

## Karush-Kuhn-Tucker (KKT) conditions

$x, \lambda, \nu$에 대한 조건으로 , 이들이 optimal 하다 (solution)이고, convex problem이라면, 이들은 반드시 아래 조건을 만족해야함을 의미한다.

1. primal constraints: $f_i(x) \le 0, \space i=1, ..., m, \space h_i(x) = 0, \space i = 1, ... , p$ → 원래 problem의 constraint를 만족해야 한다.
2. dual constraints: $\lambda \ge 0$
3. complementary slackness: $\lambda_if_i(x) = 0, \space i = 1, ... , m$
4. gradient of Lagrangian with respect to x vanishes:

   $\nabla f_0(x) + \sum_{i=1}^{m} \lambda_i \nabla f_i(x) + \sum_{i=1}^{p} \nu_i \nabla h_i(x) = 0$

complementary slackness에 대해서, 1번 조건과 2번 조건에 있는 $f_i(x)$와 $\lambda_i$를 곱할 경우 0이 됨을 의미한다. 즉, primal constraint와 dual constraint를 곱한다면 0이 된다는 것이다.

이유는 $\lambda_i \ge 0$이고, $f_i(x) \le 0$이므로, 둘을 곱한다면, 적어도 둘 중 하나는 반드시 0이 되어야 한다.
