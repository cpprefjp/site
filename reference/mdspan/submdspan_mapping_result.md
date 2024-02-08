# submdspan_mapping_result
* mdspan[meta header]
* class template[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std {
  template<class LayoutMapping>
  struct submdspan_mapping_result {
    [[no_unique_address]] LayoutMapping mapping = LayoutMapping();
    size_t offset{};
  };
}
```
* LayoutMapping[link LayoutMapping.md]
* no_unique_address[link /lang/cpp20/language_support_for_empty_objects.md]

## 概要
`submdspan_mapping_result`は、多次元配列ビュー[mdspan](mdspan.md)からの部分ビュー[`submdspan`](submdspan.md)取り出しサポートのために定義するカスタマイゼーションポイント`submdspan_mapping`の戻り値型である。

- `mapping` : 多次元配列部分ビューの[レイアウトマッピング](LayoutMapping.md)
- `offset` : 多次元配列部分ビューの要素オフセット位置


## 適格要件
`LayoutMapping`は[レイアウトマッピング要件](LayoutMapping.md)を満たすこと。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`submdspan`](submdspan.md)


## 参照
- [P2630R4 Submdspan](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2630r4.html)
