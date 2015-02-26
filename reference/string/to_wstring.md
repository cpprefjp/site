#to_wstring (C++11)
* string[meta header]
* std[meta namespace]

```cpp
namespace std {
  string to_wstring(int val);
  string to_wstring(unsigned int val);
  string to_wstring(long val);
  string to_wstring(unsigned long val);
  string to_wstring(long long val);
  string to_wstring(unsigned long long val);
  string to_wstring(float val);
  string to_wstring(double val);
  string to_wstring(long double val);
}
```

##概要
数値`val`を`wstring`型文字列に変換する。


##戻り値
各数値型に対して、`swprintf(buf, buffsize, fmt, val)`によって生成された文字列の`wstring`オブジェクトを返す。使用されるバッファサイズは未規定。

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


##例
```cpp
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

###出力
```
123
3.140000
```

##実装例
```cpp
#include <cstdio>
#include <string>
#include <limits>

std::wstring to_wstring(int val)
{
  const std::size_t size = std::numeric_limits<int>::digits10 + 2; // '-' + NULL
  wchar_t buffer[size];
  std::swprintf(buffer, size, L"%d", val);
  return buffer;
}

std::wstring to_wstring(unsigned int val)
{
  const std::size_t size = std::numeric_limits<unsigned int>::digits10 + 1;
  wchar_t buffer[size];
  std::swprintf(buffer, size, L"%u", val);
  return buffer;
}

std::wstring to_wstring(long val)
{
  const std::size_t size = std::numeric_limits<long>::digits10 + 2; // '-' + NULL
  wchar_t buffer[size];
  std::swprintf(buffer, size, L"%ld", val);
  return buffer;
}

std::wstring to_wstring(unsigned long val)
{
  const std::size_t size = std::numeric_limits<unsigned long>::digits10 + 1;
  wchar_t buffer[size];
  std::swprintf(buffer, size, L"%lu", val);
  return buffer;
}

std::wstring to_wstring(long long int val)
{
  const std::size_t size = std::numeric_limits<long long int>::digits10 + 2; // '-' + NULL;
  wchar_t buffer[size];
  std::swprintf(buffer, size, L"%lld", val);
  return buffer;
}

std::wstring to_wstring(unsigned long long int val)
{
  const std::size_t size = std::numeric_limits<unsigned long long int>::digits10 + 1;
  wchar_t buffer[size];
  std::swprintf(buffer, size, L"%llu", val);
  return buffer;
}

std::wstring to_wstring(float val)
{
  const std::size_t size = std::numeric_limits<float>::max_exponent10
                           + 6  // fixed precision (printf's default)
                           + 3; // '-' + '.' + NULL
  wchar_t buff[size];
  std::swprintf(buff, size, L"%f", val);
  return buff;
}

std::wstring to_wstring(double val)
{
  const std::size_t size = std::numeric_limits<double>::max_exponent10
                           + 6  // fixed precision (printf's default)
                           + 3; // '-' + '.' + NULL

  wchar_t buff[size];
  std::swprintf(buff, size, L"%f", val);
  return buff;
}

std::wstring to_wstring(long double val)
{
  const std::size_t size = std::numeric_limits<long double>::max_exponent10
                           + 6  // fixed precision (printf's default)
                           + 3; // '-' + '.' + NULL
  wchar_t buff[size];
  std::swprintf(buff, size, L"%Lf", val);
  return buff;
}
```

##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.5.4
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

##参照

| 名前                          | 参照                     |
|-------------------------------|--------------------------|
| [`to_string`](./to_string.md) | 数値を`string`に変換する |

