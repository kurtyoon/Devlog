---
title: "[Design Pattern] GoF의 23가지 디자인 패턴을 쉽게 풀어보자 - 5"
layout: post
author: kurtyoon # 작성자
banner: https://i.esdrop.com/d/f/hhaNifrpr0/y7rzO6qSLk.jpg # 배너 이미지
categories:
  - Design Pattern
tags:
  - Design Pattern
article: "프로토타입 패턴을 쉽게 풀어보자" # 포스트 내용 함축
date: "2024-10-19 18:53 +0900"
sidebar: []
published: true
comments: true
---

## 프로토타입(Prototype) 패턴

프로토타입 패턴은 **기존 객체를 복제(clone)**하여 새로운 객체를 생성하는 디자인 패턴입니다. 이 패턴은 객체를 직접 생성하는 대신, 원본 객체를 복제하여 사용함으로써 객체 생성의 비용을 줄이고 성능을 향상시킵니다. 특히 비싼 리소스를 사용하는 객체(예: 데이터베이스 연결 객체)를 반복적으로 생성하는 대신 프로토타입을 복제하여 사용하면 효율적입니다.

### 문제점: 반복적인 객체 생성 비용과 복잡성

일반적으로 객체를 생성할 때 복잡한 초기화 과정이나 비용이 많이 드는 작업이 필요할 수 있습니다. 매번 new 키워드를 사용하여 객체를 생성하면, 이러한 비용이 누적되고 애플리케이션 성능에 영향을 줄 수 있습니다.

```java
class Book {
    private String title;
    private String author;
    private String genre;

    public Book(String title, String author, String genre) {
        // 복잡한 초기화 작업이 있다고 가정
        this.title = title;
        this.author = author;
        this.genre = genre;
        System.out.println("Book created: " + title);
    }

    @Override
    public String toString() {
        return "Book{title='" + title + "', author='" + author + "', genre='" + genre + "'}";
    }
}

public class Main {
    public static void main(String[] args) {
        // 동일한 Book 객체를 여러 번 생성해야 하는 상황
        Book book1 = new Book("채식주의자", "한강", "소설");
        Book book2 = new Book("채식주의자", "한강", "소설");
        System.out.println(book1);
        System.out.println(book2);
    }
}
```

위 코드는 객체를 생성할 때마다 동일한 초기화 작업을 반복해야 합니다. 그리고, 동일한 객체를 여러 번 생성할 때 코드가 중복됩니다. 또, 객체를 수정할 때마다 여러 생성자 호출을 수정해야 하여 확장성이 부족합니다.

### 해결 방법: 프로토타입 패턴 적용

Prototype 패턴을 사용하면 **원본 객체를 복제(clone)**하여 새로운 객체를 생성할 수 있습니다. 이를 통해 객체 생성 비용을 줄이고 코드 중복을 방지할 수 있습니다.

Java에서는 객체를 복제하기 위해 Cloneable 인터페이스와 clone() 메서드를 사용합니다.

```java
class Book implements Cloneable {
    private String title;
    private String author;
    private String genre;

    public Book(String title, String author, String genre) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        System.out.println("Book created: " + title);
    }

    // 객체 복제를 위한 clone() 메서드 구현
    @Override
    protected Book clone() {
        try {
            return (Book) super.clone();
        } catch (CloneNotSupportedException e) {
            throw new AssertionError();
        }
    }

    @Override
    public String toString() {
        return "Book{title='" + title + "', author='" + author + "', genre='" + genre + "'}";
    }
}

public class Main {
    public static void main(String[] args) {
        // 원본 객체 생성
        Book originalBook = new Book("채식주의자", "한강", "소설");

        // 복제된 객체 생성
        Book clonedBook = originalBook.clone();

        System.out.println(originalBook);
        System.out.println(clonedBook);

        System.out.println(originalBook == clonedBook);  // false (다른 인스턴스)
    }
}
```

원본 객체를 생성한 후, `clone()` 메소드를 호출해 동일한 속성을 가진 새로운 객체를 생성합니다. 객체 복제는 새로운 메모리 공간에 할당되므로 원본 객체와 복제된 객체는 서로 다른 인스턴스 입니다.

### 프로토타입 패턴의 장단점

장점

- 성능 향상: 복잡한 객체를 생성하는 대신 복제하여 사용하면 객체 생성 비용을 줄일 수 있습니다.
- 코드 중복 제거: 동일한 초기화 코드를 반복하지 않고 원본 객체를 재사용합니다.
- 확장성: 새로운 객체를 추가할 때마다 생성자를 수정할 필요 없이 기존 객체를 복제하면 됩니다.

단점

### 프로토타입 패턴에서 Deep copy와 Shallow copy

- 깊은 복사와 얕은 복사 문제: 객체 내부에 참조 타입 필드가 있는 경우, 복제 시 **깊은 복사(Deep Copy)**와 얕은 복사(Shallow Copy) 문제를 처리해야 합니다.
- Cloneable 인터페이스의 제한: Cloneable은 복제를 위한 기본 제공 인터페이스지만, 복잡한 객체에서는 직접 구현이 필요합니다.
- 가독성 저하: 객체를 복제하는 코드가 많아지면 코드의 가독성이 떨어질 수 있습니다.

깊은 복사와 얕은 복사의 차이

- 얕은 복사(Shallow Copy): 복제된 객체가 원본 객체의 참조 타입 필드를 공유합니다.
- 깊은 복사(Deep Copy): 복제된 객체가 원본 객체의 필드를 완전히 새로운 객체로 복사합니다.

깊은 복사 예제

```java
class Author implements Cloneable {
    private String name;

    public Author(String name) {
        this.name = name;
    }

    @Override
    protected Author clone() {
        try {
            return (Author) super.clone();
        } catch (CloneNotSupportedException e) {
            throw new AssertionError();
        }
    }

    @Override
    public String toString() {
        return "Author{name='" + name + "'}";
    }
}

class Book implements Cloneable {
    private String title;
    private Author author;

    public Book(String title, Author author) {
        this.title = title;
        this.author = author;
    }

    @Override
    protected Book clone() {
        Book cloned = null;
        try {
            cloned = (Book) super.clone();
            cloned.author = author.clone();  // 깊은 복사
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }
        return cloned;
    }

    @Override
    public String toString() {
        return "Book{title='" + title + "', author=" + author + "}";
    }
}
```

### 결론

Prototype 패턴은 객체를 복제하여 복잡한 객체 생성 비용을 줄이고 성능을 향상시키는 유용한 패턴입니다. 하지만, 복제 과정에서 깊은 복사와 얕은 복사 문제를 주의해야 하며, 객체 내부의 참조 타입 필드에 대한 적절한 처리가 필요합니다.
이 패턴은 객체 생성이 빈번하고, 동일한 초기화 작업이 반복되는 경우에 특히 유용하게 사용됩니다.
