# cbegin
* string_view[meta header]
* std[meta namespace]
* basic_string_view[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
constexpr const_iterator cbegin() const noexcept;
```

## 概要
先�の要素を指す�み取り専用イテレータを取得する。


## 戻り値
`!`[`empty()`](empty.md)である場合、[`data()`](data.md)を指すイテレータを返す。そうでない場合、`[`[`cbegin()`](cbegin.md)`,` [`cend()`](cend.md)`)`を妥当な範囲とする未規定の値を返す。


## 例
```cpp example
#include <iostream>
#include <string_view>
#include <algorithm>

int main()
{
  std::string_view sv = "Hello";

  std::for_each(sv.cbegin(), sv.cend(), [](char c) {
    std::cout << c << std::endl;
  });
}
```
* cbegin()[color ff0000]
* sv.cend()[link cend.md]

### 出力
```
H
e
l
l
o
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0
- [GCC](/implementation.md#gcc): 7.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
