#multiset
* set[meta header]
* std[meta namespace]
* class[meta id-type]

```cpp
namespace std {
  template <class Key, class Compare = less<Key>, class Allocator = allocator<Key>>
  class multiset;
}
```
* less[link /reference/functional/less.md]
* allocator[link /reference/memory/allocator.md]


`multiset` は連想コンテナの一種であり、要素自身がキーとなる。 
連想コンテナは特にそれらキーによる要素アクセスが効率的になるようよう設計されたコンテナである（要素への相対位置または絶対位置によるアクセスが効率的であるシーケンシャルコンテナとは異なる）。 
内部的には、`multiset` 内の要素は、コンテナの構築時に設定された[狭義の弱順序](/reference/algorithm.md#strict-weak-ordering)基準に従って小さいものから大きいものへとソートされる。 

[`set`](./set.md)が重複キーを許可しないのに対し、`multiset`は重複キーを許可する。  
`set`とは違い、[`find()`](./multiset/find.md.nolink)メンバ関数は、キーに合致した最初の要素へのイテレータを返し、[`count()`](./multiset/count.md.nolink)メンバ関数はキーに合致する要素数を返す。  


このコンテナクラスは、双方向イテレータをサポートする。  

各テンプレートパラメータは以下のような意味である。

- `Key`: キーの型。このコンテナに格納されれる要素の型。`multiset` に格納される要素はそれぞれはキーでもある。
- `Compare`: 比較クラス。このクラスは 2 つの引数（同じ型であり、コンテナの要素型でもある）をとり `bool` 値を返す。[狭義の弱順序](/reference/algorithm.md#strict-weak-ordering)において `a` が `b` よりも前の場所に位置づけられる場合に `true` である。これはクラスが関数呼び出しオブジェクトを実装したクラスであっても良いし関数ポインタであっても良い（例は コンストラクタ を参照）。これは、`operator<()` を適用( `a < b` )したときと同じ値を返す `less<Key>` がデフォルトである。
- `Allocator`: ストレージアロケーションモデルを決定づける、アロケータオブジェクトの型である。デフォルトでは、`Key` への `allocator` クラステンプレート（これは値に依存しないシンプルなメモリ確保モデルを定義する）が使われる。


##メンバ関数
###構築・破棄

| 名前 | 説明 | 対応バージョン |
|---------------------------------|----------------|-------|
| [`(constructor)`](./set/op_constructor.md) | コンストラクタ | |
| [`(destructor)`](./set/op_destructor.md) | デストラクタ | |
| [`operator=`](./set/op_assign.md) | 代入演算子 | |
| [`get_allocator`](./set/get_allocator.md) | アロケータオブジェクトを取得する | |


###イテレータ

| 名前 | 説明 | 対応バージョン |
|------------------------------|----------------------------------------------|-------|
| [`begin`](./set/begin.md)    | 先頭を指すイテレータを取得する               | |
| [`cbegin`](./set/begin.md)   | 先頭を指す読み取り専用イテレータを取得する   | C++11 |
| [`end`](./set/end.md)        | 末尾を指すイテレータを取得する               | |
| [`cend`](./set/end.md)       | 末尾を指す読み取り専用イテレータを取得する   | C++11 |
| [`rbegin`](./set/rbegin.md)  | 末尾を指す逆イテレータを取得する             | |
| [`crbegin`](./set/rbegin.md) | 末尾を指す読み取り専用逆イテレータを取得する | C++11 |
| [`rend`](./set/rend.md)      | 先頭を指す逆イテレータを取得する             | |
| [`crend`](./set/rend.md)     | 先頭を指す読み取り専用逆イテレータを取得する | C++11 |


###領域

| 名前 | 説明 | 対応バージョン |
|---------------------------------|----------------------------------------------|-------|
| [`empty`](./set/empty.md)       | コンテナが空であるかどうかを調べる | |
| [`size`](./set/size.md)         | 要素数を取得する | |
| [`max_size`](./set/max_size.md) | 格納可能な最大の要素数を取得する | |


###コンテナの変更

| 名前 | 説明 | 対応バージョン |
|---------------------------------|------------------------------------------|-------|
| [`clear`](./set/clear.md)               | 全ての要素を削除する             | |
| [`insert`](./set/insert.md)             | 要素を挿入する                   | |
| [`emplace`](./set/emplace.md)           | 要素を直接構築する               | C++11 |
| [`emplace_hint`](./set/emplace_hint.md) | ヒントを使って要素を直接構築する | C++11 |
| [`erase`](./set/erase.md)               | 要素を削除する                   |
| [`swap`](./set/swap.md)                 | コンテンツを交換する             |


###要素アクセス

| 名前 | 説明 | 対応バージョン |
|---------------------------------------|----------------------------------------|-------|
| [`count`](./set/count.md)             | 指定したキーにマッチする要素の数を返す | |
| [`find`](./set/find.md)               | 指定したキーで要素を探す | |
| [`equal_range`](./set/equal_range.md) | 指定したキーにマッチする要素範囲を返す | |
| [`lower_bound`](./set/lower_bound.md) | 与えられた値より小さくない最初の要素へのイテレータを返す | |
| [`upper_bound`](./set/upper_bound.md) | 特定の値よりも大きい最初の要素へのイテレータを返す | |


###オブザーバー

| 名前 | 説明 | 対応バージョン |
|-------------------------------------|--------------------------|-------|
| [`key_comp`](./set/key_comp.md)     | キーを比較した結果を返す | |
| [`value_comp`](./set/value_comp.md) | 値を比較した結果を返す   | |


##メンバ型

| 名前 | 説明 | 対応バージョン |
|--------------------------|--------------------------------------------|-------|
| `key_type`               | キーの型。テンプレートパラメータ `Key`。 | |
| `value_type`             | 要素の型。テンプレートパラメータ `Key`。 | |
| `key_compare`            | キーの大小関係を判定する二項述語の型。テンプレートパラメータ `Compare`。 | |
| `value_compare`          | 要素の大小関係を判定する二項述語の型。テンプレートパラメータ `Compare`。 | |
| `allocator_type`         | アロケータの型。テンプレートパラメータ `Allocator`。 | |
| `reference`              | 要素`value_type`への参照型。`value_type&`。 | |
| `const_reference`        | 要素`value_type`への`const`参照型。`const value_type&`。 | |
| `iterator`               | 双方向イテレータ | |
| `const_iterator`         | 読み取り専用双方向イテレータ。 | |
| `size_type`              | 要素数を表す符号なし整数型。`difference_type` で表現可能な非負整数（0以上の整数）を表すことが可能。(通常は [`size_t`](/reference/cstddef/size_t.md)) | |
| `difference_type`        | 同一のコンテナを指す `iterator` の差を表す符号付き整数型(通常は [`ptrdiff_t`](/reference/cstddef/ptrdiff_t.md)) <br/>`std::`[`iterator_traits`](/reference/iterator/iterator_traits.md)`<iterator>::difference_type`、および、`std::`[`iterator_traits`](/reference/iterator/iterator_traits.md)`<const_iterator>::difference_type` と同じ。 | |
| `pointer`                | 要素 `value_type`へのポインタ。<br/> C++03 : `typename Allocator::pointer`。<br/> C++11以降 : `typename `[`allocator_traits`](/reference/memory/allocator_traits.md)`<Allocator>::pointer`。 | |
| `const pointer`          | 要素 `value_type`への`const`ポインタ。<br/> C++03 : `typename Allocator::const_pointer`。<br/> C++11以降 : `typename `[`allocator_traits`](/reference/memory/allocator_traits.md)`<Allocator>::const_pointer`。 | |
| `reverse_iterator` | 逆順双方向イテレータ。`std::`[`reverse_iterator`](/reference/iterator/reverse_iterator.md)`<iterator>`。 | |
| `const_reverse_iterator` | 読み取り専用逆順双方向イテレータ。`std::`[`reverse_iterator`](/reference/iterator/reverse_iterator.md)`<const_iterator>`。 | |


##非メンバ関数

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------|--------------------------------------------|-------|
| [`operator==`](./set/op_equal.md)         | 左辺と右辺が等しいかの判定を行う | |
| [`operator!=`](./set/op_not_equal.md)     | 左辺と右辺が等しくないかの判定を行う | |
| [`operator<`](./set/op_less.md)           | 左辺が右辺より小さいかの判定を行う | |
| [`operator<=`](./set/op_greater_equal.md) | 左辺が右辺より小さいか等しいかの判定を行う | |
| [`operator>`](./set/op_greater.md)        | 左辺が右辺より大きいかの判定を行う | |
| [`operator>=`](./set/op_greater_equal.md) | 左辺が右辺より大きいか等しいかの判定を行う | |
| [`swap`](./set/swap_free.md)              | 2つの`set`オブジェクトを入れ替える | |


##例
```cpp
#include <iostream>
#include <set>

int main()
{
  // intをキーとして扱う集合
  std::multiset<int> s;

  // 挿入
  s.insert(3);
  s.insert(1);
  s.insert(4);
  s.insert(1); // キーを重複させることが可能

  // キー1に該当する要素数を取得する
  std::size_t count = s.count(1);

  // 検索 : キー(int)を指定し、対応する値を得る
  decltype(s)::iterator it = s.find(1);
  if (it != s.end()) {
    // 発見した
    // 同じキーの要素を全て列挙する
    for (std::size_t i = 0; i < count; ++i) {
      int value = *it;
      std::cout << value << std::endl;
    }
  }
  else {
    std::cout << "not found" << std::endl;
  }
}
```

###出力
```
1
1
```

