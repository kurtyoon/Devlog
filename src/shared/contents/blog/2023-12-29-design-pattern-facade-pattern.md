---
title: "[Design Pattern] Facade Pattern"
layout: post
author: kurtyoon # 작성자
banner: https://i.esdrop.com/d/f/hhaNifrpr0/epe9a8ZiPI.png # 배너 이미지
categories:
  - Design Pattern
tags:
  - Design Pattern
  - Facade Pattern
article: "구조 패턴 중 Facade 패턴을 공부하고 정리한 내용이다." # 포스트 내용 함축
date: "2023-12-29 11:37:00 +0900"
sidebar: []
published: false
comments: true
---

Facade는 프랑스어 `Façade` 에서 유래된 단어로, **건물 외관**이라는 뜻이다. 즉, 건물의 외관이라는 의미는 건물의 내부를 알 수 없다는 것이다. 이와 비슷하게 Facade 패턴은 **외부에서 내부의 구조를 모르게 하는 것**이다.
코드의 구조들을 거대한 클래스로 감싸서 편리한 인터페이스를 제공하는 것이 주 목적이다.

여러 라이브러리나 프레임워크에 속하는 수 많은 객체들의 집합으로 코드를 작성한다고 생각해보자. 보통은 이런 객체들을 모두 초기화하고, 종속성의 관계를 추적하고, 올바른 순서로 메서드들을 실행하는 등의 작업을 진행해야 한다. 결과적으로 클래스들의 비즈니스 로직이 다른 클래스의 코드들과 **강력하게 결합**하여 코드를 이해하고 유지하기 어려워진다.

Facade는 복잡한 서브 클래스에 대해 간단한 인터페이스를 제공하는 클래스이다. 이를 통해 **서브 클래스의 코드에 의존하는 일을 감소**시켜 주고, 복잡한 소프트웨어를 간단하게 사용할 수 있다. 이를 통해 **서브 시스템 사이의 종속성**을 줄일 수 있고, 클라이언트에서 여러 서브 클래스들을 호출할 필요 없이 편리하게 사용할 수 있다.

![](https://i.esdrop.com/d/f/hhaNifrpr0/xiE4VLoY5L.jpg)
Additional Facade라는 것이 있는데 이는 추가적인 Facade 클래스를 생성하여 하나의 Facade를 관련없는 기능들로 채워 복잡한 구조로 만드는 것을 방지할 수 있다. 이는 클라이언트들과 다른 Facade 클래스에서 모두 사용할 수 있다.

위의 그림과 같이 서브 클래스들은 Facade 클래스의 존재를 인식하지 못한다. 이들은 시스템 내에서 동작하며, 매개체 없이 직접 상호작용 한다.

## 코드로 알아보는 Facade 패턴

예를 들어 `비디오 변환`이라는 행위에 Facade 패턴을 적용해보자. 우리는 Client로 Application을 사용하며, 비디오를 변환하기 위해서는 `AudioMixer`, `VideoFile`, `BitrateReader`... 등이 필요하다. 이들은 하위시스템으로, Facade 클래스를 통해 비디오 변환이라는 행위에 필요한 공통 기능들을 정의할 수 있다. 즉, Application에서 수십 개의 클래스들을 불러와 동작하는 대신, **해당 기능들을 캡슐화하여 Facade 클래스를 만든다**.

![](https://i.esdrop.com/d/f/hhaNifrpr0/Ddh9NFdwsW.jpg)

**Sub systems**

```java
class VideoFile {
	void makeVideo() {
		System.out.println("make Video");
	}
}

class BitrateReader {
	void bitReader() {
		System.out.println("read Bitrate");
	}
}

class AudioMixer {
	// ...
}

class CodecFactory {
	// ...
}

class OggCompressionCodec {
	// ...
}

class MPEG4CompressionCodec {
	// ...
}
```

**VideoConverter**

```java
class VideoConverter {
	VideoFile videoFile = new VideoFile();
	BitrateReader bitrateReader = new BitrateReader();
	// ...

	void converting() {
		videoFile.makeVideo();
		bitrateReader.bitReader();
		// ...
	}
}
```

Facade 클래스를 만들어 서브 클래스들의 복잡성을 간단한 인터페이스 뒤에 숨길 수 있다. 이를 통해 기능성과 단순함을 상호보완 가능하다.

**Application**

```java
class Application {
	VideoConverter videoConverter = new VideoConverter();
	videoConverter.converting();
}
```

Application 클래스는 복잡한 서브 클래스에 의존하지 않고, 서브 클래스들이 변경되는 경우에도 Facade 클래스만 다시 작성하면 코드는 정상적으로 동작한다.

## Facade 패턴의 적용

서브 클래스들은 시간이 지날수록 더 복잡해진다. 어떠한 디자인 패턴을 적용하더라도 생성되는 클래스들이 점점 많아진다. 서브 클래스들은 더 유연해지고 더 많은 상황에 재사용할 수 있도록 변경될 수 있지만, 해당 시스템이 클라이언트에게 요구하는 설정들은 점점 더 많아질 것이다. 이를 해결하기 위해 Facade는 **대부분의 클라이언트 요건에 부합하며 서브 클래스들에서 가장 많이 사용되는 기능들을 쉽게 꺼내쓸 수 있다**. 따라서 Facade 패턴은 복잡한 서브 클래스에 대해 제한적이지만 간단한 인터페이스가 필요할 때 사용하면 좋다.

서브 클래스들의 각 계층에 진입점을 정의하기 위해서 Facade 패턴을 사용할 수도 있다. **여러 서브 클래스들이 Facade 클래스들을 통해서만 통신하도록 하며 서브 클래스들의 결합도를 줄일 수 있다**.

## Facade 패턴의 장점과 단점

- 복잡한 하위 시스템에서 코드를 별도로 분리할 수 있다.
- 클라이언트가 서브 클래스들을 몰라도 상관없어 결합도가 낮다.
- **Facade는 애플리케이션의 모든 클래스에 결합된 전지전능한 객체가 될 수 는 없다**.

## 회고

프로젝트를 진행하며 Facade 패턴을 사용한 적이 몇번 있다.<br>
이는 각 서비스 사이에 복잡한 연관성이 있는 경우 각 서비스 마다 모든 레포지토리의 의존성을 주입하여 사용했다.<br>
그때 당시에는 이런 방법이 있구나 하면서 잘 모르고 사용했던 것 같다.<br>
소위 말하는 ~~짬통~~ 클래스를 하나 만들어서 정말 무식하게 사용했던 것 같다.<br>
정말 잘 사용만 한다면 개발할 때 편리해질 수 있는 디자인 패턴이라 다음 프로젝트에서 제대로 적용해서 사용해보고 싶다.<br>
