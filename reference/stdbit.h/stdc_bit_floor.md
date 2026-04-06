# stdc_bit_floor
* stdbit.h[meta header]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
template<class T>
T stdc_bit_floor(T value);

unsigned char stdc_bit_floor_uc(unsigned char value);
unsigned short stdc_bit_floor_us(unsigned short value);
unsigned int stdc_bit_floor_ui(unsigned int value);
unsigned long stdc_bit_floor_ul(unsigned long value);
unsigned long long stdc_bit_floor_ull(unsigned long long value);
```

## 概要
整数値を2の累乗値に切り下げる。

C言語の`<stdbit.h>`で定義される関数であり、C++においてはC互換性のために提供される。C言語では汎用版は型総称マクロ (type-generic macro) として定義されるが、C++では関数テンプレートとして提供される。

## テンプレートパラメータ制約
- 型`T`が符号なし整数型であること

## 戻り値
`value`が0なら0、そうでなければ`value`以下の最大の2の累乗値を返す。

## 例
```cpp example
#include <stdbit.h>
#include <cassert>
#include <cstdint>

int main() {
  assert(stdc_bit_floor(static_cast<std::uint8_t>(5)) == 4);
  assert(stdc_bit_floor(static_cast<std::uint8_t>(0)) == 0);
  assert(stdc_bit_floor(static_cast<std::uint8_t>(8)) == 8);

  // 型別関数
  assert(stdc_bit_floor_uc(static_cast<unsigned char>(5)) == 4);
}
```
* stdc_bit_floor[color ff0000]

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
- [`std::bit_floor`](/reference/bit/bit_floor.md) - C++標準の対応する機能

## 参照
- [N3022 Modern Bit Utilities](https://www.open-std.org/jtc1/sc22/wg14/www/docs/n3022.htm)
- [P3370R1 Add new C headers as C++ headers](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3370r1.html)
