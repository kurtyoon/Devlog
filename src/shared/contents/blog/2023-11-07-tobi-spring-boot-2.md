---
title: "[Spring boot] 토비의 스프링 3.1 테스트"
layout: post
subtitle: "[토비의 스프링 3.1] 2장 테스트를 읽고"
author: kurtyoon # 작성자
banner: https://i.esdrop.com/d/f/hhaNifrpr0/SLCxQY3taU.png # 배너 이미지
categories:
  - Spring boot
tags:
  - Spring boot
  - IoC
article: "[토비의 스프링 3.1] 2장 테스트를 읽고 정리한 내용이다." # 포스트 내용 함축
date: "2023-11-07 12:00:00 +0900"
sidebar: []
published: false
comments: true
---

> 스프링이 개발자에게 제공하는 가장 중요한 가치는 `객체지향과 테스트`이다. 애플리케이션은 계속 변하고 복잡해져 간다. 그 변화에 대응하는 첫 번째 전략이 **확장과 변화를 고려한 객체지향적 설계와 그것을 효과적으로 담아낼 수 있는 IoC/DI 같은 기술**이라면, 두 번째 전략은 **만들어진 코드를 확신할 수 있게 해주고, 변화에 유연하게 대처할 수 있게 해주는 테스트 기술**이다. 2장에서는 테스트가 무엇이며, 그 가치와 장점, 활용전략, 스프링과의 관계를 살펴본다.

## UserDaoTest 다시 보기

### 테스트의 유용성

1장에서 UserDao가 동작하는지 확인하기 위해 `main()` 를 통해 테스트 코드를 만들었다. 해당 UserDao의 기능을 잘 수행한다는 것을 테스트를 통해 확인할 수 없었다면, 해당 코드를 개선하는 과정동안 불안했을 것이다. UserDao를 수정하며 **처음과 동일한 기능을 수행함을 보장**할 수 있는 방법은 **테스트를 통해 직접 기능을 동작시켜 결과를 확인하는 방법** 뿐이었다.

테스트란 결국 **내가 예상하고 의도했던 대로 코드가 정확히 동작하는지를 확인**해서, **만든 코드를 확신할 수 있게 해주는 작업**이다. 또한, **테스트의 결과가 원하는 대로 나오지 않는 경우에는 코드나 설계에 결함이 있음**을 알 수 있다.

### 웹을 통한 DAO 테스트 방법의 문제점

보통 웹 프로그램에서 사용하는 DAO를 테스트하는 방법은 다음과 같다. DAO를 만든 뒤 바로 테스트하지 않고, 서비스 계층, MVC 프레젠테이션 계층까지 포함한 모든 입출력 기능을 코드로 다 만든다. 이렇게 웹 화면을 통해 값을 입력하고, 기능을 수행하고, 결과를 확인하는 방법은 많이 사용되지만, **모든 레이어의 기능을 다 만들고 나서야 테스트가 가능하다는 점이 가장 큰 문제**이다. 하나의 **테스트를 수행하는 데 참여하는 클래스와 코드가 많기 때문에, 어디에서 문제가 발생했는지 찾아내기 힘들다**. 또한, 테스트할 대상인 DAO의 문제가 아니라 **다른 레이어에서 에러가 발생하여 테스트에 실패**할 수도 있다.

### 작은 단위의 테스트

테스트하고자 하는 대상이 명확하다면 그 **대상에 집중해서 테스트하는 것이 바람직**하다. 테스트는 **가능하면 작은 단위로 쪼개서 집중**해서 할 수 있어야 한다. 이렇게 작은 단위의 코드에 대해 테스트를 수행하는 것을 `단위 테스트`라고 한다. `단위`란 충분히 **하나의 관심에 집중해서 효율적으로 테스트할 만한 범위의 단위**라고 보면 된다.

**각 단위 기능은 정상적으로 동작**하지만, **전체 기능이 동작하지 않는 경우**도 존재한다. 따라서 이런 **많은 단위가 참여하는 테스트도 언젠가는 필요**하다. 각 단위별로 테스트를 먼저 진행하고 나서 이런 전체 테스트를 진행한다면, 역시 예외가 발생하거나 테스트가 실패할 수는 있겠지만, 이미 **각 단위별로 충분한 검증을 마치고 오류를 처리했으므로 훨씬 빠른 속도로 확인이 가능**하다.

