# bad_array_new_length
* new[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  class bad_array_new_length : public bad_alloc;
}
```
* bad_alloc[link /reference/new/bad_alloc.md]

## 概要
動的に記憶域を確保しようとする配列の長さが 0 未満または処理系の最大値以上の場合に送出される例外。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [(constructor)](bad_array_new_length/op_constructor.md) | コンストラクタ | C++11 |
| [(destructor)](bad_array_new_length/op_destructor.md) | デストラクタ | C++11 |
| [`operator=`](bad_array_new_length/op_assign.md) | 代入演算子 | C++11 |
| [`what`](bad_array_new_length/what.md) | エラー理由を取得する | C++11 |


## 例
```cpp example
#include <iostream>

int main() {
  int n = -1;
  try {
    int* p = new int[n];
    delete[] p;
  }
  catch (std::bad_array_new_length&) {
    std::cout << "bad array new length" << std::endl;
  }
}
```

### 出力例
```
bad array new length
```

## バージョン
C++11

### 処理系
- [Clang](/implementation.md#clang): 7 [mark verified]
- [GCC](/implementation.md#gcc): 4.9 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 [mark verified]
