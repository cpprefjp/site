#map
```cpp
namespace std {
  template <
		class Key, 
		class T, 
		class Compare = less<Key>, 
		class Allocator = allocator<pair<const Key, T> > 
  >
  class map;
}
```
* less[link ../functional/less.md]
* allocator[link ../memory/allocator.md]
* pair[link /reference/utility/pair.md]

`map` コンテナは 4 つのテンプレートパラメータを取る。

各テンプレートパラメータは以下のような意味である。

- `Key`: キーの型。キーの値の大小に従って自動的に並び替えられる。
- `T`: 値の型。
- `pair<const Key, T>`: 要素の型。
- `Compare`: 比較クラス。このクラスは 2 つの引数（同じ型）をとり `bool` 値を返す。[狭義の弱順序](/reference/algorithm.md#strict-weak-ordering)において `a` が `b` よりも前の場所に位置づけられる場合に `true` である。これはクラスが関数呼び出しオブジェクトを実装したクラスであっても良いし関数ポインタであっても良い（例は コンストラクタ を参照）。これは、`operator<()` を適用( `a < b` )したときと同じ値を返す `less<Key>` がデフォルトである。
- `Allocator`: ストレージアロケーションモデルを決定づける、アロケータオブジェクトの型である。デフォルトでは、`pair<const Key, T>` への [`allocator`](/reference/memory/allocator.md) クラステンプレート（これは値に依存しないシンプルなメモリ確保モデルを定義する）が使われる。

##概要
`map` はユニークな要素を格納する連想コンテナの一種であり、キーとそれに対応する値を格納する。 
連想コンテナは特にそれらキーによる要素アクセスが効率的になるようよう設計されたコンテナである（要素への相対位置または絶対位置によるアクセスが効率的であるシーケンシャルコンテナとは異なる）。 
内部的には、`map` 内の要素は、コンテナの構築時に設定された[狭義の弱順序](/reference/algorithm.md#strict-weak-ordering)基準に従って小さいものから大きいものへとソートされる。 

`map` は一般的に、二分木として実装される。従って、連想コンテナである `map` の主な特性は以下の通りである。

- ユニークな要素のキー：互いに等しい二つのキーを持つ要素が `map` に格納されることは無い。複数の等しいキーを許す同様の連想コンテナは `multimap` を参照のこと。
- 要素の値はキーと値のpair型である。
- 要素は常に[狭義の弱順序](/reference/algorithm.md#strict-weak-ordering)に従う。
- 挿入操作はイテレータや要素の参照に影響を与えない。

このコンテナクラスは、双方向イテレータをサポートする。


##メンバ関数
###構築・破棄

| 名前 | 説明 | 対応バージョン |
|---------------------------------|----------------|-------|
| [`(constructor)`](./map/op_constructor.md) | コンストラクタ | |
| [`(destructor)`](./map/op_destructor.md) | デストラクタ | |
| [`operator=`](./map/op_assign.md) | 代入演算子 | |
| [`get_allocator`](./map/get_allocator.md) | アロケータオブジェクトを取得する | |


###イテレータ

| 名前 | 説明 | 対応バージョン |
|------------------------------|----------------------------------------------|-------|
| [`begin`](./map/begin.md)    | 先頭を指すイテレータを取得する               | |
| [`cbegin`](./map/cbegin.md)  | 先頭を指す読み取り専用イテレータを取得する   | C++11 |
| [`end`](./map/end.md)        | 末尾を指すイテレータを取得する               | |
| [`cend`](./map/cend.md)      | 末尾を指す読み取り専用イテレータを取得する   | C++11 |
| [`rbegin`](./map/rbegin.md)  | 末尾を指す逆イテレータを取得する             | |
| [`crbegin`](./map/rbegin.md) | 末尾を指す読み取り専用逆イテレータを取得する | C++11 |
| [`rend`](./map/rend.md)      | 先頭を指す逆イテレータを取得する             | |
| [`crend`](./map/rend.md)     | 先頭を指す読み取り専用逆イテレータを取得する | C++11 |


##領域

| 名前 | 説明 | 対応バージョン |
|---------------------------------|------------------------------------|-------|
| [`empty`](./map/empty.md)       | コンテナが空であるかどうかを調べる | |
| [`size`](./map/size.md)         | 要素数を取得する                   | |
| [`max_size`](./map/max_size.md) | 格納可能な最大の要素数を取得する   | |


##コンテナの変更

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------|----------------------------------|-------|
| [`clear`](./map/clear.md)               | 全ての要素を削除する             | |
| [`insert`](./map/insert.md)             | 要素を挿入する                   | |
| [`emplace`](./map/emplace.md)           | 要素を直接構築する               | C++11 |
| [`emplace_hint`](./map/emplace_hint.md) | ヒントを使って要素を直接構築する | C++11 |
| [`erase`](./map/erase.md)               | 要素を削除する |                 | |
| [`swap`](./map/swap.md)                 | コンテンツを交換する             | |


##要素アクセス

| 名前 | 説明 | 対応バージョン |
|---------------------------------------|--------------------------------------------|-------|
| [`operator[]`](./map/op_at.md)        | 指定したキーを持つ要素を取得する           | |
| [`at`](./map/at.md)                   | 指定したキーを持つ要素を取得する           | C++11 |
| [`count`](./map/count.md)             | 指定したキーにマッチする要素の数を取得する | |
| [`find`](./map/find.md)               | 指定したキーで要素を探す                   | |
| [`equal_range`](./map/equal_range.md) | 指定したキーにマッチする要素範囲を取得する | |
| [`lower_bound`](./map/lower_bound.md) | 与えられた値より小さくない最初の要素へのイテレータを取得する | |
| [`upper_bound`](./map/upper_bound.md) | 特定の値よりも大きい最初の要素へのイテレータを取得する       | |

##オブザーバー

| 名前                                | 説明                                   | 対応バージョン |
|-------------------------------------|----------------------------------------|----------------|
| [`key_comp`](./map/key_comp.md)     | キー比較用の関数オブジェクトを取得する |                |
| [`value_comp`](./map/value_comp.md) | 要素比較用の関数オブジェクトを取得する |                |


##メンバ型

| 名前                                    | 説明                                                                                                                                                                                                                                                                                                                                         | 対応バージョン |
|-----------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------|
| `key_type`                              | キーの型。テンプレートパラメータ `Key`。                                                                                                                                                                                                                                                                                                     |                |
| `value_type`                            | 要素の型。`std::`[`pair`](/reference/utility/pair.md)`<const Key, T>`。                                                                                                                                                                                                                                                                      |                |
| `mapped_type`                           | 値の型。テンプレートパラメータ `T`。                                                                                                                                                                                                                                                                                                         |                |
| `key_compare`                           | キー値の大小関係を判定する二項述語の型。テンプレートパラメータ `Compare`。                                                                                                                                                                                                                                                                   |                |
| [`value_compare`](map/value_compare.md) | 要素値のキー部分で大小関係を判定する二項述語の型。入れ子クラス                                                                                                                                                                                                                                                                               |                |
| `allocator_type`                        | アロケータの型。テンプレートパラメータ `Allocator`。                                                                                                                                                                                                                                                                                         |                |
| `reference`                             | 要素`value_type`への参照型。`value_type&`。                                                                                                                                                                                                                                                                                                  |                |
| `const_reference`                       | 要素`value_type`への`const`参照型。`const value_type&`。                                                                                                                                                                                                                                                                                     |                |
| `iterator`                              | 双方向イテレータ。                                                                                                                                                                                                                                                                                                                           |                |
| `const_iterator`                        | 読み取り専用双方向イテレータ。                                                                                                                                                                                                                                                                                                               |                |
| `size_type`                             | 要素数を表す符号なし整数型。`difference_type` で表現可能な非負整数（0以上の整数）を表すことが可能。(通常は [`size_t`](/reference/cstddef/size_t.md))                                                                                                                                                                                         |                |
| `difference_type`                       | 同一のコンテナを指す `iterator` の差を表す符号付き整数型(通常は [`ptrdiff_t`](/reference/cstddef/ptrdiff_t.md)) <br/>`std::`[`iterator_traits`](/reference/iterator/iterator_traits.md)`<iterator>::difference_type`、および、`std::`[`iterator_traits`](/reference/iterator/iterator_traits.md)`<const_iterator>::difference_type` と同じ。 |                |
| `pointer`                               | 要素 `value_type`へのポインタ。<br/> C++03 : `typename Allocator::pointer`。<br/> C++11以降 : `typename `[`allocator_traits`](/reference/memory/allocator_traits.md)`<Allocator>::pointer`。                                                                                                                                                 |                |
| `const pointer`                         | 要素 `value_type`への`const`ポインタ。<br/> C++03 : `typename Allocator::const_pointer`。<br/> C++11以降 : `typename `[`allocator_traits`](/reference/memory/allocator_traits.md)`<Allocator>::const_pointer`。                                                                                                                              |                |
| `reverse_iterator`                      | 逆順双方向イテレータ。`std::`[`reverse_iterator`](/reference/iterator/reverse_iterator.md)`<iterator>`。                                                                                                                                                                                                                                     |                |
| `const_reverse_iterator`                | 読み取り専用逆順双方向イテレータ。`std::`[`reverse_iterator`](/reference/iterator/reverse_iterator.md)`<const_iterator>`。                                                                                                                                                                                                                   |                |


##非メンバ関数

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------|--------------------------------------------|-------|
| [`operator==`](./map/op_equal.md)         | 左辺と右辺が等しいかの判定を行う           | |
| [`operator!=`](./map/op_not_equal.md)     | 左辺と右辺が等しくないかの判定を行う       | |
| [`operator<`](./map/op_less.md)           | 左辺が右辺より小さいかの判定を行う         | |
| [`operator<=`](./map/op_greater_equal.md) | 左辺が右辺より小さいか等しいかの判定を行う | |
| [`operator>`](./map/op_greater.md)        | 左辺が右辺より大きいかの判定を行う         | |
| [`operator>=`](./map/op_greater_equal.md) | 左辺が右辺より大きいか等しいかの判定を行う | |
| [`swap`](./map/swap_free.md)              | 2つの`map`オブジェクトを入れ替える         | |


##例
```cpp
#include <iostream>
#include <map>

int main()
{
  // charをキー、intを値として扱う連想配列
  std::map<char, int> m;

  // 挿入
  m.insert(std::make_pair('c', 30));
  m.insert(std::make_pair('a', 10));
  m.insert(std::make_pair('b', 20));

  // 検索 : キー(char)を指定し、値(int)を得る
  int value = m.at('a');
  std::cout << value << std::endl;
}
```

###出力
```
10
```

