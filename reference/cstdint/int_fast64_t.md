# int_fast64_t
* cstdint[meta header]
* std[meta namespace]
* type-alias[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  using int_fast64_t = signed-integer-type;
}
```
* signed-integer-type[italic]

## 概要
64ビット以上の、通常最も高速に処理される符号付き整数型。

[`int64_t`](int64_t.md)型が環境によっては定義されないため、そのような状況でこの型を使用する。

## 例
```cpp example
#include <iostream>
#include <cstdint>
#include <type_traits>
#include <limits>

int main()
{
  // int_fast64_tの使用例
  std::int_fast64_t value = 1234567890123456789LL;
  
  // 値を出力
  std::cout << "value: " << value << std::endl;
  
  // サイズを確認（処理系によって異なる可能性がある）
  std::cout << "size of int_fast64_t: " << sizeof(std::int_fast64_t) << " bytes" << std::endl;
  
  // 最小値と最大値
  std::cout << "minimum value: " << std::numeric_limits<std::int_fast64_t>::min() << std::endl;
  std::cout << "maximum value: " << std::numeric_limits<std::int_fast64_t>::max() << std::endl;
  
  // int64_tとの比較
  std::cout << "int_fast64_t is the same as int64_t: " 
            << std::is_same<std::int_fast64_t, std::int64_t>::value << std::endl;
            
  // 演算の例（オーバーフローに注意）
  std::int_fast64_t a = 9000000000000000000LL;
  std::int_fast64_t b = 1000000000000000000LL;
  std::int_fast64_t sum = a + b;  // 処理系によってはオーバーフローの可能性あり
  
  std::cout << "9000000000000000000 + 1000000000000000000 = " << sum << std::endl;
  
  return 0;
}
```

### 出力例
```
value: 1234567890123456789
size of int_fast64_t: 8 bytes
minimum value: -9223372036854775808
maximum value: 9223372036854775807
int_fast64_t is the same as int64_t: 0
9000000000000000000 + 1000000000000000000 = -8446744073709551616
```

この出力例は特定の環境に依存しており、処理系によって異なる可能性があります。特に、`int_fast64_t`のサイズやオーバーフロー動作は処理系によって異なることがある。

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.2 [mark verified]
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified]

## 参照
- [`<cstdint>`](/reference/cstdint.md)
- [`INT_FAST64_MIN`](int_fast64_min.md)
- [`INT_FAST64_MAX`](int_fast64_max.md)
