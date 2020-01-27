# compare
* string[meta header]
* std[meta namespace]
* char_traits[meta class]
* function[meta id-type]

```cpp
static int compare(const char_type* s1, const char_type* s2, std::size_t n);           // C++14まで
static constexpr int compare(const char_type* s1, const char_type* s2, std::size_t n); // C++17から
```

## 概要
2つの文�列を比較する。


## 戻り値
- 範囲`[0, n)`の各値`i`全てに対して[`eq`](eq.md)`(s1[i], s2[i]) == true`ならば`0`を返す。
- 範囲`[0, n)`のいずれかの`i`に対して[`lt`](lt.md)`(s1[i], s2[i]) == true`ならば負の値を返す。
- それ以外の場合は、�の値を返す。


## 計算量
線形時間


## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  std::cout << std::char_traits<char>::compare("abc", "abc", 3) << std::endl;
  std::cout << std::char_traits<char>::compare("aac", "abc", 3) << std::endl;
  std::cout << std::char_traits<char>::compare("abc", "aac", 3) << std::endl;
}
```
* compare[color ff0000]

### 出力例
```
0
-1
1
```

## 参照
- [P0426R0 - Constexpr for `std::char_traits`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0426r0.html)
