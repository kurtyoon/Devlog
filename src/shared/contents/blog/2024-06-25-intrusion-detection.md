---
title: "[Computer Security] Intrusion Detection"
layout: post
author: kurtyoon # 작성자
banner: https://i.esdrop.com/d/f/hhaNifrpr0/tyBoa4NUyG.png # 배너 이미지
categories:
  - Computer Security
tags:
  - Computer Security
article: "Intrusion Detection" # 포스트 내용 함축
date: "2024-06-25 22:49:00 +0900"
sidebar: []
published: true
comments: true
---

## 8.1 Intruders

---

침입자(Intruder)는 네트워크 시스템 보안에 있어 주요한 위협으로, 주로 해커(hacker) 또는 크래커(cracker)라고 불린다. 침입자들은 시스템에 무단으로 접근하여 데이터를 탈취하거나 시스템을 손상시킨다. 침입자는 외부자와 내부자로 나눌 수 있으며, 그 동기와 기술 수준에 따라 다양한 방식으로 공격을 수행한다.

### Intruders Type

**1. 사이버 범죄자 (Cyber Criminals)**

- **동기**: 재정적 보상
- **활동**: 신원 도용, 금융 정보 탈취, 기업 스파이 활동, 데이터 탈취 및 랜섬웨어 공격
- **특징**: 주로 젊은 해커들로, 동유럽, 러시아, 동남아시아 출신이 많다. 이들은 지하 포럼에서 활동하며, 공격을 조율하고 정보를 교환한다.

**2. 활동가 (Activists)**

- **동기**: 사회적 또는 정치적 목적
- **활동**: 웹사이트 변조, 서비스 거부 공격, 데이터 도난 및 공개
- **특징**: 주로 기술 수준이 낮고, 자신의 주장을 알리기 위해 공격을 수행한다. 대표적인 그룹으로 **Anonymous**와 **LulzSec**이 있다.

**3. 국가 후원 조직 (State-Sponsored Organizations)**

- **동기**: 스파이 활동 또는 사보타주
- **활동**: 장기간에 걸친 은밀한 공격, 주로 APT(Advanced Persistent Threat)로 알려짐
- **특징**: 다양한 국가에서 활동하며, 높은 수준의 기술력을 보유하고 있다.

**4. 기타 (Others)**

- **동기**: 기술적 도전, 동료의 인정
- **활동**: 새로운 취약점 발견, 공격 도구 사용 및 수정
- **특징**: 취미로 해킹을 즐기는 해커부터 기술적 도전을 즐기는 고전적 해커까지 다양하다.

### 기술 수준에 따른 침입자 분류

**1. 초보자 (Apprentice)**

- **기술**: 최소한의 기술력, 기존의 공격 도구 사용
- **방어**: 기존 도구를 사용하기 때문에 방어가 상대적으로 용이

**2. 숙련자 (Journeyman)**

- **기술**: 공격 도구를 수정하거나 새로운 취약점을 찾을 수 있는 기술력
- **방어**: 도구의 변형으로 인해 방어가 어려움

**3. 전문가 (Master)**

- **기술**: 새로운 취약점을 발견하고 강력한 공격 도구를 작성할 수 있는 고도의 기술력
- **방어**: 가장 방어하기 어려운 수준

### 침입자의 일반적인 활동

1. **원격 루트 권한 획득**: 원격으로 서버에 루트 권한을 얻는 공격
2. **웹사이트 변조**: 웹사이트의 내용을 변경하는 공격
3. **비밀번호 크랙킹**: 비밀번호를 추측하거나 크랙킹하는 공격
4. **데이터 도난**: 신용카드 번호가 포함된 데이터베이스를 복사하는 공격
5. **무단 데이터 접근**: 급여 기록이나 의료 정보 등 민감한 데이터를 무단으로 열람
6. **패킷 스니핑**: 네트워크 패킷을 캡처하여 사용자 이름과 비밀번호를 획득
7. **권한 오류 악용**: 익명 FTP 서버의 권한 오류를 악용하여 불법 소프트웨어나 음악 파일을 배포
8. **모뎀을 통한 내부 네트워크 접근**: 보안이 취약한 모뎀을 통해 내부 네트워크에 접근
9. **사회공학 기법 사용**: 임원으로 가장하여 도움말 데스크에 전화를 걸어 이메일 비밀번호를 재설정하고 이를 획득
10. **무단 워크스테이션 사용**: 무단으로 로그인된 워크스테이션을 사용하는 행위

### 방어 전략

침입 탐지 시스템(IDS)과 침입 방지 시스템(IPS)을 사용하여 이러한 위협을 효과적으로 대응할 수 있다. IDS와 IPS는 알려진 공격에 대해 효과적이지만, 고도의 기술을 가진 범죄자나 국가 후원 침입자의 새로운 제로데이(Zero-day) 공격에는 한계가 있다. 따라서 암호화, 상세 감사 기록, 강력한 인증 및 권한 부여 통제, 운영 시스템 및 애플리케이션 보안의 적극적인 관리 등을 포함하는 심층 방어 전략이 필요하다.

## 8.2 Intrusion Detection

---

침입 탐지(Intrusion Detection)는 시스템 이벤트를 모니터링하고 분석하여 시스템 자원에 대한 무단 접근 시도를 실시간 또는 거의 실시간으로 경고하는 보안 서비스이다. 이는 인증, 접근 제어, 방화벽과 함께 사용되어 침입을 방지하는 또 하나의 방어선 역할을 한다.

### IDS의 구성 요소

IDS는 다음과 같은 세 가지 논리적 구성 요소로 이루어진다.

