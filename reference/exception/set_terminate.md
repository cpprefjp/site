#set_terminate
```cpp
namespace std {
  typedef void (*terminate_handler)();
  terminate_handler set_terminate(terminate_handler f) noexcept;
}
```

##概要
例外をキャッチされなかった場合に実行される終了ハンドラを設定する。


##戻り値
前に設定されていた終了ハンドラを返す。


##例外
投げない


##備考
引数としてヌルポインタが渡された場合、デフォルトの終了ハンドラが設定される。

終了ハンドラは、呼び出し元に戻らす異常終了すべきと規定されている。

##例
```cpp
#include <iostream>
#include <exception>

void my_terminate_handler()
{
  std::cout << "my terminate handler" << std::endl;
}

int main()
{
  std::set_terminate(my_terminate_handler);

  throw std::exception(); // no catch
}
```
* set_terminate[color ff0000]

###出力例
```
my terminate handler

This application has requested the Runtime to terminate it in an unusual way.
Please contact the application's support team for more information.
```

##参照


