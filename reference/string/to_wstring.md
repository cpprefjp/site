# to_wstring
* string[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  wstring to_wstring(int val);
  wstring to_wstring(unsigned int val);
  wstring to_wstring(long val);
  wstring to_wstring(unsigned long val);
  wstring to_wstring(long long val);
  wstring to_wstring(unsigned long long val);
  wstring to_wstring(float val);
  wstring to_wstring(double val);
  wstring to_wstring(long double val);
}
```

## 概要
数値`val`を`wstring`型文�列に変換する。


## 戻り値
各数値型に対して、`swprintf(buf, buffsize, fmt, val)`によって生成された文�列の`wstring`オブジェクトを返す。使用されるバッファサイズは未規定。

各型で使用されるフォーマットは以下のようになる：

| 型                   | フォーマット  |
|----------------------|---------------|
| `int`                | `L"%d"`       |
| `unsigned int`       | `L"%u"`       |
| `long`               | `L"%ld"`      |
| `unsigned long`      | `L"%lu"`      |
| `long long`          | `L"%lld"`     |
| `unsigned long long` | `L"%llu"`     |
| `float`              | `L"%f"`       |
| `double`             | `L"%f"`       |
| `long double`        | `L"%Lf"`      |


## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  std::wstring s1 = std::to_wstring(123);
  std::wcout << s1 << std::endl;

  std::wstring s2 = std::to_wstring(3.14);
  std::wcout << s2 << std::endl;
}
```
* std::to_wstring[color ff0000]

### 出力
```
123
3.140000
```

## 実装例
```cpp
#include <cstdio>
#include <string>
#include <limits>

std::wstring to_wstring(int val)
{
  const std::size_t size = std::numeric_limits<int>::digits10 + 1
                           + 2; // '-' + '\0'
  wchar_t buffer[size];
  std::swprintf(buffer, size, L"%d", val);
  return buffer;
}

std::wstring to_wstring(unsigned int val)
{
  const std::size_t size = std::numeric_limits<unsigned int>::digits10 + 1
                           + 1; // '\0'
  wchar_t buffer[size];
  std::swprintf(buffer, size, L"%u", val);
  return buffer;
}

std::wstring to_wstring(long val)
{
  const std::size_t size = std::numeric_limits<long>::digits10 + 1
                           + 2; // '-' + '\0'
  wchar_t buffer[size];
  std::swprintf(buffer, size, L"%ld", val);
  return buffer;
}

std::wstring to_wstring(unsigned long val)
{
  const std::size_t size = std::numeric_limits<unsigned long>::digits10 + 1
                           + 1; // '\0'
  wchar_t buffer[size];
  std::swprintf(buffer, size, L"%lu", val);
  return buffer;
}

std::wstring to_wstring(long long int val)
{
  const std::size_t size = std::numeric_limits<long long int>::digits10 + 1
                           + 2; // '-' + '\0';
  wchar_t buffer[size];
  std::swprintf(buffer, size, L"%lld", val);
  return buffer;
}

std::wstring to_wstring(unsigned long long int val)
{
  const std::size_t size = std::numeric_limits<unsigned long long int>::digits10 + 1
                           + 1; // '\0'
  wchar_t buffer[size];
  std::swprintf(buffer, size, L"%llu", val);
  return buffer;
}

std::wstring to_wstring(float val)
{
  const std::size_t size = std::numeric_limits<float>::max_exponent10 + 1
                           + 6  // fixed precision (printf's default)
                           + 3; // '-' + '.' + '\0'
  wchar_t buffer[size];
  std::swprintf(buffer, size, L"%f", val);
  return buffer;
}

std::wstring to_wstring(double val)
{
  const std::size_t size = std::numeric_limits<double>::max_exponent10 + 1
                           + 6  // fixed precision (printf's default)
                           + 3; // '-' + '.' + '\0'

  wchar_t buffer[size];
  std::swprintf(buffer, size, L"%f", val);
  return buffer;
}

std::wstring to_wstring(long double val)
{
  const std::size_t size = std::numeric_limits<long double>::max_exponent10 + 1
                           + 6  // fixed precision (printf's default)
                           + 3; // '-' + '.' + '\0'
  wchar_t buffer[size];
  std::swprintf(buffer, size, L"%Lf", val);
  return buffer;
}
```
* digits10[link /reference/limits/numeric_limits/digits10.md]
* max_exponent10[link /reference/limits/numeric_limits/max_exponent10.md]

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 4.5.4
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013, 2015, 2017
    - 2010は、不完全な実装。以下の型のみ多重定義されている。
        - `long long`
        - `unsigned long long`
        - `long double`


## 関連項目

| 名前                          | 参照                     |
|-------------------------------|--------------------------|
| [`to_string`](to_string.md) | 数値を`string`に変換する |


## 参照
- [N2408 Simple Numeric Access Revision 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2408.html)

