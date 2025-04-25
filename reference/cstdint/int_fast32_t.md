# int_fast32_t
* cstdint[meta header]
* std[meta namespace]
* type-alias[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  using int_fast32_t = signed-integer-type;
}
```
* signed-integer-type[italic]

## 概要
32ビット以上の、通常最も高速に処理される符号付き整数型。

[`int32_t`](int32_t.md)型が環境によっては定義されないため、そのような状況でこの型を使用する。

## 例
```cpp example
#include <iostream>
#include <cstdint>
#include <type_traits>
#include <limits>

int main()
{
  // int_fast32_tの使用例
  std::int_fast32_t value = 1234567890;
  
  // 値を出力
  std::cout << "value: " << value << std::endl;
  
  // サイズを確認（処理系によって異なる可能性がある）
  std::cout << "size of int_fast32_t: " << sizeof(std::int_fast32_t) << " bytes" << std::endl;
  
  // 最小値と最大値
  std::cout << "minimum value: " << std::numeric_limits<std::int_fast32_t>::min() << std::endl;
  std::cout << "maximum value: " << std::numeric_limits<std::int_fast32_t>::max() << std::endl;
  
  // int32_tとの比較
  std::cout << "int_fast32_t is the same as int32_t: " 
            << std::is_same<std::int_fast32_t, std::int32_t>::value << std::endl;
            
  // 演算の例（オーバーフローに注意）
  std::int_fast32_t a = 2000000000;
  std::int_fast32_t b = 1000000000;
  std::int_fast32_t sum = a + b;  // 処理系によってはオーバーフローの可能性あり
  
  std::cout << "2000000000 + 1000000000 = " << sum << std::endl;
  
  return 0;
}
```

### 出力例
```
value: 1234567890
size of int_fast32_t: 4 bytes
minimum value: -2147483648
maximum value: 2147483647
int_fast32_t is the same as int32_t: 0
2000000000 + 1000000000 = -1294967296
```

この出力例は特定の環境に依存しており、処理系によって異なる可能性があります。特に、`int_fast32_t`のサイズやオーバーフロー動作は処理系によって異なることがある。

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.2 [mark verified]
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified]
