# empty
* mdspan[meta header]
* function[meta id-type]
* std[meta namespace]
* mdspan[meta class]
* cpp23[meta cpp]

```cpp
[[nodiscard]] constexpr bool empty() const noexcept;
```

## 概要
多次元インデクス空間がサイズ0か否かを取得する。


## 戻り値
多次元インデクス空間[`extents()`](extents.md)のサイズが0ならば`true`を返す。そうでなければ`false`を返す。


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <mdspan>

using Matrix = std::mdspan<double, std::dextents<size_t, 2>>;

int main()
{
  double arr[] = {1, 2, 3, 4, 5, 6};

  Matrix mat0{arr, 0, 0};
  assert(mat0.empty());

  Matrix mat1{arr, 2, 3};
  assert(not mat1.empty());
}
```
* empty()[color ff0000]

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
- [`extents`](../extents.md)
- [`size()`](size.md)


## 参照
- [P0009R18 MDSPAN](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0009r18.html)
