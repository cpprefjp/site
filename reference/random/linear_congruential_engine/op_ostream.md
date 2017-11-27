# operator<<
* random[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class CharT, class Traits,
            class UIntType, UIntType a, UIntType c, UIntType m>
  basic_ostream<CharT, Traits>& operator<<(
    basic_ostream<CharT, Traits>& os
    const linear_congruential_engine<UIntType, a, c, m>& x);
}
```
* basic_ostream[link /reference/ostream/basic_ostream.md]

## 概要
ストリームへの出力を行う。


## 効果
`os`に対してフォーマットフラグ`ios_base::dec | ios_base::left`を設定する。  
フォーマットを設定した`os`に対して、エンジン`x`の現在状態を出力する。


## 事後条件
`os`のフォーマットフラグが、この関数を呼び出す前の状態に戻ること。


## 戻り値
`os`


## 例
```cpp example
#include <iostream>
#include <random>

int main()
{
  std::minstd_rand engine;
  std::cout << engine << std::endl;
}
```
* std::minstd_rand[link /reference/random/minstd_rand.md]

### 出力例
```
1
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


## 参照


