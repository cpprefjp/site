# next
* iterator[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<input_or_output_iterator I>
  constexpr I next(I x);                                    // (1)

  template<input_or_output_iterator I>
  constexpr I next(I x, iter_difference_t<I> n);            // (2)

  template<input_or_output_iterator I, sentinel_for<I> S>
  constexpr I next(I x, S bound);                           // (3)

  template<input_or_output_iterator I, sentinel_for<I> S>
  constexpr I next(I x, iter_difference_t<I> n, S bound);   // (4)
}
```
* input_or_output_iterator[link /reference/iterator/input_or_output_iterator.md]
* iter_difference_t[link /reference/iterator/iter_difference_t.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]

## 概要

`n`回あるいは指定された位置まで前方に進めたイテレータを返す。

[`ranges::advance()`](/reference/iterator/ranges_advance.md)と違い、引数として渡されたイテレータへの参照を書き換えるのではなく、`n`回進んだイテレータのコピーを返す。

## 引数

- `x` -- 進行の出発位置を示すイテレータ
- `n` -- 進める距離
- `bound` -- 進行の目的地となる位置を示すイテレータ（あるいは番兵）

## 効果

- (1) : 以下と等価
    ```cpp
    ++x;
    return x;
    ```

- (2) :  以下と等価
    ```cpp
    ranges::advance(x, n);
    return x;
    ```
    * ranges::advance[link /reference/iterator/ranges_advance.md]

- (3) : 以下と等価
    ```cpp
    ranges::advance(x, bound);
    return x;
    ```
    * ranges::advance[link /reference/iterator/ranges_advance.md]

- (4) : 以下と等価
    ```cpp
    ranges::advance(x, n, bound);
    return x;
    ```
    * ranges::advance[link /reference/iterator/ranges_advance.md]

## 戻り値

- (1) : `x`を1進めたイテレータのコピーを返す
- (2) : `x`を`n`進めたイテレータのコピーを返す
- (3) : `x`を`bound`まで進めたイテレータのコピーを返す
- (4) : `x`を`bound`以内で`n`進めたイテレータのコピーを返す

## 備考

この関数テンプレートは通常の名前探索で発見されている場合にADLを無効化する。詳しくは「[ADLを無効にする関数定義](/article/lib/disable_adl_function.md)」を参照のこと。

## 例
```cpp example
#include <iostream>
#include <iterator>
#include <vector>

int main() {
  std::vector<int> vec = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
  
  auto it = std::begin(vec);
  
  // (1)、1つ進める
  auto pos2 = std::ranges::next(it);
  std::cout << *pos2 << std::endl;
  
  // (2)、3進める
  auto pos4 = std::ranges::next(it, 3);
  std::cout << *pos4 << std::endl;

  // (2)、-3進める
  auto pos1 = std::ranges::next(pos4, -3);
  std::cout << *pos1 << std::endl;


  auto bound = std::ranges::next(it, 5); // 6の位置
  
  // (3)、boundまで進める
  auto pos6 = std::ranges::next(it, bound);
  std::cout << *pos6 << std::endl;
  
  // (4)、boundまでの間で、8進める
  auto pos6_2 = std::ranges::next(it, 8, bound);
  std::cout << *pos6_2 << std::endl;

  // (4) boundまでの間で、4進める
  auto pos5 = std::ranges::next(it, 4, bound);
  std::cout << *pos5 << std::endl;
}
```
* std::ranges::next[color ff0000]
* std::begin[link /reference/iterator/begin.md]

### 出力
```
2
4
1
6
6
5
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 5 [mark verified]

## 関連項目

| 名前                | 説明                              |
|---------------------|-----------------------------------|
| [`next()`](next.md) | `n`回前方に進めたイテレータを返す |
| [`prev()`](prev.md) | `n`回後方に進めたイテレータを返す |
| [`advance()`](advance.md) | `n`回イテレータを進める |
| [`rangse::prev()`](ranges_prev.md) | `n`回後方に進めたイテレータを返す |
| [`ranges::advance()`](ranges_advance.md) |`n`回あるいは`boundまで`イテレータを進める |


## 参照

- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
