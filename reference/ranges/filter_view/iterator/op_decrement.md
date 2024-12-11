# operator--
* ranges[meta header]
* std::ranges[meta namespace]
* filter_view::iterator[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr iterator& operator++() requires bidirectional_range<V>;      // (1)
constexpr iterator operator--(int) requires bidirectional_range<V>;    // (2)
```

## 概要

イテレータを1つ進める。

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

(3)は、
```cpp
auto tmp = *this;
--*this;
return tmp;
```

と等しい。

## 例
```cpp example
#include <ranges>
#include <vector>

int main() {
  using std::ranges::filter_view;
  using std::ranges::iterator_t;

  std::vector<int> vec = {0, 1, 2, 3, 4, 5};

  filter_view fv{vec, [](int x){ return x % 2 == 0; }};

  iterator_t<filter_view> i(fv, vec.begin());

  std::cout << *i << `\n`;
  i--;
  std::cout << *i << `\n`;
  i--;
  std::cout << *i << `\n`;
}
```

### 出力
```
0
2
4
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
