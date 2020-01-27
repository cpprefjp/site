# eq_int_type
* string[meta header]
* std[meta namespace]
* char_traits[meta class]
* function[meta id-type]

```cpp
static bool eq_int_type(const int_type& c1, const int_type& c2);      // C++03
static constexpr bool eq_int_type(int_type c1, int_type c2) noexcept; // C++11
```

## 概要
数値の�値比較を行う。


## 戻り値
全ての文�`c`と`d`に対しては、[`eq`](eq.md)`(c, d)`と`eq_int_type(`[`to_int_type`](to_int_type.md)`(c),` [`to_int_type`](to_int_type.md)`(d))`は�価となる。

文�以外として、`c1`と`c2`がどちらも[`eof`](eof.md)であるなら`true`、それ以外は`false`を返す。


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  if (std::char_traits<char>::eq_int_type(1, 1)) {
    std::cout << "equal" << std::endl;
  }
  else {
    std::cout << "not equal" << std::endl;
  }
}
```
* eq_int_type[color ff0000]

### 出力例
```
equal
```

## 参照

