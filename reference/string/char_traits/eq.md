# eq
* string[meta header]
* std[meta namespace]
* char_traits[meta class]
* function[meta id-type]

```cpp
static bool eq(const char_type& c1, const char_type& c2);      // C++03
static constexpr bool eq(char_type c1, char_type c2) noexcept; // C++11
```

## 概要
2つの文�を比較し、同じかどうかを判定する。


## 戻り値
標準で定義される`char_traits`の特殊化では、`c1 == c2`の結果を返す。


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  if (std::char_traits<char>::eq('a', 'a')) {
    std::cout << "equal" << std::endl;
  }
  else {
    std::cout << "not equal" << std::endl;
  }
}
```
* eq[color ff0000]

### 出力
```
equal
```

## 参照

