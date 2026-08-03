# operator!
* simd[meta header]
* std::simd[meta namespace]
* basic_mask[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr basic_mask operator!() const noexcept;
```

## 概要
各要素の論理値を反転する。

## 戻り値
各要素`i`（`0`以上`size()`未満）が`!operator[](i)`で初期化された`basic_mask`オブジェクトを返す。

## 例外
投げない。

## 例
```cpp example
#include <simd>
#include <print>

namespace simd = std::simd;

int main()
{
  simd::vec<int, 4> a = [](int i) { return i; };  // {0, 1, 2, 3}
  simd::vec<int, 4>::mask_type m = (a < 2);        // {true, true, false, false}

  auto r = !m;                                   // {false, false, true, true}

  for (int i = 0; i < r.size(); ++i) {
    std::print("{} ", r[i]);
  }
  std::println("");
}
```
* !m[color ff0000]
* simd::vec[link ../basic_vec.md]
* r.size()[link size.md]
* r[i][link op_at.md]

### 出力
```
false false true true 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::basic_mask::operator&&`](op_logical_and.md)
- [`std::simd::basic_mask::operator||`](op_logical_or.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で追加された
