# imag
* simd[meta header]
* std::simd[meta namespace]
* basic_vec[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr real-type imag() const noexcept;        // (1) C++26

constexpr void imag(const real-type& v) noexcept; // (2) C++26
```
* real-type[link real-type.md]

## 概要
複素数要素型の虚部を取得／設定する。

- (1) : 各要素の虚部を集めたデータ並列型を取得する。
- (2) : 各要素の虚部を`v`の対応する要素で置き換える。

[`real-type`](real-type.md)は、要素型`T`が[`std::complex`](/reference/complex/complex.md)`<U>`のとき、要素型を`U`に置き換えた`basic_vec`である。


## テンプレートパラメータ制約
- (1), (2) : `basic_vec`が複素数のデータ並列型（`simd-complex`）であること。


## 効果
- (2) : すべての`i`（`0`以上`size()`未満）について、第`i`要素を`value_type((*this)[i].real(), v[i])`で置き換える。


## 戻り値
- (1) : 第`i`要素を`(*this)[i].imag()`とするデータ並列型。


## 例外
投げない


## 例
```cpp example
#include <simd>
#include <complex>
#include <print>

namespace simd = std::simd;

template <class V>
void print(const char* name, const V& v)
{
  std::print("{}: ", name);
  for (int i = 0; i < v.size(); ++i) {
    std::print("{} ", v[i]);
  }
  std::println("");
}

int main()
{
  simd::vec<float, 4> reals([](int i) { return float(i + 1); });        // {1, 2, 3, 4}
  simd::vec<float, 4> imags([](int i) { return float((i + 1) * 10); }); // {10, 20, 30, 40}

  // 実部と虚部からcomplexのデータ並列型を構築する
  simd::vec<std::complex<float>, 4> v{reals, imags};

  // 虚部を取得する
  ::print("imag", v.imag());

  // 虚部を設定する
  v.imag(simd::vec<float, 4>(0.0f));
  ::print("real", v.real());
  ::print("imag", v.imag());
}
```
* v.imag()[color ff0000]
* v.real()[link real.md]

### 出力
```
imag: 10 20 30 40 
real: 1 2 3 4 
imag: 0 0 0 0 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::basic_vec::real`](real.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`が追加された
- [P2876R3 Proposal to extend `std::simd` with more constructors and accessors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2876r3.html)
    - 複素数要素の実部・虚部にアクセスするアクセサが追加された
