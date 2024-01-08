# default_accessor
* mdspan[meta header]
* class template[meta id-type]
* std[meta namespace]
* cpp23[meta cpp]

```cpp
namespace std {
  template<class ElementType>
  class default_accessor;
}
```

## 概要
`default_accessor`は、多次元配列ビュー[`mdspan`](mdspan.md)を介した要素アクセスのデフォルト動作を定義する。

`ElementType`は抽象クラス型もしくは配列型のいずれでもない完全型であること。

`default_accessor`は[トリビアルコピー可能](/reference/type_traits/is_trivially_copyable.md)であり、[`semiregular`](/reference/concepts/semiregular.md)のモデルである。

### アクセサポリシー要件
`default_accessor`は、下記のアクセサポリシー要件を満たす。

説明用の型`A`をアクセサポリシーとしたとき

- `A`は[`copyable`](/reference/concepts/copyable.md)のモデルであり、かつ
- [`is_nothrow_move_constructible_v`](/reference/type_traits/is_nothrow_constructible.md)`<A>`は`true`であり、かつ
- [`is_nothrow_move_assignable_v`](/reference/type_traits/is_nothrow_move_assignable.md)`<A>`は`true`であり、かつ
- [`is_nothrow_swappable_v`](/reference/type_traits/is_nothrow_swappable.md)`<A>`は`true`であること

型`A`は下記のメンバ型を持つこと

- `A::element_type` : 要素型
- `A::data_handle_type` : メモリブロックのポインタ型
- `A::reference` : 要素への参照型
- `A::offset_policy` : `offset`適用後のアクセサポリシー

説明用の変数`a`を`(const) A`の値、`p`を`(const) A::data_handle_type`の値、`i`を`size_t`の値としたとき、下記の式が妥当であること

- `a.access(p, i)` : `A::eference`を返す
- `a.offset(p, i)` : `A::offset_policy::data_handle_type`を返す


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](default_accessor/op_constructor.md) | コンストラクタ | C++23 |
| `(destructor)` | デストラクタ | C++23 |
| [`access`](default_accessor/access.md) | 指定オフセット位置にある要素へアクセスする | C++23 |
| [`offset`](default_accessor/offset.md) | 指定オフセット位置のハンドルを取得する | C++23 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `offset_policy`    | `default_accessor` | C++23 |
| `element_type`     | `ElementType`  | C++23 |
| `reference`        | `ElementType&` | C++23 |
| `data_handle_type` | `ElementType*` | C++23 |


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`mdspan`](mdspan.md)


## 参照
- [P0009R18 MDSPAN](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0009r18.html)
- [P2604R0 `mdspan`: rename `pointer` and `contiguous`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2604r0.html)
- [Reddit - Why is mdspan::offset_policy needed?](https://www.reddit.com/r/cpp/comments/cgc37m/why_is_mdspanoffset_policy_needed/)
