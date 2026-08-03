# bit_compress
* bit[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp29[meta cpp]

```cpp
namespace std {
  template <class T>
  constexpr T bit_compress(T x, T m) noexcept; // C++29
}
```

## 概要
マスク`m`でビットが立っている位置の`x`のビットを集め、結果の下位ビットへ詰めて配置する（parallel bits extract）。

x86の`PEXT`命令に相当する操作である。


## テンプレートパラメータ制約
- 型`T`が符号なし整数型であること


## 戻り値
`T`のビット数を`N`とする。`m`の第`n`ビットが`1`である位置を下位から順に走査し、対応する`x`の第`n`ビットを結果の下位側から順に詰めた値を返す。すなわち、結果の第`k`ビットは、`m`のなかで`k`番目に立っているビット位置の`x`のビットに等しい。


## 例外
投げない


## 備考
- [`bit_expand`](bit_expand.md)は逆操作である。`m`のビットがすべて`1`のとき、`bit_expand(bit_compress(x, m), m)`は`x`に等しい。


## 例
```cpp example
#include <bit>
#include <cstdint>
#include <print>

int main()
{
  std::uint8_t x = 0b1011'0100;
  std::uint8_t m = 0b1111'0000; // 上位4ビットを抽出

  std::uint8_t r = std::bit_compress(x, m);

  std::println("{:08b}", r);
}
```
* std::bit_compress[color ff0000]

### 出力
```
00001011
```


## バージョン
### 言語
- C++29

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::bit_expand`](bit_expand.md)
- [`std::bit_reverse`](bit_reverse.md)
- [`std::bit_repeat`](bit_repeat.md)


## 参照
- [P3104R3 Bit permutations](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3104r3.html)
    - C++29で追加された
