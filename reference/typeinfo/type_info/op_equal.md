# operator==
* typeinfo[meta header]
* std[meta namespace]
* type_info[meta class]
* function[meta id-type]

```cpp
bool operator==(const type_info& rhs) const noexcept;            // C++20まで
constexpr bool operator==(const type_info& rhs) const noexcept;  // C++23から
```

## 概要
2つの型が同じかを判定する


## 戻り値
2つの`type_info`オブジェクトが同じ型に対するものであれば`true`、そうでなければ`false`を返す。


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <typeinfo>

int main()
{
  const std::type_info& a = typeid(int);
  const std::type_info& b = typeid(3);

  std::cout << std::boolalpha;
  std::cout << "same type? " << (a == b) << std::endl;
}
```

### 出力
```
same type? true
```

## 参照
- [P1328R1 Making `std::type_info::operator==` `constexpr`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p1328r1.html)
