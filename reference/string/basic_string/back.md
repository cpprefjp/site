# back
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
const charT& back() const;           // (1) C++11
constexpr const charT& back() const; // (1) C++20

charT& back();                       // (2) C++11
constexpr charT& back();             // (2) C++20
```

## 概要
末尾要素への参照を取得する。


## 堅牢化された事前条件
`!`[`empty()`](empty.md)


## 戻り値
[`operator[]`](op_at.md)`(`[`size()`](size.md) `- 1)` の結果を返す。


## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  std::string s = "hello";

  char& c = s.back();
  std::cout << c << std::endl;
}
```
* back()[color ff0000]

### 出力
```
o
```

## 参照
- [LWG Issue 534. Missing `basic_string` members](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#534)
- [P0980R1 Making `std::string` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0980r1.pdf)
- [P3471R4 Standard library hardening](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3471r4.html)
- [P3878R1 Standard library hardening should not use the 'observe' semantic](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3878r1.html)
