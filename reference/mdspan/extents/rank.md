# rank
* mdspan[meta header]
* function[meta id-type]
* std[meta namespace]
* extents[meta class]
* cpp23[meta cpp]

```cpp
static constexpr rank_type rank() noexcept;
```

## 概要
多次元配列サイズの次元数を取得する。


## 戻り値
`sizeof...(Extents)`


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
* rank()[color ff0000]
* rank_dynamic()[link rank_dynamic.md]


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
- [`rank_dynamic`](rank_dynamic.md)


## 参照
- [P0009R18 MDSPAN](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0009r18.html)
