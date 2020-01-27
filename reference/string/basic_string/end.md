# end
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
iterator end();                      // (1) C++03
iterator end() noexcept;             // (1) C++11

const_iterator end() const;          // (2) C++03
const_iterator end() const noexcept; // (2) C++11
```

## 概要
末尾の次を指すイテレータを取得する。


## 戻り値
末尾の次を指すイテレータ


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
  std::for_each(s.begin(), s.end(), [](char c) {
    if (c != '\0')
      std::cout << c << std::endl;
  });
}
```
* end()[color ff0000]
* s.insert[link insert.md]
* s.begin()[link begin.md]

### 出力
```
h
e
l
l
o
```

## 参照
