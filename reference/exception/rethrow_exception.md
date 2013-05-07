#rethrow_exception
```cpp
[[noreturn]] void rethrow_exception(exception_ptr p);
```

##概要
`exception_ptr`が指す例外オブジェクトを再スローする。


##要件
`p`がヌルを指す`exception_ptr`ではないこと。


##戻り値
この関数は決して返らない。


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
* rethrow_exception[color ff0000]

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


