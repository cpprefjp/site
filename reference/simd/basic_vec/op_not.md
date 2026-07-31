# operator!
* simd[meta header]
* std::simd[meta namespace]
* basic_vec[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr mask_type operator!() const noexcept;
```

## 概要
各要素を論理反転する。


## テンプレートパラメータ制約
`value_type`の値`a`に対して式`!a`が有効であること。


## 戻り値
各要素`i`（`i`は`0`から`size() - 1`まで）を`!(*this)[i]`とした[`basic_mask`](../basic_mask.md)オブジェクトを返す。


## 例外
投げない


## 例
```cpp example
#include <simd>
#include <print>

namespace simd = std::simd;

int main()
{
  simd::vec<int, 4> a = [](int i) { return i; };  // {0, 1, 2, 3}

  // 各要素を論理反転し、マスクとして得る
  simd::vec<int, 4>::mask_type m = !a;            // {true, false, false, false}

  for (int i = 0; i < m.size(); ++i) {
    std::print("{} ", m[i]);
  }
  std::println("");
}
```
* !a[color ff0000]
* simd::vec[link ../basic_vec.md]
* mask_type[link ../basic_vec.md]
* m.size()[link ../basic_mask/size.md]
* m[i][link ../basic_mask/op_at.md]

### 出力
```
true false false false 
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
