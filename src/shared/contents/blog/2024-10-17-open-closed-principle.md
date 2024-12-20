---
title: "[OOP] SOLID를 가장 간단명료하게 풀어보자 - 2"
layout: post
author: kurtyoon # 작성자
banner: https://i.esdrop.com/d/f/hhaNifrpr0/ukThTOpYpE.jpg # 배너 이미지
categories:
  - OOP
tags:
  - OOP
article: "Open/Closed Principle을 쉽게 풀어보자" # 포스트 내용 함축
date: "2024-10-17 11:01 +0900"
sidebar: []
published: true
comments: true
---

## Open/Closed Principle

> 시스템을 수정하지 않고도 시스템의 동작을 확장할 수 있어야 합니다. - Robert C.Martin

OOP와 관련해서 **개방/폐쇄 원칙**은 클래스를 확장하려면 기능을 수정할 필요가 없다는 사실을 의미합니다. 즉, 상속을 사용하는 경우 기본 메서드를 수정할 필요가 없습니다.

쉬운 예제로 한번 살펴봅시다. 아래는 피아노라는 객체에 대한 코드입니다.

```java
public class Piano {

    public String getName() {
        return "Piano";
    }

    public void push(String note) {
        System.out.println("Pressing " + note);
    }

    public void play() {
        System.out.println("Pushing a key");
    }
}
```

누군가가 피아노 말고 기타도 연주할 수 있어야 한다고 말합니다. 이런 경우엔 피아노와 기타 모두에 대한 연주 구현이 있는 기본 악기 클래스를 만듭니다.

```java
public abstract class Instrument {

    public abstract String getName();

    public void play() {
        if (this instanceof Piano) {
            System.out.println("Pushing a key");
        } else if (this instanceof Guitar) {
            System.out.println("Strumming a string");
        }
    }
}

public class Piano extends Instrument {

    @Override
    public String getName() {
        return "Piano";
    }

    public void push(String note) {
        System.out.println("Pressing " + note);
    }
}

public class Guitar extends Instrument {

    @Override
    public String getName() {
        return "Guitar";
    }

    public void strum(String note) {
        System.out.println("Strumming " + note);
    }
}
```

다시 한번, 누군가가 또 다른 악기를 추가해야 한다고 말하는 경우, 해당 코드에서 기본 클래스를 다시 수정해야 합니다.

즉, 악기 클래스의 기능을 확장하고 싶을 때마다 기본 클래스를 수정해야 합니다. 따라서 확장에는 열려 있지 않고 수정에는 닫혀 있다고 할 수 있습니다.

이걸 어떻게 고칠 수 있을까요? 이걸 고치는 가장 쉬운 방법은 추상 메서드를 사용하는 것입니다. 이를 통해 확장할 때마다 기본 클래스를 업데이트할 필요 없이, 원하는 악기를 연주하면 각자의 방법으로 연주하게 됩니다.

```java
public abstract class Instrument {
    public abstract String getName();
    public abstract void play();
}

public class Piano extends Instrument {

    @Override
    public String getName() {
        return "Piano";
    }

    public void push(String note) {
        System.out.println("Pressing " + note);
    }

    @Override
    public void play() {
        System.out.println("Pushing a key");
    }
}

public class Guitar extends Instrument {

    @Override
    public String getName() {
        return "Guitar";
    }

    public void strum(String note) {
        System.out.println("Strumming " + note);
    }

    @Override
    public void play() {
        System.out.println("Strumming a string");
    }
}
```

클래스를 변경해야 할 이유는 기본 클래스의 메서드가 잘못된 경우를 제외하고는 없어야 합니다.

이를 통해 개방/폐쇄 원칙에 대해 이해가 쉬웠으면 좋겠습니다.
