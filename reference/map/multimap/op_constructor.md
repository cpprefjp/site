#コンストラクタ
* map[meta header]

```cpp
multimap();																					// (1) C++14 から

explicit multimap(const Compare& comp, const Allocator& alloc = Allocator());				// (2) C++14 まで

explicit multimap(const Compare& comp = Compare(), const Allocator& alloc = Allocator());	// (1) + (2) C++11 まで

explicit multimap(const Allocator& alloc);													// (3) C++11 から

template <class InputIterator>
multimap(InputIterator first, InputIterator last,
         const Compare& comp = Compare(), const Allocator& alloc = Allocator());			// (4)

template <class InputIterator>
multimap(InputIterator first, InputIterator last, const Allocator& alloc);					// (5) C++14 から

multimap(const multimap& x);																// (6)

multimap(const multimap& x, const Allocator& alloc);										// (7) C++11 から

multimap(multimap&& y);																		// (8) C++11 から

multimap(multimap&& y, const Allocator& alloc);												// (9) C++11 から

multimap(initializer_list<value_type> init,
         const Compare& comp = Compare(), const Allocator& alloc = Allocator());			// (10) C++11 から

multimap(initializer_list<value_type> init, const Allocator& alloc);						// (11) C++14 から
```
* initializer_list[link ../../initializer_list.md]


##概要
`multimap` オブジェクトを構築する


##効果
- (1) デフォルトコンストラクタ。空の `multimap` オブジェクトを構築する。`multimap(Compare())` と同等。（C++14 から）
- (2) 比較オブジェクト `comp` とアロケータ `alloc` で空の `multimap` オブジェクトを構築する。（C++14 から）
- (1) + (2) デフォルトコンストラクタ。比較オブジェクト `comp` とアロケータ `alloc` で空の `multimap` オブジェクトを構築する。（C++11 まで）
- (3) アロケータ `alloc` で空の `multimap` オブジェクトを構築する。（C++11 から）
- (4) イテレータ範囲コンストラクタ。比較オブジェクト `comp`、アロケータ `alloc`、および範囲 `[first, last)` の要素で `multimap` オブジェクトを構築する。
- (5) イテレータ範囲コンストラクタ。アロケータ `alloc`、および範囲 `[first, last)` の要素で `multimap` オブジェクトを構築する。（C++14 から）
- (6) コピーコンストラクタ。`x` の要素のコピーで `multimap` オブジェクトを構築する。アロケータは `std::`[`allocator_traits`](../../memory/allocator_traits.md)`<allocator_type>::`[`select_on_container_copy_construction`](../../memory/allocator_traits/select_on_container_copy_construction.md)`(x)` の呼び出しによって取得する。
- (7) アロケータ `alloc` を指定したコピーコンストラクタ。`x` の要素のコピーで `multimap` オブジェクトを構築する。（C++11 から）
- (8) ムーブコンストラクタ。`y` の要素をムーブすることで `multimap` オブジェクトを構築する。アロケータは `y` に属しているアロケータをムーブして取得する。（C++11 から）
- (9) アロケータ `alloc` を指定したムーブコンストラクタ。`y` の要素をムーブすることでコンテナを構築する。（C++11 から）
- (10) 比較オブジェクト `comp`、アロケータ `alloc`、および初期化リスト `init` の要素で `multimap` オブジェクトを構築する。`multimap(init.`[`begin`](../../initializer_list/begin.md)`, init.`[`end`](../../initializer_list/end.md)`, comp, alloc)` と同等。（C++11 から）
- (11) アロケータ `alloc`、および初期化リスト `init` の要素で `multimap` オブジェクトを構築する。`multimap(init, Compare(), alloc)` と同等。（C++14 から）


##計算量
- (1)、(2)、(3) 定数時間
- (4)、(5) `N = `[`distance`](../../iterator/distance.md)`(first, last)` とすると、範囲 `[first, last)` が比較オブジェクト `comp` によって既にソート済みである場合は `N` に比例、そうでなければ `N log N` に比例
- (6)、(7) `x.`[`size`](size.md)`()` に対して線形時間
- (8) 定数時間
- (9) 定数時間。ただし、`alloc == y.`[`get_allocator`](get_allocator.md)`()` でなければ `y.`[`size`](size.md)`()` に対して線形時間
- (10)、(11) `init.`[`size`](size.md)`()` に対して線形時間


