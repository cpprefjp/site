# rotl
* bit[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class T>
  [[nodiscard]]
  constexpr T rotl(T x, int s) noexcept; // (1) C++20
  template <class T>
  constexpr T rotl(T x, int s) noexcept; // (1) C++26
}
```

## 概要
左循環ビットシフト。

値`x`をシフト量`s`だけ左に循環シフトする。


## テンプレートパラメータ制約
- 型`T`が符号なし整数型であること


## 戻り値
符号なし整数型`T`のビット数を`N`、`s % N`を`r`であるとして。

- `r`が0である場合は`x`が返る
- `r`が正である場合は`(x << r) | (x >> (N - r))`が返る
- `r`が負である場合は[`rotr`](rotr.md)`(x, -r)`が返る


## 例外
投げない


## 備考
- この関数は、ハードウェア機能として提供されている場合がある


## 例
```cpp example
#include <cassert>
#include <bit>
#include <cstdint>

int main()
{
  auto i = static_cast<std::uint32_t>(0b0001'0000'0000'0000'0000'0000'0000'0000u);
  std::uint32_t a = std::rotl(i, 4);
  assert(a == 0b0000'0000'0000'0000'0000'0000'0000'0001u);

  std::uint32_t b = std::rotl(i, -4);
  assert(b == 0b0000'0001'0000'0000'0000'0000'0000'0000u);
}
```
* std::rotl[color ff0000]
* std::uint32_t[link /reference/cstdint/uint32_t.md]

### 出力
```
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark verified]
- [GCC](/implementation.md#gcc): 9.2 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0553R4 Bit operations](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0553r4.html)
- [P2422R1 Remove `nodiscard` annotations from the standard library specification](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2422r1.html)
    - C++26で`[[nodiscard]]`指定が削除された
