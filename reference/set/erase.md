#erase
```cpp
// until C++11

void erase(iterator position);

// since C++11
```

iterator erase(const_iterator position);


// until C++11

void erase(const_iterator first, const_iterator last);


// since C++11

iterator erase(const_iterator first, const_iterator last);



size_type erase(const key_type& x);




##概要

　単一要素または要素範囲（[<i>first</i>, <i>last</i>)）を set コンテナから削除する。


　これは削除された要素の数だけコンテナの size を減らし、それぞれの要素のデストラクタを呼び出す。


##引数

　・position

　　set から削除する単一要素を指すイテレータ。iterator はメンバ型であり、bidirectional iterator として定義される。


　・x

　　set から削除される値。key_type はメンバ型であり、set コンテナの中で Key のエイリアスとして定義される。ここで Key は 1 番目のテンプレートパラメータであり、コンテナに格納される要素の型である。


　・first, last

　　set コンテナ内の、削除される範囲 [<i>first</i>, <i>last</i>) を指定するイテレータ。ここでいう範囲は <i>first</i> と <i>last</i> の間の全ての要素を含み、<i>first</i> が指す要素を含むが <i>last</i> が指す要素は含まない。


##戻り値

　iterator を返すタイプのバージョンは、削除された要素の次を指すイテレータを返す。

　size_type を返すタイプのバージョンは、削除された要素の数を返す。　


##計算量

　引数に <i>position</i> をとるバージョンは定数時間。

　引数に <i>first</i>, <i>last</i> をとるバージョンはコンテナの [size](/reference/set/size.md) についての対数時間、プラス <i>first</i> と <i>last</i> の間の距離に対する線形時間。

　引数に <i>x</i> をとるバージョンはコンテナの [size](/reference/set/size.md) について対数時間。


##例

```cpp
<pre style='margin-top:0px;margin-bottom:0px;padding-bottom:5px;padding-top:3px;padding-left:10px;line-height:normal;background-color:rgb(240,240,240)'>#include <iostream>
#include <set>
using namespace std;
 
int main()
{
  set<int> c;
 
  c.insert(10);
  c.insert(20);
  c.insert(30);
  cout << c.size() << endl;
 
  c.erase(10);
  cout << c.size() << endl;
 
  c.erase(5);
  cout << c.size() << endl;
 
  c.erase(c.begin(), c.end());
  cout << c.size() << endl;
  
  return 0;
}</pre>
```

###出力

```cpp
3

2

2

0
```

##参照


| | |
|---------------------------------------------------------------------------------------|--------------------------------------|
| [set::clear](/reference/set/clear.md) | 全ての要素を削除する |
| [set::insert](/reference/set/insert.md) | 要素を挿入する |
| [set::find](/reference/set/find.md) | 指定したキーで要素を探す |



