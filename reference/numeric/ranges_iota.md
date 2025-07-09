# iota
* numeric[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  // (1)
  template<input_or_output_iterator O, sentinel_for<O> S, weakly_incrementable T>
    requires indirectly_writable<O, const T&>
  constexpr iota_result<O, T> iota(O first, S last, T value);

  // (2)
  template<weakly_incrementable T, output_range<const T&> R>
  constexpr iota_result<borrowed_iterator_t<R>, T> iota(R&& r, T value);
}
```
* input_or_output_iterator[link /reference/iterator/input_or_output_iterator.md]
* weakly_incrementable[link /reference/iterator/weakly_incrementable.md]
* indirectly_writable[link /reference/iterator/indirectly_writable.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]
* iota_result[link /reference/algorithm/ranges_out_value_result.md]


## 概要
指定された値から始まる、インクリメント演算子による増加列を生成する。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する

`iota()`関数は、値の範囲`[value, value + (last - first))`を前から順番に範囲`[first, last)`の各要素に代入する。

これは、連続した値のシーケンスが必要な場合に使用する。


## 効果
イテレータ範囲`[first, last)`の各要素`it`について、先頭から順番に `*it = value; ++value;` を行う


## 戻り値
`{ .out = last, .value = value + (last - first) }`


## 計算量
イテレータ範囲`[first, last)`の要素数をnとして、n回のインクリメントと代入が行われる。


## 備考
この関数は、APL言語の「原始関数ι（イオタ）」に由来する。


## 例
```cpp example
#include <numeric>
#include <iostream>
#include <array>

int main()
{
  // 0から始まる10要素のシーケンスを作成する。
  // iota()関数に与えるシーケンスの要素数分だけ値が生成されるため、
  // 可変長のコンテナを与える場合には、事前に必要な要素数に
  // リサイズしておく必要がある
  std::array<int, 10> ar;
  std::ranges::iota(ar, 0);

  for (int x : ar) {
    std::cout << x << std::endl;
  }
}
```
* std::ranges::iota[color ff0000]

### 出力
```
0
1
2
3
4
5
6
7
8
9
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 関連項目
- [`std::ranges::iota_view`](/reference/ranges/iota_view.md): 増加列を遅延評価で生成するRangeファクトリ

## 参照
- [N4901 25 Algorithms library](https://timsong-cpp.github.io/cppwp/algorithms)
