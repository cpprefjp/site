# registerキーワードを非推奨化
* cpp11[meta cpp]

<!-- start lang caution -->

このページはC++11に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
`register`キーワードが非推奨化された。

C言語から引き継いだ`register`キーワードは、変数をCPUのレジスタ上に保存するための記憶クラス指定子である。

```cpp
// 変数vを、メモリの代わりにレジスタに保存する。
// 保存できない場合はメモリに保存する
register int v = 42;
```

`register`キーワードは最適化 (高速化) のためのヒントではあるが、非推奨化の提案が出た時点で、コンパイラから単に無視される機能となっていた。

`register`はよく使われる英単語であるため、将来的にこのキーワードをほかの用途に再利用することを目標とする。


## <a id="relative-page" href="#relative-page">関連項目</a>

- [C++17 非推奨だったregisterキーワードを削除](/lang/cpp17/remove_deprecated_use_of_the_register_keyword.md)


## 参照
- [CWG Issue 809. Deprecation of the `register` keyword](http://www.open-std.org/jtc1/sc22/wg21/docs/cwg_defects.html#809)