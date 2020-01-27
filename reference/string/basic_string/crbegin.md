# crbegin
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
const_reverse_iterator crbegin() const noexcept;
```

## 概要
末尾を指す�み取り専用逆イテレータを取得する


## 戻り値
`reverse_iterator(`[`end()`](end.md)`)`


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  std::string s = "hello";

  // 末尾への逆イテレータを取得
  decltype(s)::const_reverse_iterator it = s.crbegin();

  // イテレータが指している要素を参照
  const char& c = *it;
  std::cout << c << std::endl;
}
```
* crbegin()[color ff0000]

### 出力
```
o
```

## 参照
