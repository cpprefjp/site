# operator!=
* typeinfo[meta header]
* std[meta namespace]
* type_info[meta class]
* function[meta id-type]

```cpp
bool operator!=(const type_info& rhs) const;          // C++03
bool operator!=(const type_info& rhs) const noexcept; // C++11
```

## 概要
2つの型が異なるかを判定する
（C++20からは、`operator＝=`から導出される）


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
  std::cout << "difference type? " << (a != b) << std::endl;
}
```

### 出力
```
difference type? false
```

## 参照


