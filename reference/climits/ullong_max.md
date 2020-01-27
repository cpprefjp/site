# ULLONG_MAX
* climits[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
# define ULLONG_MAX implementation-defined
```

## 概要
[`unsigned long long`](/lang/cpp11/long_long_type.md) 型が表現できる値の最大値。

[`std::numeric_limits`](/reference/limits/numeric_limits.md)`<`[`unsigned long long`](/lang/cpp11/long_long_type.md)`>::`[`max()`](/reference/limits/numeric_limits/max.md) と�しいが、`ULLONG_MAX` は `#if` などのプリプ�セッサディレクティブで使用できる。

具体的な値は実装依�であるが、18446744073709551615（2<sup>64</sup> - 1）以上であることが規格で定められている。このマク�によって定義される値の型は [`unsigned long long`](/lang/cpp11/long_long_type.md) である。


## 例
```cpp example
#include <climits>
#include <iostream>

int main()
{
  std::cout << ULLONG_MAX << '\n';
}
```


### 出力例
```
18446744073709551615
```

## バージョン
### 言語
- C++11


### 処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4
- [GCC](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.3, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2005, 2008, 2010
