# clamp
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <class T,
            class Proj = identity,
            indirect_strict_weak_order<projected<const T*, Proj>> Comp = ranges::less>
  constexpr const T&
    clamp(const T& v, const T& lo, const T& hi, Comp comp = {}, Proj proj = {}); // (1) C++20
}
```
* indirect_strict_weak_order[link /reference/iterator/indirect_strict_weak_order.md]
* ranges::less[link /reference/functional/ranges_less.md]

## 概要
値を範囲内に収める。

この関数は、`v`の値を範囲`[low, high]`に収める。

## 事前条件
- `low`の値は`high`の値より大きくなってはならない

## 戻り値
- `v`の値が`low`より小さければ`low`を返す
- `v`の値が`high`より大きければ`high`を返す
- そうでなければ`v`を返す

## 例
```cpp example
#include <iostream>
#include <algorithm>

int main()
{
  for (int i = 0; i < 10; ++i) {
    // iの値を範囲[2, 7]に収める
    int result = std::ranges::clamp(i, 2, 7);
    std::cout << i << " : " << result << std::endl;
  }
}
```
* std::ranges::clamp[color ff0000]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]

### 出力
```
0 : 2
1 : 2
2 : 2
3 : 3
4 : 4
5 : 5
6 : 6
7 : 7
8 : 7
9 : 7
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 参照
- [N4861 25 Algorithms library](https://timsong-cpp.github.io/cppwp/n4861/algorithms)
