---
title: "[Design Pattern] GoF의 23가지 디자인 패턴을 쉽게 풀어보자 - 8"
layout: post
author: kurtyoon # 작성자
banner: https://i.esdrop.com/d/f/hhaNifrpr0/y7rzO6qSLk.jpg # 배너 이미지
categories:
  - Design Pattern
tags:
  - Design Pattern
article: "복합체 패턴을 쉽게 풀어보자" # 포스트 내용 함축
date: "2024-10-19 19:20 +0900"
sidebar: []
published: true
comments: true
---

## 복합체(Composite) 패턴

복합체(Composite) 패턴은 트리 구조를 사용해 객체들을 계층적으로 구성하고, 개별 객체와 복합 객체를 동일하게 다루기 위해 사용하는 구조적 디자인 패턴입니다. 이 패턴은 객체들이 부분-전체(Part-Whole) 관계를 가질 때 유용합니다. 즉, 단일 객체와 복합 객체를 클라이언트 코드에서 동일한 방식으로 처리할 수 있습니다.

### 문제점: 개별 객체와 복합 객체를 다르게 처리해야 할 때

예를 들어, 파일 시스템에서 파일과 폴더를 처리해야 한다고 가정해봅시다. 파일은 개별 객체로 동작합니다. 폴더는 여러 파일과 다른 폴더를 포함하는 복합 객체로 동작합니다. 클라이언트가 파일과 폴더를 별도로 처리해야 한다면 코드가 복잡해지고 유지보수가 어려워집니다.

```java
class File {
    private String name;

    public File(String name) {
        this.name = name;
    }

    public void display() {
        System.out.println("File: " + name);
    }
}

class Folder {
    private String name;
    private List<File> files = new ArrayList<>();

    public Folder(String name) {
        this.name = name;
    }

    public void addFile(File file) {
        files.add(file);
    }

    public void display() {
        System.out.println("Folder: " + name);
        for (File file : files) {
            file.display();
        }
    }
}

public class Main {
    public static void main(String[] args) {
        File file1 = new File("file1.txt");
        File file2 = new File("file2.txt");

        Folder folder = new Folder("직박구리");
        folder.addFile(file1);
        folder.addFile(file2);

        folder.display();  // Folder와 File을 별도로 처리해야 함
    }
}
```

문제점

- 구조적인 복잡성: 클라이언트가 개별 객체(파일)와 복합 객체(폴더)를 각각 다르게 처리해야 합니다.
- 확장성 부족: 폴더 안에 다른 폴더를 포함하거나, 개별 파일과 폴더를 동일한 방식으로 처리하기 어렵습니다.

### 복합체 패턴 적용

Composite 패턴을 사용하면 개별 객체와 복합 객체를 동일한 인터페이스로 처리할 수 있습니다. 이로써 클라이언트 코드가 단순화되고, 개별 객체와 복합 객체를 유연하게 구성할 수 있습니다.

공통 인터페이스 정의

```java
interface FileSystemComponent {
    void display();
}
```

개별 객체 클래스 정의

```java
class File implements FileSystemComponent {
    private String name;

    public File(String name) {
        this.name = name;
    }

    @Override
    public void display() {
        System.out.println("File: " + name);
    }
}
```

복합 객체 클래스 정의

```java
class Folder implements FileSystemComponent {
    private String name;
    private List<FileSystemComponent> components = new ArrayList<>();

    public Folder(String name) {
        this.name = name;
    }

    public void addComponent(FileSystemComponent component) {
        components.add(component);
    }

    @Override
    public void display() {
        System.out.println("Folder: " + name);
        for (FileSystemComponent component : components) {
            component.display();
        }
    }
}
```

클라이언트 코드

```java
public class Main {
    public static void main(String[] args) {
        // 개별 파일 생성
        File file1 = new File("file1.txt");
        File file2 = new File("file2.txt");

        // 폴더 생성 및 파일 추가
        Folder folder = new Folder("직박구리");
        folder.addComponent(file1);
        folder.addComponent(file2);

        // 폴더 안에 또 다른 폴더 생성
        Folder nestedFolder = new Folder("딱따구리");
        nestedFolder.addComponent(new File("file3.txt"));
        folder.addComponent(nestedFolder);

        // 동일한 인터페이스로 처리
        folder.display();
    }
}
```

### 복합체 패턴의 장단점

장점

- 클라이언트 코드 단순화: 개별 객체와 복합 객체를 동일한 방식으로 처리할 수 있습니다.
- 유연성: 복합 객체 안에 다른 복합 객체를 포함하는 재귀적인 구조를 쉽게 구현할 수 있습니다.
- 확장성 향상: 새로운 객체나 복합 객체를 추가해도 클라이언트 코드를 수정할 필요가 없습니다.

단점

- 복잡성 증가: 구조가 커질수록 코드의 복잡도가 증가할 수 있습니다.
- 객체 관리 어려움: 복합 객체와 개별 객체가 섞여 있을 때, 각 객체를 추적하고 관리하는 비용이 증가할 수 있습니다.

### 결론

Composite 패턴은 부분-전체(Part-Whole) 관계를 계층적으로 표현할 수 있는 강력한 패턴입니다. 이 패턴을 사용하면 클라이언트 코드가 단순화되고, 개별 객체와 복합 객체를 유연하게 조합할 수 있습니다. 다만, 구조가 커질수록 복잡성이 증가할 수 있으므로 적절한 설계가 필요합니다.
