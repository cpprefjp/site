#get_new_handler(C++11)
```cpp
namespace std {
  new_handler get_new_handler() noexcept;
}
```
* new_handler[link /reference/new/new_handler.md]

##概要
`new`失敗時に呼ばれる関数を取得する


##例
```cpp
#include <iostream>
#include <new>
#include <cstdlib>

void on_new_failed()
{
  // エラー理由を出力し、プログラムを異常終了させる
  std::cout << "メモリ確保に失敗した" << std::endl;
  std::abort();
}

int main()
{
  {
    // new失敗時の動作をカスタマイズ
    std::new_handler handler = on_new_failed;
    std::set_new_handler(handler);
  }
  {
    // new失敗時に呼び出される関数を取得
    std::new_handler handler = std::get_new_handler(); // on_new_failed()が返される
    handler();
  }
}
```

###出力
```
メモリ確保に失敗した
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): 
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 
- [ICC](/implementation#icc.md): 
- [Visual C++](/implementation#visual_cpp.md): 11.0

