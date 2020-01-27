# begin
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
iterator begin() noexcept;
const_iterator begin() const noexcept;
```

## 概要
文�列の先�を指すイテレータを取得する。


## 戻り値
先�を指すイテレータ。


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  std::string s = "hello";

  // 先�へのイテレータを取得
  decltype(s)::iterator it = s.begin();

  // イテレータが指している要素を参照
  char& c = *it;
  std::cout << c << std::endl;
}
```
* begin()[color ff0000]

### 出力
```
h
```

## 参照
