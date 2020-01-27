# operator>>
* random[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class CharT, class Traits, class RealType>
  std::basic_istream<CharT, Traits>& operator>>(
    std::basic_istream<CharT, Traits>& os
    cauchy_distribution<RealType>& x);
}
```

## 概要
ストリームからの入力を行う。


## 効果
分布オブジェクトのパラメータを�み取り、オブジェクト`x`に格納する。  
不�な入力だった場合、`is.setstate(ios::failbit)`を呼び出し、ストリームを失敗状態にする。


## 事後条件
`is`のフォーマットフラグが、この関数を呼び出す前の状態に戻ること。


## 戻り値
`is`


## 例
```cpp example
#include <iostream>
#include <sstream>
#include <cassert>
#include <random>

int main()
{
  std::stringstream ss;

  // ストリームへ出力
  {
    std::cauchy_distribution<> dist(0.0, 1.0);
    ss << dist;
  }

  // 出力結果を確認
  std::cout << ss.str() << std::endl;

  // 出力したストリームから�み込む
  {
    std::cauchy_distribution<> dist;
    ss >> dist;

    assert(ss);
  }
}
```
* std::stringstream[link /reference/sstream/basic_stringstream.md.nolink]
* ss.str()[link /reference/sstream/basic_stringstream/str.md.nolink]

### 出力例
```
0.00000000000000000e+00 1.00000000000000000e+00
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