##備考
- C++14 では、デフォルトコンストラクタを (1) + (2) の形式から (1) の形式に分離して残りを (2) の形式（`comp` のデフォルト引数を削除）にした。
	これは、デフォルトコンストラクタに `explicit` が付いていると、

	```cpp
std::multimap<int, char> m = {};
```

	のようなコード（C++11 から導入された、コピーリスト初期化によるデフォルトコンストラクタ呼び出し）がエラーになってしまうためである。

- C++14 では、(5) の形式が新たに追加された。
	これは、イテレータ範囲 `[first, last)` のみを引数にとるアロケータ使用構築（uses-allocator construction）に失敗してしまうためである。
	具体的には、C++11 では以下のようなコードがエラーになってしまう。

	```cpp
#include <list>
#include <map>
#include <scoped_allocator>
#include <iterator>
#include <utility>
#include <memory>

int main()
{
  using mii = std::multimap<int, int>;
  std::list<mii, std::scoped_allocator_adaptor<std::allocator<mii>>> l;
  std::pair<const int, int> a[] = { { 1, 2 }, { 3, 4 }, { 5, 6 } };
  l.emplace_back(std::begin(a), std::end(a));
}
```
* list[link ../../list.md]
* map[link ../../map.md]
* multimap[link ../multimap.md]
* scoped_allocator[link ../../scoped_allocator.md]
* iterator[link ../../iterator.md]
* utility[link ../../utility.md]
* memory[link ../../memory.md]
* scoped_allocator_adaptor[link ../../scoped_allocator/scoped_allocator_adaptor.md]
* allocator[link ../../memory/allocator.md]
* emplace_back[link ../../list/emplace_back.md]
* pair[link ../../utility/pair.md]

	なお、C++14 では同様の理由で (11) の形式も新たに追加されているが、こちらは存在しなくてもエラーとはならない。  
	（`map(init, alloc)` の形式の構築では、(11) の形式が無い場合でも (10) の形式を用いて `init` から一時 `map` が構築され、`alloc` と共に (9) の形式に引き渡される）


##例
```cpp
#include <iostream>
#include <map>

int main()
{
  std::pair<int,char> values[] = { std::make_pair(1,'a'), std::make_pair(2,'b'), std::make_pair(2,'b') };
  std::multimap<int,char> c1(values, values + 3);
  std::multimap<int,char> c2(c1);

  std::cout << "Size of c1: " << c1.size() << std::endl;
  std::cout << "Size of c2: " << c2.size() << std::endl;
}
```
* iostream[link ../../iostream.md]
* map[link ../../map.md]
* pair[link ../../utility/pair.md]
* make_pair[link ../../utility/make_pair.md]
* multimap[link ../multimap.md]
* cout[link ../../iostream/cout.md]
* size[link size.md]
* endl[link ../../ostream/endl.md]

###出力
```
Size of c1: 3
Size of c2: 3
```

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++11 mode](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??, 11.0

##参照

| 名前                                                | 説明           |
|-----------------------------------------------------|----------------|
| [`operator=`](/reference/map/multimap/op_assign.md) | 代入演算子     |
| [`insert`](/reference/map/multimap/insert.md)       | 要素を挿入する |

* [LWG 2193. Default constructors for standard library containers are explicit](http://cplusplus.github.io/LWG/lwg-defects.html#2193)  
	(1) + (2) の形式を 2 つのオーバーロードに分割するきっかけとなったレポート
* [LWG 2210. Missing allocator-extended constructor for allocator-aware containers](http://cplusplus.github.io/LWG/lwg-defects.html#2210)  
	(5)、(11) の形式を追加するきっかけとなったレポート  
	なお、Discussion の例はアロケータの型が誤っているので注意
