# INTPTR_MAX
* cstdint[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
# define INTPTR_MAX implementation-defined
```

## 概要
[`intptr_t`](intptr_t.md) の最大値。

ビット数16をNとして、このマク�の値は2<sup>N-1</sup> - 1以上となる。


## 例
```cpp example
#include <iostream>
#include <cstdint>

int main()
{
  std::intptr_t max_value = INTPTR_MAX;
  std::cout << static_cast<long long>(max_value) << std::endl;
}
```
* INTPTR_MAX[color ff0000]
* std::intptr_t[link intptr_t.md]

### 出力例
```
9223372036854775807
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.2
- [GCC](/implementation.md#gcc): 4.4
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

