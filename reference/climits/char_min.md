#CHAR_MIN
```cpp
#define CHAR_MIN implementation-defined
```
* implementation-defined[italic]

##概要
`char` の最小値。
値は `std::`[`numeric_limits`](/reference/limits/numeric_limits.md)`<char>::`[`min`](/reference/limits/numeric_limits/min.md)`()` と等しいが、型が異なり、また `CHAR_MIN` は `#if` などのプリプロセッサディレクティブで使用できる。  
具体的な値は実装依存であるが、`char` が符号付きであれば [`SCHAR_MIN`](schar_min.md) と同じ、符号無しであれば `0` である。また、型は `int` である。


##例
```cpp
#include <climits>
#include <iostream>

int main()
{
  std::cout << CHAR_MIN << '\n';
}
```


###出力例
```
-128
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
