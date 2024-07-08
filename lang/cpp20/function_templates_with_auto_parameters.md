# autoパラメータによる関数テンプレートの簡易定義
* cpp20[meta cpp]

<-- start lang caution -->

このページはC++20に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative_page)を参照してください。

<-- last lang caution -->

## 概要
C++14で導入された[ジェネリックラムダ](/lang/cpp14/generic_lambdas.md)と同様に、通常の関数もパラメータ型を`auto`にすることで、簡易的に関数テンプレートを定義できるようにする。

パラメータ型を`auto`としたそれぞれのパラメータに対して、個別にテンプレートパラメータが割り振られる。

制限としては、以下のようなものがある：

- パラメータ型に`decltype(auto)`は使用できない
- `std::vector<auto>`のように型の一部を`auto`にはできない

`auto`で定義した変数の型をとりたい場合は、`decltype`を使用する。

## 例
```cpp example
#include <iostream>

auto f(auto a, auto b) { return a + b; }

// 以下と同じ意味になる：
// template <class T, class U>
// auto f(T a, U b) { return a + b; }

int main()
{
  // パラメータaとbの型はint
  std::cout << f(1, 2) << std::endl;

  // パラメータaとbの型はdouble
  std::cout << f(0.1, 0.2) << std::endl;
}
```

### 出力
```
3
0.3
```

## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++14 ジェネリックラムダ](/lang/cpp14/generic_lambdas.md)
- [C++20 コンセプト](concepts.md)


## 参照
- [P1141R2 Yet another approach for constrained declarations](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1141r2.html)