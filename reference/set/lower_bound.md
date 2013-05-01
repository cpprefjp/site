#lower_bound
```cpp
iterator lower_bound(const key_type& x);

const_iterator lower_bound(const key_type& x) const;
```

##概要

　<i>x</i> を右辺とする <= 演算が成り立たない最初の要素を指すイテレータを返す（コンテナの比較オブジェクトが使われる）。すなわちこれは >= 演算にあたる。

　[upper_bound](/reference/set/upper_bound.md) とは異なり、このメンバ関数は <i>x</i> より大きいだけでなく、<i>x</i> と等しい場合であってもその要素へのイテレータを返す。

　内部的には set コンテナ内の全ての要素は常に比較オブジェクトが定義する基準に沿って並んでいるため、この関数が返すいずれかの後に続く全ての要素が <i>x</i> より大きいか等しいことに注意。


##引数
　・x
　　比較されるキー値。
　　key_type はメンバ型であり、set コンテナの中で Key のエイリアスとして定義される。ここで Key は 1 番目のテンプレートぱらめーたであり、コンテナに格納される要素の型である。


##戻り値

　コンテナ内で <i>x</i> を右辺とする <= 演算が成り立たない最初の要素へのイテレータ。iterator はメンバ型であり set コンテナの中で bidirectional iterator 型として定義される。


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
 
  cout << *c.lower_bound(20);
 
  return 0;
}</pre>
```

###出力

```cpp
20
```

##参照

| | |
|-------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| [set::upper_bound](/reference/set/upper_bound.md) | 特定の値よりも大きい最初の要素へのイテレータを返す |
| [set::equal_range](/reference/set/equal_range.md) | 指定したキーにマッチする要素範囲を返す |
| [set::find](/reference/set/find.md) | 指定したキーで要素を探す |
| [set::count](/reference/set/count.md) | 指定したキーにマッチする要素の数を返す |


