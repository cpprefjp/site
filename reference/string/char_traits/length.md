# length
* string[meta header]
* std[meta namespace]
* char_traits[meta class]
* function[meta id-type]

```cpp
static std::size_t length(const char_type* s);           // C++14まで
static constexpr std::size_t length(const char_type* s); // C++17から
```

## 概要
文字列の長さを取得する。


## 戻り値
範囲`[0, ?)`の各`i`に対し、[`eq`](eq.md)`(s[i], charT())`が最初に`true`を返した`i`を返す。


## 計算量
線形時間


## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  std::size_t n = std::char_traits<char>::length("abc");
  std::cout << n << std::endl;
}
```
* length[color ff0000]

### 出力
```
3
```

## 参照
- [P0426R0 - Constexpr for `std::char_traits`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0426r0.html)
