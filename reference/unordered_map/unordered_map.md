# unordered_map
* unordered_map[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class Key,
            class T,
            class Hash = std::hash<Key>,
            class Pred = std::equal_to<Key>,
            class Allocator = std::allocator<std::pair<const Key, T> > >
  class unordered_map;

  namespace pmr {
    template <class Key,
              class T,
              class Hash = hash<Key>,
              class Pred = equal_to<Key>>
      using unordered_map =
        std::unordered_map<Key, T, Hash, Pred,
                           polymorphic_allocator<pair<const Key, T>>>;  // C++17から

  }
}
```
* std::hash[link /reference/functional/hash.md]
* std::equal_to[link /reference/functional/equal_to.md]
* std::allocator[link /reference/memory/allocator.md]
* polymorphic_allocator[link /reference/memory_resource/polymorphic_allocator.md]

## 概要
`unordered_map` は、同一�ーの要素を複数格納できず、格納順が規定されていないコンテナである。

一般的には `hash map` と呼ばれるコンテナであるが、標準への採用が遅かったことから、既に�在する各種コンテナとの名前の衝突を避けるため、`unordered_map` と名付けられた。

`unordered_map` の特徴は以下の通りである。

- 連想  
標準の配列や `std::`[`vector`](/reference/vector.md) と異なり、コンテナ内の要素へのアクセスは絶対的な位置（添え�）によるのではなく、�ーによる。
- 非順序  
コンテナ内の各要素は、�ーのハッシュ値に基づきハッシュテーブルに格納されるため、決められた順序で並んでいるわけではない。
- マップ（map）  
�ーと、それに対応する値がペアとなった要素を持ち、かつ、同一の�ー値を格納することはできない。


テンプレートパラメータ `Hash` は、以下に示す Hash requirements を満たし、テンプレートパラメータ `Key` のハッシュ関数として振る舞わなければならない。


- 関数オブジェクト型である。
- CopyConstructible requirements と Destructible requirements の要件を満たす。
- `h` を `Hash` 型のオブジェクト、`Key` を `Hash` 型のオブジェクトの引数の型、`u` を `Key` 型の左辺値、`k` を `Key` 型（あるいは `const Key` 型）に変換可能な値とすると、以下の要件を満たす。
	- `h(k)` は戻り値の型が `std::`[`size_t`](/reference/cstddef/size_t.md) で、戻り値は引数 `k` のみにしかよらない
	- `h(u)` は `u` を変更しない

テンプレートパラメータ `Pred` は二項述語で、テンプレート引数 `Key` に対する同値関係でなければならない。

テンプレートパラメータ `Allocator` は、Allocator requirements を満たさなければならない。


## メンバ関数
### 構築／コピー／破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](unordered_map/op_constructor.md) | コンストラクタ | C++11 |
| [`(destructor)`](unordered_map/op_destructor.md)   | デストラクタ   | C++11 |
| [`operator=`](unordered_map/op_assign.md)          | 代入演算�     | C++11 |


### 領域

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`empty`](unordered_map/empty.md)       | コンテナが空かどうかを判定   | C++11 |
| [`size`](unordered_map/size.md)         | 要素数の取得                 | C++11 |
| [`max_size`](unordered_map/max_size.md) | 格納可能な最大の要素数の取得 | C++11 |


### イテレータ

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`begin`](unordered_map/begin.md)   | 先�要素を指すイテレータの取得                 | C++11 |
| [`end`](unordered_map/end.md)       | 最終要素の次を指すイテレータの取得             | C++11 |
| [`cbegin`](unordered_map/cbegin.md) | 先�要素を指す�み取り専用イテレータの取得     | C++11 |
| [`cend`](unordered_map/cend.md)     | 最終要素の次を指す�み取り専用イテレータの取得 | C++11 |


### ア�ケータ

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`get_allocator`](unordered_map/get_allocator.md) | ア�ケータオブジェクトの取得 | C++11 |


### コンテナの変更

| 名前                                                    | 説明                                                   | 対応バージョン |
|---------------------------------------------------------|--------------------------------------------------------|----------------|
| [`emplace`](unordered_map/emplace.md)                   | コンテナ内への要素の直接構築                           | C++11          |
| [`emplace_hint`](unordered_map/emplace_hint.md)         | 挿入位置のヒントを使用したコンテナ内への要素の直接構築 | C++11          |
| [`try_emplace`](unordered_map/try_emplace.md)           | �ーが�在しない場合のみコンテナ内への要素の直接構築   | C++17          |
| [`insert`](unordered_map/insert.md)                     | 要素の追加                                             | C++11          |
| [`insert_or_assign`](unordered_map/insert_or_assign.md) | 要素の追加、あるいは代入                               | C++17          |
| [`erase`](unordered_map/erase.md)                       | 要素の削除                                             | C++11          |
| [`clear`](unordered_map/clear.md)                       | 全要素の削除                                           | C++11          |
| [`swap`](unordered_map/swap.md)                         | 内容の交換                                             | C++11          |
| [`extract`](unordered_map/extract.md)                   | ノードハンドルを取得する                                | C++17            |
| [`merge`](unordered_map/merge.md)                       | 他のオブジェクトの要素をマージする                       | C++17            |


### オブザーバー

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`hash_function`](unordered_map/hash_function.md) | ハッシュ関数オブジェクトの取得   | C++11 |
| [`key_eq`](unordered_map/key_eq.md)               | �ー比較用関数オブジェクトの取得 | C++11 |


### 検索

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`find`](unordered_map/find.md)               | 指定した�ーの位置を検索   | C++11 |
| [`count`](unordered_map/count.md)             | 指定した�ーの要素数を取得 | C++11 |
| [`contains`](unordered_map/contains.md)       | 指定した�ーの要素が含まれているかを判定する | C++20 |
| [`equal_range`](unordered_map/equal_range.md) | 指定した�ーの範囲を取得   | C++11 |
| [`operator[]`](unordered_map/op_at.md)        | 要素の値へのアクセス       | C++11 |
| [`at`](unordered_map/at.md)                   | 要素の値へのアクセス       | C++11 |


### バケットインタフェース

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`bucket_count`](unordered_map/bucket_count.md)          | バケット数の取得                                                                           | C++11 |
| [`max_bucket_count`](unordered_map/max_bucket_count.md)  | 最大バケット数の取得                                                                       | C++11 |
| [`bucket_size`](unordered_map/bucket_size.md)            | インデックス（添え�）で指定したバケット内の要素数を取得                                   | C++11 |
| [`bucket`](unordered_map/bucket.md)                      | �ーで指定したバケットのインデックス（添え�）を取得                                       | C++11 |
| [`begin(size_type)`](unordered_map/begin-size_type.md)   | インデックス（添え�）で指定したバケット内の先�要素を指すイテレータを取得                 | C++11 |
| [`end(size_type)`](unordered_map/end-size_type.md)       | インデックス（添え�）で指定したバケット内の最終要素の次を指すイテレータを取得             | C++11 |
| [`cbegin(size_type)`](unordered_map/cbegin-size_type.md) | インデックス（添え�）で指定したバケット内の先�要素を指す�み取り専用イテレータを取得     | C++11 |
| [`cend(size_type)`](unordered_map/cend-size_type.md)     | インデックス（添え�）で指定したバケット内の最終要素の次を指す�み取り専用イテレータを取得 | C++11 |


### ハッシュポリシー

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`load_factor`](unordered_map/load_factor.md)         | 現在の負荷率（バケットあたりの要素数の平均）を取得 | C++11 |
| [`max_load_factor`](unordered_map/max_load_factor.md) | 負荷率の最大値を取得、�定                         | C++11 |
| [`rehash`](unordered_map/rehash.md)                   | 最小バケット数指定によるバケット数の調整           | C++11 |
| [`reserve`](unordered_map/reserve.md)                 | 最小要素数指定によるバケット数の調整               | C++11 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `key_type`             | �ーの型。テンプレートパラメータ `Key`。 | C++11 |
| `value_type`           | 要素の型。`std::`[`pair`](/reference/utility/pair.md)`<const Key, T>`。 | C++11 |
| `mapped_type`          | 値の型。テンプレートパラメータ `T`。 | C++11 |
| `hasher`               | �ーのハッシュ関数の型。テンプレートパラメータ `Hash`。 | C++11 |
| `key_equal`            | �ーが�値か否かを判�するための二項述語の型。<br/> C++11 : テンプレートパラメータ `Pred`。<br/> C++20 : `Hash::transparent_key_equal`が定義されていたらその別名、そうでなければテンプレートパラメータ`Pred`を使用する。`Hash::transparent_key_equal`が定義されている場合、`Hash::transparent_key_equal::is_transparent`が定義されていなければプ�グラムは不適格となる | C++11 |
| `allocator_type`       | ア�ケータの型。テンプレートパラメータ `Allocator`。 | C++11 |
| `pointer`              | 要素 `value_type`（`= std::`[`pair`](/reference/utility/pair.md)`<const Key, T>`）へのポインタ。スマートポインタも可であるが、通常は `value_type*`。<br/>規格書では、`allocator_type::pointer` となっているが、これは規格書の誤りで、ドラフト [N3376](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3376.pdf) で既に `std::`[`allocator_traits`](/reference/memory/allocator_traits.md)`<Allocator>::pointer` に修�されている。<br/>（さもないと、必須である `allocator_type::value_type` のみを定義したユーザ定義のア�ケータを使用することができないため） | C++11 |
| `const_pointer`        | 要素 `value_type`（`= std::`[`pair`](/reference/utility/pair.md)`<const Key, T>`）へのコンストポインタ。スマートポインタも可であるが、通常は `const value_type*`。<br/>規格書では、`allocator_type::const_pointer` となっているが、これは規格書の誤りで、ドラフト [N3376](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3376.pdf) で既に `std::`[`allocator_traits`](/reference/memory/allocator_traits.md)`<Allocator>::const_pointer` に修�されている。<br/>（さもないと、必須である `allocator_type::value_type` のみを定義したユーザ定義のア�ケータを使用することができないため） | C++11 |
| `reference`            | 要素 `value_type`（`= std::`[`pair`](/reference/utility/pair.md)`<const Key, T>`）への参照。<br/>規格書では、`allocator_type::reference` となっているが、これは規格書の誤りで、ドラフト [N3376](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3376.pdf) で既に `value_type&` に修�されている。<br/>（さもないと、必須である `allocator_type::value_type` のみを定義したユーザ定義のア�ケータを使用することができないため） | C++11 |
| `const_reference`      | 要素 `value_type`（`= std::`[`pair`](/reference/utility/pair.md)`<const Key, T>`）へのコンスト参照。<br/>規格書では、`allocator_type::const_reference` となっているが、これは規格書の誤りで、ドラフト [N3376](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3376.pdf) で既に `const value_type&` に修�されている。<br/>（さもないと、必須である `allocator_type::value_type` のみを定義したユーザ定義のア�ケータを使用することができないため） | C++11 |
| `size_type`            | 要素数を表す符号なし整数型。`difference_type` で表現可能な非負整数（0以上の整数）を表すことが可能。(通常は [`size_t`](/reference/cstddef/size_t.md)) | C++11 |
| `difference_type`      | 同一のコンテナを指す `iterator` の差を表す符号付き整数型(通常は [`ptrdiff_t`](/reference/cstddef/ptrdiff_t.md)) <br/>`std::`[`iterator_traits`](/reference/iterator/iterator_traits.md)`<iterator>::difference_type`、および、`std::`[`iterator_traits`](/reference/iterator/iterator_traits.md)`<const_iterator>::difference_type` と同じ。 | C++11 |
| `iterator`             | 前方向イテレータ | C++11 |
| `const_iterator`       | �み取り専用前方向イテレータ | C++11 |
| `local_iterator`       | 同一バケット内のみで有効なイテレータ。<br/>規格書には記載はないが、`iterator` と同様）`const_local_iterator` と同じ型か否かは実装依�であるものと思われる。<br/>`iterator` と、`iterator_category`、`value_type`、`difference_type`、`pointer`、`reference` は同一である。 | C++11 |
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
| [`operator==`](unordered_map/op_equal.md)     | �値比較   | C++11 |
| [`operator!=`](unordered_map/op_not_equal.md) | 非�値比較 | C++11 |


### 入れ替え

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`swap`](unordered_map/swap_free.md) | 内容の交換 | C++11 |


### 要素削除

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`erase_if`](unordered_map/erase_if_free.md) | 指定した条件に合致する要素とその分の領域を、コンテナから削除する | C++20 |


## 推論補助

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|------------------------------------|-------|
| [`(deduction_guide)`](unordered_map/op_deduction_guide.md) | クラステンプレートの推論補助 | C++17 |


## 例

```cpp example
#include <iostream>
#include <unordered_map>
#include <iterator>
#include <algorithm>
#include <string>

