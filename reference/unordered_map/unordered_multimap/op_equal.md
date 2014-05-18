#operator== (C++11)
```cpp
template <class Key, class T, class Hash, class Pred, class Alloc>
bool operator== (const unordered_multimap<Key,T,Hash,Pred,Alloc>& x,
                 const unordered_multimap<Key,T,Hash,Pred,Alloc>& y );
```

##概要
`x` が `y` と等しいかどうかの判定を行う。


##パラメータ
- `x`, `y`<br/>
比較するコンテナ


##戻り値
二つのコンテナが等しい場合に `true`, そうでない場合に `false`。

##例外
投げない。


##計算量
平均: [`size()`](/reference/unordered_multimap/size.md) に対して線形時間
最悪: [`size()`](/reference/unordered_multimap/size.md) に対して二乗時間


##例
```cpp
#include <iostream>
#include <unordered_map>
using namespace std;

int main()
{
  unordered_multimap<int,char> c1;
  c1.insert(std::make_pair(10,'a'));
  c1.insert(std::make_pair(20,'b'));
  c1.insert(std::make_pair(30,'c'));
  c1.insert(std::make_pair(30,'d'));


  unordered_multimap<int,char> c2;
  c2.insert(std::make_pair(30,'c'));
  c2.insert(std::make_pair(10,'a'));
  c2.insert(std::make_pair(30,'d'));
  c2.insert(std::make_pair(20,'b'));

  cout << (c1 == c2) << endl;

  c2.insert(std::make_pair(30,'e'));

  cout << (c1 == c2) << endl;

  return 0;
}
```

###出力
```
1
0
```

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): ??
- [GCC, C++11 mode](/implementation#gcc.md): ??
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): ??, 11.0



