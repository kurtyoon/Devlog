---
title: "[Spring boot] 토비의 스프링 3.1 오브젝트와 의존관계"
layout: post
subtitle: "[토비의 스프링 3.1] 1장 오브젝트와 의존관계를 읽고"
author: kurtyoon # 작성자
banner: https://i.esdrop.com/d/f/hhaNifrpr0/SLCxQY3taU.png # 배너 이미지
categories:
  - Spring boot
tags:
  - Spring boot
  - IoC
article: "[토비의 스프링 3.1] 1장 오브젝트와 의존관계를 읽고 정리한 내용이다." # 포스트 내용 함축
date: "2023-11-01 12:00:00 +0900"
sidebar: []
published: false
comments: true
---

> 토비의 스프링 3.1은 스프링이라는 프레임워크를 사용함에 있어서 수학의 정석과 같은 느낌이었다. 스프링 부트를 시작한지 1년정도 된 지금 시점에서 스프링이라는 프레임워크 자체를 조금 더 깊게 공부해보려고 한다. 근데 책이 너무 어렵다.. 1장에서는 **오브젝트와 의존관계**에 대해 다루고 있다. 스프링이 자바에서 가장 중요하게 가치를 두는 것은 바로 **객체지향 프로그래밍**이 가능한 언어라는 점이다. 그 중에서 스프링은 ‘**오브젝트**’에 관심을 많이 둔다. 이런 **오브젝트**와 그 오브젝트와의 **의존관계**에 대해서 알아보자.

## 초난감 DAO

여기서 `DAO`란 DB를 사용해 데이터를 조회하고나 조작하는 기능을 전담하도록 만든 오브젝트를 말한다.

저자는 User의 정보를 DB에 입력하기 위한 UserDao를 통해 1장 전체적으로 오브젝트를 설명한다.

초기 UserDao에서는 다음 관심사항들이 한 코드에 존재한다.

- DB 커넥션을 어떻게 가져오는 것인지에 대한 관심
- DB에 보낼 SQL을 만들고 실행하는 관심
- 리소스를 반환하는 관심

**객체지향의 세계에서는 모든 것이 변한다**. 여기서 변한다는 것은 오브젝트에 대한 설계와 이를 구현한 코드가 변한다는 것이다. 따라서 개발자가 객체를 설계할 때 가장 염두에 둬야 할 사항은 바로 미래의 변화에 어떻게 대비할 것인가이다. 변화는 먼 미래에만 있는 것이 아닌 며칠 내에, 혹은 몇 시간 후에 변화에 대한 요구가 갑자기 발생할 수 있다. 그런데 이렇게 한 코드에 여러 관심사항이 존재하는 경우 **중복코드**를 야기하며, **갑작스러운 변화에 대응하지 못할** 수 있다.

## DAO의 분리

모든 변경과 발전은 한 번에 한 가지 관심사항에 집중해서 일어나게 된다. 따라서 우리가 준비해야할 일은 한 가지 관심이 한 군데에 집중되게 하는 것이다. 이를 프로그래밍의 기초 개념 중 `관심사의 분리` 를 통해 설명한다.

관심사의 분리란 **관심이 같은 것끼리는 하나의 객체 안으로 모이게 하는 것**이다. 우리는 관심이 한 군데에 집중되게 하여, 서로 영향을 주지 않게 해야한다. 또한 변화도 한 곳에서 일어나게 해야 한다.

현재 UserDao에서는 `add()` 메소드와 `get()` 메소드에 DB 커넥션을 가져오는 코드가 중복되어 있다. 가장 먼저 할 일은 중복된 코드를 분리하는 것이다. 이렇게 관심의 종류에 따라 코드를 구분할 경우 관심이 다른 코드가 있는 메소드에는 영향을 주지도 않을뿐더러, 관심 내용이 독립적으로 존재하므로 수정도 간단해진다.

