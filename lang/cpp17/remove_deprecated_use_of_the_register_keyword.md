# 非推奨だったregisterキーワードを削除
* cpp17[meta cpp]

## 概要

C++17ではC++11で非推奨化された`register`キーワードを削除する。

C言語から引き継いだ`register`キーワードは、変数をCPUのレジスタ上に保存するための記憶クラス指定子である。

```cpp
// 変数vを、メモリの代わりにレジスタに保存する。
// 保存できない場合はメモリに保存する
register int v = 42;
```

`register`キーワードは最適化 (高速化) のためのヒントではあるが、非推奨化の提案が出た時点で、コンパイラから単に無視される機能となっていた。

`register`キーワードはC++17標準では使用しなくなるが、将来のために予約されたままとなる。

## 関連項目

- [C++11 registerキーワードを非推奨化](/lang/cpp11/deprecation_of_the_register_keyword.md)

## 参照

- [P0001R1: Remove Deprecated Use of the register Keyword](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0001r1.html)
- [P0001R0: Remove Deprecated Use of the register Keyword](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0001r0.html)
