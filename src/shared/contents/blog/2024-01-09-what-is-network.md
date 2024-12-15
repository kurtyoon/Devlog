---
title: "[Network] Network란?"
layout: post
author: kurtyoon # 작성자
banner: https://i.esdrop.com/d/f/hhaNifrpr0/MG549ij7Xg.png # 배너 이미지
categories:
  - Network
tags:
  - Network
  - Data Communication
article: "데이터 통신 과목을 수강하고 정리한 내용이다." # 포스트 내용 함축
date: "2024-01-09 18:01:00 +0900"
sidebar: []
published: false
comments: true
---

네트워크는 통신 링크에 서로 연결된 장치들의 집합을 의미하며, 이는 컴퓨터, 라우터, 스위치, 서버 등과 같은 장치들로 이뤄진다. 이러한 장치들은 데이터를 주고 받으며 통신을 수행한다.<br>
네트워크를 통해 작업을 여러 컴퓨터 또는 장치에 분산시켜 처리하는 방법을 사용 가능하다. 이를 통해 작업을 효율적으로 처리하고, 작업 부하를 분산할 수 있다.

아래 내용은 네트워크의 품질과 성능을 측정하는 데 사용되는 기준이다.

**Performance**

네트워크의 성능은 **Throughput**, **Delay**, **Jitter**, **Loss** 등으로 판단되며 이는 다음과 같다.<br>
**Throughput**은 처리율로 단위 시간 당 전송된 데이터의 양을 의미하며, 높은 처리율은 더 빠른 데이터 전송을 의미한다.<br>
**Delay**는 지연으로 데이터가 출발지에서 목적지로 이동하는 데 걸리는 시간을 의미한다. 낮은 지연은 빠른 응답시간을 의미한다.<br>
**Jitter**는 데이터 패킷 간의 도착 시간의 변동을 의미하며, 일정하지 않은 지터는 프로그램에 영향을 줄 수 있다.<br>
**Loss**는 데이터 패킷 전송 중에 손상되는 비율을 나타낸다. 낮은 Loss는 신뢰성을 높일 수 있다.

**Reliability**<br>
네트워크 장치 또는 링크의 고장 발생 빈도와 네트워크 고장 발생 시 복구하는 데 걸리는 시간, 네트워크가 오랫동안 안정적으로 사용될 수 있는 정도를 통해 측정된다.

**Security**<br>
네트워크 보안은 불법 접속, 바이러스 및 다른 보안 위협으로부터 네트워크를 보호하는 것을 의미한다. 보안 조치는 데이터의 기밀성, 무결성 및 가용성을 보장해야 한다.

이러한 개념은 네트워크 설계와 관리에서 중요한 역할을 한다. 네트워크를 효과적으로 관리하고 최적화하기 위해 위와 같은 기준을 고려하여야 한다.

**Line Configuration**는 네트워크에서 장치들이 서로 연결되는 방식을 의미한다. 이는 네트워크를 구성하고 데이터가 어떻게 전달되는지에 영향을 미친다.

