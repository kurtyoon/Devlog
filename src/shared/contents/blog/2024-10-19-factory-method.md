---
title: "[Design Pattern] GoF의 23가지 디자인 패턴을 쉽게 풀어보자 - 2"
layout: post
author: kurtyoon # 작성자
banner: https://i.esdrop.com/d/f/hhaNifrpr0/y7rzO6qSLk.jpg # 배너 이미지
categories:
  - Design Pattern
tags:
  - Design Pattern
article: "팩토리 메서드 패턴을 쉽게 풀어보자" # 포스트 내용 함축
date: "2024-10-19 18:29 +0900"
sidebar: []
published: true
comments: true
---

## 팩토리 메서드(Factory Method) 패턴

Factory Method 패턴은 객체를 생성하는 로직을 서브 클래스에서 정의하도록 하여 객체 생성을 캡슐화하는 패턴입니다. 이 패턴은 객체 생성 로직을 클라이언트 코드와 분리하여 유연한 확장이 가능하도록 설계합니다. 이때, 객체의 타입 결정을 클라이언트가 아닌 팩토리 메서드에게 위임하여 코드의 결합도를 줄이고 유지 보수성을 높입니다.

### 문제점: 객체 생성 코드가 중복되고 코드 결합도가 높을 때

동물을 통해서 한번 알아보도록 합시다. 아래 코드에서는 `Animal` 객체를 생성할 때, 객체의 타입에 따라 조건문이 필요합니다. 이러한 방식은 새로운 타입의 객체가 추가될 때마다 코드가 수정되어야 하는 문제를 유발합니다.

```java
class Dog {
    public void sound() {
        System.out.println("멍멍!");
    }
}

class Cat {
    public void sound() {
        System.out.println("냥냥!");
    }
}

public class Main {
    public static void main(String[] args) {
        String animalType = "dog";

        if (animalType.equals("dog")) {
            Dog dog = new Dog();
            dog.sound();
        } else if (animalType.equals("cat")) {
            Cat cat = new Cat();
            cat.sound();
        }
    }
}
```

위의 코드는 `Main` 클래스가 `Dog`와 `Cat` 객체의 구체적인 타입을 알아야 하므로 결합도가 높고, 새로운 동물이 추가될 때마다 `Main` 클래스의 코드를 수정해야 합니다. 또한 여러 곳에서 동일한 객체 생성 로직을 반복해야 해서 유지보수가 어렵습니다.

### 해결 방법: 팩토리 메서드 패턴 적용

팩토리 메서드 패턴을 사용하면 객체 생성 로직을 서브 클래스에 위임하고, 클라이언트는 팩토리 메서드를 통해 객체를 생성합니다.

```java
// 공통 인터페이스
interface Animal {
    void sound();
}

// 구체적인 동물 클래스
class Dog implements Animal {
    @Override
    public void sound() {
        System.out.println("멍멍!");
    }
}

class Cat implements Animal {
    @Override
    public void sound() {
        System.out.println("냥냥!");
    }
}

// 팩토리 클래스
abstract class AnimalFactory {
    public abstract Animal createAnimal();
}

// 구체적인 팩토리 클래스 (Dog 생성 담당)
class DogFactory extends AnimalFactory {

    @Override
    public Animal createAnimal() {
        return new Dog();
    }
}

// 구체적인 팩토리 클래스 (Cat 생성 담당)
class CatFactory extends AnimalFactory {

    @Override
    public Animal createAnimal() {
        return new Cat();
    }
}
```

이러한 경우 클라이언트에서는 다음 코드로 사용할 수 있습니다.

```java
public class Main {
    public static void main(String[] args) {
        AnimalFactory dogFactory = new DogFactory();
        AnimalFactory catFactory = new CatFactory();

        Animal dog = dogFactory.createAnimal();
        Animal cat = catFactory.createAnimal();

        dog.sound();  // 멍멍!
        cat.sound();  // 냥냥!
    }
}
```

위에 있는 `Animal Factory`라는 추상 클래스는 바로 다음번에 나올 예정이니 크게 신경쓰지 않아도 됩니다.

결국 클라이언트에서는 팩토리 메서드를 통해 구체적인 생성 로직을 알 필요가 없이 객체를 생성할 수 있습니다.

### 팩토리 메서드 패턴의 장단점

이처럼 팩토리 메서트 패턴을 사용하는 경우 클랑이언트와 객체 생성 로직을 분리하여 코드의 결합도를 낮춥니다. 또한 새로운 객체를 추가할 대 기존 코드를 수정하지 않고, 새로운 팩토리 클래스만 추가하면 됩니다. 따라서 확장성이 증가하죠. 그리고 객체 생성 로직을 한 곳에 모아 관리하므로 코드의 중복을 줄이고 유지보수를 쉽게 합니다.

그러나 각 객체에 대한 별도의 팩토리 클래스를 구현해야 하므로 클래스가 많아질 수 있고, 작은 애플리케이션에서는 오히려 코드를 복잡하게 만들 수 있습니다.

### 결론

팩토리 메서드 패턴은 객체 생성 로직을 서브 클래스에 위임하여 결합도를 낮추고 확장성을 높이는 강력한 패턴입니다. 이 패턴은 다양한 객체 생성이 필요한 경우, 객체의 타입이 변경될 가능성이 있는 경우에 특히 유용합니다. 하지만 작은 애플리케이션에서는 불필요한 복잡성을 초래할 수 있으므로 상황에 맞게 사용하는 것이 중요합니다.
