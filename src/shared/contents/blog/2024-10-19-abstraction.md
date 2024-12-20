---
title: "[OOP] OOP의 특징을 간단하게 풀어보자 - 1"
layout: post
author: kurtyoon # 작성자
banner: https://i.esdrop.com/d/f/hhaNifrpr0/ukThTOpYpE.jpg # 배너 이미지
categories:
  - OOP
tags:
  - OOP
article: "추상화를 쉽게 풀어보자" # 포스트 내용 함축
date: "2024-10-19 17:01 +0900"
sidebar: []
published: true
comments: true
---

## 추상화 (Abstraction)

추상화는 복잡한 시스템에서 꼭 필요한 정보만 추출하여 단순화하는 과정입니다. 이를 통해 코드의 가독성과 유지보수성이 향상되며, 시스템의 핵심 로직을 명확하게 표현할 수 있습니다.

우선 추상화를 제대로 적용하지 않은 코드를 시작으로 차근차근 풀어나가봅시다!

```java
class Car {
    public String brand;
    public String model;
    public int year;
    public String engineType;

    public void startEngine() {
        System.out.println("엔진이 켜졌어요!");
    }

    public void stopEngine() {
        System.out.println("엔진이 꺼졌어요!");
    }
}
```

객체지향 프로그래밍을 설명할 때 단골 주제로 등장하는 자동차에 대한 코드로 설명을 드릴게요.

이 코드에서는 자동차를 표현하고 있지만, 모든 세부 정보를 한 클래스에 포함시켰습니다.

해당 코드의 문제점이 벌써 보이지 않나요?

먼저 `Car`클래스가 자동차의 모든 종류의 엔진을 관리해야 합니다. 또한, 다른 종류의 차량을 만들기 위해선느 이 클래스를 반복적으로 수정해야 합니다. 아니면 클래스를 점점 많이 만들어야 하죠. 이는 확장에 유연하지 않으며 새로운 요구사항이 생길 때 코드 수정이 많아집니다.

그렇다면 추상화를 통해 공통된 개념을 분리하고, 각 객체가 자신에게 필요한 정보와 행동만 가질 수 있도록 개선해보겠습니다. 먼저 자동차의 엔진을 별도의 클래스로 분리할 수 있겠어요.

```java
abstract class Engine {
    public abstract void start();
    public abstract void stop();
}

// 내연 기관 엔진
class GasolineEngine extends Engine {

    @Override
    public void start() {
        System.out.println("가솔린 엔진이 켜졌어요!");
    }

    @Override
    public void stop() {
        System.out.println("가솔린 엔진이 꺼졌어요!");
    }
}

// 전기차 엔진
class ElectricEngine extends Engine {

    @Override
    public void start() {
        System.out.println("전기 엔진이 켜졌어요!");
    }

    @Override
    public void stop() {
        System.out.println("전기 엔진이 꺼졌어요!");
    }
}
```

이제 자동차 객체는 더 이상 엔진의 세부 사항을 알 필요가 없어졌습니다. 자동차는 엔진 객체를 주입받아서 사용하면 됩니다.

```java
class Car {
    private String brand;
    private String model;
    private int year;
    private Engine engine;

    public Car(String brand, String model, int year, Engine engine) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.engine = engine;
    }

    public void startCar() {
        engine.start();
    }

    public void stopCar() {
        engine.stop();
    }
}
```

책임 분리를 통해 `Car` 클래스는 더 이상 엔진의 세부 동작을 알 필요가 없습니다. 또한, 새로운 엔진이 필요할 때마다 새로운 클래스를 추가하기만 하면 되기 때문에 확장성이 향상되었죠.

이제 인터페이스를 사용해 더 나은 추상화를 적용해보겠습니다. 엔진의 종류와 무관하게 자동차는 엔진 인터페이스를 통해 엕니의 기능을 사용합니다. 이로써 코드의 유연성을 극대화할 수 있습니다.

```java
interface Engine {
    void start();
    void stop();
}

class GasolineEngine implements Engine {

     @Override
    public void start() {
        System.out.println("가솔린 엔진이 켜졌어요!");
    }

    @Override
    public void stop() {
        System.out.println("가솔린 엔진이 꺼졌어요!");
    }
}

class ElectricEngine implements Engine {

    @Override
    public void start() {
        System.out.println("전기 엔진이 켜졌어요!");
    }

    @Override
    public void stop() {
        System.out.println("전기 엔진이 꺼졌어요!");
    }
}
```

자동차 클래스는 이제 의존성 주입(DI, Dependency Injection)을 통해 엔진 객체를 주입받습니다.

```java
class Car {
    private String brand;
    private String model;
    private int year;
    private Engine engine;

    public Car(String brand, String model, int year, Engine engine) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.engine = engine;
    }

    public void startCar() {
        engine.start();
    }

    public void stopCar() {
        engine.stop();
    }
}
```

우리는 이 과정을 통해 추상화를 알아봤습니다. 설명을 위해 사용한 자동차 클래스에 추상화를 적용하며 생긴 이점은 다음과 같습니다.

- 유지보수성: 새로운 엔진을 추가하거나 수정해도 기존 코드에 영향을 주지 않습니다.
- 확장성: 다른 종류의 차량이나 엔진을 쉽게 추가할 수 있습니다.
- 유연성: 의존성 주입을 통해 런타임에 다양한 엔진 객체를 사용할 수 있습니다.
- 코드 재사용성: 공통 인터페이스를 활용해 여러 구현체를 손쉽게 교체할 수 있습니다.
