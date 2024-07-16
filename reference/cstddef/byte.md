# byte
* cstddef[meta header]
* std[meta namespace]
* enum[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  enum class byte : unsigned char {};
}
```

## 概要
ビット列としてのバイトデータを表す型。

`unsigned char`、`signed char`、`char`などをバイトデータのための型として使用するよりも、用途が明確になる。

`unsigned char`の強い型付けの別名として定義される。


## 備考
- この型に対して、[`std::numeric_limits`](/reference/limits/numeric_limits.md)の特殊化は定義されない


## 非メンバ関数
### 演算子

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator<<=`](byte/op_left_shift_assign.md)  | 左ビットシフトの複合代入 | C++17 |
| [`operator<<`](byte/op_left_shift.md)          | 左ビットシフト | C++17 |
| [`operator>>=`](byte/op_right_shift_assign.md) | 右ビットシフトの複合代入 | C++17 |
| [`operator>>`](byte/op_right_shift.md)         | 右ビットシフト | C++17 |
| <code>[operator&#x7C;=](byte/op_or_assign.md)</code> | ビット論理和の複合代入 | C++17 |
| <code>[operator&#x7C;](byte/op_or.md)</code>         | ビット論理和 | C++17 |
| [`operator&=`](byte/op_and_assign.md) | ビット論理積の複合代入 | C++17 |
| [`operator&`](byte/op_and.md)         | ビット論理積 | C++17 |
| [`operator^=`](byte/op_xor_assign.md) | ビット排他的論理和の複合代入 | C++17 |
| [`operator^`](byte/op_xor.md)         | ビット排他的論理和 | C++17 |
| [`operator~`](byte/op_flip.md)        | ビット反転 | C++17 |


### その他

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`to_integer`](byte/to_integer.md) | 任意の整数型に変換する | C++17 |


## 例
```cpp example
#include <cassert>
#include <cstddef>
#include <cstdint>

int main()
{
  // 整数値を代入する際は、波カッコ {} で囲むか、
  // static_cast<std::byte>(0b1010)のようにする
  std::byte a{0b1010'1010};
  std::byte b{0b0000'1111};

  // ビット論理積
  std::byte result = a & b;

  // 基底型に変換
  unsigned char result_uc = static_cast<unsigned char>(result);
  assert(result_uc == 0b0000'1010);

  // 任意の整数型に変換
  std::uint8_t result_u8 = std::to_integer<std::uint8_t>(result);
  assert(result_u8 == 0b0000'1010);
}
```
* std::byte[color ff0000]
* a & b[link byte/op_and.md]
* std::to_integer[link byte/to_integer.md]


### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 5.0 [mark verified]
- [GCC](/implementation.md#gcc): 7.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2017 Update 3(`_HAS_STD_BYTE`を`0`に定義することで無効化できる) [mark verified]


## 関連項目
- [C++17 `enum class`変数の初期値として整数を指定する際の規則を調整](/lang/cpp17/construction_enum_class_values.md)
- [`uint8_t`](/reference/cstdint/uint8_t.md)
- [`CHAR_BIT`](/reference/climits/char_bit.md)


## 参照
- [P0298R3 A `byte` type definition](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0298r3.pdf)
