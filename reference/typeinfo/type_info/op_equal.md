#operator==
* typeinfo[meta header]
* std[meta namespace]

```cpp
bool operator==(const type_info& rhs) const noexcept;
```

##概要
2つの型が同じかを判定する


##戻り値
2つの`type_info`オブジェクトが同じ型に対するものであれば`true`、そうでなければ`false`を返す。


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
  std::cout << "same type? " << (a == b) << std::endl;
}
```

###出力
```
same type? true
```

##参照


