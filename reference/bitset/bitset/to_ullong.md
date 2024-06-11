# to_ullong
* bitset[meta header]
* std[meta namespace]
* bitset[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
unsigned long long to_ullong() const;           // (1) C++11
constexpr unsigned long long to_ullong() const; // (1) C++23
```

## 概要
`unsigned long long`型に変換する。


## 戻り値
ビット列を`unsigned long long`型に変換して返す。


## 例外
`unsigned long long`型に変換した結果としてオーバーフローした場合、[`overflow_error`](/reference/stdexcept.md)例外を送出する。


## 例
```cpp example
#include <iostream>
#include <bitset>

int main()
{
  std::bitset<4> bs("1011");

  unsigned long long result = bs.to_ullong();
  std::cout << result << std::endl;
}
```

### 出力
```
11
```

## バージョン
### 言語
- C++11


### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.5.4 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]


## 参照
- [P2417R2 A more constexpr bitset](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2417r2.pdf)
