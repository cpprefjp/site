# shl
* bit[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp29[meta cpp]

```cpp
namespace std {
  template <class T, class S>
  constexpr T shl(T x, S s) noexcept; // C++29
}
```

## 概要
値`x`を左方向に`s`ビットシフトした値（`x`を`2`の`s`乗倍した値）を求める。

組み込みの`operator<<`と異なり、シフト量`s`が`T`のビット幅以上であっても、また負であっても未定義動作とならない。`s`が負の場合は、右方向へ`-s`ビットシフトした結果（[`shr`](shr.md)`(x, -s)`）となる。


## テンプレートパラメータ制約
- `T`と`S`がそれぞれ符号付きまたは符号なし整数型であること


## 戻り値
十分な値域をもつ仮想的な整数型で`x × 2`<sup>`s`</sup>を計算して負の無限大方向に丸め、その結果を`static_cast`で`T`に変換した値を返す。


## 例外
投げない


## 備考
- `shl(x, s)`は[`shr`](shr.md)`(x, -s)`に等しい。


## 例
```cpp example
#include <bit>
#include <cstdint>
#include <print>

int main()
{
  std::uint8_t x = 0b0000'0011;

  std::uint8_t r = std::shl(x, 2);

  std::println("{:08b}", r);
}
```
* std::shl[color ff0000]

### 出力
```
00001100
```


## バージョン
### 言語
- C++29

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::shr`](shr.md)
- [`std::rotl`](rotl.md)


## 参照
- [P3793R1 Better shifting](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3793r1.html)
    - C++29で追加された
