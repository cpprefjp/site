#tuple (C++11)
* tuple[meta header]
* std[meta namespace]

`<tuple>`ヘッダでは、異なる型を格納できる固定サイズコレクションであるタプル型を提供する。2要素のみ格納可能な[`pair`](/reference/utility/pair.md)とは違い、[`tuple`](./tuple/tuple.md)は任意の数の要素を格納できる。

##タプルクラス

| 名前 | 説明 | 対応バージョン |
|-----------------------------|--------------------------|-------|
| [`tuple`](./tuple/tuple.md) | タプル型(class template) | C++11 |


###タプル生成関数

| 名前 | 説明 |
|---------------------------------------------------|---------------------------------------------------|-------|
| [`ignore`](./tuple/ignore.md)                     | 無視する要素のプレースホルダー(constant variable) | C++11 |
| [`make_tuple`](./tuple/make_tuple.md)             | 引数のコピーからタプルを生成する | C++11 |
| [`forward_as_tuple`](./tuple/forward_as_tuple.md) | 引数の完全な型からタプルを生成する | C++11 |
| [`tie`](./tuple/tie.md)                           | 引数への参照からタプルを生成する | C++11 |
| [`tuple_cat`](./tuple/tuple_cat.md)               | 複数のタプルから1つのタプルを生成する | C++11 |


##タプルヘルパクラス

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|----------------------------------------------------|-------|
| [`tuple_size`](./tuple/tuple_size.md)       | `tuple`の要素数を取得する(class template)          | C++11 |
| [`tuple_element`](./tuple/tuple_element.md) | `tuple`の`i`番目の要素型を取得する(class template) | C++11 |


##バージョン
###言語
- C++11