1. **센서(Sensors)**: 데이터를 수집하는 역할을 한다. 센서의 입력은 네트워크 패킷, 로그 파일, 시스템 호출 추적 등 시스템의 모든 부분일 수 있다. 수집된 정보는 분석기(Analyzer)로 전송된다.
2. **분석기(Analyzers)**: 하나 이상의 센서나 다른 분석기에서 입력을 받아 침입이 발생했는지 여부를 결정한다. 분석 결과는 침입 발생 여부를 나타내며, 증거를 포함할 수 있다. 분석기는 결과를 저장하여 추후 분석 및 검토에 사용될 수 있다.
3. **사용자 인터페이스(User Interface)**: 사용자 인터페이스는 시스템의 출력을 확인하고, 시스템의 동작을 제어할 수 있도록 한다. 이는 관리자, 디렉터 또는 콘솔 컴포넌트와 같은 역할을 할 수 있다.

IDS는 호스트 기반(Host-Based) 또는 네트워크 기반(Network-Based)으로 구분할 수 있다.

- **호스트 기반 IDS(HIDS)**: 단일 호스트의 특성과 해당 호스트에서 발생하는 이벤트를 모니터링하여 침입 활동을 탐지한다.
- **네트워크 기반 IDS(NIDS)**: 특정 네트워크 세그먼트 또는 장치의 네트워크 트래픽을 모니터링하여 침입 활동을 탐지한다.
- **분산 또는 하이브리드 IDS**: 여러 호스트 및 네트워크 장치의 센서 정보를 중앙 분석기로 통합하여 침입 활동을 더 효과적으로 탐지하고 대응한다.

### 기본 원칙

침입 탐지는 다음과 같은 기본 원칙에 기반한다.

1. **빠른 탐지와 대응**: 침입이 충분히 빨리 탐지되면, 침입자를 시스템에서 제거하여 피해를 방지할 수 있다. 탐지가 늦더라도 빠른 대응을 통해 피해를 최소화하고, 빠르게 복구할 수 있다.
2. **억제 효과**: 효과적인 침입 탐지 시스템(IDS)은 억제 효과를 발휘하여 침입을 방지하는 역할을 한다.
3. **정보 수집**: 침입 탐지는 침입 기술에 대한 정보를 수집하고, 이를 통해 향후 침입 방지 조치를 강화할 수 있다.

침입 탐지는 침입자의 행동이 합법적인 사용자의 행동과 다르다는 가정에 기반한다. 그러나, 침입자와 합법적인 사용자의 행동 사이에는 어느 정도의 겹침이 있을 수 있으므로, 탐지 과정에는 타협과 예술적인 요소가 필요하다.

### Base-Rate Fallacy

실용적인 IDS는 많은 침입을 탐지하면서도 허위 경보율(false alarm rate)을 낮게 유지해야 한다. 허위 경보율이 높으면 시스템 관리자가 경보를 무시하거나, 허위 경보를 분석하는 데 많은 시간을 낭비하게 된다. 실제 침입의 빈도가 낮은 경우, 허위 경보율이 높아질 수밖에 없는 문제를 베이스 레이트 오류(base-rate fallacy)라고 한다. 많은 IDS가 이 문제를 해결하지 못하고 있다.

### IDS의 요구 사항

효과적인 IDS는 다음과 같은 요구 사항을 만족해야 한다.

1. **지속적인 운영**: 최소한의 인간 감독 하에 지속적으로 작동해야 한다.
2. **내결함성**: 시스템 충돌 및 재시작 후에도 복구할 수 있어야 한다.
3. **서브버전 저항성**: IDS 자체가 수정되었는지를 감지하고 스스로를 모니터링할 수 있어야 한다.
4. **시스템 부하 최소화**: 운영 중인 시스템에 최소한의 부하를 가해야 한다.
5. **보안 정책 준수**: 모니터링 중인 시스템의 보안 정책에 따라 구성할 수 있어야 한다.
6. **적응성**: 시간에 따라 시스템과 사용자 행동의 변화를 적응할 수 있어야 한다.
7. **확장성**: 많은 수의 호스트를 모니터링할 수 있어야 한다.
8. **점진적 서비스 저하**: IDS의 일부 구성 요소가 작동을 멈추더라도 나머지 부분에 최소한의 영향을 주어야 한다.
9. **동적 재구성**: 재시작 없이 IDS를 재구성할 수 있어야 한다.

침입 탐지는 시스템의 보안을 강화하는 데 중요한 역할을 하며, 빠른 탐지와 대응, 억제 효과, 침입 기술 정보 수집을 통해 시스템을 보호한다. IDS는 지속적인 운영, 내결함성, 서브버전 저항성, 최소한의 시스템 부하, 보안 정책 준수, 적응성, 확장성, 점진적 서비스 저하, 동적 재구성 등의 요구 사항을 충족해야 한다.

## 8.3 Analysis Approaches

---

침입 탐지 시스템(IDS)의 효과는 데이터 분석 접근 방식에 크게 의존한다. IDS는 센서 데이터를 분석하여 침입을 탐지하는데, 주로 이상 탐지(Anomaly Detection)와 서명 기반 탐지(Signature-Based Detection) 방법을 사용한다. 이 두 가지 접근 방식은 서로 다른 장단점이 있으며, 각기 다른 유형의 침입을 탐지하는 데 유용하다.

### 이상 탐지(Anomaly Detection)

이상 탐지는 정상적인 사용자 행동에 대한 기준을 설정하고, 이를 바탕으로 비정상적인 활동을 탐지하는 방식이다.

**기본 개념**

- **정상 행동 모델링**: 정상적인 시스템 사용 패턴을 정의하기 위해 사용자 및 시스템 활동을 학습한다.
- **비정상 활동 탐지**: 현재 관찰된 활동이 정상 모델과 얼마나 다른지 평가하여 비정상적이거나 의심스러운 행동을 탐지한다.

**주요 특징**

- **학습 기반**: 정상적인 시스템 동작을 학습하여 비정상적인 행동을 탐지한다.
- **제로데이 공격 탐지 가능**: 알려지지 않은 새로운 공격(제로데이 공격)도 비정상적인 행동으로 탐지할 수 있다.
- **높은 오탐률**: 정상적인 활동의 변동성이 크면 오탐(False Positive)이 발생할 가능성이 높다.

**장단점**

