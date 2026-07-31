# operator|=
* simd[meta header]
* std::simd[meta namespace]
* basic_mask[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
friend constexpr basic_mask& operator|=(basic_mask& lhs,
                                        const basic_mask& rhs) noexcept;
```

## 概要
2つの[`basic_mask`](../basic_mask.md)を要素ごとにビット論理和し、その結果を左辺に代入する。

## 効果
`lhs`と`rhs`の対応する要素それぞれに`|`を適用した結果を、`lhs`の各要素に代入する。

## 戻り値
`lhs`。

## 備考
*Hidden friends*として定義されるため、引数依存の名前探索 (ADL) でのみ発見される。

## 例
```cpp example
#include <simd>
#include <print>

namespace simd = std::simd;

int main()
{
  simd::vec<int, 4>::mask_type a = [](int i) { return i < 2; };  // {true, true, false, false}
  simd::vec<int, 4>::mask_type b = [](int i) { return i % 2 == 0; };  // {true, false, true, false}

  a |= b;  // {true, true, true, false}

  for (int i = 0; i < a.size(); ++i) {
    std::print("{} ", a[i]);
  }
  std::println("");
}
```
* simd::vec[link ../basic_vec.md]
* a.size()[link size.md]
* a[i][link op_at.md]

### 出力
```
true true true false 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::basic_mask`](../basic_mask.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で追加された
