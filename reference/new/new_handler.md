# new_handler
* new[meta header]
* std[meta namespace]
* type-alias[meta id-type]

```cpp
namespace std {
  typedef void (*new_handler)();   // C++98
  using new_handler = void (*)();  // C++20
}
```

## 概要
`new`失敗時に呼ばれる関数の型。[`set_new_handler`](set_new_handler.md)`()`、[`get_new_handler`](get_new_handler.md)`()`で使用する。

`new`演算子は本来であれば失敗時に[`bad_alloc`](bad_alloc.md)例外を送出するが、これらを使用することで、`new`失敗時の動作を任意の関数で置き換えられる。 

ハンドラの内部では、以下のいずれかを行う必要がある：

- 確保のために利用できる領域を増やして`return`する
- [`bad_alloc`](bad_alloc.md)またはその派生の例外を送出する
- プログラムの実行を終了させる
    - C++98 : [`abort()`](/reference/cstdlib/abort.md)もしくは[`exit()`](/reference/cstdlib/exit.md)を呼び出す
    - C++11 : 呼び出し元へ戻ることなく、プログラムの実行を終了させる。[`abort()`](/reference/cstdlib/abort.md)や[`exit()`](/reference/cstdlib/exit.md)のほか、[`quick_exit()`](/reference/cstdlib/quick_exit.md)なども使用できる


## 例
```cpp example
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

  auto n = std::numeric_limits<std::size_t>::max();
  int* p = new int[n];
  delete[] p;
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


## バージョン
### 言語
- C++98


## 関連項目
- [`set_new_handler`](set_new_handler.md)
- [`get_new_handler`](get_new_handler.md)
- [`bad_alloc`](bad_alloc.md)


## 参照
- [LWG Issue 994. `quick_exit` should terminate well-defined](https://cplusplus.github.io/LWG/issue994)
    - C++11で、`new_handler`に要求される動作が「`abort()`もしくは`exit()`を呼び出す」から「呼び出し元へ戻らずにプログラムの実行を終了する」へ改められた。[`quick_exit()`](/reference/cstdlib/quick_exit.md)など他の終了手段も許容するため
