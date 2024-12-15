---
title: "[Network] Reference model"
layout: post
author: kurtyoon # 작성자
banner: https://i.esdrop.com/d/f/hhaNifrpr0/MG549ij7Xg.png # 배너 이미지
categories:
  - Network
tags:
  - Network
  - Data Communication
article: "데이터 통신 과목을 수강하고 정리한 내용이다." # 포스트 내용 함축
date: "2024-01-09 19:13:00 +0900"
sidebar: []
published: false
comments: true
---

**OSI 모델**은 ISO 표준에 기반한 개방형 시스템 간의 통신을 설계하기 위한 통신 기능 모델이다. 주요 목적은 서로 다른 종류의 컴퓨터 간의 상호 연동을 가능하게 하기 위한 통신 기능의 설계 및 이해를 촉진하는 것이다.

OSI 모델은 총 7개의 계층을 가지며 다음과 같다.

1. Physical Layer
2. Data Link Layer
3. Network Layer
4. Transport Layer
5. Session Layer
6. Presentation Layer
7. Application Layer
   ![](https://i.esdrop.com/d/f/hhaNifrpr0/sc2dyr3nkE.png)
   ![](https://i.esdrop.com/d/f/hhaNifrpr0/FxbHvUtLXp.png)

**Physical Layer**의 경우 비트를 물리적인 매체를 통해 전달한다. 이러한 비트를 전송하기 위해서 비트를 전기나 광학적인 신호로 부호화하여 전송한다.
![](https://i.esdrop.com/d/f/hhaNifrpr0/MfjZ9D9eP5.png)

**Data Link Layer**은 네트워크 계층에 오류가 없는 링크를 제공한다. 이는 노드 간의 신뢰성 있는 데이터 전송을 담당한다. 데이터를 프레임으로 분할하고 물리 주소 지정, 흐름 제어, 오류 제어, 접근 제어 등을 수행한다.
![](https://i.esdrop.com/d/f/hhaNifrpr0/eaNNaxdfzQ.png)

![Hop-to-hop (node-to-node) delivery](https://i.esdrop.com/d/f/hhaNifrpr0/f3qwJjC3vg.png)

![Data link layer over broadcast medium](https://i.esdrop.com/d/f/hhaNifrpr0/3XK6k9IB9I.png)

**Network Layer**은 패킷을 발신지에서 목적지로 여러 네트워크를 통해 전달한다. 논리적 주소 지정과 경로 지정의 역할을 수행한다.
![](https://i.esdrop.com/d/f/hhaNifrpr0/ACXJYQmTad.png)

![Source-to-destination delivery](https://i.esdrop.com/d/f/hhaNifrpr0/RvxgQKgrIt.png)

**Transport Layer**은 포트 번호를 사용하여 프로세스를 식별하고, 종단 간 통신을 담당한다.
![](https://i.esdrop.com/d/f/hhaNifrpr0/pU6Oz2WFk0.png)

![Reliable process-to-process delivery of message](https://i.esdrop.com/d/f/hhaNifrpr0/lKm2wfRMXU.png)

![Type of data deliveries](https://i.esdrop.com/d/f/hhaNifrpr0/ztQ7oeL6Pk.png)

**Session Layer**은 데이터 교환을 관리하고 세션을 설정, 유지 및 종료한다.
![](https://i.esdrop.com/d/f/hhaNifrpr0/bRuKcLxgyB.png)

**Presentation Layer**은 데이터 형식 변환, 암호화, 압축 및 문자 집합 변환과 같은 데이터 표현에 관한 변환을 수행한다.
![](https://i.esdrop.com/d/f/hhaNifrpr0/XHDhKFv4u8.png)

**Application Layer**은 응용 프로그램과 네트워크 간의 통신을 관리하며 사용자와의 상호 작용을 지원한다.
![](https://i.esdrop.com/d/f/hhaNifrpr0/uqgQlsqC82.png)

**TCP/IP 프로토콜 Suite**는 OSI 모델보다 먼저 개발되었다. 이는 현재 인터넷과 웹 통신에서 널리 상요되는 프로토콜이다. TCP/IP 모델은 5개의 계층으로 구성되며, OSI 모델과 유사한 역할을 수행한다.
![](https://i.esdrop.com/d/f/hhaNifrpr0/IP04ZV7UaN.png)

![Peer-to-Peer processes](https://i.esdrop.com/d/f/hhaNifrpr0/5k3Rpoj7Oq.png)

![Exchange using the internet model](https://i.esdrop.com/d/f/hhaNifrpr0/79HB0yAGjF.png)

OSI 모델과 TCP/IP 모델은 네트워크 및 통신 분야에서 중요한 개념이며, 각 계층이 데이터 전송과 통신에서 어떤 역할을 하는지 이해해야 한다.
![](https://i.esdrop.com/d/f/hhaNifrpr0/iMUi2kGNWa.png)
