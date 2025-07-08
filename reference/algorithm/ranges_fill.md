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
  template <class I,
            sentinel_for<O> S,
            class T = iter_value_t<O>>
    requires output_iterator<O, const T&>
  constexpr O
    fill(O first, S last, const T& value); // (1) C++26

  template <class T,
            output_range<const T&> R>
  constexpr borrowed_iterator_t<R>
    fill(R&& r, const T& value);           // (2) C++20
  template <class R,
            class T = range_value_t<R>>
    requires output_range<R, const T&>
  constexpr borrowed_iterator_t<R>
    fill(R&& r, const T& value);           // (2) C++26
}
```
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


## 備考
- (1), (2) :
    - C++26 : 引数として波カッコ初期化`{}`を受け付ける
        ```cpp
        std::vector<T> v;
        std::ranges::fill(v, {a, b});
        ```


## 例
### 基本的な使い方
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

#### 出力
```
3,3,3,3,3,
```

### 波カッコ初期化を入力として使用する (C++26)
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>

struct Point {
  int x;
  int y;

  bool operator==(const Point& other) const = default;
};

int main() {
  std::vector<Point> v(5);

  std::ranges::fill(v.begin(), v.end(), {1, 2});

  for (const Point& p : v) {
    std::cout << p.x << "," << p.y << std::endl;
  }
}
```
* std::ranges::fill[color ff0000]

#### 出力
```
1,2
1,2
1,2
1,2
1,2
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
- [P2248R8 Enabling list-initialization for algorithms](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2248r8.html)
    - C++26で波カッコ初期化 (リスト初期化) に対応した
