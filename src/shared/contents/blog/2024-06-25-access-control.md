---
title: "[Computer Security] Access Control"
layout: post
author: kurtyoon # 작성자
banner: https://i.esdrop.com/d/f/hhaNifrpr0/tyBoa4NUyG.png # 배너 이미지
categories:
  - Computer Security
tags:
  - Computer Security
article: "Access Control" # 포스트 내용 함축
date: "2024-06-25 20:50:00 +0900"
sidebar: []
published: true
comments: true
---

## 4.1 Access Control Principles

---

접근 제어는 컴퓨터 보안의 중요 요소로, 시스템 자원의 사용을 보안 정책에 따라 규제하는 과정을 의미한다.

접근 제어는 Authentication, Authorization, Audit과 관련이 있다.

### 접근 제어의 정의

1. **NIST IR 7298**

접근 제어를 특정 요청을 허용하거나 거부하는 과정으로 정의한다. 이는 정보와 관련된 정보 처리 서비스를 획득하고 사용하는 것, 그리고 특정 물리적 시설에 들어가는 것을 포함한다.

1. **RFC 4949**: 시스템 자원의 사용을 보안 정책에 따라 규제하며, 이는 허가된 엔티티(사용자, 프로그램, 프로세스 또는 다른 시스템)만이 접근할 수 있도록 한다.

### 접근 제어의 목적

컴퓨터 보안의 주요 목적은 다음과 같다.

- 비인가 사용자가 자원에 접근하는 것을 방지
- 정당한 사용자가 비인가 방식으로 자원에 접근하는 것을 방지
- 정당한 사용자가 적절한 방식으로 자원에 접근할 수 있도록 허용

### 접근 제어와 관련된 기능

- **인증 (Authentication)**: 사용자의 자격 증명이 유효한지 검증하는 과정
- **인가 (Authorization)**: 시스템 자원에 접근할 수 있는 권한을 부여하는 과정으로, 특정 목적을 위해 누구를 신뢰할 지 결정
- **감사 (Audit)**: 시스템 기록과 활동을 독립적으로 검토하고 검증하여, 시스템 제어의 적정성을 테스트하고, 정책과 운영 절차의 준수 여부를 확인하며, 보안 위반을 감지하고 필요한 변경 사항을 권고하는 과정

### 접근 제어 정책

- **임의 접근 제어 (DAC)**: 요청자의 신원과 요청자가 할 수 있는 행동을 기술하는 접근 규칙을 기반으로 접근을 제어함
- **강제 접근 제어 (MAC)**: 보안 레이블과 보안 인가를 비교하여 접근을 제어함
- **역할 기반 접근 제어 (RBAC)**: 시스템 내에서 사용자의 역할에 따라 접근을 제어함
- **속성 기반 접근 제어 (ABAC)**: 사용자, 자원, 환경 조건의 속성에 따라 접근을 제어함

### 접근 제어 메커니즘

접근 제어 메커니즘은 사용자와 시스템 자원 간의 중재 역할을 한다.

1. 시스템은 먼저 접근하려는 엔티티를 인증한다.
2. 접근 제어 기능은 인증된 사용자의 특정 접근 요청이 허용되는지 결정한다.
3. 보안 관리자는 사용자에 대한 접근 권한을 명시한 권한 부여 데이터베이스를 유지 관리한다.
4. 감사 기능은 시스템 자원에 대한 사용자 접근을 모니터링하고 기록한다.

이러한 접근 제어 원칙은 컴퓨터 보안의 필수 요소로, 시스템 자원에 대한 적절한 접근을 보장하고, 비인가 접근을 방지하는 역할을 한다.

## 4.2 Subjects, Objects and Access Rights

---

### 접근 제어의 기본 요소

접근 제어의 기본 요소는 주체(subject), 객체(object) 및 접근 권한(access right)이다.

### 주체 (Subjects)

주체는 객체에 접근할 수 있는 엔티티를 의미한다. 일반적으로 주체는 프로세스와 동일시된다. 사용자는 프로세스를 통해 객체에 접근하며, 이 프로세스는 사용자의 속성(예: 접근 권한)을 가진다. 주체는 자신이 시작한 행동에 대해 책임을 지며, 객체에 대해 주체가 수행한 보안 관련 행동을 기록하는 감사 추적이 사용될 수 있다.

