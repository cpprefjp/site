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
             F gen); // (1) C++20

  template <class R,
            copy_constructible F>
    requires invocable<F&> && output_range<R, invoke_result_t<F&>>
  constexpr borrowed_iterator_t<R>
    generate(R&& r,
             F gen); // (2) C++20
}
```
* input_or_output_iterator[link /reference/iterator/input_or_output_iterator.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* copy_constructible[link /reference/concepts/copy_constructible.md]
* invocable[link /reference/concepts/invocable.md]
* indirectly_writable[link /reference/iterator/indirectly_writable.md]
* invoke_result_t[link /reference/type_traits/invoke_result.md]
* iterator_t[link /reference/ranges/iterator_t.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]

## 概要
出力の範囲へ関数の結果を書き込む。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する


## 効果
`[first,last)` のそれぞれのイテレータについて関数オブジェクト `gen` を呼び出し、その戻り値を代入する。


## 戻り値
`last`


## 計算量
正確に `last - first` 回の `gen` の呼び出しと代入が行われる。


## 例
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
