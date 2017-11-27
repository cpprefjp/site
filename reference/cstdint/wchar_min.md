# WCHAR_MIN
* cstdint[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
# define WCHAR_MIN implementation-defined
```

## 概要
`wchar_t` の最小値。

`wchar_t`が符号あり整数型として定義される場合、このマクロの値は-128以下となる。そうでない場合、このマクロの値は0となる。

## 例
```cpp example
#include <iostream>
#include <cstdint>

int main()
{
  wchar_t min_value = WCHAR_MIN;
  std::cout << static_cast<long long>(min_value) << std::endl;
}
```
* WCHAR_MIN[color ff0000]

### 出力例
```
-2147483648
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang C++11 mode](/implementation.md#clang): 3.2
- [GCC, C++11 mode](/implementation.md#gcc): 4.3
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0, 12.0, 14.0, 14.1

