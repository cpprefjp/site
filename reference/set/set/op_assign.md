#operator=
```cpp
set<Key,Compare,Allocator>& operator=(const set<Key,Compare,Allocator>& x);

// since C++11
set<Key,Compare,Allocator>& operator=(set<Key,Compare,Allocator>&& y);

// since C++11
set& operator=(initializer_list<value_type> init);
```

##概要
- `set<Key,Compare,Allocator>& operator=(const set<Key,Compare,Allocator>& x)`<br/>`x`に格納されている要素のコピーをコンテナの新しい要素とする。<br/>この呼び出しの前に格納されていた要素は取り除かれ、`x` に格納されている要素のそれぞれのコピーによって置き換えられる。<br/>このメンバ関数の呼び出しの後、`set` オブジェクトと `x` は同じサイズになり、比較すると互いに等しくなる。
- `set<Key,Compare,Allocator>& operator=(set<Key,Compare,Allocator>&& y)`<br/>`y` に格納されている要素をムーブしてコンテナの新しい要素とする。<br/>この呼び出しの前に格納されていた要素は取り除かれ、`y` に格納されていた要素がムーブされることで置き換えられる。
- `set& operator=(initializer_list<value_type> init)`<br/>`init` で指定した要素をコンテナの新しい要素とする。<br/>この呼び出しの前に格納されていた要素は取り除かれ、`init` で指定した要素によって置き換える


##パラメータ
- `x`<br/>
コンテンツのコピー元となる、テンプレートパラメータ(`Key, Compare, Allocator`)が同じ `set` オブジェクト。 

- `y`<br/>
コンテンツのムーブ元となる、テンプレートパラメータ(`Key, Compare, Allocator`)が同じ `set` オブジェクト。 

- `init`<br/>
メンバ型 `value_type` と同じ型の `initializer_list`。


##戻り値
`*this`


##計算量
- `set<Key,Compare,Allocator>& operator=(const set<Key,Compare,Allocator>& x)`
- `set& operator=(initializer_list<value_type> init)`
`x` または `init` の要素数に対して線形時間。 

- `set<Key,Compare,Allocator>& operator=(set<Key,Compare,Allocator>&& y)`
定数時間。


##例
```cpp
#include <iostream>
#include <set>
using namespace std;
 
int main()
{
  int values[] = { 5, 2, 4, 1, 0, 0, 9 };
  set<int> c1(values, values + 7);
  set<int> c2;
 
  c2 = c1;
  c1 = set<int>();
 
  cout << "Size of c1: " << c1.size() << endl;
  cout << "Size of c2: " << c2.size() << endl;
  
  return 0;
}
```

###出力
```
Size of c1: 0
Size of c2: 6
```

##参照

| | |
|------------------------------|----------------|
| [`insert`](./insert.md)      | 要素を挿入する |
| [`set`](./op_constructor.md) | コンストラクタ |
