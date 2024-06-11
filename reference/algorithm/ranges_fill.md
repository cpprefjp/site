# fill
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <class T,
            output_iterator<const T&> O,
            sentinel_for<O> S>
  constexpr O
    fill(O first, S last, const T& value); // (1) C++20

  template <class T,
            output_range<const T&> R>
  constexpr borrowed_iterator_t<R>
    fill(R&& r, const T& value);           // (2) C++20

}
```
* output_iterator[link /reference/iterator/output_iterator.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* output_range[link /reference/ranges/output_range.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]

## 概要
指定された値で出力の範囲に書き込む。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する


## 効果
`[first,last)` 内の全ての要素に `value` を代入する


## 戻り値
`last`


## 計算量
正確に `last - first` 回の代入を行う


## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
  std::vector<int> v(5);

  // v を 3 の値で埋める
  std::ranges::fill(v, 3);

  for (int x : v) {
    std::cout << x << ",";
  }
}
```
* std::ranges::fill[color ff0000]

### 出力
```
3,3,3,3,3,
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
