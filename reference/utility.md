#utility
`<utility>`ヘッダでは、その他のライブラリの至る所で使用される、幾つかの基本的な関数やクラステンプレートを定義する。


##演算子定義

| 名前                              | 説明                  |
|-----------------------------------|-----------------------|
| [`rel_ops`](./utility/rel_ops.md) | 関係演算子(namespace) |


##値の入れ替え

| 名前                        | 説明                                                |
|-----------------------------|-----------------------------------------------------|
| [`swap`](./utility/swap.md) | 二つのオブジェクトの値を交換する(function template) |


##転送と移動

| 名前                                                | 説明                                                |
|-----------------------------------------------------|-----------------------------------------------------|
| [`forward`](./utility/forward.md)                   | 関数テンプレートの引数を転送する(function template) |
| [`move`](./utility/move.md)                         | 左辺値を右辺値にキャストする(function template) |
| [`move_if_noexcept`](./utility/move_if_noexcept.md) | 例外を投げないオブジェクトをムーブする(function template) |


##型の値

| 名前                              | 説明                                      |
|-----------------------------------|-------------------------------------------|
| [`declval`](./utility/declval.md) | 指定された型の値を得る(function template) |


##組

| 名前                                                        | 説明                                   |
|-------------------------------------------------------------|----------------------------------------|
| [`pair`](./utility/pair.md)                                 | 異なる型の二つの値の組(class template) |
| [`tuple_size`](./utility/tuple_size.md)                     | `pair`の要素数を取得する(class template) |
| [`tuple_element`](./utility/tuple_element.md)               | `pair`の`i`番目の要素型を取得する(class template) |
| [`get`](./utility/get.md)                                   | `pair`の`i`番目の要素を参照する(function template) |
| [`piecewise_construct_t`](./utility/piecewise_construct.md) | `pair`の要素型のコンストラクタ引数を直接受け取って構築するためのタグ型(class) |
| [`piecewise_construct`](./utility/piecewise_construct.md)   | `pair`の要素型のコンストラクタ引数を直接受け取って構築するためのタグ値(constant variable) |
| `tuple`                                                     | `tuple`型の先行宣言(class template) |


