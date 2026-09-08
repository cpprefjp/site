# underflow_error
* stdexcept[meta header]
* std[meta namespace]
* class[meta id-type]

```cpp
namespace std {
  class underflow_error : public runtime_error;
}
```
* runtime_error[link runtime_error.md]

## 概要
`underflow_error`クラスは、算術演算の結果がアンダーフロー（扱える値の下限を超過、または絶対値が小さすぎて表現できない）したことを通知するために送出される例外クラスである。

標準ライブラリのコンポーネントがこの例外を送出することはなく、ユーザーが使用できる。

このクラスは[`runtime_error`](runtime_error.md)を公開継承しており、`runtime_error`として捕捉できる。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](underflow_error/op_constructor.md) | コンストラクタ | |
| [`(destructor)`](underflow_error/op_destructor.md) | デストラクタ | |
| [`operator=`](underflow_error/op_assign.md) | 代入演算子 | |
| [`what`](/reference/exception/exception/what.md) | エラー理由を取得する（[`std::exception`](/reference/exception/exception.md)から継承） | |


## 例
```cpp example
#include <stdexcept>
#include <iostream>
#include <limits>
#include <cmath>

// 演算結果が非正規化数となり、精度が失われる場合をアンダーフローとして通知する
double divide(double a, double b)
{
  double result = a / b;
  if (result != 0.0 && std::abs(result) < std::numeric_limits<double>::min()) {
    throw std::underflow_error("result is too small to represent");
  }
  return result;
}

int main()
{
  try {
    divide(1e-300, 1e10);
  }
  catch (const std::underflow_error& e) {
    std::cout << e.what() << std::endl;
  }
}
```
* std::underflow_error[color ff0000]
* std::numeric_limits[link /reference/limits/numeric_limits.md]
* std::abs[link /reference/cmath/abs.md]

### 出力
```
result is too small to represent
```


## 関連項目
- [`<stdexcept>`](/reference/stdexcept.md)
- [`std::exception`](/reference/exception/exception.md)


## 参照
- [P3378R2 `constexpr` exception types](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3378r2.html)
    - C++26で`constexpr`対応した
