# crbegin
* string_view[meta header]
* std[meta namespace]
* basic_string_view[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
constexpr const_reverse_iterator crbegin() const noexcept;
```

## 概要
末尾を指す読み取り専用逆イテレータを取得する。


## 戻り値
```cpp
return const_reverse_iterator(end());
```
* end()[link end.md]


## 例
```cpp example
#include <iostream>
#include <string_view>
#include <algorithm>

int main()
{
  std::string_view sv = "Hello";

  std::for_each(sv.crbegin(), sv.crend(), [](char c) {
    std::cout << c << std::endl;
  });
}
```
* crbegin()[color ff0000]
* sv.crend()[link crend.md]

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
- [Clang](/implementation.md#clang): 4.0 [mark verified]
- [GCC](/implementation.md#gcc): 7.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
