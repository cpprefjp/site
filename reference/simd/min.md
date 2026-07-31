# min
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<class T, class Abi>
  constexpr basic_vec<T, Abi>
    min(const basic_vec<T, Abi>& a,
        const basic_vec<T, Abi>& b) noexcept;  // C++26
}
```

## 概要
`min`は、2つの[`basic_vec`](basic_vec.md)を要素ごとに比較し、それぞれ小さいほうの値を持つ`basic_vec`を返す関数である。

## テンプレートパラメータ制約
- `T`が[`std::totally_ordered`](/reference/concepts/totally_ordered.md)のモデルであること

## 戻り値
`i`番目の要素が`min(a[i], b[i])`となる`basic_vec`。

## 例外
投げない

## 例
```cpp example
#include <simd>
#include <print>

namespace simd = std::simd;

int main()
{
  simd::vec<int, 4> a([](int i) { return i; });     // {0, 1, 2, 3}
  simd::vec<int, 4> b([](int i) { return 3 - i; }); // {3, 2, 1, 0}

  // 要素ごとの最小値
  auto r = simd::min(a, b);  // {0, 1, 1, 0}

  for (int i = 0; i < r.size(); ++i)
    std::print("{} ", r[i]);
  std::println("");
}
```
* simd::min[color ff0000]
* simd::vec[link basic_vec.md]

### 出力
```
0 1 1 0 
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
- [`std::simd::max`](max.md)
- [`std::simd::minmax`](minmax.md)
- [`std::simd::clamp`](clamp.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリが追加された
