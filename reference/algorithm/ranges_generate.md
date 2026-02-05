# generate
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <input_or_output_iterator O,
            sentinel_for<O> S,
            copy_constructible F>
    requires invocable<F&> && indirectly_writable<O, invoke_result_t<F&>>
  constexpr O
    generate(O first,
             S last,
             F gen);                  // (1) C++20

  template <class R,
            copy_constructible F>
    requires invocable<F&> && output_range<R, invoke_result_t<F&>>
  constexpr borrowed_iterator_t<R>
    generate(R&& r,
             F gen);                  // (2) C++20

  template <execution-policy Ep,
            random_access_iterator O,
            sized_sentinel_for<O> S,
            copy_constructible F>
    requires invocable<F&> && indirectly_writable<O, invoke_result_t<F&>>
  O generate(Ep&& exec,
             O first,
             S last,
             F gen);                  // (3) C++26

  template <execution-policy Ep,
            sized-random-access-range R,
            copy_constructible F>
    requires invocable<F&> && indirectly_writable<iterator_t<R>, invoke_result_t<F&>>
  borrowed_iterator_t<R>
    generate(Ep&& exec,
             R&& r,
             F gen);                  // (4) C++26
}
```
* input_or_output_iterator[link /reference/iterator/input_or_output_iterator.md]
* indirectly_writable[link /reference/iterator/indirectly_writable.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]
* execution-policy[link /reference/execution/execution-policy.md]
* random_access_iterator[link /reference/iterator/random_access_iterator.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* sized-random-access-range[link /reference/ranges/sized-random-access-range.md]

## 概要
出力の範囲へ関数の結果を書き込む。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する
- (3): (1)の並列アルゴリズム版。実行ポリシーを指定する
- (4): (2)の並列アルゴリズム版。実行ポリシーを指定する


## 効果
`[first,last)` のそれぞれのイテレータについて関数オブジェクト `gen` を呼び出し、その戻り値を代入する。


## 戻り値
`last`


## 計算量
正確に `last - first` 回の `gen` の呼び出しと代入が行われる。


## 例
### 基本的な使い方
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
  std::vector<int> v(10);

  // 2 の累乗の値を生成する
  int n = 1;
  std::ranges::generate(v, [&n]() { auto t = n; n *= 2; return t; });

  for (int x : v ) {
    std::cout << x << ",";
  }
}
```
* std::ranges::generate[color ff0000]

### 出力
```
1,2,4,8,16,32,64,128,256,512,
```

### 並列アルゴリズムの例 (C++26)
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>
#include <execution>

int main() {
  std::vector<int> v(10);

  // 並列に全要素を99で埋める
  std::ranges::generate(std::execution::par, v, [] { return 99; });

  for (int x : v) {
    std::cout << x << ' ';
  }
  std::cout << std::endl;
}
```
* std::ranges::generate[color ff0000]

#### 出力
```
99 99 99 99 99 99 99 99 99 99
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
