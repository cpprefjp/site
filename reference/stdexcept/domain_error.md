# domain_error

* stdexcept[meta header]
* class[meta id-type]
* std[meta namespace]

```cpp
namespace std {
  class domain_error : public logic_error;
}
```

## 概要

関数引数に定義域の外の値が指定された場合に処理系が送出する例外およびその基底クラスである。
実際には標準ライブラリのコンポーネントはこの例外を送出せず、
代わりにユーザーが使うことができる。

## メンバ関数

| 名前 | 説明 | 対応バージョン |
| --- | --- | --- |
| [`(constructor)`](domain_error/op_constructor.md.nolink) | コンストラクタ | |
| [`(destructor)`](domain_error/op_destructor.md.nolink) | デストラクタ | |
| [`operator=`](domain_error/op_assign.md.nolink) | 代入演算子 | |
| [`what`](exception/what.md.nolink) | エラー理由を取得する | |

## 例

```cpp example 
#include <iostream>
#include <cmath>
#include <stdexcept>

double calc_sqrt(double num) {
  if (num < 0) {
    throw std::domain_error("Cannot calculate the square root of a negative number.");
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

### 出力 (標準エラー出力)
```
Cannot calculate the square root of a negative number.
```
