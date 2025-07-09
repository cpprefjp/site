# replace_if
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <input_iterator I,
            sentinel_for<I> S,
            class T,
            class Proj = identity,
            indirect_unary_predicate<projected<I, Proj>> Pred>
    requires indirectly_writable<I, const T&>
  constexpr I
    replace_if(I first,
               S last,
               Pred pred,
               const T& new_value,
               Proj proj = {}); // (1) C++20

  template <input_range R,
            class T,
            class Proj = identity,
            indirect_unary_predicate<projected<iterator_t<R>, Proj>> Pred>
    requires indirectly_writable<iterator_t<R>, const T&>
  constexpr borrowed_iterator_t<R>
    replace_if(R&& r,
               Pred pred,
               const T& new_value,
               Proj proj = {}); // (2) C++20
}
```
* indirectly_writable[link /reference/iterator/indirectly_writable.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]

## 概要
条件を満たす要素を指定された値に置き換える。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する


## 効果
`[first,last)` 内のイテレータ `i` について、`pred(*i) != false` であるものは `*i = new_value` という式によってに置き換えられる。


## 戻り値
`last`


## 計算量
正確に `last - first` 回の述語の適用を行う。


## 備考
- (1), (2) :
    - C++26 : 引数として波カッコ初期化`{}`を受け付ける
        ```cpp
        std::vector<T> v;
        std::ranges::replace_if(v, pred, {a, b});
        ```



## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
  std::vector<int> v = { 3,1,2,1,2 };

  // 奇数の要素を全部 10 に置き換える
  std::ranges::replace_if(v, [](int x) { return x % 2 != 0; }, 10);

  for (int x : v) {
    std::cout << x << ",";
  }
}
```
* std::ranges::replace_if[color ff0000]

### 出力
```
10,10,2,10,2,
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
