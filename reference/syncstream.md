# syncstream
* syncstream[meta header]
* cpp20[meta cpp]

ヘッダ`<syncstream>`は、同じストリームへアトミックに出力するメカニズムを提供する。

このヘッダは、以下のヘッダをインクルードすることが規定されている。

- [`<ostream>`](ostream.md)


## クラス
| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`basic_syncbuf`](syncstream/basic_syncbuf.md) | 同期化出力ストリームバッファラッパー | C++20 |
| [`basic_osyncstream`](syncstream/basic_osyncstream.md) | 同期化出力ストリームラッパー | C++20 |


## 型の別名
| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| `syncbuf` | `basic_syncbuf<char>` | C++20 |
| `wsyncbuf` | `basic_syncbuf<wchar_t>` | C++20 |
| `osyncstream` | `basic_osyncstream<char>` | C++20 |
| `wosyncstream` | `basic_osyncstream<wchar_t>` | C++20 |


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 11.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 update 10 [mark verified]


## 関連項目
- [`<iostream>`](iostream.md)


## 参照
- [P0053R7 C++ Synchronized Buffered Ostream](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0053r7.pdf)
