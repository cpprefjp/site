#operator== (C++11)
* unordered_map[meta header]
* std[meta namespace]
* function[meta id-type]

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
平均: [`size()`](size.md) に対して線形時間  
最悪: [`size()`](size.md) に対して二乗時間


##例
```cpp
#include <iostream>
#include <unordered_map>

int main()
{
  std::unordered_multimap<int,char> c1;
  c1.insert(std::make_pair(10,'a'));
  c1.insert(std::make_pair(20,'b'));
  c1.insert(std::make_pair(30,'c'));
  c1.insert(std::make_pair(30,'d'));


  std::unordered_multimap<int,char> c2;
  c2.insert(std::make_pair(30,'c'));
  c2.insert(std::make_pair(10,'a'));
  c2.insert(std::make_pair(30,'d'));
  c2.insert(std::make_pair(20,'b'));

  std::cout << (c1 == c2) << std::endl;

  c2.insert(std::make_pair(30,'e'));

  std::cout << (c1 == c2) << std::endl;

  return 0;
}
```

###出力
```
1
0
```

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++11 mode](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??, 11.0



