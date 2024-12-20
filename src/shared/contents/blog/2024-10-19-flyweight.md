---
title: "[Design Pattern] GoF의 23가지 디자인 패턴을 쉽게 풀어보자 - 11"
layout: post
author: kurtyoon # 작성자
banner: https://i.esdrop.com/d/f/hhaNifrpr0/y7rzO6qSLk.jpg # 배너 이미지
categories:
  - Design Pattern
tags:
  - Design Pattern
article: "플라이웨이트 패턴을 쉽게 풀어보자" # 포스트 내용 함축
date: "2024-10-19 20:27 +0900"
sidebar: []
published: true
comments: true
---

## 플라이웨이트(Flyweight) 패턴

플라이웨이트(Flyweight) 패턴은 메모리 사용을 최적화하기 위해 동일하거나 유사한 객체를 공유하는 구조적 디자인 패턴입니다. 이 패턴은 객체를 반복적으로 생성해야 하는 상황에서 메모리 사용을 줄이고 성능을 향상시키는 데 유용합니다.

특히, 대규모 시스템에서 여러 개의 동일한 객체가 사용될 때 중복 객체를 방지하고, 공통된 상태를 공유함으로써 메모리 사용을 줄일 수 있습니다.

### 문제점: 동일한 객체를 반복적으로 생성할 때 발생하는 메모리 낭비

예를 들어, 텍스트 편집기에서 수천 개의 문자를 표시한다고 가정합니다. 각 문자를 별도의 객체로 생성하면 메모리 낭비가 발생합니다. 문자 자체는 동일한 속성을 가지므로 같은 문자에 대해 객체를 재사용할 수 있습니다.

```java
class Character {

    private char symbol;
    private String font;

    public Character(char symbol, String font) {
        this.symbol = symbol;
        this.font = font;
    }

    public void display() {
        System.out.println("Symbol: " + symbol + ", Font: " + font);
    }
}

public class Main {
    public static void main(String[] args) {

        // 동일한 문자 'A'를 여러 번 생성
        Character char1 = new Character('A', "Arial");
        Character char2 = new Character('A', "Arial");

        char1.display();  // Symbol: A, Font: Arial
        char2.display();  // Symbol: A, Font: Arial
    }
}
```

문제점

- 중복 객체 생성: 동일한 문자에 대해 여러 개의 객체가 생성됩니다.
- 메모리 낭비: 동일한 정보가 반복적으로 저장되므로 메모리를 비효율적으로 사용합니다.

### 해결 방법: 플라이웨이트 패턴 적용

플라이웨이트 패턴은 동일한 객체를 재사용하도록 하여 중복 객체를 줄이고 메모리를 절약합니다. 공통된 상태(내부 상태)는 공유하고, 변경되는 상태(외부 상태)는 필요에 따라 개별적으로 처리합니다.

Flyweight 객체 정의

```java
class Character {

    private final char symbol;  // 내부 상태 (공유되는 부분)

    public Character(char symbol) {
        this.symbol = symbol;
    }

    public void display(String font) {  // 외부 상태 (개별적으로 제공)
        System.out.println("Symbol: " + symbol + ", Font: " + font);
    }
}
```

Flyweight Factory 클래스 구현

```java
import java.util.HashMap;
import java.util.Map;

class CharacterFactory {

    private Map<Character, Character> cache = new HashMap<>();

    public Character getCharacter(char symbol) {
        // 이미 존재하는 객체가 있으면 반환, 없으면 생성 후 저장
        if (!cache.containsKey(symbol)) {
            cache.put(symbol, new Character(symbol));
        }
        return cache.get(symbol);
    }
}
```

클라이언트 코드

```java
public class Main {
    public static void main(String[] args) {

        CharacterFactory factory = new CharacterFactory();

        // 동일한 문자 'A'를 여러 번 요청하지만 같은 인스턴스를 재사용
        Character char1 = factory.getCharacter('A');
        Character char2 = factory.getCharacter('A');

        char1.display("Arial");  // Symbol: A, Font: Arial
        char2.display("Times New Roman");  // Symbol: A, Font: Times New Roman

        System.out.println(char1 == char2);  // true (같은 인스턴스 재사용)
    }
}
```

### 플라이웨이트 패턴의 작동 원리

공통된 상태(내부 상태)는 Flyweight 객체가 공유하고, 변경되는 상태(외부 상태)는 메서드 호출 시 인자로 전달됩니다.
Flyweight Factory는 이미 생성된 객체를 재사용하도록 관리합니다.

### 플라이웨이트 패턴의 장단점

장점

- 메모리 사용 최적화: 동일한 객체를 재사용해 메모리 낭비를 방지합니다.
- 성능 향상: 객체 생성 비용을 줄이고, 메모리 사용량을 줄여 애플리케이션의 성능을 향상시킵니다.
- 유지보수성: 객체를 중앙에서 관리하므로 코드의 유지보수가 쉽습니다.

단점

- 복잡성 증가: 내부 상태와 외부 상태를 구분해야 하므로 코드가 복잡해질 수 있습니다.
- 성능 오버헤드: Flyweight Factory를 통해 객체를 조회하므로 조회 시간이 추가될 수 있습니다.
- 모든 객체에 적합하지 않음: 객체의 상태가 대부분 고유한 경우, 플라이웨이트 패턴의 장점을 누리기 어렵습니다.

### 결론

플라이웨이트 패턴은 동일하거나 유사한 객체를 공유하여 메모리 사용을 최적화하는 데 매우 유용한 패턴입니다. 특히 대규모 애플리케이션에서 메모리 사용량이 중요한 경우에 효과적입니다. 그러나 내부 상태와 외부 상태를 구분하는 작업이 필요하며, 모든 상황에서 적합한 것은 아닙니다.

이 패턴은 텍스트 처리 시스템, 게임 개발, 데이터베이스 연결 풀 등 반복적인 객체가 많은 곳에서 주로 사용됩니다.