template <class C>
void print(const C& c, std::ostream& os = std::cout)
{
  std::for_each(std::begin(c), std::end(c), [&os](typename C::value_type p) { os << '{' << p.first << ',' << p.second << "}, "; });
  os << std::endl;
}

int main()
{
  std::unordered_map<std::string, int> um{ {"1st", 1}, {"2nd", 2}, {"3rd", 3}, };

  print(um);

  std::cout << "3rd:" << um.at("3rd") << std::endl;

  um.emplace("4th", 4);

  print(um);

  um.erase("2nd");

  print(um);

  std::cout << "5th:" << um["5th"] << std::endl;

  print(um);
}
```
* std::unordered_map[color ff0000]
* std::ostream[link /reference/ostream/basic_ostream.md]
* um.at[link unordered_map/at.md]
* um.emplace[link unordered_map/emplace.md]
* um.erase[link unordered_map/erase.md]
* um["5th"][link unordered_map/op_at.md]


### 出力
```
{2nd,2}, {3rd,3}, {1st,1},
3rd:3
{4th,4}, {2nd,2}, {3rd,3}, {1st,1},
{4th,4}, {3rd,3}, {1st,1},
5th:0
{5th,0}, {4th,4}, {3rd,3}, {1st,1},
```


## バージョン
### 言語
- C++11


## 参照
- [Unordered associative containers do not use allocator_traits to define member types](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2050) （上記の `pointer`、`const_pointer`、`reference`、`const_reference` の問題に対する修�案）
- [P0919R3 Heterogeneous lookup for unordered containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0919r3.html)

