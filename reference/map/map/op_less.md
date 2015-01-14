#operator<
```cpp
template <class Key, class T, class Compare, class Allocator>
bool operator< (const map<Key,T,Compare,Allocator>& x, const map<Key,T,Compare,Allocator>& y);
```

##概要
`x` が `y` より小さいかどうかの判定を行う。


##パラメータ
- `x`, `y`<br/>
比較するコンテナ


##戻り値
`x` が `y` より小さい場合に `true`, そうでない場合に `false`。


##計算量
[`size()`](/reference/map/map/size.md) に対して線形時間。


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

  cout << (s1 < s2) << endl;

  s2.insert(std::make_pair('d',40));

  cout << (s1 < s2) << endl;

  return 0;
}
```

###出力
```
0
1
```

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++11 mode](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??, 11.0


