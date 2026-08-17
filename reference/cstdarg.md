# cstdarg
* cstdarg[meta header]

`<cstdarg>`ヘッダでは、関数が可変個数の引数を受け取るための機能を定義する。これらの機能は、`va_list`型が`std`名前空間に属することを除いてC言語の標準ライブラリ`<stdarg.h>`ヘッダと同じである。

C++では可変引数テンプレート（パラメータパック）によって型安全に可変個数の引数を扱えるため、このヘッダの機能は主にC言語との互換や既存コードのために使用する。


## フリースタンディング
このヘッダは、フリースタンディング処理系でも使用できる。本ヘッダが提供する全ての機能がフリースタンディング処理系で使用可能である。


## 型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`va_list`](cstdarg/va_list.md) | 可変個数の引数にアクセスするための情報を保持する型 | |


## マクロ

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`va_start`](cstdarg/va_start.md) | 可変引数へのアクセスを開始する | |
| [`va_arg`](cstdarg/va_arg.md) | 次の可変引数を取得する | |
| [`va_copy`](cstdarg/va_copy.md) | `va_list`オブジェクトを複製する | C++11 |
| [`va_end`](cstdarg/va_end.md) | 可変引数へのアクセスを終了する | |
| [`__STDC_VERSION_STDARG_H__`](cstdarg/stdc_version_stdarg_h.md) | C23に準拠していることを示すマクロ | C++26 |


## 参照
- [P3348R4 C++26 should refer to C23 not C17](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3348r4.pdf)
    - C++26でC23を参照するようになり、`__STDC_VERSION_STDARG_H__`が追加され、`va_start`が可変引数マクロ`va_start(V, ...)`となった
- [LWG Issue 4388. Align new definition of `va_start` with C23](https://cplusplus.github.io/LWG/issue4388)
    - C++26で、`va_start`の第2引数以降は破棄されること、およびそれらが不均衡なカッコやトークンに変換されない前処理トークンを含む場合はプログラムが不適格（診断不要）となることが明確化された
