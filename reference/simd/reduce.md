# reduce
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<class T, class Abi, class BinaryOperation = std::plus<>>
  constexpr T
    reduce(const basic_vec<T, Abi>& x,
           BinaryOperation binary_op = {});                           // (1) C++26

  template<class T, class Abi, class BinaryOperation = std::plus<>>
  constexpr T
    reduce(const basic_vec<T, Abi>& x,
           const typename basic_vec<T, Abi>::mask_type& mask,
           BinaryOperation binary_op = {},
           std::type_identity_t<T> identity_element = /*see below*/); // (2) C++26

  template<class T, class BinaryOperation = std::plus<>>
  constexpr T
    reduce(const T& x,
           BinaryOperation binary_op = {}); // (3) C++26

  template<class T, class BinaryOperation = std::plus<>>
  constexpr T
    reduce(const T& x,
           std::same_as<bool> auto mask,
           BinaryOperation binary_op = {},
           std::type_identity_t<T> identity_element = /*see below*/); // (4) C++26
}
```
* basic_vec[link basic_vec.md]
* std::plus[link /reference/functional/plus.md]
* std::type_identity_t[link /reference/type_traits/type_identity.md]
* std::same_as[link /reference/concepts/same_as.md]

## 概要
[`basic_vec`](basic_vec.md)の全要素を二項演算`binary_op`で集計し、単一の値を求める。

- (1) : `x`の全要素を`binary_op`で集計する。
- (2) : `mask`で選択された要素のみを`binary_op`で集計する。ひとつも選択されていない場合は`identity_element`（単位元）を返す。
- (3) : スカラー値`x`をそのまま返す（SIMD-genericなコードを書けるようにするためのオーバーロード）。
- (4) : `mask`が`true`なら`x`を、`false`なら`identity_element`を返す。

`binary_op`は結合的かつ可換な二項演算でなければならず、要素の集計順は規定されない。

## テンプレートパラメータ制約
- (1), (2) : `BinaryOperation`が説明専用コンセプト[`reduction-binary-operation`](/reference/simd/reduction-binary-operation.md)`<T>`のモデルであること
- (3), (4) : `T`が[「vectorizable type」](/reference/simd.md#vectorizable-type)であり、かつ`BinaryOperation`が[`reduction-binary-operation`](/reference/simd/reduction-binary-operation.md)`<T>`のモデルであること
- (2), (4) : `BinaryOperation`が[`std::plus<>`](/reference/functional/plus.md)・[`std::multiplies<>`](/reference/functional/multiplies.md)・[`std::bit_and<>`](/reference/functional/bit_and.md)・[`std::bit_or<>`](/reference/functional/bit_or.md)・[`std::bit_xor<>`](/reference/functional/bit_xor.md)のいずれでもない場合、`identity_element`の実引数を指定しなければならない

## 事前条件
- (1), (2) : `binary_op`が`x`を書き換えないこと
- (2), (4) : `T`で表現可能な任意の有限値`y`について、`identity_element`を`binary_op`の単位元として作用させた結果が`y`と等しくなること

## 戻り値
- (1) : `x`の全要素`x[0], …, x[x.size() - 1]`を`binary_op`で集計した結果を返す。
- (2) : [`none_of`](none_of.md)`(mask)`が`true`なら`identity_element`を返す。そうでなければ`mask`で選択された要素を`binary_op`で集計した結果を返す。
- (3) : `x`を返す。
- (4) : `mask`が`false`なら`identity_element`を、そうでなければ`x`を返す。

## 例外
- (1), (2) : `binary_op`が送出する例外を送出する
- (3), (4) : 投げない

## 備考
- (2), (4) : `identity_element`の既定引数は、`BinaryOperation`に応じて以下の値となる。
    - [`std::plus<>`](/reference/functional/plus.md) : `T()`
    - [`std::multiplies<>`](/reference/functional/multiplies.md) : `T(1)`
    - [`std::bit_and<>`](/reference/functional/bit_and.md) : `T(~T())`
    - [`std::bit_or<>`](/reference/functional/bit_or.md) : `T()`
    - [`std::bit_xor<>`](/reference/functional/bit_xor.md) : `T()`

## 例
```cpp example
#include <simd>
#include <print>
#include <functional>

namespace simd = std::simd;

int main()
{
  simd::vec<int, 4> v([](int i) { return i + 1; }); // {1, 2, 3, 4}

  // 全要素の総和（既定の二項演算はstd::plus<>）
  std::println("{}", simd::reduce(v));

  // 全要素の積
  std::println("{}", simd::reduce(v, std::multiplies<>{}));

  // 偶数要素だけの総和
  auto mask = (v % 2 == 0);
  std::println("{}", simd::reduce(v, mask));
}
```
* simd::reduce[color ff0000]
* simd::vec[link basic_vec.md]
* std::multiplies[link /reference/functional/multiplies.md]

### 出力
```
10
24
6
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::reduce_min`](reduce_min.md)
- [`std::simd::reduce_max`](reduce_max.md)
- [`std::simd::basic_vec`](basic_vec.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で追加された
- [P3690R1 Consistency fix: Make simd reductions SIMD-generic](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3690r1.pdf)
    - スカラー[「vectorizable type」](/reference/simd.md#vectorizable-type)を受け取るオーバーロード (3), (4) が追加され、SIMD-genericなコードを書けるようになった
