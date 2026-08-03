# shr
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp29[meta cpp]

```cpp
namespace std::simd {
  template<simd-integral VX, simd-integral VS>
  constexpr VX shr(const VX& x, const VS& s) noexcept; // (1) C++29

  template<simd-integral V, class S>
  constexpr V shr(const V& x, S s) noexcept;           // (2) C++29
}
```
* simd-integral[link /reference/simd/simd-integral.md]

## 概要
整数要素をもつ[`basic_vec`](basic_vec.md)の各要素に対して、`<bit>`ヘッダの[`std::shr`](/reference/bit/shr.md)を要素ごとに適用し、各要素を論理右シフトする。符号によらず上位には0が入る。

組み込みの右シフト演算子`>>`とは異なり、シフト量が要素のビット幅以上である場合や負である場合でも未定義動作とならず、定義された結果を返す。

- (1) : 各要素をシフト量`s[i]`だけ右シフトする
- (2) : すべての要素を同一のシフト量`s`だけ右シフトする


## テンプレートパラメータ制約
- (1) :
    - `VX::value_type`と`VS::value_type`がそれぞれ符号付きまたは符号なし整数型であること
    - `VX::size() == VS::size()`が`true`であること
    - `sizeof(typename VX::value_type) == sizeof(typename VS::value_type)`が`true`であること
- (2) :
    - `V::value_type`と`S`がそれぞれ符号付きまたは符号なし整数型であること


## 戻り値
- (1) : `i`番目の要素が`std::shr(x[i], s[i])`で初期化された[`basic_vec`](basic_vec.md)オブジェクトを返す
- (2) : `i`番目の要素が`std::shr(x[i], s)`で初期化された[`basic_vec`](basic_vec.md)オブジェクトを返す


## 例外
投げない


## 例
```cpp example
#include <simd>
#include <print>
#include <cstdint>

namespace simd = std::simd;

int main()
{
  // {0x0001, 0x0010, 0x0100, 0x1000}
  simd::vec<std::uint16_t, 4> v {[](int i) {
    return static_cast<std::uint16_t>(1u << (i * 4));
  }};

  // 各要素を4ビットだけ論理右シフトする
  simd::vec<std::uint16_t, 4> r = simd::shr(v, 4);

  for (int i = 0; i < v.size(); ++i) {
    std::println("{:016b} -> {:016b}", v[i], r[i]);
  }
}
```
* simd::shr[color ff0000]

### 出力
```
0000000000000001 -> 0000000000000000
0000000000010000 -> 0000000000000001
0000000100000000 -> 0000000000010000
0001000000000000 -> 0000000100000000
```


## バージョン
### 言語
- C++29

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::shl`](shl.md)


## 参照
- [P3793R1 Better shifting](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3793r1.html)
    - C++29で`<bit>`ヘッダにスカラー版、`<simd>`ヘッダに`std::simd`版の`shr`が追加された
