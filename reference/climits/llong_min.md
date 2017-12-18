# LLONG_MIN
* climits[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
# define LLONG_MIN implementation-defined
```

## 概要
[`long long`](/lang/cpp11/long_long_type.md) 型が表現できる値の最小値。

[`std::numeric_limits`](/reference/limits/numeric_limits.md)`<`[`long long`](/lang/cpp11/long_long_type.md)`>::`[`min()`](/reference/limits/numeric_limits/min.md) と等しいが、`LLONG_MIN` は `#if` などのプリプロセッサディレクティブで使用できる。

具体的な値は実装依存であるが、-9223372036854775807（-(2<sup>63</sup> - 1)）以下であることが規格で定められている。このマクロによって定義される値の型は [`long long`](/lang/cpp11/long_long_type.md) である。


## 例
```cpp example
#include <climits>
#include <iostream>

int main()
{
  std::cout << LLONG_MIN << '\n';
}
```


### 出力例
```
-9223372036854775808
```

## バージョン
### 言語
- C++11


### 処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4
- [GCC](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.3, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.3, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2005, 2008, 2010
