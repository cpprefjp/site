#clear
```cpp
void clear() noexcept;
```

##概要

　set コンテナ内の全ての要素を削除する。それぞれのデストラクタが呼ばれ、コンテナから削除される。[size](/reference/set/size.md) は 0 になる。


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
  
  c.insert(10);
  c.insert(20);
  c.insert(30);
 
  cout << c.size() << endl;
 
  c.clear();
 
  cout << c.size() << endl;
  
  return 0;
}</pre>
```

###出力

```cpp
3
0
```

##参照

| | |
|-------------------------------------------------------------------------------------|-----------------------------------------------------|
| [set::erase](/reference/set/erase.md) | 要素を削除する |
| [set::size](/reference/set/size.md) | 要素数を取得する |
| [set::empty](/reference/set/empty.md) | コンテナが空であるかどうかを調べる |



