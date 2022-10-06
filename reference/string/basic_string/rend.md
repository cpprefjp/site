# rend
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
reverse_iterator rend();                      // (1) C++03
reverse_iterator rend() noexcept;             // (1) C++11
constexpr reverse_iterator rend() noexcept;   // (1) C++20

const_reverse_iterator rend() const;                    // (2) C++03
const_reverse_iterator rend() const noexcept;           // (2) C++11
constexpr const_reverse_iterator rend() const noexcept; // (2) C++20
```

## 概要
先頭の前を指す逆イテレータを取得する。


## 戻り値
`reverse_iterator(`[`begin()`](begin.md)`)`


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <string>
#include <algorithm>

int main()
{
  std::string s = "hello";

  // 文字列オブジェクトsに含まれる、全ての要素を逆順に出力
  std::for_each(s.rbegin(), s.rend(), [](char c) {
    std::cout << c << std::endl;
  });
}
```

### 出力
```
o
l
l
e
h
```

## 参照
- [P0980R1 Making `std::string` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0980r1.pdf)
