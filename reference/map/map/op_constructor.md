#コンストラクタ
```cpp
explicit map(const Compare& comp = Compare(), const Allocator& alloc = Allocator());	// C++11 まで

map();																					// C++14 から

explicit map(const Compare& comp, const Allocator& alloc = Allocator());				// C++14 から

explicit map(const Allocator& alloc);													// C++11 から

template <class InputIterator>
map(InputIterator first, InputIterator last,
    const Compare& comp = Compare(), const Allocator& alloc = Allocator());

template <class InputIterator>
map(InputIterator first, InputIterator last, const Allocator& alloc);					// C++14 から

map(const map& x);

map(const map& x, const Allocator& alloc);												// C++11 から

map(map&& y);																			// C++11 から

map(map&& y, const Allocator& alloc);													// C++11 から

map(initializer_list<value_type> init,
    const Compare& comp = Compare(), const Allocator& alloc = Allocator());				// C++11 から

map(initializer_list<value_type> init, const Allocator& alloc);							// C++14 から
```
* initializer_list[link ../../initializer_list.md]

##概要
`map` オブジェクトの構築


##効果
- `explicit map(const Compare& comp = Compare(), const Allocator& alloc = Allocator()); // C++11 まで`  
	デフォルトコンストラクタ。空の `map` オブジェクトを構築する。

- `map(); // C++14 から`  
	デフォルトコンストラクタ。空の `map` オブジェクトを構築する。`map(Compare())` と同等。

- `explicit map(const Compare& comp, const Allocator& alloc = Allocator()); // C++14 から`  
	指定した比較オブジェクト、およびアロケータで空の `map` オブジェクトを構築する。

- `explicit map(const Allocator& alloc); // C++11 から`  
	指定したアロケータで空の `map` オブジェクトを構築する。

- `template <class InputIterator>`  
	`map(InputIterator first, InputIterator last, const Compare& comp = Compare(), const Allocator& alloc = Allocator());`  
	指定した比較オブジェクト、アロケータ、および範囲 `[first, last)` の要素で `map` オブジェクトを構築する。

- `template <class InputIterator>`  
	`map(InputIterator first, InputIterator last, const Allocator& alloc); // C++14 から`  
	指定したアロケータ、および範囲 `[first, last)` の要素で `map` オブジェクトを構築する。

- `map(const map& x);`  
	コピーコンストラクタ。`x`のコンテンツのコピーで `map` オブジェクトを構築する。アロケータを `std::`[`allocator_traits`](../../memory/allocator_traits.md)`<allocator_type>::`[`select_on_container_copy_construction`](../../memory/allocator_traits/select_on_container_copy_construction.md)`(x.`[`get_allocator`](get_allocator.md)`())` の呼び出しによって取得する。

- `map(const map& x, const Allocator& alloc); // C++11 から`  
	アロケータを指定したコピーコンストラクタ。`x` の要素のコピーで `map` オブジェクトを構築する。

- `map(map&& y); // C++11 から`  
	ムーブコンストラクタ。`y` の要素をムーブすることで `map` オブジェクトを構築する。アロケータは `y` に属しているアロケータをムーブして取得する。

- `map(map&& y, const Allocator& alloc); // C++11 から`  
	アロケータを指定したムーブコンストラクタ。`y` の要素をムーブすることで `map` オブジェクトを構築する。

- `map(`[`initializer_list`](../../initializer_list.md)`<value_type> init, const Compare& comp = Compare(), const Allocator& alloc = Allocator()); // C++11 から`  
	指定した比較オブジェクト、アロケータ、および初期化リスト `init` の要素で `map` オブジェクトを構築する。`map(init.`[`begin`](../../initializer_list/begin.md)`(), init.`[`end`](../../initializer_list/end.md)`(), comp, alloc)` と同等。

- `map(`[`initializer_list`](../../initializer_list.md)`<value_type> init, const Allocator& alloc); // C++14 から`  
	指定したアロケータ、および初期化リスト `init` の要素で `map` オブジェクトを構築する。`map(init, Compare(), alloc)` と同等。


##パラメータ
- `alloc`  
	この `map` オブジェクトの全てのメモリ確保を行うアロケータ。

- `comp`  
	キーの全ての比較を行う比較関数。

- `first`, `last`  
要素のコピー元となる範囲。

- `x`  
	`map` オブジェクトの要素の初期化のコピー元として使われる、ほかの `map` オブジェクト。

- `y`  
	`map` オブジェクトの要素の初期化のムーブ元として使われる、ほかの `map` オブジェクト。

