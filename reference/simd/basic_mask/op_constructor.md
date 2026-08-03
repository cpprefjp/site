# コンストラクタ
* simd[meta header]
* std::simd[meta namespace]
* basic_mask[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr basic_mask() noexcept = default;                     // (1) C++26

constexpr explicit basic_mask(same_as<value_type> auto x) noexcept; // (2) C++26

template<std::size_t UBytes, class UAbi>
constexpr explicit basic_mask(const basic_mask<UBytes, UAbi>& x) noexcept; // (3) C++26

template<class G>
constexpr explicit basic_mask(G&& gen);                        // (4) C++26

template<same_as<bitset<size()>> T>
constexpr basic_mask(const T& b) noexcept;                     // (5) C++26

template<unsigned_integral T>
  requires (!same_as<T, value_type>)
constexpr explicit basic_mask(T val) noexcept;                 // (6) C++26
```
* same_as[link /reference/concepts/same_as.md]
* bitset[link /reference/bitset/bitset.md]
* size()[link size.md]
* unsigned_integral[link /reference/concepts/unsigned_integral.md]

## 概要
`basic_mask`オブジェクトを構築する。

- (1) : デフォルトコンストラクタ。各要素は値初期化される
- (2) : ブロードキャストコンストラクタ。すべての要素を単一の値`x`で初期化する
- (3) : 変換コンストラクタ。要素数が等しい別の`basic_mask`から各要素を変換して初期化する
- (4) : ジェネレータコンストラクタ。各要素の値を、添字を引数とする関数オブジェクト`gen`の呼び出し結果で初期化する
- (5) : [`std::bitset`](/reference/bitset/bitset.md)の各ビットで対応する要素を初期化する
- (6) : 符号なし整数値`val`の各ビットで対応する要素を初期化する


## テンプレートパラメータ制約
- (3) : `basic_mask<UBytes, UAbi>::size() == size()`が`true`であること
- (4) : すべての`i`（`0 <= i < size()`）について、式`gen(std::integral_constant<simd-size-type, i>())`が適格であり、その型が`bool`であること
- (6) : `T`が`value_type`（`bool`）と異なる符号なし整数型であること


## 効果
- (1) : 各要素を値初期化する
- (2) : 各要素を`x`で初期化する
- (3) : すべての`i`（`0 <= i < size()`）について、`i`番目の要素を`x[i]`で初期化する
- (4) : すべての`i`（`0 <= i < size()`）について、`i`番目の要素を`gen(std::integral_constant<simd-size-type, i>())`で初期化する
- (5) : すべての`i`（`0 <= i < size()`）について、`i`番目の要素を`b[i]`で初期化する
- (6) : 先頭の`M`個の要素を`val`の対応するビット値で初期化する。ここで`M`は`size()`と、`val`の型の値表現のビット数のうち小さいほうである。`M`が`size()`より小さい場合、残りの要素は`false`で初期化される


## 例外
- (4) : `gen`の呼び出しが例外を送出する場合を除いて、投げない


## 備考
- (4) : `gen`は各`i`につき正確に1回、`i`の昇順で呼び出される


## 例
```cpp example
#include <simd>
#include <bitset>
#include <print>

namespace simd = std::simd;

int main()
{
  // (2) ブロードキャスト：すべての要素をtrueにする
  simd::mask<int, 4> allTrue{true};

  // (4) ジェネレータ：偶数番目の要素をtrueにする
  simd::mask<int, 4> gen = [](int i) { return i % 2 == 0; };

  // (5) bitsetから構築する（0番目のビットが先頭要素）
  simd::mask<int, 4> fromBitset{std::bitset<4>{"1010"}};

  // (6) 符号なし整数のビット列から構築する
  simd::mask<int, 4> fromBits{0b1010u};

  for (int i = 0; i < allTrue.size(); ++i)
    std::print("{} ", allTrue[i]);
  std::println("");

  for (int i = 0; i < gen.size(); ++i)
    std::print("{} ", gen[i]);
  std::println("");

  for (int i = 0; i < fromBits.size(); ++i)
    std::print("{} ", fromBits[i]);
  std::println("");
}
```
* simd::mask[link ../basic_mask.md]
* allTrue.size()[link size.md]
* allTrue[i][link op_at.md]

### 出力
```
true true true true 
true false true false 
false true false true 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で追加された
