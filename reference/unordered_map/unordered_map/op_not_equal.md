#operator!=
* unordered_map[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class Key, class T, class Hash, class Pred, class Alloc>
  bool operator!= (const unordered_map<Key,T,Hash,Pred,Alloc>& x,
                   const unordered_map<Key,T,Hash,Pred,Alloc>& y );
}
```

##概要
`x` が `y` と等しくないかどうかの判定を行う。


##パラメータ
- `x`, `y`<br/>
比較するコンテナ


##戻り値
二つのコンテナが等しくない場合に `true`, そうでない場合に `false`。


##計算量
平均: [`size()`](size.md) に対して線形時間  
最悪: [`size()`](size.md) に対して二乗時間


##例
```cpp
#include <iostream>
#include <map>

int main()
{
  std::map<int,char> c1;
  c1[0] = 'a';

  auto c2 = c1;

  std::cout << (c1 != c2) << std::endl;

  c2[0] = 'b';

  std::cout << (c1 != c2) << std::endl;

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



