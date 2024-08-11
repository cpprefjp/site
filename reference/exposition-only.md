# 説明専用ライブラリ

* exposition-only[meta header]

このページでは、説明専用のライブラリをまとめる。
これらはC++規格の文章中に現れる説明のためのものであり、実際に使うことはできない。

| 名前                                                                  | 説明                                                                           | 対応バージョン |
|-----------------------------------------------------------------------|-------------------------------------------------------------------------------|-----------|
| [`decay-copy`](exposition-only/decay-copy.md)                         | [`decay`](/reference/type_traits/decay.md)した型にコピーまたはムーブする (function template) | C++20     |
| [`synth-three-way`](exposition-only/synth-three-way-result.md)        | 三方比較可能であればそれを行い、そうでなければ三方比較を実装して比較を行う (variable)               | C++20     |
| [`synth-three-way-result`](exposition-only/synth-three-way-result.md) | `synth-three-way`関数オブジェクトでの比較結果の型 (function template)                   | C++20     |


## コンテナ

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`container-compatible-range`](exposition-only/container-compatible-range.md) | 指定されたコンテナと互換性のあるRange | C++23 |

## `<concepts>`

| 名前                                               | 説明               | 対応バージョン |
|----------------------------------------------------|------------------|-----------|
| [`boolean-testable`](concepts/boolean-testable.md) | 真理値型 (concept) | C++20     |

## `<iterator>`

| 名前                                                    | 説明                                                          | 対応バージョン |
|---------------------------------------------------------|-------------------------------------------------------------|-----------|
| [`with-reference`](iterator/dereferenceable.md)         | 型`T`に参照を付加する (alias template)                            | C++20     |
| [`can-reference`](iterator/dereferenceable.md)          | [`with-reference`](iterator/dereferenceable.md)可能 (concept) | C++20     |
| [`dereferenceable`](iterator/dereferenceable.md)        | 単純な間接参照が可能 (concept)                                  | C++20     |
| [`is-integer-like`](iterator/is_integer_like.md)        | 符号付整数型と同等の型か否かを表す (variable template)              | C++20     |
| [`is-signed-integer-like`](iterator/is_integer_like.md) | 符号なし整数型と同等の型か否かを表す (variable template)              | C++20     |
| [`constant-iterator` ](iterator/constant-iterator.md) | 要素不変なイテレータ (concept)              | C++23     |

## `<ranges>`

| 名前                                         | 説明                                                                                                   | 対応バージョン |
|----------------------------------------------|------------------------------------------------------------------------------------------------------|-----------|
| [`copyable-box`](ranges/copyable_box.md)     | コピー可能、または例外なしでムーブ可能な場合のみ値を保持する型 (class template)                                           | C++20<br/> C++23で削除     |
| [`movable-box`](ranges/movable_box.md)     | 例外なしでムーブ可能な場合のみ値を保持する型 (class template)                                           | C++23     |
| [`simple-view`](ranges/simple-view.md)       | 単純なビューを表す (concept)                                                                                 | C++20     |
| [`has-arrow`](ranges/has-arrow.md)           | [`std::input_iterator`](/reference/iterator/input_iterator.md)を満たし、アロー演算子が使用できる型かを表す (concept) | C++20     |
| [`range-with-movable-references`](ranges/range-with-movable-references.md)           | 要素の参照と右辺値参照がムーブ構築できる[`input_range`](/reference/ranges/input_range.md) (concept) | C++23     |
| [`different-from`](ranges/different-from.md) | `const`/`volatile`修飾を無視して、2つの型が同じでないことを表す (concept)                                             | C++20     |
| [`uses-nonqualification-pointer-conversion`](ranges/subrange/uses-nonqualification-pointer-conversion.md) | 直接変換できない型同士のポインタの変換が必要かどうかを表す (concept)                                                    | C++20     |
| [`convertible-to-non-slicing`](ranges/subrange/convertible-to-non-slicing.md)                             | スライシングを起こさずに変換できるかどうかを表す (concept)                                                                 | C++20     |
| [`pair-like-convertible-from`](ranges/subrange/pair-like-convertible-from.md)                             | ある2つの型から構築出来る[`pair-like`](tuple/pair-like.md)な型を表す (concept)                                   | C++20     |
| [`maybe-const`](ranges/maybe-const.md)                                                                    | bool値に応じて`const`修飾を付加する (alias template)                                          | C++23     |

## `<tuple>`

| 名前                                | 説明                                          | 対応バージョン |
|-------------------------------------|---------------------------------------------|-----------|
| [`tuple-like`](tuple/tuple-like.md) | [`tuple`](tuple/tuple.md)のような型を表す (concept) | C++23     |
| [`pair-like`](tuple/pair-like.md)   | [`pair`](utility/pair.md)のような型を表す (concept) | C++20     |

## 参照

* [N4861 16.4.2.1 Exposition-only functions](https://timsong-cpp.github.io/cppwp/n4861/expos.only.func)
* [LWG 3404 Finish removing `subrange`'s conversions from `pair-like`](https://cplusplus.github.io/LWG/issue3404)
* [P2278R4 `cbegin` should always return a constant iterator](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2278r4.html)
* [P2494R2 Relaxing range adaptors to allow for move only types](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2494r2.html)
