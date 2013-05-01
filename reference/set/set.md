#set
```cpp
explicit set(const Compare& comp = Compare(), const Allocator& alloc = Allocator());

// since C++11
explicit set(const Allocator& alloc);
```

template <class InputIterator>
set(InputIterator first, InputIterator last, const Compare& comp = Compare(), const Allocator& alloc = Allocator());

set(const set<Key,Compare,Allocator>& x);

// since C++11
set(const set& x, const Allocator& alloc);


// since C++11
set(set<Key,Compare,Allocator>&& y);

// since C++11
set(set&& y, const Allocator& alloc);

// since C++11
set(initializer_list<value_type> init, const Compare& comp = Compare(), const Allocator& alloc = Allocator());





##概要

　呼ばれたコンストラクタのバージョンに応じてコンテンツを初期化して、set コンテナオブジェクトを構築する。<b>　</b>

<b></b>
　・explicit set(const Compare& comp = Compare(), const Allocator& alloc = Allocator());
　・explicit set(const Allocator& alloc);
　　デフォルトコンストラクタ。空のコンテナで構築する。

　・template <class InputIterator>
　　set(InputIterator first, InputIterator last, const Compare& comp = Compare(), const Allocator& alloc = Allocator());
　　範囲 [<i>first</i>, <i>last</i>) のコンテンツで構築する。

　・set(const set<Key,Compare,Allocator>& x);
　・set(const set& x, const Allocator& alloc);
　　コピーコンストラクタ。<i>x</i> のコンテンツのコピーでコンテナを構築する。もし <i>alloc</i> が与えられなかった場合、アロケータを std::allocator_traits<allocator_type>::select_on_copy_construction(<i>x</i>) の呼び出しによって取得する。

　・set(set<Key,Compare,Allocator>&& y);
　・set(set&& y, const Allocator& alloc);
　　ムーブコンストラクタ。<i>y</i> のコンテンツをムーブすることでコンテナを構築する。もし <i>alloc</i> が与えられなかった場合、アロケータを <i>y</i> に属しているアロケータをムーブして取得する。

　・set(initializer_list<value_type> init, const Compare& comp = Compare(), const Allocator& alloc = Allocator());
　　初期化リスト <i>init</i> のコンテンツでコンテナを構築する。


##引数

　・alloc

　　このコンテナの全てのメモリ確保を行うアロケータ。

　・comp
　　キーの全ての比較を行う比較関数。

　・first, last
　　要素のコピー元となる範囲。

　・x
　　コンテナの要素の初期化のコピー元として使われる、ほかのコンテナ。

　・y
　　コンテナの要素の初期化のムーブ元として使われる、ほかのコンテナ。

　・init
　　コンテナの要素を初期化するために使われる初期化リスト。



##計算量

　デフォルトコンストラクタは定数時間。

　イテレータコンストラクタは、<i>comp</i> によって既にソート済みである場合は、イテレータ間の距離（コピーコンストラクト）。未ソートのシーケンスの場合は、それらの距離について N * logN （ソート、コピーコンストラクト） 。
　コピーコンストラクタは、<i>x</i> の <i>size</i> に対して線形時間（コピーコンストラクト）。
　ムーブコンストラクタは定数時間。但し、<i>alloc</i> が与えられてかつ <i>alloc</i> != <i>y</i>.[get_allocator](/reference/set/get_allocator.md)() の場合は線形時間。
　初期化リストを使ったコンストラクタは <i>init</i> のサイズに対して線形時間。


##例

```cpp
<pre style='margin-top:0px;margin-bottom:0px;padding-bottom:5px;padding-top:3px;padding-left:10px;line-height:normal;background-color:rgb(240,240,240)'>#include <iostream>
#include <set>
using namespace std;
 
int main()
{
  int values[] = { 5, 2, 4, 1, 0, 0, 9 };
  set<int> c1(values, values + 7);
  set<int> c2(c1);
 
  cout << "Size of c1: " << c1.size() << endl;
  cout << "Size of c2: " << c2.size() << endl;
  
  return 0;
}</pre>
```

###出力

```cpp
Size of c1: 6
Size of c2: 6
```

##参照


| | |
|---------------------------------------------------------------------------------------------|-----------------------|
| [set::operator=](/reference/set/op_assign.md) | 代入演算子 |
| [set::insert](/reference/set/insert.md) | 要素を挿入する |