- **장점**: 새로운 공격 탐지 가능, 시스템 적응력 향상
- **단점**: 높은 오탐률, 정상 행동 모델 구축의 어려움

### 서명 기반 탐지(Signature-Based Detection)

서명 기반 탐지는 알려진 공격 패턴(서명)을 사용하여 침입을 탐지하는 방식이다.

**기본 개념**

- **공격 서명 데이터베이스**: 알려진 공격에 대한 서명(패턴) 데이터베이스를 구축한다.
- **서명 매칭**: 현재 관찰된 활동이 서명 데이터베이스에 있는 공격 패턴과 일치하는지 비교하여 침입을 탐지한다.

**주요 특징**

- **패턴 매칭**: 사전에 정의된 공격 서명과 일치하는 활동을 탐지한다.
- **제로데이 공격 탐지 불가**: 알려지지 않은 새로운 공격은 탐지할 수 없다.
- **낮은 오탐률**: 알려진 공격 패턴에만 반응하므로 오탐률이 낮다.

**장단점**

- **장점**: 낮은 오탐률, 명확한 공격 탐지
- **단점**: 새로운 공격 탐지 불가, 서명 데이터베이스 지속 업데이트 필요

### 하이브리드 접근 방식(Hybrid Approaches)

하이브리드 접근 방식은 이상 탐지와 서명 기반 탐지를 결합하여 각 방법의 장점을 취하는 방식이다.

**기본 개념**

- **이상 탐지와 서명 기반 탐지 결합**: 두 가지 방법을 동시에 사용하여 침입 탐지의 정확성과 효율성을 높인다.
- **다단계 분석**: 이상 탐지에서 비정상적인 활동을 탐지한 후, 서명 기반 탐지로 세부 분석을 수행한다.

**주요 특징**

- **종합적 탐지**: 두 가지 방법을 결합하여 보다 종합적인 침입 탐지를 구현한다.
- **향상된 정확성**: 두 방법의 장점을 결합하여 탐지 정확성을 높인다.

**장단점**

- **장점**: 향상된 탐지 정확성, 종합적 분석
- **단점**: 구현의 복잡성, 높은 자원 소모

침입 탐지 시스템의 분석 접근 방식은 크게 이상 탐지와 서명 기반 탐지로 나뉜다. 이상 탐지는 정상적인 행동과의 차이를 바탕으로 새로운 공격을 탐지하는 반면, 서명 기반 탐지는 알려진 공격 패턴을 이용하여 침입을 탐지한다. 하이브리드 접근 방식은 두 방법을 결합하여 각 방법의 단점을 보완하고, 탐지 정확성을 높인다.

## 8.4 Host-Based Intrusion Detection

---

호스트 기반 침입 탐지 시스템(HIDS)은 서버와 같이 중요한 시스템에 추가되는 보안 소프트웨어 계층이다. HIDS는 시스템의 활동을 모니터링하여 비정상적인 행동을 탐지하고, 침입을 기록하며, 관리자에게 알림을 보낸다.

### 주요 장점

HIDS의 주요 장점은 외부와 내부의 침입을 모두 탐지할 수 있다는 점이다. 네트워크 기반 IDS나 방화벽과 달리, HIDS는 시스템 내부에서 일어나는 비인가된 행동을 효과적으로 감지할 수 있다.

### 데이터 소스와 센서

HIDS의 중요한 구성 요소는 데이터를 수집하는 센서이다. 센서는 사용자 활동을 기록하여 분석 시스템에 제공한다. 일반적인 데이터 소스는 다음과 같다:

- **시스템 호출 추적**: 프로세스가 시스템 호출을 수행하는 순서를 기록한다. 유닉스와 리눅스 시스템에서는 잘 작동하나, 윈도우 시스템에서는 DLL 사용 때문에 어려움이 있다.
- **감사(로그 파일) 기록**: 현대 운영체제는 사용자 활동을 기록하는 회계 소프트웨어를 포함한다. 추가 소프트웨어가 필요 없으나, 필요한 정보를 포함하지 않거나 조작될 수 있다.
- **파일 무결성 체크섬**: 중요한 파일의 변화를 감지하기 위해 암호화 체크섬을 사용한다. 이는 변화에 민감하나 실행 중인 프로세스의 변화를 감지할 수 없다.
- **레지스트리 접근**: 윈도우 시스템에서 레지스트리 접근을 모니터링한다. 이는 윈도우 특정적이며 성공률이 낮다.

### 이상 탐지 기반 HIDS

이상 탐지 기반 HIDS는 정상적인 사용자 활동의 모델을 만들고, 현재의 행동과 비교하여 비정상적인 활동을 탐지한다. 이는 주로 유닉스와 리눅스 시스템에서 시스템 호출 추적을 사용하여 이루어진다.

1. **시스템 호출 추적**: 시스템 호출은 프로그램이 커널 기능에 접근하는 수단으로, 저수준 운영 체제 기능과의 상호 작용에 대한 자세한 정보를 제공한다.
2. **결정 엔진**: 수집된 시스템 호출 데이터를 분석하여 정상인지 비정상인지 분류한다. 다양한 알고리즘이 사용될 수 있다.
3. **성능**: 높은 탐지율과 낮은 오탐율을 유지하며 효과적으로 동작한다.

### 시그니처 또는 휴리스틱 기반 HIDS

시그니처 기반 HIDS는 알려진 악성 소프트웨어의 패턴을 사용하여 침입을 탐지한다. 휴리스틱 기반 HIDS는 알려진 악성 행동을 특징짓는 규칙을 사용하여 침입을 탐지한다.

1. **안티바이러스 소프트웨어**: 주로 윈도우 시스템에서 사용되며, 알려진 악성 소프트웨어를 탐지하는 데 효율적이다.
2. **제한점**: 제로 데이 공격을 탐지할 수 없으며, 새로운 악성 소프트웨어 패턴을 지속적으로 업데이트해야 한다.

### 분산 HIDS