저자는 `리팩토링` 을 통해 여러 메소드에 중복되어 등장하는 특정 관심사항이 담긴 코드를 별도의 메소드로 분리해냈다. 이렇게 공통의 기능을 담당하는 메소드로 중복된 코드를 뽑아내는 것을 리팩토링에서는 `메소드 추출 기법` 이라 한다.

여기서 여러 회사가 다른 종류의 DB를 사용한다고 하고, 각자의 방법으로 DB에 연결한다고 할 때, 해당 UserDao를 사용하는 경우 회사마다 UserDao를 수정해서 사용해야 한다. 이를 해결하는 방법은 DB 커넥션에 대한 관심을 `추상 메소드`로 제공하는 것이다. 각 회사에서는 **서브클래스**를 생성하여 **추상 메소드**로 선언한 커넥션 함수를 원하는 방식대로 구현할 수 있다. 기존에 같은 클래스에 다른 메소드로 분리되어있던 DB 커넥션이라는 관심을 **상속을 통해 서브클래스로 분리**했다.

이처럼 클래스 계층 구조를 통해 두 개의 관심이 독립적으로 분리되며 변경작업은 용이해졌다. 이렇게 슈퍼클래스에 기본적인 로직의 흐름을 만들고, 그 기능의 일부를 추상 메소드나 오버라이딩 가능한 메소드로 만들고, 이를 서브클래스에서 필요에 맞게 구현해서 사용하는 방법을 `템플릿 메소드 패턴`이라 한다. 그리고 서브클래스에서 구체적인 오브젝트 생성 방법을 결정하게 하는 것을 `팩토리 메소드 패턴`이라 한다.

그러나 상속을 사용한다면 다음과 같은 문제가 발생하게 된다.

- **다중 상속의 불가능**
- **상위 메소드가 수정**되는 경우 **하위 메소드의 수정이 불가피**한 경우
- 확장된 기능인 DB 커넥션을 생성하는 코드를 **다른 DAO 클래스에 적용할 수 없음**

## DAO의 확장

모든 오브젝트는 변한다. 그러나 **오브젝트가 모두 동일한 방식으로 변하는 것은 아니다**. 관심사에 따라 분리한 오브젝트들은 제각기 독특한 변화의 특징이 있다. 변화의 성격이 다르다는 것은 **변화의 이유와 시기, 주기 등이 다르다**는 것이다. 이 전에 추상클래스를 만들고 이를 상속한 서브클래스에서 변화가 필요한 부분을 바꿔서 쓸 수 있게 만든 이유는 바로 이렇게 **변화의 성격이 다른 것을 분리**하여, 서로 영향을 주지 않은 채로 **각각 필요한 시점에 독립적으로 변경**할 수 있게 하기 위해서이다.

여러 단점이 많은 상속이라는 방법을 사용하는 대신 **완전히 독립적인** 클래스로 만들어본다. 그런데 이런식으로 사용한다면 상속을 통해 기능을 확장하여 사용하던 것이 불가능해진다. UserDao 코드가 특정 클래스에 종속되어 있어 상속을 사용했을 때처럼 UserDao 코드의 수정 없이 DB 커넥션 생성 기능을 변경할 수 있는 방법이 없어졌다. 이런 근본적인 원인은 UserDao가 바뀔 수 있는 정보, 즉 **DB 커넥션을 가져오는 클래스에 대해 너무 많이 알고 있기 때문**이다.

클래스를 분리하면서 이런 문제를 해결하는 방법은 두 개의 클래스가 **서로 긴밀하게 연결되어 있지 않도록 중간에 추상적인 느슨한 연결고리**를 만들어주는 것이다. `추상화`란 어떤 것들의 **공통적인 성격을 뽑아내 이를 따로 분리**하는 작업이다. `인터페이스`는 **자신을 구현한 클래스에 대한 구체적인 정보는 모두 감춰버린다**. 인터페이스는 어떤 일을 하겠다는 기능만 정의해놓은 것이다. 따라서 인터페이스의 메소드를 통해 알 수 있는 기능에만 관심을 가지면 되지, 그 기능을 어떻게 구현했는지에는 관심을 둘 필요가 없다. UserDao의 다른 모든 곳에서는 인터페이스를 이용하게 만들어서 DB 커넥션을 제공하는 클래스에 대한 구체적인 정보는 모두 제거가 가능했지만, **초기에 어떤 클래스의 오브젝트를 사용할지 결정하는 생성자의 코드는 제거되지 않고 남아있다**.

