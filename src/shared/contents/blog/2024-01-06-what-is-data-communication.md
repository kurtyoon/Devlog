---
title: "[Network] Data Communication이란?"
layout: post
author: kurtyoon # 작성자
banner: https://i.esdrop.com/d/f/hhaNifrpr0/MG549ij7Xg.png # 배너 이미지
categories:
  - Network
tags:
  - Network
  - Data Communication
article: "데이터 통신 과목을 수강하고 정리한 내용이다." # 포스트 내용 함축
date: "2024-01-06 12:08:00 +0900"
sidebar: []
published: false
comments: true
---

**Telecommunications**(장거리 통신)은 먼 거리 사이에서 정보를 주고받는 행위이다. 이는 전화, 인터넷, 위성 통신과 같은 다양한 기술을 통해 수행될 수 있다.<br>
**Data**(데이터)는 사용자 간에 합의된 형태로 표현된 정보를 의미한다. 데이터는 보통 이진 코드 형태로 컴퓨터와 다른 전자 기기에 의해 처리, 저장, 전송된다.

이러한 두 단어로 이루어진 **Data Communication**은 데이터를 생성하고 사용하는 두 장치 간에 전선, 무선, 광섬유 등과 같은 통신 매체를 통해 데이터를 교환하는 과정을 말한다.<br>
이러한 Data Communication은 다음과 같은 기본적인 특성을 가진다.

- 데이터는 지정된 목적지에 정확히 도착해야 한다.
- 전송된 데이터는 오류 없이, 손실되거나 왜곡되지 않고 정확해야 한다.
- 데이터는 지연 없이, 빠르고 예측 가능한 시간 안에 전달되어야 한다.

Data Communication에서 **Jitter**가 발생할 수 있는데, 이는 데이터 패킷의 도착 시간에 변동이 생기는 현상을 의미한다. 송신된 데이터의 간격과 수신된 데이터의 간격이 다를 때 발생하며, 이로 인해 데이터 스트림에 불규칙성이 생기게 된다. 이는 버퍼링을 통해 해결할 수 있는데, 버퍼링이란 데이터를 일시적으로 저장하고 일정한 속도로 전달하여 Jitter를 최소화하는 방법이다.

이후로 Data Communication을 데이터 통신이라고 칭하겠다. 데이터 통신는 다음과 같은 요소로 구성이 된다.

![](https://i.esdrop.com/d/f/hhaNifrpr0/2gC2SobRFP.png)
Message의 경우 데이터를 의미하며, Sender는 송신자, Receiver는 수신자, Medium은 전송 매체로 송신자에서 수신자가지 이동하는 물리적인 경로를 의미한다. 여기서 Protocol은 데이터 통신을 통제하는 규칙들의 집합이다. 이에 대해서는 이후에 자세히 알아보겠다.

데이터는 다음과 같은 유형으로 구성된다.

- **Text**: 텍스트는 0또는 1을 사용하여 bit pattern으로 표현된다. 문자와 문자열은 이진수 또는 ASCII 코드와 같은 방법으로 표현될 수 있다.
- **Numbers**: 숫자도 bit pattern으로 표현되지만 수학적 연산을 단순화하기 위해 일반적으로 이진수로 표현된다. 이진수를 사용하는 경우 컴퓨터에서 숫자를 처리하는 데 도움을 준다.
- **Image**: 이미지는 픽셀로 구성된 그리드로 표현된다. 각 픽셀은 색상 정보를 나타내기 위해 RGB 값 또는 다른 색상 모델을 사용하는 이진수로 표현된다.
- **Audio**: 오디오는 시간에 따른 소리의 파형으로 표현된다. 소리의 강도와 주파수는 이진수로 표현되어 저장되고 전송된다.
- **Video**: 비디오는 연속된 이미지 프레임의 시퀀스로 표현된다. 각 이미지 프레임은 이미지와 동일한 방식으로 이진수로 표현된다.

데이터 통신에서는 데이터 흐름에 따라 다양한 전송 방법이 존재한다. 이는 크게 **Simplex**, **Half-duplex**, **Full-duplex**로 나뉜다.

**Simplex**

단방향 통신 방법는 데이터가 한 방향으로 흐르는 방식을 의미한다. 해당 방식에서는 송신자와 수신자가 명확하게 구분된다. 송신자는 데이터를 보내고, 수신자는 데이터를 받는 역할만 한다. 이는 한쪽 방향으로만 통신이 필요한 상황에서 사용된다.
![](https://i.esdrop.com/d/f/hhaNifrpr0/5wS2ABQWL1.png)

**Half-duplex**

반이중 통신 방법는 데이터를 주고 받는 것이 가능하지만, 동시에 송수신이 불가능한 방식을 의미한다. 송신자와 수신자가 번갈아가며 통신을 수행한다. 이는 무전기와 같이 상대방이 말할 때 듣고, 들을 때는 말할 수 없는 상황과 같은 상황에서 이뤄진다.
![](https://i.esdrop.com/d/f/hhaNifrpr0/iCGOdSVESu.png)

**Full-duplex**

전이중 통신 방법는 두 기기가 동시에 송수신을 할 수 있는 방식이다. 송신자와 수신자가 동시에 데이터를 주고 받을 수 있으며, 해당 방법은 양방향 대화가 필요한 상황에서 사용된다.
![](https://i.esdrop.com/d/f/hhaNifrpr0/8X8fppfxfe.png)

각 전송 방법은 특정 응용 프로그램 및 상황에 맞게 선택되어야 하며, 효율적인 통신을 가능하게 한다. 데이터의 흐름은 이러한 다양한 방법을 이해하고 적절히 활용함으로써 효과적인 통신을 보장할 수 있다.