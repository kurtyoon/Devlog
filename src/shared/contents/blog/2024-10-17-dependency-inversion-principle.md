---
title: "[OOP] SOLID를 가장 간단명료하게 풀어보자 - 5"
layout: post
author: kurtyoon # 작성자
banner: https://i.esdrop.com/d/f/hhaNifrpr0/ukThTOpYpE.jpg # 배너 이미지
categories:
  - OOP
tags:
  - OOP
article: "Dependency Inversion Principle을 쉽게 풀어보자" # 포스트 내용 함축
date: "2024-10-17 12:13 +0900"
sidebar: []
published: true
comments: true
---

## Dependency Inversion Principle

> 추상화에 의존하고, 구체화에 의존하지 마세요. - Robert C.Martin

이 게시물에서는 종속성 주입과 혼동해서는 안되는 종속성 역전 원칙에 대해 살펴보겠습니다.

종속성 주입은 역전 원칙의 한 형태일뿐입니다. 실제 원칙은 추상화에 의존하고 클래스를 분리하는 것입니다.

아시다시피, 강하게 결합된 코드는 의존성으로 인해 테스트하기 어렵고, 런타임에 구현을 바꿀 수 없음을 의미합니다.

나쁜 예를 통해 먼저 살펴보겠습니다.

```java
import java.util.UUID;

class Database {
    public <T> T runQuery(String query, Object parameters, Class<T> type) {
        try {
            return type.getDeclaredConstructor().newInstance();
        } catch (Exception e) {
            throw new RuntimeException("Failed to create a new instance of " + type.getName(), e);
        }
    }
}

class Hotel {
    private UUID id;
    private String name;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

class Repository {
    private final Database database;

    public Repository() {
        this.database = new Database();
    }

    public Hotel getHotel(UUID guid) {
        String query = "SELECT * FROM Hotel WHERE HotelId = ?";
        Object parameters = new Object[]{guid};
        return database.runQuery(query, parameters, Hotel.class);
    }
}
```

이제 두 개의 데이터베이스를 런타입에 연결해야 하는 상황입니다. 하나는 새로 생성된 데이터베이스이고, 다른 하나는 기존 애플리케이션에서 사용 중인 데이터베이스로, 모든 새 데이터가 새 데이터베이스에 저장됩니다. 이제 애플리케이션의 데이터베이스와 새 데이터베이스 모두에 접근해야 합니다.

Repository가 특정 데이터베이스에 강하게 결합된 구조일 때, 어떻게 처리해야 할까요? 새로운 데이터베이스에 접근하기 위해 별도의 Repository를 만들어야 할까요?

종속성 역전의 원칙을 사용해서 데이터베이스를 Repository에 주입할 수 있습니다. 이러한 경우 더이상 런타임에 하나의 데이터베이스에 의존하지 않게 됩니다. 더 나아가서 데이터베이스의 추상화에 의존할 수 있습니다.

```java
import java.util.UUID;

public interface IDatabase {
    <T> T runQuery(String query, Object parameters, Class<T> clazz);
}

public class Database implements IDatabase {
    @Override
    public <T> T runQuery(String query, Object parameters, Class<T> clazz) {
        try {
            return clazz.getDeclaredConstructor().newInstance();
        } catch (Exception e) {
            throw new RuntimeException("Query execution failed", e);
        }
    }
}

public class Hotel {
    private UUID id;
    private String name;

    public Hotel() {
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

public class Repository {
    private final IDatabase database;

    public Repository(IDatabase database) {
        this.database = database;
    }

    public Hotel getHotel(UUID guid) {
        String query = "SELECT * FROM Hotel WHERE HotelId = {hotelId}";
        Object parameters = new Object() {
            public final UUID hotelId = guid;
        };

        return database.runQuery(query, parameters, Hotel.class);
    }
}
```

더 결합을 느슨하게 하고 싶다면, SQL 코드를 제거하여 해당 코드를 변경해도 Repository가 변경되지 않는 다른 곳에 구현하는 것이 더 좋습니다.

D는 do를 의미합니다. 이 원칙을 반드시 따라야 합니다.

가능한 코드를 분리하는 것이 중요합니다. 이렇게 하면 시간이 지나도 변하지 않는 유연한 코드를 작성할 수 있습니다.

종속성 주입은 아마도 의존성 역전 원칙을 구현하는 가장 잘 알려진 방법이자 가장 쉬운 방법입니다.
