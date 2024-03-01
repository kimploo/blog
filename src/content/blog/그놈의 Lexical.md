---
author: 코사남
pubDatetime: 2024-02-18T15:15:00.01Z
title: 그놈의 lexical, 어떻게 이해하면 좋을까?
slug: 그놈의-lexical-어떻게-이해하면-좋을까
featured: false
tags:
  - FE
  - JavaScript
description: "JavaScript에서 이해하기 어려운 lexical에 대해서 집중탐구 해봅니다."
---

## Table Of Contents

## Intro

최근 좋은 기회로 ES6에 대해서 특강을 하게 되었는데, 이번에도 어김없이 이 질문을 받았다. "선생님, lexical this가 뭐에요? lexical environment가 뭐에요? lexical scope가 뭐에요?" 오늘 다룰 주제, lexical에 대한 질문이다. 엄밀히 말하면 lexical이란 개념과 ES6는 큰 연관이 없지만, 개발자를 준비하는 학생이 ES6를 배울 때 쯤 되면 JavaScript의 깊은 부분에 대해 고민을 하게 되기 때문에 이런 질문을 많이들 한다.

나도 이런 고민을 상당히 깊게 오랬동안 했었고, 질문도 많이 받아서 이 기회에 아예 이 개념에 대해서 정리를 하면 좋겠다고 마음을 먹었다. "이미 인터넷에 좋은 글이 많고, 좋은 책에 정리가 되어있는데 왜 또 글을 쓰는지?" 라고 묻는 분들이 있을 수 있다. 맞다. lexical this, lexical environment, lexical scope 각각에 대해서는 이미 많은 분들이 좋은 글을 쓰셨다. 다만 영어를 좋아하는 나로서는 이 lexical이라는 단어 하나로 많은 것을 설명할 수 있지 않을까? lexical이라는 컨셉을 이해하면 더 쉽게 알 수 있지 않을까? 라는 생각을 했고, 이에 대한 나만의 결론을 내려보고자 한다.

## 단어 lexical의 의미