단위 테스트를 하는 이유는 개발자가 설계하고 만든 코드가 원래 의도한 대로 동작하는 지를 개발자 스스로 빨리 확인받기 위해서이다. 이때 **확인의 대상과 조건이 간단하고 명확할수록 좋다**. 그래서 **작은 단위로 제한해서 테스트**하는 것이 편리하다.

### 자동수행 테스트 코드

테스트는 자동으로 수행되도록 코드로 만들어지는 것이 중요하다. 테스트 자체가 사람의 수작업을 거치는 방법을 사용하기보다는 **코드로 만들어져서 자동으로 수행될 수 있어야 한다는 건 매우 중요**하다. 그런데 애플리케이션을 구성하는 클래스 안에 테스트 코드를 포함시키는 것보다는 **별도로 테스트용 클래스**를 만들어서 테스트 코드를 넣는 편이 낫다. 자동으로 수행되는 테스트의 장점은 **자주 반복**할 수 있다는 것이다. 이는 번거로운 작업이 없고 테스트를 빠르게 실행할 수 있기 때문에 언제든 코드를 수정하고 나서 테스트를 해 볼 수 있기 때문이다.

### 지속적인 개선과 점진적인 개발을 위한 테스트

UserDao를 변경하는 과정에서 **테스트를 수행하며 코드를 변경해갔기 때문에 전체적으로 코드를 개선하는 작업이 더 빠르고 간편하게 진행**되었다. 또한, UserDao의 기능을 추가하려고 할 때도 미리 만들어둔 테스트 코드는 유용하다. 가장 단순한 등록과 조회 기능을 만들고, 이를 테스트로 검증해서 만든 코드에 대해 확신을 가진다. 그리고 **조금씩 기능을 추가하며 그에 대한 테스트도 함께 추가하는 방식으로 점진적인 개발이 가능**하다.

## UserDaoTest 개선

### 테스트 검증의 자동화

모든 테스트는 성공과 실패의 두 가지 결과를 가질 수 있다. 또 테스트의 실패는 **테스트가 진행되는 동안에 에러가 발생해서 실패하는 경우**와, 테스트 작업중에 에러가 발생하진 않았지만 **그 결과가 기대한 것과 다르게 나오는 경우로 구분**해볼 수 있다.

자동화된 테스트를 위한 `xUnit 프레임워크`를 만든 켄트 벡은 “**테스트란 개발자가 마음 편하게 잠자리에 들 수 있게 해주는 것**”이라고 했다. 짧은 시간에 화면에서 하는 수동 테스트로는 당장 수정한 기능의 가장 간단한 케이스를 확인하기에도 벅차기 때문에 전체 기능에 문제가 없는지 점검하는 것은 불가능에 가깝다. 하지만 만들어진 코드의 기능을 모두 점검할 수 있는 **포괄적인 테스트**를 만들면서부터는, 개발한 애플리케이션은 이후에 어떤 과감한 수정을 하고 나서도 테스트를 모두 돌려보고 나면 안심이 된다. 혹은 테스트를 통해 그 변경에 영향을 받는 부분이 정확히 확인된다면 빠르게 조치를 취할 수 있다.

### 테스트의 효율적인 수행과 결과 관리

좀 더 편리하게 테스트를 수행하고 편리하게 결과를 확인하려면 단순히 `main()` 메소드로는 한계가 존재한다. `main()` 메소드를 이용한 테스트 작성 방법만으로는 애플리케이션의 규모가 커지고 테스트 개수가 많아지면 테스트를 수행하는 일이 부담이 된다.

`프레임워크`는 **개발자가 만든 클래스에 대한 제어 권한을 넘겨받아서 주도적으로 애플리케이션의 흐름을 제어**한다. 따라서 프레임워크에서 동작하는 코드는 `main()` 메소드도 필요없고 오브젝트를 만들어서 실행시키는 코드를 만들 필요도 없다.

테스트가 `main()` 메소드로 만들어졌다는 것은 **제어권을 직접 갖는다는 의미**이다. 따라서 `JUnit 프레임워크`를 통해 새롭게 테스트 메소드를 만들어야 한다. 해당 프레임워크를 통해 테스트 메소드를 만들기 위해서는 다음 조건을 만족해야 한다.

- 메소드는 `public` 으로 선언되어야 한다.
- 메소드에 `@Test`라는 애노테이션이 있어야 한다.

