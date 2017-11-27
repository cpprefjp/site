# crend
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
const_reverse_iterator crend() const noexcept;
```

## 概要
先頭の前を指す逆イテレータを取得する。


## 戻り値
`reverse_iterator(`[`begin()`](begin.md)`)`


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <string>
#include <algorithm>

int main()
{
  std::string s = "hello";

  // 文字列オブジェクトsに含まれる、全ての要素を逆順に出力
  std::for_each(s.crbegin(), s.crend(), [](char c) {
    std::cout << c << std::endl;
  });
}
```
* crend()[color ff0000]
* s.crbegin()[link crbegin.md]

### 出力
```
o
l
l
e
h
```

## 参照
