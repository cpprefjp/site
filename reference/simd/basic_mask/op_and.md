# operator&
* simd[meta header]
* std::simd[meta namespace]
* basic_mask[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
friend constexpr basic_mask
  operator&(const basic_mask& lhs, const basic_mask& rhs) noexcept;
```

## 概要
2つのマスクの要素ごとのビット論理積を求める。

## 戻り値
`lhs`と`rhs`に対して要素ごとにビット論理積を適用した結果で初期化された`basic_mask`オブジェクトを返す。

## 例外
投げない。

## 備考
この関数は[*Hidden friends*](/article/lib/hidden_friends.md)として定義される。

## 例
```cpp example
#include <simd>
#include <print>

namespace simd = std::simd;

int main()
{
  simd::vec<int, 4> a = [](int i) { return i; };  // {0, 1, 2, 3}
  auto m1 = (a >= 1);                            // {false, true, true, true}
  auto m2 = (a < 3);                             // {true, true, true, false}

  auto r = m1 & m2;                              // {false, true, true, false}

  for (int i = 0; i < r.size(); ++i) {
    std::print("{} ", r[i]);
  }
  std::println("");
}
```
* m1 & m2[color ff0000]
* simd::vec[link ../basic_vec.md]
* r.size()[link size.md]
* r[i][link op_at.md]

### 出力
```
false true true false 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::basic_mask::operator|`](op_or.md)
- [`std::simd::basic_mask::operator^`](op_xor.md)
- [`std::simd::basic_mask::operator&&`](op_logical_and.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で追加された
