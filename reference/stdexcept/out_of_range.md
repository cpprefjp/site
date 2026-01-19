# out_of_range

* stdexcept[meta header]
* class[meta id-type]
* std[meta namespace]

```cpp 
namespace std {
  class out_of_range : public logic_error;
}
```

## 概要

`out_of_range`は有効範囲外の引数を通知するために送出される例外及びそれに対する基底クラスである。

## メンバ関数

| 名前 | 説明 | 対応バージョン |
| --- | --- | --- |
| [`(constructor)`](out_of_range/op_constructor.md.nolink) | コンストラクタ | |
| [`(destructor)`](out_of_range/op_destructor.md.nolink) | デストラクタ | |
| [`operator=`](out_of_range/op_assign.md.nolink) | 代入演算子 | |
| [`what`](exception/what.md.nolink) | エラー理由を取得する | |

## 例

```cpp example
#include <iostream>
#include <vector>
#include <stdexcept>

int main() {
  std::vector<int> vec = {1, 2, 3};
  try {
    std::cout << vec.at(3) << "\n";
  } catch (const std::out_of_range& e) {
    std::cerr << e.wnat() << "\n";
  }
}
```

### 出力（標準エラー出力）

```
vector::_M_range_check: __n (which is 3) >= this->size() (which is 3)
```