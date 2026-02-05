# reverse
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <bidirectional_iterator I,
            sentinel_for<I> S>
    requires permutable<I>
  constexpr I
    reverse(I first,
            S last); // (1) C++20

  template <bidirectional_range R>
    requires permutable<iterator_t<R>>
  constexpr borrowed_iterator_t<R>
    reverse(R&& r);  // (2) C++20

  template <execution-policy Ep,
            random_access_iterator I,
            sized_sentinel_for<I> S>
    requires permutable<I>
  I reverse(Ep&& exec,
            I first,
            S last); // (3) C++26

  template <execution-policy Ep,
            sized-random-access-range R>
    requires permutable<iterator_t<R>>
  borrowed_iterator_t<R>
    reverse(Ep&& exec,
            R&& r);  // (4) C++26
}
```
* permutable[link /reference/iterator/permutable.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]
* execution-policy[link /reference/execution/execution-policy.md]
* random_access_iterator[link /reference/iterator/random_access_iterator.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* sized-random-access-range[link /reference/ranges/sized-random-access-range.md]

## 概要
要素の並びを逆にする。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する
- (3): (1)の並列アルゴリズム版。実行ポリシーを指定する
- (4): (2)の並列アルゴリズム版。実行ポリシーを指定する


## 効果
0 以上 `(last - first) / 2` 未満の整数 `i` について、[`iter_swap`](iter_swap.md)`(first + i, (last - i) - 1)` を行う


## 戻り値
`last`


## 計算量
正確に `(last - first) / 2` 回 swap する


## 例
### 基本的な使い方
```cpp example
#include <algorithm>
#include <iostream>
#include <string>

int main() {
  std::string str = "reverse";

  std::ranges::reverse(str);
  std::cout << str << std::endl;
}
```
* std::ranges::reverse[color ff0000]

### 出力
```
esrever
```


### 並列アルゴリズムの例 (C++26)
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>
#include <execution>

int main()
{
  std::vector<int> v = {1, 2, 3, 4, 5};

  // 並列に要素の並びを逆にする
  std::ranges::reverse(std::execution::par, v);

  for (int i : v) {
    std::cout << i << ' ';
  }
  std::cout << std::endl;
}
```
* std::ranges::reverse[color ff0000]

#### 出力
```
5 4 3 2 1
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
