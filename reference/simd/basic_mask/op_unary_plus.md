# operator+
* simd[meta header]
* std::simd[meta namespace]
* basic_mask[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr /*see below*/ operator+() const noexcept;
```

## 概要
各要素を[`basic_vec`](../basic_vec.md)へ変換したうえで、単項プラス演算を適用する。

## 戻り値
各要素`i`（`0`以上`size()`未満）が`+operator[](i)`で初期化された、[`basic_vec`](../basic_vec.md)のオブジェクトを返す。各要素の`bool`値は整数へ変換されたうえで単項プラス演算が適用される。

## 例外
投げない。

## 備考
戻り値型は、`sizeof(I) == Bytes`となる符号付き整数型`I`が存在する場合、要素型がそのような符号付き整数型で要素数が`size()`と等しい、有効な[`basic_vec`](../basic_vec.md)の特殊化`R`となる。そのような符号付き整数型が存在しない場合、この演算子は`delete`定義され、戻り値型は未規定である。

## 例
```cpp example
#include <simd>
#include <print>

namespace simd = std::simd;

int main()
{
  simd::vec<int, 4> a = [](int i) { return i; };  // {0, 1, 2, 3}
  simd::vec<int, 4>::mask_type m = (a < 2);        // {true, true, false, false}

  auto r = +m;                                   // {1, 1, 0, 0}

  for (int i = 0; i < r.size(); ++i) {
    std::print("{} ", r[i]);
  }
  std::println("");
}
```
* +m[color ff0000]
* simd::vec[link ../basic_vec.md]
* r.size()[link ../basic_vec/size.md]
* r[i][link ../basic_vec/op_at.md]

### 出力
```
1 1 0 0 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::basic_mask::operator-`](op_unary_minus.md)
- [`std::simd::basic_mask::operator~`](op_flip.md)
- [`std::simd::basic_mask::operator basic_vec`](op_vec.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で追加された
