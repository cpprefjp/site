# utility
* utility[meta header]

`<utility>`ヘッダでは、その他のライブラリの至る所で使用される、幾つかの基本的な関数やクラステンプレートを定義する。

このヘッダでは、以下の標準ヘッダをインクルードする：

- [`<initializer_list>`](initializer_list.md) (C++11)
- [`<compare>`](compare.md) (C++20)


## 演算子定義

| 名前                              | 説明                  | 対応バージョン |
|-----------------------------------|-----------------------|----------------|
| [`rel_ops`](utility/rel_ops.md) | 関係演算子(namespace) | C++20から非推奨 |


## 値の入れ替え

| 名前                                | 説明                                                  | 対応バージョン |
|-------------------------------------|-------------------------------------------------------|----------------|
| [`swap`](utility/swap.md)         | 二つのオブジェクトの値を交換する(function template)   | C++11 |
| [`exchange`](utility/exchange.md) | 値を書き換え、書き換え前の値を返す(function template) | C++14 |


## 転送と移動

| 名前                                                | 説明                                                | 対応バージョン |
|-----------------------------------------------------|-----------------------------------------------------|----------------|
| [`forward`](utility/forward.md)                   | 関数テンプレートの引数を転送する(function template) | C++11          |
| [`forward_like`](utility/forward_like.md)         | 第一テンプレート引数の`const`性と参照修飾で引数を転送する(function template) | C++23          |
| [`move`](utility/move.md)                         | 左辺値を右辺値にキャストする(function template)     | C++11          |
| [`move_if_noexcept`](utility/move_if_noexcept.md) | 例外を投げないオブジェクトをムーブする(function template) | C++11    |


## 型の修飾

| 名前                              | 説明                                | 対応バージョン |
|-----------------------------------|-------------------------------------|----------------|
| [`as_const`](utility/as_const.md) | 左辺値参照を`const`左辺値参照にする (function template) | C++17 |


## 型の値

| 名前                            | 説明                                      | 対応バージョン |
|---------------------------------|-------------------------------------------|----------------|
| [`declval`](utility/declval.md) | 指定された型の値を得る(function template) | C++11 |


## 整数比較

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`cmp_equal`](utility/cmp_equal.md)           | 等値比較 (function template) | C++20 |
| [`cmp_not_equal`](utility/cmp_not_equal.md)   | 非等値比較 (function template) | C++20 |
| [`cmp_less`](utility/cmp_less.md)             | 左辺が右辺より小さいかを比較 (function template) | C++20 |
| [`cmp_less_equal`](utility/cmp_less_equal.md) | 左辺が右辺以下かを比較 (function template) | C++20 |
| [`cmp_greater`](utility/cmp_greater.md)             | 左辺が右辺より大きいかを比較 (function template) | C++20 |
| [`cmp_greater_equal`](utility/cmp_greater_equal.md) | 左辺が右辺以上かを比較 (function template) | C++20 |
| [`in_range`](utility/in_range.md) | 値が型のとりうる範囲内か判定する (function template) | C++20 |


## 列挙型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`to_underlying`](utility/to_underlying.md) | 列挙値を基底型に変換する (function template) | C++23 |


## 到達しない表明

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`unreachable`](utility/unreachable.md) | コードパス不到達を表明する (function) | C++23 |


## 組

| 名前                                                        | 説明                                   | 対応バージョン |
|-------------------------------------------------------------|----------------------------------------|----------------|
| [`pair`](utility/pair.md)                                 | 異なる型の二つの値の組(class template) | |
| [`make_pair`](utility/make_pair.md)                       | `pair`を構築するヘルパ関数(function template) | |
| [`piecewise_construct_t`](utility/piecewise_construct_t.md) | `pair`や`tuple`の要素型のコンストラクタ引数を直接受け取って構築するためのタグ型(class) | C++11 |
| [`piecewise_construct`](utility/piecewise_construct_t.md)   | `pair`や`tuple`の要素型のコンストラクタ引数を直接受け取って構築するためのタグ値(constant variable) | C++11 |
| `tuple`                                                     | `tuple`型の先行宣言(class template) | C++11 |


## 直接構築

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`in_place_t`](utility/in_place_t.md) | 要素型のコンストラクタ引数を直接受け取って構築するためのタグ型 (class) | C++17 |
| [`in_place`](utility/in_place_t.md)   | 要素型のコンストラクタ引数を直接受け取って構築するためのタグ値 (constant variable) | C++17 |
| [`in_place_type_t`](utility/in_place_type_t.md) | 指定した要素型のコンストラクタ引数を直接受け取って構築するためのタグ型 (class) | C++17 |
| [`in_place_type`](utility/in_place_type_t.md)   | 指定した要素型のコンストラクタ引数を直接受け取って構築するためのタグ値 (constant variable) | C++17 |
| [`in_place_index_t`](utility/in_place_index_t.md) | 指定位置にある要素型のコンストラクタ引数を直接受け取って構築するためのタグ型 (class) | C++17 |
| [`in_place_index`](utility/in_place_index_t.md)   | 指定位置にある要素型のコンストラクタ引数を直接受け取って構築するためのタグ値 (constant variable) | C++17 |


## 定数引数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`constant_arg_t`](utility/constant_arg_t.md) | 定数引数を表現するためのタグ型 (class template) | C++26 |
| [`constant_arg`](utility/constant_arg_t.md)   | 定数引数を表現するためのタグ値 (variable template) | C++26 |


## コンパイル時の整数シーケンス

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`integer_sequence`](utility/integer_sequence.md) | 任意の整数型のシーケンス(class template) | C++14 |
| [`make_integer_sequence`](utility/make_integer_sequence.md) | 要素数を指定して、0から始まる整数シーケンスを生成する(type-alias) | C++14 |
| [`index_sequence`](utility/index_sequence.md) | `size_t`型の整数シーケンス(type-alias) | C++14 |
| [`make_index_sequence`](utility/make_index_sequence.md) | 要素数を指定して、0から始まる`size_t`型整数シーケンスを生成する(type-alias) | C++14 |
| [`index_sequence_for`](utility/index_sequence_for.md) | 型のシーケンスを、0から始まる`size_t`型整数シーケンスに変換する(type-alias) | C++14 |


## 参照
- [P2051R0 C++ Standard Library Issues to be moved in Prague](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2051r0.html)
