#make_exception_ptr
```cpp
namespace std {
  template <class E>
  exception_ptr make_exception_ptr(E e) noexcept;

}
```

##概要

<b>引数の例外オブジェクトを元にexception_ptrを生成する。</b>


##効果

`try {``  throw e;`
`} catch(...) {`
`  return current_exception();`
`}`



##戻り値

例外オブジェクト`e`を指す`exception_ptr`


##例外

投げない


##備考



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

```cpp
error!!!
```

##バージョン


###言語


- C++11



###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??<h4>備考</h4>
(処理系やライブラリのバグや不完全な実装などをここに書く。なければ備考欄を削除)



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