그 이유는 UserDao 안에 분리되지 않은, **또 다른 관심사항이 존재**하고 있기 때문이다. 이 관심사를 담은 코드를 UserDao에서 분리하지 않으면 UserDao는 **결코 독립적으로 확장 가능한 클래스가 될 수 없다**.

여기서 UserDao의 `클라이언트 오브젝트`가 바로 제3의 관심사항인 **구현 클래스의 관계를 결정해주는 기능을 분리해서 두기에 적절한 곳**이다. **클래스 관계가 만들어진다는 것**은 **한 클래스가 인터페이스 없이 다른 클래스를 직접 사용한다는 뜻**이다. 따라서 클래스가 아니라 **오브젝트와 오브젝트 사이의 관계를 설정**해줘야한다.

오브젝트 사이의 관계가 만들어지려면 일단 **만들어진 오브젝트가 존재**해야 한다. 직접 생성자를 호출해서 오브젝트를 만드는 방법도 있으나 외부에서 만들어 준 것을 가져오는 방법도 있다. 외부에서 만든 오브젝트를 전달받으려면 **메소드 파라미터**나 **생성자 파라미터**를 이용하면 된다.

위에서 인터페이스를 통해 추상화를 진행하더라도, UserDao 오브젝트가 동작하기 위해서는 **특정 클래스의 오브젝트롸 관계를 맺어야** 한다. 그러나 클래스 사이에 관계가 형성되는 것이 아닌, **오브젝트 사이에 다이나믹한 관계**가 형성된다. 코드에서는 특정 클래스를 전혀 알지 못하더라도 해당 클래스가 구현한 인터페이스를 사용했다면, 그 클래스의 오브젝트를 인터페이스 타입으로 받아서 사용할 수 있다. 이는 **객체지향 프로그램**의 `다형성`으로 인한 것이다.

이러한 과정을 통해 UserDao에 있으면 안되는 다른 관심사항, 책임을 클라이언트로 전달했다. 이렇게 **인터페이스를 도입하고 클라이언트의 도움을 얻는 방법은 상속을 사용해 비슷한 시도를 했을 경우에 비해서 훨씬 유연**하다.

지금까지의 과정을 객체지향 기술의 여러 가지 이론을 통해서 설명할 수 있다.

`개방 폐쇄 원칙`

이는 ‘**클래스나 모듈은 확장에는 열려 있어야 하고 변경에는 닫혀 있어야 한다**’로 간단하게 정의 가능하다. UserDao에 영향을 주지 않고도 **얼마든지 기능을 확장**할 수 있어야 하며, UserDao 자신의 핵심 기능을 구현한 코드는 그런 **변화에 영향을 받지 않고 유지**할 수 있어야 한다. 그 외의 `객체지향 설계 원칙 SOLID` 한 번쯤은 보길 바란다.

`높은 응집도`

응집도가 높다는 것은 변화가 일어날 때 **해당 모듈에서 변하는 부분이 크다**는 것이다.

`낮은 결합도`

책임과 관심사가 다른 오브젝트 또는 모듈과는 낮은 결합도, 즉 **느슨하게 연결된 형태**를 유지하는 것이 바람직하다. 서로 독립적이고 알 필요도 없게 만들어 주는 것이다. 여기서 결합도란 ‘**하나의 오브젝트가 변경이 일어날 때에 관계를 맺고 있는 다른 오브젝트에게 변화를 요구하는 정도**’라고 설명 가능하다.

