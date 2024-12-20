---
title: "[Spring] Application Context를 푹먹해보자"
layout: post
author: kurtyoon # 작성자
banner: https://i.esdrop.com/d/f/hhaNifrpr0/KCgVy049Rz.jpg # 배너 이미지
categories:
  - Spring
tags:
  - Spring
article: "Application Context를 푹먹해보자" # 포스트 내용 함축
date: "2024-10-25 01:30 +0900"
sidebar: []
published: true
comments: true
---

## ApplicationContext

Spring에서는 빈의 생성과 관계설정 같은 제어를 담당하는 IoC(Inversion of Control) 컨테이너인 빈 팩토리(Bean Factory)가 존재합니다. 하지만, 실제로는 빈의 생성과 관계 설정 외에도 추가적인 기능이 필요한데, 이러한 이유로 Spring에서는 빈 팩토리를 상속받아 확장한 애플리케이션 컨텍스트(Application Context)를 주로 사용합니다.

Application Context는 별도의 설정 정보를 참고하고 IoC를 적용하여 빈의 생성, 관계 설정 등의 제어 작업을 총괄합니다. Application Context에는 직접 오브젝트를 생성하고 관계를 맺어주는 코드가 없고, 그런 생성 정보와 연관관계 정보에 대한 설정을 읽어 처리합니다. 예를 들어 `@Configuration`과 같은 어노테이션이 대표적인 IoC의 설정정보입니다.

Application Context는 Bean들의 생성과 Dependency Injection 등의 역할을 하는 일종의 DI 컨테이너입니다. 우리가 직접 Application Context를 생성할 수 있지만, SpringBoot를 사용하는 경우 Application 종류에 따라 다른 종류의 ApplicationContext가 내부에 생성됩니다.

- 웹 어플리케이션이 아닌 경우
  - Application Context: `AnnotationConfigApplicationContext`
  - Web Server: X
- 서블릿 기반의 웹 어플리케이션인 경우
  - Application Context: `AnnotationConfigServletWebServerApplicationContext`
  - Web Server: `Tomcat`
- Reactive 웹 어플리케이션인 경우
  - Application Context: `AnnotationConfigReactiveWebServerApplicationContext`
  - Web Server: `Netty`

일반적인 ApplicationContext 관련 클래스들은 `org.springframework.context`에 존재하며, core 모듈이나 bean 모듈을 추가하면 같이 불러와집니다.
그러나 AnnotationConfigApplicationContext, AnnotationConfigServletWebServerApplicationContext, AnnotationConfigReactiveWebServerApplicationContext는 각각 Spring boot에서 추가된 클래스이므로, `import org.springframework.boot.web` 혹은 `import org.springframework.boot.web.reactive`를 통해 불러와야 합니다.

또한 기존의 Spring 프로젝트들과 달리 Spring Boot는 내장 웹서버를 가지고 있기 때문에, 타입에 맞는 웹서버를 만들고 어플리케이션 실행과 함께 내장 웹서버가 시작됩니다.

### 빈 요청 시 처리 과정

클라이언트에서 해당 빈을 요청하면 Application Context는 다음과 같은 과정을 거쳐 빈을 반환합니다.

1. ApplicationContext는 `@Configuration`이 붙은 클래스들을 설정 정보로 등록해두고, `@Bean`이 붙은 메소드의 이름으로 빈 목록을 생성합니다.
2. 클라이언트에서 해당 빈을 요청합니다.
3. ApplicationContext는 자신의 빈 목록에서 요청한 이름이 있는지 찾습니다.
4. ApplicationContext는 설정 클래스로부터 빈 생성을 요청하고, 생성된 빈을 돌려줍니다.

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FLuLhA%2Fbtq4squITMm%2FmqqtgMfiiahkAFBuPLMaLk%2Fimg.png)

