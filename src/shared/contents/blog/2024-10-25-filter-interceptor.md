---
title: "[Spring] Filter와 Interceptor에 대해 알아보자"
layout: post
author: kurtyoon # 작성자
banner: https://i.esdrop.com/d/f/hhaNifrpr0/KCgVy049Rz.jpg # 배너 이미지
categories:
  - Spring
tags:
  - Spring
article: "Filter와 Interceptor에 대해 알아보자" # 포스트 내용 함축
date: "2024-10-25 02:00 +0900"
sidebar: []
published: true
comments: true
---

개발을 진행하다 보면 공통적으로 처리해야 할 작업들이 존재합니다. 공통 작업에 관련된 코드를 페이지마다 작성하게 된다면 중복 코드가 많아지고, 프로젝트 단위가 커질수록 서버에 부하를 줄 수도 있으며, 소스 관리가 되지 않습니다.

이에 스프링은 공통적으로 여러 작업을 처리함으로써 중복된 코드를 제거할 수 있는 다음 기능을 제공하고 있습니다.

- Filter
- Interceptor
- AOP(Aspect Oriented Programming)

스프링에서 사용되는 위 3가지 기능들은 모두 어떤 행동을 하기 전에 먼저 실행하거나, 실행한 후에 추가적인 행동을 할 때 사용되는 기능들입니다. 그 중에서도, Filter와 Interceptor에 대해 살펴보고, AOP는 다음 기회에 살펴보도록 하겠습니다.

### Filter

필터는 클라이언트로부터 들어온 요청과 서버의 응답을 가공하고 제어하는 역할을 합니다. 필터는 주로 보안, 인코딩, 로깅, CORS 처리와 같은 공통된 작업을 처리하는 데 사용됩니다. 스프링 어플리케이션에서는 필터가 Dispatcher Servlet에 요청이 도달하기 전 후에 url 패턴에 맞는 모든 요청에 대해 실행되며, 웹 어플리케이션 전반에 거쳐 일관된 부가 작업을 수행할 수 있도록 설계되었습니다.

따라서, 필터의 경우 스프링 컨테이너가 아닌 톰캣과 같은 웹 컨테이너에 의해 관리 되고, 스프링 컨테이너의 관리를 받지는 않지만, 필요에 따라 스프링 빈으로 등록될 수 있습니다.

