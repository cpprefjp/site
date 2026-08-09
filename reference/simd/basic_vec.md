# basic_vec
* simd[meta header]
* std::simd[meta namespace]
* class template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<class T, class Abi = native-abi<T>>
  class basic_vec;

  template<class T, simd-size-type N = simd-size-v<T, native-abi<T>>>
  using vec = basic_vec<T, deduce-abi-t<T, N>>;
}
```
* simd-size-type[link /reference/simd/simd-size-type.md]
* simd-size-v[link /reference/simd/simd-size-v.md]
* native-abi[link /reference/simd/native-abi.md]
* deduce-abi-t[link /reference/simd/deduce-abi-t.md]

## 概要
`basic_vec`は、複数の値をまとめて保持し、それらに対する演算を一度に（データ並列に）適用するためのクラスである。SIMD（Single Instruction Stream, Multiple Data Stream）命令やSIMDレジスタといった、データ並列実行資源による高速化を活用することを意図している。

`basic_vec<T, Abi>`は、要素型`T`（[「vectorizable type」](/reference/simd.md#vectorizable-type)）の値を「width」（要素数）個だけ保持する。要素は`0`から`width - 1`まで添字付けされる。算術演算・比較演算などの各操作は、対応する要素同士に対して要素ごと（element-wise）に、互いに順序付けなく適用される。

通常は、要素数を明示的に指定できる別名`vec<T, N>`、または処理系が推奨する既定の要素数を用いる`basic_vec<T>`を使用する。

- `T`: 要素型。[「vectorizable type」](/reference/simd.md#vectorizable-type)でなければならない
- `Abi`: 要素数と内部表現を決定するABIタグ型。既定では処理系ネイティブのABIタグが選択される

`vec<T, N>`は、要素数を`N`に指定した`basic_vec`の別名である。

### 有効な特殊化・無効な特殊化
`basic_vec<T, Abi>`の各特殊化は、「有効」（enabled）か「無効」（disabled）のいずれかである。`T`が[「vectorizable type」](/reference/simd.md#vectorizable-type)であり、`Abi`が`1`以上`64`以下の要素数に対応するABIタグを表すとき、その特殊化は有効となる。有効な`basic_vec`は[トリビアルコピー可能](/reference/type_traits/is_trivially_copyable.md)である。

無効な特殊化は、デフォルトコンストラクタ・デストラクタ・コピーコンストラクタ・コピー代入演算子がすべて`delete`定義され、メンバとしては`value_type`・`abi_type`・`mask_type`のみを持つ。


## メンバ関数
### 構築／代入

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](basic_vec/op_constructor.md) | コンストラクタ | C++26 |
| `(destructor)` | デストラクタ（トリビアル） | C++26 |

### イテレータ

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`begin`](basic_vec/begin.md)   | 先頭要素を指すイテレータを取得する | C++26 |
| [`end`](basic_vec/end.md)       | 番兵を取得する | C++26 |
| [`cbegin`](basic_vec/cbegin.md) | 先頭要素を指す読み取り専用イテレータを取得する | C++26 |
| [`cend`](basic_vec/cend.md)     | 番兵を取得する | C++26 |

### 要素アクセス

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator[]`](basic_vec/op_at.md) | 要素または要素の並べ替えを取得する | C++26 |
| [`real`](basic_vec/real.md)        | 複素数要素の実部を取得／設定する | C++26 |
| [`imag`](basic_vec/imag.md)        | 複素数要素の虚部を取得／設定する | C++26 |

