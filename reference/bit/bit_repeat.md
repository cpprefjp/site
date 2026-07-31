# bit_repeat
* bit[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp29[meta cpp]

```cpp
namespace std {
  template <class T>
  constexpr T bit_repeat(T x, int l); // C++29
}
```

## 概要
値`x`の最下位`l`ビットのパターンを、`T`の幅いっぱいに繰り返した値を求める。


## テンプレートパラメータ制約
- 型`T`が符号なし整数型であること


## 事前条件
- `l`が`0`より大きいこと


## 戻り値
`T`のビット数を`N`（[`std::numeric_limits`](/reference/limits/numeric_limits.md)`<T>::digits`）とする。第`n`ビット（`0`以上`N`未満）が`x`の第`n % l`ビットに等しい値を返す。


## 例外
投げない


## 備考
- 事前条件に違反する関数呼び出し式は、定数式として評価されない。


## 例
```cpp example
#include <bit>
#include <cstdint>
#include <print>

int main()
{
  // 最下位4ビットのパターン 0b1100 を繰り返す
  std::uint32_t r = std::bit_repeat(std::uint32_t{0xc}, 4);

  std::println("{:08x}", r);
}
```
* std::bit_repeat[color ff0000]

### 出力
```
cccccccc
```


## バージョン
### 言語
- C++29

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::bit_reverse`](bit_reverse.md)
- [`std::bit_compress`](bit_compress.md)
- [`std::bit_expand`](bit_expand.md)


## 参照
- [P3104R3 Bit permutations](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3104r3.html)
    - C++29で追加された
