# INT_FAST32_MAX
* cstdint[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
# define INT_FAST32_MAX implementation-defined
```

## 概要
[`int_fast32_t`](int_fast32_t.md) の最大値を表す定数。

[`std::numeric_limits`](/reference/limits/numeric_limits.md)`<int_fast32_t>::`[`max()`](/reference/limits/numeric_limits/max.md) と等しい。

## 例
```cpp example
#include <iostream>
#include <cstdint>
#include <limits>

int main()
{
  std::cout << "INT_FAST32_MAX: " << INT_FAST32_MAX << std::endl;
  
  // numeric_limitsによる値と一致することを確認
  std::cout << "numeric_limits<int_fast32_t>::max(): "
            << std::numeric_limits<std::int_fast32_t>::max() << std::endl;
  
  std::cout << "INT_FAST32_MAX == numeric_limits<int_fast32_t>::max(): "
            << std::boolalpha
            << (INT_FAST32_MAX == std::numeric_limits<std::int_fast32_t>::max()) << std::endl;
  
  // 型の確認
  std::int_fast32_t max_value = INT_FAST32_MAX;
  std::cout << "型を通したときの値: " << max_value << std::endl;
  
  // オーバーフローの確認
  std::int_fast32_t value = INT_FAST32_MAX;
  std::cout << "INT_FAST32_MAX: " << value << std::endl;
  std::cout << "INT_FAST32_MAX + 1: " << value + 1 << std::endl;
  
  return 0;
}
```

### 出力例
```
INT_FAST32_MAX: 2147483647
numeric_limits<int_fast32_t>::max(): 2147483647
INT_FAST32_MAX == numeric_limits<int_fast32_t>::max(): true
型を通したときの値: 2147483647
INT_FAST32_MAX: 2147483647
INT_FAST32_MAX + 1: -2147483648
```

この出力例は処理系によって異なる場合がある。特に、`int_fast32_t`の実際の型が処理系によって異なる可能性があるため、最大値やオーバーフロー動作も異なることがある。

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.2 [mark verified]
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified]
