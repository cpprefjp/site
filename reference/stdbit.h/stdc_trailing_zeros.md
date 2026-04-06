# stdc_trailing_zeros
* stdbit.h[meta header]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
template<class T>
unsigned int stdc_trailing_zeros(T value);

unsigned int stdc_trailing_zeros_uc(unsigned char value);
unsigned int stdc_trailing_zeros_us(unsigned short value);
unsigned int stdc_trailing_zeros_ui(unsigned int value);
unsigned int stdc_trailing_zeros_ul(unsigned long value);
unsigned int stdc_trailing_zeros_ull(unsigned long long value);
```

## 概要
右から連続した0のビットを数える。

C言語の`<stdbit.h>`で定義される関数であり、C++においてはC互換性のために提供される。C言語では汎用版は型総称マクロ (type-generic macro) として定義されるが、C++では関数テンプレートとして提供される。

## テンプレートパラメータ制約
- 型`T`が符号なし整数型であること

## 戻り値
値`value`の、最下位ビット (LSB) から開始して連続した0ビットの数を返す。

## 例
```cpp example
#include <stdbit.h>
#include <cassert>
#include <cstdint>

int main() {
  assert(stdc_trailing_zeros(static_cast<std::uint32_t>(0b0000'0000'0000'0000'0000'0000'0000'1000u)) == 3);
  assert(stdc_trailing_zeros(static_cast<std::uint8_t>(0)) == 8);

  // 型別関数
  assert(stdc_trailing_zeros_uc(static_cast<unsigned char>(0)) == 8);
}
```
* stdc_trailing_zeros[color ff0000]

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
- [`std::countr_zero`](/reference/bit/countr_zero.md) - C++標準の対応する機能

## 参照
- [N3022 Modern Bit Utilities](https://www.open-std.org/jtc1/sc22/wg14/www/docs/n3022.htm)
- [P3370R1 Add new C headers as C++ headers](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3370r1.html)
