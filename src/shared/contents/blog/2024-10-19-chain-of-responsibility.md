---
title: "[Design Pattern] GoF의 23가지 디자인 패턴을 쉽게 풀어보자 - 13"
layout: post
author: kurtyoon # 작성자
banner: https://i.esdrop.com/d/f/hhaNifrpr0/y7rzO6qSLk.jpg # 배너 이미지
categories:
  - Design Pattern
tags:
  - Design Pattern
article: "책임 연쇄 패턴을 쉽게 풀어보자" # 포스트 내용 함축
date: "2024-10-19 20:42 +0900"
sidebar: []
published: true
comments: true
---

## 책임 연쇄(Chain of Responsibility) 패턴

책임 연쇄 패턴은 여러 처리 객체들이 연결된 체인 형태로 요청을 처리하는 디자인 패턴입니다.

이 패턴에서는 각 객체가 처리할 수 있는지 확인하고, 처리할 수 없으면 다음 객체에게 요청을 넘겨줍니다. 이로써 각 객체가 자신의 책임만 처리하도록 하며, 유연하게 요청 처리 순서를 관리할 수 있습니다.

### 문제점: 여러 처리자가 요청을 처리해야 할 때 발생하는 복잡성

여러 객체가 연속적으로 요청을 처리해야 하는 경우, 각 객체가 스스로 처리할 수 있는지 확인하고 다음 객체에 명시적으로 전달해야 합니다.

이렇게 구현하면 코드가 복잡해지고 유지보수가 어려워질 수 있습니다.

```java
class AuthHandler {

    public boolean handle(String request) {
        if (request.equals("AUTH")) {
            System.out.println("AuthHandler: 처리 완료");
            return true;
        }
        return false;
    }
}

class LoggingHandler {

    public boolean handle(String request) {
        if (request.equals("LOG")) {
            System.out.println("LoggingHandler: 처리 완료");
            return true;
        }
        return false;
    }
}

public class Main {

    public static void main(String[] args) {
        AuthHandler authHandler = new AuthHandler();
        LoggingHandler loggingHandler = new LoggingHandler();

        String request = "LOG";

        // 명시적으로 핸들러 호출
        if (!authHandler.handle(request)) {
            loggingHandler.handle(request);
        }
    }
}
```

문제점

- 유연성 부족: 핸들러의 순서를 변경하거나 새로운 핸들러를 추가할 때 코드를 수정해야 합니다.
- 중복 코드 증가: 각 핸들러에서 다음 핸들러를 수동으로 호출해야 합니다.
- 확장성 문제: 여러 핸들러가 추가되면 요청 전달 코드가 복잡해집니다.

### 해결 방법: 책임 연쇄 패턴 적용

책임 연쇄 패턴을 사용하면, 핸들러들이 체인 형태로 연결됩니다. 각 핸들러는 스스로 요청을 처리하거나 다음 핸들러에게 자동으로 요청을 넘깁니다.

이를 통해 코드의 유연성과 확장성을 높일 수 있습니다.

핸들러 인터페이스 정의

```java
abstract class Handler {

    protected Handler next;  // 다음 핸들러를 가리키는 참조

    public void setNext(Handler next) {
        this.next = next;
    }

    public abstract void handle(String request);
}
```

구체적인 핸들러 클래스 구현

```java
class AuthHandler extends Handler {

    @Override
    public void handle(String request) {
        if (request.equals("AUTH")) {
            System.out.println("AuthHandler: 처리 완료");
        } else if (next != null) {
            next.handle(request);  // 다음 핸들러에게 요청 전달
        }
    }
}

class LoggingHandler extends Handler {

    @Override
    public void handle(String request) {
        if (request.equals("LOG")) {
            System.out.println("LoggingHandler: 처리 완료");
        } else if (next != null) {
            next.handle(request);  // 다음 핸들러에게 요청 전달
        }
    }
}

class ErrorHandler extends Handler {

    @Override
    public void handle(String request) {
        System.out.println("ErrorHandler: 요청 처리 불가");
    }
}
```

클라이언트 코드

```java
public class Main {

    public static void main(String[] args) {
        // 핸들러 체인 구성
        Handler authHandler = new AuthHandler();
        Handler loggingHandler = new LoggingHandler();
        Handler errorHandler = new ErrorHandler();

        authHandler.setNext(loggingHandler);
        loggingHandler.setNext(errorHandler);

        // 요청 처리
        authHandler.handle("LOG");  // LoggingHandler: 처리 완료
        authHandler.handle("AUTH");  // AuthHandler: 처리 완료
        authHandler.handle("UNKNOWN");  // ErrorHandler: 요청 처리 불가
    }
}
```

### 책임 연쇄 패턴의 작동 원리

1. 핸들러 객체가 체인 형태로 연결됩니다.
2. 클라이언트는 첫 번째 핸들러에 요청을 전달합니다.
3. 각 핸들러는 요청을 처리하거나 다음 핸들러에 전달합니다.
4. 요청이 체인의 끝까지 전달될 수 있으며, 마지막 핸들러가 요청을 처리할 수 없을 경우 적절한 조치를 취합니다.

### 책임 연쇄 패턴의 장단점

장점

- 유연한 확장성: 핸들러를 쉽게 추가하거나 제거할 수 있습니다.
- 코드 재사용성 향상: 각 핸들러는 독립적이므로 재사용이 용이합니다.
- 클라이언트 코드 단순화: 클라이언트는 핸들러의 구현 세부 사항을 알 필요 없이 요청을 보낼 수 있습니다.

단점

- 요청 전달 비용 증가: 체인의 길이가 길어질수록 요청 전달 비용이 증가할 수 있습니다.
- 디버깅 어려움: 체인을 따라 요청이 전달되므로 요청 흐름을 추적하기 어렵습니다.
- 모든 요청이 처리될 보장은 없음: 체인의 끝까지 전달되더라도 적절한 핸들러가 없을 수 있습니다.

### 결론

책임 연쇄 패턴은 요청 처리의 유연성을 높이고 코드의 재사용성을 향상시키는 강력한 패턴입니다. 각 핸들러는 자신의 책임만을 처리하며, 요청을 다음 핸들러에 넘김으로써 연속적인 처리가 가능해집니다.

다만, 체인의 길이가 길어질수록 성능 문제가 발생할 수 있으며, 디버깅이 어려울 수 있습니다. 이 패턴은 이벤트 핸들링, 로깅, 인증 시스템 등 연속적인 작업 처리가 필요한 시스템에서 특히 유용합니다
