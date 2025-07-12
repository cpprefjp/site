# operator>>
* random[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class CharT, class Traits>
  std::basic_istream<CharT, Traits>& operator>>(
    std::basic_istream<CharT, Traits>& os
    bernoulli_distribution& x);
}
```

## 概要
ストリームからの入力を行う。


## 効果
`bernoulli_distribution`のパラメータを読み取り、オブジェクト`x`に格納する。  
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
    std::bernoulli_distribution dist(0.3);
    ss << dist;
  }

  // 出力結果を確認
  std::cout << ss.str() << std::endl;

  // 出力したストリームから読み込む
  {
    std::bernoulli_distribution dist;
    ss >> dist;

    assert(ss);
  }
}
```
* std::stringstream[link /reference/sstream/basic_stringstream.md]
* ss.str()[link /reference/sstream/basic_stringstream/str.md]

### 出力例
```
2.99999999999999989e-01
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.2 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
