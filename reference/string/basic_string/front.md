# front
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
const charT& front() const;           // (1) C++11
constexpr const charT& front() const; // (1) C++20

charT& front();                       // (2) C++11
constexpr charT& front();             // (2) C++20
```

## 概要
先頭要素への参照を返す。


## 要件
`!`[`empty()`](empty.md)


## 戻り値
`operator[](0)` の結果を返す。


## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  std::string s = "hello";

  char& c = s.front();
  std::cout << c << std::endl;
}
```
* front()[color ff0000]

### 出力
```
h
```

## 参照
- [LWG Issue 534. Missing `basic_string` members](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#534)
- [P0980R1 Making `std::string` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0980r1.pdf)
