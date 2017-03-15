# max_size
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
size_type max_size() const;          // C++03
size_type max_size() const noexcept; // C++11
```

## 概要
格納可能な最大の文字列長を取得する。


## 戻り値
格納可能な最大の文字列長。


## 例外
投げない


## 計算量
定数時間


## 例
```cpp
#include <iostream>
#include <string>

int main()
{
  std::string s;
  std::size_t n = s.max_size();

  std::cout << n << std::endl;
}
```
* max_size()[color ff0000]

### 出力例
```
4611686018427387897
```

## 参照
