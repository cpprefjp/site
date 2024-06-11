# empty
* ranges[meta header]
* std::ranges[meta namespace]
* subrange[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr bool empty() const;
```

## 概要
`subrange`が空かどうかを判定する。

## 効果
`return begin_ == end_;`

ただし、`begin_`、`end_`は`subrange`が内部で保持するイテレータと番兵。

## 例
```cpp example
#include <ranges>
#include <iostream>

int main()
{
  constexpr int a[] = {1, 2, 3};
  const std::ranges::subrange sub1(a);
  const std::ranges::subrange sub2(a, a);

  std::cout << sub1.empty() << '\n';
  std::cout << sub2.empty() << '\n';
}
```

### 出力
```
0
1
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