테스트의 결과를 검증하는 `if/else` 문은 `JUnit` 이 제공하는 `assertThat` 이라는 **스태틱 메소드**를 이용하여 나타낼 수 있다. 해당 메소드는 첫 번째 파라미터의 값을 뒤에 나오는 `matcher`라고 불리는 조건으로 비교하여 일치한다면 넘어가고, 아니라면 테스트가 실패하도록 만들어 준다. `JUnit`은 예외가 발생하거나 `assertThat()` 에서 실패하지 않고 테스트 메소드의 실행이 완료되면 테스트가 성공했다고 인식한다. 따라서 `assertThat()`의 조건을 만족하지 못하면 테스트는 더 이상 진행되지 않고 `JUnit`은 테스트가 실패했음을 알게 된다. 테스트 수행 중에 일반 예외가 발생한 경우에도 테스트 수행은 중단되고 테스트는 실패한다.

## 개발자를 위한 테스팅 프레임워크 JUnit

### 테스트 결과의 일관성

테스트가 외부 상태에 따라 성공하기도 하고 실패하기도 한다. DB 서버가 다운되거나 네트워크에 장애가 생겨 DB에 접근하지 못하는 예외적인 상황을 제외하고 별도의 준비 작업 없이는 성공해야 마땅한 테스트가 실패하기도 한다. 이는 좋은 테스트라고 할 수 없다. **테스트는 코드에 변경사항이 없다면 항상 동일한 결과를 내야 한다**.

`단위 테스트`는 **항상 일관성 있는 결과가 보장**되어야 한다. DB 에 남아 있는 데이터와 같은 외부 환경에 영향을 받지 말아야 하는 것은 물론이고, 테스트를 실행하는 순서를 바꿔도 동일한 결과가 보장되도록 만들어야 한다.

### 포괄적인 테스트

지금까지의 테스트와 특정 예외가 던져진다면 성공한 테스트이고, 정상적으로 작업을 마치면 테스트가 실패하는 경우도 존재한다. 해당 경우에는 `@Test` 애노테이션의 `expected` 앨리면트를 사용한다. expected 에 **테스트 메소드 실행 중에 발생하리라 기대하는 예외 클래스**를 넣어주면 된다. 이렇게 @Test에 expected를 추가해놓으면 보통의 테스트와는 반대로, **정상적으로 테스트 메소드를 마치면 테스트가 실패하고, expected에서 지정한 예외가 던져지면 테스트가 성공**한다. 이는 예외가 반드시 발생해야 하는 경우를 테스트하고 싶을 때 유용하게 쓸 수 있다.

평소에는 정상적으로 잘 동작하는 것처럼 보이지만 막상 특별한 상황이 되면 엉뚱하게 동작하는 코드가 존재하는데, 테스트도 안 해봤다면, 나중에 문제가 발생했을 때 원인을 찾기 힘들다. 종종 **단순하고 간단한 테스트가 치명적인 실수를 피할 수 있게 해주기도 한다**.

개발자가 테스트를 직접 만들 때 자주 하는 실수가 하나 있다. 바로 **성공하는 테스트만 골라서 하는 것**이다. 즉, 테스트를 작성할 때도 문제가 될 만한 상황이나, 입력 값 등을 피해서 코드를 만드는 습성이다. 스프링의 창시자 로드 존슨은 “**항상 네거티브 테스트를 먼저 만들라**”는 조언을 했다. 이처럼 테스트를 작성할 때 **부정적인 케이스를 먼저 만드는 습관**을 들이는 게 좋다. **결과적으로는 예외적인 상황을 빠뜨리지 않는 꼼꼼한 개발이 가능**하다.

### 테스트가 이끄는 개발

추가하고 싶은 기능을 테스트 코드로 표현해서, 코드로 된 설계 문서처럼 만들어 놓는 상황을 가정해보자. 그러고 나서 실제 기능을 가진 애플리케이션 코드를 만들고 나면, 바로 해당 테스트를 실행하여 설계대로 동작하는지 검증할 수 있다. 만약 테스트가 실패한다면 이때는 설계한 대로 코드가 만들어지지 않았음을 알 수 있고, 문제가 되는 부분이 무엇인지에 대한 정보도 테스트 결과를 통해 얻을 수 있다. 다시 코드를 수정하고 테스트를 수행해서 테스트가 성공하도록 애플리케이션을 계속 다듬어 간다. 결국 **테스트가 성공한다면, 그 순간 코드 구현과 테스트라는 두 작업이 동시에 끝나는 것**이다.

