# operator==
* typeinfo[meta header]
* std[meta namespace]
* type_info[meta class]
* function[meta id-type]

```cpp
bool operator==(const type_info& rhs) const;                     // (1) C++03
bool operator==(const type_info& rhs) const noexcept;            // (1) C++11
constexpr bool operator==(const type_info& rhs) const noexcept;  // (1) C++23
```

## 概要
2つの型が同じかを判定する


## 戻り値
2つの`type_info`オブジェクトが同じ型に対するものであれば`true`、そうでなければ`false`を返す。


## 例外
投げない


## 備考
- この演算子により、以下の演算子が使用可能になる (C++20)：
    - `operator!=`


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
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
