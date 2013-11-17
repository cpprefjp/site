#map
```cpp
namespace std {
  template <
		class Key, 
		class T, 
		class Compare = less<Key>, 
		class Allocator = allocator<pair<const Key, T> > 
  >
  class multimap;
}
```

* [less](./functional/comparisons.md)
* [allocator](./memory/allocator.md)

 C++ 標準テンプレートライブラリの実装において、multimap コンテナは 4 つのテンプレートパラメータを取る。

各テンプレートパラメータは以下のような意味である。

- `Key`: キーの型。キーの値の大小に従って自動的に並び替えられる。
- `T`: 値の型。
- `pair<const Key,T>`: 要素の型。
- `Compare`: 比較クラス。このクラスは 2 つの引数（同じ型）をとり `bool` 値を返す。狭義の弱順序において `a` が `b` よりも前の場所に位置づけられる場合に `true` である。これはクラスが関数呼び出しオブジェクトを実装したクラスであっても良いし関数ポインタであっても良い（例は コンストラクタ を参照）。これは、`operator<()` を適用( `a < b` )したときと同じ値を返す `less<Key>` がデフォルトである。
- `Allocator`: ストレージアロケーションモデルを決定づける、アロケータオブジェクトの型である。デフォルトでは、`Key` への `allocator` クラステンプレート（これは値に依存しないシンプルなメモリ確保モデルを定義する）が使われる。

##概要
`multimap` はユニークな要素を格納する連想コンテナの一種であり、キーとそれに対応する値を格納する。 
連想コンテナは特にそれらキーによる要素アクセスが効率的になるようよう設計されたコンテナである（要素への相対位置または絶対位置によるアクセスが効率的であるシーケンシャルコンテナとは異なる）。 
内部的には、`multimap` 内の要素は、コンテナの構築時に設定された狭義の弱順序基準に従って小さいものから大きいものへとソートされる。 

`multimap` は一般的に、二分木として実装される。従って、連想コンテナである `multimap` の主な特性は以下の通りである。

- 要素の値はキーと値のpair型である。
- 要素は常に厳密で弱い順序付けに従う。
- insertとemplaceはイテレータや要素の参照に影響を与えない。

このコンテナクラスは、双方向イテレータをサポートする。


##メンバ関数
###構築・破棄

| 名前 | 説明 | 対応バージョン |
|---------------------------------|----------------|-------|
| [`(constructor)`](./mulitmap/multimap.md) | コンストラクタ | |
| [`(destructor)`](./mulitmap/-multimap.md) | デストラクタ | |
| [`operator=`](./mulitmap/op_assign.md) | 代入演算子 | |
| [`get_allocator`](./mulitmap/get_allocator.md) | アロケータオブジェクトを取得する | |


###イテレータ

| 名前 | 説明 | 対応バージョン |
|------------------------------|----------------------------------------------|-------|
| [`begin`](./mulitmap/begin.md)    | 先頭を指すイテレータを取得する               | |
| [`cbegin`](./mulitmap/cbegin.md)  | 先頭を指す読み取り専用イテレータを取得する   | C++11 |
| [`end`](./mulitmap/end.md)        | 末尾を指すイテレータを取得する               | |
| [`cend`](./mulitmap/cend.md)      | 末尾を指す読み取り専用イテレータを取得する   | C++11 |
| [`rbegin`](./mulitmap/rbegin.md)  | 末尾を指す逆イテレータを取得する             | |
| [`crbegin`](./mulitmap/rbegin.md) | 末尾を指す読み取り専用逆イテレータを取得する | C++11 |
| [`rend`](./mulitmap/rend.md)      | 先頭を指す逆イテレータを取得する             | |
| [`crend`](./mulitmap/rend.md)     | 先頭を指す読み取り専用逆イテレータを取得する | C++11 |


##領域

| 名前 | 説明 | 対応バージョン |
|---------------------------------|------------------------------------|-------|
| [`empty`](./mulitmap/empty.md)       | コンテナが空であるかどうかを調べる | |
| [`size`](./mulitmap/size.md)         | 要素数を取得する                   | |
| [`max_size`](./mulitmap/max_size.md) | 格納可能な最大の要素数を取得する   | |


##コンテナの変更

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------|----------------------------------|-------|
| [`clear`](./mulitmap/clear.md)               | 全ての要素を削除する             | |
| [`insert`](./mulitmap/insert.md)             | 要素を挿入する                   | |
| [`emplace`](./mulitmap/emplace.md)           | 要素を直接構築する               | C++11 |
| [`emplace_hint`](./mulitmap/emplace_hint.md) | ヒントを使って要素を直接構築する | C++11 |
| [`erase`](./mulitmap/erase.md)               | 要素を削除する |                 | |
| [`swap`](./mulitmap/swap.md)                 | コンテンツを交換する             | |


##要素アクセス

| 名前 | 説明 | 対応バージョン |
|---------------------------------------|--------------------------------------------|-------|
| [`count`](./mulitmap/count.md)             | 指定したキーにマッチする要素の数を取得する | |
| [`find`](./mulitmap/find.md)               | 指定したキーで要素を探す                   | |
| [`equal_range`](./mulitmap/equal_range.md) | 指定したキーにマッチする要素範囲を取得する | |
| [`lower_bound`](./mulitmap/lower_bound.md) | 与えられた値より小さくない最初の要素へのイテレータを取得する | |
| [`upper_bound`](./mulitmap/upper_bound.md) | 特定の値よりも大きい最初の要素へのイテレータを取得する       | |

##オブザーバー

| 名前 | 説明 | 対応バージョン |
|-------------------------------------|--------------------------|-------|
| [`key_comp`](./mulitmap/key_comp.md)     | キーを比較した結果を取得する | |
| [`value_comp`](./mulitmap/value_comp.md) | 値を比較した結果を取得する   | |


##非メンバ関数

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------|--------------------------------------------|-------|
| [`operator==`](./mulitmap/op_equal.md)         | 左辺と右辺が等しいかの判定を行う           | |
| [`operator!=`](./mulitmap/op_not_equal.md)     | 左辺と右辺が等しくないかの判定を行う       | |
| [`operator<`](./mulitmap/op_less_than.md)      | 左辺が右辺より小さいかの判定を行う         | |
| [`operator<=`](./mulitmap/op_greater_equal.md) | 左辺が右辺より小さいか等しいかの判定を行う | |
| [`operator>`](./mulitmap/op_greater_than.md)   | 左辺が右辺より大きいかの判定を行う         | |
| [`operator>=`](./mulitmap/op_greater_equal.md) | 左辺が右辺より大きいか等しいかの判定を行う | |
| [`swap`](./mulitmap/swap_free.md)              | 2つの`map`オブジェクトを入れ替える         | |


