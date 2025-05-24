# advance
* iterator[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<input_or_output_iterator I>
  constexpr void advance(I& i, iter_difference_t<I> n);     // (1)

  template<input_or_output_iterator I, sentinel_for<I> S>
  constexpr void advance(I& i, S bound);                    // (2)

  template<input_or_output_iterator I, sentinel_for<I> S>
  constexpr iter_difference_t<I> advance(I& i, iter_difference_t<I> n, S bound);  // (3)
}
```
* input_or_output_iterator[link /reference/iterator/input_or_output_iterator.md]
* iter_difference_t[link /reference/iterator/iter_difference_t.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]

## 概要

イテレータを`n`回あるいは指定された位置まで進める。

[`ranges::next()`](ranges_next.md)、[`ranges::prev()`](ranges_prev.md)と違い、引数として渡されたイテレータへの参照を書き換える。

## 引数

- `i` -- 進める対象のイテレータの参照
- `n` -- 進める距離
- `bound` -- 進行の目的地となる位置を示すイテレータ（あるいは番兵）

## 事前条件

- (1) : `I`が[`bidirectional_iterator`](bidirectional_iterator.md)のモデルとならない場合、`n`は負数ではない
- (2) : `[i, bound)`は有効なイテレータ範囲である
- (3) : 次のいずれか
    - `n >  0` : `[i, bound)`は有効なイテレータ範囲である
    - `n == 0` : `[i, bound)`もしくは`[bound, i)`は有効なイテレータ範囲である
    - `n <  0` : `[bound, i)`は有効なイテレータ範囲であり、`I`は[`bidirectional_iterator`](bidirectional_iterator.md)のモデルであり、`I, S`は[`same_as`](/reference/concepts/same_as.md)`<I, S>`のモデルとなる。

## 効果

- (1) : 次のいずれかによって、イテレータへの参照`i`を`n`回進める(`n`が負数の場合は逆方向に進める)。
    - `I`が[`random_access_iterator`](random_access_iterator.md)のモデルとなる : `i += n`
    - `n`が正数 : `i`を`n`回インクリメントする
    - `n`が負数 : `i`を`-n`回デクリメントする
- (2) : 次のいずれかによって、イテレータへの参照`i`を`bound`まで進める。
    - `I, S`が[`assignable_from`](/reference/concepts/assignable_from.md)`<I&, S>`のモデルとなる : `i = std::move(bound)`
    - `S, I`が[`sized_sentinel_for`](sized_sentinel_for.md)`<S, I>`のモデルとなる : `ranges::advance(i, bound - i)`（(1)に委譲）
    - それ以外の場合 : `bool(i != bound) == true`である間、`i`をインクリメントする
- (3) : 次のいずれかによって、イテレータへの参照`i`を`bound`を超えないように`n`回進める(`n`が負数の場合は逆方向に進める)。
    - `S, I`が[`sized_sentinel_for`](sized_sentinel_for.md)`<S, I>`のモデルとなり
        - `|n| >= |bound - i|` : `ranges::advance(i, bound)`（(2)に委譲）
        - `|n| <  |bound - i|` : `ranges::advance(i, n)`（(1)に委譲）
    - それ以外の場合で
        - `n`が正数 : `bool(i != bound) == true`である間、`i`を最大`n`回インクリメントする
        - `n`が負数 : `bool(i != bound) == true`である間、`i`を最大`-n`回デクリメントする

## 戻り値

- (1), (2) : なし
- (3) : 指定した距離`n`と実際に進めた距離との差（進めなかった距離）を返す
    - `i`の処理終了時と開始時の位置の差を`M`として、`n - M`を返す

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
  
  // (1)、2つ進める
  std::ranges::advance(it, 2);
  
  std::cout << *it << std::endl;
  
  auto bound = std::next(vec.begin(), 5); // 6の位置
  
  // (2)、boundまで進める
  std::ranges::advance(it, bound);
  
  std::cout << *it << std::endl;
  
  auto bound2 = std::next(bound, 2); // 8の位置
  
  // (3)、boundまでの間で、4つ進める
  auto d = std::ranges::advance(it, 4, bound2);
  
  std::cout << *it << std::endl;
  std::cout << "diff : " << d << std::endl;
}
```
* std::ranges::advance[color ff0000]
* std::begin[link /reference/iterator/begin.md]
* std::next[link /reference/iterator/next.md]

### 出力
```
3
6
8
diff : 2
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
| [`rangse::prev()`](ranges_prev.md) | `n`回後方に進めたイテレータを返す |

## 参照

- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