분산 호스트 기반 침입 탐지 시스템(Distributed Host-Based Intrusion Detection System, Distributed HIDS)은 여러 호스트에서 데이터를 수집하고 중앙에서 이를 분석하여 침입을 탐지하는 시스템이다. 이는 개별 호스트에 독립적으로 설치된 HIDS보다 더 효과적인 방어를 제공한다.

**주요 구성 요소**

분산 HIDS는 일반적으로 다음의 주요 구성 요소로 이루어진다.

1. **호스트 에이전트 모듈(Host Agent Module)**: 각 호스트에서 백그라운드 프로세스로 동작하며, 보안 관련 이벤트에 대한 데이터를 수집하여 중앙 관리자 모듈로 전송한다.
2. **LAN 모니터 에이전트 모듈(LAN Monitor Agent Module)**: LAN 트래픽을 분석하고 결과를 중앙 관리자 모듈로 보고하는 방식으로 호스트 에이전트 모듈과 유사하게 동작한다.
3. **중앙 관리자 모듈(Central Manager Module)**: LAN 모니터 및 호스트 에이전트로부터 받은 보고서를 처리 및 연관시켜 침입을 탐지한다.

**기능 및 운영**

1. **데이터 수집 및 전송**:
   - **호스트 에이전트**: 각 호스트에서 감사 로그, 시스템 호출 추적, 파일 무결성 체크섬 등 다양한 소스에서 데이터를 수집한다. 이 데이터는 중요한 보안 이벤트를 포함하며, 필터링되어 표준화된 형식으로 변환된다.
   - **LAN 모니터 에이전트**: 네트워크 트래픽을 실시간으로 모니터링하여 중요한 보안 이벤트를 감지한다. 이 데이터 역시 중앙 관리자 모듈로 전송된다.
2. **중앙 분석 및 관리**:
   - **중앙 관리자**는 수집된 데이터를 분석하여 침입 여부를 판단한다. 다양한 센서에서 수집된 데이터를 종합하여 보다 정확한 탐지가 가능하다.
   - **알림 및 대응**: 침입이 탐지되면 중앙 관리자는 알림을 보내며, 필요시 자동으로 대응 조치를 취할 수 있다.
3. **분석 방법**:
   - **이상 탐지**: 정상적인 시스템 및 사용자 행동의 기준을 설정하고, 이와 다른 비정상적인 행동을 탐지한다.
   - **시그니처 기반 탐지**: 알려진 공격 패턴과 일치하는 행동을 탐지한다. 주로 안티바이러스 소프트웨어에서 사용된다.
   - **휴리스틱 탐지**: 경험적 규칙에 기반하여 의심스러운 행동을 탐지한다.

**장점**

분산 HIDS의 주요 장점은 다음과 같다.

1. **통합적 보안**: 여러 호스트와 네트워크 장치에서 수집된 데이터를 통합적으로 분석함으로써 더 정교하고 정확한 보안 관리를 할 수 있다.
2. **실시간 탐지**: 분산된 에이전트가 실시간으로 데이터를 수집하고 분석함으로써 빠른 대응이 가능하다.
3. **스케일링**: 대규모 네트워크에서도 효과적으로 동작할 수 있도록 설계되어, 많은 수의 호스트를 모니터링할 수 있다.

분산 HIDS는 단일 시스템을 모니터링하는 전통적인 HIDS보다 더 강력하고 효율적인 보안 솔루션이다. 여러 호스트와 네트워크에서 데이터를 수집하고 중앙에서 이를 분석함으로써 보다 정교한 침입 탐지가 가능하다. 이를 통해 네트워크 전반에 걸쳐 보다 효과적인 보안 관리를 실현할 수 있다.

## 8.5 Network-Based Intrusion Detection

---

네트워크 기반 침입 탐지 시스템(NIDS)은 네트워크 또는 상호 연결된 네트워크의 특정 지점에서 트래픽을 모니터링한다. NIDS는 실시간 또는 거의 실시간으로 패킷 단위로 트래픽을 검사하여 침입 패턴을 탐지하려고 한다. 이는 네트워크, 전송, 애플리케이션 레벨의 프로토콜 활동을 검사할 수 있다. 호스트 기반 IDS와의 차이점은 NIDS가 네트워크 상의 잠재적으로 취약한 컴퓨터 시스템으로 향하는 패킷 트래픽을 검사하는 반면, 호스트 기반 IDS는 호스트에서 사용자와 소프트웨어 활동을 검사한다는 점이다.

### 네트워크 센서의 유형

네트워크 기반 침입 탐지 시스템(NIDS)에서 사용하는 센서는 네트워크 트래픽을 모니터링하고 분석하여 침입을 탐지하는 중요한 역할을 한다. 이러한 센서는 배치 방식과 모니터링 대상에 따라 다양한 유형으로 나뉜다.

**인라인 센서(Inline Sensor)**

인라인 센서는 네트워크 세그먼트에 삽입되어 모니터링하는 트래픽이 반드시 센서를 통과하도록 한다. 인라인 센서의 주요 특징과 장점은 다음과 같다:

- **배치 방식**: 방화벽이나 LAN 스위치와 같은 네트워크 장치에 NIDS 센서 로직을 통합하거나, 독립형 인라인 NIDS 센서를 사용할 수 있다.
- **주요 장점**: 공격이 탐지되면 이를 차단할 수 있는 기능을 제공한다. 따라서 침입 탐지와 침입 방지 기능을 모두 수행할 수 있다.
- **예시**: 방화벽에 통합된 인라인 센서는 추가 하드웨어 없이 NIDS 센서 소프트웨어만으로도 충분히 동작할 수 있다.

**패시브 센서(Passive Sensor)**

패시브 센서는 네트워크 트래픽의 복사본을 모니터링하며, 실제 트래픽은 센서를 통과하지 않는다. 패시브 센서의 주요 특징과 장점은 다음과 같다:

