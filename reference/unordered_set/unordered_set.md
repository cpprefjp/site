# unordered_set
* unordered_set[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class Key,
            class Hash = std::hash<Key>,
            class Pred = std::equal_to<Key>,
            class Allocator = std::allocator<Key> >
  class unordered_set;

  namespace pmr {
    template <class Key,
              class Hash = hash<Key>,
              class Pred = equal_to<Key>>
      using unordered_set = std::unordered_set<Key, Hash, Pred,
                                               polymorphic_allocator<Key>>;  // C++17から
  }
}
```
* std::hash[link /reference/functional/hash.md]
* std::equal_to[link /reference/functional/equal_to.md]
* std::allocator[link /reference/memory/allocator.md]
* polymorphic_allocator[link /reference/memory_resource/polymorphic_allocator.md]

## 概要
`unordered_set` は、同一�ーの要素を複数格納できず、格納順が規定されていないコンテナである。

一般的には `hash set` と呼ばれるコンテナであるが、標準への採用が遅かったことから、既に�在する各種コンテナとの名前の衝突を避けるため、`unordered_set` と名付けられた。

`unordered_set` の特徴は以下の通りである。

- 連想  
標準の配列や `std::`[`vector`](/reference/vector.md) と異なり、コンテナ内の要素へのアクセスは絶対的な位置（添え�）によるのではなく、�ーによる。
- 非順序  
コンテナ内の各要素は、�ーのハッシュ値に基づきハッシュテーブルに格納されるため、決められた順序で並んでいるわけではない。
- セット（set）  
�ーそのものが要素でもあり、かつ、同一の�ー値を格納することはできない。


テンプレートパラメータ `Hash` は、以下に示す Hash requirements を満たし、テンプレートパラメータ `Key` のハッシュ関数として振る舞わなければならない。


- 関数オブジェクト型である。
- CopyConstructible requirements と Destructible requirements の要件を満たす。
- `h` を `Hash` 型のオブジェクト、`Key` を `Hash` 型のオブジェクトの引数の型、`u` を `Key` 型の lvalue、`k` を `Key` 型（あるいは `const Key` 型）に変換可能な値とすると、以下の要件を満たす。
	- `h(k)` は戻り値の型が `std::`[`size_t`](/reference/cstddef/size_t.md) で、戻り値は引数 `k` のみにしかよらない
	- `h(u)` は `u` を変更しない

テンプレートパラメータ `Pred` は二項述語で、テンプレートパラメータ `Key` に対する同値関係でなければならない。

テンプレートパラメータ `Allocator` は、Allocator requirements を満たさなければならない。


## メンバ関数
### 構築／コピー／破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](unordered_set/op_constructor.md) | コンストラクタ | C++11 |
| [`(destructor)`](unordered_set/op_destructor.md)   | デストラクタ   | C++11 |
| [`operator=`](unordered_set/op_assign.md)          | 代入演算�     | C++11 |


### 領域

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`empty`](unordered_set/empty.md)       | コンテナが空かどうかを判定   | C++11 |
| [`size`](unordered_set/size.md)         | 要素数の取得                 | C++11 |
| [`max_size`](unordered_set/max_size.md) | 格納可能な最大の要素数の取得 | C++11 |


### イテレータ

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`begin`](unordered_set/begin.md)   | 先�要素を指すイテレータの取得                 | C++11 |
| [`end`](unordered_set/end.md)       | 最終要素の次を指すイテレータの取得             | C++11 |
| [`cbegin`](unordered_set/cbegin.md) | 先�要素を指す�み取り専用イテレータの取得     | C++11 |
| [`cend`](unordered_set/cend.md)     | 最終要素の次を指す�み取り専用イテレータの取得 | C++11 |


### ア�ケータ

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`get_allocator`](unordered_set/get_allocator.md) | ア�ケータオブジェクトの取得 | C++11 |


### コンテナの変更

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`emplace`](unordered_set/emplace.md)           | コンテナ内への要素の直接構築                           | C++11 |
| [`emplace_hint`](unordered_set/emplace_hint.md) | 挿入位置のヒントを使用したコンテナ内への要素の直接構築 | C++11 |
| [`insert`](unordered_set/insert.md)             | 要素の追加                                             | C++11 |
| [`erase`](unordered_set/erase.md)               | 要素の削除                                             | C++11 |
| [`clear`](unordered_set/clear.md)               | 全要素の削除                                           | C++11 |
| [`swap`](unordered_set/swap.md)                 | 内容の交換                                             | C++11 |
| [`extract`](unordered_set/extract.md)           | ノードハンドルを取得する                                | C++17 |
| [`merge`](unordered_set/merge.md)               | 他のオブジェクトの要素をマージする                       | C++17 |


### オブザーバー

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`hash_function`](unordered_set/hash_function.md) | ハッシュ関数オブジェクトの取得   | C++11 |
| [`key_eq`](unordered_set/key_eq.md)               | �ー比較用関数オブジェクトの取得 | C++11 |


### 検索

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`find`](unordered_set/find.md)               | 指定した�ーの位置を検索   | C++11 |
| [`count`](unordered_set/count.md)             | 指定した�ーの要素数を取得 | C++11 |
| [`contains`](unordered_set/contains.md)       | 指定した�ーの要素が含まれているかを判定する | C++20 |
| [`equal_range`](unordered_set/equal_range.md) | 指定した�ーの範囲を取得   | C++11 |


### バケットインタフェース

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`bucket_count`](unordered_set/bucket_count.md)          | バケット数の取得                                                                           | C++11 |
| [`max_bucket_count`](unordered_set/max_bucket_count.md)  | 最大バケット数の取得                                                                       | C++11 |
| [`bucket_size`](unordered_set/bucket_size.md)            | インデックス（添え�）で指定したバケット内の要素数を取得                                   | C++11 |
| [`bucket`](unordered_set/bucket.md)                      | �ーで指定したバケットのインデックス（添え�）を取得                                       | C++11 |
| [`begin(size_type)`](unordered_set/begin-size_type.md)   | インデックス（添え�）で指定したバケット内の先�要素を指すイテレータを取得                 | C++11 |
| [`end(size_type)`](unordered_set/end-size_type.md)       | インデックス（添え�）で指定したバケット内の最終要素の次を指すイテレータを取得             | C++11 |
| [`cbegin(size_type)`](unordered_set/cbegin-size_type.md) | インデックス（添え�）で指定したバケット内の先�要素を指す�み取り専用イテレータを取得     | C++11 |
| [`cend(size_type)`](unordered_set/cend-size_type.md)     | インデックス（添え�）で指定したバケット内の最終要素の次を指す�み取り専用イテレータを取得 | C++11 |


### ハッシュポリシー

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`load_factor`](unordered_set/load_factor.md)         | 現在の負荷率（バケットあたりの要素数の平均）を取得 | C++11 |
| [`max_load_factor`](unordered_set/max_load_factor.md) | 負荷率の最大値を取得、�定                         | C++11 |
| [`rehash`](unordered_set/rehash.md)                   | 最小バケット数指定によるバケット数の調整           | C++11 |
| [`reserve`](unordered_set/reserve.md)                 | 最小要素数指定によるバケット数の調整               | C++11 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `key_type`             | �ーの型。テンプレートパラメータ `Key`。 | C++11 |
| `value_type`           | 要素の型。テンプレートパラメータ `Key`。 | C++11 |
| `hasher`               | �ーのハッシュ関数の型。テンプレートパラメータ `Hash`。 | C++11 |
| `key_equal`            | �ーが�値か否かを判�するための二項述語の型。<br/> C++11 : テンプレートパラメータ `Pred`。<br/> C++20 : `Hash::transparent_key_equal`が定義されていたらその別名、そうでなければテンプレートパラメータ`Pred`を使用する。`Hash::transparent_key_equal`が定義されている場合、`Hash::transparent_key_equal::is_transparent`が定義されていなければプ�グラムは不適格となる | C++11 |
| `allocator_type`       | ア�ケータの型。テンプレートパラメータ `Allocator`。 | C++11 |
| `pointer`              | 要素 `value_type`（`= Key`） へのポインタ。スマートポインタも可であるが、通常は `value_type*`。<br/>規格書では、`allocator_type::pointer` となっているが、これは規格書の誤りで、ドラフト [N3376](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3376.pdf) で既に `std::`[`allocator_traits`](/reference/memory/allocator_traits.md)`<Allocator>::pointer` に修�されている。<br/>（さもないと、必須である `allocator_type::value_type` のみを定義したユーザ定義のア�ケータを使用することができないため） | C++11 |
| `const_pointer`        | 要素 `value_type`（`= Key`） へのコンストポインタ。スマートポインタも可であるが、通常は `const value_type*`。<br/>規格書では、`allocator_type::const_pointer` となっているが、これは規格書の誤りで、ドラフト [N3376](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3376.pdf) で既に `std::`[`allocator_traits`](/reference/memory/allocator_traits.md)`<Allocator>::const_pointer` に修�されている。<br/>（さもないと、必須である `allocator_type::value_type` のみを定義したユーザ定義のア�ケータを使用することができないため） | C++11 |
| `reference`            | 要素 `value_type`（`= Key`） への参照。<br/>規格書では、`allocator_type::reference` となっているが、これは規格書の誤りで、ドラフト [N3376](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3376.pdf) で既に `value_type&` に修�されている。<br/>（さもないと、必須である `allocator_type::value_type` のみを定義したユーザ定義のア�ケータを使用することができないため） | C++11 |
| `const_reference`      | 要素 `value_type`（`= Key`） へのコンスト参照。<br/>規格書では、`allocator_type::const_reference` となっているが、これは規格書の誤りで、ドラフト [N3376](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3376.pdf) で既に `const value_type&` に修�されている。<br/>（さもないと、必須である `allocator_type::value_type` のみを定義したユーザ定義のア�ケータを使用することができないため） | C++11 |
| `size_type`            | 要素数を表す符号なし整数型。`difference_type`で表現可能な非負整数（0以上の整数）を表すことが可能。(通常は[`size_t`](/reference/cstddef/size_t.md)) | C++11 |
| `difference_type`      | 同一のコンテナを指す `iterator` の差を表す符号付き整数型(通常は[`ptrdiff_t`](/reference/cstddef/ptrdiff_t.md)) <br/>`std::`[`iterator_traits`](/reference/iterator/iterator_traits.md)`<iterator>::difference_type`、および、`std::`[`iterator_traits`](/reference/iterator/iterator_traits.md)`<const_iterator>::difference_type` と同じ。 | C++11 |
| `iterator`             | "�み取り専用"前方向イテレータ（誤植ではない）<br/>規格書に記載はないが、（連想コンテナがそうであるように）`const_iterator` と同じ型か否かは実装依�であるものと思われる。<br/>従って、ODR（One Definition Rule）に違反しないようにするため、関数のパラメータ型には常に `const_iterator` を使用したほうが良いだろう。 | C++11 |
| `const_iterator`       | �み取り専用前方向イテレータ | C++11 |
| `local_iterator`       | 同一バケット内のみで有効なイテレータ。<br/>規格書に記載はないが、（`iterator` と同様）`const_local_iterator` と同じ型か否かは実装依�であるものと思われる。<br/>`iterator` と、`iterator_category`、`value_type`、`difference_type`、`pointer`、`reference` は同一である。 | C++11 |
| `const_local_iterator` | 同一バケット内のみで有効な�み取り専用イテレータ。<br/>`const_iterator` と、`iterator_category`、`value_type`、`difference_type`、`pointer`、`reference` は同一である。 | C++11 |
| `node_type`            | [`node_handle`](/reference/node_handle/node_handle.md)クラステンプレートの特殊化。 | C++17 |
| `insert_return_type`   | ノードを挿入した結果を記述するために使用されるクラス型。以下に示す`insert-return-type`テンプレートの特殊化である。ただし、これは説明用のクラスであり、実装定義である。| C++17 |

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
|------|------|----------------|
| [`operator==`](unordered_set/op_equal.md)     | �値比較   | C++11 |
| [`operator!=`](unordered_set/op_not_equal.md) | 非�値比較 | C++11 |


### 入れ替え

| 名前 | 説明 | 対応バージョン |
|------|------|----------------
| [`swap`](unordered_set/swap_free.md) | 内容の交換 | C++11 |


### 要素削除

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`erase_if`](unordered_set/erase_if_free.md) | 指定した条件に合致する要素とその分の領域を、コンテナから削除する | C++20 |


## 推論補助

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|------------------------------------|-------|
| [`(deduction_guide)`](unordered_set/op_deduction_guide.md) | クラステンプレートの推論補助 | C++17 |


## 例
```cpp example
#include <iostream>
#include <unordered_set>
#include <iterator>
#include <algorithm>
#include <string>

template <class C>
void print(const C& c, std::ostream& os = std::cout)
{
  std::copy(std::begin(c), std::end(c), std::ostream_iterator<typename C::value_type>(os, ", "));
  os << std::endl;
}

int main()
{
  std::unordered_set<std::string> us{ "1st element", "2nd element", "3rd element", };

  print(us);

  us.emplace("4th element");

  print(us);

  us.erase("2nd element");

  print(us);
}
```
* std::unordered_set[color ff0000]
* std::ostream[link /reference/ostream.md]
* us.emplace[link unordered_set/emplace.md]
* us.erase[link unordered_set/erase.md]

### 出力
```
3rd element, 2nd element, 1st element, 
4th element, 3rd element, 2nd element, 1st element, 
4th element, 3rd element, 1st element, 
```

## バージョン
### 言語
- C++11

## 参照
- [Unordered associative containers do not use allocator_traits to define member types](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2050) （上記の `pointer`、`const_pointer`、`reference`、`const_reference` の問題に対する修�案）
- [P0919R3 Heterogeneous lookup for unordered containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0919r3.html)

