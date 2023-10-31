# less_equal
* functional[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  struct less_equal {
    template<class T, class U>
      requires totally_ordered_with<T, U>
    constexpr bool operator()(T&& t, U&& u) const;

    using is_transparent = unspecified;
  };
}
```
* unspecified[italic]
* totally_ordered_with[link /reference/concepts/totally_ordered.md]

## 概要
`less_equal`クラスは、左辺が右辺以下かの比較を行う関数オブジェクトである。

この関数オブジェクトは一切のメンバ変数を持たず、状態を保持しない。

## テンプレートパラメータ制約
* `T` と `U` の間で`< <= > >=`の演算子による比較が可能であり、その順序付けが全順序の要件を満たしている。
* もしくは、 `declval<T>() < declval<U>()` がポインタ同士を比較する組み込みの演算に帰着する。

## メンバ関数

| 名前 | 説明 |
|---------------|-----------------|
| `operator ()` | `!`[`ranges::less`](ranges_less.md)`{}(std::forward<U>(u), std::forward<T>(t));` と等価 |


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
  std::cout << std::boolalpha << std::ranges::less_equal()(2, 3) << std::endl;
}
```
* std::ranges::less_equal[color ff0000]

### 出力
```
true
```

## 参照
- [N4821 20.14.8 Concept-constrained comparisons](https://timsong-cpp.github.io/cppwp/n4861/range.cmp)
