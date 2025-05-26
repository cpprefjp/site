# fill_n
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <class T,
            output_iterator<const T&> O>
  constexpr O
    fill_n(O first,
           iter_difference_t<O> n,
           const T& value);   // (1) C++20
  template <class O,
            class T = iter_value_t<O>>
    requires output_iterator<O, const T&>
  constexpr O
    fill_n(O first,
           iter_difference_t<O> n,
           const T& value);   // (1) C++26
}
```
* output_iterator[link /reference/iterator/output_iterator.md]
* iter_difference_t[link /reference/iterator/iter_difference_t.md]

## 概要
指定された値で出力の範囲に `n` 個を書き込む。


## 効果
`n` が 1 以上の場合は `[first,first + n)` 内の全ての要素に `value` を代入し、そうでない場合は何もしない。


## 戻り値
`n` が 1 以上の場合は `first + n`、そうでない場合は `first` を返す。


## 計算量
`n` が 1 以上の場合は `n` 回、そうでない場合は 0 回の代入を行う。


## 備考
- (1) :
    - C++26 : `value`パラメータとして波カッコ初期化`{}`を受け付ける
        ```cpp
        std::vector<T> v;
        std::ranges::fill_n(v.begin(), n, {a, b});
        ```


## 例
### 基本的な使い方
```cpp example
#include <algorithm>
#include <iostream>
#include <iterator>

int main() {
  // 値3を10個出力する
  std::ranges::fill_n(std::ostream_iterator<int>(std::cout, ","), 10, 3);
}
```
* std::ranges::fill_n[color ff0000]

#### 出力
```
3,3,3,3,3,3,3,3,3,3,
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

  // 先頭3個の要素を値{1, 2}で埋める
  std::ranges::fill_n(v.begin(), 3, {1, 2});

  for (const Point& p : v) {
    std::cout << p.x << "," << p.y << std::endl;
  }
}
```
* std::ranges::fill_n[color ff0000]

#### 出力
```
1,2
1,2
1,2
0,0
0,0
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
