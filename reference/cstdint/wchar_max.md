# WCHAR_MAX
* cstdint[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
# define WCHAR_MAX implementation-defined
```

## 概要
`wchar_t` の最大値。

`wchar_t`が符号付き整数型として定義される場合、このマク�の値は127以上となる。そうでない場合、このマク�の値は255以上となる。

## 例
```cpp example
#include <iostream>
#include <cstdint>

int main()
{
  wchar_t max_value = WCHAR_MAX;
  std::cout << static_cast<long long>(max_value) << std::endl;
}
```
* WCHAR_MAX[color ff0000]

### 出力例
```
2147483647
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.2
- [GCC](/implementation.md#gcc): 4.3
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013, 2015, 2017

