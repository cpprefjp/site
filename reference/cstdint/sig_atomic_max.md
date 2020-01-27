# SIG_ATOMIC_MAX
* cstdint[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
# define SIG_ATOMIC_MAX implementation-defined
```

## 概要
`sig_atomic_t` の最大値。

`sig_atomic_t`が符号付き整数型として定義される場合、このマク�の値は127以上となる。そうでない場合、このマク�の値は255以上となる。


## 例
```cpp example
#include <iostream>
#include <cstdint>
#include <csignal>

int main()
{
  std::sig_atomic_t max_value = SIG_ATOMIC_MAX;
  std::cout << static_cast<long long>(max_value) << std::endl;
}
```
* SIG_ATOMIC_MAX[color ff0000]

### 出力例
```
2147483647
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.2
- [GCC](/implementation.md#gcc): 4.4
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

