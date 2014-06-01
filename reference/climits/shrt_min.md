#SHRT_MIN
```cpp
#define SHRT_MIN implementation-defined
```
* implementation-defined[italic]

##概要
`short` の最小値。
値は `std::`[`numeric_limits`](/reference/limits/numeric_limits.md)`<short>::`[`min`](/reference/limits/numeric_limits/min.md)`()` と等しいが、型が異なり、また `SHRT_MIN` は `#if` などのプリプロセッサディレクティブで使用できる。  
具体的な値は実装依存であるが、-32767（-(2<sup>15</sup> - 1)）以下であることが規格で定められている。また、型は `int` である。


##例
```cpp
#include <climits>
#include <iostream>

int main()
{
  std::cout << SHRT_MIN << '\n';
}
```


###出力例
```
-32768
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
