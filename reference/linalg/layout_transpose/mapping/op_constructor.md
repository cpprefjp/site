# コンストラクタ
* linalg[meta header]
* function[meta id-type]
* std::linalg[meta namespace]
* layout_transpose::mapping[meta class]
* cpp26[meta cpp]

```cpp
constexpr explicit mapping(const nested-mapping-type& map);
```

## 概要
入れ子[レイアウトマッピング](/reference/mdspan/LayoutMapping.md)からの変換コンストラクタ


## 効果
説明専用メンバ`nested-mapping_`を`map`で、`extents_`を[`transpose-extents`](../transpose-extents.md)`(map.extents())`で初期化する。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P1673R13 A free function linear algebra interface based on the BLAS](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1673r13.html)
