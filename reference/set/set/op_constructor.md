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

set(const set& x);                                  // (5) C++03
set(set&& y);                                       // (6) C++11

set(const set& x, const Allocator& alloc);          // (7) C++11
set(set&& y, const Allocator& alloc);               // (8) C++11

set(initializer_list<value_type> init,
    const Compare& comp = Compare(),
    const Allocator& alloc = Allocator());          // (9) C++11
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
- (5), (7) : コピーコンストラクタ。`x`のコンテンツのコピーでコンテナを構築する。もし `alloc` が与えられなかった場合、アロケータを `std::`[`allocator_traits`](../../memory/allocator_traits.md)`<allocator_type>::`[`select_on_container_copy_construction`](../../memory/allocator_traits/select_on_container_copy_construction.md)`(x.`[`get_allocator`](get_allocator.md)`())` の呼び出しによって取得する。
- (6), (8) : ムーブコンストラクタ。`y` のコンテンツをムーブすることでコンテナを構築する。もし `alloc` が与えられなかった場合、アロケータを `y` に属しているアロケータをムーブして取得する。
- (9) : 初期化リスト `init` のコンテンツでコンテナを構築する。


##計算量
- (1), (2), (3) : 定数時間。
- (4) : `comp` によって既にソート済みである場合は、イテレータ間の距離（コピーコンストラクト）。未ソートのシーケンスの場合は、それらの距離について N * logN （ソート、コピーコンストラクト）。
- (5), (7) : `x` の [`size`](size.md) に対して線形時間（全要素をコピー構築する）。
- (6), (8) : 定数時間。ただし、`alloc` が与えられてかつ `alloc != y.`[`get_allocator`](./get_allocator.md)`()` の場合は線形時間。
- (9) : 初期化リストを使ったコンストラクタは `init` のサイズに対して線形時間。


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
* iostream[link ../../iostream.md]
* set[link ../../set.md]
* cout[link ../../iostream/cout.md]
* endl[link ../../ostream/endl.md]
* size[link size.md]

###出力
```
Size of c1: 6
Size of c2: 6
```

##関連項目

| 名前                          | 説明           |
|-------------------------------|----------------|
| [`operator=`](./op_assign.md) | 代入演算子     |
| [`insert`](./insert.md)       | 要素を挿入する |


##参照
- [LWG 2193. Default constructors for standard library containers are explicit](http://cplusplus.github.io/LWG/lwg-defects.html#2193)  
	`explicit set(const Compare& comp = Compare(), const Allocator& alloc = Allocator());` を 2 つのオーバーロードに分割するきっかけとなったレポート

