#end, cend
```cpp
iterator end() noexcept;

const_iterator end() const noexcept;

// since C++11
const_iterator cend() const noexcept;
```

##概要

　set コンテナの最後の要素の次を参照するイテレータを返す。


##戻り値

　コンテナの最後の要素の次を参照するイテレータ。

　iterator と const_iterator はいずれもメンバ型である。set クラステンプレートにおいて、これらは bidirectional iterator である。


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
  c.insert(5);
  c.insert(2);
  c.insert(4);
  c.insert(1);
  c.insert(0);
  c.insert(0);
  c.insert(9);
 
  set<int>::iterator i = c.begin();
  while (i != c.end())
    cout << *i++ << " ";
  
  return 0;
}</pre>
```

###出力

```cpp
0 1 2 4 5 9 
```

##参照

| | |
|------------------------------------------------------------------------------------------------|--------------------------------------------------|
| [set::begin, cbegin](/reference/set/begin.md) | 先頭を指すイテレータを取得する |
| [set::rbegin, crbegin](/reference/set/rbegin.md) | 末尾を指す逆イテレータを取得する |
| [set::rend, crend](/reference/set/rend.md) | 先頭を指す逆イテレータを取得する |


