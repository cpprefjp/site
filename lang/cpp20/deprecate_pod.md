# PODを非推奨化 [P0767R1]
* cpp20[meta cpp]

<!-- start lang caution -->

このページはC++20に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative_page)を参照してください。

<!-- last lang caution -->

## 概要
[POD (Plain Old Data) という型の分類](/reference/type_traits/is_pod.md)は、C++11において[トリビアル型](/reference/type_traits/is_trivial.md)と[スタンダードレイアウト型](/reference/type_traits/is_standard_layout.md)に用語が分割された。

C++20では規格の文面に残っていた「POD」の使用をやめ、スタンダードレイアウト型などのほかの型分類に置き換えた。


## <a id="relative-page" href="#relative-page">関連項目</a>
- [`is_pod`](/reference/type_traits/is_pod.md)
- [`aligned_storage`](/reference/type_traits/aligned_storage.md)
- [`aligned_union`](/reference/type_traits/aligned_union.md)
- [`max_align_t`](/reference/cstddef/max_align_t.md)


## 参照
- [P0767R1 Deprecate POD](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0767r1.html)
- [N2342 POD's Revisited; Resolving Core Issue 568 (Revision 5)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2342.htm)
    - [C++0x POD再考 - Faith and Brave - C++で遊ぼう](https://faithandbrave.hateblo.jp/entry/20081127/1227777378)
    - C++11においてPODという用語が分割された文書