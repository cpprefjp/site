# registerキーワードを非推奨化
* cpp11[meta cpp]

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


## 参照
- [CWG Issue 809. Deprecation of the `register` keyword](http://www.open-std.org/jtc1/sc22/wg21/docs/cwg_defects.html#809)

