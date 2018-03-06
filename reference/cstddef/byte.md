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
| [`operator<<=`](byte/op_left_shift_assign.md.nolink) | 左ビットシフトの複合代入 | C++17 |
| [`operator<<`](byte/op_left_shift.md.nolink)  | 左ビットシフト | C++17 |
| [`operator>>=`](byte/op_right_shift_assign.md.nolink) | 右ビットシフトの複合代入 | C++17 |
| [`operator>>`](byte/op_right_shift.md.nolink)  | 右ビットシフト | C++17 |
| <code>[operator&#x7C;=](byte/op_or_assign.md.nolink)</code> | ビット論理和の複合代入 | C++17 |
| <code>[operator&#x7C;](byte/op_or.md.nolink)</code> | ビット論理和 | C++17 |
| [`operator&=`](byte/op_and_assign.md.nolink) | ビット論理積の複合代入 | C++17 |
| [`operator&`](byte/op_and.md.nolink) | ビット論理積 | C++17 |
| [`operator^=`](byte/op_xor_assign.md.nolink) | ビット排他的論理和の複合代入 | C++17 |
| [`operator^`](byte/op_xor.md.nolink) | ビット排他的論理和 | C++17 |
| [`operator~`](byte/op_not.md.nolink) | ビット反転 | C++17 |


### その他

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`to_integer`](byte/to_integer.md.nolink) | 任意の整数型に変換する | C++17 |


## 例
```cpp example
```


### 出力
```
```


## 関連項目
- [C++17 `enum class`変数の初期値として整数を指定する際の規則を調整](/lang/cpp17/construction_enum_class_values.md)
- [`uint8_t`](/reference/cstdint/uint8_t.md)
- [`CHAR_BIT`](/reference/climits/char_bit.md)


## 参照
- [P0298R3 A `byte` type definition](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0298r3.pdf)