**Point-to-Point**의 구성은 두 장치 간의 전용 연결을 나타낸다. 해당 구성에서는 채널 전체가 두 기기 간의 통신을 위해 사용된다. 즉, 하나의 선이 나와 상대방을 연결하는 방식이다. 주로 직접 연결이 필요한 상황에 사용된다.
![](https://i.esdrop.com/d/f/hhaNifrpr0/rtihS6vOdC.png)

**Broadcast**의 구성은 3개 이상의 장치가 하나의 링크를 공유하는 방식을 의미한다. 이는 여러 기기가 동시에 링크를 공유하며 데이터를 주고 받는다. 사용자들 간에 순서를 번갈아 가며 채널 용량을 시간적 또는 공간적으로 공유하게 된다. 주로 다중 접속이 필요한 상황에 사용된다.
![](https://i.esdrop.com/d/f/hhaNifrpr0/UKaKfg5Hql.png)

**Physical Topology**는 물리적 혹은 논리적인 네트워크 배치 방식을 의미한다. 주로 사용되는 방식은 다음과 같다.

**Mesh**에서 모든 장치는 다른 장치와 **point-to-point**로 직접 연결되며, n개의 장치를 서로 연결하기 위해서는 n(n-1) / 2 개의 링크가 필요하다. Mesh의 장점은 높은 안정성을 제공하고, 여러 경로로 데이터를 전송할 수 있어 단일 링크의 고장에도 영향을 받지 않는다. 또한 데이터를 직접 주고 받기 때문에 중간에 다른장치에서 탈취하기 어려워 보안이 강력하고, 문제가 발생했을 때 해당 문제를 찾아내기 쉽다. 그러나 선이 많이 필요하며, 장치마다 많은 입출력 포트가 필요하다. 이로 인해 설치가 어려울 수 있고, 비용이 많이 발생한다.
![](https://i.esdrop.com/d/f/hhaNifrpr0/dqJ8quEyfO.png)

**Star**는 중앙 허브와 각 장치 간의 point-to-point 링크를 사용한다. 각 장치 간에 직접적인 통신은 불가능하며, 모든 데이터 전송은 허브를 통해 이뤄진다. 따라서 하나의 링크와 하나의 입출력 포트가 존재한다. 따라서 Mesh 구성에 비해 적은 비용을 설치가 가능하지만, 허브가 고장나는 경우 전체 시스템에 영향을 미친다.
![](https://i.esdrop.com/d/f/hhaNifrpr0/2n5iBbFX1G.png)

**Bus**는 다중 접속을 허용하는 Multipoint 형태이다. 이는 Tap과 Drop line을 사용하여 여러 장치를 연결한다. 설치가 다른 Topology에 비해 비교적 쉬우나, 재구성이나 분리가 어려우며, 단선과 같은 문제가 발생했을 경우 찾기 어렵다. 또한 많은 장치가 연결될수록 전류 세기가 감소하므로 제한된 수의 장치나 전류 증폭장치가 필요할 수 있다.
![](https://i.esdrop.com/d/f/hhaNifrpr0/FSMQLNp8A9.png)

**Ring**구성은 양 옆의 장치와 point-to-point 링크로 연결되며, 단방향으로 데이터를 전송한다. 이를 통해 설치가 쉽고 어디에 문제가 발생했는지 알기 쉽다. 그러나 하나의 장치가 끊기는 경우 전체 네트워크가 끊어질 수 있다.
![](https://i.esdrop.com/d/f/hhaNifrpr0/fPWAeXKaSZ.png)

**Hybrid Topologies**는 다양한 토폴로지들을 조합하여 사용하는 구성이다. 이를 통해 네트워크 요구 사항에 맞게 다양한 토폴로지를 혼합할 수 있다.
![](https://i.esdrop.com/d/f/hhaNifrpr0/LHp33H6jm3.png)

네트워크는 보통 크기에 따라 아래와 같이 분류된다.

**LAN** (Local area network)<br>
LAN은 근거리 통신망으로, 수 키로미터 정도의 거리로 제한된다. 이는 개인 소유 네트워크로 주로 사무실, 학교, 가정 등에서 사용된다. 크기가 상대적으로 작아서 네트워크 구축이 비교적 쉽다.
LAN은 일반적으로 broadcast 네트워크이다. 따라서 여러 사람이 동시에 말하는 경우 충돌이 발생할 수 있다. 주로 bus, ring 또는 star 형태의 physical topology를 사용한다.
![](https://i.esdrop.com/d/f/hhaNifrpr0/RMl5gmYIpr.png)

**MAN** (Metropolitan Area Network)<br>
MAN은 도시나 대도시 영역을 커버하는 중간 규모의 통신망이다. LAN과 WAN 사이의 크기에 해당하며, 주로 도시 전체를 커버하기 위해 사용된다. 그러나 현재는 잘 사용되지 않는 추세이다.
![](https://i.esdrop.com/d/f/hhaNifrpr0/olPoTqTPcy.png)

**WAN** (Wide Area Network)<br>
WAN은 광역 통신망으로, 국가 또는 대륙과 같은 광대역 영역을 커버한다. 통신 회사들이 구축하고 제공하는 대규모 네트워크이다. WAN은 여러 서브 네트워크를 연결하는 데 사용된다. 보통 Switched WAN과 Point-to-Point WAN이 사용된다.
![](https://i.esdrop.com/d/f/hhaNifrpr0/k6tCMTN9AS.png)

**Internetworks**<br>
인터네트워크는 두 개 이상의 네트워크를 연결한 것을 나타낸다. 이는 더 큰 규모의 네트워크를 형성하며, 대표적으로 인터넷이 인터네트워크의 예시이다. 여러 네트워크 간의 상호 연결로 데이터 통신을 가능하게 한다.
![](https://i.esdrop.com/d/f/hhaNifrpr0/K9eRF0iu2b.png)
