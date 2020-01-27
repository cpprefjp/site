# set
* set[meta header]
* std[meta namespace]
* class[meta id-type]

```cpp
namespace std {
  template <class Key, class Compare = less<Key>, class Allocator = allocator<Key>>
  class set;

  namespace pmr {
    template <class Key, class Compare = less<Key>>
      using set = std::set<Key, Compare,
                           polymorphic_allocator<Key>>;  // C++17から
  }
}
```
* less[link /reference/functional/less.md]
* allocator[link /reference/memory/allocator.md]
* polymorphic_allocator[link /reference/memory_resource/polymorphic_allocator.md]


`set` はユニークな要素を格納する連想コンテナの一種であり、要素自身が�ーとなる。

連想コンテナは特にそれら�ーによる要素アクセスが効率的になるよう�計されたコンテナである（要素への相対位置または絶対位置によるアクセスが効率的であるシーケンシャルコンテナとは異なる）。

内部的には、`set` 内の要素は、コンテナの構築時に�定された[�義の弱順序](/reference/algorithm.md#strict-weak-ordering)基準に従って小さいものから大きいものへとソートされる。

`set` は一般的に、二分木として実装される。従って、連想コンテナである `set` の主な特性は以下の通りである。

- ユニークな要素の値：互いに�しい二つの要素が `set` に格納されることは無い。複数の�しい値を許す同様の連想コンテナは [`multiset`](/reference/set/multiset.md) を参照のこと。
- 要素の値は�ーそのものである。�ーを使って要素にアクセスするが�ーとは異なる値へマップする同様の連想コンテナは [`map`](/reference/map/map.md) を参照のこと。
- 要素は常に[�義の弱順序](/reference/algorithm.md#strict-weak-ordering)に従う。

このコンテナクラスは、双方向イテレータをサポートする。

各テンプレートパラメータは以下のような意味である。

- `Key`: �ーの型。このコンテナに格納されれる要素の型。`set` に格納される要素はそれぞれは�ーでもある。
- `Compare`: 比較クラス。このクラスは 2 つの引数（同じ型であり、コンテナの要素型でもある）をとり `bool` 値を返す。[�義の弱順序](/reference/algorithm.md#strict-weak-ordering)において `a` が `b` よりも前の場所に位置づけられる場合に `true` である。これはクラスが関数呼び出しオブジェクトを実装したクラスであっても良いし関数ポインタであっても良い（例は コンストラクタ を参照）。これは、`operator<()` を適用( `a < b` )したときと同じ値を返す [`less`](/reference/functional/less.md)`<Key>` がデフォルトである。
- `Allocator`: ストレージア�ケーションモデルを決定づける、ア�ケータオブジェクトの型である。デフォルトでは、`Key` への [`allocator`](/reference/memory/allocator.md) クラステンプレート（これは値に依�しないシンプルなメモリ確保モデルを定義する）が使われる。


## メンバ関数
### 構築・破棄

| 名前 | 説明 | 対応バージョン |
|---------------------------------|----------------|-------|
| [`(constructor)`](set/op_constructor.md) | コンストラクタ | |
| [`(destructor)`](set/op_destructor.md) | デストラクタ | |
| [`operator=`](set/op_assign.md) | 代入演算� | |
| [`get_allocator`](set/get_allocator.md) | ア�ケータオブジェクトを取得する | |


### イテレータ

| 名前 | 説明 | 対応バージョン |
|-------------------------------|----------------------------------------------|-------|
| [`begin`](set/begin.md)     | 先�を指すイテレータを取得する               | |
| [`cbegin`](set/cbegin.md)   | 先�を指す�み取り専用イテレータを取得する   | C++11 |
| [`end`](set/end.md)         | 末尾を指すイテレータを取得する               | |
| [`cend`](set/cend.md)       | 末尾を指す�み取り専用イテレータを取得する   | C++11 |
| [`rbegin`](set/rbegin.md)   | 末尾を指す逆イテレータを取得する             | |
| [`crbegin`](set/crbegin.md) | 末尾を指す�み取り専用逆イテレータを取得する | C++11 |
| [`rend`](set/rend.md)       | 先�を指す逆イテレータを取得する             | |
| [`crend`](set/crend.md)     | 先�を指す�み取り専用逆イテレータを取得する | C++11 |


### 領域

| 名前 | 説明 | 対応バージョン |
|---------------------------------|----------------------------------------------|-------|
| [`empty`](set/empty.md)       | コンテナが空であるかどうかを調べる | |
| [`size`](set/size.md)         | 要素数を取得する | |
| [`max_size`](set/max_size.md) | 格納可能な最大の要素数を取得する | |


### コンテナの変更

| 名前 | 説明 | 対応バージョン |
|---------------------------------|------------------------------------------|-------|
| [`clear`](set/clear.md)               | 全ての要素を削除する             | |
| [`insert`](set/insert.md)             | 要素を挿入する                   | |
| [`emplace`](set/emplace.md)           | 要素を直接構築する               | C++11 |
| [`emplace_hint`](set/emplace_hint.md) | ヒントを使って要素を直接構築する | C++11 |
| [`erase`](set/erase.md)               | 要素を削除する                   |
| [`swap`](set/swap.md)                 | コンテンツを交換する             |
| [`extract`](set/extract.md)           | ノードハンドルを取得する         | C++17 |
| [`merge`](set/merge.md)               | 他のオブジェクトの要素をマージする | C++17 |


### 要素アクセス

| 名前 | 説明 | 対応バージョン |
|---------------------------------------|----------------------------------------|-------|
| [`count`](set/count.md)             | 指定した�ーにマッチする要素の数を返す | |
| [`find`](set/find.md)               | 指定した�ーで要素を探す | |
| [`contains`](set/contains.md)       | 指定した�ーの要素が含まれているかを判定する | C++20 |
| [`equal_range`](set/equal_range.md) | 指定した�ーにマッチする要素範囲を返す | |
| [`lower_bound`](set/lower_bound.md) | 与えられた値より小さくない最初の要素へのイテレータを返す | |
| [`upper_bound`](set/upper_bound.md) | 特定の値よりも大きい最初の要素へのイテレータを返す | |


### オブザーバー

| 名前 | 説明 | 対応バージョン |
|-------------------------------------|--------------------------|-------|
| [`key_comp`](set/key_comp.md)     | �ーを比較した結果を返す | |
| [`value_comp`](set/value_comp.md) | 値を比較した結果を返す   | |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|--------------------------|--------------------------------------------|-------|
| `key_type`               | �ーの型。テンプレートパラメータ `Key`。 | |
| `value_type`             | 要素の型。テンプレートパラメータ `Key`。 | |
| `key_compare`            | �ーの大小関係を判定する二項述語の型。テンプレートパラメータ `Compare`。 | |
| `value_compare`          | 要素の大小関係を判定する二項述語の型。テンプレートパラメータ `Compare`。 | |
| `allocator_type`         | ア�ケータの型。テンプレートパラメータ `Allocator`。 | |
| `reference`              | 要素`value_type`への参照型。`value_type&`。 | |
| `const_reference`        | 要素`value_type`への`const`参照型。`const value_type&`。 | |
| `iterator`               | "�み取り専用"双方向イテレータ。<br/>`const_iterator` と同じ型か否かは実装依�である。<br/>従って、ODR（One Definition Rule）に違反しないようにするため、関数のパラメータ型には常に `const_iterator` を使用したほうが良いだろう。 | |
| `const_iterator`         | �み取り専用双方向イテレータ。 | |
| `size_type`              | 要素数を表す符号なし整数型。`difference_type` で表現可能な非負整数（0以上の整数）を表すことが可能。(通常は [`size_t`](/reference/cstddef/size_t.md)) | |
| `difference_type`        | 同一のコンテナを指す `iterator` の差を表す符号付き整数型(通常は [`ptrdiff_t`](/reference/cstddef/ptrdiff_t.md)) <br/>`std::`[`iterator_traits`](/reference/iterator/iterator_traits.md)`<iterator>::difference_type`、および、`std::`[`iterator_traits`](/reference/iterator/iterator_traits.md)`<const_iterator>::difference_type` と同じ。 | |
| `pointer`                | 要素 `value_type`へのポインタ。<br/> C++03 : `typename Allocator::pointer`。<br/> C++11以降 : `typename` [`allocator_traits`](/reference/memory/allocator_traits.md)`<Allocator>::pointer`。 | |
| `const pointer`          | 要素 `value_type`への`const`ポインタ。<br/> C++03 : `typename Allocator::const_pointer`。<br/> C++11以降 : `typename` [`allocator_traits`](/reference/memory/allocator_traits.md)`<Allocator>::const_pointer`。 | |
| `reverse_iterator` | 逆順双方向イテレータ。`std::`[`reverse_iterator`](/reference/iterator/reverse_iterator.md)`<iterator>`。 | |
| `const_reverse_iterator` | �み取り専用逆順双方向イテレータ。`std::`[`reverse_iterator`](/reference/iterator/reverse_iterator.md)`<const_iterator>`。 | |
| `node_type`              | [`node_handle`](/reference/node_handle/node_handle.md)クラステンプレートの特殊化。 | C++17          |
| `insert_return_type`     | ノードを挿入した結果を記述するために使用されるクラス型。以下に示す`insert-return-type`テンプレートの特殊化である。ただし、これは説明用のクラスであり、実装定義である。| C++17 |

```cpp
template <class Iterator, class NodeType>
struct insert-return-type {
  Iterator position;
  bool inserted;
  NodeType node;
};
```


## 非メンバ関数
### 比較演算�

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------|--------------------------------------------|-------|
| [`operator==`](set/op_equal.md)         | 左辺と右辺が�しいかの判定を行う | |
| [`operator!=`](set/op_not_equal.md)     | 左辺と右辺が�しくないかの判定を行う | |
| [`operator<`](set/op_less.md)           | 左辺が右辺より小さいかの判定を行う | |
| [`operator<=`](set/op_greater_equal.md) | 左辺が右辺より小さいか�しいかの判定を行う | |
| [`operator>`](set/op_greater.md)        | 左辺が右辺より大きいかの判定を行う | |
| [`operator>=`](set/op_greater_equal.md) | 左辺が右辺より大きいか�しいかの判定を行う | |


### 入れ替え

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`swap`](set/swap_free.md) | 2つの`set`オブジェクトを入れ替える | |


### 要素削除

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`erase_if`](set/erase_if_free.md) | 指定した条件に合致する要素とその分の領域を、コンテナから削除する | C++20 |


## 推論補助

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|------------------------------------|-------|
| [`(deduction_guide)`](set/op_deduction_guide.md) | クラステンプレートの推論補助 | C++17 |


## 例
```cpp example
#include <iostream>
#include <set>

int main()
{
  // intを�ーとして扱う集合
  std::set<int> s;

  // 挿入
  s.insert(3);
  s.insert(1);
  s.insert(4);

  // 検索 : �ー(int)を指定し、対応する値を得る
  decltype(s)::iterator it = s.find(1);
  if (it != s.end()) {
    // 発見した
    int value = *it;
    std::cout << value << std::endl;
  }
  else {
    std::cout << "not found" << std::endl;
  }
}
```
* std::set[color ff0000]
* s.insert[link set/insert.md]
* s.find[link set/find.md]
* s.end()[link set/end.md]

### 出力
```
1
```

