#make_exception_ptr
* exception[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class E>
  exception_ptr make_exception_ptr(E e) noexcept;
}
```
* exception_ptr[link ./exception_ptr.md]

##概要
引数の例外オブジェクトを元に`exception_ptr`オブジェクトを生成する。


##効果
```cpp
try {
  throw e;
} catch(...) {
  return current_exception();
}
```
* current_exception[link ./current_exception.md]


##戻り値
例外オブジェクト`e`を指す[`exception_ptr`](./exception_ptr.md)オブジェクトを返す。


##例外
投げない


##例
```cpp
#include <iostream>
#include <exception>
#include <stdexcept> // std::runtime_error

int main()
{
  std::exception_ptr p = std::make_exception_ptr(std::runtime_error("error!!!"));

  try {
    std::rethrow_exception(p);
  }
  catch (std::runtime_error& e) {
    std::cout << e.what() << std::endl;
  }
}
```
* make_exception_ptr[color ff0000]

###出力
```
error!!!
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##実装例
```cpp
template <class E>
exception_ptr make_exception_ptr(E e) noexcept
{
  try {
    throw e;
  }
  catch (...) {
    return current_exception();
  }
}
```

##参照


