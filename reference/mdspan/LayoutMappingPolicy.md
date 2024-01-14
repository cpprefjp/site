# LayoutMappingPolicy
* named requirement[meta id-type]
* cpp23[meta cpp]


## 概要
LayoutMappingPolicyは、多次元配列ビュー[`mdspan`](mdspan.md)において多次元インデクスから参照先メモリブロック位置へと変換する[レイアウトマッピング](LayoutMapping.md)を定めるクラスが満たすべき要件である。

LayoutMappingPolicyを満たすユーザ定義`layout_custom`ポリシークラスは、下記の構造で定義される。

```cpp
// レイアウトマッピングポリシー
struct layout_custom {
  // レイアウトマッピング
  template<class Extents>
  class mapping {
  public:
    using layout_type = layout_custom;
    using extent_type = Extents;
    // ...
  };
};
```
* Extents[link extents.md]


## 要件
LayoutMappingPolicyを満たす型`MP`は

- [`extents`](extents.md)の特殊化`E`に対して`MP::mapping<E>`が有効であり、かつ
- その型`X`が[レイアウトマッピング要件](LayoutMapping.md)を満たし、かつ
- メンバ型`X::layout_type`が型`MP`を表しており、かつ
- メンバ型`X::extent_type`が型`E`を表すこと。


## `LayoutMappingPolicy`に該当する型

- [`layout_left`](layout_left.md)
- [`layout_right`](layout_right.md)
- [`layout_stride`](layout_stride.md)


## バージョン
### 言語
- C++23


## 関連項目
- [`mdspan`](mdspan.md)
- [`extents`](extents.md)
- [LayoutMapping](LayoutMapping.md)


## 参照
- [P0009R18 MDSPAN](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0009r18.html)
