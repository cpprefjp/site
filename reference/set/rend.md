#rend, crend
```cpp
reverse_iterator rend() noexcept;

const_reverse_iterator rend() const noexcept;
```

// since C++11
const_reverse_iterator crend() const noexcept;




##概要

　set コンテナの先頭要素の前（これは反転シーケンスの末尾にあたる）を指す逆イテレータを返す。

　rend は [begin](/reference/set/begin.md) と同じ要素を指すわけではなく、その前の要素を指すことに注意。


##戻り値
　反転シーケンスの終端を指す逆イテレータ。

　reverse_iterator と const_reverse_iterator はメンバ型である。set クラステンプレートにおいて、これらは逆 bidirectional iterator であり、それぞれ reverse_iterator<iterator>, reverse_iterator<const_iterator> と定義される。


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
 
  set<int>::iterator i = c.rbegin();
  while (i != c.rend())
    cout << *i++ << " ";
  
  return 0;
}</pre>
```

###出力

```cpp
9 5 4 2 1 0 
```

##参照

| | |
|------------------------------------------------------------------------------------------------|--------------------------------------------|
| [set::rbegin, crbegin](/reference/set/rbegin.md) | 末尾を指す逆イテレータを返す |
| [set::begin, cbegin](/reference/set/begin.md) | 先頭を指すイテレータを返す |
| [set::end, cend](/reference/set/end.md) | 末尾を指すイテレータを返す |


