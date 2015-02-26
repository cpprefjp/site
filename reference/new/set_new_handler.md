#set_new_handler
* new[meta header]
* std[meta namespace]

```cpp
namespace std {
  new_handler set_new_handler(new_handler new_p) noexcept;
}
```
* new_handler[link /reference/new/new_handler.md]

##概要
`new`失敗時に呼ばれる関数を設定する。 

`new`失敗時にはデフォルトで[`bad_alloc`](./bad_alloc.md)例外が投げられるが、この関数を使用することで`new`失敗時の挙動を切り替えられる。


##効果
`new_p`関数を、`new`失敗時に呼ばれる関数として設定する。 
パラメータとしてヌルポインタが渡された場合、初期のハンドラが設定される。


##戻り値
この関数が呼ばれる前に設定されていた関数を返す


##例
```cpp
#include <iostream>
#include <new>
#include <limits>
#include <cstdlib>

void on_new_failed()
{
  // エラー理由を出力し、プログラムを異常終了させる
  std::cout << "メモリ確保に失敗した" << std::endl;
  std::abort();
}

int main()
{
  // new失敗時の動作をカスタマイズ
  std::set_new_handler(on_new_failed);

  int* p = new int[std::numeric_limits<std::size_t>::max()];
}
```
* set_new_handler[color ff0000]

###出力例
```
メモリ確保に失敗した

This application has requested the Runtime to terminate it in an unusual way.
Please contact the application's support team for more information.</span>
```

