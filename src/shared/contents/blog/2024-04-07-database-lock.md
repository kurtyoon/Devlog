---
title: "[Database] Database Lock"
layout: post
author: kurtyoon # 작성자
banner: https://i.esdrop.com/d/f/hhaNifrpr0/tdym8uA1d2.jpg # 배너 이미지
categories:
  - Database
tags:
  - Database
article: "Database Lock" # 포스트 내용 함축
date: "2024-04-07 19:58:00 +0900"
sidebar: []
published: true
comments: true
---

### 트랜잭션

데이터베이스에서의 트랜잭션이란 데이터베이스에서 수행하는 작업의 논리적인 단위를 의미하며, 하나의 트랜잭션은 데이터베이스에서 일련의 작업들을 포함하며 이러한 작업들은 모두 성공적으로 수행되거나 실패해야 한다.

데이터베이스에서 트랜잭션은 아래의 4가지 특성을 가진다.

1. Atomicity (원자성)

![Screenshot 2024-04-07 at 7.16.28 PM.png](https://i.esdrop.com/d/f/hhaNifrpr0/JEG6tvRMk7.png)

트랜잭션은 논리적으로 하나의 실행 단위여야 하고 물리적으로 여러 개의 Statement로 구성되어 있다 하더라도 논리적인 단위로 묶일 수 있어야 한다.

하나의 실행 단위라면 두 개의 상태로 귀결되는데, 성공하거나 또는 실패하거나이다.

즉, 여러 개의 Statement로 작성되어있다 하더라도 하나의 트랜잭션으로 묶인다면 한 트랜잭션 내에서 실행한 작업들은 하나의 작업으로 간주하고 모두 성공 혹은 실패되어야 한다는 것이다.

2. Consistency (일관성)

![Screenshot 2024-04-07 at 7.18.12 PM.png](https://i.esdrop.com/d/f/hhaNifrpr0/P3TJ8YL6Xw.png)

트랜잭션의 작업 처리 결과가 항상 일관성이 있어야 하며, 트랜잭션이 진행되는 동안 데이터베이스가 변경되더라도 업데이트된 데이터베이스로 트랜잭션이 진행되는 것이 아니라, 처음에 트랜잭션을 진행하기 위해 참조한 데이터베이스로 진행된다.

3. Isolation (격리성)

![Screenshot 2024-04-07 at 7.19.15 PM.png](https://i.esdrop.com/d/f/hhaNifrpr0/9W2gEbxhQM.png)

둘 이상의 트랜잭션이 동시에 실행되고 있을 경우, 어떤 하나의 트랜잭션이라도 다른 트랜잭션의 연산에 끼어들 수 없다.

수행 중인 트랜잭션은 완전히 완료될 때까지 다른 트랜잭션에서 수행 결과를 참조할 수 없다.

즉, 동시에 실행되는 트랜잭션들이 서로 영향을 미치지 않도록 격리해야한다는 것이다.

4. Durability (지속성)

트랜잭션이 성공적으로 완료되었을 경우, 그 결과는 데이터베이스에 영속적으로 저장, 반영되어야 한다. 또한 트랜잭션이 실패되더라도 그 상태가 일관되게 유지되어야 한다.

### 트랜잭션 격리성

격리성은 “실행 중인 트랜잭션의 중간 결과를 다른 트랜잭션이 접근할 수 없다”라고 하였으나, 막연히 접근할 수 없다라기 보다는 일반적으로 접근 레벨이 존재하고, DB에 따라 설정이 가능하다.

이러한 격리성 접근 레벨은 강하게 처리할 수도 있고, 약하게 처리할 수도 있다.

이러한 격리성으로 인해 발생할 수 있는 문제는 아래와 같다.

1. Dirty Read

Dirty Read는 다른 트랜잭션에 의해 수정되었지만, 아직 커밋되지 않은 데이터를 읽는 것을 말한다.

![Screenshot 2024-04-07 at 7.29.33 PM.png](https://i.esdrop.com/d/f/hhaNifrpr0/jBbPI0v4zX.png)

만약 트랜잭션1이 정상적으로 처리되지 않고 롤백될 수 있는데, 이런 경우 해당 값을 읽은 트랜잭션2는 잘못된 값을 가지고 본인의 로직을 처리하는 상태에 놓이게 된다.

즉, 트랜잭션2는 데이터 무결성이 깨진 데이터를 사용하게 된다는 것이다.

2. Non-Repeatable Read

Non-Repetable Read는 한 트랜잭션 내에서 같은 id를 가지는 행을 두 번 Read 하였는데 그 사이에 해당 값이 변경되거나 삭제되어 결과가 다르게 나타나는 현상을 말한다.

![Screenshot 2024-04-07 at 7.33.55 PM.png](https://i.esdrop.com/d/f/hhaNifrpr0/xvi3jmqCvn.png)

트랜잭션2에서 특정 행을 2번 Read 하는데 그 사이에 트랜잭션1이 해당 행을 업데이트 하거나 삭제 후에 커밋하게 되어 트랜잭션2에서 다시 Read를 하였을 때, 값이 다르게 나오는 것이다.

3. Phantom Read

Phantom Read는 한 트랜잭션 내에서 같은 쿼리를 두 번 수행하였는데, 첫 번째 쿼리에서 없던 유렁 레코드 (Phantom Record)가 두 번째 쿼리에서 나타나는 현상을 의미한다.

![Screenshot 2024-04-07 at 7.36.38 PM.png](https://i.esdrop.com/d/f/hhaNifrpr0/EUM8Wq7U9E.png)

트랜잭션2가 특정 조건으로 데이터를 검색하고 결과를 얻었으나, 다른 트랜잭션1이 해당 조건의 데이터 일부를 추가하거나 삭제하고 커밋하게 되어 아직 끝나지 않은 트랜잭션2가 해당 조건으로 데이터를 조회하면 트랜잭션 1에서 추가 혹은 삭제한 데이터가 함께 조회 혹은 누락되게 된다.

Phantom Read와 Non-Repeatable Read를 헷갈릴 수 있는데, Non-Repeatable Read는 1개의 행의 데이터 값이 변경되는 것이며, Phantom Read는 다수의 건을 요청하는 것에 대해 데이터의 값이 변경되는 것이다.

### Lock

Lock이란 데이터의 일관성을 보장하기 위한 방법이다. 오라클과 같은 고가의 DBMS를 사용하는 이유는 데이터의 무결성과 일관성을 유지하는 능력이 뛰어나기 때문이다.

Lock은 상황에 따라 크게 두 가지로 나뉘어 진다.

1. Shared Lock (공유 Lock or Read Lock)

이는 보통 데이터를 읽을 때 사용한다. 원하는 데이터에 대해 lock을 걸었지만 다른 세션에서 읽을 수는 있다. 공유 Lock을 설정한 경우 추가로 공유 lock을 설정할 수 있지만, 배타적 lock은 설정할 수 없다. 즉, 내가 보고 있는 데이터는 다른 사용자가 볼 수 있지만, 변경할 수는 없다.

2. Exclusive Lock (배타적 Lock or Write Lock)

보통 데이터를 변경할 때 사용한다. 이름과 같이 Lock이 해제되기 전까지는 다른 공유 Lock 혹은 배타적 Lock을 설정할 수 없다. 즉, 읽기와 쓰기가 불가능하다는 의미이다.

### Blocking

블로킹은 Lock들의 경합이 발생하여 특정 세션이 작업을 진행하지 못하고 멈춰 선 상태를 의미한다. 공유 Lock과 배타적 Lock 또는 배타적 Lock 끼리 블로킹이 발생할 수 있다.

이를 해결하는 방법은 트랜잭션 커밋과 롤백 뿐이다.

경합이 발생할 때, 먼저 Lock을 설정한 트랜잭션을 기다려야하기 때문에, 이런 현상이 반복되면 빠른 서비스를 제공할 수 없다.

이를 해결하기 위해서는 다음과 같은 방안이 존재할 수 있다.

1. SQL 문장이 가장 빠르게 실행되도록 리팩토링하는 것이 가장 기본적이며, 효과적은 방법이다.
2. 트랜잭션을 가능한 짧게 정의하면 경합을 줄일 수 있다.
3. 동일한 데이터를 동시에 변경하는 작업을 하지 않도록 설계하는 것이 좋다. 또한, 트랜잭션이 활발한 주간에는 대용량 갱신 작업을 수행하지 않는다.
4. 대용량 작업이 불가피한 경우 작업단위를 쪼개거나, lock_timeout을 설정하여 해당 lock의 최대시간을 설정한다.

### Deadlock

데드락은 트랜잭션간의 교착상태를 의미한다. 두 개의 트랜잭션간에 각각의 트랜잭션이 가지고 있는 리소스의 Lock을 획득하려고 할 때 발생한다.

![Screenshot 2024-04-07 at 7.49.55 PM.png](https://i.esdrop.com/d/f/hhaNifrpr0/VJqAPTasap.png)

가장 흔히 떠올리는 데드락상황이다. 트랜잭션1에서 2번 리소스의 lock을 획득하고, 트랜잭션2에서 1번 리소스의 lock을 획득한 상태이다.

이때, 동시에 상대방의 데이터를 엑세스하려고 할 때, 기존의 lock이 해제될 때까지 기다리는 상황이다.

![Screenshot 2024-04-07 at 7.50.54 PM.png](https://i.esdrop.com/d/f/hhaNifrpr0/ssKhyCAGI5.png)

이는 트랜잭션1이 공유 lock을 설정하고 sleep에 빠졌다. 이때, 트랜잭션2가 배타적 lock을 설정하려고 할 때, 무한정 기다리게 되는 교착상태에 빠지게 된다.

### Lock level & Escalation

SQL 명령어에 따라 Lock의 설정대상이 데이터 행일지 데이터베이스일지 나누어진다.

1. Row level

변경하려는 행에만 lock을 설정하는 것을 의미한다.

2. Page level

변경하려는 행이 담긴 데이터 페이지에 lock을 설정한다. 같은 페이지에 속한 행들은 변경작업과 무관하게 모두 lock에 의해 잠긴다

3. Table level

테이블과 인덱스에 모두 잠금을 설정한다. `Select table`, `Alter Table`, `Index`, `Drop` 등의 작업에서 해당 레벨의 lock이 설정된다.

4. Database level

데이터베이스를 복구하거나 스키마를 변경할 때 발생한다.

Escalation은 Lock 리소스가 임계치를 넘으면 Lock 레벨이 확장되는 것을 의미한다.

Lock 레벨이 낮을 수록 동시성이 좋아지지만, 관리해야할 Lock이 많아지기 때문에 메모리 효율성은 떨이진다. 반대로 Lock 레벨이 높을 수록 관리 리소스가 낮지만, 동시성은 떨어진다.

### 결론

데이터베이스 내에서 어떠한 데이터를 읽는 작업을 진행할 때, 공유 Lock이 존재하지 않는다면 위에서 확인하듯 Dirty Read, Non-Repeatable Read, Phantom Read 등이 발생할 수 있다.

따라서 공유 Lock (Read lock)을 사용하여 데이터 격리성을 유지하며 이를 해결할 수 있다.

### 참고

- http://www.sqler.com/320577
- https://shuu.tistory.com/76