# gets
* cstdio[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp14removed[meta cpp]

```cpp
namespace std {
  char* gets(char* str); // (1) C++98
}
```

この関数はC++14で削除された。代わりに[`fgets()`](fgets.md)関数を使用すること。


## 概要
標準入力から1行を読み込み、指定されたバッファへ格納する。

改行文字に到達するか、終端に到達するまで文字を読み込む。読み込んだ改行文字は破棄され、バッファの末尾にはヌル文字が追加される。


## 事前条件
- `str`は有効なポインタであること
- `str`が指す領域が、入力される行を格納するのに十分な大きさであること


## 戻り値
成功すれば`str`を返す。1文字も読み込まずに終端に到達した場合、もしくは読み込みに失敗した場合は`NULL`を返す。


## 非推奨・削除の詳細
この関数は、読み込む文字数を制限する手段を持たない。そのため、入力される行が`str`の指す領域より長い場合、必ずバッファオーバーフローを引き起こす。呼び出し側でこれを防ぐ方法はないため、安全に使用することが原理的にできない。

C言語では、C99の技術訂正TC3 (ISO/IEC 9899:1999/Cor.3:2007) の「Future library directions」において「`gets`関数は廃止予定 (obsolescent) であり、非推奨である」と規定された。続いてWG14 N1420により、C11で完全に削除された。

C++では、C++14の各国コメント (NB comment GB9) によって削除された。C++11の時点でC++が参照していたC99には`gets()`が含まれていたが、C11から削除されたことを受けて、C++からも取り除かれたものである。あわせて`<cstdio>`の規定には「C++は関数`gets()`を定義しない」という注記が追加された。

この関数の代わりとして、読み込む文字数を指定できる[`fgets()`](fgets.md)関数を使用すること。ただし[`fgets()`](fgets.md)関数は改行文字を破棄せずバッファへ格納する点が異なる。

```cpp
char str[10];

// std::gets(str); // 削除された。バッファオーバーフローを防げない

// 読み込む文字数を指定できる
std::fgets(str, sizeof(str), stdin);
```
* std::fgets[link fgets.md]


## バージョン
### 言語
- C++98

## 関連項目
- [`fgets`](fgets.md)
- [`puts`](puts.md)
- [`std::getline`](/reference/string/basic_string/getline.md)


## 参照
- [WG14 N1256 ISO/IEC 9899:TC3](https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1256.pdf)
    - C99に技術訂正TC1・TC2・TC3を適用した文書。§7.26.9で`gets`関数が廃止予定 (obsolescent) かつ非推奨であると規定された
- [WG14 N1420 On The Removal of `gets()`](https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1420.htm)
    - C言語側で`gets`を削除する提案文書。TC3で廃止予定とされていたこの関数を、C11で完全に削除した
- [N3733 ISO/IEC CD 14882, C++ 2014, National Body Comments](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3733.pdf)
    - C++14に対する各国コメント。GB9として`gets`の削除が提起された
- [N3956 ISO/IEC CD 14882, C++ 2014, Responses to National Body Comments](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3956.pdf)
    - GB9への回答。C++14で`gets`を`<cstdio>`・`<stdio.h>`の一覧表から削除し、「C++は関数`gets`を定義しない」旨の注記を追加することが承認された
