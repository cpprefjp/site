# WINT_MIN
* cstdint[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
# define WINT_MIN implementation-defined
```

## 概要
`wint_t` の最小値。

`wint_t`が符号あり整数型として定義される場合、このマクロの値は-32768以下となる。そうでない場合、このマクロの値は0となる。


## 例
```cpp
#include <iostream>
#include <cstdint>

int main()
{
  std::wint_t min_value = WINT_MIN;
  std::cout << static_cast<long long>(min_value) << std::endl;
}
```
* WINT_MIN[color ff0000]

### 出力例
```
0
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang C++11 mode](/implementation.md#clang): 3.2
- [GCC, C++11 mode](/implementation.md#gcc): 4.4
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0, 12.0, 14.0, 14.1

