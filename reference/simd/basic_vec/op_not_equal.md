# operator!=
* simd[meta header]
* std::simd[meta namespace]
* basic_vec[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
friend constexpr mask_type operator!=(const basic_vec& lhs,
                                      const basic_vec& rhs) noexcept;
```
* operator!=[color ff0000]
* mask_type[link ../basic_mask.md]

## 概要
2つの[`basic_vec`](../basic_vec.md)を要素ごとに非等値比較する。

比較結果は`bool`ではなく、要素ごとの比較結果を保持するマスク型`mask_type`（[`basic_mask`](../basic_mask.md)）として返される。

## テンプレートパラメータ制約
式`a != b`（`a`と`b`は`value_type`型の値）が有効であること。

## 戻り値
`lhs`と`rhs`の対応する要素それぞれに`!=`を適用した結果で初期化された`mask_type`オブジェクトを返す。すなわち、戻り値のマスクの`i`番目の要素は`lhs[i] != rhs[i]`となる。

## 備考
*Hidden friends*として定義されるため、引数依存の名前探索 (ADL) でのみ発見される。

## 例
```cpp example
#include <simd>
#include <print>

namespace simd = std::simd;

int main()
{
  simd::vec<int, 4> a = [](int i) { return i; };  // {0, 1, 2, 3}
  simd::vec<int, 4> b = 2;                        // {2, 2, 2, 2}

  // 要素ごとの非等値比較。結果はマスクとして得られる
  simd::vec<int, 4>::mask_type m = (a != b);      // {true, true, false, true}

  for (int i = 0; i < m.size(); ++i) {
    std::print("{} ", m[i]);
  }
  std::println("");
}
```
* simd::vec[link ../basic_vec.md]
* m.size()[link ../basic_mask/size.md]
* m[i][link ../basic_mask/op_at.md]

### 出力
```
true true false true 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::basic_vec`](../basic_vec.md)
- [`std::simd::basic_mask`](../basic_mask.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で追加された
