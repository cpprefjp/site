# LONG_MIN
* climits[meta header]
* macro[meta id-type]

```cpp
#define LONG_MIN implementation-defined
```

## 概要
`long` 型が表現できる値の最小値。

[`std::numeric_limits`](/reference/limits/numeric_limits.md)`<long>::`[`min()`](/reference/limits/numeric_limits/min.md) と等しいが、`LONG_MIN` は `#if` などのプリプロセッサディレクティブで使用できる。

具体的な値は実装依存であるが、-2147483647（-(2<sup>31</sup> - 1)）以下であることが規格で定められている。このマクロによって定義される値の型は `long` である。


## 例
```cpp example
#include <climits>
#include <iostream>

int main()
{
  std::cout << LONG_MIN << '\n';
}
```


### 出力例
```
-2147483648
```

## バージョン
### 言語
- C++03
- C++11


### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified], 3.1 [mark verified], 3.2 [mark verified], 3.3 [mark verified], 3.4 [mark verified]
- [GCC](/implementation.md#gcc): 4.3.6 [mark verified], 4.4.7 [mark verified], 4.5.3 [mark verified], 4.5.4 [mark verified], 4.6.4 [mark verified], 4.7.3 [mark verified], 4.8.1 [mark verified], 4.8.2 [mark verified], 4.9.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2003 [mark verified], 2005 [mark verified], 2008 [mark verified], 2010 [mark verified]
