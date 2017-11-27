# 範囲 for ループの制限緩和
* cpp17[meta cpp]

## 概要

[範囲 for 文は C++11 で導入された](/lang/cpp11/range_based_for.md) が、
`begin` と `end` の型が同じでなければならなかった。
C++17 でこの制限が緩和された。

## 仕様

```cpp
for ( for-range-declaration : for-range-initializer ) statement
```
* for-range-initializer[italic]
* for-range-declaration[italic]
* statement[italic]

は以下のように展開される:

```cpp
{
  auto && __range = for-range-initializer;
  auto __begin = begin-expr;
  auto __end = end-expr;     // __begin と __end は異なる型でもよい
  for ( ; __begin != __end; ++__begin ) {
    for-range-declaration = *__begin;
    statement
  }
}
```
* for-range-initializer[italic]
* for-range-declaration[italic]
* statement[italic]

### 参考

[C++11](/lang/cpp11/range_based_for.md) では以下のように展開されていた:
```cpp
{
  auto && __range = for-range-initializer;
  for ( auto __begin = begin-expr, __end = end-expr; // __begin と __end は同じ型でなければならない
        __begin != __end;
        ++__begin ) {
    for-range-declaration = *__begin;
    statement
  }
}
```
* for-range-initializer[italic]
* for-range-declaration[italic]
* statement[italic]


## 例
```cpp example
#include <iostream>
#include <string>

// delimiter や終端に到達したかどうか判定する述語
template<char delimiter>
struct EndOfDelimitedString
{
  bool operator()(std::string::iterator it)
  {
    return *it != delimiter && *it != '```cpp
#include <iostream>
#include <string>

// delimiter や終端に到達したかどうか判定する述語
template<char delimiter>
struct EndOfDelimitedString
{
  bool operator()(std::string::iterator it)
  {
    return *it != delimiter && *it != '\0';
  }
};

template<char delimiter>
struct DelimitedString
{
  std::string str;

  // DelimitedString::begin と DelimitedString::end の型は異なる
  std::string::iterator begin() { return str.begin(); }
  EndOfDelimitedString<delimiter> end() const { return EndOfDelimitedString<delimiter>(); }
};

template<char delimiter>
bool operator!=(std::string::iterator it, EndOfDelimitedString<delimiter> e)
{
  return e(it);
}

int main()
{
  std::string str{"ABCDE, abcde|12345"};

  for (auto c : str)
    std::cout << c;
  std::cout << '\n';

  for (auto c : DelimitedString<','>{str})
    std::cout << c;
  std::cout << '\n';

  for (auto c : DelimitedString<'|'>{str})
    std::cout << c;
  std::cout << '\n';
}
';
  }
};

template<char delimiter>
struct DelimitedString
{
  std::string str;

  // DelimitedString::begin と DelimitedString::end の型は異なる
  std::string::iterator begin() { return str.begin(); }
  EndOfDelimitedString<delimiter> end() const { return EndOfDelimitedString<delimiter>(); }
};

template<char delimiter>
bool operator!=(std::string::iterator it, EndOfDelimitedString<delimiter> e)
{
  return e(it);
}

int main()
{
  std::string str{"ABCDE, abcde|12345"};

  for (auto c : str)
    std::cout << c;
  std::cout << '\n';

  for (auto c : DelimitedString<','>{str})
    std::cout << c;
  std::cout << '\n';

  for (auto c : DelimitedString<'|'>{str})
    std::cout << c;
  std::cout << '\n';
}
```

### 出力
```
ABCDE, abcde|12345
ABCDE
ABCDE, abcde
```

### 備考

GCC 4.9.3 でコンパイルすると `begin` と `end` の型が異なるため不適格となる:

```
for.cpp: In function ‘int main()’:
for.cpp:38:41: error: inconsistent begin/end types in range-based ‘for’ statement: ‘std::basic_string<char>::iterator {aka __gnu_cxx::__normal_iterator<char*, std::basic_string<char> >}’ and ‘EndOfDelimitedString<','>’
   for (auto c : DelimitedString<','>{str})
                                         ^
for.cpp:38:41: error: conversion from ‘EndOfDelimitedString<','>’ to non-scalar type ‘std::basic_string<char>::iterator {aka __gnu_cxx::__normal_iterator<char*, std::basic_string<char> >}’ requested
for.cpp:42:41: error: inconsistent begin/end types in range-based ‘for’ statement: ‘std::basic_string<char>::iterator {aka __gnu_cxx::__normal_iterator<char*, std::basic_string<char> >}’ and ‘EndOfDelimitedString<'|'>’
   for (auto c : DelimitedString<'|'>{str})
                                         ^
for.cpp:42:41: error: conversion from ‘EndOfDelimitedString<'|'>’ to non-scalar type ‘std::basic_string<char>::iterator {aka __gnu_cxx::__normal_iterator<char*, std::basic_string<char> >}’ requested
```


## この機能が必要になった背景・経緯

Range TS (technical specification) では `Sentinel` (番兵) 等の範囲の終端を表すコンセプトが提案されているが、
型が `begin` イテレータと異なるため範囲 for 文で使用できなかった
([N4128R1 §3.3.5](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4128.html#an-iterables-end-may-have-a-different-type-than-its-begin))。

`end` イテレータはインクリメント、デクリメント、間接参照されることがなく、この制限には実用的な意味がないため、緩和された。

## 検討されたほかの選択肢

[Boost.Foreach](http://boost.org/libs/foreach) のようなマクロは避けるべきだとされた。

## 関連項目

* [C++11 範囲 for 文](/lang/cpp11/range_based_for.md)

## 参照

* [P0184R0 Generalizing the Range-Based For Loop](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0184r0.html)
* [N4128 Ranges for the Standard Library, Revision 1](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4128.html)
