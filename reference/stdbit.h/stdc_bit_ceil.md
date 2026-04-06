# stdc_bit_ceil
* stdbit.h[meta header]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
template<class T>
T stdc_bit_ceil(T value);

unsigned char stdc_bit_ceil_uc(unsigned char value);
unsigned short stdc_bit_ceil_us(unsigned short value);
unsigned int stdc_bit_ceil_ui(unsigned int value);
unsigned long stdc_bit_ceil_ul(unsigned long value);
unsigned long long stdc_bit_ceil_ull(unsigned long long value);
```

## 概要
整数値を2の累乗値に切り上げる。

C言語の`<stdbit.h>`で定義される関数であり、C++においてはC互換性のために提供される。C言語では汎用版は型総称マクロ (type-generic macro) として定義されるが、C++では関数テンプレートとして提供される。

## テンプレートパラメータ制約
- 型`T`が符号なし整数型であること

## 戻り値
`value`以上の最小の2の累乗値を返す。`value`が0または1なら1を返す。

## 例
```cpp example
#include <stdbit.h>
#include <cassert>
#include <cstdint>

int main() {
  assert(stdc_bit_ceil(static_cast<std::uint8_t>(5)) == 8);
  assert(stdc_bit_ceil(static_cast<std::uint8_t>(1)) == 1);
  assert(stdc_bit_ceil(static_cast<std::uint8_t>(0)) == 1);

  // 型別関数
  assert(stdc_bit_ceil_uc(static_cast<unsigned char>(5)) == 8);
}
```
* stdc_bit_ceil[color ff0000]

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
- [`std::bit_ceil`](/reference/bit/bit_ceil.md) - C++標準の対応する機能

## 参照
- [N3022 Modern Bit Utilities](https://www.open-std.org/jtc1/sc22/wg14/www/docs/n3022.htm)
- [P3370R1 Add new C headers as C++ headers](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3370r1.html)