`테스트 주도 개발 (TDD)` 란 **테스트 코드를 먼저 만들고, 테스트를 성공하게 해주는 코드를 작성하는 방식의 개발 방법을 의미**한다. 개발자가 **테스트를 만들어가며 개발하는 방법이 주는 장점을 극대화한 방법**이라고 볼 수 있다. “**실패한 테스트를 성공시키기 위한 목적이 아닌 코드는 만들지 않는다**”가 TDD의 기본적인 원칙이다. TDD는 아예 테스트를 먼저 만들고 그 테스트가 성공하도록 하는 코드만 만드는 식으로 진행하기 때문에 테스트를 빼먹지 않고 꼼꼼하게 만들어 낼 수 있다.

TDD의 장점 중 하나는 **코드를 만들어 테스트를 실행하는 그 사이의 간격이 매우 짧다는 점**이다. 개발한 코드의 오류는 빨리 발견할 수 록 좋다. 또한 테스트는 코드를 작성한 후에 가능한 빨리 실행할 수 있어야 한다. 그러려면 테스트 없이 한 번에 너무 많은 코드를 만드는 것은 좋지 않다. 일정 분량의 코딩을 먼저 해놓고 빠른 시간 안에 테스트 코드를 만들어 테스트해도 상관없다. 테스트는 애플리케이션 코드보다 상대적으로 작성하기 쉬운데다 각 테스트가 독립적이므로 코드의 양에 비해 작성하는 시간은 얼마 걸리지 않는다. 그리고 **테스트 덕분에 오류를 빨리 잡아낼 수 있어서 전체적인 개발 속도는 오히려 빨라진다**.

### 테스트 코드 개선

**테스트 코드도 언제든지 내부구조와 설계를 개선해서 좀 더 깔끔하고 이해하기 쉬우며 변경이 용이한 코드로 만들 필요**가 있다. 중복된 코드는 별개의 메소드 뽑아내는 것이 가장 손쉬운 방법이다. 이처럼 테스트 이전 세팅과 같은 부분은 별도의 메소드로 추출하여 `@Before` 애노테이션을 통해 사용할 수 있다.

`프레임워크`는 **스스로 제어권을 가지고 주도적으로 동작**하고, **개발자가 만든 코드는 프레임워크에 의해 수동적으로 실행**된다. 따라서 프레임워크가 어떻게 사용할지를 잘 이해애야 한다. 다음은 JUnit이 하나의 테스트 클래스를 가져와 테스트를 수행하는 방식이다.

1. 테스트 클래스에서 @Test가 붙은 public이고, void형이며 파라미터가 없는 테스트 메소드를 모두 찾는다.
2. 테스트 클래스의 오브젝트를 하나 만든다.
3. @Before가 붙은 메소드가 있으면 실행한다.
4. @Test가 붙은 메소드를 하나 호출하고 테스트 결과를 저장해둔다.
5. @After가 붙은 메소드가 있으면 실행한다.
6. 나머지 테스트 메소드에 대해 2~5번을 반복한다.
7. 모든 테스트의 결과를 종합해서 돌려준다.

각 테스트 메소드를 실행할 때마다 **테스트 클래스의 오브젝트를 새로 만든다**. **한번 만들어진 테스트 클래스의 오브젝트는 하나의 테스트 메소드를 사용하고 나면 버려진다**.

