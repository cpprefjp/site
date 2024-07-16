# LLONG_MAX
* climits[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
# define LLONG_MAX implementation-defined
```

## 概要
[`long long`](/lang/cpp11/long_long_type.md) 型が表現できる値の最大値。

[`std::numeric_limits`](/reference/limits/numeric_limits.md)`<`[`long long`](/lang/cpp11/long_long_type.md)`>::`[`max()`](/reference/limits/numeric_limits/max.md) と等しいが、`LLONG_MAX` は `#if` などのプリプロセッサディレクティブで使用できる。

具体的な値は実装依存であるが、9223372036854775807（2<sup>63</sup> - 1）以上であることが規格で定められている。このマクロによって定義される値の型は [`long long`](/lang/cpp11/long_long_type.md) である。


## 例
```cpp example
#include <climits>
#include <iostream>

int main()
{
  std::cout << LLONG_MAX << '\n';
}
```


### 出力例
```
9223372036854775807
```

## バージョン
### 言語
- C++11


### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified], 3.1 [mark verified], 3.2 [mark verified], 3.3 [mark verified], 3.4 [mark verified]
- [GCC](/implementation.md#gcc): 4.3.6 [mark verified], 4.4.7 [mark verified], 4.5.3 [mark verified], 4.5.4 [mark verified], 4.6.4 [mark verified], 4.7.3 [mark verified], 4.8.1 [mark verified], 4.8.2 [mark verified], 4.9.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2005 [mark verified], 2008 [mark verified], 2010 [mark verified]
