# SIG_ATOMIC_MIN
* cstdint[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
# define SIG_ATOMIC_MIN implementation-defined
```

## 概要
`sig_atomic_t` の最小値。

`sig_atomic_t`が符号あり整数型として定義される場合、このマクロの値は-128以下となる。そうでない場合、このマクロの値は0となる。


## 例
```cpp
#include <iostream>
#include <cstdint>
#include <csignal>

int main()
{
  std::sig_atomic_t min_value = SIG_ATOMIC_MIN;
  std::cout << static_cast<long long>(min_value) << std::endl;
}
```
* SIG_ATOMIC_MIN[color ff0000]

### 出力例
```
-2147483648
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang C++11 mode](/implementation.md#clang): 3.3
- [GCC, C++11 mode](/implementation.md#gcc): 4.4
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

