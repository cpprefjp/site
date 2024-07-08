# POSIX用の名前空間を予約
* cpp11[meta cpp]

<-- start lang caution -->

このページはC++11に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため関連項目を参照してください。

<-- last lang caution -->

## 概要
将来の標準化のために、POSIX用の名前空間として`std::posix`と`::posix`を予約する。

これらの名前空間に宣言や定義を追加した場合、そのプログラムの動作は未定義となる。


## 参照
- [N2542 Reserved namespaces for POSIX](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2542.htm)