![](https://img1.daumcdn.net/thumb/R960x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fbgl4od%2FbtrAeQhm9zB%2FuSYOombcuhv4jCcUlOnon0%2Fimg.png)

필터는 `jakarta.servlet`의 Filter 인터페이스를 구현하여 사용합니다. 보통 이를 바로 구현하지 않고, 각 특징에 맞는 추상 클래스 Filter를 상속받는 형태로 구현할 수 있습니다.

보통 인증 과정에서도 필터를 사용하는데 이때는 `OncePerRequestFilter`를 사용합니다. 이를 따라들어가다 보면 결국 Filter를 구현하고 있다는 것을 확인할 수 있습니다. 실제 Filter 인터페이스는 다음과 같은 모양입니다.

```java
public interface Filter {
    default void init(FilterConfig filterConfig) throws ServletException {
    }

    void doFilter(ServletRequest var1, ServletResponse var2, FilterChain var3) throws IOException, ServletException;

    default void destroy() {
    }
}
```

`init()` 메소드의 경우 필터 객체를 초기화하고 서비스에 추가하기 위한 메소드입니다. 웹 컨테이너가 어플리케이션을 시작할 때, 필터 인스턴스를 생성하고 해당 메소드를 호출합니다. 웹 컨테이너가 1회 `init()` 메소드를 호출하여 필터 객체를 초기화하면 이후 요청들은 다음 `doFilter()` 메소드를 통해 처리됩니다.

```java
public class FilterCore implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        System.out.println("FilterCore.init");
    }

```

`doFilter()` 메소드는 클라이언트 요청이 Dispatcher Servlet에 전달되기 전에 필터링 작업을 수행합니다. 즉, url-pattern에 맞는 모든 HTTP 요청이 웹 컨테이너에 의해 실행됩니다. 해당 메소드의 파라미터로 FilterChain이 존재하는데, 이를 사용하여 FilterChain 객체를 사용해 다음 필터 또는 서블릿으로 요청을 전달할 수 있습니다. `chain.doFilter()`로 전, 후에 필요한 처리과정을 넣어줌으로써 원하는 처리를 진행할 수 있습니다. 모든 필터가 실행된 후에는 최종적으로 DispatcherServlet에 요청이 전달되어 컨트롤러 로직이 실행되며, 응답 시에는 역순으로 필터들이 실행됩니다. Dispatcher Servlet에 대해 더 알아보고 싶으시면 [여기](https://blog.kurtyoon.me/spring/2024/10/23/dispatcher-servlet.html)를 참고해주세요.

```java
public class FilterCore implements Filter {

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        // 요청 전 처리 작업
        System.out.println("FilterCore.doFilter start");

        // 다음 필터 또는 서블릿으로 요청을 전달
        filterChain.doFilter(servletRequest, servletResponse);

        // 응답 후 처리 작업
        System.out.println("FilterCore.doFilter end");
    }
}
```

`destroy()` 메소드는 어플리케이션이 종료될 때 필터 인스턴스를 제거하기 위해 호출됩니다. 이때, 필터가 사용한 자원을 반환하게 됩니다. 이 메서드는 필터가 더이상 사용되지 않을 때 웹 컨테이너에 의해 호출되며, 필터 객체를 종료하면 `doFilter`에 의해 처리되지 않습니다.

```java
public class FilterCore implements Filter {

    @Override
    public void destroy() {
        System.out.println("FilterCore.destroy");
    }
}
```

### Interceptor

스프링 어플리케이션에서는 요청과 응답의 흐름을 제어하고 특정 작업을 처리하기 위해 Interceptor가 자주 사용됩니다. 필터가 웹 컨테이너에서 동작하는 반면, 인터셉터는 스프링 컨테이너에서 작동하여 DispatcherServlet과 Controller 사이에 개입하여 여러 부가적인 작업을 처리합니다.

인터셉터는 DispatcherServlet이 컨트롤러를 호출하기 전과 후에 특정 작업을 수행하도록 설계된 컴포넌트입니다. 요청이 들어오면, HandlerMapping을 통해 컨트롤러를 찾게 되는데, 그 과정에서 HandlerExecutionChain에 연결된 인터셉터들이 순차적으로 실행됩니다.
인터셉터는 컨트롤러로 직접 요청을 전달하는 역할은 하지 않지만, 컨트롤러에 도달하기 전 전처리 작업, 컨트롤러 호출 후 후처리 작업, 최종 응답 후 리소스 정리와 같은 기능을 제공합니다.

![](https://img1.daumcdn.net/thumb/R960x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbVxpUK%2FbtrAfCDbKqx%2FvKZpnAWkOHKID44Qemz2hK%2Fimg.png)

스프링 인터셉터는 HandlerInterceptor 인터페이스를 구현하여 사용합니다. 해당 인터페이스는 다음과 같은 형태이며, 각 메소드는 요청의 처리 시점에 따라 호출됩니다.

```java
public interface HandlerInterceptor {
    default boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        return true;
    }

    default void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, @Nullable ModelAndView modelAndView) throws Exception {
    }

    default void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, @Nullable Exception ex) throws Exception {
    }
}
```

`preHandle()` 메서드의 경우 컨트롤러가 실행되기 전에 호출됩니다. 요청을 검사하거나, 권한 체크, 파라미터 검증, 로깅 등 전처리 작업에 사용되고, 해당 메서드가 false를 반환하는 경우 요청이 중단되며, 컨트롤러가 호출되지 않습니다.

```java
public class InterceptorCore implements HandlerInterceptor {

    @Override
    public boolean preHandle(
            HttpServletRequest request,
            HttpServletResponse response,
            Object handler
    ) throws Exception {
        System.out.println("InterceptorCore.preHandle");
        return true;
    }
}
```

`postHandle()` 메서드의 경우 컨트롤러가 실행된 후, View가 렌더링되기 전에 호출됩니다. 이 메서드는 컨트롤러가 반환하는 ModelAndView 타입의 정보가 제공되어, 해당 객체를 수정하거나, 후처리 작업을 할 떄 사용됩니다. 그러나 최근에는 JSON 기반으로 데이터를 제공하는 RestAPI 기반의 컨트롤러를 사용하며 자주 사용되지는 않습니다.

```java
public class InterceptorCore implements HandlerInterceptor {

    @Override
    public void postHandle(
            HttpServletRequest request,
            HttpServletResponse response,
            Object handler,
            ModelAndView modelAndView
    ) throws Exception {
        System.out.println("InterceptorCore.postHandle");
    }
}
```

`afterCompletion()` 메서드의 경우 모든 작업이 완료된 후, 즉, View가 렌더링 된 후에 호출됩니다. 예외가 발생했을 경우에도 호출되기 때문에, 사용한 리소스 해제나 에러 로깅 등을 처리 가능합니다.

인터셉터 대신에 컨트롤러들에 적용할 부가기능을 Advice 형태로 만들어 AOP를 적용할 수도 잇으나, 컨트롤러는 타입과 실행 메서드가 제각각이라 적용할 메서드의 선별이 어렵고, 파라미터나 리턴 값이 일정하지 않기 때문에 인터셉터를 사용하는 편이 더 효율적입니다. 즉, 타입이 일정하지 않고 호출 패턴이 정해져 있어 컨트롤러에 AOP를 적용하려면 부가작업이 발생하게 됩니다.

### Filter와 Interceptor

필터는 톰캣과 같은 웹 컨테이너에서 관리되기 때문에 스프링 컨테이너와 무관하게 동작합니다. 반면, 인터셉터는 스프링 프레임워크의 ApplicationContext에서 관리됩니다. 이는 인터셉터가 스프링 컨테이너의 빈에 의존할 수 있다는 의미입니다.

또한, 필터는 ServletRequest나 ServletResponse와 같은 객체를 직접 교체하거나 조작할 수 있습니다. 이로 인해, 요청의 헤더나 파라미터를 수정하거나 응답 내용을 조작하는 데 적합합니다. 반면, 인터셉터는 요청과 응답 객체의 내부 값만 조작할 수 있고, 객체 자체는 교체할 수 없습니다. 이는 주로 컨트롤러로 전달될 데이터를 가공하는 데 사용합니다.

필터는 어플리케이션 전반에 걸친 전역적인 설정을 처리하기 위해 DispatcherServlet 이전 단계에서 모든 요청에 대해 동작하지만, 인터셉터는 DispatcherServlet과 Controller 사이에 동작하며, 비즈니스 로직과 연관된 작업을 수행합니다.

필터는 FilterChain을 통해 다음 필터로 요청을 전달해야 합니다. 만약 `chain.doFilter()`를 호출하지 않는다면 요청이 더 이상 진행되지 않습니다. 인터셉터의 경우 `preHandle()` 메서드가 true를 반환해야 다음 인터셉터나 컨트롤러로 요청이 전달되고, false를 반환하는 경우 요청 처리가 중단됩니다.

예외처리에 대해서도 차이점이 존재하는데, 필터에서 예외가 발생한느 경우 필터 자체에서 예외를 처리하거나 요청을 차단할 수 있지만, 인터셉터에서 발생한 예외는 컨트롤러로 전달되어 예외 처리 핸들러에서 처리될 수 있습니다.

[ 참고 ]

- [https://dev-coco.tistory.com/173](https://dev-coco.tistory.com/173)
