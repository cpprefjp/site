# source_location
* source_location[meta header]
* cpp20[meta cpp]

`<source_location>`ヘッダは、ソースコード上の位置を表す型を提供する。

## フリースタンディング
このヘッダは、フリースタンディング処理系でも使用できる。本ヘッダが提供する全ての機能がフリースタンディング処理系で使用可能である。

## 機能一覧

| 名前                                                    | 説明                                     | 対応バージョン |
|---------------------------------------------------------|------------------------------------------|----------------|
| [`source_location`](source_location/source_location.md) | ソースコード上の位置を表すクラス (class) | C++20          |

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 11.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目

- [事前定義識別子`__func__`](/lang/cpp11/func.md)

## 参照

- [P1208R6 Adopt source_location for C++20](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1208r6.pdf)
