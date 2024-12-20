---
title: "[Design Pattern] GoF의 23가지 디자인 패턴을 쉽게 풀어보자 - 21"
layout: post
author: kurtyoon # 작성자
banner: https://i.esdrop.com/d/f/hhaNifrpr0/y7rzO6qSLk.jpg # 배너 이미지
categories:
  - Design Pattern
tags:
  - Design Pattern
article: "템플릿 메서드 패턴을 쉽게 풀어보자" # 포스트 내용 함축
date: "2024-10-19 21:31 +0900"
sidebar: []
published: true
comments: true
---

## 템플릿 메서드(Template Method) 패턴

템플릿 메서드 패턴은 알고리즘의 기본 골격(구조)을 상위 클래스에 정의하고, 알고리즘의 일부 단계는 하위 클래스에서 재정의하는 행동 디자인 패턴입니다.

이 패턴을 사용하면 상위 클래스에서 알고리즘의 흐름을 고정하면서도, 특정 단계의 구현을 하위 클래스에서 변경할 수 있습니다.

즉, 공통된 알고리즘의 코드 중복을 제거하면서, 각기 다른 세부 구현을 유연하게 지원합니다.

### 문제점: 알고리즘의 구조가 동일하지만, 일부 단계가 달라지는 경우

예를 들어, 다양한 데이터 소스(파일, 데이터베이스)에서 데이터를 처리해야 할 때, 파일과 데이터베이스의 처리 과정은 유사하지만 일부 단계가 다를 수 있습니다. 이때 모든 클래스에 동일한 흐름을 반복해서 구현하면 유지보수가 어렵고 코드가 복잡해집니다.

### 해결 방법: 템플릿 메서드 패턴 적용

상위 클래스 정의

```java
abstract class DataProcessor {

    // 템플릿 메서드: 알고리즘의 전체 구조를 정의
    public final void process() {
        readData();
        processData();
        saveData();
    }

    // 추상 메서드: 하위 클래스가 구현할 부분
    protected abstract void readData();
    protected abstract void processData();

    // 공통된 구현: 모든 하위 클래스가 동일하게 사용하는 메서드
    protected void saveData() {
        System.out.println("Saving data...");
    }
}
```

하위 클래스 구현 - 파일 처리

```java
class FileProcessor extends DataProcessor {

    @Override
    protected void readData() {
        System.out.println("Reading data from a file...");
    }

    @Override
    protected void processData() {
        System.out.println("Processing file data...");
    }
}
```

하위 클래스 구현 - 데이터베이스 처리

```java
class DatabaseProcessor extends DataProcessor {

    @Override
    protected void readData() {
        System.out.println("Reading data from the database...");
    }

    @Override
    protected void processData() {
        System.out.println("Processing database data...");
    }
}
```

클라이언트 코드

```java
public class Main {

    public static void main(String[] args) {
        DataProcessor fileProcessor = new FileProcessor();
        fileProcessor.process();  // 파일 데이터 처리   // Reading data from a file...
                                                    // Processing file data...
                                                    // Saving data...


        System.out.println();

        DataProcessor databaseProcessor = new DatabaseProcessor();
        databaseProcessor.process();  // 데이터베이스 데이터 처리  // Reading data from the database...
                                                             // Processing database data...
                                                             // Saving data...
    }
}
```

### 템플릿 메서드 패턴의 동작 원리

1. 템플릿 메서드는 알고리즘의 전체 흐름을 고정합니다.
2. 추상 메서드는 하위 클래스가 구현하도록 강제합니다.
3. 공통된 코드는 상위 클래스에 두어 코드 중복을 제거합니다.
4. 하위 클래스는 알고리즘의 일부 단계를 자신의 방식으로 재정의할 수 있습니다.

### 템플릿 메서드 패턴의 장단점

장점

- 코드 재사용성 증가: 공통된 로직을 상위 클래스에 정의하여 중복을 제거합니다.
- 유연성 향상: 알고리즘의 일부 단계만 하위 클래스에서 구현하므로 확장과 수정이 용이합니다.
- 유지보수 용이: 알고리즘의 구조를 한 곳에서 관리하므로 수정이 쉽습니다.

단점

- 상속에 의존: 하위 클래스가 상위 클래스에 강하게 의존하므로, 구성을 통한 확장이 어렵습니다.
- 클래스 수 증가: 다양한 변형을 구현하기 위해 여러 하위 클래스를 만들어야 할 수 있습니다.
- 알고리즘이 복잡해질 수 있음: 템플릿 메서드의 단계가 많아지면 코드가 복잡해질 수 있습니다.

### 결론

템플릿 메서드 패턴은 알고리즘의 뼈대를 유지하면서도 유연하게 확장할 수 있는 강력한 패턴입니다. 이 패턴을 사용하면 공통된 부분은 상위 클래스에서 관리하고, 구체적인 구현은 하위 클래스에서 정의하여 코드의 중복을 줄이고 유지보수성을 향상시킵니다.

하지만, 이 패턴은 상속에 의존하기 때문에 구성을 통한 확장이 어려울 수 있으며, 단순한 문제에 사용하면 오히려 복잡성을 증가시킬 수 있습니다. GUI 애플리케이션, 테스트 프레임워크, 웹 요청 처리 등 다양한 분야에서 자주 사용됩니다.
