# logic_error

* stdexcept[meta header]
* class[meta id-type]
* std[meta namespace]

```cpp
namespace std {
    class logic_error : public exception;
}
```

## 概要

`logic_error`クラスはプログラムの実行前に検出可能なエラー（論理エラー）を通知するためにスローされる例外クラス全般に対する基底クラスである。

## メンバ関数

| 名前 | 説明 | 対応バージョン |
| --- | --- | --- |
| [`(constructor)`](logic_error/op_constructor.md.nolink) | コンストラクタ | |
| [`(destructor)`](logic_error/op_destructor.md.nolink) | デストラクタ | |
| [`operator=`](logic_error/op_assign.md.nolink) | 代入演算子 | |
| [`what`](logic_error/what.md.nolink) | エラー理由を取得する | |

## 例

```cpp example
#include <stdexcept>
#include <iostream>

int square_root(int num) {
  if (num < 0) {
    throw std::invalid_argument("Cannot perform calculations with negative numbers!")
  }
  return num * num;
}

int main() {
  try {
    square_root(-5);
  } catch (const std::logic_error& e) {
    std::cerr << "Error: " << e.what() << "\n";
  }
}
```

### 出力 (標準エラー出力)

```
Error: Cannot perform calculations with negative numbers!
```