`전략 패턴`

자신의 기능 맥락에서, 필요에 따라 변경이 필요한 알고리즘을 **인터페이스를 통해 통째로 외부로 분리**시키고, 이를 구현한 **구체적인 알고리즘 클래스를 필요에 따라 바꿔서 사용**할 수 있게 하는 디자인 패턴이다. 여기서 알고리즘이란 **독립적인 책임으로 분리가 가능한 기능**을 의미한다.

`스프링`이란 **객체지향적 설계 원칙**과 **디자인 패턴**에 나타난 장점을 자연스럽게 개발자들이 **활용할 수 있게 해주는 프레임워크**이다.

## 제어의 역전(IoC)

`팩토리`

객체의 생성 방법을 경정하고 그렇게 만들어진 오브젝트를 돌려주는 오브젝트이다. 오브젝트를 생성하는 쪽과 생성된 오브젝트를 사용하는 쪽의 역할과 책임을 깔끔하게 분리하려는 목적으로 사용한다.

`제어의 역전`이란 **프로그램의 제어 흐름 구조가 뒤바뀌는 것**을 의미한다.

일반적으로 프로그램의 흐름은 프로그램이 시작되는 지점에서 다음에 사용할 오브젝트를 결정하고, 결정한 오브젝트를 생성하고, 만들어진 오브젝트에 있는 메소드를 호출하고, 그 오브젝트 메소드 안에서 다음에 사용할 것을 결정하고 호출하는 식의 작업이 반복된다. 각 오브젝트는 **프로그램 흐름을 결정하거나 사용할 오브젝트를 구성하는 작업에 능동적으로 참여**한다.

제어의 역전이란 **이런 제어 흐름의 개념을 거꾸로 뒤집는 것**이다. 제어의 역전에서는 오브젝트가 자신이 사용할 오브젝트를 스스로 선택하지 않는다. 생성또한 하지않고, 자신이 어떻게 만들어지고 어디서 사용되는지 알 수 없다. **모든 제어 권한을 자신이 아닌 다른 대상에게 위임**하기 때문이다.

프레임워크도 제어의 역전 개념이 적용된 대표적인 기술이다. 프레임워크가 어떤 것인지 이해하려면 **라이브러리와 프레임워크의 차이점을 알아야 한다**. `라이브러리`를 사용하는 **애플리케이션 코드는 애플리케이션 흐름을 직접 제어**한다. 단지 동작하는 중에 필요한 기능이 있을 때 능동적으로 라이브러리를 사용할 뿐이다. 반면에 `프레임워크`는 거꾸로 **애플리케이션 코드가 프레임워크에 의해 사용**된다. 프레임워크 위에 개발한 클래스를 등록해두고, 프레임워크가 흐름을 주도하는 중에 개발자가 만든 애플리케이션 코드를 사용하도록 만드는 방식이다.

제어의 역전에서는 프레임워크 또는 컨테이너와 같이 **애플리케이션 컴포넌트의 생성과 관계설정, 사용, 생명주기 관리 등을 관장하는 존재가 필요**하다.

## 스프링의 IoC

`빈`

스프링에서는 스프링이 제어권을 가지고 직접 만들고 관계를 부여하는 오브젝트를 뜻한다.

`스프링 빈`

스프링 컨테이너가 생성과 관계설정, 사용 등을 제어해주는 제어의 역전이 적용된 오브젝트를 뜻한다.

`빈 팩토리`

스프링에서는 빈의 생성과 관계설정 같은 제어를 담당하는 IoC 오브젝트를 의미한다. 보통 빈 팩토리보다는 이를 좀 더 확장한 `애플리케이션 컨텍스트` 를 주로 사용한다. 이는 IoC 방식을 따라 만들어진 일종의 빈 팩토리라고 생각하면 된다.

