# WINT_MAX
* cstdint[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
#define WINT_MAX implementation-defined
```

## 概要
`wint_t` の最大値。

`wint_t`が符号付き整数型として定義される場合、このマクロの値は32767以上となる。そうでない場合、このマクロの値は65535以上となる。


## 例
```cpp example
#include <iostream>
#include <cstdint>

int main()
{
  std::wint_t max_value = WINT_MAX;
  std::cout << static_cast<long long>(max_value) << std::endl;
}
```
* WINT_MAX[color ff0000]

### 出力例
```
4294967295
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.2 [mark verified]
- [GCC](/implementation.md#gcc): 4.4 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified], 2015 [mark verified], 2017 [mark verified]
