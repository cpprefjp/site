# domain_error

* stdexcept[meta header]
* class[meta id-type]
* std[meta namespace]

```cpp
namespace std {
  class domain_error : public public_error;
}
```

## 概要

操作定義の範囲外の入力があった場合に送出されるすべての例外に対する基底クラスである。
標準ライブラリのコンポーネントはこの例外をスローしない。

## メンバ関数

| 名前 | 説明 | 対応バージョン |
| --- | --- | --- |
| [`(constructor)`](logic_error/op_constructor.md.nolink) | コンストラクタ | |
| [`(destructor)`](logic_error/op_destructor.md.nolink) | デストラクタ | |
| [`operator=`](logic_error/op_assign.md.nolink) | 代入演算子 | |
| [`what`](logic_error/what.md.nolink) | エラー理由を取得する | |

## 例

```cpp example 
#include <iostream>
#include <cmath>
#include <stdexcept>

double calc_sqrt(double num) {
  if (num < 0) {
    throw std::domain_error("Cannot calculate square root of a negative number.");
  }
  return std::sqrt(num);
}

int main() {
  try {
    std::cout << calc_sqrt(-4.0) << "\n";
  } catch (const std::domain_error& e) {
    std::cerr << e.what() << "\n";
  }
}
```

### 出力
```
```
