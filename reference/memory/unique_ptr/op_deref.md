#operator*(C++11)
```cpp
typename add_lvalue_reference<T>::type operator*() const;
```
* add_lvalue_reference[link /reference/type_traits/add_lvalue_reference.md]

##概要
ポインタを間接参照する。


##要件

```cpp
get() != nullptr
```
* get()[link ./get.md]


##戻り値
`*`[`get()`](./get.md)


##例
```cpp
#include <iostream>
#include <memory>

int main()
{
  std::unique_ptr<int> p(new int(3));

  int& r = *p;
  std::cout << r << std::endl;
}
```

###出力
```
3
```

##バージョン
###言語
- C++11

###処理系
- [GCC](/implementation#gcc.md): 4.4.7
- [Clang libc++, C++11 mode](/implementation#clang.md): 3.0
- [ICC](/implementation#icc.md): ?
- [Visual C++](/implementation#visual_cpp.md): ?
