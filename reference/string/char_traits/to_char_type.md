# to_char_type
* string[meta header]
* std[meta namespace]
* char_traits[meta class]
* function[meta id-type]

```cpp
static char_type to_char_type(const int_type& c);             // C++03
static constexpr char_type to_char_type(int_type c) noexcept; // C++11
```

## 概要
数値を文字に変換する。


## 戻り値
[`eq_int_type`](eq_int_type.md)`(c,` [`to_int_type`](to_int_type.md)`(e)) == true`となるような整数値`e`が存在する場合、`e`を返す。そのような値がない場合は、未規定の値を返す。


## 計算量
定数時間


## 例
```cpp
#include <iostream>
#include <string>

int main()
{
  char x = std::char_traits<char>::to_char_type(0x41);
  std::cout << x << std::endl;
}
```
* to_char_type[color ff0000]

### 出力例
```
A
```

## 参照

