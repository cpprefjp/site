# not_equal_to
* functional[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  struct not_equal_to {
    template<class T, class U>
      requires equality_comparable_with<T, U>
    constexpr bool operator()(T&& t, U&& u) const;

    using is_transparent = unspecified;
  };
}
```
* unspecified[italic]
* equality_comparable_with[link /reference/concepts/equality_comparable.md]

## 概要
`not_equal_to`クラスは、非等値比較を行う関数オブジェクトである。

この関数オブジェクトは一切のメンバ変数を持たず、状態を保持しない。

## テンプレートパラメータ制約
* `T` と `U` が `==` および `!=` で同値比較可能、もしくは `declval<T>() == declval<U>()` がポインタ同士を比較する組み込みの演算に帰着すること。

## メンバ関数

| 名前 | 説明 |
|---------------|-----------------|
| `operator ()` | `!`[`ranges::equal_to`](ranges_equal_to.md)`{}(std::forward<T>(t), std::forward<U>(u));` と等価 |


## メンバ型

| 名前 | 説明 |
|------------------------|-------------------------------|
| `is_transparent`       | `operator()` が関数テンプレートである事を示すタグ型。<br/>実装依存の型であるがあくまでタグ型であり、型そのものには意味はない。 |


## 例

```cpp example
#include <iostream>
#include <functional>

int main()
{
  std::cout << std::boolalpha << std::ranges::not_equal_to()(3, 3) << std::endl;
}
```
* std::ranges::not_equal_to[color ff0000]

### 出力
```
false
```

## 参照
- [N4821 20.14.8 Concept-constrained comparisons](https://timsong-cpp.github.io/cppwp/n4861/range.cmp)
