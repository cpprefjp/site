# aligned_accessor
* mdspan[meta header]
* class template[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std {
  template<class ElementType, size_t ByteAlignment>
  class aligned_accessor;
}
```

## 概要
`aligned_accessor`は、多次元配列ビュー[`mdspan`](mdspan.md)を介した要素アクセスにおいて、メモリアドレスに対するアライメント保証を与える。それ以外の動作は[`default_accessor`](default_accessor.md)と等価である。

`ElementType`は抽象クラス型もしくは配列型のいずれでもない完全型であること。

`aligned_accessor`は[トリビアルコピー可能](/reference/type_traits/is_trivially_copyable.md)であり、[`semiregular`](/reference/concepts/semiregular.md)のモデルである。

`aligned_accessor`は[アクセサポリシー要件](AccessorPolicy.md)を満たす。


## 適格要件
- `ByteAlignment`は2のべき乗であること
- `ByteAlignment >=` [`alignof`](/lang/cpp11/alignof.md)`(ElementType)`


## メンバ変数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `static constexpr size_t byte_alignment` | `ByteAlignment` | C++26 |


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](aligned_accessor/op_constructor.md.nolink) | コンストラクタ | C++26 |
| `(destructor)` | デストラクタ | C++26 |
| [`operator default_accessor`](aligned_accessor/op_default_accessor.md.nolink) | [`default_accessor`](default_accessor.md)型への変換演算子 | C++26 |
| [`access`](aligned_accessor/access.md.nolink) | 指定オフセット位置にある要素へアクセスする | C++26 |
| [`offset`](aligned_accessor/offset.md.nolink) | 指定オフセット位置のハンドルを取得する | C++26 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `offset_policy` | [`default_accessor<ElementType>`](default_accessor.md) | C++26 |
| `element_type`     | `ElementType`  | C++26 |
| `reference`        | `ElementType&` | C++26 |
| `data_handle_type` | `ElementType*` | C++26 |


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`mdspan`](mdspan.md)
- [`default_accessor`](default_accessor.md)


## 参照
- [P2897R7 `aligned_accessor`: An mdspan accessor expressing pointer over-alignment](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2897r7.html)
