# runtime_error
* stdexcept[meta header]
* std[meta namespace]
* class[meta id-type]

```cpp
namespace std {
  class runtime_error : public exception;
}
```
* exception[link /reference/exception/exception.md]

## 概要
`runtime_error`クラスは、プログラムの実行時にのみ検出可能なエラー（実行時エラー）を通知するために送出される例外クラス全般に対する基底クラスである。

実行時エラーは、プログラムの制御が及ばない事象に起因するため、あらかじめ予見することが難しいものを指す。

このクラスは[`exception`](/reference/exception/exception.md)を公開継承しており、`exception`として捕捉できる。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](runtime_error/op_constructor.md) | コンストラクタ | |
| [`(destructor)`](runtime_error/op_destructor.md) | デストラクタ | |
| [`operator=`](runtime_error/op_assign.md) | 代入演算子 | |
| [`what`](/reference/exception/exception/what.md) | エラー理由を取得する（[`std::exception`](/reference/exception/exception.md)から継承） | |


## 例
```cpp example
#include <stdexcept>
#include <iostream>

void process(bool device_available)
{
  if (!device_available) {
    // 実行時にしか判明しないエラー
    throw std::runtime_error("device is not available");
  }
}

int main()
{
  try {
    process(false);
  }
  catch (const std::runtime_error& e) {
    std::cout << e.what() << std::endl;
  }
}
```
* std::runtime_error[color ff0000]

### 出力
```
device is not available
```


## 関連項目
- [`<stdexcept>`](/reference/stdexcept.md)
- [`std::exception`](/reference/exception/exception.md)


## 参照
- [P3378R2 `constexpr` exception types](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3378r2.html)
    - C++26で`constexpr`対応した
