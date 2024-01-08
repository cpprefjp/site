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
`default_accessor`は、多次元配列ビュー[`mdspan`](mdspan.md)の要素アクセスデフォルト動作を定義する。

`ElementType`は抽象クラス型もしくは配列型のいずれでもない完全型であること。

`default_accessor`はアクセサポリシー要件を満たす。
また`default_accessor`は[トリビアルコピー可能](/reference/type_traits/is_trivially_copyable.md)であり、[`semiregular`](/reference/concepts/semiregular.md)のモデルである。

## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](default_accessor/op_constructor.md.nolink) | コンストラクタ | C++23 |
| `(destructor)` | デストラクタ | C++23 |
| [`access`](default_accessor/access.md.nolink) | 指定オフセット位置にある要素へアクセスする | C++23 |
| [`offset`](default_accessor/offset.md.nolink) | 指定オフセット位置のハンドルを取得する | C++23 |


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
- [Reddit - Why is mdspan::offset_policy needed?](https://www.reddit.com/r/cpp/comments/cgc37m/why_is_mdspanoffset_policy_needed/)
