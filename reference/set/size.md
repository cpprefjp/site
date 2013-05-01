#size
```cpp
size_type size() const noexcept;
```

##概要

　コンテナ内の要素の数を返す。


##戻り値

　set コンテナに格納された要素の数を返す。

　
　メンバ型 size_type は符号なし整数型である。


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
 
  cout << c.size() << endl;
  
  c.insert(1);
  c.insert(2);
  c.insert(3);
  c.insert(1);
  
  cout << c.size() << endl;
  
  return 0;
}</pre>
```

###出力

```cpp
0
3
```

##参照

| | |
|-------------------------------------------------------------------------------------------|-----------------------------------------------------|
| [set::max_size](/reference/set/max_size.md) | 格納可能な最大の要素数を取得する |
| [set::empty](/reference/set/empty.md) | コンテナが空であるかどうかを調べる |


