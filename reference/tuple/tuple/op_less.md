# operator<
* tuple[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  // operator<=>により、以下の演算子が使用可能になる (C++20)
  template<class... TTypes, class... UTypes>
  bool operator<(const tuple<TTypes...>& t,
                 const tuple<UTypes...>& u); // (1) C++11

  template<class... TTypes, class... UTypes>
  bool operator<(const tuple<TTypes...>& t,
                 const tuple<UTypes...>& u); // (1) C++14
}
```

## 概要
2つの`tuple`において、左辺が右辺より小さいかの比較を行う。


## 要件
- 2つの`tuple`の要素数が同じであること。
- `tuple`の要素`std::`[`get`](get.md)`<i>(t)`と`std::`[`get`](get.md)`<i>(u)`において、すべての要素の比較 `std::`[`get`](get.md)`<i>(t) < std::`[`get`](get.md)`<i>(u)` および `std::`[`get`](get.md)`<i>(u) < std::`[`get`](get.md)`<i>(t)` の比較結果が`bool`に変換可能な型であること。


## 戻り値
2つの`tuple`オブジェクト、`t`と`u`の辞書順比較を行った結果を返す。定義は以下のようになる：

```cpp
(bool)(get<0>(t) < get<0>(u)) || (!(bool)(get<0>(u) < get<0>(t)) && t_tail < u_tail)
```
* get[link get.md]

ただし、`r_tail`は、ある`tuple`オブジェクト`r`の最初の要素以外の全ての要素を含む`tuple`オブジェクトを表す。

2つの`tuple`オブジェクトの要素数が0である場合は、`false`を返す。


## 例
```cpp example
#include <iostream>
#include <tuple>
#include <string>

int main()
{
  std::tuple<int, char, std::string> t1(1, 'a', "hello");
  std::tuple<int, char, std::string> t2(2, 'b', "world");

  std::cout << std::boolalpha;
  {
    bool result = t1 < t2;
    std::cout << result << std::endl;
  }
  {
    bool result = t2 < t1;
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


## 関連項目
- [`lexicographical_compare`](/reference/algorithm/lexicographical_compare.md)


## 参照
- [N3471 Constexpr Library Additions: utilities, v3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3471.html)
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
