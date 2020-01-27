# to_ullong
* bitset[meta header]
* std[meta namespace]
* bitset[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
unsigned long long to_ullong() const;
```

## 概要
`unsigned long long`型に変換する。


## 戻り値
ビット列を`unsigned long long`型に変換して返す。


## 例外
`unsigned long long`型に変換した結果としてオーバーフ�ーした場合、[`overflow_error`](/reference/stdexcept.md)例外を送出する。


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
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 4.5.4
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013, 2015


## 参照