- **배치 방식**: 센서는 네트워크 전송 매체(예: 광섬유 케이블)에 직접 물리적으로 탭(Tap)으로 연결된다. 이 탭은 모든 네트워크 트래픽의 복사본을 센서에 제공한다.
- **주요 장점**: 트래픽 흐름 측면에서 추가 처리 단계가 없어 패킷 지연이 발생하지 않으므로 효율적이다.
- **구성**: 패시브 센서는 IP 주소가 없는 네트워크 인터페이스 카드(NIC)를 통해 네트워크 트래픽을 수집하며, 다른 NIC를 통해 NIDS 관리 서버와 통신한다.

**무선 네트워크 센서(Wireless Network Sensor)**

무선 네트워크 센서는 유선 네트워크와 달리 무선 트래픽을 모니터링하며, 무선 프로토콜을 대상으로 한다. 무선 네트워크 센서의 주요 특징과 장점은 다음과 같다:

- **배치 방식**: 무선 액세스 포인트(AP)에 인라인으로 통합되거나, 무선 트래픽을 패시브 방식으로 모니터링할 수 있다.
- **주요 기능**: 무선 프로토콜 트래픽을 수집 및 분석하여 무선 프로토콜 공격을 탐지한다. 예를 들어, 무선 서비스 거부 공격, 세션 하이재킹, AP 사칭 공격 등이 있다.
- **특화된 센서**: 무선 IDS(WIDS)는 무선 네트워크 트래픽을 전담하여 모니터링하는 시스템으로, 보다 정교한 무선 네트워크 보안을 제공한다.

### NIDS 센서 배치

네트워크 기반 침입 탐지 시스템(NIDS) 센서 배치는 조직의 네트워크 보안을 강화하기 위해 중요한 역할을 한다. 센서 배치는 네트워크 구조와 보안 요구 사항에 따라 전략적으로 결정되어야 한다.

**주요 배치 위치**

다양한 네트워크 환경에서 NIDS 센서를 배치할 수 있는 주요 위치는 다음과 같다.

1. **외부 방화벽 내부 (Location 1)**
   - **배치 위치**: 외부 방화벽 바로 안쪽에 배치.
   - **장점**:
     - 외부에서 들어오는 공격이 네트워크 경계 방어(외부 방화벽)를 통과하는지 감지할 수 있다.
     - 네트워크 방화벽 정책이나 성능 문제를 파악할 수 있다.
     - 웹 서버나 FTP 서버를 대상으로 한 공격을 감지할 수 있다.
     - 공격이 인식되지 않더라도 손상된 서버에서 나가는 트래픽을 감지할 수 있다.
2. **외부 방화벽 외부 (Location 2)**
   - **배치 위치**: 외부 방화벽과 인터넷 또는 WAN 사이에 배치.
   - **장점**:
     - 네트워크를 대상으로 한 인터넷 출발 공격의 수와 유형을 기록할 수 있다.
   - **단점**: 이 위치의 센서는 더 높은 처리 부하를 가지며, 네트워크 트래픽을 필터링 없이 모두 모니터링해야 한다.
3. **백본 네트워크 (Location 3)**
   - **배치 위치**: 내부 서버와 데이터베이스 리소스를 지원하는 주요 백본 네트워크에 배치.
   - **장점**:
     - 네트워크의 많은 트래픽을 모니터링하여 공격을 감지할 가능성을 높일 수 있다.
     - 조직 내부 사용자의 비인가된 활동을 감지할 수 있다.
   - **특징**: 이 위치의 센서는 내부 및 외부 공격 모두를 모니터링할 수 있으며, 특정 프로토콜 및 공격 유형에 맞게 조정할 수 있다.
4. **부서별 네트워크 (Location 4)**
   - **배치 위치**: 사용자 워크스테이션과 서버를 지원하는 개별 부서의 LAN에 배치.
   - **장점**:
     - 중요한 시스템과 리소스를 대상으로 한 공격을 감지할 수 있다.
     - 제한된 자원을 가치가 높은 네트워크 자산 보호에 집중할 수 있다.
   - **특징**: 이 위치의 센서는 특정 프로토콜 및 공격 유형에 맞게 조정할 수 있으며, 처리 부하를 줄일 수 있다.

**NIDS 센서 배치 전략**

NIDS 센서를 배치할 때 고려해야 할 전략적 요소는 다음과 같다.

1. **트래픽 모니터링 범위**:
   - 네트워크의 트래픽 흐름을 잘 파악하고, 중요한 데이터를 모니터링할 수 있는 위치에 센서를 배치해야 한다.
   - 내부 및 외부에서 발생할 수 있는 다양한 공격 시나리오를 커버할 수 있어야 한다.
2. **성능 고려**:
   - 센서가 모니터링할 트래픽 양과 처리 부하를 고려해야 한다.
   - 고성능의 센서가 필요한 위치에는 적절한 하드웨어와 소프트웨어를 배치해야 한다.
3. **보안 정책 및 목표**:
   - 조직의 보안 정책에 따라 센서 배치 위치를 결정해야 한다.
   - 중요한 시스템과 데이터 보호를 우선으로 고려하여 배치 전략을 수립해야 한다

### 네트워크 기반 침입 탐지 기술

네트워크 기반 침입 탐지 시스템(NIDS)은 네트워크 트래픽을 분석하여 침입 시도를 탐지하기 위해 다양한 기술을 사용한다. 주요 기술로는 시그니처 기반 탐지(Signature Detection)와 이상 탐지(Anomaly Detection)가 있다. 각각의 기술은 특정한 유형의 공격을 감지하는 데 유용하며, 각자의 장단점을 가지고 있다.

**시그니처 기반 탐지 (Signature Detection)**

시그니처 기반 탐지 기술은 알려진 공격 패턴(시그니처)을 데이터베이스에 저장하고, 이를 네트워크 트래픽과 비교하여 일치하는 패턴이 발견되면 침입으로 간주하는 방식이다.

- **장점**:
  - 알려진 공격 패턴을 신속하게 탐지할 수 있다.
  - 비교적 낮은 오탐율(False Positive Rate)을 유지할 수 있다.
  - 구현 및 운영이 비교적 간단하다.
