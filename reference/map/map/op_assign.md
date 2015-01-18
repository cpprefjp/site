#operator=
```cpp
map<Key,T,Compare,Allocator>& operator=(const map<Key,T,Compare,Allocator>& x);

// since C++11
map<Key,T,Compare,Allocator>& operator=(map<Key,T,Compare,Allocator>&& y);

// since C++11
map& operator=(initializer_list<value_type> init);
```

##概要
- `map<Key,T,Compare,Allocator>& operator=(const map<Key,T,Compare,Allocator>& x)`<br/>`x`に格納されている要素のコピーをコンテナの新しい要素とする。<br/>この呼び出しの前に格納されていた要素は取り除かれ、`x` に格納されている要素のそれぞれのコピーによって置き換えられる。<br/>このメンバ関数の呼び出しの後、`map` オブジェクトと `x` は同じサイズになり、比較すると互いに等しくなる。
- `map<Key,T,Compare,Allocator>& operator=(map<Key,T,Compare,Allocator>&& y)`<br/>`y` に格納されている要素をムーブしてコンテナの新しい要素とする。<br/>この呼び出しの前に格納されていた要素は取り除かれ、`y` に格納されていた要素がムーブされることで置き換えられる。
- `map& operator=(initializer_list<value_type> init)`<br/>`init` で指定した要素をコンテナの新しい要素とする。<br/>この呼び出しの前に格納されていた要素は取り除かれ、`init` で指定した要素によって置き換える


##パラメータ
- `x`<br/>
コンテンツのコピー元となる、テンプレートパラメータ(`Key, T, Compare, Allocator`)が同じ `map` オブジェクト。 

- `y`<br/>
コンテンツのムーブ元となる、テンプレートパラメータ(`Key, T, Compare, Allocator`)が同じ `map` オブジェクト。 

- `init`<br/>
メンバ型 `value_type` と同じ型の `initializer_list`。


##戻り値
`*this`


##計算量
- `map<Key,T,Compare,Allocator>& operator=(const map<Key,T,Compare,Allocator>& x)`
- `map& operator=(initializer_list<value_type> init)`
`x` または `init` の要素数に対して線形時間。 

- `map<Key,T,Compare,Allocator>& operator=(map<Key,T,Compare,Allocator>&& y)`
定数時間。


##例
```cpp
#include <iostream>
#include <map>

int main()
{
  std::pair<int,char> values[] = { 
    std::make_pair(5,'e'), 
    std::make_pair(2,'b'), 
    std::make_pair(4,'d'), 
    std::make_pair(1,'a'),
    std::make_pair(1,'a'),
    std::make_pair(3,'c')
  };
  std::map<int, char> c1(values, values + 6);
  std::map<int, char> c2;

  c2 = c1;
  c1 = std::map<int,char>();

  std::cout << "Size of c1: " << c1.size() << std::endl;
  std::cout << "Size of c2: " << c2.size() << std::endl;

  return 0;
}
```

###出力
```
Size of c1: 0
Size of c2: 5
```

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++11 mode](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??, 11.0


##参照

| 名前 | 説明 |
|---------------------------------------------------------------------------------------|-----------------------|
| [`insert`](/reference/map/map/insert.md) | 要素を挿入する |
| [`map`](/reference/map/map/op_constructor.md) | コンストラクタ |


