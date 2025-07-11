# operator<<
* random[meta header]
* std[meta namespace]
* philox_engine[meta class]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
template <class charT, class traits>
friend basic_ostream<charT, traits>&
  operator<<(basic_ostream<charT, traits>& os, const philox_engine& x);
```

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
  std::philox4x32 engine;
  std::cout << engine << std::endl;
}
```

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
