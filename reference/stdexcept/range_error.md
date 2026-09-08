# range_error
* stdexcept[meta header]
* std[meta namespace]
* class[meta id-type]

```cpp
namespace std {
  class range_error : public runtime_error;
}
```
* runtime_error[link runtime_error.md]

## 概要
`range_error`クラスは、内部計算の結果が値域 (range) の外になったことを通知するために送出される例外クラスである。

標準ライブラリのコンポーネントがこの例外を送出することはなく、ユーザーが使用できる。

このクラスは[`runtime_error`](runtime_error.md)を公開継承しており、`runtime_error`として捕捉できる。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](range_error/op_constructor.md) | コンストラクタ | |
| [`(destructor)`](range_error/op_destructor.md) | デストラクタ | |
| [`operator=`](range_error/op_assign.md) | 代入演算子 | |
| [`what`](/reference/exception/exception/what.md) | エラー理由を取得する（[`std::exception`](/reference/exception/exception.md)から継承） | |


## 例
```cpp example
#include <stdexcept>
#include <iostream>
#include <limits>

// 内部計算の結果が、扱える値の範囲を超えることを通知する
double to_ratio(double numerator, double denominator)
{
  double result = numerator / denominator;
  if (result > std::numeric_limits<double>::max() / 2) {
    throw std::range_error("result is out of the representable range");
  }
  return result;
}

int main()
{
  try {
    to_ratio(1.0, 1e-320);
  }
  catch (const std::range_error& e) {
    std::cout << e.what() << std::endl;
  }
}
```
* std::range_error[color ff0000]
* std::numeric_limits[link /reference/limits/numeric_limits.md]

### 出力
```
result is out of the representable range
```


## 関連項目
- [`<stdexcept>`](/reference/stdexcept.md)
- [`std::exception`](/reference/exception/exception.md)


## 参照
- [P3378R2 `constexpr` exception types](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3378r2.html)
    - C++26で`constexpr`対応した
