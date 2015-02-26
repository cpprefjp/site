#to_string (C++11)
* string[meta header]
* std[meta namespace]

```cpp
namespace std {
  string to_string(int val);
  string to_string(unsigned int val);
  string to_string(long val);
  string to_string(unsigned long val);
  string to_string(long long val);
  string to_string(unsigned long long val);
  string to_string(float val);
  string to_string(double val);
  string to_string(long double val);
}
```

##概要
数値`val`を`string`型文字列に変換する。


##戻り値
各数値型に対して、`sprintf(buf, fmt, val)`によって生成された文字列の`string`オブジェクトを返す。使用されるバッファサイズは未規定。

各型で使用されるフォーマットは以下のようになる：

| 型                   | フォーマット |
|----------------------|--------------|
| `int`                | `"%d"`       |
| `unsigned int`       | `"%u"`       |
| `long`               | `"%ld"`      |
| `unsigned long`      | `"%lu"`      |
| `long long`          | `"%lld"`     |
| `unsigned long long` | `"%llu"`     |
| `float`              | `"%f"`       |
| `double`             | `"%f"`       |
| `long double`        | `"%Lf"`      |


##例
```cpp
#include <iostream>
#include <string>

int main()
{
  std::string s1 = std::to_string(123);
  std::cout << s1 << std::endl;

  std::string s2 = std::to_string(3.14);
  std::cout << s2 << std::endl;
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

std::string to_string(int val)
{
  char buffer[std::numeric_limits<int>::digits10 + 2]; // '-' + NULL
  std::sprintf(buffer, "%d", val);
  return buffer;
}

std::string to_string(unsigned int val)
{
  char buffer[std::numeric_limits<unsigned int>::digits10 + 1];
  std::sprintf(buffer, "%u", val);
  return buffer;
}

std::string to_string(long val)
{
  char buffer[std::numeric_limits<long>::digits10 + 2]; // '-' + NULL
  std::sprintf(buffer, "%ld", val);
  return buffer;
}

std::string to_string(unsigned long val)
{
  char buffer[std::numeric_limits<unsigned long>::digits10 + 1];
  std::sprintf(buffer, "%lu", val);
  return buffer;
}

std::string to_string(long long int val)
{
  char buffer[std::numeric_limits<long long int>::digits10 + 2]; // '-' + NULL
  std::sprintf(buffer, "%lld", val);
  return buffer;
}

std::string to_string(unsigned long long int val)
{
  char buffer[std::numeric_limits<unsigned long long int>::digits10 + 1];
  std::sprintf(buffer, "%llu", val);
  return buffer;
}

std::string to_string(float val)
{
  char buff[std::numeric_limits<float>::max_exponent10
          + 6   // fixed precision (printf's default)
          + 3]; // '-' + '.' + NULL
  std::sprintf(buff, "%f", val);
  return buff;
}

std::string to_string(double val)
{
  char buff[std::numeric_limits<double>::max_exponent10
          + 6   // fixed precision (printf's default)
          + 3]; // '-' + '.' + NULL
  std::sprintf(buff, "%f", val);
  return buff;
}

std::string to_string(long double val)
{
  char buff[std::numeric_limits<long double>::max_exponent10
          + 6   // fixed precision (printf's default)
          + 3]; // '-' + '.' + NULL
  std::sprintf(buff, "%Lf", val);
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

| 名前                            | 参照                      |
|---------------------------------|---------------------------|
| [`to_wstring`](./to_wstring.md) | 数値を`wstring`に変換する |

