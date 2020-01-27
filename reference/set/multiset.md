# multiset
* set[meta header]
* std[meta namespace]
* class[meta id-type]

```cpp
namespace std {
  template <class Key, class Compare = less<Key>, class Allocator = allocator<Key>>
  class multiset;

  namespace pmr {
    template <class Key, class Compare = less<Key>>
      using multiset = std::multiset<Key, Compare,
                                     polymorphic_allocator<Key>>;  // C++17から
  }
}
```
* less[link /reference/functional/less.md]
* allocator[link /reference/memory/allocator.md]
* polymorphic_allocator[link /reference/memory_resource/polymorphic_allocator.md]


`multiset` は連想コンテナの一種であり、要素自身が�ーとなる。

連想コンテナは特にそれら�ーによる要素アクセスが効率的になるよう�計されたコンテナである（要素への相対位置または絶対位置によるアクセスが効率的であるシーケンシャルコンテナとは異なる）。

内部的には、`multiset` 内の要素は、コンテナの構築時に�定された[�義の弱順序](/reference/algorithm.md#strict-weak-ordering)基準に従って小さいものから大きいものへとソートされる。 

[`set`](set.md)が重複�ーを許可しないのに対し、`multiset`は重複�ーを許可する。

`set`とは違い、[`find()`](multiset/find.md)メンバ関数は、�ーに合致した最初の要素へのイテレータを返し、[`count()`](multiset/count.md)メンバ関数は�ーに合致する要素数を返す。


このコンテナクラスは、双方向イテレータをサポートする。

各テンプレートパラメータは以下のような意味である。

- `Key`: �ーの型。このコンテナに格納されれる要素の型。`multiset` に格納される要素はそれぞれは�ーでもある。
- `Compare`: 比較クラス。このクラスは 2 つの引数（同じ型であり、コンテナの要素型でもある）をとり `bool` 値を返す。[�義の弱順序](/reference/algorithm.md#strict-weak-ordering)において `a` が `b` よりも前の場所に位置づけられる場合に `true` である。これはクラスが関数呼び出しオブジェクトを実装したクラスであっても良いし関数ポインタであっても良い（例は コンストラクタ を参照）。これは、`operator<()` を適用( `a < b` )したときと同じ値を返す [`less`](/reference/functional/less.md)`<Key>` がデフォルトである。
- `Allocator`: ストレージア�ケーションモデルを決定づける、ア�ケータオブジェクトの型である。デフォルトでは、`Key` への [`allocator`](/reference/memory/allocator.md) クラステンプレート（これは値に依�しないシンプルなメモリ確保モデルを定義する）が使われる。


## メンバ関数
### 構築・破棄

| 名前 | 説明 | 対応バージョン |
|---------------------------------|----------------|-------|
| [`(constructor)`](multiset/op_constructor.md) | コンストラクタ | |
| [`(destructor)`](multiset/op_destructor.md) | デストラクタ | |
| [`operator=`](multiset/op_assign.md) | 代入演算� | |
| [`get_allocator`](multiset/get_allocator.md) | ア�ケータオブジェクトを取得する | |


### イテレータ

| 名前 | 説明 | 対応バージョン |
|-------------------------------|----------------------------------------------|-------|
| [`begin`](multiset/begin.md)     | 先�を指すイテレータを取得する               | |
| [`cbegin`](multiset/cbegin.md)   | 先�を指す�み取り専用イテレータを取得する   | C++11 |
| [`end`](multiset/end.md)         | 末尾を指すイテレータを取得する               | |
| [`cend`](multiset/cend.md)       | 末尾を指す�み取り専用イテレータを取得する   | C++11 |
| [`rbegin`](multiset/rbegin.md)   | 末尾を指す逆イテレータを取得する             | |
| [`crbegin`](multiset/crbegin.md) | 末尾を指す�み取り専用逆イテレータを取得する | C++11 |
| [`rend`](multiset/rend.md)       | 先�を指す逆イテレータを取得する             | |
| [`crend`](multiset/crend.md)     | 先�を指す�み取り専用逆イテレータを取得する | C++11 |


### 領域

| 名前 | 説明 | 対応バージョン |
|---------------------------------|----------------------------------------------|-------|
| [`empty`](multiset/empty.md)       | コンテナが空であるかどうかを調べる | |
| [`size`](multiset/size.md)         | 要素数を取得する | |
| [`max_size`](multiset/max_size.md) | 格納可能な最大の要素数を取得する | |


### コンテナの変更

| 名前 | 説明 | 対応バージョン |
|---------------------------------|------------------------------------------|-------|
| [`clear`](multiset/clear.md)               | 全ての要素を削除する             | |
| [`insert`](multiset/insert.md)             | 要素を挿入する                   | |
| [`emplace`](multiset/emplace.md)           | 要素を直接構築する               | C++11 |
| [`emplace_hint`](multiset/emplace_hint.md) | ヒントを使って要素を直接構築する | C++11 |
| [`erase`](multiset/erase.md)               | 要素を削除する                   |
| [`swap`](multiset/swap.md)                 | コンテンツを交換する             |
| [`extract`](multiset/extract.md)           | ノードハンドルを取得する         | C++17 |
| [`merge`](multiset/merge.md)               | 他のオブジェクトの要素をマージする | C++17 |


### 要素アクセス

| 名前 | 説明 | 対応バージョン |
|---------------------------------------|----------------------------------------|-------|
| [`count`](multiset/count.md)             | 指定した�ーにマッチする要素の数を返す | |
| [`find`](multiset/find.md)               | 指定した�ーで要素を探す | |
| [`contains`](multiset/contains.md)       | 指定した�ーの要素が含まれているかを判定する | C++20 |
| [`equal_range`](multiset/equal_range.md) | 指定した�ーにマッチする要素範囲を返す | |
| [`lower_bound`](multiset/lower_bound.md) | 与えられた値より小さくない最初の要素へのイテレータを返す | |
| [`upper_bound`](multiset/upper_bound.md) | 特定の値よりも大きい最初の要素へのイテレータを返す | |


### オブザーバー

| 名前 | 説明 | 対応バージョン |
|-------------------------------------|--------------------------|-------|
| [`key_comp`](multiset/key_comp.md)     | �ーを比較した結果を返す | |
| [`value_comp`](multiset/value_comp.md) | 値を比較した結果を返す   | |


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
| `node_type`              | [`node_handle`](/reference/node_handle/node_handle.md)クラステンプレートの特殊化。 | C++17 |


## 非メンバ関数
### 比較演算�

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------|--------------------------------------------|-------|
| [`operator==`](multiset/op_equal.md)         | 左辺と右辺が�しいかの判定を行う | |
| [`operator!=`](multiset/op_not_equal.md)     | 左辺と右辺が�しくないかの判定を行う | |
| [`operator<`](multiset/op_less.md)           | 左辺が右辺より小さいかの判定を行う | |
| [`operator<=`](multiset/op_greater_equal.md) | 左辺が右辺より小さいか�しいかの判定を行う | |
| [`operator>`](multiset/op_greater.md)        | 左辺が右辺より大きいかの判定を行う | |
| [`operator>=`](multiset/op_greater_equal.md) | 左辺が右辺より大きいか�しいかの判定を行う | |


### 入れ替え

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`swap`](multiset/swap_free.md) | 2つの`multiset`オブジェクトを入れ替える | |


### 要素削除

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`erase_if`](multiset/erase_if_free.md) | 指定した条件に合致する要素とその分の領域を、コンテナから削除する | C++20 |


## 推論補助

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|------------------------------------|-------|
| [`(deduction_guide)`](multiset/op_deduction_guide.md) | クラステンプレートの推論補助 | C++17 |


## 例
```cpp example
#include <iostream>
#include <set>

int main()
{
  // intを�ーとして扱う集合
  std::multiset<int> s;

  // 挿入
  s.insert(3);
  s.insert(1);
  s.insert(4);
  s.insert(1); // �ーを重複させることが可能

  // �ー1に該当する要素数を取得する
  std::size_t count = s.count(1);

  // 検索 : �ー(int)を指定し、対応する値を得る
  decltype(s)::iterator it = s.find(1);
  if (it != s.end()) {
    // 発見した
    // 同じ�ーの要素を全て列挙する
    for (std::size_t i = 0; i < count; ++i) {
      int value = *it;
      std::cout << value << std::endl;
      ++it;
    }
  }
  else {
    std::cout << "not found" << std::endl;
  }
}
```
* std::multiset[color ff0000]
* s.insert[link set/insert.md]
* s.count[link set/count.md]
* s.find[link set/find.md]
* s.end()[link set/end.md]

### 出力
```
1
1
```

