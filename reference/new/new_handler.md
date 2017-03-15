# new_handler
* new[meta header]
* std[meta namespace]
* type-alias[meta id-type]

```cpp
namespace std {
  using new_handler = void(*)();
}
```

## 概要
`new`失敗時に呼ばれる関数の型。[`set_new_handler`](set_new_handler.md)`()`、[`get_new_handler`](get_new_handler.md)`()`で使用する。

`new`演算子は本来であれば失敗時に[`bad_alloc`](bad_alloc.md)例外を送出するが、これらを使用することで、`new`失敗時の動作を任意の関数で置き換えられる。 

ハンドラの内部では、以下のいずれかを行う必要がある：

- 確保済みの領域を解放して`return`する
- [`bad_alloc`](bad_alloc.md)またはその派生の例外を送出する
- `return`により処理を返すことなく、プログラムの実行を直ちに終了させる(`quick_exit()`、`exit()`、`abort()`などを使用する)


## 例
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
* std::new_handler[color ff0000]
* std::set_new_handler[link set_new_handler.md]
* max()[link /reference/limits/numeric_limits/max.md]
* std::abort()[link /reference/cstdlib/abort.md]

### 出力例
```
メモリ確保に失敗した

This application has requested the Runtime to terminate it in an unusual way.
Please contact the application's support team for more information.
```


