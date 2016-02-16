#SHRT_MAX
* climits[meta header]
* macro[meta id-type]

```cpp
#define SHRT_MAX implementation-defined
```
* implementation-defined[italic]

##概要
`short` 型が表現できる値の最大値。

値は `std::`[`numeric_limits`](/reference/limits/numeric_limits.md)`<short>::`[`max`](/reference/limits/numeric_limits/max.md)`()` と等しいが、型が異なり、また `SHRT_MAX` は `#if` などのプリプロセッサディレクティブで使用できる。

具体的な値は実装依存であるが、32767（2<sup>15</sup> - 1）以上であることが規格で定められている。このマクロによって定義される値の型は `int` である。


##例
```cpp
#include <climits>
#include <iostream>

int main()
{
  std::cout << SHRT_MAX << '\n';
}
```


###出力例
```
32767
```

##バージョン
###言語
- C++03
- C++11


###処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4
- [GCC](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.3, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.3, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 7.1, 8.0, 9.0, 10.0
