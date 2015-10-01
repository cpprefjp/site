#LLONG_MAX
* climits[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
#define LLONG_MAX implementation-defined
```
* implementation-defined[italic]

##概要
`long long` の最大値。
`std::`[`numeric_limits`](/reference/limits/numeric_limits.md)`<long long>::`[`max`](/reference/limits/numeric_limits/max.md)`()` と等しいが、`LLONG_MAX` は `#if` などのプリプロセッサディレクティブで使用できる。  
具体的な値は実装依存であるが、9223372036854775807（2<sup>63</sup> - 1）以上であることが規格で定められている。また、型は `long long` である。


##例
```cpp
#include <climits>
#include <iostream>

int main()
{
  std::cout << LLONG_MAX << '\n';
}
```


###出力例
```
9223372036854775807
```

##バージョン
###言語
- C++11


###処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4
- [GCC](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.3, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.3, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 8.0, 9.0, 10.0
