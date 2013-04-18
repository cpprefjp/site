#operator!=
```cpp
bool operator!=(const type_info& rhs) const noexcept;
```

##概要

<b>2つの型が異なるかを判定する</b>


##戻り値

`!(*this == rhs)`

##例外

投げない


##例

```cpp
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
* !=[color ff0000]

###出力

```cpp
difference type? false
```

##参照


