---
title: "[OOP] SOLID를 가장 간단명료하게 풀어보자 - 4"
layout: post
author: kurtyoon # 작성자
banner: https://i.esdrop.com/d/f/hhaNifrpr0/ukThTOpYpE.jpg # 배너 이미지
categories:
  - OOP
tags:
  - OOP
article: "Interface Segregation Principle을 쉽게 풀어보자" # 포스트 내용 함축
date: "2024-10-17 11:52 +0900"
sidebar: []
published: true
comments: true
---

## Interface Segregation Principle

> 클라이언트에 맞는 세분화된 인터페이스를 만들어야합니다. - Robert C.Martin

이 원칙의 핵심은 인터페이스가 목적에 매우 구체적이어야 한다는 것입니다.

즉, 모든 것을 하는 슈퍼 인터페이스나 클래스가 있어서는 안됩니다.

분할될 수 있는 인터페이스의 예를 보여드리겠습니다. 현실적으로 데이터베이스의 저장소가 있을 때, 모든 저장소 호출을 하나의 클래스에 둘 수 있습니다. 이렇게 사용하는 경우 하나의 파일에서 관리할 수 있습니다. 편하겠죠?

```java
import java.math.BigDecimal;
import java.util.UUID;
import java.util.List;

public class Product {
    private UUID id;
    private String name;
    private BigDecimal price;

    public Product(UUID id, String name, BigDecimal price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }
}

public class Warehouse {
    private UUID id;
    private String location;
    private int numberOfProducts;
    private int maxNumberOfProducts;

    public Warehouse(UUID id, String location, int numberOfProducts, int maxNumberOfProducts) {
        this.id = id;
        this.location = location;
        this.numberOfProducts = numberOfProducts;
        this.maxNumberOfProducts = maxNumberOfProducts;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public int getNumberOfProducts() {
        return numberOfProducts;
    }

    public void setNumberOfProducts(int numberOfProducts) {
        this.numberOfProducts = numberOfProducts;
    }

    public int getMaxNumberOfProducts() {
        return maxNumberOfProducts;
    }

    public void setMaxNumberOfProducts(int maxNumberOfProducts) {
        this.maxNumberOfProducts = maxNumberOfProducts;
    }
}

public class DeliveryVan {
    private UUID id;
    private String location;
    private int maxNumberOfProducts;
    private boolean hasDriver;

    public DeliveryVan(UUID id, String location, int maxNumberOfProducts, boolean hasDriver) {
        this.id = id;
        this.location = location;
        this.maxNumberOfProducts = maxNumberOfProducts;
        this.hasDriver = hasDriver;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public int getMaxNumberOfProducts() {
        return maxNumberOfProducts;
    }

    public void setMaxNumberOfProducts(int maxNumberOfProducts) {
        this.maxNumberOfProducts = maxNumberOfProducts;
    }

    public boolean hasDriver() {
        return hasDriver;
    }

    public void setHasDriver(boolean hasDriver) {
        this.hasDriver = hasDriver;
    }
}

public interface IDatabaseRepository {
    Product getProduct(UUID id);
    Product getProductByName(String name);
    void saveProduct(Product product);
    List<Product> getAllProducts();

    Warehouse getWarehouse(UUID id);
    Warehouse getWarehouseByLocation(String location);
    void saveWarehouse(Warehouse warehouse);
    List<Warehouse> getAllWarehouses();

    DeliveryVan getDeliveryVan(UUID id);
    DeliveryVan getDeliveryVanByLocation(String location);
    void saveDeliveryVan(DeliveryVan deliveryVan);
    List<DeliveryVan> getAllDeliveryVans();
}
```

저장소의 코드가 점점 늘어나는 경우 여러 도메인에 대한 엑세스를 원할 떄, 하나의 저장소를 사용한다면 어떤 도메인을 원하는지 알 수 있을까요?

우리는 도메인 별로 인터페이스가 있어야 합니다. 이러한 경우 명확하게 정의된 도메인 집합이 있습니다. 제품, 창고, 배달 밴 이렇게 세가지가 존재합니다. 그런데 그렇게 간단하지는 않습니다.

창고가 제품을 참조하는 경우 어떤 도메인에 속하게 될까요?

```java
import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public class Product {
    private UUID id;
    private String name;
    private BigDecimal price;

    public Product(UUID id, String name, BigDecimal price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }
}

public class Warehouse {
    private UUID id;
    private String location;
    private int numberOfProducts;
    private int maxNumberOfProducts;

    public Warehouse(UUID id, String location, int numberOfProducts, int maxNumberOfProducts) {
        this.id = id;
        this.location = location;
        this.numberOfProducts = numberOfProducts;
        this.maxNumberOfProducts = maxNumberOfProducts;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public int getNumberOfProducts() {
        return numberOfProducts;
    }

    public void setNumberOfProducts(int numberOfProducts) {
        this.numberOfProducts = numberOfProducts;
    }

    public int getMaxNumberOfProducts() {
        return maxNumberOfProducts;
    }

    public void setMaxNumberOfProducts(int maxNumberOfProducts) {
        this.maxNumberOfProducts = maxNumberOfProducts;
    }
}

public class DeliveryVan {
    private UUID id;
    private String location;
    private int maxNumberOfProducts;
    private boolean hasDriver;

    public DeliveryVan(UUID id, String location, int maxNumberOfProducts, boolean hasDriver) {
        this.id = id;
        this.location = location;
        this.maxNumberOfProducts = maxNumberOfProducts;
        this.hasDriver = hasDriver;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public int getMaxNumberOfProducts() {
        return maxNumberOfProducts;
    }

    public void setMaxNumberOfProducts(int maxNumberOfProducts) {
        this.maxNumberOfProducts = maxNumberOfProducts;
    }

    public boolean isHasDriver() {
        return hasDriver;
    }

    public void setHasDriver(boolean hasDriver) {
        this.hasDriver = hasDriver;
    }
}

public interface IProductRepository {
    Product getProduct(UUID id);
    Product getProductByName(String name);
    void saveProduct(Product product);
    List<Product> getAllProducts();
}

public interface IWarehouseRepository {
    Warehouse getWarehouse(UUID id);
    Warehouse getWarehouseByLocation(String location);
    void saveWarehouse(Warehouse warehouse);
    List<Warehouse> getAllWarehouses();
}

public interface IDeliveryVanRepository {
    DeliveryVan getDeliveryVan(UUID id);
    DeliveryVan getDeliveryVanByLocation(String location);
    void saveDeliveryVan(DeliveryVan van);
    List<DeliveryVan> getAllDeliveryVans();
}
```

이 원칙은 복잡하고 이해하기 어려운 큰 인터페이스를 만들지 않는 것입니다. 인터페이스를 최대한 구체적으로 설계하여, 클래스가 원하지 않는 동작을 수행하거나 불필요한 코드를 실행하지 않도록 해야 합니다.

또한, 개발자가 호출해야 할 메서드를 명확하게 정의함으로써 개발자의 작업을 더 편리하게 만들고자 합니다.

중요한 것은 인터페이스를 구체적이고 작게 유지하는 것입니다. 하지만 과하게 메서드마다 인터페이스를 만드는 실수는 하지 않아야 합니다. 너무 세밀하게 쪼개는 것도 올바른 방향은 아닙니다.
