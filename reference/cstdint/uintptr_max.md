# UINTPTR_MAX
* cstdint[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
#define UINTPTR_MAX implementation-defined
```

## 概要
[`uintptr_t`](uintptr_t.md) の最大値。

ビット数16をNとして、このマクロの値は2<sup>N</sup> - 1以上となる。


## 備考
- このマクロの定義有無
    - C++11 : このマクロを定義するかどうかは処理系定義である ([`uintptr_t`](uintptr_t.md)が定義される場合にのみ定義される)
    - C++29 : このマクロは必ず定義される


## 例
```cpp example
#include <iostream>
#include <cstdint>

int main()
{
  std::uintptr_t max_value = UINTPTR_MAX;
  std::cout << static_cast<unsigned long long>(max_value) << std::endl;
}
```
* UINTPTR_MAX[color ff0000]
* std::uintptr_t[link uintptr_t.md]

### 出力例
```
18446744073709551615
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
    - C++29で、[`uintptr_t`](uintptr_t.md)が必ず定義されるようになったことにともない、このマクロも必ず定義されるようになった
