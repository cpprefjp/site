#ULONG_MAX
* climits[meta header]

```cpp
#define ULONG_MAX implementation-defined
```
* implementation-defined[italic]

##概要
`unsigned long` の最大値。
`std::`[`numeric_limits`](/reference/limits/numeric_limits.md)`<unsigned long>::`[`max`](/reference/limits/numeric_limits/max.md)`()` と等しいが、`ULONG_MAX` は `#if` などのプリプロセッサディレクティブで使用できる。  
具体的な値は実装依存であるが、4294967295（2<sup>32</sup> - 1）以上であることが規格で定められている。また、型は `unsigned long` である。


##例
```cpp
#include <climits>
#include <iostream>

int main()
{
  std::cout << ULONG_MAX << '\n';
}
```


###出力例
```
4294967295
```

##バージョン
###言語
- C++03
- C++11


###処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4
- [GCC](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.3, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0
- [GCC, C++0x mode](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.3, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 7.1, 8.0, 9.0, 10.0
