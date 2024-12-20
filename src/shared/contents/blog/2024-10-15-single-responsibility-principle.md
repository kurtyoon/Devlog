---
title: "[OOP] SOLID를 가장 간단명료하게 풀어보자 - 1"
layout: post
author: kurtyoon # 작성자
banner: https://i.esdrop.com/d/f/hhaNifrpr0/ukThTOpYpE.jpg # 배너 이미지
categories:
  - OOP
tags:
  - OOP
article: "Single Responsibility Principle을 쉽게 풀어보자" # 포스트 내용 함축
date: "2024-10-15 16:35:00 +0900"
sidebar: []
published: true
comments: true
---

## Single Responsibility Principle

> 클래스는 변경해야 할 이유가 하나뿐이어야 합니다. - Robert C.Martin

Single Responsibility Principel. 단어 그대로 단일 책임 원칙을 의미합니다. 즉, 각 클래스가 오직 한 가지에 대해서만 책임을 가져야 한다는 의미입니다.

예시를 통해서 살펴보는게 더 간단할 것 같습니다.

```java
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class MyObject {
    private int myInt;

    public MyObject(int myInt) {
        this.myInt = myInt;
    }

    public int getMyInt() {
        return myInt;
    }

    public void setMyInt(int myInt) {
        this.myInt = myInt;
    }
}

public class MyTransformedObject {
    private String myInt;

    public MyTransformedObject(String myInt) {
        this.myInt = myInt;
    }

    public String getMyInt() {
        return myInt;
    }

    public void setMyInt(String myInt) {
        this.myInt = myInt;
    }
}

public class MyBusinessLogicClass {
    private final List<MyTransformedObject> objects = new ArrayList<>();

    public void addToList(List<MyObject> list) {
        list.forEach(obj -> obj.setMyInt(obj.getMyInt() + 10));

        List<MyTransformedObject> transformedList = list.stream()
            .map(obj -> new MyTransformedObject(String.valueOf(obj.getMyInt())))
            .collect(Collectors.toList());

        objects.addAll(transformedList);
    }
}
```

객체 목록이 있다고 가정해봅시다. 이 목록에 비즈니스 로직을 적용하고, 해당 로직에 따라 매핑한 후, 그 결과를 클래스에 리스트에 추가한다고 합니다.

겉보기에는 간단해 보입니다. 테스트도 가능하고, 모든 로직이 한 곳에 집중되어 있으니 구현도 단순합니다.

그런데 시스템이 더 복잡해지는 경우에는 어떤일이 벌어질까요?

위 코드에서는 매핑의 변경, 비즈니스 로직의 변경, 그리고 리스트에 추가하는 방법의 변경 총 세가지의 변경이 존재합니다. 한 번에 세 가지 작업을 진행하기 때문에 단일 책임 원칙을 위반하고 있습니다.

'Martin'은 "클래스는 변경할 이유가 단 하나만 존재해야 한다"는 원칙을 적용해보겠습니다.

처음에는 매핑을 밖으로 빼내봅시다.

```java
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class MyObject {
    private int myInt;

    public MyObject(int myInt) {
        this.myInt = myInt;
    }

    public int getMyInt() {
        return myInt;
    }

    public void setMyInt(int myInt) {
        this.myInt = myInt;
    }
}

public class MyTransformedObject {
    private String myInt;

    public MyTransformedObject(String myInt) {
        this.myInt = myInt;
    }

    public String getMyInt() {
        return myInt;
    }

    public void setMyInt(String myInt) {
        this.myInt = myInt;
    }
}

public class MyObjectMapper {
    public MyTransformedObject map(MyObject obj) {
        return new MyTransformedObject(String.valueOf(obj.getMyInt()));
    }
}

public class MyBusinessLogicClass {
    private final List<MyTransformedObject> objects = new ArrayList<>();
    private final MyObjectMapper mapper;

    public MyBusinessLogicClass(MyObjectMapper mapper) {
        this.mapper = mapper;
    }

    public void addToList(List<MyObject> list) {
        list.forEach(obj -> obj.setMyInt(obj.getMyInt() + 10));

        List<MyTransformedObject> transformedList = list.stream()
            .map(mapper::map)
            .collect(Collectors.toList());

        objects.addAll(transformedList);
    }
}
```

