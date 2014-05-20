#operator!= (C++11)
```cpp
template <class Key, class T, class Hash, class Pred, class Alloc>
bool operator!= (const unordered_map<Key,T,Hash,Pred,Alloc>& x,
                 const unordered_map<Key,T,Hash,Pred,Alloc>& y );
```

##概要
`x` が `y` と等しくないかどうかの判定を行う。


##パラメータ
- `x`, `y`<br/>
比較するコンテナ


##戻り値
二つのコンテナが等しくない場合に `true`, そうでない場合に `false`。


##計算量
平均: [`size()`](/reference/unordered_map/size.md) に対して線形時間
最悪: [`size()`](/reference/unordered_map/size.md) に対して二乗時間


##例
```cpp
#include <iostream>
#include <map>
using namespace std;

int main()
{
  map<int,char> c1;
  c1[0] = 'a';

  auto c2 = c1;

  cout << (c1 != c2) << endl;

  c2[0] = 'b';

  cout << (c1 != c2) << endl;

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



