# bad_alloc
* new[meta header]
* std[meta namespace]
* class[meta id-type]

```cpp
namespace std {
  class bad_alloc : public exception;
}
```
* exception[link /reference/exception/exception.md]

## 概要
何らかの理由で記憶域の動的確保に失敗するなど、[`get_new_handler()`](get_new_handler.md)が`nullptr`を返した場合に投げられる例外。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [(constructor)](bad_alloc/op_constructor.md) | コンストラクタ | |
| [(destructor)](bad_alloc/op_destructor.md) | デストラクタ | |
| [`operator=`](bad_alloc/op_assign.md) | 代入演算子 | |
| [`what`](bad_alloc/what.md) | エラー理由を取得する | |


```cpp example
#include <iostream>
#include <new>

struct X {};

int main()
{
  try {
    X* x = new X();
  }
  catch (std::bad_alloc& e) {
    // メモリ確保に失敗
    std::cout << e.what() << std::endl;
  }
}
```
* std::bad_alloc[color ff0000]
