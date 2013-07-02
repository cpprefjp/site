#utility
`<utility>`ヘッダでは、その他のライブラリの至る所で使用される、幾つかの基本的な関数やクラステンプレートを定義する。


##演算子定義

| 名前                              | 説明                  | 対応バージョン |
|-----------------------------------|-----------------------|----------------|
| [`rel_ops`](./utility/rel_ops.md) | 関係演算子(namespace) | |


##値の入れ替え

| 名前                        | 説明                                                | 対応バージョン |
|-----------------------------|-----------------------------------------------------|----------------|
| [`swap`](./utility/swap.md) | 二つのオブジェクトの値を交換する(function template) | |


##転送と移動

| 名前                                                | 説明                                                | 対応バージョン |
|-----------------------------------------------------|-----------------------------------------------------|----------------|
| [`forward`](./utility/forward.md)                   | 関数テンプレートの引数を転送する(function template) | C++11          |
| [`move`](./utility/move.md)                         | 左辺値を右辺値にキャストする(function template)     | C++11          |
| [`move_if_noexcept`](./utility/move_if_noexcept.md) | 例外を投げないオブジェクトをムーブする(function template) | C++11    |


##型の値

| 名前                              | 説明                                      | 対応バージョン |
|-----------------------------------|-------------------------------------------|----------------|
| [`declval`](./utility/declval.md) | 指定された型の値を得る(function template) | C++11 |


##組

| 名前                                                        | 説明                                   | 対応バージョン |
|-------------------------------------------------------------|----------------------------------------|----------------|
| [`pair`](./utility/pair.md)                                 | 異なる型の二つの値の組(class template) | |
| [`tuple_size`](./utility/tuple_size.md)                     | `pair`の要素数を取得する(class template) | C++11        |
| [`tuple_element`](./utility/tuple_element.md)               | `pair`の`i`番目の要素型を取得する(class template) | C++11 |
| [`get`](./utility/get.md)                                   | `pair`の`i`番目の要素を参照する(function template) | C++11 |
| [`piecewise_construct_t`](./utility/piecewise_construct.md) | `pair`の要素型のコンストラクタ引数を直接受け取って構築するためのタグ型(class) | C++11 |
| [`piecewise_construct`](./utility/piecewise_construct.md)   | `pair`の要素型のコンストラクタ引数を直接受け取って構築するためのタグ値(constant variable) | C++11 |
| `tuple`                                                     | `tuple`型の先行宣言(class template) | C++11 |


