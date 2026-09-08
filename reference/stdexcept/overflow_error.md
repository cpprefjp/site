# overflow_error
* stdexcept[meta header]
* std[meta namespace]
* class[meta id-type]

```cpp
namespace std {
  class overflow_error : public runtime_error;
}
```
* runtime_error[link runtime_error.md]

## 概要
`overflow_error`クラスは、算術演算の結果がオーバーフロー（扱える値の上限を超過）したことを通知するために送出される例外クラスである。

標準ライブラリでは、[`std::bitset`](/reference/bitset/bitset.md)の[`to_ulong()`](/reference/bitset/bitset/to_ulong.md)や[`to_ullong()`](/reference/bitset/bitset/to_ullong.md)が、値を戻り値の型で表現できない場合にこの例外を送出する。

このクラスは[`runtime_error`](runtime_error.md)を公開継承しており、`runtime_error`として捕捉できる。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](overflow_error/op_constructor.md) | コンストラクタ | |
| [`(destructor)`](overflow_error/op_destructor.md) | デストラクタ | |
| [`operator=`](overflow_error/op_assign.md) | 代入演算子 | |
| [`what`](/reference/exception/exception/what.md) | エラー理由を取得する（[`std::exception`](/reference/exception/exception.md)から継承） | |


## 例
```cpp example
#include <stdexcept>
#include <iostream>
#include <bitset>

int main()
{
  std::bitset<128> bits;
  bits.set(127);

  try {
    // 128ビットの値はunsigned longでは表現できない
    unsigned long value = bits.to_ulong();
    std::cout << value << std::endl;
  }
  catch (const std::overflow_error& e) {
    std::cout << "overflow_error: " << e.what() << std::endl;
  }
}
```
* std::overflow_error[color ff0000]
* bits.to_ulong()[link /reference/bitset/bitset/to_ulong.md]
* bits.set[link /reference/bitset/bitset/set.md]

### 出力例
```
overflow_error: _Base_bitset::_M_do_to_ulong
```

例外オブジェクトが保持するメッセージの内容は、処理系によって異なる。


## 関連項目
- [`<stdexcept>`](/reference/stdexcept.md)
- [`std::exception`](/reference/exception/exception.md)


## 参照
- [P3378R2 `constexpr` exception types](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3378r2.html)
    - C++26で`constexpr`対応した