ApplicationContext는 `@Configuration`이 붙은 클래스들을 설정 정보로 등록해두고, `@Bean`이 붙은 메소드의 이름으로 빈 목록을 생성합니다. 그리고 클라이언트가 해당 빈을 요청한다면 ApplicationContext는 자신의 빈 목록에서 요청한 이름이 있는지 찾고, 있다면 해당 빈 생성 메소드(`@Bean`이 붙은 메소드)를 호출하여 빈을 생성하고 돌려줍니다. 구체적으로는 Spring 내부에서 Reflection을 사용하여 빈 정의에 나오는 클래스 이름을 이용하거나, 빈 팩토리를 이용하여 빈을 생성합니다.

이렇게 Application Context를 사용하면 다음과 같은 장점이 존재합니다.

클라이언트는 `@Configuration`이 붙은 구체적인 팩토리 클래스를 알 필요가 없습니다. 어플리케이션이 발전하면 팩토리 클래스가 계속해서 증가할 것입니다. ApplicationContext가 없다면 클라이언트가 원하는 객체를 가져오려면 어떤 팩토리 클래스에 접근해야 하는지 알아야 하는 번거로움이 생깁니다. 반면에 ApplicationContext를 사용하면 클라이언트는 ApplicationContext에게 빈을 요청하면 됩니다. ApplicationContext는 팩토리가 많아져도 이에 접근할 필요가 없어져, 일관된 방식으로 원하는 빈을 가져올 수 있습니다.

또한 ApplicationContext는 종합 IoC 서비스를 제공해줍니다. ApplicationContext는 객체의 생성과 관계 설정이 다가 아니라, 객체가 만들어지는 방식과 시점 및 전략 등을 다르게 가져갈 수 있고, 그 외에도 후처리나 정보의 조합 인터셉트 등과 같은 다양한 기능이 존재합니다.

마지막으로 ApplicationContext를 통해 다양한 빈 검색 방법을 제공할 수 있습니다. ApplicationContext에서 빈 목록을 관리하여, 빈의 이름이나 타입 또는 어노테이션 설정 등으로 빈을 찾을 수 있습니다. 이러한 빈을 직접 찾는 방식은 의존성 검색(Dependency lookup)으로 불립니다.

그런데 Java로 기본적인 싱글톤 패턴을 구현하고자 하면 private 생성자를 갖고 있어 상속이 불가능하고 테스트하기 힘들다는 단점이 있습니다. 또한, 서버 환경에서는 싱글톤이 1개만 생성됨을 보장하지 못하고, 전역 상태를 만들 수 있기 때문에 객체지향적이지 못합니다.

그래서 스프링은 직접 싱글톤 형태의 오브젝트를 만들고 관리하는 기능을 제공하는데, 이를 Singleton Registry라고 합니다. 스프링 컨테이너는 싱글톤을 생성하고, 관리하고 공급하는 컨테이너이기도 합니다.

기본적으로 싱글톤이 멀티쓰레드 환경에서 서비스 형태의 객체로 사용되기 위해서는 내부에 상태를 가지고 있어서는 안됩니다. 그렇기 때문에 싱글톤 객체는 상태를 가지고 있어서는 안되며, 상태를 가지고 있는 객체는 프로토타입으로 생성하여 사용해야 합니다.

### Singleton

ApplicationContext에 의해 등록된 빈은 기본적으로 싱글톤으로 관리됩니다. 즉, 스프링에 여러 번 빈을 요청하더라도 매번 동일한 객체를 돌려줍니다. ApplicationContext가 싱글톤으로 빈을 관리하는 이유는 대규모 트래픽을 처리할 수 있도록 하기 위함입니다. 스프링은 최초 설계될 때, 대규모 엔터프라이즈 환경에서 요청을 처리할 수 있도록 고안되었습니다. 그리고 그에 따라 계층적으로 처리구조가 나눠지게 되었습니다. 그런데 매번 클라이언트에서 요청이 올 때마다 각 로직을 처리하는 빈을 새로 만들어서 사용한다고 생각하면, 요청 1개에 5개의 객체가 만들어진다고 하고, 1초에 500번의 요청이 온다고 하면 초당 2500개의 새로운 객체가 생성됩니다. 이는 메모리를 많이 사용하게 되고, GC가 많이 일어나게 되어 성능이 저하됩니다. 이러한 문제를 해결하고자 빈을 싱글톤 스코프로 관리하여 1개의 요청이 왔을 떄 여러 쓰레드가 빈을 공유해 처리하도록 하였습니다.

