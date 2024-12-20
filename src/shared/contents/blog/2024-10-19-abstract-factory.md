---
title: "[Design Pattern] GoF의 23가지 디자인 패턴을 쉽게 풀어보자 - 3"
layout: post
author: kurtyoon # 작성자
banner: https://i.esdrop.com/d/f/hhaNifrpr0/y7rzO6qSLk.jpg # 배너 이미지
categories:
  - Design Pattern
tags:
  - Design Pattern
article: "추상 팩토리 패턴을 쉽게 풀어보자" # 포스트 내용 함축
date: "2024-10-19 18:38 +0900"
sidebar: []
published: true
comments: true
---

## 추상 팩토리(Abstract Factory) 패턴

추상 팩토리 패턴은 관련된 객체들을 일관된 방식으로 생성하는 패턴입니다. 이 패턴은 서로 연관된 객체들을 그룹으로 생성해야 할 때 유용하며, 구체적인 클래스 대신 인터페이스를 통해 객체를 생성하도록 설계합니다.

### 문제점: 다양한 종류의 객체 생성과 관리의 어려움

예를 들어, UI 요소로 Windows와 Mac에 맞는 버튼과 체크박스를 생성해야 한다고 가정해봅시다. 각 운영체제에 맞는 객체를 생성해야 하는데, 이를 단순한 Factory Method 패턴으로 관리하려면 복잡해질 수 있습니다.

```java
class WinButton {
    public void click() {
        System.out.println("윈도우");
    }
}

class MacButton {
    public void click() {
        System.out.println("맥");
    }
}

class Main {
    public static void main(String[] args) {
        String osType = "Windows";

        if (osType.equals("Windows")) {
            WinButton button = new WinButton();
            button.click();
        } else {
            MacButton button = new MacButton();
            button.click();
        }
    }
}
```

위의 코드는 클라이언트 코드가 직접 구체적인 클래스(WinButton, MacButton)를 생성해야 합니다. 또한, 새로운 UI 요소를 추가할 때마다 코드를 수정해야 하므로 확장성이 부족합니다. 그리고 Windows 버튼과 체크박스, Mac 버튼과 체크박스의 관계를 일관성 있게 유지하기 어렵습니다.

### 해결 방법: 추상 팩토리 패턴 적용

Abstract Factory 패턴은 관련 객체들을 추상화된 팩토리 클래스를 통해 생성합니다. 이로써 클라이언트는 구체적인 객체를 알 필요 없이 팩토리 인터페이스를 통해 일관성 있는 객체들을 생성할 수 있습니다.

첫번째로 UI 요소 인터페이스를 정의합시다.

```java
interface Button {
    void click();
}

interface Checkbox {
    void check();
}
```

그 뒤로 구체적인 구현 클래스를 정의합시다.

```java
class WinButton implements Button {
    @Override
    public void click() {
        System.out.println("Windows button clicked");
    }
}

class MacButton implements Button {
    @Override
    public void click() {
        System.out.println("Mac button clicked");
    }
}

class WinCheckbox implements Checkbox {
    @Override
    public void check() {
        System.out.println("Windows checkbox checked");
    }
}

class MacCheckbox implements Checkbox {
    @Override
    public void check() {
        System.out.println("Mac checkbox checked");
    }
}
```

세번째로 Abstract Factory를 정의합니다.

```java
interface UIFactory {
    Button createButton();
    Checkbox createCheckbox();
}
```

마지막으로 구체적인 팩토리를 구현합니다.

```java
class WinFactory implements UIFactory {
    @Override
    public Button createButton() {
        return new WinButton();
    }

    @Override
    public Checkbox createCheckbox() {
        return new WinCheckbox();
    }
}

class MacFactory implements UIFactory {
    @Override
    public Button createButton() {
        return new MacButton();
    }

    @Override
    public Checkbox createCheckbox() {
        return new MacCheckbox();
    }
}
```

이에 대한 클라이언트의 코드는 다음과 같습니다.

```java
public class Main {
    public static void main(String[] args) {
        UIFactory factory = getFactory("Windows");

        Button button = factory.createButton();
        Checkbox checkbox = factory.createCheckbox();

        button.click();
        checkbox.check();
    }

    public static UIFactory getFactory(String osType) {
        if (osType.equals("Windows")) {
            return new WinFactory();
        } else if (osType.equals("Mac")) {
            return new MacFactory();
        }
        throw new IllegalArgumentException("Unknown OS type");
    }
}
```

### 추상 팩토리 패턴의 동작 원리

추상 팩토리 인터페이스인 `UIFactory`는 관련 객체들을 생성하는 메서드를 정의합니다. 구체적인 팩토리 클래스(`WinFactory`, `MacFactory`)는 해당 운영체제에 맞는 객체를 생성합니다. 클라이언트 코드는 팩토리 인터페이스를 통해 객체를 생성하며, 구체적인 클래스에 의존하지 않습니다.

### 추상 팩토리 패턴의 장단점

이러한 추상 팩토리 패턴은 서로 관련된 객체들을 일관되게 생성하고, 클라이언트 코드가 구체적인 클래스에 의존하지 않습니다. 또한, 새로운 팩토리와 제품군을 추가하더라도 기존 코드를 수정할 필요가 없습니다.

그러나, 많은 인터페이스와 클래스가 필요하며, 제품군에 속하지 않는 개별 객체를 생성하기 어렵습니다.

### 결론

추상 팩토리 패턴은 서로 관련된 객체들을 일관성 있게 생성해야 할 때 매우 유용합니다. 이 패턴을 사용하면 코드의 결합도를 낮추고, 확장성을 높일 수 있으며, 유지보수성이 향상됩니다. 하지만 클래스와 인터페이스가 많아지므로 작은 프로젝트에서는 복잡성을 증가시킬 수 있습니다.
