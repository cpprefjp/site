#operator<=
```cpp
template <class Key, class Compare, class Allocator>
bool operator<=(const set<Key,Compare,Allocator>& x, const set<Key,Compare,Allocator>& y);
```

##概要
`x` が `y` より小さいか等しいかの判定を行う


##パラメータ
- `x`, `y`<br/>
比較するコンテナ。


##戻り値
`x` が `y` より小さいか等しい場合に `true`, そうでない場合に `false`。


##計算量
[`size`](./size.md) に対して線形時間


##例
```cpp
#include <iostream>
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
}
```

###出力
```
1
0
```

