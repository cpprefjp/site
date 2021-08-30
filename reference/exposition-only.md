# 説明専用ライブラリ
* exposition-only[meta header]

このページでは、説明専用のライブラリをまとめる。
これらはC++規格の文章中に現れる説明のためのものであり、実際に使うことはできない。

| 名前                                                                  | 説明                    | 対応バージョン |
|-----------------------------------------------------------------------|-------------------------|----------------|
| [`decay-copy`](exposition-only/decay-copy.md)                         | [`decay`](/reference/type_traits/decay.md)した型にコピーまたはムーブする (function template)     | C++20          |
| [`synth-three-way`](exposition-only/synth-three-way.md.nolink)               | (function template)     | C++20          |
| [`synth-three-way-result`](exposition-only/synth-three-way-result.md.nolink) | (function template)     | C++20          |

## `<concepts>`

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`boolean-testable`](concepts/boolean-testable.md) | 真理値型 (concept) | C++20 |

## `<iterator>`

| 名前                         | 説明                                            | 対応バージョン |
|------------------------------|-------------------------------------------------|----------------|
| [`with-reference`](iterator/dereferenceable.md)   | 型`T`に参照を付加する (alias template)               | C++20          |
| [`can-reference`](iterator/dereferenceable.md) | `with-reference`可能 (concept) | C++20 |
| [`dereferenceable`](iterator/dereferenceable.md) | 単純な間接参照が可能 (concept)           | C++20          |
| [`is-integer-like`](iterator/is_integer_like.md) | 符号付整数型と同等の型か否かを表す (variable template)           | C++20          |
| [`is-signed-integer-like`](iterator/is_integer_like.md) | 符号なし整数型と同等の型か否かを表す (variable template)           | C++20          |

## 参照
- [N4861 16.4.2.1 Exposition-only functions](https://timsong-cpp.github.io/cppwp/n4861/expos.only.func)