lexical을 단순히 한글로 번역하면 "어휘적, 사전적"으로 번역할 수 있다. 아쉽게도 외국어는 이렇게 단순히 번역해서는 문맥을 알기 어렵다. 최대한 원어의 느낌을 살리기 위해 [Merriam Webster 영영사전](https://www.merriam-webster.com/dictionary/lexical)를 참고했다.

> of or relating to words or the vocabulary of a language as distinguished from its grammar and construction
>
> 한 언어의 단어, 어휘와 관련이 있는, 주로 해당 언어의 구조와 문법과 구분하기 위해서

쉽게 설명하면, 어떤 언어의 어휘적인 특징을 강조하기 위한 형용사다. 주변 문맥과 다르게 단어 자체로만으로 무슨 의미를 가지는지 설명하기 위한 단어다. "이 단어의 어휘적인 의미는 (현재 문장, 문단의 문맥과 상관없이) 어떠합니다."라는 표현을 쓸 때 주로 쓴다고 볼 수 있다.

## JavaScript에서 lexical

단어 lexical이 프로그래밍, 특히 JavaScript에서 쓰일 때에도 기존 단어의 의미와 연관된다. lexical은 여러 개념에서 혼용되어 사용되어 처음 JavaScript 공부하는 사람을 혼란스럽게 한다. 하나씩 정리를 하면서 글을 써보고자 한다.

### Lexical Scoping과 Dynamic Scoping

lexical scoping은 변수의 유효 범위, scope를 정하는 방식 중 하나다. 변수가 어디에서 작성되었는지에 따라 상위 스코프를 정하는 방식이다. lexical scoping의 반대 개념으로 dynamic scoping이 있다. dynamic scoping은 변수가 담긴 함수를 어디서 호출했는지에 따라 상위 스코프가 정해지는 방식이다.

| Feature     | Lexical Scoping                                            | Dynamic Scoping                                               |
| ----------- | ---------------------------------------------------------- | ------------------------------------------------------------- |
| 특징        | 변수의 유효범위가 해당 변수가 작성된 위치에 따라 정해진다. | 변수의 유효범위가 함수가 어디서 호출되었는지에 따라 정해진다. |
| 스코프 기준 | 소스 코드 기반                                             | 콜 스텍, 실행 컨텍스트 기반                                   |

<details>
  <summary>scope가 아니라 scoping이라고 적는 이유가 있나요?</summary>
scope는 유효 범위, scoping은 유효 범위를 정하는 방식으로 구분하고자 함이다. 여러 블로그를 읽다가 보면 lexical scope라고 작성되어 있는 글이 많은데 틀린 것은 아니다. 다만 block scope, function scope는 "유효 범위"로 설명해도 큰 무리가 없는데, lexical scoping, dynamic scoping은 "유효 범위가 정해지는 방식"에 가깝기 때문에 명사형 보다는 동명사형이 어울린다고 생각하는 편이고 MDN에서도 lexical scoping이라는 표현을 쓰는 것을 참고했다.
</details>

#### Lexical Scoping 예시

먼저 lexical scoping의 예시를 알아보자. 아래 코드를 보면 `cookFn`이 `addIngredient` 본문 밖에서 호출되었음에도 불구하고 본문 내 변수 `ingredient`를 참조하여 `cooked`는 `"김치" + "볶음밥"`이 되었다. 즉, 함수를 어디서 실행하는지와 관계 없이 함수가 작성된 형태에 따라 어떤 `ingredient`를 조회할지 결정된다.

```javascript
const ingredient = "햄";
function addIngredient() {
  const ingredient = "김치";
  const cookFn = function (method) {
    return ingredient + method; // 매개변수 ingredient, "김치"
  };
  return cookFn;
}

const cook = addIngredient();
const cooked = cook("볶음밥"); // '김치볶음밥'
```

아래 예시도 마찬가지로 lexical scoping 방식을 따른다. 이번에는 반대로 `cookFn`을 전역에서 선언했다. 전역에서 선언한 `cookFn`을 `addIngredientAndCook`에서 호출해도 함수가 작성된 곳에서 가장 가까운 스코프에 있는 전역 `ingredient`를 참조해서 `cooked`는 `"햄" + "볶음밥"`이 되었다.

```javascript
const ingredient = "햄";
const cookFn = function (method) {
  return ingredient + method; // 전역 변수 ingredient, "햄"
};

function addIngredientAndCook() {
  const ingredient = "김치";
  return cookFn("볶음밥");
}

const cooked = addIngredientAndCook(); // '햄볶음밥'
```

#### Dynamic Scoping 예시

만약 lexical scoping이 아닌 dynamic scoping 방식이 적용된다면 어떨까? 글쓴이는 JavaScript외에 다른 언어는 능숙한 편이 아니라, 비슷한 예시가 있는지 ChatGPT에게 물어봤다. ChatGPT는 Perl이라는 언어의 예시를 들었다. 언어의 자세한 부분을 몰라도 `print_variable` 함수가 호출된 위치에 따라 다른 변수를 조회하여 출력 결과가 다르게 나온 것을 알 수 있다.

```perl
#!/usr/bin/perl

# 전역 변수 $variable
our $variable = "Global Value";

sub print_variable {
    print "The value of \$variable is: $variable\n";
}

sub dynamic_scope_example {
    # 지역 변수 $variable
    local $variable = "Dynamic Scoped Value";
    print "Inside dynamic_scope_example, ";
    print_variable();
}

print "Outside any block, ";
print_variable(); # 출력 결과: Outside any block, The value of $variable is: Global Value

dynamic_scope_example(); # 출력 결과: Inside dynamic_scope_example, The value of $variable is: Dynamic Scoped Value

print "After dynamic_scope_example, ";
print_variable(); # 출력 결과: After dynamic_scope_example, The value of $variable is: Global Value
```

#### Lexical Scoping에서 Lexical

잠깐 알아봤던 lexical 단어의 의미를 돌아보면 "이 단어의 어휘적인 의미는 (현재 문장, 문단의 문맥과 상관없이) 어떠합니다."로 정리할 수 있었다. JavaScript의 lexical scoping는 소스 코드 그대로 변수 스코프를 정하는 방식이었다. 함수의 호출 방식, 코드의 실행 방식과는 관련이 없었던 것을 볼 수 있다. 즉, lexical **코드가 작성된 그대로 무언가를 정하자는 의미**로 받아들일 수 있다. 여기서 배운 내용을 기반으로 lexical이란 단어가 사용된 다음 개념을 학습해보자.

### Lexical this

`this`는 JavaScript의 뜨거운 감자였다. `this`를 모르고는 JavaScript에 대해서 논하지 말라 - 뭐 그런 이야기도 많이들 했던 것 같다. 과거형인 이유는 적어도 나는 이 `this`에 대해서 크게 고민하고 싶지 않기 때문이다.

글쓴이는 개인적으로 `this`에 대해서만은 강한 의견을 가지고 있는데, 다른 언어에서 `this`가 쓰이는 것 처럼 클래스의 객체를 가르키는 용법 이외로 사용하는 것, 그리고 그 이외의 것에 대해서 애써 가르칠 필요 없다고 주장해왔다. `this`가 불분명하게 코드가 작성된 상황, 그래서 `this`가 뭔지 개발자가 한참 고민을 해야하는 상황 자체가 일어나지 않아야 한다고 생각하는 편이다. [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html#features-this)에서도 `this`에 대해서 비슷한 내용이 작성되어 있으니 참고하면 좋겠다.

아쉽게도, 프론트엔드 개발자로 취업을 준비하는 사람들에게 이 내용을 가르치지 않을 순 없다. 기술 면접에 나오지 않으리란 보장이 없고, 비교적 옛날에 JavaScript로 개발하시던 시니어 분들이 면접관으로 오는 경우가 많기 때문이다. 이 글에서도 짧게 다뤄보도록 하겠다.

`this`는 기본적으로 함수가 호출되는 방식에 따라서 바인딩이 달라진다. 전역에서 호출하면 전역 객체, 객체 내 속성, 즉 메서드로서 호출하면 그 객체, new 생성자로 호출하면 생성된 인스턴스 객체를 가리킨다.

```javascript
function foo() {
  console.log(this);
}

const obj = {
  foo: foo,
};

foo(); // window
obj.foo(); // obj
new foo(); // foo
```

문제는 JavaScript가 원래 OOP를 위해 만들어진 언어가 아니라서 원래 메서드를 의도하고 만들었던 함수를 어디서든 쓸 수 있다는 점이다. 모범생 개발자라면 아래와 같은 코드를 아예 적지 않겠지만, 이렇게 문제가 생길 가능성이 있는 것 만으로도 JavaScript 개발에 많은 혼란을 가져왔던 `this`다.

```javascript
const animal = {
  name: "원숭이",
  getName: function () {
    return this.name;
  },
};

animal.getName(); // '원숭이'
const getGlobalName = animal.getName;
getGlobalName(); // '' (window.name을 참조)

const notAnimal = {};
notAnimal.foo = animal.getName;
notAnimal.foo(); // undefined (notAnimal의 name 속성이 없음)
```

이렇게 함수를 호출하는 방식과 위치에 따라서 this binding이 달라지는 현상을 방지하기 위해 ES6에서 화살표 함수가 탄생했다. 화살표 함수는 함수 호출 방식이나 위치에 따라서 this가 결정되지 않고, lexical하게 this가 결정된다. 화살표 함수는 주로 클래스의 메서드 내에서 사용할 때 유용하다. 예전 React 클래스 컴포넌트를 사용할 때 사용하던 `bind` 패턴 대신에 많이 사용했다.

간단한 input에 onChange 이벤트를 관리하는 컴포넌트 Search를 예시로 들겠다. 아래 예시를 보면 `this.handleInputChange = this.handleInputChange.bind(this)`로 이미 만들어진 메서드가 다른 곳에서 호출이 될 때를 대비해서 this binding을 고정해준다. 화살표 함수를 쓰면 이런 불필요한 테크닉 필요 없이 `this`가 클래스가 생성한 인스턴스 컴포넌트를 바라본다.

```javascript
class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
    };

    // this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  render() {
    return (
      <div className="search-bar form-inline">
        <input
          className="form-control"
          type="text"
          // onChange={this.handleInputChange}
          onChange={e => this.handleInputChange(e)}
        />
      </div>
    );
  }
}
```

바닐라 JavaScript로도 비슷한 예시를 만들 수 있다. 화살표 함수를 사용하면 메서드 본문에서 this를 찾으면 **코드가 작성된 대로** 클래스의 인스턴스다. 메서드에서 화살표 함수를 사용하지 않은 `Animals2`의 경우 this가 클래스의 인스턴스가 아니여서 에러가 난다.

```javascript
const animalList = [
  {
    name: "Charlie",
    species: "Dog",
    age: 3,
  },
  {
    name: "Mittens",
    species: "Cat",
    age: 2,
  },
  {
    name: "Bubbles",
    species: "Fish",
    age: 1,
  },
  {
    name: "Peter",
    species: "Rabbit",
    age: 4,
  },
];

class Animals1 {
  constructor(name) {
    this.label = "동물: ";
    this.list = [];
  }

  add(arr) {
    this.list = arr.map(a => this.label + a.name);
  }
}
const animals1 = new Animals1();
animals1.add(animalList);
animals1.list; // ['동물: Charlie', '동물: Mittens', '동물: Bubbles', '동물: Peter']

class Animals2 {
  constructor(name) {
    this.label = "동물: ";
    this.list = [];
  }

  add(arr) {
    this.list = arr.map(function (a) {
      return this.label + a.name;
    });
  }
}

const animals2 = new Animals2();
animals2.add(animalList); // Uncaught TypeError: Cannot read properties of undefined (reading 'label')
```

정리하자면, `this`가 정해지는 방식은 엄밀히 말하면 dynamic scoping은 아니지만, 비슷하게 호출되는 방식과 위치에 따라서 this binding이 바뀐다. 많은 JavaScript 개발자가 이 고통을 느꼈고 결국 ECMAScript에서 this가 lexical하게, **코드가 작성된 대로** this가 정해지도록 화살표 함수를 만들었다. 이렇게 this가 정해지는 방식을 lexical this라고도 부른다.

## 결론

- lexical의 원래 의미를 초월 해석하면 "이 단어의 어휘적인 의미는 (현재 문장, 문단의 문맥과 상관없이) 어떠합니다."
- JavaScript에서 lexical을 초월 해석하면 "이 변수의 값은 코드가 작성된 대로 (함수 호출 장소나 방식에 상관없이) 정해집니다."

어떤 개념을 이해하는데 해당 개념에 쓴 단어 그 자체의 의미를 잘 알면 이해하기 쉬운 경우가 있다. 물론 웹 개발에서 사용하는 어휘들은 국문이든 영문이든 실생활에서 쓰는 어휘와 문맥이 다른 경우가 더 많다. 하지만 이렇게 lexical처럼 어찌저찌 실사용 문맥과 개발에서의 문맥의 비슷한 경우가 있다면 알고 있으면 장기 기억에 도움이 될 것이다. 조금이나마 JavaScript의 괴상한 부분을 이해하는데 도움이 되었기를 바란다.
