# rbegin
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
reverse_iterator rbegin();                      // (1) C++03
reverse_iterator rbegin() noexcept;             // (1) C++11
constexpr reverse_iterator rbegin() noexcept;   // (1) C++20

const_reverse_iterator rbegin() const;                    // (2) C++03
const_reverse_iterator rbegin() const noexcept;           // (2) C++11
constexpr const_reverse_iterator rbegin() const noexcept; // (2) C++20
```

## 概要
末尾を指す逆イテレータを取得する


## 戻り値
`reverse_iterator(`[`end()`](end.md)`)`


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  std::string s = "hello";

  // 末尾への逆イテレータを取得
  decltype(s)::reverse_iterator it = s.rbegin();

  // イテレータが指している要素を参照
  char& c = *it;
  std::cout << c << std::endl;
}
```
* rbegin()[color ff0000]

### 出力
```
o
```

## 参照
- [P0980R1 Making `std::string` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0980r1.pdf)