빈 팩토리라고 말할 때는 **빈을 생성하고 관계를 설정하는 IoC의 기본 기능**에 초점을 맞춘 것이고, 애플리케이션 컨텍스트라고 말할 때는 **애플리케이션 전반에 걸쳐 모든 구성요소의 제어 작업을 담당하는 IoC 엔진이라는 의미가 좀 더 부각**된다고 보면 된다.

애플리케이션 컨텍스트는 **빈(오브젝트)의 생성, 관계설정 등의 제어 작업을 총괄**한다. 대신 **별도로 설정 정보를 담고 있는 무엇인가를 가져와 이를 활용하는 범용적인 IoC 엔진 같은 것**이라고 볼 수 있다.

스프링에서 **빈 팩토리를 위한 오브젝트 설정을 담당하는 클래스**라고 인식할 수 있도록 `@Configuration` 이라는 어노테이션을 추가한다. 그리고 **오브젝트를 만들어 주는 메소드**에는 `@Bean` 이라는 어노테이션을 붙여준다. 이 두 가지 어노테이션만으로 **스프링 프레임워크의 빈 팩토리 또는 애플리케이션 컨텍스트가 IoC 방식의 기능을 제공할 때 사용할 완벽한 설정정보**가 된 것이다.

직접 오브젝트 팩토리로 사용했을 대와 비교해서 애플리케이션 컨텍스트를 사용했을 때 얻을 수 있는 장점은 다음과 같다

`클라이언트는 구체적인 팩토리 클래스를 알 필요가 없다`

애플리케이션 컨텍스트를 사용하면 **오브젝트 팩토리가 아무리 많아져도 이를 알아야 하거나 직접 사용할 필요가 없다**. 애플리케이션 컨텍스트를 이용하면 일관된 방식으로 원하는 오브젝트를 가져올 수 있다.

`애플리케이션 컨텍스트는 종합 IoC 서비스를 제공해준다`

오브젝트를 효과적으로 활용할 수 있는 다양한 기능을 제공한다. 또한, 빈이 사용할 수 있는 기반기술 서비스나 외부 시스템과의 연동 등을 컨테이너 차원에서 제공해주기도 한다.

`애플리케이션 컨텍스트는 빈을 검색하는 다양한 방법을 제공한다`

애플리케이션 컨텍스트의 `getBean()` 메소드는 빈의 이름을 이용해 빈을 찾아준다. 타입만으로 빈을 검색하거나 특별한 애노테이션 설정이 되어 있는 빈을 찾을 수도 있다.

## 싱글톤 레지스트리와 오브젝트 스코프

> **오브젝트의 동일성과 동등성**
>
> 동일한 오브젝트와 동일한 정보를 담고 있는 오브젝트에는 차이가 있다.
> 전자는 동일성(identify) 비교, 후자는 동등성(equality) 비교라고 한다. 동일성은 `==` 연산자로, 동등성은 `equals()` 메소드를 이용해 비교한다.
> 두 개의 오브젝트가 동일하지는 않지만 **동등한 경우에는 두 개의 각기 다른 오브젝트가 메모리상에 존재**하는 것이다. 오브젝트의 동등성 기준에 따라 두 오브젝트의 정보가 동등하다고 판단하는 것이다.

스프링은 여러 번에 걸쳐 빈을 요청하더라도 매번 동일한 오브젝트를 돌려준다. 애플리케이션 컨텍스트는 우리가 만들었던 오브젝트 팩토리와 비슷한 방식으로 동작하는 IoC 컨테이너이다. 그러면서 동시에 이 애플리케이션 컨텍스트는 싱글톤을 저장하고 관리하는 `싱글톤 레지스트리`이다. 여기서 싱글톤이라는 것은 디자인 패턴에서 나오는 싱글톤 패턴과 비슷한 개념이지만 그 구현 방법은 확연히 다르다

