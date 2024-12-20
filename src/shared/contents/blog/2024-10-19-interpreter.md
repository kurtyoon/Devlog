---
title: "[Design Pattern] GoF의 23가지 디자인 패턴을 쉽게 풀어보자 - 16"
layout: post
author: kurtyoon # 작성자
banner: https://i.esdrop.com/d/f/hhaNifrpr0/y7rzO6qSLk.jpg # 배너 이미지
categories:
  - Design Pattern
tags:
  - Design Pattern
article: "인터프리터 패턴을 쉽게 풀어보자" # 포스트 내용 함축
date: "2024-10-19 21:08 +0900"
sidebar: []
published: true
comments: true
---

## 인터프리터(Interpreter) 패턴

인터프리터 패턴은 언어의 문법을 정의하고 해석하는 클래스들로 구성된 디자인 패턴입니다. 이 패턴은 간단한 언어나 규칙을 해석하고 실행할 때 유용합니다. 문법 규칙을 객체화하여 표현하고, 해당 객체를 통해 문자열이나 명령을 해석합니다.

주로 DSL(Domain-Specific Language), 계산기, 정규식 처리와 같이 언어의 문법이 자주 변경되지 않는 상황에서 사용됩니다.

### 문제점: 특정 규칙이나 언어를 해석하는 코드의 복잡성

예를 들어, 수학 계산을 수행하는 애플리케이션에서 입력된 수식을 해석하고 계산해야 합니다. 모든 수식의 문자열 파싱과 계산 로직을 한 곳에 구현하면 코드가 복잡해지고 유지보수가 어렵습니다.

```java
public class Calculator {

    public int evaluate(String expression) {
        String[] tokens = expression.split(" ");
        int left = Integer.parseInt(tokens[0]);
        String operator = tokens[1];
        int right = Integer.parseInt(tokens[2]);

        switch (operator) {
            case "+":
                return left + right;
            case "-":
                return left - right;
            default:
                throw new IllegalArgumentException("Unknown operator");
        }
    }

    public static void main(String[] args) {
        Calculator calculator = new Calculator();
        System.out.println(calculator.evaluate("3 + 4"));  // 7
        System.out.println(calculator.evaluate("10 - 5"));  // 5
    }
}
```

문제점

- 유연성 부족: 더 복잡한 수식이나 연산자를 추가할 때 코드가 수정됩니다.
- 확장성 문제: 새로운 규칙을 추가할 때 기존 코드를 수정해야 하므로 코드가 점점 복잡해집니다.
- 문법 분리 어려움: 수식의 문법과 계산 로직이 함께 있어 유지보수가 어렵습니다.

### 해결 방법: 인터프리터 패턴 적용

인터프리터 패턴을 사용하면 문법을 객체화하고 각 규칙을 독립적으로 해석할 수 있습니다. 이렇게 하면 새로운 문법을 쉽게 추가하고 유지보수할 수 있습니다.

Expression 인터페이스 정의

```java
interface Expression {
    int interpret();
}
```

숫자 표현 클래스 구현

```java
class Number implements Expression {

    private int value;

    public Number(int value) {
        this.value = value;
    }

    @Override
    public int interpret() {
        return value;
    }
}
```

연산자 표현 클래스 구현

```java
class Add implements Expression {

    private Expression left;
    private Expression right;

    public Add(Expression left, Expression right) {
        this.left = left;
        this.right = right;
    }

    @Override
    public int interpret() {
        return left.interpret() + right.interpret();
    }
}

class Subtract implements Expression {

    private Expression left;
    private Expression right;

    public Subtract(Expression left, Expression right) {
        this.left = left;
        this.right = right;
    }

    @Override
    public int interpret() {
        return left.interpret() - right.interpret();
    }
}
```

클라이언트 코드

```java
public class Main {
    public static void main(String[] args) {
        // 수식: (3 + 4) - 2
        Expression expression = new Subtract(
            new Add(new Number(3), new Number(4)),
            new Number(2)
        );

        System.out.println(expression.interpret());  // 5
    }
}
```

### 인터프리터 패턴의 동작 원리

1. Expression 인터페이스는 해석 작업을 정의합니다.
2. 숫자 클래스는 단순히 숫자를 반환하는 역할을 합니다.
3. 연산자 클래스는 좌측과 우측 표현을 받아 계산 로직을 수행합니다.
4. 클라이언트는 표현 객체를 조합하여 복잡한 수식을 구성하고 해석합니다.

### 인터프리터 패턴의 장단점

장점

- 유연성: 문법과 해석 로직이 독립적으로 관리되므로 새로운 연산자와 규칙을 쉽게 추가할 수 있습니다.
- 가독성 향상: 각 문법 규칙이 객체로 표현되므로 코드의 가독성이 높아집니다.
- 유지보수성 향상: 각 규칙을 독립적으로 수정할 수 있어 유지보수가 쉽습니다.

단점

- 복잡성 증가: 문법이 복잡할수록 클래스 수가 많아져 코드가 복잡해질 수 있습니다.
- 성능 저하: 수식이 복잡해지면 객체 생성과 호출이 많아져 성능이 저하될 수 있습니다.
- 모든 상황에 적합하지 않음: 복잡한 언어 해석에는 성능이 중요한데, 이 경우 더 나은 파서 도구가 필요할 수 있습니다.

### 결론

인터프리터 패턴은 간단한 문법을 객체로 표현하고 해석하는 데 매우 유용합니다. 이 패턴을 사용하면 문법을 유연하게 확장할 수 있고, 코드의 가독성과 유지보수성이 높아집니다. 하지만 문법이 복잡해질수록 클래스 수가 증가하고 성능 문제가 발생할 수 있으므로, 복잡한 언어의 해석에는 적합하지 않습니다.

이 패턴은 DSL 처리, 계산기 프로그램, 정규식 해석 등에서 자주 사용됩니다.