주체는 세 가지 클래스로 정의된다.

- **소유자 (Owner)**: 파일과 같은 자원의 생성자가 소유자가 될 수 있으며, 시스템 자원의 경우 시스템 관리자에게 소유권이 있을 수 있다.
- **그룹 (Group)**: 사용자 그룹에 속한 사용자들에게 접근 권한을 부여할 수 있다. 사용자는 여러 그룹에 속할 수 있다.
- **세계 (World)**: 소유자와 그룹에 속하지 않는 사용자가 가지는 최소한의 접근 권한이다.

### 객체 (Objects)

객체는 접근이 제어되는 자원이다. 일반적으로 객체는 정보를 담거나 수신하는 엔티티를 의미한다. 예로는 레코드, 파일, 디렉토리, 메일박스 등이 있다. 어떤 접근 제어 시스템은 비트, 바이트, 단어, 프로세서, 통신 포트, 네트워크 노드 등을 포함할 수 있다.

객체의 수와 유형은 접근 제어가 운영되는 환경과 보안 수준, 복잡성, 처리 부담 및 사용 용이성 간의 균형에 따라 달라진다.

### 접근 권한 (Access Rights)

접근 권한은 주체가 객체를 접근하는 방식을 설명한다. 접근 권한의 예는 다음과 같다.

- **읽기 (Read)**: 사용자가 시스템 자원의 정보를 볼 수 있다. 이는 복사 또는 출력할 수 있는 권한을 포함한다.
- **쓰기 (Write)**: 사용자가 시스템 자원의 데이터를 추가, 수정 또는 삭제할 수 있다. 이는 읽기 권한을 포함한다.
- **실행 (Execute)**: 사용자가 특정 프로그램을 실행할 수 있다.
- **삭제 (Delete)**: 사용자가 파일이나 레코드 같은 특정 시스템 자원을 삭제할 수 있다.
- **생성 (Create)**: 사용자가 새로운 파일, 레코드 또는 필드를 생성할 수 있다.
- **검색 (Search)**: 사용자가 디렉토리의 파일을 나열하거나 검색할 수 있다.

이러한 주체, 객체 및 접근 권한의 정의는 접근 제어 시스템의 핵심 요소이며, 이들을 기반으로 다양한 접근 제어 모델이 구현될 수 있다.

## 4.3 Discretionary Access Control

---

임의 접근 제어(DAC)는 자원에 대한 접근 권한을 엔티티(사용자, 그룹 등)에게 부여하고, 이 권한을 부여받은 엔티티가 다른 엔티티에게도 접근 권한을 부여할 수 있는 접근 제어 방식이다.

### 접근 매트릭스

DAC는 접근 매트릭스라는 개념을 사용하여 주체와 객체 간의 접근 권한을 관리한다. 접근 매트릭스는 주체와 객체를 행과 열로 구성하고, 각 셀에는 해당 주체가 해당 객체에 대해 가지는 접근 권한을 기록한다.

### 접근 매트릭스의 예

|          | 파일 1           | 파일 2           | 파일 3           | 파일 4           |
| -------- | ---------------- | ---------------- | ---------------- | ---------------- |
| 사용자 A | 소유, 읽기, 쓰기 |                  | 소유, 읽기, 쓰기 |                  |
| 사용자 B | 읽기             | 소유, 읽기, 쓰기 | 쓰기             | 읽기             |
| 사용자 C | 읽기, 쓰기       | 읽기             |                  | 소유, 읽기, 쓰기 |

이 매트릭스에서 사용자 A는 파일 1과 파일 3에 대한 소유권을 가지고 있으며, 사용자 B는 파일 2와 파일 4에 대한 접근 권한을 가지고 있다.

### 접근 제어 목록 (ACL)과 권한 티켓

접근 매트릭스는 두 가지 방식으로 분해될 수 있다.

1. **접근 제어 목록 (Access Control Lists, ACLs)**: 객체마다 접근 권한을 가진 주체와 그 권한을 나열한다.
2. **권한 티켓 (Capability Tickets)**: 주체마다 접근 가능한 객체와 그 권한을 나열한다.

**접근 제어 목록 예시**

파일 1에 대한 접근 제어 목록:

| 사용자   | 권한             |
| -------- | ---------------- |
| 사용자 A | 소유, 읽기, 쓰기 |
| 사용자 B | 읽기             |
| 사용자 C | 읽기, 쓰기       |