스프링이 처음 설계됐던 대규모 엔터프라이즈 서버환경은 서버 하나당 최대로 초당 수십에서 수백 번씩 브라우저나 여타 시스템으로부터의 요청을 받아 처리할 수 있는 높은 성능이 요구되는 환경이었다. 매번 클라이언트에서 요청이 올 때 마다 각 로직을 담당하는 오브젝트를 새로 만들어서 사용한다고 생각해보자. 아무리 자바의 오브젝트 생성과 가비지 컬렉션의 성능이 좋다고 한들 이렇게 부하가 걸리면 서버가 감당하기 힘들다. 그래서 서비스 오브젝트라는 개념을 사용해왔다.

서블릿은 대부분 멀티스레드 환경에서 싱글톤으로 동작한다. 서블릿 클래스당 하나의 오브젝트만 만들어두고, 사용자의 요청을 담당하는 여러 스레드에서 하나의 오브젝트를 공유해 동시에 사용한다. 이렇게 애플리케이션 안에 제한된 수, 대개 한 개의 오브젝트만 만들어서 사용하는 것이 싱글톤 패턴의 원리이다.

자바에서 싱글톤을 구현하는 방법은 보통 다음과 같다.

- **클래스 밖에서는 오브젝트를 생성하지 못하도록** 생성자를 `private`로 만든다
- 생성된 **싱글톤 오브젝트를 저장할 수 있는** 자신과 같은 타입의 `스태틱 필드`를 정의한다.
- 스태틱 팩토리 메소드인 `getInstance()`를 만들고 이 메소드가 **최초로 호출되는 시점에서 한 번만 오브젝트가 만들어지게** 한다. 생성된 오브젝트는 스태틱 필드에 저장된다. 또는 스태틱 필드의 초기값으로 오브젝트를 미리 만들어둘 수 있다.
- 한 번 오브젝트가 생성된 후에는 `getInstance()` 메소드를 통해 만들어진 스태틱 필드에 저장한 오브젝트를 넘겨준다.

일반적을 싱글톤 패턴 구현 방식에는 다음과 같은 문제점이 있다.

- **private 생성자를 갖고 있어 상속할 수 없다**
- **싱글톤은 테스트하기 힘들다**
- **서버환경에서는 싱글톤이 하나만 만들어지는 것을 보장하지 못한다**
- **싱글톤의 사용은 전역상태를 만들 수 있기 때문에 바람직하지 못하다**

스프링은 **직접 싱글톤 형태의 오브젝트를 만들고 관리하는 기능을 제공**하는데, 그것이 바로 `싱글톤 레지스트리`이다. 오브젝트 생성에 관한 모든 권한은 IoC 기능을 제공하는 애플리케이션 컨텍스트에 있기 대문에 평범한 자바 클래스를 싱글톤으로 활용할 수 있다. 가장 중요한 것은 싱글톤 패턴과 달리 **스프링이 지지하는 객체지향적인 설계 방식과 원칙, 디자인패턴 등을 적용하는 데 아무런 제약이 없다**는 점이다.

`싱글톤`은 멀티스레드 환경이라면 **여러 스레드가 동시에 접근해서 사용**할 수 잇다. 기본적으로 싱글톤이 멀티스레드 환경에서 서비스 형태의 오브젝트로 사용되는 경우 상태정보를 내부에 갖고 있지 않은 `무상태 방식`으로 만들어져야 한다.따라서 싱글톤은 **기본적으로 인스턴스 필드의 값을 변경하고 유지하는 상태유지 방식으로 만들지 않는다**.

상태가 없는 방식으로 클래스를 만드는 경우 **각 요청에 대한 정보나 리소스로부터 생성한 정보는 파라미터와 로컬변수, 리턴 값 등을 이용**한다. 매번 새로운 값을 저장할 독립적인 공간이 만들어지기 때문에 싱글톤이라고 해도 여러 스레드가 변수의 값을 덮어쓸 일은 없다.

