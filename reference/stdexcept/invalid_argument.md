# invalid_argument

* stdexcept[meta header]
* class[meta id-type]
* std[meta namespace]

```cpp
namespace std {
  class invalid_argument : public logic_error;
}
```

## 概要

関数などにおいて、引数に渡した値が不正であることを示す例外およびその基底クラスである。
この例外は、`std::bitset::bitset`および`std::stoi`や`std::stof`系の関数によって送出される。

## メンバ関数


| 名前 | 説明 | 対応バージョン |
| --- | --- | --- |
| [`(constructor)`](invalid_argument/op_constructor.md.nolink) | コンストラクタ | |
| [`(destructor)`](invalid_argument/op_destructor.md.nolink) | デストラクタ | |
| [`operator=`](invalid_argument/op_assign.md.nolink) | 代入演算子 | |
| [`what`](exception/what.md.nolink) | エラー理由を取得する | |

# 例

```cpp example
#include <string>
#include <stdexcept>
#include <iostream>

int parse_positive_integer(const std::string& s) {
  int value = std::stoi(s);
  if (value <= 0) {
    throw std::invalid_argument("value must be positive");
  }
  return value;
}

int main() {
  try {
    parse_positive_integer("-10");
  } catch (const std::invalid_argument& e) {
    std::cerr << e.what() << "\n";
  }
}
```
* std::stoi[link /reference/string/stoi.md]

### 出力（標準エラー出力）
```
value must be positive
```
