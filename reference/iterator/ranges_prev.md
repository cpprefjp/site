# prev
* iterator[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<bidirectional_iterator I>
  constexpr I prev(I x);                                    // (1)

  template<bidirectional_iterator I>
  constexpr I prev(I x, iter_difference_t<I> n);            // (2)

  template<bidirectional_iterator I>
  constexpr I prev(I x, iter_difference_t<I> n, I bound);   // (3)
}
```
* bidirectional_iterator[link /reference/iterator/bidirectional_iterator.md]
* iter_difference_t[link /reference/iterator/iter_difference_t.md]

## 概要

`n`回あるいは指定された位置まで戻したイテレータを返す。

[`ranges::advance()`](/reference/iterator/ranges_advance.md)と違い、引数として渡されたイテレータへの参照を書き換えるのではなく、`n`回戻したイテレータのコピーを返す。

## 引数

- `x` -- 進行の出発位置を示すイテレータ
- `n` -- 進める距離
- `bound` -- 進行の目的地となる位置を示すイテレータ（あるいは番兵）

## 効果

- (1) : 以下と等価
    ```cpp
    --x;
    return x;
    ```

- (2) :  以下と等価
    ```cpp
    ranges::advance(x, -n);
    return x;
    ```
    * ranges::advance[link /reference/iterator/ranges_advance.md]

- (3) : 以下と等価
    ```cpp
    ranges::advance(x, -n, bound);
    return x;
    ```
    * ranges::advance[link /reference/iterator/ranges_advance.md]

## 戻り値

- (1) : `x`を1戻したイテレータのコピーを返す
- (2) : `x`を`n`戻したイテレータのコピーを返す
- (3) : `x`を`bound`以内で`n`戻したイテレータのコピーを返す

## 備考

この関数テンプレートは通常の名前探索で発見されている場合にADLを無効化する。詳しくは「[ADLを無効にする関数定義](/article/lib/disable_adl_function.md)」を参照のこと。

## 例
```cpp example
#include <iostream>
#include <iterator>
#include <vector>

int main() {
  std::vector<int> vec = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
  
  auto it = std::end(vec);
  
  // (1)、1つ戻る
  auto pos10 = std::ranges::prev(it);
  std::cout << *pos10 << std::endl;
  
  // (2)、3戻る
  auto pos8 = std::ranges::prev(it, 3);
  std::cout << *pos8 << std::endl;

  // (2)、-2進める
  auto pos10_2 = std::ranges::prev(pos8, -2);
  std::cout << *pos10_2 << std::endl;


  auto bound = std::ranges::prev(it, 5); // 6の位置

  // (3)、boundまでの間で、8戻る
  auto pos6 = std::ranges::prev(it, 8, bound);
  std::cout << *pos6 << std::endl;

  // (3)、boundまでの間で、4戻る
  auto pos7 = std::ranges::prev(it, 4, bound);
  std::cout << *pos7 << std::endl;
}
```
* std::ranges::prev[color ff0000]

### 出力
```
10
8
10
6
7
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
| [`ranges::next()`](ranges_next.md) | `n`回あるいは`bound`まで前方に進めたイテレータを返す |
| [`ranges::advance()`](ranges_advance.md) |`n`回あるいは`boundまで`イテレータを進める |


## 参照

- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
