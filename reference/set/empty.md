#empty
```cpp
bool empty() const noexcept;
```

##概要

　コンテナが空かどうかをテストする。

　set コンテナが空（[size](/reference/set/size.md) が 0）の場合に true を返す。
 
　この関数はコンテナ内のコンテンツを変化させない。コンテンツをクリアするには [clear](/reference/set/clear.md) メンバを使う。


##戻り値

　コンテナサイズが 0 のときに true, そうでないときに false。


##計算量

　定数時間。


##例

```cpp
<pre style='margin-top:0px;margin-bottom:0px;padding-bottom:5px;padding-top:3px;padding-left:10px;line-height:normal;background-color:rgb(240,240,240)'>#include <iostream>
#include <set>
using namespace std;
 
int main ()
{
  set<int> c;
 
  cout << c.empty() << endl;
  
  c.insert(42);
  
  cout << c.empty() << endl;
  
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
|---------------------------------------------------------------------------------------|-----------------------|
|[ set::insert](/reference/set/insert.md) | 要素を挿入する |
| [(constructor)](/reference/set/set.md) | コンストラクタ |


