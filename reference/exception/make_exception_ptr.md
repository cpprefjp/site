#make_exception_ptr (C++11)
* exception[meta header]
* std[meta namespace]

```cpp
namespace std {
  template <class E>
  exception_ptr make_exception_ptr(E e) noexcept;
}
```

##概要
引数の例外オブジェクトを元に`exception_ptr`を生成する。


##効果
`try {`
`  throw e;`
`} catch(...) {`
`  return current_exception();`
`}`


##戻り値
例外オブジェクト`e`を指す`exception_ptr`


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
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
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


