# generate_n
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <input_or_output_iterator O,
            copy_constructible F>
    requires invocable<F&> && indirectly_writable<O, invoke_result_t<F&>>
  constexpr O
    generate_n(O first,
               iter_difference_t<O> n,
               F gen);                  // (1) C++20
}
```
* input_or_output_iterator[link /reference/iterator/input_or_output_iterator.md]
* indirectly_writable[link /reference/iterator/indirectly_writable.md]


## 概要
出力の範囲へ関数の結果を `n` 個書き込む。

- (1): イテレータ範囲を指定する


## 効果
`n` が 1 以上の場合、`[first,first + n)` のそれぞれのイテレータについて関数オブジェクト `gen` を呼び出し、その戻り値を代入する。

そうでない場合、何もしない。


## 戻り値
`n` が 1 以上の場合、`first + n` が返される。  
そうでない場合、`first` が返される。


## 計算量
`n` が 1 以上の場合、`n` 回の `gen` の呼び出しと代入が行われる。

そうでない場合、何もしない。


## 例
### 基本的な使い方
```cpp example
#include <algorithm>
#include <iostream>
#include <iterator>

int main() {
  // 2 の累乗の値を生成して出力する
  int n = 1;
  std::ranges::generate_n(std::ostream_iterator<int>(std::cout, ","), 10, [&n]{ auto t = n; n *= 2; return t; });
}
```
* std::ranges::generate_n[color ff0000]

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
- [P3179R9 C++ parallel range algorithms](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3179r9.html)
    - C++26で`ranges::generate_n`の並列アルゴリズム版が追加された
- [LWG Issue 4492. `std::generate` and `std::ranges::generate` wording is unclear for parallel algorithms](https://cplusplus.github.io/LWG/issue4492)
    - 並列実行時の「successive（連続した）」評価という意味付けが不明確であるため、P3179R9で追加された`ranges::generate_n`の並列アルゴリズム版はC++26で削除された（C++29での再検討が予定されている）
