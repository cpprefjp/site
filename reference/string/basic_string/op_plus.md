# operator+
* string[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
template <class charT, class traits, class Allocator>
basic_string<charT, traits, Allocator>
  operator+(const basic_string<charT, traits, Allocator>& lhs,
            const basic_string<charT, traits, Allocator>& rhs); // (1)

template <class charT, class traits, class Allocator>
basic_string<charT, traits, Allocator>
  operator+(basic_string<charT, traits, Allocator>&& lhs,
            const basic_string<charT, traits, Allocator>& rhs); // (2) C++11 から

template <class charT, class traits, class Allocator>
basic_string<charT, traits, Allocator>
  operator+(const basic_string<charT, traits, Allocator>& lhs,
            basic_string<charT, traits, Allocator>&& rhs);      // (3) C++11 から

template <class charT, class traits, class Allocator>
basic_string<charT, traits, Allocator>
  operator+(basic_string<charT, traits, Allocator>&& lhs,
            basic_string<charT, traits, Allocator>&& rhs);      // (4) C++11 から

template <class charT, class traits, class Allocator>
basic_string<charT, traits, Allocator>
  operator+(const charT* lhs,
            const basic_string<charT, traits, Allocator>& rhs); // (5)

template <class charT, class traits, class Allocator>
basic_string<charT, traits, Allocator>
  operator+(const charT* lhs,
            basic_string<charT, traits, Allocator>&& rhs);      // (6) C++11 から

template <class charT, class traits, class Allocator>
basic_string<charT, traits, Allocator>
  operator+(charT lhs,
            const basic_string<charT, traits, Allocator>& rhs); // (7)

template <class charT, class traits, class Allocator>
basic_string<charT, traits, Allocator>
  operator+(charT lhs,
            basic_string<charT, traits, Allocator>&& rhs);      // (8) C++11 から

template <class charT, class traits, class Allocator>
basic_string<charT, traits, Allocator>
  operator+(const basic_string<charT, traits, Allocator>& rhs,
            const charT* lhs);                                  // (9)

template <class charT, class traits, class Allocator>
basic_string<charT, traits, Allocator>
  operator+(basic_string<charT, traits, Allocator>&& rhs,
            const charT* lhs);                                  // (10) C++11 から

template <class charT, class traits, class Allocator>
basic_string<charT, traits, Allocator>
  operator+(const basic_string<charT, traits, Allocator>& rhs,
            charT lhs);                                         // (11)

template <class charT, class traits, class Allocator>
basic_string<charT, traits, Allocator>
  operator+(basic_string<charT, traits, Allocator>&& rhs,
            charT lhs);                                         // (12) C++11 から
```

## 概要
`basic_string` オブジェクトの連結を行う。


## 戻り値
- (1) [`basic_string`](op_constructor.md)`<charT, traits, Allocator>(lhs).`[`append`](append.md)`(rhs)`

- (2) `std::`[`move`](/reference/utility/move.md)`(lhs.`[`append`](append.md)`(rhs))`

- (3) `std::`[`move`](/reference/utility/move.md)`(rhs.`[`insert`](insert.md)`(0, lhs))`

- (4) `std::`[`move`](/reference/utility/move.md)`(lhs.`[`append`](append.md)`(rhs))`  
	(`std::`[`move`](/reference/utility/move.md)`(rhs.`[`insert`](insert.md)`(0, lhs))` とも同等)

- (5) [`basic_string`](op_constructor.md)`<charT, traits, Allocator>(lhs) + rhs`  

- (6) `std::`[`move`](/reference/utility/move.md)`(rhs.`[`insert`](insert.md)`(0, lhs))`  

- (7) [`basic_string`](op_constructor.md)`<charT, traits, Allocator>(1, lhs) + rhs`

- (8) `std::`[`move`](/reference/utility/move.md)`(rhs.`[`insert`](insert.md)`(0, 1, lhs))`

- (9) `lhs +` [`basic_string`](op_constructor.md)`<charT, traits, Allocator>(rhs)`  

- (10) `std::`[`move`](/reference/utility/move.md)`(lhs.`[`append`](append.md)`(rhs))`  

- (11) `lhs +` [`basic_string`](op_constructor.md)`<charT, traits, Allocator>(1, rhs)`

- (12) `std::`[`move`](/reference/utility/move.md)`(lhs.`[`append`](append.md)`(1, rhs))`


## 備考
(5)、(6) の形式の `lhs`、および、(9)、(10) の形式の `rhs` の文字列長算出のために `traits::length()` が使用される


## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  std::string s1("Hell");
  std::string s2("world");

  std::string s3 = s1 + 'o' + ", " + s2 + '!';

  std::cout << s3 << '\n';
}
```
* +[color ff0000]

### 出力
```
Hello, world!
```

## 関連項目

| 名前                          | 説明                   |
|-------------------------------|------------------------|
| [`append`](append.md)       | 文字／文字列を追加する |
| [`push_back`](push_back.md) | 文字を追加する         |
| [`insert`](insert.md)       | 文字／文字列を挿入する |
