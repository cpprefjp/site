# rank_dynamic
* mdspan[meta header]
* function[meta id-type]
* std[meta namespace]
* extents[meta class]
* cpp23[meta cpp]

```cpp
static constexpr rank_type rank_dynamic() noexcept;
```

## 概要
多次元配列サイズの次元数うち、動的要素数に指定された次元数を取得する。


## 戻り値
動的要素数に指定された次元数


## 例外
投げない


## 例
```cpp example
#include <mdspan>

int main()
{
  using Ext3x4 = std::extents<size_t, 3, 4>;
  static_assert(Ext3x4::rank() == 2);
  static_assert(Ext3x4::rank_dynamic() == 0);

  using Ext3xN = std::extents<size_t, 3, std::dynamic_extent>;
  static_assert(Ext3xN::rank() == 2);
  static_assert(Ext3xN::rank_dynamic() == 1);
}
```
* rank_dynamic()[color ff0000]
* rank()[link rank.md]
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
- [`rank`](rank.md)


## 参照
- [P0009R18 MDSPAN](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0009r18.html)
