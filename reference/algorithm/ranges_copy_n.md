# copy_n
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]


```cpp
namespace std::ranges {
  template <input_iterator I,
            weakly_incrementable O>
    requires indirectly_copyable<I, O>
  constexpr copy_n_result<I, O>
    copy_n(I first,
           iter_difference_t<I> n,
           O result);                // (1) C++20

  template <execution-policy Ep,
            random_access_iterator I,
            random_access_iterator O,
            sized_sentinel_for<O> OutS>
    requires indirectly_copyable<I, O>
  copy_n_result<I, O>
    copy_n(Ep&& exec,
           I first,
           iter_difference_t<I> n,
           O result,
           OutS result_last);        // (2) C++26
}
```
* copy_n_result[link ranges_in_out_result.md]
* weakly_incrementable[link /reference/iterator/weakly_incrementable.md]
* indirectly_copyable[link /reference/iterator/indirectly_copyable.md]
* execution-policy[link /reference/execution/execution-policy.md]
* random_access_iterator[link /reference/iterator/random_access_iterator.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]

## 概要
指定された数の要素をコピーする。

- (1): イテレータ範囲を指定する
- (2): (1)の並列アルゴリズム版。実行ポリシーを指定し、出力範囲の終端も指定する


## 効果
0 以上 `n` 未満であるそれぞれの `i` について、`*(result + i) = *(first + i)` を行う。


## 戻り値
```cpp
copy_n_result {
  .in  = first + n,
  .out = result + n,
}
```
* copy_n_result[link ranges_in_out_result.md]


## 計算量
正確に `n` 回代入が行われる。


## 例
### 基本的な使い方
```cpp example
#include <algorithm>
#include <iostream>
#include <iterator>
#include <vector>

int main() {
  std::vector<int> v = { 3, 1, 5, 2, 4 };
  std::ranges::copy_n(v.begin(), 5, std::ostream_iterator<int>(std::cout, "\n"));
}
```
* std::ranges::copy_n[color ff0000]

### 出力
```
3
1
5
2
4
```

### 並列アルゴリズムの例 (C++26)
```cpp example
#include <algorithm>
#include <execution>
#include <iostream>
#include <vector>

int main() {
  std::vector<int> src = {1, 2, 3, 4, 5};
  std::vector<int> dst(5);

  // 並列に先頭3要素をコピー
  std::ranges::copy_n(std::execution::par, src.begin(), 3,
                      dst.begin(), dst.begin() + 3);

  for (int x : dst) {
    std::cout << x << ' ';
  }
  std::cout << std::endl;
}
```
* std::ranges::copy_n[color ff0000]

#### 出力
```
1 2 3 0 0
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
- [P3179R9 C++ parallel range algorithms](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3179r9.html)
