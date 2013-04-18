#new_handler
```cpp
namespace std {  typedef void (*new_handler)();}
```

##概要

`new`失敗時に呼ばれる関数の型。[`set_new_handler`](/reference/new/set_new_handler.md)()、[`get_new_handler`](/reference/new/get_new_handler.md)()で使用する。
`new`演算子は本来であれば失敗時に[`bad_alloc`](/reference/new/bad_alloc.md)例外を送出するが、これらを使用することで、new失敗時の動作を任意の関数で置き換えられる。

ハンドラの内部では、以下のいずれかを行う必要がある：

- 確保済みの領域を解放して`return`する
- [`bad_alloc`](/reference/new/bad_alloc.md)またはその派生の例外を送出する
- `return`により処理を返すことなく、プログラムの実行を直ちに終了させる(`quick_exit()`、`exit()`、`abort()`などを使用する)


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
  std::new_handler handler = on_new_failed;
  std::set_new_handler(handler);

  int* p = new int[std::numeric_limits<std::size_t>::max()];
}
```

###出力例
<pre style='background-color:rgb(239,239,239)'><span style='background-color:rgb(238,238,238);line-height:13px'>```cpp
メモリ確保に失敗した

This application has requested the Runtime to terminate it in an unusual way.
Please contact the application's support team for more information.
</span></pre>
```

##バージョン


###言語


- C++



###処理系

- [Clang](/implementation#clang.md): 3.0
- [GCC](/implementation#gcc.md): 4.6.2
- [GCC, C++0x mode](/implementation#gcc.md): 4.6.2
- [ICC](/implementation#icc.md): 
- [Visual C++](/implementation#visual_cpp.md) 

