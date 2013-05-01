#value_comp
```cpp
value_compare value_comp() const;
```

##概要

　コンテナに関連づけられた比較オブジェクトを返す。これはコンテナ内の二つの要素を比較するために利用できる。

　この比較オブジェクトはオブジェクトの構築時にセットされ、関数ポインタであっても関数オブジェクトであっても良い。いずれにせよこれは同じ型の 2 つの引数をとり、狭義の弱順序に従って一つ目の引数が二つ目の引数の前になる場合に true、そうでない場合に false を返す。

　set コンテナでは、要素の値はキーそのものであり、従って value_comp とその兄弟面が関数である key_comp は同じである。


##戻り値

　比較オブジェクト。

　set::value_compare はメンバ型であり、Compare として定義される。これは set クラステンプレートの 2 つ目のテンプレートパラメータである。


##計算量

　定数時間。


##例

```cpp
<pre style='margin-top:0px;margin-bottom:0px;padding-bottom:5px;padding-top:3px;padding-left:10px;line-height:normal;background-color:rgb(240,240,240)'>#include <iostream>
#include <set>
using namespace std;
 
int main()
{
  set<int> c;
  set<int>::value_compare comp = c.key_comp();
 
  cout << comp(1, 2) << endl;
  cout << comp(5, 3) << endl;
 
  return 0;
}</pre>
```

###出力

```cpp
1
0
```

##参照

| | |
|-------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| [set::key_comp](/reference/set/key_comp.md) | キーを比較した結果を返す |
| [set::find](/reference/set/find.md) | 指定したキーで要素を探す |
| [set::count](/reference/set/count.md) | 指定したキーにマッチする要素の数を返す |
|[ set::lower_bound](/reference/set/lower_bound.md) | 与えられた値より小さくない最初の要素へのイテレータを返す |
| [set::upper_bound](/reference/set/upper_bound.md) | 特定の値よりも大きい最初の要素へのイテレータを返す |


