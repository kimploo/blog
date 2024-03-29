---
author: 코사남
pubDatetime: 2023-12-09T09:00:00.01Z
title: TypeScript 런타임 Bun과 함께하는 코딩테스트
slug: TypeScript-런타임-Bun과-함께하는-코딩테스트
featured: false
ogImage: https://github.com/satnaing/astro-paper/assets/53733092/1ef0cf03-8137-4d67-ac81-84a032119e3a
tags:
  - 코딩테스트
  - TypeScript
  - Bun
description: "간지 Driven Development를 위한 최신 런타임 Bun과 함께하는 코딩 테스트 준비"
---

## Table of contents

## Intro, Why Bun?

안녕하세요, 코사남입니다.

모든 개발자에게 숙제처럼 느껴지는 게 있죠, 알고리즘과 코딩테스트입니다.
저에게도 숙제 같은 친구인데요, 이번에 쉬면서 어떻게 하면 좀 더 재밌게(?) 코딩테스트를 준비할 수 있을까 하다가
레포를 하나 파서 학습한 내용을 기록하고 있습니다.

이전 회사 동료가 GDD(간지 Driven Development)...라는 단어를 썼던 적이 있습니다.
당장 뭔가 필요는 없지만, 새로운 개발 기술을 써보고 싶은 많은 개발자의 열망(?)이 담긴 개발 방법론이죠.

JavaScript 생태계 기반 개발자는 정말 많은 JavaScript 관련 오픈소스를 만나게 되는데요,
저에게 그중 하나는 바로 이 Bun이라는 친구였습니다.
도대체 뭐가 대단하길래 이렇게 유명한가? 싶고, 진짜 작동 하긴 하는 건가? 호기심도 들었습니다.
Node.js는 크롬의 v8을 사용하는데, Bun은 사파리의 JavaScriptCore를 채택하여
코드 실행 속도도 개선을 이뤗고, 타입스크립트도 직접 실행할 수 있어 점점 유명세를 타고 있습니다.
국내에서 여러 개발 유튜버가 소개를 하기도 했습니다.

<figure>
  <img src="https://hongshik-blog-bucket.s3.ap-northeast-2.amazonaws.com/photos/baekseolgi-blog/coding-test-with-bun/Screenshot+2023-12-09+at+10.39.41+PM.png" width="718" alt="bun introduction" />
  <figcaption>오븐에서 구워진 번.. 너 그렇게 빠르니? 🤔</figcaption>
</figure>

저도 업무에서 사용하는 기술 스택은 다소 보수적으로 선택하는 편인데,
여러 오픈소스 라이브러리에서도 Bun으로도 설치 가이드가 나오는 것을 볼 때 어느 정도 안정화 단계로 보이고
코딩테스트 학습을 위해서 많은 라이브러리가 필요하지 않기 때문에 가벼운 마음으로 Bun을 선택했습니다.
테스트를 위한 자체 모듈이 포함된 것도 매리트였습니다.
그리고 드디어 혼자 마음속으로만 꿈꾸던 GDD를 실천할 수 있게 되기도 했네요! 🙃

<figure>
  <img src="https://hongshik-blog-bucket.s3.ap-northeast-2.amazonaws.com/photos/baekseolgi-blog/coding-test-with-bun/Screenshot+2023-12-09+at+6.49.32+PM.png" width="718" alt="bun official doc screenshot" />
  <figcaption>CRA를 대체하는 Vite Getting Started에 Bun이 소개되어 있다.</figcaption>
</figure>

## Bun 초기 세팅

