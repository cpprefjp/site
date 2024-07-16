# operator*=
* chrono[meta header]
* std::chrono[meta namespace]
* duration[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
duration& operator*=(const rep& rhs);           // C++11
constexpr duration& operator*=(const rep& rhs); // C++17
```

## 概要
現在の値に`rhs`を掛ける


## 効果
`rep_ *= rhs`


## 戻り値
`*this`


## 例
```cpp example
#include <iostream>
#include <chrono>

using std::chrono::duration;
using std::micro;

int main()
{
  duration<int, micro> d(3);

  d *= 3;

  std::cout << d.count() << std::endl;
}
```
* micro[link /reference/ratio/si_prefix.md]
* count()[link count.md]

### 出力
```
9
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.5.1 [mark verified], 4.6.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]


## 参照
- [P0505R0 Wording for GB 50](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0505r0.html)
