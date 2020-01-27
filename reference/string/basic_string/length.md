# length
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
size_type length() const;          // C++03
size_type length() const noexcept; // C++11
```

## 概要
文�列の長さを取得する。


## 戻り値
現在格納されている文�列の要素数。

※文�数ではないことに注意


## 例外
投げない


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  std::string s = "hello";

  std::size_t n = s.length();
  std::cout << n << std::endl;
}
```
* length()[color ff0000]

### 出力
```
5
```

## 参照