그 다음으로는 비즈니스 로직을 꺼내볼까요?

```java
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class MyObject {
    private int myInt;

    public MyObject(int myInt) {
        this.myInt = myInt;
    }

    public int getMyInt() {
        return myInt;
    }

    public void setMyInt(int myInt) {
        this.myInt = myInt;
    }
}

public class MyTransformedObject {
    private String myInt;

    public MyTransformedObject(String myInt) {
        this.myInt = myInt;
    }

    public String getMyInt() {
        return myInt;
    }

    public void setMyInt(String myInt) {
        this.myInt = myInt;
    }
}

public class MyObjectMapper {
    public MyTransformedObject map(MyObject obj) {
        return new MyTransformedObject(String.valueOf(obj.getMyInt()));
    }
}

public class MyBusinessLogicClass {
    public void doLogic(MyObject obj) {
        obj.setMyInt(obj.getMyInt() + 10);
    }
}

public class MyListClass {
    private final List<MyTransformedObject> objects = new ArrayList<>();
    private final MyObjectMapper mapper;
    private final MyBusinessLogicClass businessLogic;

    public MyListClass(MyObjectMapper mapper, MyBusinessLogicClass businessLogic) {
        this.mapper = mapper;
        this.businessLogic = businessLogic;
    }

    public void addToList(List<MyObject> list) {
        list.forEach(businessLogic::doLogic);

        List<MyTransformedObject> localList = list.stream()
                .map(mapper::map)
                .collect(Collectors.toList());

        objects.addAll(localList);
    }
}
```

마지막으로 비즈니스 로직 클래스에서 리스트를 다룰 수 있게 해보면 아래 코드와 같습니다.

```java
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class MyObject {
    private int myInt;

    public MyObject(int myInt) {
        this.myInt = myInt;
    }

    public int getMyInt() {
        return myInt;
    }

    public void setMyInt(int myInt) {
        this.myInt = myInt;
    }
}

public class MyTransformedObject {
    private String myInt;

    public MyTransformedObject(String myInt) {
        this.myInt = myInt;
    }

    public String getMyInt() {
        return myInt;
    }

    public void setMyInt(String myInt) {
        this.myInt = myInt;
    }
}

public class MyObjectMapper {

    public MyTransformedObject map(MyObject obj) {
        return new MyTransformedObject(String.valueOf(obj.getMyInt()));
    }

    public List<MyTransformedObject> map(List<MyObject> list) {
        return list.stream()
                   .map(this::map)
                   .collect(Collectors.toList());
    }
}

public class MyBusinessLogicClass {

    public void doLogic(MyObject obj) {
        obj.setMyInt(obj.getMyInt() + 10);
    }

    public void doLogic(List<MyObject> list) {
        list.forEach(this::doLogic);
    }
}

public class MyListClass {
    private final List<MyTransformedObject> objects = new ArrayList<>();
    private final MyObjectMapper mapper;
    private final MyBusinessLogicClass businessLogic;

    public MyListClass(MyObjectMapper mapper, MyBusinessLogicClass businessLogic) {
        this.mapper = mapper;
        this.businessLogic = businessLogic;
    }

    public void addToList(List<MyObject> list) {
        businessLogic.doLogic(list);

        List<MyTransformedObject> localList = mapper.map(list);
        objects.addAll(localList);
    }
}
```

이제 `MyListClass` 클래스가 바뀌는 유일한 경우는 리스트에 항목을 추가하는 방식이 바뀌는 경우만 존재합니다. 예를 들어, 값을 더하는 비즈니스 로직이 변경되어도 `MyListClass`는 변경될 필요가 없습니다. 마찬가지로, 매핑 로직이 변경되어도 동일합니다.

이렇게 로직들이 따로 분리됨으로써 코드의 확장성과 유지보수성이 크게 향상됩니다.
