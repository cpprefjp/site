#operator>
```cpp
template <class Key, class T, class Compare, class Allocator>
bool operator> (const map<Key,T,Compare,Allocator>& x, const map<Key,T,Compare,Allocator>& y);
```

##概要
`x` が `y` より大きいかどうかの判定を行う。


##パラメータ
- `x`, `y`<br/>
比較するコンテナ。


##戻り値
`x` が `y` より大きい場合に `true`, そうでない場合に `false`。


##計算量
[`size`](/reference/map/size.md) に対して線形時間。


##例
```cpp
#include <iostream>
#include <map>
using namespace std;

int main()
{
  map<char,int> s1, s2;
  s1.insert(std::make_pair('a',10));
  s1.insert(std::make_pair('b',20));
  s1.insert(std::make_pair('c',30));
  s2 = s1;

  cout << (s1 > s2) << endl;

  s1.insert(std::make_pair('d',40));

  cout << (s1 > s2) << endl;

  return 0;
}
```

###出力
```
0
1
```


###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): ??
- [GCC, C++11 mode](/implementation#gcc.md): ??
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): ??, 11.0