- **단점**:
  - 새로운 유형의 공격(제로 데이 공격)을 탐지할 수 없다.
  - 지속적인 시그니처 업데이트가 필요하다.
- **탐지 가능한 공격 유형**:
  - **애플리케이션 계층 탐지 및 공격**: 예를 들어, 버퍼 오버플로우, 패스워드 추측, 악성 코드 전송 등을 탐지한다.
  - **전송 계층 탐지 및 공격**: 비정상적인 패킷 분할, 취약 포트 스캔, SYN 플러딩 등의 공격을 탐지한다.
  - **네트워크 계층 탐지 및 공격**: 스푸핑된 IP 주소, 비정상적인 IP 헤더 값 등을 탐지한다.
  - **예기치 않은 애플리케이션 서비스**: 비인가된 애플리케이션 서비스 실행을 감지한다.
  - **정책 위반**: 부적절한 웹사이트 접속이나 금지된 애플리케이션 프로토콜 사용을 감지한다.

**이상 탐지 (Anomaly Detection)**

이상 탐지 기술은 정상적인 네트워크 트래픽 패턴을 학습하고, 이와 다른 비정상적인 패턴을 탐지하는 방식이다. 이 기술은 정상 활동 모델을 생성하고, 실시간 트래픽이 이 모델과 얼마나 일치하는지 분석하여 침입을 감지한다.

- **장점**:
  - 알려지지 않은 새로운 공격(제로 데이 공격)을 탐지할 수 있다.
  - 정상 활동과의 비교를 통해 비정상적인 활동을 감지한다.
- **단점**:
  - 높은 오탐율(False Positive Rate)을 가질 수 있다.
  - 정상 활동 모델을 학습하는 데 시간이 많이 소요될 수 있다.
  - 구현과 운영이 복잡할 수 있다.
- **탐지 가능한 공격 유형**:
  - **서비스 거부(DoS) 공격**: 트래픽 양이나 연결 시도 수가 비정상적으로 증가하는 경우를 감지한다.
  - **스캐닝**: 공격자가 다양한 패킷을 전송하여 타겟 시스템의 특성과 취약점을 파악하려는 시도를 감지한다.
  - **웜**: 네트워크를 통해 전파되는 웜을 감지한다. 웜은 빠르게 전파되며, 비정상적인 대역폭 사용이나 비정상적인 호스트 간 통신을 초래할 수 있다.

**상태 기반 프로토콜 분석 (Stateful Protocol Analysis)**

상태 기반 프로토콜 분석(SPA)은 사전 정의된 정상 프로토콜 트래픽 프로파일과 비교하여 네트워크 트래픽을 분석하는 방식이다.

- **장점**:
  - 네트워크, 전송, 애플리케이션 계층 프로토콜의 상태를 이해하고 추적할 수 있다.
  - 벤더가 제공하는 보편적인 정상 프로파일을 사용하여 비정상적인 트래픽을 감지한다.
- **단점**:
  - 높은 자원 소모를 필요로 한다.
  - 특정 프로토콜 상태를 추적하는 데 많은 계산이 필요하다.

### Network-based Intrusion Detection Logging of Alerts

**로그 기록 요소**

1. **타임스탬프 (Timestamp)**
   - **내용**: 이벤트가 발생한 정확한 날짜와 시간.
   - **중요성**: 이벤트가 발생한 시점을 명확히 파악하여 문제 해결 및 추적에 유용하다.
2. **연결 또는 세션 ID (Connection or Session ID)**
   - **내용**: 각 TCP 연결 또는 비연결성 프로토콜의 패킷 그룹에 할당되는 연속적이거나 고유한 번호.
   - **중요성**: 특정 세션이나 연결을 추적하여 문제의 원인을 분석하는 데 도움이 된다.
3. **이벤트 또는 경고 유형 (Event or Alert Type)**
   - **내용**: 탐지된 이벤트의 유형 또는 경고의 종류.
   - **중요성**: 어떤 종류의 위협이 탐지되었는지 파악하여 적절한 대응책을 마련할 수 있다.
4. **평가 (Rating)**
   - **내용**: 우선순위, 심각도, 영향, 신뢰도 등의 평가 정보.
   - **중요성**: 이벤트의 중요도를 평가하여 즉각적인 대응이 필요한지 여부를 판단하는 데 도움이 된다.
5. **프로토콜 정보 (Network, Transport, and Application Layer Protocols)**
   - **내용**: 해당 이벤트와 관련된 네트워크, 전송, 애플리케이션 계층의 프로토콜 정보.
   - **중요성**: 문제가 발생한 계층과 관련 프로토콜을 파악하여 더 구체적인 문제 해결 방안을 수립할 수 있다.
6. **출발지 및 목적지 IP 주소 (Source and Destination IP Addresses)**
   - **내용**: 공격을 시도한 출발지 IP 주소와 공격 대상이 된 목적지 IP 주소.
   - **중요성**: 공격의 원천을 추적하고 공격 대상 시스템을 보호하는 데 유용하다.
7. **출발지 및 목적지 포트 번호 (Source and Destination TCP or UDP Ports)**
   - **내용**: 출발지 및 목적지 TCP 또는 UDP 포트 번호, ICMP 유형 및 코드.
   - **중요성**: 어떤 서비스가 공격을 받았는지 파악하여 해당 서비스의 보안을 강화할 수 있다.
8. **전송된 바이트 수 (Number of Bytes Transmitted over the Connection)**
   - **내용**: 연결을 통해 전송된 총 데이터 바이트 수.
   - **중요성**: 공격의 규모와 심각도를 파악하는 데 도움이 된다.
9. **디코딩된 페이로드 데이터 (Decoded Payload Data)**
   - **내용**: 애플리케이션 요청 및 응답과 같은 디코딩된 페이로드 데이터.
   - **중요성**: 공격의 내용과 목적을 더 잘 이해하는 데 도움이 된다.
