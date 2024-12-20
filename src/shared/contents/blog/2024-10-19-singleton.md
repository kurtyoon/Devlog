---
title: "[Design Pattern] GoF의 23가지 디자인 패턴을 쉽게 풀어보자 - 1"
layout: post
author: kurtyoon # 작성자
banner: https://i.esdrop.com/d/f/hhaNifrpr0/y7rzO6qSLk.jpg # 배너 이미지
categories:
  - Design Pattern
tags:
  - Design Pattern
article: "싱글톤 패턴을 쉽게 풀어보자" # 포스트 내용 함축
date: "2024-10-19 18:14 +0900"
sidebar: []
published: true
comments: true
---

## 싱글톤(Singleton) 패턴

Singleton 패턴은 클래스의 인스턴스가 하나만 생성되도록 보장하는 디자인 패턴입니다. 이는 애플리케이션 전역에서 동일한 인터페이스를 공유해야 할 때 사용됩니다.

### 문제점: 다수의 인스턴스 생성 방지

일반적으로 클래스 인스턴스는 new 키워드를 사용해 여러 개 생성할 수 있습니다. 하지만 일부 객체는 여러 인스턴스가 생성되면 문제가 발생합니다. 예를 들어, 로그 기록을 위한 클래스가 여러 개의 인스턴스를 가진다면 각 인스턴스가 다른 파일에 로그를 기록할 수 있어 혼란이 생깁니다.

```java
class Logger {
    public void log(String message) {
        System.out.println("Log: " + message);
    }
}

public class Main {
    public static void main(String[] args) {
        Logger logger1 = new Logger();
        Logger logger2 = new Logger();

        System.out.println(logger1 == logger2);  // false (서로 다른 인스턴스)
    }
}
```

### 해결 방법: 싱글톤 패턴 적용

위의 `Logger` 클래스에 Singleton 패턴을 적용하여 인스턴스가 하나만 생성되도록 만듭니다. 이때, `getInstance()` 메서드를 통해 인스턴스를 제공합니다.

```java
class Logger {
    private static Logger instance;

    // 생성자를 private으로 선언하여 외부에서 인스턴스 생성 방지
    private Logger() {}

    // 정적 메서드로 유일한 인스턴스를 제공
    public static Logger getInstance() {
        if (instance == null) {
            instance = new Logger();
        }
        return instance;
    }

    public void log(String message) {
        System.out.println("Log: " + message);
    }
}

public class Main {
    public static void main(String[] args) {
        Logger logger1 = Logger.getInstance();
        Logger logger2 = Logger.getInstance();

        System.out.println(logger1 == logger2);  // true (같은 인스턴스)
        logger1.log("Singleton Pattern Example");  // Log: Singleton Pattern Example
    }
}
```

### 싱글톤 패턴의 변형

그런데 위의 코드는 멀티스레드 환경에서 여러 스레드가 동시에 `getInstance()`를 호출할 경우 여러 인스턴스가 생성될 수 있는 문제가 있습니다.

이를 해결하기 위한 여러 방법을 살펴봅시다.

첫번째는 `synchronized` 키워드를 사용하는 방법입니다.

```java
class Logger {
    private static Logger instance;

    private Logger() {}

    public static synchronized Logger getInstance() {
        if (instance == null) {
            instance = new Logger();
        }
        return instance;
    }
}
```

그런데 `synchronized` 키워드는 성능에 영향을 줄 수 있습니다. 모든 호출에 대해 스레드 동기화가 필요하지 않기 때문입니다.

두번째는 Eager Initialization을 사용하는 방법입니다.

```java
class Logger {

    // 클래스가 로드될 때 인스턴스 생성
    private static final Logger instance = new Logger();

    private Logger() {}

    public static Logger getInstance() {
        return instance;
    }
}
```

간단한 구현이며 thread-safe합니다. 그러나, 인스턴스가 필요하지 않아도 생성되므로 불필요한 메모리 사용이 발생할 수 있습니다.

세 번째는 double-checked locking 방법입니다.

```java
class Logger {

    private static volatile Logger instance;

    private Logger() {}

    public static Logger getInstance() {
        if (instance == null) {
            synchronized (Logger.class) {
                if (instance == null) {
                    instance = new Logger();
                }
            }
        }
        return instance;
    }
}
```

첫 번째 검사에서 이미 인스턴스가 생성된 경우, 불필요한 동기화를 피할 수 있어 성능 향상에 유리합니다. 이때, `volatile` 키워드는 인스턴스 생성이 메모리에서 올바르게 처리되도록 보장하는 키워드입니다.

### 싱글톤 패턴의 장단점

이러한 싱글톤 패턴의 장점은 무엇일까요?

우선 하나의 인스턴스만 존재하므로 데이터의 일관성을 보장합니다. 또한 동일한 객체를 반복 생성하지 않고 재사용하여 메모리 절약이 가능하며, 전역에서 인스턴스에 접근할 수 있습니다.

그러나 단점도 존재하겠죠?

싱글톤 객체는 상태를 유지하기 때문에 단위 테스트에서 독립적인 테스트가 어렵고, 잘못된 구현은 스레드 안정성 문제를 초래할 수 있습니다. 또한, 강한 결합을 초래할 수 있어 Dependency Injection과 충돌할 수 있습니다.

### 결론

싱글톤 패턴은 인스턴스의 일관성을 유지하고 전역 접근을 보장해야 할 때 유용한 패턴입니다. 하지만 멀티스레드 환경에서의 스레드 안전성 문제와 테스트의 어려움을 해결하기 위해 신중하게 구현해야 합니다. 특히 Double-Checked Locking이나 이른 초기화를 통해 스레드 안전성을 확보하는 것이 중요합니다.
