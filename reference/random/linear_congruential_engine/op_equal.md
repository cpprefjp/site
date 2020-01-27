# operator==
* random[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class UIntType, UIntType a, UIntType c, UIntType m>
  bool operator==(
    const linear_congruential_engine<UIntType, a, c, m>& x,
    const linear_congruential_engine<UIntType, a, c, m>& y);
}
```

## 概要
�値比較を行う。


## 戻り値
`x`と`y`の状態シーケンスの、全ての値を�値比較し、�しければ`true`、そうでなければ`false`を返す。


## 計算量
O(状態シーケンスのサイズ)


## 例
```cpp example
#include <iostream>
#include <random>

int main()
{
  std::minstd_rand e1;
  std::minstd_rand e2;

  if (e1 == e2) {
    std::cout << "equal" << std::endl;
  }
  else {
    std::cout << "not equal" << std::endl;
  }
}
```
* std::minstd_rand[link /reference/random/minstd_rand.md]

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


