# operator>>
* random[meta header]
* std[meta namespace]
* philox_engine[meta class]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template<class charT, class traits>
  friend basic_istream<charT, traits>&
    operator>>(basic_istream<charT, traits>& is, philox_engine& x);
}
```

## 概要
ストリームからの入力を行う。


## 効果
`is`に対してフォーマットフラグ`ios_base::dec`を設定する。  
フォーマットを設定した`is`から、乱数生成器の状態を読み取り、オブジェクト`x`に格納する。  
不正な入力だった場合、`is.setstate(ios::failbit)`を呼び出し、ストリームを失敗状態にする。


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
    std::philox4x32 engine;
    ss << engine;
  }

  // 出力結果を確認
  std::cout << ss.str() << std::endl;

  // 出力したストリームから読み込む
  {
    std::philox4x32 engine;
    ss >> engine;

    assert(ss);
  }
}
```
* std::stringstream[link /reference/sstream/basic_stringstream.md]
* ss.str()[link /reference/sstream/basic_stringstream/str.md]

### 出力
(未検証)

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 19 [mark noimpl]
- [GCC](/implementation.md#gcc): 14 [mark noimpl]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

