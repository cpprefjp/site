# cstring
* cstring[meta header]

`<cstring>`ヘッダでは、文字列操作関数を定義する。これらの機能は、`std`名前空間に属することを除いてC言語の標準ライブラリ`<string.h>`ヘッダと同じである。


## フリースタンディング
このヘッダの多くの機能は、フリースタンディング処理系でも使用できる。ただし、以下の機能はフリースタンディング処理系では提供されない：

- [`strcoll`](cstring/strcoll.md)、[`strxfrm`](cstring/strxfrm.md)、[`strerror`](cstring/strerror.md) : ロケールに依存する
- [`strdup`](cstring/strdup.md)、[`strndup`](cstring/strndup.md) : 動的なメモリ確保を行う
- [`strtok`](cstring/strtok.md) : 内部に状態を保持する


## 型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`size_t`](/reference/cstddef/size_t.md) | 符号なし整数型 | |


## マクロ

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`NULL`](/reference/cstddef/null.md) | ヌルポインタ定数に展開されるマクロ | |


## コピー関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`memcpy`](cstring/memcpy.md)  | メモリデータをコピーする | |
| [`memccpy`](cstring/memccpy.md) | メモリデータを指定した文字が現れるまでコピーする | C++26 |
| [`memmove`](cstring/memmove.md) | メモリデータをコピーする（領域重複可） | |
| [`strcpy`](cstring/strcpy.md)  | 文字列をコピーする | |
| [`strncpy`](cstring/strncpy.md) | 文字列をコピーする（上限サイズ指定） | |
| [`strdup`](cstring/strdup.md)  | 文字列を複製する | C++26 |
| [`strndup`](cstring/strndup.md) | 文字列を複製する（上限サイズ指定） | C++26 |


## 結合関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`strcat`](cstring/strcat.md)  | 文字列を結合する | |
| [`strncat`](cstring/strncat.md) | 文字列を結合する（上限サイズ指定） | |


## 比較関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`memcmp`](cstring/memcmp.md)  | メモリデータを比較する | |
| [`strcmp`](cstring/strcmp.md)  | 文字列を比較する | |
| [`strcoll`](cstring/strcoll.md) | 文字列を比較する（ロケール依存） | |
| [`strncmp`](cstring/strncmp.md) | 文字列を比較する（上限サイズ指定） | |
| [`strxfrm`](cstring/strxfrm.md) | ロケールに基づいて文字列を変換する | |


## 検索関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`memchr`](cstring/memchr.md)  | メモリデータを検索する | |
| [`strchr`](cstring/strchr.md)  | 文字を検索する | |
| [`strcspn`](cstring/strcspn.md) | 指定した文字が現れるまでの長さを求める | |
| [`strpbrk`](cstring/strpbrk.md) | 指定した文字が現れる位置を求める | |
| [`strrchr`](cstring/strrchr.md) | 文字を後ろから検索する | |
| [`strspn`](cstring/strspn.md)  | 指定した文字以外が現れるまでの長さを求める | |
| [`strstr`](cstring/strstr.md)  | 文字列を検索する | |
| [`strtok`](cstring/strtok.md)  | 文字列をトークンに分割する | |


## その他の関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`memset`](cstring/memset.md)          | メモリデータを指定した値で埋める | |
| [`memset_explicit`](cstring/memset_explicit.md) | メモリデータを指定した値で埋める（最適化によって除去されない） | C++26 |
| [`strerror`](cstring/strerror.md)        | エラーの内容を文字列で取得する | |
| [`strlen`](cstring/strlen.md)          | 文字列の長さを取得する | |


## 参照
- [P0175R1 Synopses for the C library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0175r1.html)
- [P3348R4 C++26 should refer to C23 not C17](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3348r4.pdf)
    - C++26がC23を参照するようになり、`memccpy`・`strdup`・`strndup`・`memset_explicit`が追加された
- [P2338R4 Freestanding Library: Character primitives and the C library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2338r4.html)
    - C++26で、文字特性やC言語ライブラリの文字・文字列関数など、このヘッダの機能がフリースタンディング処理系に対応した
- [P2937R0 Freestanding: Remove `strtok`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2937r0.html)
    - C++26で、フリースタンディング対応の一環として、内部状態を持つ`strtok`はフリースタンディング処理系では提供されないことが整理された