**권한 티켓 예시**

사용자 A에 대한 권한 티켓:

| 객체   | 권한             |
| ------ | ---------------- |
| 파일 1 | 소유, 읽기, 쓰기 |
| 파일 3 | 소유, 읽기, 쓰기 |

### DAC 모델의 구현

DAC 모델은 주체가 자원에 대한 접근 권한을 다른 주체에게 부여할 수 있는 유연성을 제공한다. 이는 다음과 같은 규칙으로 구현된다:

- **권한 이전 (Transfer)**: 주체가 자신의 접근 권한을 다른 주체에게 이전할 수 있다.
- **권한 부여 (Grant)**: 주체가 자신의 접근 권한을 다른 주체에게 부여할 수 있다.
- **권한 삭제 (Delete)**: 주체가 자신의 접근 권한을 삭제할 수 있다.
- **객체 생성 (Create Object)**: 주체가 새로운 객체를 생성할 수 있다.
- **객체 삭제 (Destroy Object)**: 주체가 객체를 삭제할 수 있다.
- **주체 생성 (Create Subject)**: 주체가 새로운 주체를 생성할 수 있다.
- **주체 삭제 (Destroy Subject)**: 주체가 주체를 삭제할 수 있다.

### 보호 도메인

보호 도메인은 객체와 그 객체에 대한 접근 권한의 집합으로 정의된다. 각 주체는 하나 이상의 보호 도메인과 연관될 수 있으며, 이를 통해 주체의 접근 권한을 세밀하게 제어할 수 있다.

이러한 DAC 모델은 사용자 중심의 접근 제어를 구현하는 데 유용하며, 사용자가 자신의 자원에 대해 세부적인 접근 권한을 관리할 수 있도록 한다.

## 4.4 Example: Unix File Access Control

---

UNIX 운영 체제에서는 파일과 디렉토리에 대한 접근 제어를 inode를 통해 관리한다. inode는 파일의 속성, 권한 및 기타 제어 정보를 포함하는 구조체이다. 모든 파일은 고유한 inode를 가지며, 여러 파일 이름이 하나의 inode에 연결될 수 있지만, 각 파일은 정확히 하나의 inode에 의해 제어된다.

### UNIX 파일 접근 권한

각 UNIX 파일은 사용자 ID(UID)와 그룹 ID(GID)에 할당된다. 파일에는 소유자, 그룹 및 기타 사용자에 대한 읽기(read), 쓰기(write), 실행(execute) 권한이 설정된 12개의 보호 비트가 있다.

### 보호 비트의 구조

- **소유자(Owner) 권한**: 파일의 소유자에게 적용되는 읽기, 쓰기, 실행 권한
- **그룹(Group) 권한**: 파일이 속한 그룹의 사용자에게 적용되는 읽기, 쓰기, 실행 권한
- **기타 사용자(Other) 권한**: 소유자와 그룹에 속하지 않는 모든 사용자에게 적용되는 읽기, 쓰기, 실행 권한

### 예시

다음은 UNIX 파일의 권한을 나타내는 예시이다.

| 유형 | 소유자 | 그룹 | 기타 사용자 |
| ---- | ------ | ---- | ----------- |
| 파일 | rw-    | r--  | ---         |

이 예시에서

- 소유자는 읽기(r)와 쓰기(w) 권한을 가진다.
- 그룹 사용자는 읽기(r) 권한만 가진다.
- 기타 사용자는 아무 권한도 없다.

### 추가적인 특수 권한

UNIX 파일 시스템에는 세 가지 특수 권한이 있다:

1. **SetUID (Set User ID)**: 실행 파일에 설정되면, 파일을 실행하는 사용자는 파일 소유자의 권한을 임시로 획득한다.
2. **SetGID (Set Group ID)**: 실행 파일에 설정되면, 파일을 실행하는 사용자는 파일이 속한 그룹의 권한을 임시로 획득한다. 디렉토리에 설정되면, 디렉토리 내의 새로운 파일은 부모 디렉토리의 그룹을 상속받는다.
3. **Sticky 비트**: 디렉토리에 설정되면, 오직 파일의 소유자만이 파일을 삭제하거나 이름을 변경할 수 있다.

### 슈퍼유저 권한

