# 更新された定義済みマクロ
* cpp11[meta cpp]

## 概要

定義済みマクロの値が、以下のように更新された：

| マクロ名      | 値        | 説明                    |
|---------------|-----------|-------------------------|
| `__cplusplus` | `201103L` | C++のバージョン値を表す |


以下のマクロが新たに追加された：

| マクロ名      | 説明                    |
|---------------|-------------------------|
| `__STDCPP_STRICT_POINTER_SAFETY__` | 実装がポインタの厳密な安全性を持っている場合、整数値`1`として定義される<br/>本マクロ定数はC++23で削除される |
| `__STDCPP_THREADS__` | プログラムが複数のスレッドを実行できる場合、整数値`1`として定義される |
| `__STDC_MB_MIGHT_NEQ_WC__` | このマクロが整数型の定数`1`として定義されている場合、基本文字集合に含まれる文字のリテラルが、`char`と`wchar_t`で異なる値を持つ可能性がある。<br/>このマクロが定義されない場合には`'x' == L'x'`が`true`であることが保証され、そうでなければされない。 |


## 関連項目
- [C++11 C99互換で導入された定義済みマクロ](c99_predefined_macros.md)


## 参照
- [N2693 Requirements on programs and backwards compatibility](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2693.html)
- [CWG Issue 1169. Missing feature macro for strict pointer safety](http://www.open-std.org/jtc1/sc22/wg21/docs/cwg_defects.html#1169)
- [P2186R2 Removing Garbage Collection Support](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2186r2.html)
    - C++23でのマクロ`__STDCPP_STRICT_POINTER_SAFETY__`削除
