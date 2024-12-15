---
title: "[Network] Network Software"
layout: post
author: kurtyoon # 작성자
banner: https://i.esdrop.com/d/f/hhaNifrpr0/MG549ij7Xg.png # 배너 이미지
categories:
  - Network
tags:
  - Network
  - Data Communication
article: "데이터 통신 과목을 수강하고 정리한 내용이다." # 포스트 내용 함축
date: "2024-01-09 18:30:00 +0900"
sidebar: []
published: false
comments: true
---

**Protocol**<br>
프로토콜은 의사소통을 어떻게 진행할 지에 대한 규약 또는 약속을 나타낸다. 데이터의 전송과 수신을 효과적으로 조정하기 위해서 사용된다.

**Peers**<br>
서로 다른 프로토콜 계층에서 해당 계층을 구성하는 독립체를 의미한다. 예를 들어, 하나의 네트워크 프로토콜이 여러 개의 서로 다른 피어를 가질 수 있다.

**프로토콜 계층화**<br>
프로토콜 계층화는 설계의 복잡성을 줄이기 위한 방법 중 하나이다. 각각의 계층은 특정한 역할과 책임을 가지며, 각 계층마다 동작하는 프로토콜이 정의되어 있다. 이렇게 계층화된 프로토콜은 각 계층 간의 인터페이스를 통해 상호작용 한다.

![](https://i.esdrop.com/d/f/hhaNifrpr0/9MfcEwjZz7.png)

**Layered Architecture**는 계층 구조를 의미하며, 네트워크 구성요소를 계층별로 나누어 조직화 하는 방법이다. 각 계층은 해당 계층과 직접 상호 작용하는 하위 계층과 상위 계층을 가지며, 프로세스 간의 통신을 효율적으로 관리한다. 다음과 같은 구조를 가진다.

**Peer-to-Peer Processes**<br>
각 계층에는 서로 다른 프로세스가 있으며, 각각의 프로세스는 입력과 출력을 가진다. 해당 프로세스들은 서로 다른 계층 간의 통신을 수행한다.

**Interfaces and Services**<br>
계층 간의 인터페이스는 인접한 계층 사이에서 primitive operation과 서비스를 정의한다. 이를 통해 바로 위 계층에 제공해야 할 정보와 서비스를 명확하게 정의하고 제공한다.

**Network Architecture**<br>
네트워크 아키텍처는 계층과 프로토콜의 집합으로 구성된다. 이는 네트워크를 설계하고 구성하는 방법을 나타낸다.

**Protocol Stack**<br>
프로토콜 스택은 네트워크 아키텍처에서 사용하는 프로토콜의 리스트이다. 각 계층당 하나의 프로토콜이 정의되어 있으며, 이러한 프로토콜 스택을 통해 효율적인 전달과 통신이 이루어진다.

**Interfaces and Service**는 다음과 같은 요소로 구성된다.

**Entities**<br>
엔티티는 각 계층의 활성 요소로, 소프트웨어나 하드웨어 등을 포함한다. 각 계층은 여러 엔티티로 구성되며, 서로 다른 계층 간에 통신한다.

**Peer Entities**<br>
피어 엔티티는 같은 계층에 속하는 다른 기기 상의 독립체를 나타낸다. 이러한 피어 엔티티는 서로 통신하고 데이터를 교환한다.

**Entities in Layer n**<br>
각 계층 내의 엔티티는 n + 1 계층에서 사용할 서비스를 실행하고 제공한다. 이를 통해 계층 간의 협력이 이루어진다.

![](https://i.esdrop.com/d/f/hhaNifrpr0/jl0GIZY2vw.png)
