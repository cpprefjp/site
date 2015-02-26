#unordered_map (C++11)
* unordered_map[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class Key,
            class T,
            class Hash = std::hash<Key>,
            class Pred = std::equal_to<Key>,
            class Allocator = std::allocator<std::pair<const Key, T> > >
  class unordered_map;
}
```
* hash[link /reference/functional/hash.md]
* equal_to[link /reference/functional/equal_to.md]
* allocator[link /reference/memory/allocator.md]
* pair[link /reference/utility/pair.md]

##概要
`unordered_map` は、同一キーの要素を複数格納できず、格納順が規定されていないコンテナである。

一般的には `hash map` と呼ばれるコンテナであるが、標準への採用が遅かったことから、既に存在する各種コンテナとの名前の衝突を避けるため、`unordered_map` と名付けられた。

`unordered_map` の特徴は以下の通りである。

- 連想  
標準の配列や `std::`[`vector`](/reference/vector.md) と異なり、コンテナ内の要素へのアクセスは絶対的な位置（添え字）によるのではなく、キーによる。
- 非順序  
コンテナ内の各要素は、キーのハッシュ値に基づきハッシュテーブルに格納されるため、決められた順序で並んでいるわけではない。
- マップ（map）  
キーと、それに対応する値がペアとなった要素を持ち、かつ、同一のキー値を格納することはできない。


テンプレートパラメータ `Hash` は、以下に示す Hash requirements を満たし、テンプレートパラメータ `Key` のハッシュ関数として振る舞わなければならない。


- 関数オブジェクト型である。
- CopyConstructible requirements と Destructible requirements の要件を満たす。
- `h` を `Hash` 型のオブジェクト、`Key` を `Hash` 型のオブジェクトの引数の型、`u` を `Key` 型の左辺値、`k` を `Key` 型（あるいは `const Key` 型）に変換可能な値とすると、以下の要件を満たす。
	- `h(k)` は戻り値の型が `std::size_t` で、戻り値は引数 `k` のみにしかよらない
	- `h(u)` は `u` を変更しない

テンプレートパラメータ `Pred` は二項述語で、テンプレート引数 `Key` に対する同値関係でなければならない。

テンプレートパラメータ `Allocator` は、Allocator requirements を満たさなければならない。


##メンバ関数
###構築／コピー／破棄

|                                                     |                |
|-----------------------------------------------------|----------------|
| [`(constructor)`](./unordered_map/op_constructor.md) | コンストラクタ |
| [`(destructor)`](./unordered_map/op_destructor.md) | デストラクタ   |
| [`operator=`](./unordered_map/op_assign.md)         | 代入演算子     |


###領域

|                                           |                              |
|-------------------------------------------|------------------------------|
| [`empty`](./unordered_map/empty.md)       | コンテナが空かどうかを判定   |
| [`size`](./unordered_map/size.md)         | 要素数の取得                 |
| [`max_size`](./unordered_map/max_size.md) | 格納可能な最大の要素数の取得 |


###イテレータ

|                                       |                                                |
|---------------------------------------|------------------------------------------------|
| [`begin`](./unordered_map/begin.md)   | 先頭要素を指すイテレータの取得                 |
| [`end`](./unordered_map/end.md)       | 最終要素の次を指すイテレータの取得             |
| [`cbegin`](./unordered_map/cbegin.md) | 先頭要素を指す読み取り専用イテレータの取得     |
| [`cend`](./unordered_map/cend.md)     | 最終要素の次を指す読み取り専用イテレータの取得 |


###アロケータ

|                                                     |                              |
|-----------------------------------------------------|------------------------------|
| [`get_allocator`](./unordered_map/get_allocator.md) | アロケータオブジェクトの取得 |


###コンテナの変更

|                                                   |                                                        |
|---------------------------------------------------|--------------------------------------------------------|
| [`emplace`](./unordered_map/emplace.md)           | コンテナ内への要素の直接構築                           |
| [`emplace_hint`](./unordered_map/emplace_hint.md) | 挿入位置のヒントを使用したコンテナ内への要素の直接構築 |
| [`insert`](./unordered_map/insert.md)             | 要素の追加                                             |
| [`erase`](./unordered_map/erase.md)               | 要素の削除                                             |
| [`clear`](./unordered_map/clear.md)               | 全要素の削除                                           |
| [`swap`](./unordered_map/swap.md)                 | 内容の交換                                             |


###オブザーバー

|                                                     |                                  |
|-----------------------------------------------------|----------------------------------|
| [`hash_function`](./unordered_map/hash_function.md) | ハッシュ関数オブジェクトの取得   |
| [`key_eq`](./unordered_map/key_eq.md)               | キー比較用関数オブジェクトの取得 |


###検索

|                                                 |                            |
|-------------------------------------------------|----------------------------|
| [`find`](./unordered_map/find.md)               | 指定したキーの位置を検索   |
| [`count`](./unordered_map/count.md)             | 指定したキーの要素数を取得 |
| [`equal_range`](./unordered_map/equal_range.md) | 指定したキーの範囲を取得   |
| [`operator[]`](./unordered_map/op_at.md)        | 要素の値へのアクセス       |
| [`at`](./unordered_map/at.md)                   | 要素の値へのアクセス       |


###バケットインタフェース

|                                                            |                                                                                            |
|------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| [`bucket_count`](./unordered_map/bucket_count.md)          | バケット数の取得                                                                           |
| [`max_bucket_count`](./unordered_map/max_bucket_count.md)  | 最大バケット数の取得                                                                       |
| [`bucket_size`](./unordered_map/bucket_size.md)            | インデックス（添え字）で指定したバケット内の要素数を取得                                   |
| [`bucket`](./unordered_map/bucket.md)                      | キーで指定したバケットのインデックス（添え字）を取得                                       |
| [`begin(size_type)`](./unordered_map/begin-size_type.md)   | インデックス（添え字）で指定したバケット内の先頭要素を指すイテレータを取得                 |
| [`end(size_type)`](./unordered_map/end-size_type.md)       | インデックス（添え字）で指定したバケット内の最終要素の次を指すイテレータを取得             |
| [`cbegin(size_type)`](./unordered_map/cbegin-size_type.md) | インデックス（添え字）で指定したバケット内の先頭要素を指す読み取り専用イテレータを取得     |
| [`cend(size_type)`](./unordered_map/cend-size_type.md)     | インデックス（添え字）で指定したバケット内の最終要素の次を指す読み取り専用イテレータを取得 |


###ハッシュポリシー

|                                                         |                                                    |
|---------------------------------------------------------|----------------------------------------------------|
| [`load_factor`](./unordered_map/load_factor.md)         | 現在の負荷率（バケットあたりの要素数の平均）を取得 |
| [`max_load_factor`](./unordered_map/max_load_factor.md) | 負荷率の最大値を取得、設定                         |
| [`rehash`](./unordered_map/rehash.md)                   | 最小バケット数指定によるバケット数の調整           |
| [`reserve`](./unordered_map/reserve.md)                 | 最小要素数指定によるバケット数の調整               |


##メンバ型

|                        |                                          |
|------------------------|------------------------------------------|
| `key_type`             | キーの型。テンプレートパラメータ `Key`。 |
| `value_type`           | 要素の型。`std::`[`pair`](/reference/utility/pair.md)`<const Key, T>`。 |
| `mapped_type`          | 値の型。テンプレートパラメータ `T`。 |
| `hasher`               | キーのハッシュ関数の型。テンプレートパラメータ `Hash`。 |
| `key_equal`            | キーが等値か否かを判断するための二項述語の型。テンプレートパラメータ `Pred`。 |
| `allocator_type`       | アロケータの型。テンプレートパラメータ `Allocator`。 |
| `pointer`              | 要素 `value_type`（`= std::`[`pair`](/reference/utility/pair.md)`<const Key, T>`）へのポインタ。スマートポインタも可であるが、通常は `value_type*`。<br/>規格書では、`allocator_type::pointer` となっているが、これは規格書の誤りで、ドラフト [N3376](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3376.pdf) で既に `std::`[`allocator_traits`](/reference/memory/allocator_traits.md)`<Allocator>::pointer` に修正されている。<br/>（さもないと、必須である `allocator_type::value_type` のみを定義したユーザ定義のアロケータを使用することができないため） |
| `const_pointer`        | 要素 `value_type`（`= std::`[`pair`](/reference/utility/pair.md)`<const Key, T>`）へのコンストポインタ。スマートポインタも可であるが、通常は `const value_type*`。<br/>規格書では、`allocator_type::const_pointer` となっているが、これは規格書の誤りで、ドラフト [N3376](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3376.pdf) で既に `std::`[`allocator_traits`](/reference/memory/allocator_traits.md)`<Allocator>::const_pointer` に修正されている。<br/>（さもないと、必須である `allocator_type::value_type` のみを定義したユーザ定義のアロケータを使用することができないため） |
| `reference`            | 要素 `value_type`（`= std::`[`pair`](/reference/utility/pair.md)`<const Key, T>`）への参照。<br/>規格書では、`allocator_type::reference` となっているが、これは規格書の誤りで、ドラフト [N3376](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3376.pdf) で既に `value_type&` に修正されている。<br/>（さもないと、必須である `allocator_type::value_type` のみを定義したユーザ定義のアロケータを使用することができないため） |
| `const_reference`      | 要素 `value_type`（`= std::`[`pair`](/reference/utility/pair.md)`<const Key, T>`）へのコンスト参照。<br/>規格書では、`allocator_type::const_reference` となっているが、これは規格書の誤りで、ドラフト [N3376](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3376.pdf) で既に `const value_type&` に修正されている。<br/>（さもないと、必須である `allocator_type::value_type` のみを定義したユーザ定義のアロケータを使用することができないため） |
| `size_type`            | 要素数を表す符号なし整数型。`difference_type` で表現可能な非負整数（0以上の整数）を表すことが可能。(通常は [`size_t`](/reference/cstddef/size_t.md)) |
| `difference_type`      | 同一のコンテナを指す `iterator` の差を表す符号付き整数型(通常は [`ptrdiff_t`](/reference/cstddef/ptrdiff_t.md)) <br/>`std::`[`iterator_traits`](/reference/iterator/iterator_traits.md)`<iterator>::difference_type`、および、`std::`[`iterator_traits`](/reference/iterator/iterator_traits.md)`<const_iterator>::difference_type` と同じ。 |
| `iterator`             | "読み取り専用"前方向イテレータ（誤植ではない）<br/>規格書には記載はないが、（連想コンテナがそうであるように）`const_iterator` と同じ型か否かは実装依存であるものと思われる。<br/>従って、ODR（One Definition Rule）に違反しないようにするため、関数のパラメータ型には常に `const_iterator` を使用したほうが良いだろう。 |
| `const_iterator`       | 読み取り専用前方向イテレータ |
| `local_iterator`       | 同一バケット内のみで有効なイテレータ。<br/>規格書には記載はないが、`iterator` と同様）`const_local_iterator` と同じ型か否かは実装依存であるものと思われる。<br/>`iterator` と、`iterator_category`、`value_type`、`difference_type`、`pointer`、`reference` は同一である。 |
| `const_local_iterator` | 同一バケット内のみで有効な読み取り専用イテレータ。<br/>`const_iterator` と、`iterator_category`、`value_type`、`difference_type`、`pointer`、`reference` は同一である。 |


##非メンバ関数

|                                                 |            |
|-------------------------------------------------|------------|
| [`swap`](./unordered_map/swap_free.md)          | 内容の交換 |
| [`operator==`](./unordered_map/op_equal.md)     | 等値比較   |
| [`operator!=`](./unordered_map/op_not_equal.md) | 非等値比較 |


##例

```cpp
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
* iostream[link /reference/iostream.md]
* unordered_map[link /reference/unordered_map.md]
* iterator[link /reference/iterator.md]
* algorithm[link /reference/algorithm.md]
* string[link /reference/string.md]
* ostream[link /reference/ostream.md]
* for_each[link /reference/algorithm/for_each.md]
* begin[link /reference/iterator/begin.md]
* end[link /reference/iterator/end.md]
* at[link ./unordered_map/at.md]
* emplace[link ./unordered_map/emplace.md]
* erase[link ./unordered_map/erase.md]
* ["5th"][link ./unordered_map/op_at.md]


###出力
```
{2nd,2}, {3rd,3}, {1st,1},
3rd:3
{4th,4}, {2nd,2}, {3rd,3}, {1st,1},
{4th,4}, {3rd,3}, {1st,1},
5th:0
{5th,0}, {4th,4}, {3rd,3}, {1st,1},
```


##バージョン
###言語
- C++11


##参照
- [Unordered associative containers do not use allocator_traits to define member types](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2050) （上記の `pointer`、`const_pointer`、`reference`、`const_reference` の問題に対する修正案）

