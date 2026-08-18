# version
* version[meta header]
* cpp20[meta cpp]

`<version>`ヘッダでは、実装依存でのC++標準ライブラリのバージョン情報を提供する。機能テストマクロ以外のバージョン情報以外に何が定義されるかは実装ごとに決められる。

## フリースタンディング
このヘッダは、フリースタンディング処理系でも使用できる。ただし、どの機能テストマクロが定義されるかは、その処理系がサポートするライブラリ機能に依存する（フリースタンディング処理系では、対応していない機能のマクロは定義されないことがある）。

## 機能テストマクロ

本ヘッダをインクルードすることにより、標準で提供される全てのライブラリ機能テストマクロを利用することができる。

- [C++14 機能テストマクロ](/lang/cpp14/feature_test_macros.md)
- [C++17 機能テストマクロ](/lang/cpp17/feature_test_macros.md)
- [C++20 機能テストマクロ](/lang/cpp20/feature_test_macros.md)
- [C++23 機能テストマクロ](/lang/cpp23/feature_test_macros.md)
- [C++26 機能テストマクロ](/lang/cpp26/feature_test_macros.md)
- [C++29 機能テストマクロ](/lang/cpp29/feature_test_macros.md)

## 参照
- [P0754R2 `<version>`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0754r2.pdf)
- [LWG Issue 3841. `<version>` should not be "all freestanding"](https://cplusplus.github.io/LWG/issue3841)
    - C++23で、`<version>`ヘッダ自体はフリースタンディングだが、非フリースタンディング機能に対応する機能テストマクロまで全て定義する必要はなく、処理系がサポートする機能のマクロのみ定義してよいことになった
