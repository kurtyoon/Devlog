---
title: "[K8s] Kibana install Issue"
layout: post
author: kurtyoon # 작성자
banner: https://i.esdrop.com/d/f/hhaNifrpr0/l60Cw1oOjB.png # 배너 이미지
categories:
  - Troubleshooting
tags:
  - Kubernetes
  - Kibana
article: "Kibana를 설치하는 과정에서 발생한 문제" # 포스트 내용 함축
date: "2024-03-28 18:25:00 +0900"
sidebar: []
published: true
comments: true
---

Helm을 사용해서 Kibana를 설치하는 과정에서 다음 에러가 발생하였다.

```sh
Error: INSTALLATION FAILED: failed pre-install: warning: Hook pre-install kibana/templates/pre-install-role.yaml failed: 1 error occurred:
        * roles.rbac.authorization.k8s.io "pre-install-kibana-kibana" already exists
```

해당 에러는 기본적으로 helm을 통해 업그레이드 혹은 설치를 진행하는 경우 많은 리소스가 발생한다.
이러한 리소스들도 중복으로 인하여 설치나 업그레이드에 실패하는 경우가 있다.
이러한 경우에는 관련된 리소스를 모두 삭제하고 다시 설치해주면 된다.

아래는 관련된 리소스 목록이다.

```sh
kubectl delete configmap kibana-kibana-helm-scripts
kubectl delete serviceaccount pre-install-kibana-kibana
kubectl delete roles pre-install-kibana-kibana
kubectl delete rolebindings pre-install-kibana-kibana
kubectl delete job pre-install-kibana-kibana
```
