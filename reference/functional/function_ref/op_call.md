# operator()
* functional[meta header]
* std[meta namespace]
* function_ref[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
R operator()(ArgTypes... args) const noexcept(/*noex*/);
```

## 概要
関数を呼び出す。

`operator()`のnoexcept例外指定 *noex* は、[`function_ref`](../function_ref.md)に指定するテンプレートパラメータ`R(ArgTypes...)`部のものと等しい。


## 効果
以下と等価。参照対象に応じた詳細仕様は[コンストラクタ](op_constructor.md)説明を参照のこと。

```cpp
return thunk-ptr(bound-entity, std::forward<ArgTypes>(args)...);
```
* thunk-ptr[italic]
* bound-entity[italic]


## 戻り値
`R`型が`void`の場合は何も返さない。そうでなければ、関数呼び出しの戻り値を返す。


## 例
```cpp example
#include <iostream>
#include <functional>

int ident(int x)
{ return x; }

int main()
{
  std::function_ref<int(int)> f = ident;

  // 関数呼び出し : 参照しているident()関数を呼び出す
  int result = f(1);

  std::cout << result << std::endl;
}
```

### 出力
```
1
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0792R14 `function_ref`: a type-erased callable reference](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p0792r14.html)
