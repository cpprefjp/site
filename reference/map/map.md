#コンストラクタ
```cpp
explicit map(const Compare& comp = Compare(), const Allocator& alloc = Allocator());

// since C++11
explicit map(const Allocator&);

template <class InputIterator>
map(InputIterator first, InputIterator last, const Compare& comp = Compare(), const Allocator& alloc = Allocator());

map(const map<Key,T, Compare,Allocator>& x);

// since C++11
map(const map& x, const Allocator& alloc);

// since C++11
map(map<Key,T, Compare,Allocator>&& y);

// since C++11
map(map&& y, const Allocator& alloc);

// since C++11
map(initializer_list<value_type> init, const Compare& comp = Compare(), const Allocator& alloc = Allocator());
```

##setオブジェクトの構築
- `explicit map(const Compare& comp = Compare(), const Allocator& alloc = Allocator());`
- `explicit map(const Allocator& alloc);`<br/>
デフォルトコンストラクタ。空のコンテナで構築する。 

- `template <class InputIterator>`<br/>`map(InputIterator first, InputIterator last, const Compare& comp = Compare(), const Allocator& alloc = Allocator());`<br/>
範囲 `[first, last)` のコンテンツで構築する。 

- `map(const map<Key,T, Compare,Allocator>& x);`
- `map(const map& x, const Allocator& alloc);`<br/>
コピーコンストラクタ。`x`のコンテンツのコピーでコンテナを構築する。もし `alloc` が与えられなかった場合、アロケータを `std::allocator_traits<allocator_type>::select_on_copy_construction(x)` の呼び出しによって取得する。 

- `map(map<Key,T,Compare,Allocator>&& y);`
- `map(map&& y, const Allocator& alloc);`<br/>
ムーブコンストラクタ。`y` のコンテンツをムーブすることでコンテナを構築する。もし `alloc` が与えられなかった場合、アロケータを `y` に属しているアロケータをムーブして取得する。 

- `map(initializer_list<value_type> init, const Compare& comp = Compare(), const Allocator& alloc = Allocator());`<br/>
初期化リスト `init` のコンテンツでコンテナを構築する。


##パラメータ
- `alloc`<br/>
このコンテナの全てのメモリ確保を行うアロケータ。 

- `comp`<br/>
キーの全ての比較を行う比較関数。 

- `first`, `last`<br/>
要素のコピー元となる範囲。 

- `x`<br/>
コンテナの要素の初期化のコピー元として使われる、ほかのコンテナ。 

- `y`<br/>
コンテナの要素の初期化のムーブ元として使われる、ほかのコンテナ。 

- `init`<br/>
コンテナの要素を初期化するために使われる初期化リスト。


##計算量

デフォルトコンストラクタは定数時間。

イテレータコンストラクタは、`comp` によって既にソート済みである場合は、イテレータ間の距離（コピーコンストラクト）。未ソートのシーケンスの場合は、それらの距離について N * logN （ソート、コピーコンストラクト）。 

コピーコンストラクタは、`x` の `size` に対して線形時間（コピーコンストラクト）。 

ムーブコンストラクタは定数時間。但し、`alloc` が与えられてかつ `alloc != y.`[`get_allocator`](./get_allocator.md)`()` の場合は線形時間。

初期化リストを使ったコンストラクタは `init` のサイズに対して線形時間。


##例
```cpp
#include <iostream>
#include <map>
using namespace std;

int main()
{
  std::pair<int,char> values[] = { std::make_pair(1,'a'), std::make_pair(2,'b'), std::make_pair(2,'b') };
  map<int,char> c1(values, values + 3);
  map<int,char> c2(c1);

  cout << "Size of c1: " << c1.size() << endl;
  cout << "Size of c2: " << c2.size() << endl;

  return 0;
}
```

###出力
```
Size of c1: 2
Size of c2: 2
```

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): ??
- [GCC, C++11 mode](/implementation#gcc.md): ??
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): ??, 11.0

##参照

| 名前 | 説明 |
|---------------------------------------------------------------------------------------------|-----------------------|
| [`operator=`](./op_assign.md) | 代入演算子 |
| [`insert`](./insert.md) | 要素を挿入する |


