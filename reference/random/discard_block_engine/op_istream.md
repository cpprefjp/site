# operator>>
* random[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class CharT, class Traits,
            class Engine, size_t p, size_t r>
  std::basic_istream<CharT, Traits>& operator>>(
    std::basic_istream<CharT, Traits>& os
    discard_block_engine<Engine, p, r>& x);
}
```

## 概要
ストリームからの入力を行う。


## 効果
`is`に対してフォーマットフラグ`ios_base::dec`を�定する。  
フォーマットを�定した`is`から、`discard_block_engine`の状態シーケンスを�み取り、オブジェクト`x`に格納する。  
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
    std::ranlux24 engine;
    ss << engine;
  }

  // 出力結果を確認
  std::cout << ss.str() << std::endl;

  // 出力したストリームから�み込む
  {
    std::ranlux24 engine;
    ss >> engine;

    assert(ss);
  }
}
```
* std::ranlux24[link /reference/random/ranlux24.md]
* std::stringstream[link /reference/sstream/basic_stringstream.md.nolink]
* ss.str()[link /reference/sstream/basic_stringstream/str.md.nolink]

### 出力例
```
15136306 8587749 2346244 16479026 15515802 9510553 16090340 14501685 13839944 10789678 11581259 9590790 5840316 5953700 13398366 8134459 16629731 6851902 15583892 1317475 4231148 9092691 5707268 2355175 0 0 0
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


