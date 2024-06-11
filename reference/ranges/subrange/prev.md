# prev
* ranges[meta header]
* std::ranges[meta namespace]
* subrange[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
[[nodiscard]] constexpr subrange prev(iter_difference_t<I> n = 1) const
  requires bidirectional_iterator<I>;
```
* nodiscard[link /lang/cpp17/nodiscard.md]
* iter_difference_t[link /reference/iterator/iter_difference_t.md]
* bidirectional_iterator[link /reference/iterator/bidirectional_iterator.md]
* subrange[link ../subrange.md]

## 概要
先頭を後退させた`subrange`を得る。

## 効果

```cpp
auto tmp = *this;
tmp.advance(-n);
return tmp;
```
* advance[link advance.md]

## 例
```cpp example
#include <ranges>
#include <iostream>

template<std::ranges::range R>
void print(const R& r) {
  for (int x : r) {
    std::cout << x << ',';
  }
  std::cout << '\n';
}

int main()
{
  constexpr int a[] = {1, 2, 3, 4, 5};
  std::ranges::subrange sub(a + 3, a + 4);

  print(sub);
  print(sub.prev());
  print(sub.prev().prev());
}
```

### 出力
```
4,
3,4,
2,3,4,
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