![](https://i.esdrop.com/d/f/hhaNifrpr0/j0wQhdtcMv.png)

테스트 클래스가 다음과 같이 @Test 테스트 메소드를 두 개 갖고 잇다면, 테스트가 실행되는 중에 JUnit은 이 클래스의 오브젝트를 두 번 만든다. **JUnit 개발자는 각 테스트가 서로 영향을 주지 않고 독립적으로 실행됨을 확실히 보장해주기 위해 매번 새로운 오브젝트를 만들게 했다**.

테스트를 수행하는 데 필요한 정보나 오브젝트를 `픽스처(fixture)`라고 한다. 이는 여러 테스트에서 반복적으로 사용되기 때문에 @Before 메소드를 이용해 생성해두면 편리하다.

## 스프링 테스트 적용

@Before 메소드가 테스트 개수만큼 반복되기 때문에 애플리케이션 컨텍스트도 세 번 만들어 진다. 이는 **빈이 많아지고 복잡해지면 애플리케이션 컨텍스트 생성에 적지 않은 시간이 걸릴 수 있다**. 애플리케이션 컨텍스트가 만들어질 때는 **모든 싱글톤 빈 오브젝트를 초기화** 한다. 애플리케이션 컨텍스트가 초기화될 때 어떤 빈은 독자적으로 많은 리소스를 할당하거나 독립적인 스레드를 띄우기도 한다. 이런 경우 테스트를 마칠 때마다 애플리케이션 컨텍스트 내의 빈이 할당한 리소스 등을 깔끔하게 정리해주지 않으면 다음 테스트에서 새로운 애플리케이션 컨텍스트가 만들어지며 문제를 일으킬 수도 있다.

**테스트는 가능한 독립적으로 매번 새로운 오브젝트를 만들어서 사용하는 것이 원칙**이다. 그러나 애플리케이션 컨텍스트처럼 생성에 많은 시간과 자원이 소모되는 경우는 **테스트 전체가 공유하는 오브젝트**를 만들기도 한다. JUnit은 매번 테스트 클래스의 오브젝트를 새로 생성한다. 따라서 여러 테스트가 함께 참조할 애플리케이션 컨텍스트를 오브젝트 레벨에 저장해두면 곤란하다. 스태틱 필드에 애플리케이션 컨텍스트를 저장해두면 테스트 메소드에서 사용할 수 있으나, **스프링이 직접 제공하는 애플리케이션 컨텍스트 테스트 지원 기능을 사용하는 것이 더 편리**하다.

### 테스트를 위한 애플리케이션 컨텍스트 관리

간단한 애노테이션 설정만으로 테스트에서 필요로 하는 애플리케이션 컨텍스트를 만들어 모든 테스트가 공유할 수 있다.

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations="/applicationContext.xml")
public class UserDaoTest {
	@Autowired
	private ApplicationContext context;

	...

