# bit_expand
* bit[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp29[meta cpp]

```cpp
namespace std {
  template <class T>
  constexpr T bit_expand(T x, T m) noexcept; // C++29
}
```

## 概要
`x`の下位ビットを、マスク`m`でビットが立っている位置へ順に配置する（parallel bits deposit）。

x86の`PDEP`命令に相当する操作であり、[`bit_compress`](bit_compress.md)の逆操作である。


## テンプレートパラメータ制約
- 型`T`が符号なし整数型であること


## 戻り値
`T`のビット数を`N`とする。`m`の第`n`ビットが`1`である位置を下位から順に走査し、`x`の下位ビットから順に取り出した値をその位置へ配置した値を返す。すなわち、`m`のなかで`k`番目に立っているビット位置には、`x`の第`k`ビットが配置される。


## 例外
投げない


## 備考
- [`bit_compress`](bit_compress.md)は逆操作である。`m`のビットがすべて`1`のとき、`bit_expand(bit_compress(x, m), m)`は`x`に等しい。


## 例
```cpp example
#include <bit>
#include <cstdint>
#include <print>

int main()
{
  std::uint8_t x = 0b0000'1011;
  std::uint8_t m = 0b1111'0000; // 下位4ビットを上位4ビットの位置へ展開

  std::uint8_t r = std::bit_expand(x, m);

  std::println("{:08b}", r);
}
```
* std::bit_expand[color ff0000]

### 出力
```
10110000
```


## バージョン
### 言語
- C++29

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::bit_compress`](bit_compress.md)
- [`std::bit_reverse`](bit_reverse.md)
- [`std::bit_repeat`](bit_repeat.md)


## 参照
- [P3104R3 Bit permutations](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3104r3.html)
    - C++29で追加された
