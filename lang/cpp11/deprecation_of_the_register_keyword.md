# register�ーワードを非推奨化
* cpp11[meta cpp]

## 概要
`register`�ーワードが非推奨化された。

C言語から引き継いだ`register`�ーワードは、変数をCPUのレジスタ上に保�するための記憶クラス指定�である。

```cpp
// 変数vを、メモリの代わりにレジスタに保�する。
// 保�できない場合はメモリに保�する
register int v = 42;
```

`register`�ーワードは最適化 (高速化) のためのヒントではあるが、非推奨化の提案が出た時点で、コンパイラから単に無視される機能となっていた。

`register`はよく使われる英単語であるため、将来的にこの�ーワードをほかの用途に再利用することを目標とする。


## 関連項目

- [C++17 非推奨だったregister�ーワードを削除](/lang/cpp17/remove_deprecated_use_of_the_register_keyword.md)


## 参照
- [CWG Issue 809. Deprecation of the `register` keyword](http://www.open-std.org/jtc1/sc22/wg21/docs/cwg_defects.html#809)

