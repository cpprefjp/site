# span
* span[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class ElementType, size_t Extent = dynamic_extent>
  class span;
}
```
* size_t[link /reference/cstddef/size_t.md]
* dynamic_extent[link dynamic_extent.md.nolink]

## 概要
`std::span`は、シーケンスの所有権を保持せず、部分シーケンスを参照するクラスである。

このクラスは、[`std::vector`](/reference/vector/vector.md)や配列といったコンテナから一部の連続的な要素を抽出し、それらの要素にのみなんらかの処理を適用する、という目的に使用できる。

文字列操作に特化したクラスとして[`std::basic_string_view`](/reference/string_view/basic_string_view.md)が定義されているが、こちらはメモリ連続性をもつあらゆるコンテナに適用できる。


### メモリ連続性
このクラスの対象は、メモリの連続性を持つシーケンスである。例として、以下は対象のシーケンスである：

- 組み込み配列
- 要素を指すポインタと要素数の組
- 先頭要素を指すポインタと、末尾要素の次を指すポインタの組
- [`std::array`](/reference/array/array.md)
- [`std::vector`](/reference/vector/vector.md)

メモリ連続性をもつクラスは、非メンバ関数[`data()`](/reference/iterator/data.md)によってポインタを取得でき、非メンバ関数[`size()`](/reference/iterator/size.md)によって要素数を取得できること。それらの関数は、ADLによって呼び出される。

### 静的な要素数と、動的な要素数
`std::span`は、静的な要素数をもつ場合と、動的な要素数をもつ場合の両方をサポートする。それはテンプレートパラメータ`Extent`によって表される。動的な要素数をもつ場合は、`Extent`として[`std::dynamic_extent`](/reference/span/dynamic_extent.md.nolink)を指定する。動的な要素数は、[`std::vector`](/reference/vector/vector.md)を参照したり、ポインタと要素数の組を扱ったり、参照範囲を動的に変更したりする場合に必要となる。

静的な要素数をもつ場合、メンバ定数`extent`に要素数が保持されるため、メンバ変数として要素数を保持する必要がなく、領域を節約する最適化を行える。また、静的な要素数をもつ`std::span`型に対しては、タプルインタフェースを適用できる。



## メンバ関数
### 構築・破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](span/op_constructor.md) | コンストラクタ | C++20 |
| `~span() = default;` | デストラクタ | C++20 |
| `span& operator=(const span&) = default;`<br/> `span& operator=(span&&) = default;` | 代入演算子 | C++20 |


### サブシーケンスの参照

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`first`](span/first.md)     | 先頭N個の要素を参照する`span`オブジェクトを取得する | C++20 |
| [`last`](span/last.md)       | 末尾N個の要素を参照する`span`オブジェクトを取得する | C++20 |
| [`subspan`](span/subspan.md) | 任意の位置からN個の要素を参照する`span`オブジェクトを取得する | C++20 |


### 領域

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`size`](span/size.md)             | 参照している要素数を取得する           | C++20 |
| [`size_bytes`](span/size_bytes.md) | 参照している範囲のバイト数を取得する   | C++20 |
| [`empty`](span/empty.md)           | 参照している範囲が空かどうかを判定する | C++20 |


### 要素アクセス

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator[]`](span/op_at.md) | 参照範囲から、任意の位置の要素を取得する | C++20 |
| [`front`](span/front.md)      | 参照範囲の先頭要素を取得する             | C++20 |
| [`back`](span/back.md)        | 参照範囲の末尾要素を取得する             | C++20 |
| [`data`](span/data.md)        | 参照範囲の先頭を指すポインタを取得する   | C++20 |


### イテレータ

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`begin`](span/begin.md) | 先頭要素を指すイテレータを取得する | C++20 |
| [`end`](span/end.md) | 末尾要素の次を指すイテレータを取得する | C++20 |
| [`cbegin`](span/cbegin.md) | 先頭要素を指す読み取り専用イテレータを取得する | C++20 |
| [`cend`](span/cend.md) | 末尾要素の次を指す読み取り専用イテレータを取得する | C++20 |
| [`rbegin`](span/rbegin.md) | 末尾要素を指す逆順イテレータを取得する | C++20 |
| [`rend`](span/rend.md) | 先頭要素の前を指す逆順イテレータを取得する | C++20 |
| [`crbegin`](span/crbegin.md) | 末尾要素を指す読み取り専用逆順イテレータを取得する | C++20 |
| [`crend`](span/crend.md) | 先頭要素の前を指す読み取り専用逆順イテレータを取得する | C++20 |


### メンバ定数

| 名前 | 説明 | 対応バージョン |
|---------------------|----------------|------|
| `static constexpr index_type extent = Extent;` | 要素数。値が`-1`であれば動的な要素数、そうでなければ静的な固定要素数 | C++20 |


### メンバ型

| 名前 | 説明 | 対応バージョン |
|---------------------|----------------|------|
| `element_type` | 要素型 `ElementType` | C++20 |
| `value_type` | CV修飾を除いた要素型 [`remove_cv_t`](/reference/type_traits/remove_cv.md)`<ElementType>` | C++20 |
| `index_type` | インデックスを表す符号なし整数型 [`size_t`](/reference/cstddef/size_t.md) | C++20 |
| `difference_type` | イテレータの差を表す符号付き整数型 [`ptrdiff_t`](/reference/cstddef/ptrdiff_t.md) | C++20 |
| `pointer` | ポインタ型 `element_type*` | C++20 |
| `const_pointer` | `const`ポインタ型 `const element_type*` | C++20 |
| `reference` | 参照型 `element_type&` | C++20 |
| `const_reference` | `const`参照型 `const element_type&` | C++20 |
| `iterator` | 実装定義のイテレータ型 | C++20 |
| `const_iterator` | 実装定義の読み取り専用イテレータ | C++20 |
| `reverse_iterator` | 逆順イテレータ [`reverse_iterator`](/reference/iterator/reverse_iterator.md)`<iterator>` | C++20 |
| `const_reverse_iterator` | 読み取り専用逆イテレータ [`reverse_iterator`](/reference/iterator/reverse_iterator.md)`<const_iterator>` | C++20 |


## 非メンバ関数
### オブジェクトのバイト表現

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`as_bytes`](span/as_bytes.md.nolink) | バイト列としてシーケンスを参照する | C++20 |
| [`as_writable_bytes`](span/as_writable_bytes.md.nolink) | 書込み可能なバイト列としてシーケンスを参照する | C++20 |

## タプルインタフェース

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`tuple_size`](span/tuple_size.md)       | 要素数を取得する (class template)           | C++20 |
| [`tuple_element`](span/tuple_element.md) | `i`番目の要素型を取得する (class template)  | C++20 |
| [`get`](span/get.md)                     | 任意の位置の要素を取得する | C++20 |


## 推論補助

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|------------------------------------|-------|
| [`(deduction_guide)`](span/op_deduction_guide.md) | クラステンプレートの推論補助 | C++20 |


## 例
```cpp example
```

### 出力
```
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0122R7 `<span>` (n4740でwording changeあり)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0122r7.pdf)
    - [N4740 2018年03月 Jacksonville会議](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/n4740.html)
- [P1085R2 Should `span` be regular?](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1085r2.md)
- [P1227R2 Signed `ssize()` functions, unsigned `size()` functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1227r2.html)
- [P1024R3 Usability enhancements for `std::span`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1024r3.pdf)
