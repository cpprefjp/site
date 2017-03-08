#コンストラクタ
* set[meta header]
* std[meta namespace]
* set[meta class]
* function[meta id-type]

```cpp
set();                                              // (1) C++14

explicit set(const Compare& comp,
             const Allocator& = Allocator());       // (2) C++14

explicit set(const Compare& comp = Compare(),
             const Allocator& alloc = Allocator()); // (1) + (2) C++03

explicit set(const Allocator& alloc);               // (3) C++11

template <class InputIterator>
set(InputIterator first, InputIterator last,
    const Compare& comp = Compare(),
    const Allocator& alloc = Allocator());          // (4) C++03

template <class InputIterato>
set(InputIterator first, InputIterator last,
    const Allocator& a);                            // (5) C++14

set(const set& x);                                  // (6) C++03
set(set&& y);                                       // (7) C++11

set(const set& x, const Allocator& alloc);          // (8) C++11
set(set&& y, const Allocator& alloc);               // (9) C++11

set(initializer_list<value_type> init,
    const Compare& comp = Compare(),
    const Allocator& alloc = Allocator());          // (10) C++11

set(initializer_list<value_type> init,
    const Allocator& a);                            // (11) C++14
```
* initializer_list[link ../../initializer_list.md]


##概要
`set`オブジェクトを、以下に示す通りの要素で初期化する。


##効果
- (1) : デフォルトコンストラクタ。要素数が空の`set`オブジェクトを構築する。
- (2) : 比較関数オブジェクトを受け取るコンストラクタ。受け取った比較関数オブジェクトを、このコンテナでの要素比較に使用する。要素数が空の`set`オブジェクトを構築する。
- (1) + (2) : デフォルトコンストラクタ。空のコンテナを構築する。
- (3) : アロケータを別で受け取り、要素数が空の`set`オブジェクトを構築する。
- (4) : 範囲 `[first, last)` のコンテンツで構築する。
- (5) : (4)のコンストラクタを `set(first, last, Compare(), a)` のように呼び出して、`set`オブジェクトを構築する。
- (6), (8) : コピーコンストラクタ。`x`のコンテンツのコピーでコンテナを構築する。もし `alloc` が与えられなかった場合、アロケータを `std::`[`allocator_traits`](../../memory/allocator_traits.md)`<allocator_type>::`[`select_on_container_copy_construction`](../../memory/allocator_traits/select_on_container_copy_construction.md)`(x.`[`get_allocator`](get_allocator.md)`())` の呼び出しによって取得する。
- (7), (9) : ムーブコンストラクタ。`y` のコンテンツをムーブすることでコンテナを構築する。もし `alloc` が与えられなかった場合、アロケータを `y` に属しているアロケータをムーブして取得する。
- (10) : 初期化リスト `init` のコンテンツでコンテナを構築する。
- (11) : (10)のコンストラクタを `set(init, Compare(), a)` のように呼び出して、`set`オブジェクトを構築する。


##計算量
- (1), (2), (3) : 定数時間。
- (4), (5) : `comp` によって既にソート済みである場合は、イテレータ間の距離（コピーコンストラクト）。未ソートのシーケンスの場合は、それらの距離について N * logN （ソート、コピーコンストラクト）。
- (6), (8) : `x` の [`size`](size.md) に対して線形時間（全要素をコピー構築する）。
- (7), (9) : 定数時間。ただし、`alloc` が与えられてかつ `alloc != y.`[`get_allocator`](get_allocator.md)`()` の場合は線形時間。
- (10), (11) : `init` の要素数に対して線形時間。


##備考
- C++14 では、デフォルトコンストラクタを (1) + (2) の形式から (1) の形式に分離して残りを (2) の形式（`comp` のデフォルト引数を削除）にした。
    これは、デフォルトコンストラクタに `explicit` が付いていると、

    ```cpp
std::set<int> s = {};
```

    のようなコード（C++11 から導入された、コピーリスト初期化によるデフォルトコンストラクタ呼び出し）がエラーになってしまうためである。

- C++14 では、(5) に形式が新たに追加された。
    これは、イテレータ範囲 `[first, last)` のみを引数にとるアロケータ使用構築（uses-allocator construction）に失敗してしまうためである。
    具体的には、C++11 では以下のようなコードがエラーになってしまう。

    ```cpp
#include <list>
#include <set>
#include <scoped_allocator>
#include <iterator>
#include <memory>

int main()
{
  using sii = std::set<int>;
  std::list<sii, std::scoped_allocator_adaptor<std::allocator<sii>>> ls;
  int a[] = {1, 2, 3};
  ls.emplace_back(std::begin(a), std::end(a));
}
```
* std::scoped_allocator_adaptor[link ../../scoped_allocator/scoped_allocator_adaptor.md]
* std::allocator[link ../../memory/allocator.md]
* ls.emplace_back[link ../../list/emplace_back.md]

    なお、C++14 では同様の理由で (11) の形式も新たに追加されているが、こちらは存在しなくてもエラーとはならない。  
    （`set(init, alloc)` の形式の構築では、(11) の形式が無い場合でも (10) の形式を用いて `init` から一時 `set` が構築され、`alloc` と共に (9) の形式に引き渡される）


##例
```cpp
#include <iostream>
#include <set>

int main()
{
  int values[] = { 5, 2, 4, 1, 0, 0, 9 };
  std::set<int> c1(values, values + 7);
  std::set<int> c2(c1);

  std::cout << "Size of c1: " << c1.size() << std::endl;
  std::cout << "Size of c2: " << c2.size() << std::endl;
}
```
* size()[link size.md]

###出力
```
Size of c1: 6
Size of c2: 6
```

##関連項目

| 名前                          | 説明           |
|-------------------------------|----------------|
| [`operator=`](op_assign.md) | 代入演算子     |
| [`insert`](insert.md)       | 要素を挿入する |


##参照
- [N2679 Initializer Lists for Standard Containers(Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2679.pdf)
    - (10)の経緯となる提案文書
- [LWG 2193. Default constructors for standard library containers are explicit](http://cplusplus.github.io/LWG/lwg-defects.html#2193)  
	`explicit set(const Compare& comp = Compare(), const Allocator& alloc = Allocator());` を 2 つのオーバーロードに分割するきっかけとなったレポート
- [LWG 2210. Missing allocator-extended constructor for allocator-aware containers](http://cplusplus.github.io/LWG/lwg-defects.html#2210)  
    (5)、(11) を追加するきっかけとなったレポート  
    なお、Discussion の例はアロケータの型が誤っているので注意