	@Before
	public void setUp() {
		this.dao = this.context.getBean("userDao", UserDao.class);
		...
	}
}
```

위의 코드는 아무런 문제 없이 성공적이다. 그런데 인스턴스 변수인 context를 초기화 해주는 코드를 발견할 수는 없다. `@Runwith`은 `JUnit 프레임워크`의 테스트 실행 방법을 확장할 때 사용하는 애노테이션이다. JUnit 용 테스트 컨텍스트 프레임워크 확장 클래스를 지정해두면 JUnit이 테스트를 진행하는 중에 테스트가 사용할 애플리케이션 컨테스트를 만들고 관리하는 작업을 진행해준다. 즉, **하나의 애플리케이션 컨텍스트가 만들어져 모든 테스트 메소드에서 사용**된다.

**어떻게 context 변수에 애플리케이션 컨텍스트가 들어 있을까?** 스프링의 JUnit 확장 기능은 테스트가 실행되기 전 딱 한 번만 애플리케이션 컨텍스트를 만들어 두고, **테스트 오브젝트가 만들어질 때마다 특별한 방법을 이용해 애플리케이션 컨텍스트 자신을 테스트 오브젝트의 특정 필드에 주입**해준다.

여러 개의 테스트 클래스가 있을 때, 같은 설정파일을 가진 애플리케이션 컨텍스트를 사용하는 경우, 스프링은 테스트 클래스 사이에서 애플리케이션 컨텍스트를 공유하게 해준다.

개발자가 만드는 테스트는 코드 내부구조와 설정 등을 알고 있고 의도적으로 그 내용을 검증해야 할 필요가 있다. 그러나 필요하지 않다면 **테스트에서도 가능한 한 인터페이스를 사용해 애플리케이션 코드와 느슨하게 연결해두는 편이 좋다**.

### DI와 테스트

구현 클래스를 바꾸지 않는 경우에는 인터페이스를 사용하지 않아도 되는가? 해당 질문의 답변은 “**그래도 인터페이스를 두고 DI를 적용해야 한다.**”이다. 그래야 하는 이유는 다음과 같다.

- 소프트웨어 개발에서 절대 바뀌지 않는 것은 없다
- 클래스의 구현 방식은 바뀌지 않는다고 하더라도 인터페이스를 두고 DI를 적용하게 해두면 다른 차원의 서비스 기능을 도입할 수 있다.
- 효율적인 테스트를 손쉽게 만들기 위해서라도 DI를 적용해야 한다.

DI를 테스트에 이용하는 방법은 다음과 같다.

- 컨텍스트에서 DI 받은 오브젝트에 다시 테스트 코드로 수동 DI를 통해 테스트한다.
- 스프링의 설정을 이용한 DI 방식의 테스트를 이용한다
- 스프링 컨테이너 없이 테스트 한다.

위의 세 가지 방법 중 **항상 스프링 컨테이너 없이 테스트할 수 있는 방법을 우선적으로 고려**해야 한다. 애플리케이션 컨텍스트를 아예 사용하지 않으니 코드는 더 단순하고, 이해하기 편해지며, 테스트 시간도 절약할 수 있다. 이처럼 스프링의 API에 의존하지 않도 지신의 관심에만 집중해서 깔끔하게 만들수도 있다.

> **침투적 기술과 비침투적 기술**
>
> 침투적 기술은 기술을 적용했을 때 애플리케이션 코드에 기술 관련 API가 등장하거나, 특정 인터페이스나 클래스를 사용하도록 강제하는 기술을 말한다.
>
> 비침투적 기술은 애플리케이션 로직을 담은 코드에 아무런 영향을 주지 않고 적용이 가능하다
>
> 침투적 기술을 사용한다면 애플리케이션 코드가 해당 기술에 종속되고, 비침투적 기술을 사용한다면 기술에 종속적이지 않은 순수한 코드를 유지할 수 있게 해준다.
>
> 스프링은 비침투적 기술의 대표적인 예시이고, 따라서 스프링 컨테이너 없는 DI 테스트가 가능하다.

두 개의 모듈이 강하게 결합되어 있어 dI가 불가능한 구조로 만든다면 테스트할 때 불편하거나, 자동화된 테스트가 불가능할 수 있다. 일반적으로 **테스트하기 좋은 코드가 좋은 코드**이다.

## 학습 테스트로 배우는 스프링

자신이 만들지 않은 프레임워크나 다른 개발팀에서 만들어서 제공한 라이브러리 등에 대해서 테스트를 작성하는 경우가 존재한다. 이를 `학습 테스트` 라고 한다. 학습 테스트의 목적은 자신이 사용할 API나 프레임워크의 기능을 테스톨 보면서 사용 방법을 익히려는 것이다. 자신이 테스트를 만들려고 하는 기술이나 기능에 대해 얼마나 제대로 이해하고 있는지, 그 사용 방법을 바로 알고 있는지를 검증하려는 것이 목적이다. 또한, 테스트 코드를 작성해보며 빠르고 정확하게 사용법을 익히는 것도 학습 테스트를 작성하는 목적이다.

### 학습 테스트의 장점

- 다양한 조건에 따른 기능을 손쉽게 확인해볼 수 있다.
- 학습 테스트 코드를 개발 중에 참고할 수 있다.
- 프레임워크나 제품을 업그레이드할 때 호환성 검증을 도와준다.
- 테스트 작성에 대한 좋은 훈련이 된다.
- 새로운 기술을 공부하는 과정이 즐거워진다.

### 버그 테스트

버그 테스트란 코드에 오류가 있을 때 그 오류를 가장 잘 드러내줄 수 있는 테스트를 말한다. 버그 테스트는 일단 실패하도록 만들어야 한다. 버그가 원인이 되어 테스트가 실패하는 코드를 만드는 것이다. 버그 테스트의 필요성과 장점은 다음과 같다.

- 테스트의 완성도를 높여준다.
- 버그의 내용을 명확하게 분석하게 해준다.
- 기술적인 문제를 해결하는 데 동움이 된다.

> **동등분할**: 같은 결과를 내는 값의 범위를 구분하여 각 대표값으로 테스트 하는 방법
>
> **경계값 분석**: 에러는 동등분할 범위의 경계에서 주로 발생하므로, 경계 근처의 값을 이용해 테스트 하는 방법

## 정리

스프링을 사용하는 개발자라면 자신이 만든 코드를 테스트로 검증하는 방법을 알고 있어야 하며, 테스트를 개발에 적극적으로 활용할 수 있어야 한다.

> 다음 게시글은 동국대학교 SW교육원의 지원을 받아 작성된 글입니다.
>
> ![](https://i.esdrop.com/d/f/hhaNifrpr0/PlFKC20lhK.png)