# operator!=
* typeinfo[meta header]
* std[meta namespace]
* type_info[meta class]
* function[meta id-type]

```cpp
// operator==により、以下の演算子が使用可能になる (C++20)
bool operator!=(const type_info& rhs) const;          // (1) C++03
bool operator!=(const type_info& rhs) const noexcept; // (1) C++11
```

## 概要
2つの型が異なるかを判定する
（C++20からは、`operator==`から導出される）


## 戻り値
`!(*this == rhs)`


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
  std::cout << "different type? " << (a != b) << std::endl;
}
```

### 出力
```
different type? false
```

## 参照
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
