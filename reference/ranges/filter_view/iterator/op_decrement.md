# operator--
* ranges[meta header]
* std::ranges[meta namespace]
* filter_view::iterator[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr iterator& operator--() requires bidirectional_range<V>;      // (1) C++20

constexpr iterator operator--(int) requires bidirectional_range<V>;    // (2) C++20
iterator operator--(int) = default;                                    // (2) C++29
```

## 概要

イテレータを1つ後方に進める。

## 効果

(1)は、

```cpp
do
  --current_;
while (!invoke(*parent_->pred_, *current_));
return *this;
```
* invoke[link /reference/functional/invoke.md]

と等しい。

(2)は、
```cpp
auto tmp = *this;
--*this;
return tmp;
```

と等しい。

## 備考
- (2) : C++29で、[後置インクリメント・デクリメント演算のdefault定義](/lang/cpp29/defaulting_postfix_increment_and_decrement_operations.md)を使用した`= default`定義へ規定が変更された。動作は変わらない（`= default`定義の後置`--`は、前置`--`が使用できる場合にのみ使用できるため、制約の明示も不要になった）

## 例
```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  using std::ranges::filter_view;
  using std::ranges::iterator_t;

  std::vector<int> vec = {0, 1, 2, 3, 4, 5};

  filter_view fv{vec, [](int x){ return x % 2 == 0; }};

  iterator_t<decltype(fv)> i(fv, vec.begin());
  std::advance(i, 2);

  std::cout << *i << '\n';
  i--;
  std::cout << *i << '\n';
  i--;
  std::cout << *i << '\n';
}
```

### 出力
```
4
2
0
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
- [N4861 24.7.4 Filter view](https://timsong-cpp.github.io/cppwp/n4861/range.filter)
- [N4950 26.7.8 Filter view](https://timsong-cpp.github.io/cppwp/n4950/range.filter)
- [P3785R1 Library Wording Changes for Defaulted Postfix Increment and Decrement Operations](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3785r1.html)
    - C++29で、後置演算子の規定が`= default`定義へ書き換えられた
