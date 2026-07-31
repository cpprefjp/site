# basic_mask
* simd[meta header]
* std::simd[meta namespace]
* class template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<std::size_t Bytes, class Abi>
  class basic_mask;

  template<simd-size-type N, class T = /*see below*/>
  using mask = basic_mask</*see below*/>;
}
```
* simd-size-type[link /reference/simd/simd-size-type.md]

## 概要
`basic_mask`は、[`basic_vec`](basic_vec.md)の各要素に対応する真偽値（`bool`）をまとめて保持するデータ並列型である。比較演算子の結果や、要素ごとの条件選択（`select`）などで用いられる。

`basic_mask<Bytes, Abi>`は、`Bytes`が対応する要素型のサイズ、`Abi`がABIタグを表す。要素数は対応する[`basic_vec`](basic_vec.md)と一致する。通常は、対応する`basic_vec`の`mask_type`メンバや、要素数を指定する別名`mask`を通じて利用する。

- `Bytes`: 対応する要素型のバイトサイズ。ある[「vectorizable type」](/reference/simd.md#vectorizable-type)`T`について`sizeof(T)`と等しくなければならない
- `Abi`: 要素数と内部表現を決定するABIタグ型

### 有効な特殊化・無効な特殊化
`basic_mask<Bytes, Abi>`の各特殊化は、対応する有効な[`basic_vec`](basic_vec.md)が存在するとき「有効」（enabled）となる。有効な`basic_mask`は[トリビアルコピー可能](/reference/type_traits/is_trivially_copyable.md)である。無効な特殊化は、デフォルトコンストラクタ・デストラクタ・コピーコンストラクタ・コピー代入演算子がすべて`delete`定義され、メンバとしては`value_type`・`abi_type`のみを持つ。


## メンバ関数
### 構築／代入

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](basic_mask/op_constructor.md) | コンストラクタ | C++26 |
| `(destructor)` | デストラクタ（トリビアル） | C++26 |

### イテレータ

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`begin`](basic_mask/begin.md)   | 先頭要素を指すイテレータを取得する | C++26 |
| [`end`](basic_mask/end.md)       | 番兵を取得する | C++26 |
| [`cbegin`](basic_mask/cbegin.md) | 先頭要素を指す読み取り専用イテレータを取得する | C++26 |
| [`cend`](basic_mask/cend.md)     | 番兵を取得する | C++26 |

### 要素アクセス

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator[]`](basic_mask/op_at.md) | 要素または要素の並べ替えを取得する | C++26 |

### 単項演算子

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator!`](basic_mask/op_not.md)        | 論理反転 | C++26 |
| [`operator+`](basic_mask/op_unary_plus.md)  | 単項プラス（[`basic_vec`](basic_vec.md)へ変換） | C++26 |
| [`operator-`](basic_mask/op_unary_minus.md) | 単項マイナス（[`basic_vec`](basic_vec.md)へ変換） | C++26 |
| [`operator~`](basic_mask/op_flip.md)        | ビット反転（[`basic_vec`](basic_vec.md)へ変換） | C++26 |

### 変換

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator basic_vec`](basic_mask/op_vec.md) | [`basic_vec`](basic_vec.md)への変換 | C++26 |
| [`to_bitset`](basic_mask/to_bitset.md)       | [`std::bitset`](/reference/bitset/bitset.md)へ変換する | C++26 |
| [`to_ullong`](basic_mask/to_ullong.md)       | `unsigned long long`へ変換する | C++26 |

## 静的メンバ変数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`size`](basic_mask/size.md) | 要素数を表す[`std::integral_constant`](/reference/type_traits/integral_constant.md) | C++26 |

## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `value_type`     | `bool` | C++26 |
| `abi_type`       | ABIタグ型`Abi` | C++26 |
| `iterator`       | イテレータ型（説明専用） | C++26 |
| `const_iterator` | 読み取り専用イテレータ型（説明専用） | C++26 |

## 非メンバ（*Hidden friends*）関数
### 二項論理・ビット演算子

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator&&`](basic_mask/op_logical_and.md) | 論理積 | C++26 |
| <code>[operator&#x7C;&#x7C;](basic_mask/op_logical_or.md)</code> | 論理和 | C++26 |
| [`operator&`](basic_mask/op_and.md)           | ビット論理積 | C++26 |
| <code>[operator&#x7C;](basic_mask/op_or.md)</code>           | ビット論理和 | C++26 |
| [`operator^`](basic_mask/op_xor.md)           | ビット排他的論理和 | C++26 |

### 複合代入演算子

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator&=`](basic_mask/op_and_assign.md) | ビット論理積の複合代入 | C++26 |
| <code>[operator&#x7C;=](basic_mask/op_or_assign.md)</code> | ビット論理和の複合代入 | C++26 |
| [`operator^=`](basic_mask/op_xor_assign.md) | ビット排他的論理和の複合代入 | C++26 |

### 比較演算子

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator==`](basic_mask/op_equal.md)         | 等値比較 | C++26 |
| [`operator!=`](basic_mask/op_not_equal.md)     | 非等値比較 | C++26 |
| [`operator>=`](basic_mask/op_greater_equal.md) | 以上を判定する | C++26 |
| [`operator<=`](basic_mask/op_less_equal.md)    | 以下を判定する | C++26 |
| [`operator>`](basic_mask/op_greater.md)        | より大きいかを判定する | C++26 |
| [`operator<`](basic_mask/op_less.md)           | より小さいかを判定する | C++26 |


## 例
```cpp example
#include <simd>
#include <print>

namespace simd = std::simd;

int main()
{
  simd::vec<int, 4> a([](int i) { return i; });  // {0, 1, 2, 3}

  // 比較演算子の結果はマスクとして得られる
  simd::vec<int, 4>::mask_type m = (a < 2);       // {true, true, false, false}

  for (int i = 0; i < m.size(); ++i) {
    std::print("{} ", m[i]);
  }
  std::println("");
}
```
* simd::vec[link basic_vec.md]
* m.size()[link basic_mask/size.md]
* m[i][link basic_mask/op_at.md]

### 出力
```
true true false false 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::basic_vec`](basic_vec.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリが追加された
- [P3691R1 Reconsider naming of the namespace for "std::simd"](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3691r1.pdf)
    - マスク型を`basic_mask`/`mask`に改名した
- [P3922R1 Missing deduction guide from `simd::mask` to `simd::vec`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3922r1.pdf)
    - `basic_mask`から`basic_vec`への推論補助が追加された
