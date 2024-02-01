# 静的な診断メッセージの文字エンコーディング
* cpp23[meta cpp]

## 概要
C++23では、コンパイル時に診断メッセージを出力させる以下の機能について、ソースコードのエンコーディングが実行環境のエンコーディングで表現できない場合にどうするかの規定を見直す：

- `static_assert`
- `[[deprecated]]`
- `[[nodiscard]]`
- `#error`

C++20までは、「基本ソース文字集合に含まれない文字は出力する必要はない」という規定になっていたが、基本ソース文字集合と実行環境のエンコーディングは関係ないものであるため、この規定を削除することとした。

この規定はC20でも導入され、C++もそれに追従することとした。

## 参照
- [P2246R1 Character encoding of diagnostic text](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2246r1.pdf)
- [WG14 N2563 Character encoding of diagnostic text](https://www.open-std.org/jtc1/sc22/wg14/www/docs/n2563.pdf)
