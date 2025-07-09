# operator==
* tuple[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template<class... TTypes, class... UTypes>
  bool operator==(const tuple<TTypes...>& t,
                  const tuple<UTypes...>& u);           // (1) C++11

  template<class... TTypes, class... UTypes>
  constexpr bool operator==(const tuple<TTypes...>& t,
                            const tuple<UTypes...>& u); // (1) C++14

  template<class... TTypes, tuple-like UTuple>
  constexpr bool operator==(const tuple<TTypes...>& t,
                            const UTuple& u);           // (2) C++23
}
```
* tuple-like[link ../tuple-like.md]

## 概要
2つの[`tuple`](../tuple.md)オブジェクトの等値比較を行う。また、[`tuple-like`](../tuple-like.md)なオブジェクトとの等値比較を行う。（C++23以降）


## テンプレートパラメータ制約
- (1) : 
    - 2つの[`tuple`](../tuple.md)オブジェクトの要素数が同じであること。（具体的には`sizeof...(TTypes) == sizeof...(UTypes)`であること。）
    - [`tuple`](../tuple.md)の要素`std::`[`get`](get.md)`<i>(t)`と`std::`[`get`](get.md)`<i>(u)`において、すべての要素の比較 `std::`[`get`](get.md)`<i>(t) == std::`[`get`](get.md)`<i>(u)` の比較結果が`bool`に変換可能な型（C++23 以降は[`boolean-testable`](/reference/concepts/boolean-testable.md)を満たせばよい）であること。
- (2) :
    - C++23 : 2つの[`tuple-like`](../tuple-like.md)なオブジェクトの要素数が同じであること。（正確には、`sizeof...(TTypes) ==` [`tuple_size_v`](../tuple_size.md)`<UTuple>`であること。）
    - C++23 : [`tuple`](../tuple.md)の要素`std::`[`get`](get.md)`<i>(t)`と[`tuple-like`](../tuple-like.md)なオブジェクトの要素`std::get<i>(u)`において、すべての要素の比較 `std::`[`get`](get.md)`<i>(t) == std::`[`get`](get.md)`<i>(u)` の比較結果が[`boolean-testable`](/reference/concepts/boolean-testable.md)を満たす型（`bool`へ変換可能な型）であること。


## 効果
0番目の要素から順に等値比較を行う。


## 戻り値
[`tuple`](../tuple.md)の全ての要素を`std::`[`get`](get.md)`<i>(t) == std::`[`get`](get.md)`<i>(u)`した結果が`true`である場合`true`を返し、そうでなければ`false`を返す。


## 備考
- この演算子により、以下の演算子が使用可能になる (C++20)：
    - `operator!=`


## 例
```cpp example
#include <iostream>
#include <tuple>
#include <string>

int main()
{
  std::tuple<int, char, const char*> t1(1, 'a', "hello");
  std::tuple<int, char, std::string> t2(1, 'a', "hello");
  std::tuple<int, char, std::string> t3(1, 'a', "hellot");

  std::cout << std::boolalpha;
  {
    bool result = t1 == t2; // ※型は異なっていてもかまわない
    std::cout << result << std::endl;
  }
  {
    bool result = t1 == t3;
    std::cout << result << std::endl;
  }
}
```

### 出力
```
true
false
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.6.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [N3471 Constexpr Library Additions: utilities, v3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3471.html)
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
- [P2165R4 Compatibility between `tuple`, `pair` and *tuple-like* objects](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2165r4.pdf)
- [P2944R3 Comparisons for `reference_wrapper`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2944r3.html)
    - C++26でテンプレートパラメータ制約が整理された
