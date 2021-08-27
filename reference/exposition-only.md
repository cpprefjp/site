# 説明専用ライブラリ
* exposition-only[meta header]

このページでは、説明専用のライブラリをまとめる。
これらはC++規格の文章中に現れる説明のためのものであり、実際に使うことはできない。

| 名前                                                                  | 説明                    | 対応バージョン |
|-----------------------------------------------------------------------|-------------------------|----------------|
| [`decay-copy`](exposition-only/decay-copy.md)                         | [`decay`](/reference/type_traits/decay.md)した型にコピーまたはムーブする (function template)     | C++20          |
| [`synth-three-way`](exposition-only/synth-three-way.md.nolink)               | (function template)     | C++20          |
| [`synth-three-way-result`](exposition-only/synth-three-way-result.md.nolink) | (function template)     | C++20          |

## 参照
- [N4861 16.4.2.1 Exposition-only functions](https://timsong-cpp.github.io/cppwp/n4861/expos.only.func)
