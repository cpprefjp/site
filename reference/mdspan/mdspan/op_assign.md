# operator=
* mdspan[meta header]
* function[meta id-type]
* std[meta namespace]
* mdspan[meta class]
* cpp23[meta cpp]

```cpp
constexpr mdspan& operator=(const mdspan& rhs) = default;  // (1)
constexpr mdspan& operator=(mdspan&& rhs) = default;  // (2)
```

## 概要
- (1) : コピー代入演算子
- (2) : ムーブ代入演算子


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

  mat2 = mat1;
  assert(mat2.data_handle() == mat1.data_handle());
  assert(mat2.mapping() == mat1.mapping());
}
```
* [data_handle()](data_handle.md)
* [mapping()](mapping.md)

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
