#begin, cbegin
```cpp
iterator begin() noexcept;

const_iterator begin() const noexcept;
```

// since C++11
const_iterator cbegin() const noexcept;





##概要

　set コンテナの先頭要素を参照するイテレータを返す。
　内部的に、set コンテナは要素を下位から上位へと並べており、従って begin, cbegin は set 内の最下位のキーにあたる値を返す。


##戻り値

　コンテナの先頭要素へのイテレータ。

　iterator と const_iterator はともにメンバ型である。set クラステンプレートにおいて、これらは bidirectional iterator である。


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
| [set::end, cend](/reference/set/end.md) | 末尾を指すイテレータを取得する |
| [set::rbegin, crbegin](/reference/set/rbegin.md) | 末尾を指す逆イテレータを取得する |
| [set::rend, crend](/reference/set/rend.md) | 先頭を指す逆イテレータを取得する |