스프링이 관리하는 오브젝트, 즉 빈이 생성되고, 존재하고, 적용되는 범위를 `빈의 스코프`라고 한다. 스프링 빈의 기본 스코는 싱글톤이다. 이는 **컨테이너 내에 한 개의 오브젝트만 만들어**져서, 강제로 제거하지 않는 한 **스프링 컨테이너가 존재하는 동안 계속 유지**한다. **스프링에서 만들어지는 대부분의 빈은 싱글톤 스코프를 갖는다**.

## 의존관계 주입(DI)

IoC라는 용어는 느**슨하게 정의되어 폭 넓게 사용**된다. 해당 용어만으로는 스프링이 서블릿 컨테이너처럼 서버에서 동작하는 서비스 컨테이너라는 뜻인지, 단순히 IoC 개념이 적용된 템플릿 메소드 패턴을 이용해 만들어진 프레임워크인지, 또 다른 IoC 특징을 지닌 기술이라는 것인지 파악하기 힘들다. 그래서 `의존관계주입`이라는 의도가 명확한 이름을 사용하기 시잭했다. **스프링 IoC 기능의 대표적인 동작원리는 주로 의존관계 주입이라고 불린다**.

두 개의 클래스 또는 모듈이 의존관계에 있다고 말할 때는 **항상 방향성을 부여**해줘야 한다. 즉 A가 B에게 의존하는 관계에 있다는 식이어야 한다. **의존한다는 것은 의존대상, B가 변하면 그것이 A에 영향을 미친다는 뜻**이다. B의 기능이 추가되거나 변경되거나, 형식이 바뀌거나 하면 그 영향이 A로 전달된다는 것이다.

인터페이스에 대해서만 의존관계를 만들어두면 **인터페이스 구현 클래스와의 관계는 느슨해지면서 변화에 영향을 덜 받는 상태**가 된다. **결합도가 낮다**고 설명할 수 있다. 인터페이스를 통해 의존관계를 제한해주면 그만큼 변경에서 자유로워지는 셈이다.

프로그램이 시작되고 오브젝트가 만들어지고 나서 런타임 시에 의존관계를 맺는 대상, 즉 실**제 사용대상인 오브젝트**를 `의존 오브젝트`라고 한다. 의존관계 주입은 이렇게 구체적인 의존 오브젝트와 그것을 사용할 주체, 보통 클라이언트라고 부르는 오브젝트를 런타임 시에 연결해주는 작업을 말한다.

정리하자면 의존관계 주입이란 다음과 같은 세 가지 조건을 충족하는 작업을 말한다.

- 클래스 모델이나 코드에는 런타임 시점의 의존관계가 드러나지 않는다. 그러기 위해서는 인터페이스에만 의존하고 있어야 한다
- 런타임 시점의 의존관계는 컨테이너나 팩토리 같은 제3의 존재가 결정한다.
- 의존관계는 사용할 오브젝트에 대한 레퍼런스는 외부에서 제공해줌으로써 만들어진다.

의존관계 주입의 핵심은 **설계 시점에는 알지 못했던 두 오브젝트의 관계를 맺도록 도와주는 제 3의 존재**가 있다는 것이다. 스프링의 **애플리케이션 컨텍스트, 빈 팩토리, IoC 컨테이너 등이 모두 외부에서 오브젝트 사이의 런타임 관계를 맺어주는 책임을 지닌 제 3의 존재**라고 볼 수 있다.

주입이라는 것은 외부에서 내부로 무엇인가를 넘겨줘야 하는 것인데, 자바에서 **오브젝트에 무엇인가를 넣어준다는 개념은 메소드를 실행하면서 파라미터로 오브젝트의 레퍼런스를 전달해주는 방법** 뿐이다. 가장 손쉽게 사용할 수 있는 파라미터 전달이 가능한 메소드는 바로 `생성자`이다. 이렇게 DI 컨테이너에 의해 런타임 시에 의존 오브젝트를 사용할 수 있도록 그 레퍼런스를 전달받는 과정이 마치 **메소드를 통해 DI 컨테이너가 오브젝트에게 주입해주는 것과 같다고 하여 이를 의존관계 주입**이라고 부른다.

