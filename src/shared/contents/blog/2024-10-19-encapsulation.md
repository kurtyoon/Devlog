---
title: "[OOP] OOP의 특징을 간단하게 풀어보자 - 4"
layout: post
author: kurtyoon # 작성자
banner: https://i.esdrop.com/d/f/hhaNifrpr0/ukThTOpYpE.jpg # 배너 이미지
categories:
  - OOP
tags:
  - OOP
article: "캡슐화를 쉽게 풀어보자" # 포스트 내용 함축
date: "2024-10-19 17:42 +0900"
sidebar: []
published: true
comments: true
---

## 캡슐화 (Encapsulation)

캡슈로하는 데이터와 메서드르 하나의 객체로 묶고, 외부에서 직접 접근하지 못하도록 보호하는 기법입니다.
주로 필드를 `private`로 선언하고, 필드에 대한 접근은 `getter`와 `setter` 메서드를 통해 제어합니다. 이를 통해 데이터의 무결성을 유지하고, 객체 내부의 세부 구현을 숨겨 코드의 변경에 대한 영향력을 최소화할 수 있습니다.

아래는 캡슐화가 제대로 적용되지 않은 코드입니다.

```java
class Person {
    public String name;
    public int age;
}

public class Main {
    public static void main(String[] args) {
        Person person = new Person();

        person.name = "으악이";
        person.age = "25";

        System.out.println(person.name + "의 나이는 " + person.age + "살 입니다.");
    }
}
```

이러한 코드에서는 이름과 나이 필드가 외부에서 직접 수정이 가능합니다. 그리고 나이를 음수로 설정하는 등의 잘못된 데이터의 입력을 막을 수 없습니다.

이번에는 캡슐화를 적용해서 필드에 직접 접근하지 못핟로고 보호하고, getter와 setter를 사용해 데이터를 관리해 봅시다.

```java
class Person {
    private String name;
    private int age;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        if (age >= 0) {
            this.age = age;
        } else {
            System.out.println("나이는 음수일 수 없습니다!");
        }
    }
}
```

외부에서 필드에 직접 접근하지 못하도록 `private`로 선언했고, 나이를 설정할 때 음수를 허용하지 않는 검증 로직을 추가했습니다.

여기서 더 발전시켜 보도록 하죠.

생성자를 사용해 객체를 생성하는 경우에는 초기화를 강제할 수 있습니다. 또한 필드 값을 변경할 수 없도록 불변 객체를 만들면 더 안전하게 캡슐화를 구현할 수 있습니다.

```java
class Person {
    private final String name;
    private final int age;

    public Person (String name, int age) {
        if (age < 0) {
            throw new IllegalArgumentException("나이는 음수일 수 없습니다!");
        }

        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }
}
```

불변 객체를 사용하는 경우 객체가 생성된 이후에는 상태가 변경되지 않으므로 예기치 않은 수정이 발생하지 않습니다. 또한 불변 객체는 여러 스레드에서 동시에 사용하도 안전합니다.
