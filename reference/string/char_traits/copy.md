# copy
* string[meta header]
* std[meta namespace]
* char_traits[meta class]
* function[meta id-type]

```cpp
static char_type* copy(char_type* s1,
                       const char_type* s2,
                       std::size_t n);                // (1) C++03

static constexpr char_type* copy(char_type* s1,
                                 const char_type* s2,
                                 std::size_t n);      // (1) C++20
```

## 概要
文�列`s1`に文�列`s2`をコピーする。


## 事前条件
範囲`[s1, s1+n)`と範囲`[s2, s2+n)`が重なっていないこと。


## 効果
範囲`[0, n)`の各`i`について、[`assign`](assign.md)`(s1[i], s2[i])`を実行する。


## 戻り値
コピー完了後の`s1`を返す。


## 計算量
線形時間


## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  const std::size_t n = 5 + 1;
  char s[n] = "abcde";

  char result[n];
  std::char_traits<char>::copy(result, s, n);

  std::cout << result << std::endl;
}
```
* copy[color ff0000]

### 出力例
```
abcde
```

## 参照
- [P1032R1 Misc `constexpr` bits](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1032r1.html)
