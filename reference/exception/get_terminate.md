#get_terminate
```cpp
namespace std {

  typedef void (*terminate_handler)();
  terminate_handler get_terminate() noexcept;
}
```

##概要

例外が処理されなかった場合の処理を行う関数を取得する


##戻り値

例外が処理されなかった場合の処理を行う関数へのポインタ。

(デフォルトではおそらくヌルになる)


##例

```cpp
#include <iostream>
#include <exception>

void on_terminate()
{
  std::cout << "on terminate" << std::endl;
}

int main()
{
  std::terminate_handler handler1 = std::get_terminate();
  if (!handler1) {
    std::cout << "null handler" << std::endl;
  }

  std::set_terminate(on_terminate());
  std::terminate_handler handler2 = std::get_terminate();
  if (handler2) {
    handler2();
  }
}
```

###出力(<color=ff0000>実行環境がないため未記載</color>)

```cpp
```

##バージョン
```
###言語


- C++11



###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??



##参照


