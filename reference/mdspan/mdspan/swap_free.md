# swap (非メンバ関数)
* mdspan[meta header]
* function[meta id-type]
* std[meta namespace]
* mdspan[meta class]
* cpp23[meta cpp]

```cpp
friend constexpr void swap(mdspan& x, mdspan& y) noexcept;
```

## 概要
2つの`mdspan`オブジェクトを入れ替える。


## 効果
説明専用のメンバ変数`ptr_`, `map_`, `acc_`に対して、以下と等価

```cpp
swap(x.ptr_, y.ptr_);
swap(x.map_, y.map_);
swap(x.acc_, y.acc_);
```


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <mdspan>

using Matrix = std::mdspan<double, std::dextents<size_t, 2>>;

int main()
{
  double arr1[] = {1, 2, 3, 4, 5, 6};
  double arr2[] = {4, 3, 2, 1};
  Matrix mat1{arr1, 2, 3};
  Matrix mat2{arr2, 1, 4};

  swap(mat1, mat2);
  assert(mat1.data_handle() == arr2);
  assert(mat1.size() == 4);
  assert(mat2.data_handle() == arr1);
  assert(mat2.size() == 6);
}
```
* swap[color ff0000]
* data_handle()[link data_handle.md]
* size()[link size.md]

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
