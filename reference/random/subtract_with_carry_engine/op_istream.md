#operator>>(C++11)
```cpp
namespace std {
  template <class CharT, class Traits,
            class UIntType, size_t w, size_t s, size_t r>
  basic_istream<CharT, Traits>& operator>>(
    basic_istream<CharT, Traits>& os
    subtract_with_carry_engine<UIntType, w, s, r>& x);
}
```
* basic_istream[link /reference/iostream/basic_istream.md]

##概要
ストリームからの入力を行う。


##効果
`is`に対してフォーマットフラグ`ios_base::dec`を設定する。  
フォーマットを設定した`is`から、`subtract_with_carry_engine`の状態シーケンスを読み取り、オブジェクト`x`に格納する。  
不正な入力だった場合、`is.setstate(ios::failbit)`を呼び出し、ストリームを失敗状態にする。


##事後条件
`is`のフォーマットフラグが、この関数を呼び出す前の状態に戻ること。


##戻り値
`is`


##例
```cpp
#include <iostream>
#include <sstream>
#include <cassert>
#include <random>

int main()
{
  std::stringstream ss;

  // ストリームへ出力
  {
    std::ranlux24_base engine;
    ss << engine;
  }

  // 出力結果を確認
  std::cout << ss.str() << std::endl;

  // 出力したストリームから読み込む
  {
    std::ranlux24_base engine;
    ss >> engine;

    assert(ss);
  }
}
```
* ranlux24_base[link /reference/random/ranlux24_base.md]

###出力例
```
15136306 8587749 2346244 16479026 15515802 9510553 16090340 14501685 13839944 10789678 11581259 9590790 5840316 5953700 13398366 8134459 16629731 6851902 15583892 1317475 4231148 9092691 5707268 2355175 0 0
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.2
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照


