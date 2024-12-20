---
title: "[Design Pattern] GoF의 23가지 디자인 패턴을 쉽게 풀어보자 - 9"
layout: post
author: kurtyoon # 작성자
banner: https://i.esdrop.com/d/f/hhaNifrpr0/y7rzO6qSLk.jpg # 배너 이미지
categories:
  - Design Pattern
tags:
  - Design Pattern
article: "데코레이터 패턴을 쉽게 풀어보자" # 포스트 내용 함축
date: "2024-10-19 19:20 +0900"
sidebar: []
published: true
comments: true
---

## 데코레이터(Decorator) 패턴

데코레이터 패턴은 객체에 동적으로 기능을 추가할 수 있는 구조적 디자인 패턴입니다. 이 패턴을 사용하면 기존 클래스의 기능을 변경하지 않고 새로운 기능을 확장할 수 있습니다. 상속을 사용하지 않고도 동적으로 객체의 기능을 확장하기 때문에 유연성과 재사용성이 높습니다.

### 문제점: 상속을 통한 기능 확장의 한계

일반적으로 기능을 확장할 때 상속을 사용할 수 있지만, 상속 방식은 클래스 수를 증가시키고 유연성이 떨어지는 문제가 있습니다. 예를 들어, 커피를 주문할 때 **다양한 옵션(우유 추가, 시럽 추가 등)**을 적용해야 하는 상황에서 옵션의 조합만큼 클래스를 만들어야 할 수 있습니다.

```java
// 기본 커피 클래스
class Coffee {

    public String getDescription() {
        return "Basic Coffee";
    }

    public double cost() {
        return 2.00;
    }
}

// 우유가 추가된 커피
class MilkCoffee extends Coffee {

    @Override
    public String getDescription() {
        return super.getDescription() + ", with Milk";
    }

    @Override
    public double cost() {
        return super.cost() + 0.50;
    }
}

// 시럽이 추가된 커피
class SyrupCoffee extends Coffee {

    @Override
    public String getDescription() {
        return super.getDescription() + ", with Syrup";
    }

    @Override
    public double cost() {
        return super.cost() + 0.75;
    }
}
```

문제점

- 클래스 폭발 문제: 우유, 시럽 등 다양한 옵션을 조합해야 할 경우 조합 수만큼 클래스를 만들어야 합니다.
- 유연성 부족: 새로운 옵션을 추가하려면 모든 관련 클래스를 수정해야 합니다.
- 상속의 제한: Java에서는 다중 상속을 지원하지 않기 때문에 상속만으로는 여러 기능을 쉽게 추가할 수 없습니다.

### 해결 방법: 데코레이터 패턴 적용

데코레이터 패턴은 **기능 확장을 위한 클래스를 래핑(wrapper)**하여 동적으로 객체의 기능을 조합합니다. 각 데코레이터는 같은 인터페이스를 구현하여 기능을 확장하고, 객체가 중첩될 수 있도록 설계합니다.

공통 인터페이스 정의

```java
interface Coffee {
    String getDescription();
    double cost();
}
```

기본 커피 클래스 구현

```java
class BasicCoffee implements Coffee {

    @Override
    public String getDescription() {
        return "Basic Coffee";
    }

    @Override
    public double cost() {
        return 2.00;
    }
}
```

데코레이터 추상 클래스 정의

```java
abstract class CoffeeDecorator implements Coffee {

    protected Coffee coffee;

    public CoffeeDecorator(Coffee coffee) {
        this.coffee = coffee;
    }

    @Override
    public String getDescription() {
        return coffee.getDescription();
    }

    @Override
    public double cost() {
        return coffee.cost();
    }
}
```

구체적인 데코레이터 구현

```java
class MilkDecorator extends CoffeeDecorator {

    public MilkDecorator(Coffee coffee) {
        super(coffee);
    }

    @Override
    public String getDescription() {
        return super.getDescription() + ", with Milk";
    }

    @Override
    public double cost() {
        return super.cost() + 0.50;
    }
}

class SyrupDecorator extends CoffeeDecorator {

    public SyrupDecorator(Coffee coffee) {
        super(coffee);
    }

    @Override
    public String getDescription() {
        return super.getDescription() + ", with Syrup";
    }

    @Override
    public double cost() {
        return super.cost() + 0.75;
    }
}
```

클라이언트 코드

```java
public class Main {
    public static void main(String[] args) {
        // 기본 커피 주문
        Coffee basicCoffee = new BasicCoffee();
        System.out.println(basicCoffee.getDescription() + " $" + basicCoffee.cost()); // Basic Coffee $2.0

        // 우유 추가
        Coffee milkCoffee = new MilkDecorator(basicCoffee);
        System.out.println(milkCoffee.getDescription() + " $" + milkCoffee.cost()); // Basic Coffee, with Milk $2.5

        // 우유와 시럽 추가
        Coffee syrupMilkCoffee = new SyrupDecorator(milkCoffee);
        System.out.println(syrupMilkCoffee.getDescription() + " $" + syrupMilkCoffee.cost()); // Basic Coffee, with Milk, with Syrup $3.25
    }
}
```

### 데코레이터 패턴의 장단점

장점

- 유연한 기능 확장: 객체를 동적으로 래핑하여 기능을 조합할 수 있습니다.
- 상속의 대체: 다중 상속 없이도 다양한 기능을 조합할 수 있습니다.
- 개방-폐쇄 원칙(OCP) 준수: 기존 코드를 수정하지 않고 새로운 기능을 추가할 수 있습니다.

단점

- 복잡성 증가: 객체가 여러 데코레이터로 감싸질 경우 구조가 복잡해질 수 있습니다.
- 객체 관리의 어려움: 여러 데코레이터 객체를 추적하고 관리해야 하므로 디버깅이 어려울 수 있습니다.
- 성능 문제: 데코레이터가 중첩될수록 메서드 호출이 늘어나 성능에 영향을 줄 수 있습니다.

### 결론

데코레이터 패턴은 기존 코드 수정 없이 객체에 동적으로 기능을 추가해야 할 때 유용한 패턴입니다. 이 패턴을 사용하면 기능을 자유롭게 조합할 수 있어 유연한 설계가 가능합니다. 다만, 구조가 복잡해질 수 있으므로 적절한 설계가 필요합니다.

데코레이터 패턴은 Java I/O 시스템이나 웹 요청 처리 등 다양한 분야에서 많이 사용되며, 객체의 기능을 확장하는 강력한 도구로 활용됩니다.
