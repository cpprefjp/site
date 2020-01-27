# cend
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
const_iterator cend() const noexcept;
```

## 概要
末尾の次を指す�み取り専用イテレータを取得する。


## 戻り値
末尾の次を指す�み取り専用イテレータ


## 例外
投げない


## 備考
- `basic_string`クラスのイテレータ範囲は、ヌル文�(`'\0'`)終端ではない
- この関数によって返されるイテレータは、`*this`が保持するいずれの要素も参照しない。その指す先は、不�な範囲となるだろう


## 例
```cpp example
#include <iostream>
#include <string>
#include <algorithm>

int main()
{
  std::string s = "hello";
  s.insert(s.begin() + 2, '\0');

  // 文�列オブジェクトsに含まれる、ヌル文�を除く全ての要素を出力
  std::for_each(s.cbegin(), s.cend(), [](char c) {
    if (c != '\0')
      std::cout << c << std::endl;
  });
}
```
* cend()[color ff0000]
* insert[link insert.md]
* s.begin()[link begin.md]
* s.cbegin()[link cbegin.md]

### 出力
```
h
e
l
l
o
```

## 参照
