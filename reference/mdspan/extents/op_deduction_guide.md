# 推論補助
* mdspan[meta header]
* std[meta namespace]
* extents[meta class]
* cpp23[meta cpp]

```cpp
namespace std {
  template<class... Integrals>
  explicit extents(Integrals...) -> see below;
}
```
* see below[italic]

## 概要
`std::extents`クラステンプレートの型推論補助。多次元配列の動的要素数リストから[`std::dextents`](../extents.md)`<size_t, sizeof...(Integrals)>`型を推論する。


## テンプレートパラメータ制約
[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<Integrals, size_t> && ...)`が`true`であること。


## 例
```cpp example
#include <concepts>
#include <mdspan>

int main()
{
  // 動的要素数 3x3 の2次元配列サイズ
  std::extents ext3x3{3, 3};
  static_assert(std::same_as<decltype(ext3x3), std::dextents<size_t, 2>>);
}
```
* std::extents[link ../extents.md]
* std::dextents[link ../extents.md]

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