- `init`  
	`map` オブジェクトの要素を初期化するために使われる初期化リスト。


##計算量

デフォルトコンストラクタは定数時間。

イテレータコンストラクタは、`comp` によって既にソート済みである場合は、イテレータ間の距離（コピーコンストラクト）。未ソートのシーケンスの場合は、それらの距離について N * logN （ソート、コピーコンストラクト）。

コピーコンストラクタは、`x` の `size` に対して線形時間（コピーコンストラクト）。

ムーブコンストラクタは定数時間。但し、`alloc` が与えられてかつ `alloc != y.`[`get_allocator`](/reference/map/map/get_allocator.md)`()` の場合は線形時間。

初期化リストを使ったコンストラクタは `init` のサイズに対して線形時間。


##備考
- C++14 では、デフォルトコンストラクタを `explicit map(const Compare& comp = Compare(), const Allocator& alloc = Allocator())` から単独のオーバーロードに分離した。
	これは、デフォルトコンストラクタに `explicit` が付いていると、

	```cpp
std::map<int> m = {};
```

	のようなコード（C++11 から導入された、コピーリスト初期化によるデフォルトコンストラクタ呼び出し）がエラーになってしまうためである。

- C++14 では、`template <class InputIterator> map(InputIterator first, InputIterator last, const Allocator& alloc)` が新たに追加された。
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
  using mii = std::map<int, int>;
  std::list<mii, std::scoped_allocator_adaptor<std::allocator<mii>>> l;
  std::pair<const int, int> a[] = { { 1, 2 }, { 3, 4 }, { 5, 6 } };
  l.emplace_back(std::begin(a), std::end(a));
}
```
* list[link ../../list.md]
* map[link ../../map.md]
* scoped_allocator[link ../../scoped_allocator.md]
* iterator[link ../../iterator.md]
* utility[link ../../utility.md]
* memory[link ../../memory.md]
* scoped_allocator_adaptor[link ../../scoped_allocator/scoped_allocator_adaptor.md]
* allocator[link ../../memory/allocator.md]
* emplace_back[link ../../list/emplace_back.md]
* pair[link ../../utility/pair.md]

	なお、C++14 では同様の理由で `map(`[`initializer_list`](../../initializer_list.md)`<value_type> init, const Allocator& alloc)` も新たに追加されているが、こちらは存在しなくてもエラーとはならない。  
	（`map(map&& y, const Allocator& alloc)` があるため、`map(init, alloc)` の形式の構築では初期化リストから一時 `map` が構築されて `y` に引き渡される）

##例
```cpp
#include <iostream>
#include <map>
#include <utility>

int main()
{
  std::pair<int,char> values[] = { std::make_pair(1,'a'), std::make_pair(2,'b'), std::make_pair(2,'b') };
  std::map<int,char> c1(values, values + 3);
  std::map<int,char> c2(c1);

  std::cout << "Size of c1: " << c1.size() << std::endl;
  std::cout << "Size of c2: " << c2.size() << std::endl;
}
```
* iostream[link ../../iostream.md]
* utility[link ../../utility.md]
* map[link ../map.md]
* pair[link ../../utility/pair.md]
* make_pair[link ../../utility/make_pair.md]
* cout[link ../../iostream/cout.md]
* endl[link ../../ostream/endl.md]
* size[link size.md]

###出力
```
Size of c1: 2
Size of c2: 2
```

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++11 mode](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??, 11.0

##参照

| 名前 | 説明 |
|---------------------------------------------------------------------------------------------|-----------------------|
| [`operator=`](/reference/map/map/op_assign.md) | 代入演算子 |
| [`insert`](/reference/map/map/insert.md) | 要素を挿入する |

* [LWG 2193. Default constructors for standard library containers are explicit](http://cplusplus.github.io/LWG/lwg-defects.html#2193)  
	`explicit map(const Compare& comp = Compare(), const Allocator& a = Allocator())` を 2 つのオーバーロードに分割するきっかけとなったレポート
* [LWG 2210. Missing allocator-extended constructor for allocator-aware containers](http://cplusplus.github.io/LWG/lwg-defects.html#2210)  
	`template <class InputIterator> map(InputIterator first, InputIterator last, const Allocator& alloc)` と `map(`[`initializer_list`](../../initializer_list.md)`<value_type> init, const Allocator& alloc)` を追加するきっかけとなったレポート  
	なお、Discussion の例はアロケータの型が誤っているので注意
