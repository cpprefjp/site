# MATH_ERRNO
* cmath[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
# define MATH_ERRNO 1
```

## 概要
`MATH_ERRNO`は、[`<cmath>`](../cmath.md)内で[`errno`](../cerrno/errno.md)にエラーが設定されたかを表す整数定数マクロである。

この定数と[`math_errhandling`](math_errhandling.md)でビットANDをとった結果がゼロでないか比較することにより、[`errno`](../cerrno/errno.md)にエラーが設定されたか否かを判定できる。


## 例
```cpp example
#include <iostream>
#include <cmath>
#include <cerrno>
#include <cstring>

int main()
{
  errno = 0;
  std::acosh(0.1);

  if (math_errhandling & MATH_ERRNO && errno != 0) {
    std::cout << "math error : " << std::strerror(errno) << std::endl;
  }
  else {
    std::cout << "no error" << std::endl;
  }
}
```
* MATH_ERRNO[color ff0000]
* std::acosh[link acosh.md]
* math_errhandling[link math_errhandling.md]
* errno[link ../cerrno/errno.md]

### 出力例
```
math error : Numerical argument out of domain
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
