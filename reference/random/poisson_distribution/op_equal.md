# operator==
* random[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class IntType>
  bool operator==(
    const poisson_distribution<IntType>& a,
    const poisson_distribution<IntType>& b);
}
```

## 概要
�値比較を行う。


## 戻り値
`a.`[`param()`](param.md) `== b.`[`param()`](param.md)であり、かつ`a(g)`によって生成される値の無限シーケンス`S1`、`b(g)`によって生成される値の無限シーケンス`S2`が�しい場合`true`を返し、そうでなければ`false`を返す。


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <random>

int main()
{
  std::poisson_distribution<> a(1.0);
  std::poisson_distribution<> b(1.0);

  if (a == b) {
    std::cout << "equal" << std::endl;
  }
  else {
    std::cout << "not equal" << std::endl;
  }
}
```

### 出力
```
equal
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照


