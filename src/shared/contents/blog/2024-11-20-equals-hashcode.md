---
title: "[Java] Java 해체 분석기 - 1, equals와 hashcode"
layout: post
author: kurtyoon # 작성자
banner: https://i.esdrop.com/d/f/hhaNifrpr0/JYBuZN8W0M.png # 배너 이미지
categories:
  - Java
tags:
  - Java
article: "equals랑 hashcode 해체분석" # 포스트 내용 함축
date: "2024-11-20 21:42 +0900"
sidebar: []
published: true
comments: true
---

자바 해체분석기 첫 시간에 컬렉션을 살펴보며 아래의 두 메서드를 발견했다.

면접 탈락의 가장 큰 원인인 아래 두 메서드를 알아보자..

### Equals

```java
boolean equals(Object o);
```

equals 메서드는 두 객체가 "같은지" 비교하는 메서드이다.

기본적으로, Object 클래스에서 제공하는 equals 메서드는 두 객체의 참조값을 비교한다. 그러나, 컬렉션에서는 객체의 값을 비교하도록 재정의한다.

equals 메서드는 다음과 같은 제약사항을 가지고 있다.

1. 대칭성 (Symmetric): `a.equals(b)`가 `true`라면, `b.equals(a)`도 `true`여야 한다.
2. 반사성 (Reflexive): `a.equals(a)`는 항상 `true`여야 한다.
3. 일관성 (Consistent): 두 객체가 같다면, 상태가 변하지 않는 한 여러 번 호출해도 항상 `true`여야 한다.
4. null 비교: `a.equals(null)`은 항상 `false`여야 한다.

### HashCode

```java
int hashCode();
```

hashCode는 객체를 식별하기 위해 반환되는 정수값이다. 이는 주로 해시 기반의 컬렉션에서 요소의 저장 및 검색 성능을 최적화하기 위해 사용된다.

hashCode 메서드는 다음과 같은 제약사항을 가지고 있다.

1. 일관성 (Consistent): 객체의 상태가 변하지 않는 한 여러 번 호출해도 항상 같은 값을 반환해야 한다.
2. equals와의 관계:
   - 두 객체가 같다면(equals가 `true`를 반환한다면), 두 객체의 hashCode 값도 같아야 한다.
   - hashCode가 같더라도 equals가 `true`를 반환하지 않을 수 있다. 즉, 충돌 가능하다.
3. 해시 충돌: 서로 다른 객체가 동일한 hashCode를 가질 수 있다. 이 경우 equals 메서드로 두 객체를 비교해야 한다.

### equals와 hashCode의 관계

Collection은 인터페이스이고, 이를 구현하는 클래스들은 equals와 hashCode 메서드를 재정의해야 한다.
equals와 hashCode는 서로 연관되어 있기 때문에, 두 메서드를 함께 재정의해야 한다.

한쪽만 재정의할 경우, 컬렉션의 동작이 예상과 다를 수 있다.

equals를 재정의하는 경우, hashCode도 일관되게 재정의해야 하며, 만약, 두 객체가 equals가 `true`를 반환한다면, 두 객체의 hashCode 값도 같아야 한다.
hashCode를 재정의하는 경우, 고유성을 최대한 보장하도록 해야한다. 즉, 서로 다른 객체는 다른 hashCode 값을 가져야 한다.
