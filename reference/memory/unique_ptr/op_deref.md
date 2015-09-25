#operator*
* memory[meta header]
* std[meta namespace]
* unique_ptr[meta class]
* function[meta id-type]
* cpp11[meta cpp]

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
- [GCC](/implementation.md#gcc): 4.4.7
- [Clang libc++, C++11 mode](/implementation.md#clang): 3.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0, 12.0
