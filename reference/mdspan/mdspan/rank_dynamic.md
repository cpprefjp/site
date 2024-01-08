# rank_dynamic
* mdspan[meta header]
* function[meta id-type]
* std[meta namespace]
* mdspan[meta class]
* cpp23[meta cpp]

```cpp
static constexpr rank_type rank_dynamic() noexcept;
```

## 概要
多次元配列のうち動的要素数に指定された次元数を取得する。


## 戻り値
[`extents_type::rank_dynamic()`](../extents/rank_dynamic.md)


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <mdspan>

int main()
{
  int arr[] = {1, 2, 3, 4, 5, 6};
  // 静的要素数 2x3 の2次元配列ビュー
  std::mdspan<int, std::extents<size_t, 2, 3>> mat{arr};

  static_assert(mat.rank_dynamic() == 0);
}
```
* rank_dynamic()[color ff0000]
* std::mdspan[link ../mdspan.md]
* std::extents[link ../extents.md]

### 出力
```
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`rank()`](rank.md)
- [`extents`](../extents.md)


## 参照
- [P0009R18 MDSPAN](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0009r18.html)
