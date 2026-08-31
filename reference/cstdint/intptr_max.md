# INTPTR_MAX
* cstdint[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
#define INTPTR_MAX implementation-defined
```

## 概要
[`intptr_t`](intptr_t.md) の最大値。

ビット数16をNとして、このマクロの値は2<sup>N-1</sup> - 1以上となる。


## 備考
- このマクロの定義有無
    - C++11 : このマクロを定義するかどうかは処理系定義である ([`intptr_t`](intptr_t.md)が定義される場合にのみ定義される)
    - C++29 : このマクロは必ず定義される


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
- [Clang](/implementation.md#clang): 3.2 [mark verified]
- [GCC](/implementation.md#gcc): 4.4 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P3248R5 Require `[u]intptr_t`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3248r5.html)
    - C++29で、[`intptr_t`](intptr_t.md)が必ず定義されるようになったことにともない、このマクロも必ず定義されるようになった
