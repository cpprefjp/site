# 添字演算子の多次元サポート [P2128R6]
* cpp23[meta cpp]

## 概要
C++23では、多次元配列クラスを定義するために必要となる、添字演算子のオーバーロードを定義する際の複数引数を許可する。

```cpp
R operator[](int x, int y, int z);
```

複数の許可がされるまでは、以下のような回避策がとられていた：

- 添字アクセスを、関数呼び出し演算子で代用
- カンマ演算子をオーバーロードして、複数引数をひとつの引数にまとめる


## 例
```cpp example
struct Matrix2x2 {
  float data[2 * 2];

  float& operator[](int x, int y) {
    return data[y * 2 + x];
  }
};

#include <iostream>
int main() {
  Matrix2x2 mat = {
    1.0f, 2.0f,
    3.0f, 4.0f
  };

  float r = mat[0, 1];
  std::cout << r << std::endl;
}
```

### 出力
```
3
```

## 関連項目
- [C++20 添字演算子内でのカンマ演算子の使用を非推奨化](/lang/cpp20/deprecate_uses_of_the_comma_operator_in_subscripting_expressions.md)
- [`std::mdspan`](/reference/mdspan/mdspan.md)


## 参照
- [P2128R6 Multidimensional subscript operator](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2128r6.pdf)
