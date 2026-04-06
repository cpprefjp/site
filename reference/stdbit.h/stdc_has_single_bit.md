# stdc_has_single_bit
* stdbit.h[meta header]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
template<class T>
bool stdc_has_single_bit(T value);

bool stdc_has_single_bit_uc(unsigned char value);
bool stdc_has_single_bit_us(unsigned short value);
bool stdc_has_single_bit_ui(unsigned int value);
bool stdc_has_single_bit_ul(unsigned long value);
bool stdc_has_single_bit_ull(unsigned long long value);
```

## 概要
1ビットだけ立っている値をもっているか判定する。

C言語の`<stdbit.h>`で定義される関数であり、C++においてはC互換性のために提供される。C言語では汎用版は型総称マクロ (type-generic macro) として定義されるが、C++では関数テンプレートとして提供される。

## テンプレートパラメータ制約
- 型`T`が符号なし整数型であること

## 戻り値
`value`が2の累乗値 (1ビットだけ立っている) であれば`true`、そうでなければ`false`を返す。

## 例
```cpp example
#include <stdbit.h>
#include <cassert>
#include <cstdint>

int main() {
  assert(stdc_has_single_bit(static_cast<std::uint8_t>(0b0000'1000)) == true);
  assert(stdc_has_single_bit(static_cast<std::uint8_t>(0b0000'1010)) == false);
  assert(stdc_has_single_bit(static_cast<std::uint8_t>(0)) == false);

  // 型別関数
  assert(stdc_has_single_bit_uc(static_cast<unsigned char>(0b0000'1000)) == true);
}
```
* stdc_has_single_bit[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 21 [mark verified]
- [GCC](/implementation.md#gcc): 15 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]

## 関連項目
- [`std::has_single_bit`](/reference/bit/has_single_bit.md) - C++標準の対応する機能

## 参照
- [N3022 Modern Bit Utilities](https://www.open-std.org/jtc1/sc22/wg14/www/docs/n3022.htm)
- [P3370R1 Add new C headers as C++ headers](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3370r1.html)
