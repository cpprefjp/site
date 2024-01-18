# is_exhaustive
* mdspan[meta header]
* function[meta id-type]
* std[meta namespace]
* layout_stride::mapping[meta class]
* cpp23[meta cpp]

```cpp
constexpr bool is_exhaustive() const noexcept;
```

## 概要
レイアウトマッピングの[Exhaustive特性](../../LayoutMapping.md)を取得する。


## 戻り値
多次元インデクスの次元数を`rank_`としたとき

- `rank_ == 0`のとき、`true`を返す。
- そうでなければ、取りうる全ての多次元インデクス値に対応する要素位置を考えたとき、アクセスされうる要素位置に隙間が生じないならば`true`を返す。
- そうでなければ、`false`を返す。


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <mdspan>

int main()
{
  using Ext2x3 = std::extents<size_t, 2, 3>;
  using Mapping = std::layout_stride::mapping<Ext2x3>;

  Mapping map1{{}, std::array{3, 1}};
  assert(map1.is_exhaustive());

  Mapping map2{{}, std::array{4, 1}};
  assert(not map2.is_exhaustive());
}
```
* is_exhaustive()[color ff0000]
* std::extents[link ../../extents.md]
* std::layout_stride::mapping[link ../mapping.md]

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


## 参照
- [P0009R18 MDSPAN](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0009r18.html)
