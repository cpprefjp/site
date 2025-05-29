# iter_swap
* ranges[meta header]
* std::ranges[meta namespace]
* filter_view::iterator[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
friend constexpr void
  iter_swap(const iterator& x, const iterator& y)
    noexcept(noexcept(ranges::iter_swap(x.current_, y.current_)))
    requires indirectly_swappable<iterator_t<V>>; // (1) C++20
```

## 概要
イテレータの要素を交換する。


## 効果
以下と等価：

```cpp
return ranges::iter_swap(x.current_, y.current_);
```


## 例
```cpp example
#include <vector>
#include <iostream>
#include <ranges>

int main() {
  std::vector<int> v = {1, 2, 3, 4, 5, 6};
  auto is_even = [](int x) { return x % 2 == 0; };
  std::ranges::filter_view fv{v, is_even};

  auto it1 = fv.begin();            // v[1] を指す
  auto it2 = std::next(fv.begin()); // v[3] を指す

  std::cout << v[1] << ", " << v[3] << std::endl; // 2, 4
  iter_swap(it1, it2);
  std::cout << v[1] << ", " << v[3] << std::endl; // 4, 2
}
```
* iter_swap[color ff0000]

### 出力

```
2, 4
4, 2
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]