UNIX 시스템에서는 특별한 사용자 ID인 슈퍼유저(superuser)가 존재한다. 슈퍼유저는 시스템의 모든 파일에 대한 완전한 접근 권한을 가지며, 접근 제어 제약을 받지 않는다. 슈퍼유저 권한이 필요한 프로그램은 신중하게 작성되어야 한다.

### 확장된 접근 제어 목록 (Extended ACLs)

전통적인 UNIX 접근 제어는 간단하지만, 복잡한 접근 제어 요구사항을 충족하기에는 한계가 있다. 이를 해결하기 위해 확장된 접근 제어 목록(ACL)이 도입되었다.

확장된 ACL은 다음과 같은 기능을 제공한다.

- 추가적인 사용자와 그룹에 대한 권한 설정
- 파일마다 다양한 접근 권한 부여

| 유형 | 사용자      | 권한 |
| ---- | ----------- | ---- |
| 기본 | 소유자      | rw-  |
| 추가 | 사용자 Joe  | rw-  |
| 기본 | 그룹        | r--  |
| 기본 | 기타 사용자 | ---  |

이 구조에서 'Joe' 사용자에게 읽기와 쓰기 권한이 추가로 부여되었다.

이러한 UNIX 파일 접근 제어 방식은 파일과 디렉토리에 대한 세부적인 접근 제어를 가능하게 하며, 보안과 편의성을 모두 제공한다.

## 4.5 Role-Based Access Control

---

역할 기반 접근 제어(RBAC)는 사용자의 신원보다는 사용자가 시스템 내에서 수행하는 역할에 따라 접근 권한을 부여하는 접근 제어 방식이다. 이는 주로 조직 내의 직무 기능에 기반하여 역할을 정의하고, 각 역할에 특정 접근 권한을 할당하는 방식으로 이루어진다.

### RBAC의 주요 개념

RBAC 시스템은 다음과 같은 주요 개념들로 구성된다:

1. **사용자 (User)**: 시스템에 접근하는 개인. 각 사용자에게는 하나 이상의 역할이 할당된다.
2. **역할 (Role)**: 조직 내의 직무 기능을 나타내며, 특정 권한을 가진다.
3. **권한 (Permission)**: 하나 이상의 시스템 자원에 대한 접근 권한을 정의한다.
4. **세션 (Session)**: 사용자가 활성화한 역할의 집합으로, 세션 동안 사용자는 필요한 역할만 활성화하여 최소 권한 원칙을 구현할 수 있다.

### 역할의 계층 구조

RBAC 시스템에서는 역할의 계층 구조를 정의할 수 있다. 상위 역할은 하위 역할의 권한을 상속받을 수 있다. 이는 조직 내의 직무 구조를 반영하여 역할 간의 관계를 설정하는 데 유용하다.

| 역할            | 상위 역할             |
| --------------- | --------------------- |
| 프로젝트 관리자 | 엔지니어, 품질 관리자 |
| 엔지니어        | 기본 사용자           |
| 품질 관리자     | 기본 사용자           |

이 계층 구조에서 '프로젝트 관리자' 역할은 '엔지니어'와 '품질 관리자' 역할의 권한을 모두 상속받는다.

### RBAC 모델의 유형

RBAC 시스템은 다양한 기능과 서비스를 포함할 수 있다. 이를 명확히 하기 위해, RBAC의 기능을 네 가지 참조 모델로 나눌 수 있다:

1. **RBAC0 (기본 모델)**: 사용자-역할 할당 및 역할-권한 할당의 기본 기능을 포함한다.
2. **RBAC1 (역할 계층)**: 역할 계층 구조를 포함하여 역할 간의 상속 관계를 정의한다.
3. **RBAC2 (제약 조건)**: 상호 배타적 역할, 역할 수의 제한 등 제약 조건을 추가한다.
4. **RBAC3 (통합 모델)**: RBAC1과 RBAC2의 기능을 모두 포함한다.

### RBAC의 이점

RBAC는 다음과 같은 이점을 제공한다.

- **관리의 용이성**: 역할을 통해 권한을 중앙에서 관리할 수 있어 관리가 용이하다.
- **보안 강화**: 최소 권한 원칙을 쉽게 구현할 수 있다.
- **정책 준수**: 역할과 권한의 명확한 정의를 통해 보안 정책 준수를 강화할 수 있다.

### RBAC의 구현

