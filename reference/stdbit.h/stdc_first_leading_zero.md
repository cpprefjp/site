# stdc_first_leading_zero
* stdbit.h[meta header]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
template<class T>
unsigned int stdc_first_leading_zero(T value);

unsigned int stdc_first_leading_zero_uc(unsigned char value);
unsigned int stdc_first_leading_zero_us(unsigned short value);
unsigned int stdc_first_leading_zero_ui(unsigned int value);
unsigned int stdc_first_leading_zero_ul(unsigned long value);
unsigned int stdc_first_leading_zero_ull(unsigned long long value);
```

## 概要
左から最初の0のビット位置を求める。

C言語の`<stdbit.h>`で定義される関数であり、C++においてはC互換性のために提供される。C言語では汎用版は型総称マクロ (type-generic macro) として定義されるが、C++では関数テンプレートとして提供される。

## テンプレートパラメータ制約
- 型`T`が符号なし整数型であること

## 戻り値
値`value`の最上位ビット (MSB) 側から数えて、最初の0ビットの位置を1始まりで返す。すべてのビットが1の場合は0を返す。

## 例
```cpp example
#include <stdbit.h>
#include <cassert>
#include <cstdint>

int main() {
  // 0b11110000 の最初の0は5番目 (MSB側から)
  assert(stdc_first_leading_zero(static_cast<std::uint8_t>(0b1111'0000)) == 5);
  // すべて1なら0を返す
  assert(stdc_first_leading_zero(static_cast<std::uint8_t>(0xFF)) == 0);
}
```
* stdc_first_leading_zero[color ff0000]

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

## 参照
- [N3022 Modern Bit Utilities](https://www.open-std.org/jtc1/sc22/wg14/www/docs/n3022.htm)
- [P3370R1 Add new C headers as C++ headers](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3370r1.html)
