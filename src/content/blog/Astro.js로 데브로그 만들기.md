---
author: 코사남
pubDatetime: 2024-01-17T14:54:00.01Z
title: Astro.js가 데브로그에 적합한 이유 - 아일랜드 아키텍처
slug: Astro.js가-데브로그에-적합한-이유-아일랜드-아키텍처
featured: false
tags:
  - FE
  - Astro.js
description: "Astro.js로 블로그와 같은 콘텐츠 기반 웹사이트를 제작해 봅니다."
---

[Astro.js](https://astro.build/)는 콘텐츠 기반 웹사이트를 위한 웹 프레임워크입니다. 최근 주목받는 다른 프론트엔드 프레임워크가 웹 애플리케이션 제작을 위해 만들어지고 있습니다. Astro.js는 블로그, 문서, 랜딩페이지 등 정적인 웹사이트를 만드는데 특화되어 있고 더 빠릅니다. 다른 정적 웹 사이트 생성(Static Site Generation)과는 다르게, 원하면 interactivity를 추가할 수 있습니다. Astro은 아일랜드 아키텍쳐를 채택하고 있기 때문입니다.

[아일랜드 아키텍처](https://jasonformat.com/islands-architecture/)는 Katie Sylor-Miller라는 Etsy의 프론트엔드 개발자가 가장 먼저 논의를 시작했다고 합니다. 아일랜드 아키텍처는 서버에서 모든 HTML을 기본적으로 렌더링하되, 필요할 때 JavaScript를 "물처럼 적실"수 있습니다. (hydration) 무조건 무거운 웹 프레임워크를 모두 브라우저로 받아올 필요가 없기 때문에, 실제 퍼포먼스 개선을 이뤘습니다. 실제 유명 테크 유튜버 Theo는 Astro.js로 자신의 웹사이트의 페이지 로드 속도를 40%, 자바스크립트 번들의 사이즈를 90%로 줄였습니다. 서버 사이드 렌더링과 클라이언트 사이드 렌더링의 좋은 점이 잘 어우러져 있다고 볼 수 있습니다.

<figure>
  <img src="https://hongshik-blog-bucket.s3.ap-northeast-2.amazonaws.com/photos/cosanam-blog/Astro.js%EA%B0%80-%EB%8D%B0%EB%B8%8C%EB%A1%9C%EA%B7%B8%EC%97%90-%EC%A0%81%ED%95%A9%ED%95%9C-%EC%9D%B4%EC%9C%A0-%EC%95%84%EC%9D%BC%EB%9E%9C%EB%93%9C-%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98/islands-architecture-1.png" width="718" alt="아일랜드 아키텍처 소개" />
  <figcaption>Source: https://jasonformat.com/islands-architecture</figcaption>
</figure>

아일랜드 아키텍처는 최근 프론트엔드에서 주목받고 있는 SSR의 부상과 연관이 있습니다. 기존 SPA의 가장 큰 문제점은 SEO였는데, 메타 데이터를 루트 경로에만 지정할 수 있어 다른 페이지의 정보를 검색 엔진이나 카카오톡 인스타그램 등에서 제대로 인지하지 못했습니다. 아일랜드 아키텍처는 기본적으로 서버 사이드 렌더링을 디폴트로 채택해서, 대부분의 페이지의 메타 데이터가 잘 전달될 수 있도록 했습니다.

코사남 블로그도 Astro.js로 제작했기 때문에, 블로그 글에 각각 메타데이터를 지정할 수 있었습니다.

<figure>
  <img src="https://hongshik-blog-bucket.s3.ap-northeast-2.amazonaws.com/photos/cosanam-blog/Astro.js%EA%B0%80-%EB%8D%B0%EB%B8%8C%EB%A1%9C%EA%B7%B8%EC%97%90-%EC%A0%81%ED%95%A9%ED%95%9C-%EC%9D%B4%EC%9C%A0-%EC%95%84%EC%9D%BC%EB%9E%9C%EB%93%9C-%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98/Screenshot+2024-01-17+at+11.34.32%E2%80%AFPM.png" width="718" alt="아일랜드 아키텍처 소개" />
  <figcaption>코사남 블로그 메타 데이터</figcaption>
</figure>

Next.js에서 서버 사이드 렌더링, Server Component와 Client Component를 선택할 수 있게 하는 움직임도 이런 프론트엔드 기술의 추세와 연관이 있다고 볼 수 있습니다. 사용자 입장에서는 하나의 페이지지만, 그 하나의 페이지를 통째로 SPA로 전달할지, 아니면 적절하게 어느 부분만 JavaScript를 "적셔"볼지 프론트엔드 개발자의 고뇌가 느껴집니다.

Astro.js는 기존 프론트엔드 프레임워크 문법을 그대로 사용할 수 있습니다. 프론트엔드에서 자주 사용하는 Tailwind CSS, React, Vue 등의 Integration을 제공하고, React의 JSX와 거의 유사한 문법을 채택하여 프론트엔드 개발자라면 아주 편하게 개발을 시작할 수 있습니다. 이 블로그도 Tailwind는 본격적으로, React는 아주 조금 적용해서 사용하고 있습니다.

Astro.js가 앞으로도 프론트엔드 개발에 좋은 방향성을 제시하여 좀 더 나은 프론트엔드 개발이 될 수 있기를 바라면서 글을 마치도록 하겠습니다.
