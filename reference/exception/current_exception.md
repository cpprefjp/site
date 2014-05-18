#current_exception (C++11)
```cpp
namespace std {
  exception_ptr current_exception() noexcept;
}
```

##概要
現在処理中の例外オブジェクトを指す`exception_ptr`を取得する。


##戻り値
現在処理中の例外オブジェクトを指す`exception_ptr`を返す。
処理中の例外オブジェクトがない場合は、ヌルを指す`exception_ptr`を返す。


##例外
投げない


##例
```cpp
#include <iostream>
#include <exception>
#include <stdexcept>

int main()
{
  std::exception_ptr ep;

  try {
    throw std::runtime_error("error!");
  }
  catch (...) {
    std::cout << "catch" << std::endl;
    ep = std::current_exception(); // 処理中の例外ポインタを取得
  }

  if (ep) {
    std::cout << "rethrow" << std::endl;
    std::rethrow_exception(ep); // 再スロー
  }
}
```
* current_exception[color ff0000]

###出力例
```
catch
rethrow

This application has requested the Runtime to terminate it in an unusual way.
Please contact the application's support team for more information.
terminate called after throwing an instance of 'std::runtime_error'
  what():  error!
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照


