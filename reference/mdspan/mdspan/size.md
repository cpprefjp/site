# size
* mdspan[meta header]
* function[meta id-type]
* std[meta namespace]
* mdspan[meta class]
* cpp23[meta cpp]

```cpp
constexpr size_type size() const noexcept;
```

## 概要
多次元インデクス空間のサイズを取得する。


## 適格要件
多次元インデクス空間[`extents()`](extents.md)のサイズが`size_type`型で表現できること。


## 戻り値
多次元配列サイズ[`extents()`]に対して、全次元の要素数を乗算した値。


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

  static_assert(mat.size() == 6);
}
```
* size()[color ff0000]

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


## 参照
- [P0009R18 MDSPAN](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0009r18.html)
