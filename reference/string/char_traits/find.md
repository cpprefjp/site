# find
* string[meta header]
* std[meta namespace]
* char_traits[meta class]
* function[meta id-type]

```cpp
static const char_type* find(const char_type* s,
                             std::size_t n,
                             const char_type& a);           // C++14まで
static constexpr const char_type* find(const char_type* s,
                                       std::size_t n,
                                       const char_type& a); // C++17から
```

## 概要
文�列�から特定の値を検索する。


## 戻り値
範囲`[s, s+n)`の各ポインタ`p`について、[`eq`](eq.md)`(*p, a) == true`となる`p`を返す。該当しない場合は`nullptr`を返す。


## 計算量
線形時間


## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  const std::size_t n = 5 + 1;
  const char s[n] = "abcde";

  // 'c'を検索する
  const char* result = std::char_traits<char>::find(s, n, 'c');
  if (result) {
    // 見つかった
    std::cout << *result << std::endl;
  }
  else {
    // 見つからなかった
    std::cout << "not found" << std::endl;
  }
}
```
* find[color ff0000]

### 出力
```
c
```

## 参照
- [P0426R0 - Constexpr for `std::char_traits`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0426r0.html)
