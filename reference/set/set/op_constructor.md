#コンストラクタ
```cpp
explicit set(const Compare& comp = Compare(), const Allocator& alloc = Allocator());

// since C++11
explicit set(const Allocator& alloc);

template <class InputIterator>
set(InputIterator first, InputIterator last, const Compare& comp = Compare(), const Allocator& alloc = Allocator());

set(const set& x);

// since C++11
set(const set& x, const Allocator& alloc);

// since C++11
set(set&& y);

// since C++11
set(set&& y, const Allocator& alloc);

// since C++11
set(initializer_list<value_type> init, const Compare& comp = Compare(), const Allocator& alloc = Allocator());
```
* initializer_list[link ../../initializer_list.md]


##setオブジェクトの構築
- `explicit set(const Compare& comp = Compare(), const Allocator& alloc = Allocator());`
- `explicit set(const Allocator& alloc);`  
	デフォルトコンストラクタ。空のコンテナで構築する。

- `template <class InputIterator>`  
	`set(InputIterator first, InputIterator last, const Compare& comp = Compare(), const Allocator& alloc = Allocator());`  
	範囲 `[first, last)` のコンテンツで構築する。

- `set(const set& x);`
- `set(const set& x, const Allocator& alloc);`  
	コピーコンストラクタ。`x`のコンテンツのコピーでコンテナを構築する。もし `alloc` が与えられなかった場合、アロケータを `std::`[`allocator_traits`](../../memory/allocator_traits.md)`<allocator_type>::`[`select_on_container_copy_construction`](../../memory/allocator_traits/select_on_container_copy_construction.md)`(x.`[`get_allocator`](get_allocator.md)`())` の呼び出しによって取得する。

- `set(set&& y);`
- `set(set&& y, const Allocator& alloc);`  
	ムーブコンストラクタ。`y` のコンテンツをムーブすることでコンテナを構築する。もし `alloc` が与えられなかった場合、アロケータを `y` に属しているアロケータをムーブして取得する。

- `set(initializer_list<value_type> init, const Compare& comp = Compare(), const Allocator& alloc = Allocator());`  
	初期化リスト `init` のコンテンツでコンテナを構築する。


##パラメータ
- `alloc`  
	このコンテナの全てのメモリ確保を行うアロケータ。

- `comp`  
	キーの全ての比較を行う比較関数。

- `first`, `last`  
	要素のコピー元となる範囲。

- `x`  
	コンテナの要素の初期化のコピー元として使われる、ほかのコンテナ。

- `y`  
	コンテナの要素の初期化のムーブ元として使われる、ほかのコンテナ。

- `init`  
	コンテナの要素を初期化するために使われる初期化リスト。


##計算量
- デフォルトコンストラクタは定数時間。
- イテレータコンストラクタは、`comp` によって既にソート済みである場合は、イテレータ間の距離（コピーコンストラクト）。未ソートのシーケンスの場合は、それらの距離について N * logN （ソート、コピーコンストラクト）。
- コピーコンストラクタは、`x` の [`size`](size.md) に対して線形時間（コピーコンストラクト）。
- ムーブコンストラクタは定数時間。但し、`alloc` が与えられてかつ `alloc != y.`[`get_allocator`](./get_allocator.md)`()` の場合は線形時間。
- 初期化リストを使ったコンストラクタは `init` のサイズに対して線形時間。


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

##参照

| 名前                          | 説明           |
|-------------------------------|----------------|
| [`operator=`](./op_assign.md) | 代入演算子     |
| [`insert`](./insert.md)       | 要素を挿入する |
