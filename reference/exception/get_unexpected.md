#get_unexpected
* exception[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  typedef void (*unexpected_handler)();
  unexpected_handler get_unexpected() noexcept;
}
```

##概要
予想外の例外が発生した場合の処理を行う関数を取得する。


##戻り値
予想外の例外が発生した場合の処理を行う関数へのポインタ。
(デフォルトではおそらくヌルになる)


##例
```cpp
#include <iostream>
#include <stdexcept>

void on_expected()
{
  std::cout << "on expected" << std::endl;
}

int main()
{
  std::unexpected_handler handler1 = std::get_unexpected();
  if (!handler1) {
    std::cout << "null handler" << std::endl;
  }

  std::set_unexpected(on_expected);
  std::unexpected_handler handler2 = std::get_unexpected();
  if (handler2) {
    handler2();
  }
}
```

###出力
```
on expected
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.9.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照


