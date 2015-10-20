#before
* typeinfo[meta header]
* std[meta namespace]
* type_info[meta class]
* function[meta id-type]

```cpp
bool before(const type_info& rhs) const noexcept;
```

##概要
2つの型の照合順序を比較する


##戻り値
2つの型の照合順序を比較し、`*this`が`rhs`より先行していれば`true`を返し、そうでなければ`false`を返す。

この関数は内部実装で使用される関数であるため、継承関係や宣言順序は必ずしも関係があるわけではない。


##例外
投げない


##例
```cpp
#include <iostream>
#include <typeinfo>

struct A {};
struct B {};

int main()
{
  const std::type_info& a = typeid(A);
  const std::type_info& b = typeid(B);

  std::cout << std::boolalpha << a.before(b) << std::endl;
}
```
* before[color ff0000]

###出力例
```
true
```

##参照
