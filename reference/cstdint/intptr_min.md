# INTPTR_MIN
* cstdint[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
# define INTPTR_MIN implementation-defined
```

## 概要
[`intptr_t`](intptr_t.md) の最小値。

ビット数16をNとして、このマク�の値は-(2<sup>N-1</sup> - 1)以下となる。


## 例
```cpp example
#include <iostream>
#include <cstdint>

int main()
{
  std::intptr_t min_value = INTPTR_MIN;
  std::cout << static_cast<long long>(min_value) << std::endl;
}
```
* INTPTR_MIN[color ff0000]
* std::intptr_t[link intptr_t.md]

### 出力例
```
-9223372036854775808
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.2
- [GCC](/implementation.md#gcc): 4.4
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

