#LONG_MIN
* climits[meta header]

```cpp
#define LONG_MIN implementation-defined
```
* implementation-defined[italic]

##概要
`long` の最小値。
`std::`[`numeric_limits`](/reference/limits/numeric_limits.md)`<long>::`[`min`](/reference/limits/numeric_limits/min.md)`()` と等しいが、`LONG_MIN` は `#if` などのプリプロセッサディレクティブで使用できる。  
具体的な値は実装依存であるが、-2147483647（-(2<sup>31</sup> - 1)）以下であることが規格で定められている。また、型は `long` である。


##例
```cpp
#include <climits>
#include <iostream>

int main()
{
  std::cout << LONG_MIN << '\n';
}
```


###出力例
```
-2147483648
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
