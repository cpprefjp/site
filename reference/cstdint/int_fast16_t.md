# int_fast16_t
* cstdint[meta header]
* std[meta namespace]
* type-alias[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  using int_fast16_t = signed-integer-type;
}
```
* signed-integer-type[italic]

## 概要
16ビット以上の、通常最も高速に処理される符号付き整数型。

[`int16_t`](int16_t.md)型が環境によっては定義されないため、そのような状況でこの型を使用する。

## 例
```cpp example
#include <iostream>
#include <cstdint>
#include <type_traits>
#include <limits>

int main()
{
  // int_fast16_tの使用例
  std::int_fast16_t value = 12345;
  
  // 値を出力
  std::cout << "value: " << value << std::endl;
  
  // サイズを確認（処理系によって異なる可能性がある）
  std::cout << "size of int_fast16_t: " << sizeof(std::int_fast16_t) << " bytes" << std::endl;
  
  // 最小値と最大値
  std::cout << "minimum value: " << std::numeric_limits<std::int_fast16_t>::min() << std::endl;
  std::cout << "maximum value: " << std::numeric_limits<std::int_fast16_t>::max() << std::endl;
  
  // int16_tとの比較
  std::cout << "int_fast16_t is the same as int16_t: " 
            << std::is_same<std::int_fast16_t, std::int16_t>::value << std::endl;
            
  // 演算の例（オーバーフローに注意）
  std::int_fast16_t a = 30000;
  std::int_fast16_t b = 10000;
  std::int_fast16_t sum = a + b;  // 処理系によってはオーバーフローの可能性あり
  
  std::cout << "30000 + 10000 = " << sum << std::endl;
  
  return 0;
}
```

### 出力例
```
value: 12345
size of int_fast16_t: 4 bytes
minimum value: -32768
maximum value: 32767
int_fast16_t is the same as int16_t: 0
30000 + 10000 = -25536
```

この出力例は特定の環境に依存しており、処理系によって異なる可能性があります。特に、`int_fast16_t`のサイズやオーバーフロー動作は処理系によって異なることがある。

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.2 [mark verified]
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified]
