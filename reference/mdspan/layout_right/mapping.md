# mapping
* mdspan[meta header]
* class template[meta id-type]
* std[meta namespace]
* layout_right[meta class]
* cpp23[meta cpp]

```cpp
namespace std {
  template<class Extents>
  class layout_right::mapping;
}
```
* layout_right[link ../layout_right.md]
* Extents[link ../extents.md]

## 概要
`layout_right::mapping<E>`は、[`extents`](../extents.md)型の多次元配列サイズ`E`をパラメータとして、C/C++多次元配列と互換性のある行優先(row major)[レイアウトマッピング](../LayoutMapping.md)を表現するクラスである。

`layout_right::mapping<E>`は[トリビアルコピー可能](/reference/type_traits/is_trivially_copyable.md)であり、[`regular`](/reference/concepts/regular.md)のモデルである。

### 説明専用メンバ変数
`layout_right::mapping`クラステンプレートは、下記の説明専用メンバ変数を保持する。

- `extents_` : `extents_type`型の[多次元配列サイズ情報](../extents.md)


## 適格要件
- `Extents`は[`extents`](../extents.md)の特殊化であること。
- [`Extents::rank_dynamic()`](../extents/rank_dynamic.md) `== 0`が`true`のとき、多次元インデクス空間`Extents()`のサイズが`Extents::index_type`型で表現できること。


## メンバ関数
### 構築・破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](mapping/op_constructor.md) | コンストラクタ | C++23 |
| `(destructor)` | デストラクタ | C++23 |
| `operator=`    | コピー代入演算子 | C++23 |

### 観測

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `extents` | 多次元配列のサイズ`extents_`を取得する | C++23 |
| [`required_span_size`](mapping/required_span_size.md) | 要素アクセス範囲を取得する | C++23 |
| [`operator()`](mapping/op_call.md) | 多次元配列インデクスから要素位置へ変換する | C++23 |
| [`stride`](mapping/stride.md) | 指定次元のストライド幅を取得する | C++23 |


## 静的メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `is_always_unique`     | `true`を返す | C++23 |
| `is_always_exhaustive` | `true`を返す | C++23 |
| `is_always_strided`    | `true`を返す | C++23 |
| `is_unique`     | `true`を返す | C++23 |
| `is_exhaustive` | `true`を返す | C++23 |
| `is_strided`    | `true`を返す | C++23 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `extents_type` | [`Extents`](../extents.md) | C++23 |
| `index_type` | [`Extents::index_type`](../extents.md) | C++23 |
| `size_type` | [`Extents::size_type`](../extents.md) | C++23 |
| `rank_type` | [`Extents::rank_type`](../extents.md) | C++23 |
| `layout_type` | [`layout_right`](../layout_right.md) | C++23 |


## 非メンバ（*Hidden friends*）関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`submdspan_mapping`](mapping/submdspan_mapping.md.nolink) | [`submdspan`](../submdspan.md)サポート | C++26 |

### 比較演算子

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator==`](mapping/op_equal.md) | 等値比較 | C++23 |
| [`operator!=`](mapping/op_equal.md) | 非等値比較 (`==`により使用可能) | C++23 |


## 例
```cpp example
#include <mdspan>
#include <iostream>

int main()
{
  double arr[] = {1, 2, 3, 4, 5, 6};

  // 要素数2x3の2次元配列／行優先レイアウト
  using Ext2x3 = std::extents<size_t, 2, 3>;
  using Mapping = std::layout_right::mapping<Ext2x3>;
  std::mdspan mat{arr, Mapping{}};

  for (size_t i = 0; i < mat.extent(0); ++i) {
    for (size_t j = 0; j < mat.extent(1); ++j) {
      std::cout << (j ? " " : "") << mat[i, j];
    }
    std::cout << "\n";
  }
}
```
* std::layout_right::mapping[color ff0000]

### 出力
```
1 2 3
4 5 6
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
- [`mdspan`](../mdspan.md)
- [`submdspan`](../submdspan.md)


## 参照
- [P0009R18 MDSPAN](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0009r18.html)
- [P2630R4 Submdspan](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2630r4.html)