RBAC를 구현하기 위해서는 다음과 같은 단계를 따른다.

1. **역할 정의**: 조직 내의 직무 기능에 따라 역할을 정의한다.
2. **권한 할당**: 각 역할에 필요한 권한을 할당한다.
3. **사용자 할당**: 각 사용자에게 적절한 역할을 할당한다.
4. **세션 관리**: 사용자가 필요한 역할을 활성화하여 세션을 관리한다.

RBAC는 조직의 구조와 보안 요구 사항을 반영하여 유연하고 효율적인 접근 제어를 제공한다.

## 4.6 Attribute-Based Access Control

---

속성 기반 접근 제어(ABAC)는 주체(사용자), 객체(자원), 환경 조건 및 요청된 작업의 속성을 평가하여 접근 권한을 결정하는 접근 제어 모델이다. ABAC는 유연성과 표현력이 뛰어나며, 다양한 조건을 조합하여 세밀한 접근 제어를 구현할 수 있다.

### ABAC의 주요 요소

ABAC 모델은 다음과 같은 세 가지 주요 요소로 구성된다:

1. **속성 (Attributes)**: 주체, 객체, 환경 조건을 나타내는 특성이다.
   - **주체 속성 (Subject Attributes)**: 사용자, 애플리케이션, 프로세스, 장치 등의 특성을 정의한다. 예: 사용자 ID, 이름, 조직, 직책.
   - **객체 속성 (Object Attributes)**: 자원(파일, 레코드, 네트워크 등)의 특성을 정의한다. 예: 파일 제목, 작성자, 생성일.
   - **환경 속성 (Environment Attributes)**: 접근 요청이 이루어지는 환경의 특성을 정의한다. 예: 현재 시간, 네트워크 보안 수준.
2. **정책 모델 (Policy Model)**: ABAC 정책을 정의한다. 정책은 속성을 평가하여 접근 권한을 결정하는 규칙 집합이다.
3. **아키텍처 모델 (Architecture Model)**: 정책을 적용하여 접근 제어를 강제하는 구조를 정의한다.

### ABAC의 동작 방식

ABAC 시스템은 다음과 같은 단계로 동작한다:

1. **접근 요청**: 주체가 객체에 접근을 요청한다.
2. **속성 평가**: 접근 제어 메커니즘이 주체, 객체, 환경의 속성을 평가한다.
3. **정책 평가**: 사전 정의된 정책에 따라 속성을 평가하여 접근 권한을 결정한다.
4. **접근 허용/거부**: 평가 결과에 따라 접근을 허용하거나 거부한다.

### 예시

ABAC를 이용한 영화 스트리밍 서비스의 접근 제어 예시는 다음과 같다:

- **주체 속성**: 사용자 나이(Age), 회원 유형(MembershipType)
- **객체 속성**: 영화 등급(Rating), 영화 유형(MovieType)
- **정책**:
  - R등급 영화는 17세 이상 사용자만 접근 가능
  - PG-13등급 영화는 13세 이상 사용자만 접근 가능
  - G등급 영화는 모든 사용자 접근 가능
  - 신작 영화는 프리미엄 회원만 접근 가능

### ABAC의 장점

1. **유연성**: 다양한 속성을 조합하여 세밀한 접근 제어를 구현할 수 있다.
2. **표현력**: 복잡한 접근 제어 정책을 명확하게 정의할 수 있다.
3. **확장성**: 새로운 속성과 정책을 쉽게 추가할 수 있다.

### ABAC의 구현

ABAC를 구현하기 위해서는 다음과 같은 요소들이 필요하다:

1. **속성 정의**: 주체, 객체, 환경의 속성을 정의하고 관리한다.
2. **정책 정의**: 접근 제어 정책을 정의하고, 이를 평가하기 위한 규칙을 설정한다.
3. **평가 엔진**: 속성과 정책을 평가하여 접근 결정을 내리는 엔진을 구현한다.

ABAC는 세밀하고 유연한 접근 제어를 제공하는 강력한 모델이다. 주체와 객체의 속성뿐만 아니라 환경 조건까지 평가하여 접근 권한을 결정하므로, 다양한 상황에 맞춤형 접근 제어를 구현할 수 있다.

## 4.7 Identity, Credential, and Access Management

---

