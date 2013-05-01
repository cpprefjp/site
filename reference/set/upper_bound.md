#upper_bound
```cpp
iterator upper_bound(const key_type& x);

const_iterator upper_bound(const key_type& x) const;
```

##概要

　<i>x</i> より大きいコンテナ内の最初の要素を指すイテレータを返す（コンテナの比較オブジェクトを使う）。

　[lower_bound](/reference/set/lower_bound.md) と異なり、このメンバ関数は <i>x</i> と等しいときは要素へのイテレータを返さず、それは大きい場合にのみ要素へのイテレータを返す。

　内部的に、set コンテナ内の全ての要素は常に比較オブジェクトで定義された基準に従って並ぶため、この関数が返す値に続く全ての要素は <i>x</i> より大きいことに注意。


##引数

　比較されるキー値。

　key_type はメンバ型であり、set コンテナ内で Key のエイリアスとして定義される。ここで Key は 1 つめのテンプレートパラメータであり、コンテナに格納される要素の型である。

##戻り値

　コンテナ内の <i>x</i> より大きい最初の要素へのイテレータ。
　iterator はメンバ型であり、bidirectional iterator 型として定義される。


##計算量

　[size](/reference/set/size.md) について対数時間。


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
 
  cout << *c.upper_bound(20);
 
  return 0;
}</pre>
```

###出力

```cpp
30
```

##参照

| | |
|-------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| [set::lower_bound](/reference/set/lower_bound.md) | 与えられた値よりも小さくない最初の要素へのイテレータを返す |
| [set::equal_range](/reference/set/equal_range.md) | 指定したキーにマッチする要素範囲を返す |
| [set::find](/reference/set/find.md) | 指定したキーで要素を探す |
| [set::count](/reference/set/count.md) | 指定したキーにマッチする要素の数を返す |