### 単項演算子

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator++`](basic_vec/op_increment.md) | インクリメント | C++26 |
| [`operator--`](basic_vec/op_decrement.md) | デクリメント | C++26 |
| [`operator!`](basic_vec/op_not.md)        | 論理反転 | C++26 |
| [`operator~`](basic_vec/op_flip.md)       | ビット反転 | C++26 |
| [`operator+`](basic_vec/op_unary_plus.md)  | 単項プラス | C++26 |
| [`operator-`](basic_vec/op_unary_minus.md) | 単項マイナス（符号反転） | C++26 |

## 静的メンバ変数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`size`](basic_vec/size.md) | 要素数（「width」）を表す[`std::integral_constant`](/reference/type_traits/integral_constant.md) | C++26 |

## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `value_type`     | 要素型`T` | C++26 |
| `mask_type`      | 対応するマスク型 [`basic_mask`](basic_mask.md)`<sizeof(T), Abi>` | C++26 |
| `abi_type`       | ABIタグ型`Abi` | C++26 |
| [`real-type`](basic_vec/real-type.md) | 複素数要素のとき、実数型を要素とする`basic_vec`（説明専用） | C++26 |
| `iterator`       | イテレータ型（説明専用） | C++26 |
| `const_iterator` | 読み取り専用イテレータ型（説明専用） | C++26 |

## 非メンバ（*Hidden friends*）関数
### 二項算術・ビット演算子

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator+`](basic_vec/op_plus.md)         | 加算 | C++26 |
| [`operator-`](basic_vec/op_minus.md)        | 減算 | C++26 |
| [`operator*`](basic_vec/op_multiply.md)     | 乗算 | C++26 |
| [`operator/`](basic_vec/op_divide.md)       | 除算 | C++26 |
| [`operator%`](basic_vec/op_modulo.md)       | 剰余 | C++26 |
| [`operator&`](basic_vec/op_and.md)          | ビット論理積 | C++26 |
| <code>[operator&#x7C;](basic_vec/op_or.md)</code>          | ビット論理和 | C++26 |
| [`operator^`](basic_vec/op_xor.md)          | ビット排他的論理和 | C++26 |
| [`operator<<`](basic_vec/op_left_shift.md)  | 左ビットシフト | C++26 |
| [`operator>>`](basic_vec/op_right_shift.md) | 右ビットシフト | C++26 |

### 複合代入演算子

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator+=`](basic_vec/op_plus_assign.md)         | 加算の複合代入 | C++26 |
| [`operator-=`](basic_vec/op_minus_assign.md)        | 減算の複合代入 | C++26 |
| [`operator*=`](basic_vec/op_multiply_assign.md)     | 乗算の複合代入 | C++26 |
| [`operator/=`](basic_vec/op_divide_assign.md)       | 除算の複合代入 | C++26 |
| [`operator%=`](basic_vec/op_modulo_assign.md)       | 剰余の複合代入 | C++26 |
| [`operator&=`](basic_vec/op_and_assign.md)          | ビット論理積の複合代入 | C++26 |
| <code>[operator&#x7C;=](basic_vec/op_or_assign.md)</code>          | ビット論理和の複合代入 | C++26 |
| [`operator^=`](basic_vec/op_xor_assign.md)          | ビット排他的論理和の複合代入 | C++26 |
| [`operator<<=`](basic_vec/op_left_shift_assign.md)  | 左ビットシフトの複合代入 | C++26 |
| [`operator>>=`](basic_vec/op_right_shift_assign.md) | 右ビットシフトの複合代入 | C++26 |

### 比較演算子

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator==`](basic_vec/op_equal.md)         | 等値比較（結果は[`basic_mask`](basic_mask.md)） | C++26 |
| [`operator!=`](basic_vec/op_not_equal.md)     | 非等値比較 | C++26 |
| [`operator>=`](basic_vec/op_greater_equal.md) | 以上を判定する | C++26 |
| [`operator<=`](basic_vec/op_less_equal.md)    | 以下を判定する | C++26 |
| [`operator>`](basic_vec/op_greater.md)        | より大きいかを判定する | C++26 |
| [`operator<`](basic_vec/op_less.md)           | より小さいかを判定する | C++26 |

## 推論補助

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(deduction_guide)`](basic_vec/op_deduction_guide.md) | クラステンプレートの推論補助 | C++26 |


## 例
```cpp example
#include <simd>
#include <print>

namespace simd = std::simd;

int main()
{
  // 4要素のintデータ並列型
  simd::vec<int, 4> a([](int i) { return i + 1; });  // {1, 2, 3, 4}
  simd::vec<int, 4> b = 10;                          // {10, 10, 10, 10}

  // 要素ごとの加算
  simd::vec<int, 4> c = a + b;

  for (int i = 0; i < c.size(); ++i) {
    std::print("{} ", c[i]);
  }
  std::println("");
}
```
* simd::vec[color ff0000]
* c.size()[link basic_vec/size.md]

### 出力
```
11 12 13 14 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::basic_mask`](basic_mask.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリが追加された
- [P3287R3 Exploration of namespaces for `std::simd`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3287r3.pdf)
    - `std::simd`名前空間に配置することが検討された
- [P3691R1 Reconsider naming of the namespace for "std::simd"](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3691r1.pdf)
    - 名前空間を`std::simd`とし、主要クラスを`basic_vec`/`vec`に改名した
- [P2876R3 Proposal to extend `std::simd` with more constructors and accessors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2876r3.html)
    - コンストラクタとアクセサが追加された
- [P3480R6 `std::simd` is a range](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3480r6.pdf)
    - イテレータを追加し、Rangeとして扱えるようになった
- [P3430R3 SIMD issues: explicit, unsequenced, identity-element position, and members of disabled SIMD](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3430r3.pdf)
    - 無効な特殊化が持つメンバが`value_type`・`abi_type`・`mask_type`のみであることが規定された
- [P3932R0 Fix LWG4470: Fix integer-from in simd](https://open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3932r0.pdf)
    - ABIタグ推論 (`deduce-abi-t`) と特殊化の有効・無効判定まわりの説明用規定が修正された
