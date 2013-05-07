#terminate
```cpp
namespace std {
  [[noreturn]] void terminate() noexcept;
}
```

##概要
`terminate()`は、例外がキャッチされなかった場合に呼び出される、プログラムを異常終了させる関数である。
この関数は、ユーザーが任意に呼び出すこともできる。


##戻り値
なし


##例外
投げない


##例
```cpp
#include <iostream>
#include <exception>

int main()
{
  std::cout << "before terminate" << std::endl;

  std::terminate(); // プログラムを終了させる

  std::cout << "after terminate" << std::endl; // 実行されない
}
```
* terminate[color ff0000]

###出力例
```
This application has requested the Runtime to terminate it in an unusual way.
Please contact the application's support team for more information.
terminate called without an active exception
```

##参照


