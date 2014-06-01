#ULLONG_MAX (C++11)
```cpp
#define ULLONG_MAX implementation-defined
```
* implementation-defined[italic]

##概要
`unsigned long long` の最大値。
`std::`[`numeric_limits`](/reference/limits/numeric_limits.md)`<unsigned long long>::`[`max`](/reference/limits/numeric_limits/max.md)`()` と等しいが、`ULLONG_MAX` は `#if` などのプリプロセッサディレクティブで使用できる。  
具体的な値は実装依存であるが、18446744073709551615（2<sup>64</sup> - 1）以上であることが規格で定められている。また、型は `unsigned long long` である。


##例
```cpp
#include <climits>
#include <iostream>

int main()
{
  std::cout << ULLONG_MAX << '\n';
}
```


###出力例
```
18446744073709551615
```

##バージョン
###言語
- C++11


###処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4
- [GCC](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.3, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0
- [GCC, C++0x mode](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.3, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 8.0, 9.0, 10.0
