# operator+
* chrono[meta header]
* std::chrono[meta namespace]
* duration[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
constexpr common_type_t<duration> operator+() const;
```
* common_type_t[link /reference/chrono/common_type.md]

## 概要
正の符号。

なにもせず、`*this`をそのまま返す。


## 戻り値
`common_type_t<duration>(*this)`


## 例
```cpp example
#include <iostream>
#include <chrono>

using std::chrono::duration;
using std::nano;

int main()
{
  duration<int, nano> d1(2);

  duration<int, nano> d2 = +d1;

  std::cout << d1.count() << std::endl;
  std::cout << d2.count() << std::endl;
}
```
* nano[link /reference/ratio/si_prefix.md]
* count()[link count.md]

### 出力
```
2
2
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.5.1 [mark verified], 4.6.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]

### 参照
- [P0548R1 : common_type and duration](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0548r1.pdf)
