#operator=
```cpp
set& operator=(const set& x);

// since C++11
set& operator=(set&& y);

// since C++11
set& operator=(initializer_list<value_type> init);
```
*initializer_list[link ../../initializer_list.md]

##概要
- `set& operator=(const set& x)`  
	`x`に格納されている要素のコピーをコンテナの新しい要素とする。  
	この呼び出しの前に格納されていた要素は取り除かれ、`x` に格納されている要素のそれぞれのコピーによって置き換えられる。  
	このメンバ関数の呼び出しの後、`set` オブジェクトと `x` は同じサイズになり、比較すると互いに等しくなる。
- `set& operator=(set&& y)`  
	`y` に格納されている要素をムーブしてコンテナの新しい要素とする。  
	この呼び出しの前に格納されていた要素は取り除かれ、`y` に格納されていた要素がムーブされることで置き換えられる。
- `set& operator=(initializer_list<value_type> init)`  
	`init` で指定した要素をコンテナの新しい要素とする。  
	この呼び出しの前に格納されていた要素は取り除かれ、`init` で指定した要素によって置き換える。


##パラメータ
- `x`  
	コンテンツのコピー元となる、テンプレートパラメータ(`Key, Compare, Allocator`)が同じ `set` オブジェクト。

- `y`  
	コンテンツのムーブ元となる、テンプレートパラメータ(`Key, Compare, Allocator`)が同じ `set` オブジェクト。

- `init`  
	メンバ型 `value_type` と同じ型の `initializer_list`。


##戻り値
`*this`


##計算量
線形時間。


##例
```cpp
#include <iostream>
#include <set>

int main()
{
  int values[] = { 5, 2, 4, 1, 0, 0, 9 };
  std::set<int> c1(values, values + 7);
  std::set<int> c2;

  c2 = c1;
  c1 = std::set<int>();

  std::cout << "Size of c1: " << c1.size() << std::endl;
  std::cout << "Size of c2: " << c2.size() << std::endl;
}
```
* iostream[link ../../iostream.md]
* set[link ../../set.md]
* cout[link ../../iostream/cout.md]
* endl[link ../../ostream/endl.md]
* size[link size.md]
* =[color ff0000]

###出力
```
Size of c1: 0
Size of c2: 6
```

##参照

| 名前                         | 説明           |
|------------------------------|----------------|
| [`insert`](./insert.md)      | 要素を挿入する |
| [`set`](./op_constructor.md) | コンストラクタ |