10. **상태 관련 정보 (State-related Information)**
    - **내용**: 인증된 사용자 이름 등 상태와 관련된 정보.
    - **중요성**: 공격이 발생한 시점의 시스템 상태를 파악하여 보다 정밀한 분석이 가능하다.

## 8.6 Distributed or Hybrid Intrusion Detection

---

분산 또는 하이브리드 침입 탐지 시스템은 여러 시스템이 협력하여 침입을 식별하고 공격 프로파일의 변화를 적응하는 방식을 사용한다. 이러한 시스템은 호스트 기반 침입 탐지 시스템(HIDS)과 네트워크 기반 침입 탐지 시스템(NIDS)에서 수집된 정보를 결합하여 조직의 IT 인프라 전반에 걸쳐 침입 탐지와 대응을 관리하고 조정한다.

### 주요 문제점

IDS, 방화벽, 바이러스 및 웜 탐지기와 같은 시스템은 두 가지 주요 문제에 직면해 있다:

1. **새로운 위협 및 기존 위협의 급격한 변화를 인식하지 못함**: 새로운 유형의 공격이나 기존 공격의 변형을 탐지하는 데 어려움이 있다.
2. **빠르게 확산되는 공격에 대해 신속하게 업데이트하기 어려움**: 공격이 빠르게 퍼지는 경우 이에 신속하게 대응하기 어려움.

추가적으로, 현대 기업은 경계가 명확하지 않은 네트워크 환경에서 운영되며, 호스트는 네트워크 포트를 통해 쉽게 이동할 수 있다.

### 공격자들의 대응 방법

공격자들은 다음과 같은 방식으로 이러한 문제를 악용해 왔다.

- **전통적인 공격 방식**: 웜과 같은 악성 소프트웨어를 개발하여 빠르게 확산시키거나, 서비스 거부(DoS) 공격을 통해 방어 체계가 마련되기 전에 압도적인 힘으로 공격한다.
- **새로운 접근 방식**: 공격의 확산 속도를 늦춰 기존 알고리즘으로는 탐지하기 어렵게 만든다.

### 대응 방안: 협력 시스템

협력 시스템을 개발하여 미묘한 단서를 기반으로 공격을 인식하고 빠르게 적응하는 방식이 필요하다. 이러한 시스템의 동작 방식은 다음과 같다:

- **이상 탐지기**: 로컬 노드에서 비정상적인 활동의 증거를 찾는다. 예를 들어, 평소 적은 수의 네트워크 연결을 만드는 머신이 갑자기 많은 연결을 시도하는 경우 공격이 진행 중일 수 있다.
- **피어-투-피어 '가십' 프로토콜**: 로컬 시스템은 네트워크가 공격을 받고 있다는 확률 형태로 다른 머신에 의심을 알린다. 여러 시스템에서 이러한 메시지를 받아들이면, 일정 임계값을 초과할 때 공격이 진행 중임을 인식하고 대응한다.

### Intel의 자율적 기업 보안(Autonomic Enterprise Security)

Intel이 개발한 자율적 기업 보안 체계는 다음과 같은 방식을 사용한다:

1. **센서**: 각 엔드 호스트와 네트워크 장치(예: 라우터)를 센서로 간주하고, 이들 장치에 센서 소프트웨어 모듈을 설치한다. 분산된 구성의 센서는 정보를 교환하여 네트워크 상태(공격 여부)를 확인한다.
2. **협력적 정책**: 중앙 시스템이 기본 보안 정책을 설정하고, 분산 센서에서 수집된 정보를 바탕으로 정책을 조정한다. 정책 시행 지점(PEP)은 신뢰할 수 있는 플랫폼과 지능형 IDS에 위치하여 분산 정보를 종합하고 침입을 감지한다.

### 동작 방식

1. **요약 이벤트 (Summary Events)**: 방화벽, IDS, 서버 등 다양한 소스에서 이벤트를 수집하여 중앙 정책 시스템에 전달한다.
2. **분산 탐지 및 추론 이벤트 (DDI Events)**: 가십 트래픽이 플랫폼이 공격이 진행 중임을 결론짓도록 할 때 생성되는 경고.
3. **정책 시행 지점 이벤트 (PEP Events)**: 신뢰할 수 있는 자율 방어 플랫폼과 지능형 IDS에서 발생하는 이벤트로, 로컬 결정 및 개별 장치의 행동을 종합하여 침입을 감지한다.

## 8.7 Intrusion Detection Exchange Format

---

분산 침입 탐지 시스템(DIDS)을 다양한 플랫폼과 환경에서 원활하게 작동하도록 개발하기 위해서는 상호 운용성을 지원하는 표준이 필요하다. 이러한 표준은 IETF 침입 탐지 워킹 그룹의 초점이 된다. 이 워킹 그룹의 목적은 침입 탐지 및 대응 시스템과 관리 시스템이 상호 작용할 때 필요한 정보 공유를 위한 데이터 형식과 교환 절차를 정의하는 것이다.

### 주요 RFC 문서

워킹 그룹은 2007년에 다음과 같은 RFC 문서를 발행했다.

1. **침입 탐지 메시지 교환 요구사항 (RFC 4766)**

   Intrusion Detection Message Exchange Format (IDMEF)의 요구사항을 정의하며, IDMEF를 통신하기 위한 프로토콜의 요구사항도 명시한다.

2. **침입 탐지 메시지 교환 형식 (RFC 4765)**

   침입 탐지 시스템에서 내보내는 정보를 표현하는 데이터 모델을 설명하고, 이 모델을 사용하는 이유를 설명한다. 이 문서에는 XML로 구현된 데이터 모델, XML 문서 유형 정의(DTD) 및 예제가 포함된다.

3. **침입 탐지 교환 프로토콜 (RFC 4767)**

   침입 탐지 엔터티 간의 데이터 교환을 위한 애플리케이션 수준 프로토콜인 Intrusion Detection Exchange Protocol (IDXP)을 설명한다. IDXP는 상호 인증, 무결성, 연결 지향 프로토콜을 통한 기밀성을 지원한다.

### 침입 탐지 메시지 교환 모델

