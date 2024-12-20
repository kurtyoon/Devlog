---
title: "[OOP] OOP의 특징을 간단하게 풀어보자 - 2"
layout: post
author: kurtyoon # 작성자
banner: https://i.esdrop.com/d/f/hhaNifrpr0/ukThTOpYpE.jpg # 배너 이미지
categories:
  - OOP
tags:
  - OOP
article: "상속을 쉽게 풀어보자" # 포스트 내용 함축
date: "2024-10-19 17:16 +0900"
sidebar: []
published: true
comments: true
---

## 상속 (Inheritance)

상속은 부모 클래스(슈퍼 클래스)의 속성과 메서들르 자식 클래스(서브 클래0스)가 물려 받아 재사용하는 개념입니다. 이를 통해 코드의 재사용성을 높이고, 중복을 줄이며, 유지보수성을 향상시킬 수 있습니다. 하지만 잘못 사용하면 코드가 복잡해지고 유지보수가 어려워질 수 있습니다.

자동차와 트럭에 대한 코드를 통해 상속을 남용한 경우의 코드를 보여드릴게요.

```java
class Car {

    public void drive() {
        System.out.println("부릉부릉");
    }

    public void stop() {
        System.out.println("끼익");
    }
}

class Truck extends Car {

    public void loadCargo() {
        System.out.println("짐 싣는 중");
    }
}

```

위 코드의 문제점이 보이시나요?
우선 트럭이 자동차의 모든 기능을 물려받았지만, 트력과 일반 승용차는 목적이 다릅니다. 따라서 상속 관계의 의미가 불명확합니다. 그리고 트럭이 자동차의 `drive()`와 `stop()` 메서드를 그대로 사용해야 할까요? 트럭과 승용차가 다른 동작 방법을 사용할 경우에는요? 그리고 새로운 차량의 유형을 추가하려면 동일한 상속 구조를 반복해야 합니다.

이러한 문제점을 바로잡기 위해 공통 기능을 부모 클래스에 정의하고, 각 자식 클래스에서 고유한 기능을 구현하도록 수정해볼게요.

```java
// 추상 클래스 Vehicle (공통 기능 정의)
abstract class Vehicle {

    public abstract void drive();
    public abstract void stop();
}

// Car 클래스
class Car extends Vehicle {

    @Override
    public void drive() {
        System.out.println("부드럽게 부릉부릉");
    }

    @Override
    public void stop() {
        System.out.println("끼익");
    }
}

// Truck 클래스
class Truck extends Vehicle {

    @Override
    public void drive() {
        System.out.println("힘들게 부릉부릉");
    }

    @Override
    public void stop() {
        System.out.println("끼익");
    }

    public void loadCargo() {
        System.out.println("짐 싣는 중");
    }
}
```

`Vehicle` 추상 클래스는 모든 차량의 공통 기능인 `drive()`와 `stop()`을 정의합니다. 그리고 각 자식 클래스는 자신만의 방식으로 이를 구현합니다. 따라서 새로운 차량 유형이 필요할 때마다 `Vehicle` 클래스를 상속받아 구현하기만 하면 됩니다.

추상 클래스 대신 인터페이스를 사용하면 더 유연한 구조를 만들 수 있습니다. 예를 들어, 어떤 차량은 운송 기능이 필요하고, 어떤 차량은 필요하지 않을 수 있습니다. 인터페이스를 활용해 이러한 기능을 선택적으로 제공할 수 있죠.

```java
// Vehicle 인터페이스 정의
interface Vehicle {
    void drive();
    void stop();
}

// CargoSupport 인터페이스 정의 (운송 기능)
interface CargoSupport {
    void loadCargo();
}

// Car 클래스 구현
class Car implements Vehicle {

    @Override
    public void drive() {
        System.out.println("부드럽게 부릉부릉");
    }

    @Override
    public void stop() {
        System.out.println("끼익");
    }
}

// Truck 클래스 (Vehicle과 CargoSupport를 모두 구현)
class Truck implements Vehicle, CargoSupport {

    @Override
    public void drive() {
        System.out.println("힘들게 부릉부릉");
    }

    @Override
    public void stop() {
        System.out.println("끼익");
    }

    @Override
    public void loadCargo() {
        System.out.println("짐 싣는 중");
    }
}
```

`Truck`은 `Vehicle`과 `CargoSupport` 두 개의 인터페이스를 구현해 필요에 따라 기능을 확장합니다. 이렇게 인터페이스르 사용해 각 클래스에 필요한 기능만 구현합니다.

이러한 방식으로 상속을 사용하면 이점과 한계가 명확합니다.

부모 클래스에 정의된 코드를 여러 자식 클래스에서 재사용할 수 있습니다. 또한 새로운 기능을 추가할 때, 기존 클래스를 수정하지 않고 상속을 통해 확장할 수 있습니다. 그리고 공통 기능을 상속 계층으로 정리하면 코드가 더 명확해집니다.

그러나, 상속 계층이 깊어지면 코드의 복잡성이 증가하고 유지보수가 어려워질 수 있습니다. 또한 자식 클래스는 부모 클래스에 강하게 결합되고, 부모 클래스의 변경이 자식 클래스에 영향을 미칠 수 있습니다. 그리고 Java에서는 다중 상속을 지원하지 않아 유연성에 한계가 있어 이를 인터페이스로 해결해야 합니다.
