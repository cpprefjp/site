#to_int_type
* string[meta header]
* std[meta namespace]
* char_traits[meta class]
* function[meta id-type]

```cpp
static int_type to_int_type(const char_type& c);             // C++03
static constexpr int_type to_int_type(char_type c) noexcept; // C++11
```

##概要
文字を数値に変換する。


##戻り値
[`to_int_type`](to_int_type.md)と[`eq_int_type`](eq_int_type.md)の定義によって制約される文字`e`を返す。


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <string>

int main()
{
  int x = std::char_traits<char>::to_char_type('A');
  std::cout << std::hex << x << std::endl;
}
```
* to_char_type[color ff0000]

###出力例
```
41
```

##参照

