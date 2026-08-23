# disable_sized_range
* ranges[meta header]
* std::ranges[meta namespace]
* variable[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<class>
  inline constexpr bool disable_sized_range = false;
}
```

## 概要

`disable_sized_range`は、[`sized_range`](sized_range.md)を無効化するカスタマイゼーションポイントである。

[`sized_range`](sized_range.md)コンセプトの構文要件を満たすが意味論要件を満たさないような型`T`があるとき、`disable_sized_range<T>`が`true`となるように特殊化することで[`ranges::size`](size.md)の引数にできないようにして、[`sized_range`](sized_range.md)を無効化する。

具体的には、大きさを求めることはできるが、その計算量が償却定数にならないようなRangeが該当する。

## 要件

- cv修飾のないプログラム定義型に対して、この変数テンプレートを特殊化することが許可される。  
    - そのような特殊化は定数式で使用可能であり、`const bool`型を持つ必要がある。


## 例
```cpp example
#include <ranges>
#include <iostream>
#include <forward_list>
#include <iterator>
#include <cstddef>

// std::forward_listをラップしたRange。
// size()メンバを持つが、要素を数えるため計算量は要素数に比例する（償却定数ではない）
struct MyRange {
  std::forward_list<int> data;

  auto begin() { return data.begin(); }
  auto end()   { return data.end(); }

  std::size_t size() const {
    return static_cast<std::size_t>(std::distance(data.begin(), data.end()));
  }
};

// size()の計算量が償却定数でないため、sized_rangeから除外する
template <>
inline constexpr bool std::ranges::disable_sized_range<MyRange> = true;

int main()
{
  // disable_sized_rangeをtrueに特殊化したため、
  // size()メンバを持っていてもsized_rangeのモデルにはならない
  static_assert(!std::ranges::sized_range<MyRange>);

  // rangeとしては使える
  MyRange r{{1, 2, 3}};
  for (int x : r) {
    std::cout << x;
  }
  std::cout << std::endl;
}
```
* std::ranges::disable_sized_range[color ff0000]
* std::ranges::sized_range[link sized_range.md]
* std::distance[link /reference/iterator/distance.md]

### 出力
```
123
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
- [LWG Issue 3183. Normative permission to specialize Ranges variable templates](https://cplusplus.github.io/LWG/issue3183)
    - C++20で、プログラム定義型に対してこの変数テンプレートを特殊化してよいという規範的な許可が明記された