신원, 자격 증명 및 접근 관리(ICAM)는 디지털 신원(및 관련 속성), 자격 증명, 그리고 접근 제어를 관리하고 구현하는 포괄적인 접근 방식이다. 이 개념은 주로 미국 정부에 의해 개발되었으나, 기업들이 통합된 접근 제어 방법을 모색할 때도 유용하게 활용된다. ICAM의 목표는 신뢰할 수 있는 디지털 신원을 생성하고 이를 자격 증명에 연결하여 적절한 접근 권한을 제공하는 것이다.

### ICAM의 주요 구성 요소

1. **신원 관리 (Identity Management)**
2. **자격 증명 관리 (Credential Management)**
3. **접근 관리 (Access Management)**
4. **신원 연합 (Identity Federation)**

### 신원 관리

신원 관리는 디지털 신원에 속성을 할당하고 이를 개인 또는 비인격적 엔티티(NPE)에 연결하는 것을 의미한다. 주요 기능은 다음과 같다.

- **신원 데이터 수집**: 온보딩 과정에서 신원 데이터를 수집한다.
- **디지털 신원 구성**: 여러 속성을 조합하여 유일한 디지털 신원을 만든다.
- **라이프사이클 관리**: 신원 정보의 보호, 접근 제어, 데이터 공유, 신원 폐기 등을 포함한다.

### 자격 증명 관리

자격 증명 관리는 자격 증명의 생애 주기를 관리하는 것을 의미한다. 주요 단계는 다음과 같다.

1. **스폰서십 (Sponsorship)**: 자격 증명을 필요로 하는 개인 또는 엔티티를 스폰서한다.
2. **등록 (Enrollment)**: 자격 증명을 등록하며, 신원 증명과 생체 데이터 수집을 포함한다.
3. **자격 증명 생산 (Credential Production)**: 암호화, 디지털 서명, 스마트카드 생산 등을 포함한다.
4. **자격 증명 발급 (Issuance)**: 자격 증명을 개인 또는 NPE에 발급한다.
5. **자격 증명 유지 관리 (Maintenance)**: 자격 증명의 갱신, 재발급, PIN 재설정, 정지 및 복구를 포함한다.

### 접근 관리

접근 관리는 자원에 대한 접근 권한을 관리하고 제어하는 것이다. 이는 논리적 및 물리적 접근 모두를 포함한다. 주요 지원 요소는 다음과 같다.

- **자원 관리 (Resource Management)**: 접근 제어 규칙을 정의하고 관리한다.
- **특권 관리 (Privilege Management)**: 개인의 접근 프로필을 정의하고 유지 관리한다.
- **정책 관리 (Policy Management)**: 접근 거래에서 허용되는 행동을 규정하는 정책을 관리한다.

### 신원 연합

신원 연합은 두 가지 질문을 다룬다.

1. 외부 조직의 신원을 어떻게 신뢰할 것인가?
2. 외부 조직과 협업할 때 자신의 조직 내 신원을 어떻게 보증할 것인가?

신원 연합은 다른 조직이 생성하고 발급한 디지털 신원, 신원 속성 및 자격 증명을 신뢰할 수 있게 하는 기술, 표준, 정책 및 프로세스를 의미한다.

### ICAM 아키텍처

ICAM 아키텍처는 다음과 같은 구성 요소들로 이루어진다.

- **신원 관리**: 디지털 신원의 생애 주기를 관리하고, 속성 소스를 신뢰할 수 있도록 한다.
- **자격 증명 관리**: 자격 증명의 발급, 유지, 폐기를 포함한 생애 주기를 관리한다.
- **접근 관리**: 정책, 특권, 자원 관리를 통해 접근 권한을 제어한다.
- **신원 연합**: 외부 조직과의 신원 연합을 통해 신원을 신뢰할 수 있도록 한다.

ICAM은 신원, 자격 증명 및 접근 관리를 통합하여 보안성을 강화하고 관리의 효율성을 높인다. 이는 조직이 신뢰할 수 있는 디지털 신원을 생성하고 이를 자격 증명에 연결하여 적절한 접근 권한을 제공하는 데 중요한 역할을 한다.

## 4.8 Trust Frameworks

---

신뢰적인 프레임워크는 인터넷 비즈니스, 네트워크 서비스 제공자, 대규모 기업의 핵심 관심사인 신뢰, 신원 및 속성의 상호 작용을 다루는 개념이다. 이는 전자 상거래, 기업 내부 자원 접근, 파트너 간 정보 공유 등 다양한 상황에서 중요한 역할을 한다.

