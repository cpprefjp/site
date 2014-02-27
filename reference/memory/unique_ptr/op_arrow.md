#operator->(C++11)
```cpp
pointer operator->() const noexcept;
```
* add_lvalue_reference[link /reference/type_traits/add_lvalue_reference.md]

##概要
ポインタを通してオブジェクトにアクセスする。


##要件

```cpp
get() != nullptr
```
* get()[link ./get.md]


##戻り値
[`get()`](./get.md)


##例
```cpp
#include <iostream>
#include <memory>
#include <string>

int main()
{
  std::unique_ptr<std::string> p(new std::string("hello"));

  std::cout << p->c_str() << std::endl;
}
```

###出力
```
hello
```

##バージョン
###言語
- C++11

###処理系
- [GCC](/implementation#gcc.md): 4.4.7
- [Clang libc++, C++11 mode](/implementation#clang.md): 3.0
- [ICC](/implementation#icc.md): ?
- [Visual C++](/implementation#visual_cpp.md): ?
