# rend
* string_view[meta header]
* std[meta namespace]
* basic_string_view[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
constexpr const_reverse_iterator rend() const noexcept;
```

## 概要
先�の前を指す逆イテレータを取得する。


## 戻り値
```cpp
return const_reverse_iterator(begin());
```
* begin()[link begin.md]


## 例
```cpp example
#include <iostream>
#include <string_view>
#include <algorithm>

int main()
{
  std::string_view sv = "Hello";

  std::for_each(sv.rbegin(), sv.rend(), [](char c) {
    std::cout << c << std::endl;
  });
}
```
* rend()[color ff0000]
* sv.rbegin()[link rbegin.md]

### 出力
```
o
l
l
e
H
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0
- [GCC](/implementation.md#gcc): 7.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
