# bit_reverse
* bit[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp29[meta cpp]

```cpp
namespace std {
  template <class T>
  constexpr T bit_reverse(T x) noexcept; // C++29
}
```

## 概要
値`x`のビット列の並びを反転する。

最下位ビットと最上位ビットを入れ替えるように、すべてのビットを逆順に並べ替える。


## テンプレートパラメータ制約
- 型`T`が符号なし整数型であること


## 戻り値
`T`のビット数を`N`（[`std::numeric_limits`](/reference/limits/numeric_limits.md)`<T>::digits`）とする。`x`の第`n`ビット（`0`以上`N`未満）を第`N - 1 - n`ビットへ移した値を返す。


## 例外
投げない


## 備考
- `bit_reverse(bit_reverse(x))`は`x`に等しい。
- この関数は、ハードウェア機能として提供されている場合がある。


## 例
```cpp example
#include <bit>
#include <cstdint>
#include <print>

int main()
{
  std::uint16_t x = 0b0000'0000'0000'0001;

  std::uint16_t r = std::bit_reverse(x);

  std::println("{:016b}", r);
}
```
* std::bit_reverse[color ff0000]

### 出力
```
1000000000000000
```


## バージョン
### 言語
- C++29

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::bit_repeat`](bit_repeat.md)
- [`std::byteswap`](byteswap.md)
- [`std::rotl`](rotl.md)


## 参照
- [P3104R3 Bit permutations](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3104r3.html)
    - C++29で追加された