이 모델은 특정 제품이나 구현과 일치하지 않지만, 모든 IDS의 핵심 요소를 포함한다. 주요 구성 요소는 다음과 같다.

1. **데이터 소스 (Data Source)**
   - **설명**: IDS가 비인가 또는 원하지 않는 활동을 탐지하는 데 사용하는 원시 데이터.
   - **예시**: 네트워크 패킷, 운영 체제 감사 로그, 애플리케이션 감사 로그, 시스템 생성 체크섬 데이터.
2. **센서 (Sensor)**
   - **설명**: 데이터 소스로부터 데이터를 수집하고 이벤트를 분석기로 전달한다.
3. **분석기 (Analyzer)**
   - **설명**: 센서가 수집한 데이터를 분석하여 비인가된 활동 또는 보안 관리자에게 관심 있는 이벤트를 식별한다.
   - **기능**: 이벤트가 관심이 있을 경우 이를 관리 구성 요소에 알림으로 전송한다.
4. **관리자 (Administrator)**
   - **설명**: 조직의 보안 정책 설정 및 IDS 배포 및 구성에 대한 전반적인 책임을 가진 사람.
   - **역할**: 보안 정책 설정, IDS 운영 및 구성 결정.
5. **매니저 (Manager)**
   - **설명**: IDS의 다양한 구성 요소를 관리하는 ID 구성 요소 또는 프로세스.
   - **기능**: 센서 구성, 분석기 구성, 이벤트 알림 관리, 데이터 통합 및 보고.
6. **운영자 (Operator)**
   - **설명**: IDS 매니저를 주로 사용하는 사람.
   - **역할**: IDS 출력을 모니터링하고 추가 조치를 권장하거나 시작.

### 침입 탐지 과정

침입 탐지는 다음과 같은 절차를 따른다.

1. **데이터 모니터링**: 센서는 네트워크 세션, 운영 체제 로그 파일, 애플리케이션 로그 파일 등의 데이터를 모니터링하여 의심스러운 활동을 탐지한다.
2. **이벤트 생성**: 센서는 의심스러운 활동을 이벤트로 분석기에 전달한다.
3. **이벤트 분석**: 분석기는 이벤트를 분석하여 비정상 활동 여부를 판단하고, 필요시 경고를 생성하여 매니저에 전송한다.
4. **알림 및 대응**: 매니저는 경고를 운영자에게 전달하며, 운영자는 필요한 경우 대응 조치를 취한다.

## 8.8 Honeypots

---

허니팟은 중요한 시스템에서 잠재적 공격자를 유인하기 위해 설계된 미끼 시스템이다. 허니팟은 다음과 같은 목적으로 사용된다.

- 중요한 시스템에 대한 공격을 방지한다.
- 공격자의 활동에 대한 정보를 수집한다.
- 공격자가 시스템에 오래 머물도록 유도하여 관리자가 대응할 시간을 벌어준다.

### 허니팟의 주요 특징

1. **유인 및 정보 수집**
   - 허니팟은 실제로 가치 있는 정보로 보이는 허위 정보를 채워 넣어 공격자를 유인한다.
   - 합법적인 사용자는 허니팟에 접근하지 않으므로, 허니팟에 대한 접근은 의심스럽다.
   - 민감한 모니터와 이벤트 로거를 통해 접근을 감지하고 공격자의 활동을 기록한다.
2. **생산성 없는 리소스**
   - 허니팟은 생산적인 가치를 가지지 않으며, 외부 네트워크에서 허니팟과 상호 작용할 합법적인 이유가 없다.
   - 허니팟에 대한 통신 시도는 대부분 스캔, 프로브 또는 공격일 가능성이 높다.

### 허니팟의 유형

1. **저 상호작용 허니팟 (Low Interaction Honeypot)**
   - 소프트웨어 패키지로 특정 IT 서비스나 시스템을 에뮬레이션하여 초기 상호작용을 제공하지만, 실제 서비스나 시스템을 완전히 실행하지 않는다.
   - **장점**: 적은 자원으로 운영 가능, 간단한 설치와 관리.
   - **단점**: 공격자가 빠르게 탐지할 수 있으며, 실제 시스템처럼 정교하지 않음.
2. **고 상호작용 허니팟 (High Interaction Honeypot)**
   - 실제 운영체제, 서비스 및 애플리케이션을 포함한 실제 시스템으로 구성된다.
   - **장점**: 공격자를 더 오래 유인할 수 있으며, 상세한 정보를 수집 가능.
   - **단점**: 많은 자원이 필요하고, 타 시스템을 공격하는 데 악용될 수 있음.

### 허니팟 배치 위치

허니팟은 다양한 위치에 배치될 수 있으며, 배치 위치에 따라 다양한 장단점이 있다.

1. **외부 방화벽 외부 (Location 1)**
   - **장점**: 사용되지 않는 IP 주소에 대한 연결 시도를 추적하며, 내부 네트워크에 위험을 증가시키지 않음.
   - **단점**: 내부 공격자를 포착하기 어렵고, 외부 방화벽이 양방향 트래픽을 필터링하는 경우 허니팟의 효과가 제한됨.
2. **DMZ(비무장지대) 내부 (Location 2)**
   - **장점**: 웹, 메일 등 외부 서비스가 위치한 네트워크에서 공격자를 유인.
   - **단점**: DMZ는 완전히 접근 가능하지 않으며, 불필요한 서비스에 대한 접근을 차단하기 위해 방화벽이 트래픽을 차단함. 허니팟의 효과를 제한하거나 방화벽 설정을 복잡하게 만들 수 있음.
3. **내부 네트워크 (Location 3)**
   - **장점**: 내부 공격자를 포착할 수 있으며, 잘못 구성된 방화벽을 탐지할 수 있음.
   - **단점**: 허니팟이 타 내부 시스템을 공격할 수 있는 위험이 있으며, 방화벽이 허니팟으로의 트래픽을 허용하도록 설정되어야 하므로 내부 네트워크의 보안이 복잡해질 수 있음.