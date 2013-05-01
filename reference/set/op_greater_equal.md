#operator>=
```cpp
template <class Key, class Compare, class Allocator>
bool operator>=(const set<Key,Compare,Allocator>& x, const set<Key,Compare,Allocator>& y);
```

##概要

　x が y より大きいか等しいかの判定を行う。


##引数
　・x, y
　　比較するコンテナ。


##戻り値
　x が y より大きいか等しい場合に true, そうでない場合に false。



##計算量

　[size](/reference/set/size.md) に対して線形時間。


##例

```cpp
<pre style='margin-top:0px;margin-bottom:0px;padding-bottom:5px;padding-top:3px;padding-left:10px;line-height:normal;background-color:rgb(240,240,240)'>#include <iostream>
#include <set>
using namespace std;
 
int main()
{
  set<int> s1, s2;
  s1.insert(10);
  s1.insert(20);
  s1.insert(30);
  s2 = s1;
  
  cout << (s1 >= s2) << endl;
 
  s2.insert(40);
 
  cout << (s1 >= s2) << endl;
 
  return 0;
}</pre>
```

###出力

```cpp
1
0
```

##