### 전통적인 신원 교환 방식

전통적인 신원 교환 방식은 사용자, 신원 서비스 제공자 및 의존 파티 간의 삼각형 관계를 기반으로 한다. 이 방식은 다음과 같은 요구 사항을 충족해야 한다.

1. **의존 파티의 요구 사항**: 사용자에 대한 신뢰를 제공하기 위해, 신원 서비스 제공자는 사용자의 속성이 정확하고 신뢰할 수 있음을 보장해야 한다.
2. **신원 서비스 제공자의 요구 사항**: 신원 서비스 제공자는 사용자가 제공한 정보가 정확하며, 정보를 공유할 때 의존 파티가 계약 조건과 법률을 준수하도록 보장해야 한다.
3. **사용자의 요구 사항**: 사용자는 신원 서비스 제공자와 의존 파티가 민감한 정보를 신뢰할 수 있으며, 자신의 개인정보 보호 선호도를 존중할 것을 보장해야 한다.

### 신뢰적인 프레임워크의 구성 요소

신뢰적인 프레임워크는 다양한 요소를 포함하여 복잡한 신뢰 관계를 관리한다. 주요 구성 요소는 다음과 같다.

1. **신원 서비스 제공자 (Identity Service Providers)**: 사용자에 대한 신원을 관리하고 확인하는 역할을 한다.
2. **속성 제공자 (Attribute Providers)**: 사용자의 다양한 속성을 관리하고 제공한다.
3. **의존 파티 (Relying Parties)**: 신원 서비스 제공자가 제공하는 정보를 신뢰하고 사용하는 비즈니스나 서비스 제공자이다.
4. **평가자 및 감사자 (Assessors & Auditors)**: 신뢰 프레임워크의 정책과 절차를 평가하고 감시한다.
5. **분쟁 해결자 (Dispute Resolvers)**: 신뢰 프레임워크 내에서 발생하는 분쟁을 해결하는 역할을 한다.
6. **속성 교환 네트워크 (Attribute Exchange Network)**: 속성 정보를 교환하는 네트워크이다.

### 신뢰적인 프레임워크의 역할

신뢰적인 프레임워크는 다음과 같은 역할을 수행한다.

- **속성의 신뢰성 보장**: 사용자의 속성이 정확하고 신뢰할 수 있음을 보장한다.
- **정책 준수 보장**: 정보를 공유하는 모든 당사자가 정책과 법률을 준수하도록 한다.
- **프라이버시 보호**: 사용자의 개인정보 보호 선호도를 존중하고 이를 보장한다.

### 신뢰적인 프레임워크의 구현

신뢰적인 프레임워크를 구현하기 위해서는 다음과 같은 단계를 따른다.

1. **정책 수립**: 신뢰 프레임워크 내에서 정보를 공유할 때 준수해야 할 정책과 절차를 수립한다.
2. **신원 및 속성 관리**: 신원 서비스 제공자와 속성 제공자가 사용자의 신원과 속성을 관리하고 검증한다.
3. **신뢰 관계 설정**: 신뢰 프레임워크 내의 모든 당사자 간의 신뢰 관계를 설정하고 유지한다.
4. **평가 및 감사**: 정기적으로 프레임워크의 정책과 절차를 평가하고 감사하여 신뢰성을 유지한다.

### 전통적인 접근 방식과 신뢰적인 프레임워크의 비교

전통적인 접근 방식에서는 신원 서비스 제공자와 의존 파티 간의 직접적인 신뢰 관계가 중심이 되지만, 신뢰적인 프레임워크에서는 다양한 제공자와 네트워크가 복잡하게 얽혀 있어 더 많은 신뢰 관계를 관리해야 한다. 신뢰적인 프레임워크는 이러한 복잡한 신뢰 관계를 체계적으로 관리하고, 각 당사자가 자신의 역할을 충실히 수행하도록 돕는다.

신뢰적인 프레임워크는 인터넷 비즈니스와 대규모 기업에서 신뢰성, 보안, 프라이버시를 유지하는 데 중요한 역할을 한다. 이를 통해 다양한 당사자 간의 신뢰 관계를 효율적으로 관리하고, 정책 준수와 개인정보 보호를 보장할 수 있다.