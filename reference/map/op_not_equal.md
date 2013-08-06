#operator!=
```cpp
template <class Key, class T, class Compare, class Allocator>
bool operator!=(const map<Key,T,Compare,Allocator>& x, const map<Key,T,Compare,Allocator>& y);
```

##概要
`x` と `y` が等しくないかどうかの判定を行う。


##パラメータ
- `x`, `y`<br/>
比較するコンテナ。


##戻り値
二つのコンテナが等しくない場合に `true`, そうでない場合に `false`。


##計算量
[`size()`](./size.md) に対して線形時間。


##例
```cpp
#include <iostream>
#include <map>
using namespace std;

int main()
{
  map<int,char> s1, s2;
  s1.insert(std::make_pair(1,'a'));
  s1.insert(std::make_pair(2,'b'));
  s1.insert(std::make_pair(3,'c'));
  s2 = s1;

  cout << (s1 != s2) << endl;

  s2.insert(std::make_pair(4,'d'));

  cout << (s1 != s2) << endl;

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