스프링이 제공하는 IoC 방법에는 **의존관계를 맺는 방법**이 외부로부터 주입이 아니라 **스스로 검색을 이용**하는 `의존관계 검색`이 있다. 이는 **자신이 필요로 하는 의존 오브젝트를 능동적으로 찾는다**. 의존관계 검색은 런타임 시 의존관계를 맺을 오브젝트를 결정하는 거소가 오브젝트의 생성작업은 외부 컨테이너에게 IoC로 맡기지만, 이를 가져올 때는 메소드나 생성자를 통한 주입 대신 스스로 컨테이너에게 요청하는 방법을 사용한다.

의존관계 검색 방법은 코드 안에 오브젝트 팩토리 클래스나 스프링 API가 나타난다. 애플리케이션 컴포넌트가 컨테이너와 같이 성격이 다른 오브젝트에 의존하게 되는 것이므로 바람직하지 않다. 그런데 의존관계 검색 방식을 사용해야 할 때가 있다. 스프링의 IoC와 DI 컨테이너를 적용했다고 하더라도 **애플리케이션의 기동 시점에서 적어도 한 번은 의존관계 검색 방식을 사용해 오브젝트를 가져와야 한다**. 스프링이 미리 만들어서 제공하기 때문에 직접 구현할 필요는 없다.

의존관계 검색과 의존관계 주입을 적용할 때 발견할 수 있는 중요한 차이점은 **의존관계 검색 방식에서는 검색하는 오브젝트는 자신이 스프링의 빈일 필요가 없다는 점**이다. 반면 **의존관계 주입에서는 DI가 적용되려면 오브젝트는반드시 컨테이너가 만드는 빈 오브젝트여야 한다**. 즉, DI를 원하는 오브젝트는 먼저 자기 자신이 컨테이너가 관리하는 빈이 되어야 한다.

의존관계 주입 시 반드시 생성자를 사용해야 하는 것은 아니다. 생성자가 아닌 일반 메소드를 이용해 의존 오브젝트오의 관계를 주입하는 데는 크게 두 가지 방법이 있다.

- 수정자 메소드를 이용한 주입
  - 파라미터로 전달된 값을 내부의 인스턴스 변수에 저장한다. 외부로부터 제공받은 오브젝트 레퍼런스를 저장해뒀다가 내부의 메소드에서 사용하게 하는 DI 방식에서 활용하기 적당하다.
- 일반 메소드를 이용한 주입
  - 적절한 개수의 파라미터를 가진 여러 개의 초기화 메소드를 만들 수 있다.

위의 방법을 사용한다면 의존관계를 주입하는 시점과 방법이 달라질 뿐, 결과는 동일하다. 실제로 스프링은 생성자, 수정자 메소드, 초기화 메소드를 이용한 방법 외에도 다양한 의존관계 주입 방법을 지원한다.

## XML을 이용한 설정

우리가 평소에 쓰는 `application.yml` 의 구버전이라고 생각한다. 그래서 따로 내용은 다루지 않겠다.

## 마치며

스프링이란 ‘**어떻게 오브젝트가 설계되고, 만들어지고, 어떻게 관계를 맺고 사용되는지에 관심을 갖는 프레임워크**’이다. 스프링의 관심은 **오브젝트와 그 관계**이다. 그러나 오브젝트를 어떻게 설계하고, 분리하고, 개선하고, 어떤 의존관계를 가질지 결정하는 일은 스프링이 아니라 **개발자의 역할이며 책임**이다. 스프링은 번거로운 작업을 편하게 할 수 있도록 도와주는 도구일 뿐이다.

> 다음 게시글은 동국대학교 SW교육원의 지원을 받아 작성된 글입니다.
>
> ![](https://i.esdrop.com/d/f/hhaNifrpr0/PlFKC20lhK.png)