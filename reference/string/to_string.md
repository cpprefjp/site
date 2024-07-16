# to_string
* string[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  string to_string(int val);                // (1) C++11
  string to_string(unsigned int val);       // (2) C++11
  string to_string(long val);               // (3) C++11
  string to_string(unsigned long val);      // (4) C++11
  string to_string(long long val);          // (5) C++11
  string to_string(unsigned long long val); // (6) C++11
  string to_string(float val);              // (7) C++11
  string to_string(double val);             // (8) C++11
  string to_string(long double val);        // (9) C++11
}
```
* string[link basic_string.md]

## 概要
数値`val`を[`string`](basic_string.md)型文字列に変換する。

- (1) : `int`型の値を[`string`](basic_string.md)型に変換する
- (2) : `unsigned int`型の値を[`string`](basic_string.md)型に変換する
- (3) : `long`型の値を[`string`](basic_string.md)型に変換する
- (4) : `unsigned long`型の値を[`string`](basic_string.md)型に変換する
- (5) : `long long`型の値を[`string`](basic_string.md)型に変換する
- (6) : `unsigned long long`型の値を[`string`](basic_string.md)型に変換する
- (7) : `float`型の値を[`string`](basic_string.md)型に変換する
- (8) : `double`型の値を[`string`](basic_string.md)型に変換する
- (9) : `long double`型の値を[`string`](basic_string.md)型に変換する


## 戻り値
- C++11まで
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

- C++26から
    ```cpp
    return format("{}", val);
    ```
    * format[link /reference/format/format.md]


## 例
```cpp example
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
* std::to_string[color ff0000]

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

std::string to_string(int val)
{
  char buffer[std::numeric_limits<int>::digits10 + 1
          + 2]; // '-' + '\0'
  std::sprintf(buffer, "%d", val);
  return buffer;
}

std::string to_string(unsigned int val)
{
  char buffer[std::numeric_limits<unsigned int>::digits10 + 1
          + 1]; // '\0'
  std::sprintf(buffer, "%u", val);
  return buffer;
}

std::string to_string(long val)
{
  char buffer[std::numeric_limits<long>::digits10 + 1
          + 2]; // '-' + '\0'
  std::sprintf(buffer, "%ld", val);
  return buffer;
}

std::string to_string(unsigned long val)
{
  char buffer[std::numeric_limits<unsigned long>::digits10 + 1
          + 1]; // '\0'
  std::sprintf(buffer, "%lu", val);
  return buffer;
}

std::string to_string(long long int val)
{
  char buffer[std::numeric_limits<long long int>::digits10 + 1
          + 2]; // '-' + '\0'
  std::sprintf(buffer, "%lld", val);
  return buffer;
}

std::string to_string(unsigned long long int val)
{
  char buffer[std::numeric_limits<unsigned long long int>::digits10 + 1
          + 1]; // '\0'
  std::sprintf(buffer, "%llu", val);
  return buffer;
}

std::string to_string(float val)
{
  char buffer[std::numeric_limits<float>::max_exponent10 + 1
          + 6   // fixed precision (printf's default)
          + 3]; // '-' + '.' + '\0'
  std::sprintf(buffer, "%f", val);
  return buffer;
}

std::string to_string(double val)
{
  char buffer[std::numeric_limits<double>::max_exponent10 + 1
          + 6   // fixed precision (printf's default)
          + 3]; // '-' + '.' + '\0'
  std::sprintf(buffer, "%f", val);
  return buffer;
}

std::string to_string(long double val)
{
  char buffer[std::numeric_limits<long double>::max_exponent10 + 1
          + 6   // fixed precision (printf's default)
          + 3]; // '-' + '.' + '\0'
  std::sprintf(buffer, "%Lf", val);
  return buffer;
}
```
* digits10[link /reference/limits/numeric_limits/digits10.md]
* max_exponent10[link /reference/limits/numeric_limits/max_exponent10.md]

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.5.4 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified], 2015 [mark verified], 2017 [mark verified]
    - 2010は、不完全な実装。以下の型のみ多重定義されている。
        - `long long`
        - `unsigned long long`
        - `long double`


## 関連項目

| 名前                            | 参照                      |
|---------------------------------|---------------------------|
| [`to_wstring`](to_wstring.md) | 数値を`wstring`に変換する |
| [`to_chars`](/reference/charconv.md) | ロケール依存しない高速な変換 |


## 参照
- [N2408 Simple Numeric Access Revision 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2408.html)
- [P2587R3 `to_string` or not `to_string`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2587r3.html)
    - C++26から`sprintf`ベースの仕様をやめて`std::format()`ベースの仕様になった
