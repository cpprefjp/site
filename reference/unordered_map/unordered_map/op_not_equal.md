# operator!=
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

## 概要
`x` が `y` と等しくないかどうかの判定を行う。


## パラメータ
- `x`, `y`<br/>
比較するコンテナ


## 戻り値
二つのコンテナが等しくない場合に `true`, そうでない場合に `false`。


## 計算量
- 平均: [`size()`](size.md) に対して線形時間
- 最悪: [`size()`](size.md) に対して二乗時間


## 例
```cpp example
#include <iostream>
#include <unordered_map>

int main()
{
  std::unordered_map<int,char> um1;
  um1[0] = 'a';

  auto um2 = um1;

  std::cout << (um1 != um2) << std::endl;

  um2[0] = 'b';

  std::cout << (um1 != um2) << std::endl;

  return 0;
}
```
* insert[link insert.md]

### 出力
```
0
1
```

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++11 mode](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??, 2012



