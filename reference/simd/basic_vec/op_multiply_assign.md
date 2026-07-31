# operator*=
* simd[meta header]
* std::simd[meta namespace]
* basic_vec[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
friend constexpr basic_vec& operator*=(basic_vec& lhs, const basic_vec& rhs) noexcept;
```
* basic_vec[color ff0000]

## 概要
2つの[`basic_vec`](../basic_vec.md)オブジェクトを要素ごとに乗算し、その結果を左辺に代入する。

## テンプレートパラメータ制約
`value_type`型の値`a`, `b`に対して、式`a * b`が有効であること。

## 効果
`lhs`と`rhs`に対して、乗算を要素ごとの演算として適用する。

## 戻り値
`lhs`

## 例外
投げない

## 例
```cpp example
#include <simd>
#include <print>

namespace simd = std::simd;

int main()
{
  simd::vec<int, 4> a = [](int i) { return i + 1; };  // {1, 2, 3, 4}
  simd::vec<int, 4> b = 10;                           // {10, 10, 10, 10}

  a *= b;

  for (int i = 0; i < a.size(); ++i) {
    std::print("{} ", a[i]);
  }
  std::println("");
}
```
* a *= b[color ff0000]
* a.size()[link size.md]

### 出力
```
10 20 30 40 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::basic_vec::operator*`](op_multiply.md)
- [`std::simd::basic_vec`](../basic_vec.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で追加された