### DI Container와 Application Context

Application Context는 이름 그대로 어플리케이션을 실행하기 위한 환경입니다. 그럼에도 Application Context가 DI 컨테이너라고도 불리며, 그러한 역할을 할 수 있는 이유는 ApplicationContext가 빈들을 생성하는 BeanFactory 인터페이스를 상속받고 있기 때문입니다.

ApplicationContext의 실제 구조도를 확인하면 다음과 같습니다.

![](https://i.esdrop.com/d/f/hhaNifrpr0/VxlfIBcyGs.png)

BeanFactory는 ApplicationContext의 최상위 인터페이스 중 하나이며, 다음과 같이 빈을 찾기 위한 메소드들을 가지고 있습니다.

```java

public interface BeanFactory {
    String FACTORY_BEAN_PREFIX = "&";

    Object getBean(String name) throws BeansException;

    <T> T getBean(String name, Class<T> requiredType) throws BeansException;

    Object getBean(String name, Object... args) throws BeansException;

    <T> T getBean(Class<T> requiredType) throws BeansException;

    <T> T getBean(Class<T> requiredType, Object... args) throws BeansException;

    <T> ObjectProvider<T> getBeanProvider(Class<T> requiredType);

    <T> ObjectProvider<T> getBeanProvider(ResolvableType requiredType);

    boolean containsBean(String name);

    boolean isSingleton(String name) throws NoSuchBeanDefinitionException;

    boolean isPrototype(String name) throws NoSuchBeanDefinitionException;

    boolean isTypeMatch(String name, ResolvableType typeToMatch) throws NoSuchBeanDefinitionException;

    boolean isTypeMatch(String name, Class<?> typeToMatch) throws NoSuchBeanDefinitionException;

    @Nullable
    Class<?> getType(String name) throws NoSuchBeanDefinitionException;

    @Nullable
    Class<?> getType(String name, boolean allowFactoryBeanInit) throws NoSuchBeanDefinitionException;

    String[] getAliases(String name);
}
```

스프링은 동일한 타입의 빈이 여러 개 존재하더라도 List를 통해 빈을 찾아서 주입해줍니다. 이러한 기능을 처리할 수 있는 이유는 ApplicationContext가 BeanFactory를 바로 상속받는 형태가 아닌 BeanFactory의 자식 인터페이스인 ListableBeanFactory와 HierarchicalBeanFactory를 통해 상속받는 것을 확인할 수 있습니다.

최상위 BeanFactory는 단일 빈을 처리하기 위한 인터페이스를 가지고 있는 반면 ListableBeanFactory는 빈 리스트를 처리하기 위한 인터페이스를 가지고, HierarchicalBeanFactory는 여러 BeanFactory들 간의 계층 관계를 처리하기 위한 인터페이스를 가지고 있습니다. 이를 통해 ApplicationContext는 단일 빈 외에도 다양하게 빈을 처리할 수 있습니다.

```java
public interface ListableBeanFactory extends BeanFactory {
    boolean containsBeanDefinition(String beanName);

    int getBeanDefinitionCount();

    String[] getBeanDefinitionNames();

    <T> ObjectProvider<T> getBeanProvider(Class<T> requiredType, boolean allowEagerInit);

    <T> ObjectProvider<T> getBeanProvider(ResolvableType requiredType, boolean allowEagerInit);

    String[] getBeanNamesForType(ResolvableType type);

    String[] getBeanNamesForType(ResolvableType type, boolean includeNonSingletons, boolean allowEagerInit);

    String[] getBeanNamesForType(@Nullable Class<?> type);

    String[] getBeanNamesForType(@Nullable Class<?> type, boolean includeNonSingletons, boolean allowEagerInit);

    <T> Map<String, T> getBeansOfType(@Nullable Class<T> type) throws BeansException;

    <T> Map<String, T> getBeansOfType(@Nullable Class<T> type, boolean includeNonSingletons, boolean allowEagerInit) throws BeansException;

    String[] getBeanNamesForAnnotation(Class<? extends Annotation> annotationType);

    Map<String, Object> getBeansWithAnnotation(Class<? extends Annotation> annotationType) throws BeansException;

    @Nullable
    <A extends Annotation> A findAnnotationOnBean(String beanName, Class<A> annotationType) throws NoSuchBeanDefinitionException;

    @Nullable
    <A extends Annotation> A findAnnotationOnBean(String beanName, Class<A> annotationType, boolean allowFactoryBeanInit) throws NoSuchBeanDefinitionException;

    <A extends Annotation> Set<A> findAllAnnotationsOnBean(String beanName, Class<A> annotationType, boolean allowFactoryBeanInit) throws NoSuchBeanDefinitionException;
}

public interface HierarchicalBeanFactory extends BeanFactory {
    @Nullable
    BeanFactory getParentBeanFactory();

    boolean containsLocalBean(String name);
}
```

그 외에도 `AutowireCapableBeanFactory`가 존재하는데, ApplicationContext는 이를 상속받지 않습니다. 그럼에도 불구하고 `@Autowired`를 처리할 수 있는 이유는 ApplicationContext 인터페이스를 살펴본다면 알 수 있습니다.

```java
public interface ApplicationContext extends EnvironmentCapable, ListableBeanFactory, HierarchicalBeanFactory, MessageSource, ApplicationEventPublisher, ResourcePatternResolver {
    @Nullable
    String getId();

    String getApplicationName();

    String getDisplayName();

    long getStartupDate();

    @Nullable
    ApplicationContext getParent();

    // @Autowired를 처리하기 위한 메소드
    AutowireCapableBeanFactory getAutowireCapableBeanFactory() throws IllegalStateException;
}
```

ApplicationContext는 `AutowireCapableBeanFactory`를 상속받지 않지만, `getAutowireCapableBeanFactory()` 메소드를 통해 `AutowireCapableBeanFactory`를 반환합니다. 이를 통해 ApplicationContext는 `@Autowired`를 처리할 수 있습니다.

위의 과정을 통해 ApplicationContext를 통해 Bean을 찾을 수 있다는 것을 아게 되었습니다. 그러나 실제로 Spring의 Bean들이 ApplicationContext에서 관리되는 것은 아닙니다. ApplicationContext 하위에는 다양한 구현체들이 존재하며, 위에서 작성한 ApplicationContext의 구현체들은 모두 `GenericWebApplicationContext라는` 클래스를 부모로 가지고 있습니다.

```java
public class GenericApplicationContext extends AbstractApplicationContext implements BeanDefinitionRegistry {
    private final DefaultListableBeanFactory beanFactory;
    @Nullable
    private ResourceLoader resourceLoader;
    private boolean customClassLoader;
    private final AtomicBoolean refreshed;

    public GenericApplicationContext() {
        this.customClassLoader = false;
        this.refreshed = new AtomicBoolean();
        this.beanFactory = new DefaultListableBeanFactory();
    }

    public GenericApplicationContext(DefaultListableBeanFactory beanFactory) {
        this.customClassLoader = false;
        this.refreshed = new AtomicBoolean();
        Assert.notNull(beanFactory, "BeanFactory must not be null");
        this.beanFactory = beanFactory;
    }

    public GenericApplicationContext(@Nullable ApplicationContext parent) {
        this();
        this.setParent(parent);
    }

    public GenericApplicationContext(DefaultListableBeanFactory beanFactory, ApplicationContext parent) {
        this(beanFactory);
        this.setParent(parent);
    }
}
```

위 클래스의 생성자를 확인하면 다음과 같은데, 내부에서 진짜 빈들을 등록하여 관리하고 찾아주는 `DefaultListableBeanFactory`를 생성하고 있음을 확인할 수 있습니다.

즉, ApplicationContext는 빈들을 관리하는 BeanFactory의 구현체인 `DefaultListableBeanFactory`를 내부에 가지고 있으며, ApplicationContext에 빈을 등록하거나 찾아달라는 빈 처리 요청이 오면 BeanFactory로 이러한 요청을 위임하여 처리합니다. 또한, ApplicationContext가 `@Autowired`를 처리해주는 빈 팩토리를 반환하는 `getAutowireCapableBeanFactory()` 메소드가 반환하는 빈 팩토리가 바로 DefaultListableBeanFactory입니다.

DefaultListableBeanFactory를 타고 들어가보면 상위에 `@Autowird` 처리를 위한 인터페이스인 `AutowireCapableBeanFactory`와 그에 대한 추상 클래스 구현체인 `AbstractAutowireCapablBeanFactory`를 상속받고 있음을 알 수 있습니다. 따라서 ApplicationContext로 `getAutowireCapableBeanFactory`를 요청하면 `AutowireCapableBeanFactory` 타입으로 추상화된 `DefaultListableBeanFactory` 구현체 객체를 반환받게 됩니다.

`ConfigurableApplicationContext`는 거의 모든 ApplicationContext가 갖는 공통 ApplicationContext의 인터페이스로써 `ApplicationContext`, `Lifecycle`, `Closable` 인터페이스를 상속받습니다. 이러한 이유로 Spring Boot 어플리케이션을 실행하는 run 메소드를 호출하면 받는 반환 타입 역시 ConfigurableApplicationContext입니다. 위에서 확인했듯, `Closable` 인터페이스를 상속받고 있기 때문에 어플리케이션의 종료와 실행을 반복해야 하는 경우에 다음과 같이 `try-with-resources` 구문을 사용하여 어플리케이션을 실행하고 종료할 수 있습니다.

```java
public class Application {
    public static void main(String[] args) {
        try (ConfigurableApplicationContext context = SpringApplication.run(Application.class, args)) {
            // 어플리케이션 실행
        } catch (Exception e) {
            // 어플리케이션 종료
        }
    }
}
```

위와 같은 경우 `run` 메소드를 호춣 후에 `try` 블록 내에서 어플리케이션을 실행하고, `try` 블록이 종료되면 `context` 객체가 `close` 메소드를 호출하여 어플리케이션을 종료합니다. 그래서 매번 끄고 재시작하지 않고 1번 실행 후에 자동 종료되도록 할 수 있습니다. 실제 `close` 메소드는 `AbstractApplicationContext`에 다음과 같이 정의되어 있습니다.

```java
public abstract class AbstractApplicationContext extends DefaultResourceLoader implements ConfigurableApplicationContext {

    // 중략

    public void close() {
        if (this.isStartupShutdownThreadStuck()) {
            this.active.set(false);
        } else {
            this.startupShutdownLock.lock();

            try {
                this.startupShutdownThread = Thread.currentThread();
                this.doClose();
                if (this.shutdownHook != null) {
                    try {
                        Runtime.getRuntime().removeShutdownHook(this.shutdownHook);
                    } catch (IllegalStateException var5) {
                    }
                }
            } finally {
                this.startupShutdownThread = null;
                this.startupShutdownLock.unlock();
            }

        }
    }

    // 중략
}
```