[Bun 공식 문서](https://bun.sh/)를 참고하면 쉽게 초기 세팅을 할 수 있습니다.

<figure>
  <img src="https://hongshik-blog-bucket.s3.ap-northeast-2.amazonaws.com/photos/baekseolgi-blog/coding-test-with-bun/Screenshot+2023-12-09+at+12.33.34+PM.png" width="718" alt="bun official doc screenshot" />
  <figcaption>Bun 공식문서</figcaption>
</figure>

먼저 Bun을 설치합니다. 터미널에서 개발자에게 익숙한 `curl`로 간단하게 설치합니다.

```bash
# bun 설치
curl -fsSL https://bun.sh/install | bash

# 설치가 잘 되었는지 확인
bun --help
```

아래와 같은 화면이 나오면 성공입니다. 요즘 새로 나온 라이브러리는 설명이 깔끔하게 잘 되어있어 DX가 좋네요.

<figure>
  <img src="https://hongshik-blog-bucket.s3.ap-northeast-2.amazonaws.com/photos/baekseolgi-blog/coding-test-with-bun/Screenshot+2023-12-09+at+12.37.18+PM.png" width="718" height="404" alt="bun official doc screenshot" />
  <figcaption>`bun --help`의 터미널 출력값</figcaption>
</figure>

## Bun으로 타입스크립트 사용하기

Node.js는 타입스크립트를 실행할 수 없기 때문에 따로 `ts-node`를 설치해야 했지만, Bun은 타입스크립트를 바로 실행할 수 있습니다.
또한 Node.js에는 약간 어설프게 있는 테스트 기능을 Bun은 테스트 러너를 포함하여 견고하게 제공합니다.
구 Facebook에서 만든 유명한 `jest` 테스트 프레임워크 문법을 그대로 따른다고 합니다.
아직 모든 기능이 구현되지는 않았다고 합니다. [bun test 기능 개발 관련 Github Issue](https://github.com/oven-sh/bun/issues/1825)

이렇게 멋진 기능을 사용하기 위해서는 `bun-types` 설치와 타입스크립트 설정이 필요합니다. 설명을 위한 새로운 디렉터리 생성 및 `bun init`을 진행해 보겠습니다.

```bash
# 홈 디렉터리에 my-coding-test 디렉터리 생성 (다른 곳에 생성해도 OK)
mkdir ~/my-coding-test && cd ~/my-coding-test

# bun 프로젝트 시작
bun init
```

이후 package 이름과 entry point를 어떻게 설정할지 정합니다.
애플리케이션 제작을 위한 코드가 아니라 크게 상관없으니, 기본값으로 설정합니다.
기본값으로 설정하려면 그냥 엔터를 누르면 됩니다.
아래와 같은 화면을 보면 성공입니다.

<figure>
  <img src="https://hongshik-blog-bucket.s3.ap-northeast-2.amazonaws.com/photos/baekseolgi-blog/coding-test-with-bun/Screenshot+2023-12-09+at+12.52.31+PM.png" width="718" alt="bun init result" />
  <figcaption>`bun init`의 터미널 출력값</figcaption>
</figure>

## Bun으로 내가 작성한 코딩테스트 문제 실행하기

`my-coding-test` 디렉터리에서 간단한 코딩테스트 문제 코드를 적어보겠습니다.

- `solution.ts`: 푼 문제 코드
- `solution.spec.ts`: 푼 문제 코드를 기반으로 테스트 작성

저는 오늘 자바스크립트 알고리즘 코스를 학습하면서 정렬된 정수 배열에서 유니크한 값의 개수를 찾는 함수를 만들었습니다.
이 함수를 `solution.ts`에 작성하겠습니다.

```ts
// solution.ts
export function solution(sortedArr: number[]) {
  if (sortedArr.length === 0) return 0;
  let i = 0;
  let j = 1;
  let count = 1;
  while (j < sortedArr.length) {
    if (sortedArr[i] !== sortedArr[j]) {
      count++;
      i = j;
      j = i + 1;
    } else {
      j++;
    }
  }
  return count;
}
```

테스트도 작성하겠습니다.

```ts
// solution.spec.ts
// import { expect, test, describe } from "vitest"; (vitest나 jest의 문법과 거의 유사하다.)
import { expect, test, describe } from "bun:test";
import { solution } from "./solution";

describe("정렬된 정수 배열을 받아 유니크한 값의 개수를 리턴한다.", () => {
  test("", () => {
    expect(solution([1, 1, 1, 1, 1, 2])).toBe(2);
    expect(solution([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13])).toBe(7);
    expect(solution([])).toBe(0);
    expect(solution([-2, -1, -1, 0, 1])).toBe(4);
  });
});
```

Bun은 자체 테스트 러너가 있어, 따로 테스트 프레임워크를 설치하지 않아도 테스트 실행이 가능합니다. `bun test <경로>` 문법을 따릅니다. 디렉터리 구조가 아래와 같은 경우의 CLI 예시를 작성해 봤습니다.

```bash
# ~/my-coding-test
.
├── README.md
├── bun.lockb
├── index.ts
├── package.json
├── practices
│   └── count-unique-values
│       ├── solution.spec.ts
│       └── solution.ts
└── tsconfig.json
```

```bash
# 테스트 실행 스크립트
bun test ~/my-coding-test/practices/count-unique-values
```

<figure>
  <img src="https://hongshik-blog-bucket.s3.ap-northeast-2.amazonaws.com/photos/baekseolgi-blog/coding-test-with-bun/Screenshot+2023-12-09+at+12.52.31+PM.png" width="718" alt="bun-test result" />
  <figcaption>테스트 실행 결과</figcaption>
</figure>

따로 테스트 파일을 지정하지 않아도 작동하는 이유는, Bun에서 스크립트에서 지정한 디렉터리를 기점으로 아래 정규식에 맞는 파일을 실행하기 때문입니다. 자세한 내용은 [공식 문서](https://bun.sh/docs/cli/test)를 확인해 주세요.
`*.test.{js|jsx|ts|tsx}`, `*_test.{js|jsx|ts|tsx}`, `*.spec.{js|jsx|ts|tsx}`, `*_spec.{js|jsx|ts|tsx}`

## 보너스, 린트 설정

테스트 작성까지는 크게 어렵지 않았는데요, 개인적으로는 린터 없이 개발하는 것을 상당히 힘들어합니다. 그래서 Bun에서도 린터 및 포맷터 설정을 해보겠습니다.

- 설치 스크립트

```bash
# `eslint`: 린터
# `prettier`: 포메터
# `eslint-plugin-prettier`, `eslint-config-prettier`: Eslint와 Prettier를 통합하여 사용하기 위한 라이브러리. 서로 충돌하거나 동시에 작동하는 일을 방지해준다.
# `@typescript-eslint/parser`, `@typescript-eslint/eslint-plugin`: eslint가 타입스크립트의 AST를 사용할 수 있게 돕는 라이브러리
# `typescript`
bun add -d eslint eslint-plugin-prettier eslint-config-prettier prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin typescript
```

- `.eslintrc.json` 설정

```json
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest"
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ]
}
```

- VS Code를 사용하는 경우, `eslint`, `prettier` extension을 설치하고 `format on save` 설정을 한다.
- 린트 스크립트를 작성한다. (스크립트는 써놓지 않으면 자꾸 까먹어서 가능하면 꼭 `package.json` 파일에 작성하는 편)

```json
// package.json
// ...
  "scripts": {
    "lint": "eslint . --fix" // 가능한 린트, 포맷팅은 하고, 고칠 수 없는 에러는 throw
  }
// ...
```

위와 같이 설정을 마치면, VS Code에서 eslint와 prettier가 동시에 잘 작동하고
eslint가 포맷팅 에러까지 잡아주는 모습을 확인할 수 있습니다.
설정이 잘 되었다면 파일 저장만 해도 린트 및 포맷팅을 할 수 있습니다.
`bun lint`로 스크립트를 통한 전체 파일의 린트도 가능합니다.

<figure>
  <img src="https://hongshik-blog-bucket.s3.ap-northeast-2.amazonaws.com/photos/baekseolgi-blog/coding-test-with-bun/Screenshot+2023-12-09+at+10.12.46+PM.png" width="718" alt="eslint applied" />
  <figcaption>eslint가 포맷팅 실수도 에러로 잡고 있는 모습</figcaption>
</figure>

<figure>
  <img src="https://hongshik-blog-bucket.s3.ap-northeast-2.amazonaws.com/photos/baekseolgi-blog/coding-test-with-bun/Screenshot+2023-12-09+at+10.12.46+PM.png" width="718" alt="bun lint 결과" />
  <figcaption>`bun lint`실행 결과</figcaption>
</figure>

## 마치며

이번 글에서는 Bun으로 타입스크립트를 실행하고, 테스트를 작성하고 실행해 봤습니다.
직접 실행해 보시면 아시겠지만, 상당히 속도가 빠르고 생각보다 안정적인 편입니다.
앞으로 저도 기회가 되면 간단한 사이드 프로젝트는 Bun으로 해봐도 되겠다는 생각이 들었습니다.

이번 글의 코드는 아래 Github에서도 확인하실 수 있습니다.

[https://github.com/fe-codecrafters/try-bun-with-coding-practice](https://github.com/fe-codecrafters/try-bun-with-coding-practice)

제 글이 조금이라도 독자 여러분의 즐거운 개발 생활에 도움이 되었으면 합니다. 더 좋은 글로 찾아뵙겠습니다.
