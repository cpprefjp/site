#get_new_handler (C++11)
* new[meta header]
* std[meta namespace]
* function[meta id-type]

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
- [Clang](/implementation.md#clang): 
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 
- [ICC](/implementation.md#icc): 
- [Visual C++](/implementation.md#visual_cpp): 11.0

