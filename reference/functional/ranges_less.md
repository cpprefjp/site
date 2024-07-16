# less
* functional[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  struct less {
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
`less`クラスは、左辺が右辺より小さいかの比較を行う関数オブジェクトである。

この関数オブジェクトは一切のメンバ変数を持たず、状態を保持しない。

## テンプレートパラメータ制約
* `T` と `U` の間で`< <= > >=`の演算子による比較が可能であり、その順序付けが全順序の要件を満たしている。
* もしくは、 `declval<T>() < declval<U>()` がポインタ同士を比較する組み込みの演算に帰着する。

## 事前条件
`declval<T>() < declval<U>()` がポインタ同士を比較する組み込みの演算に帰着する場合、`T`および`U`からポインタへの変換は等しさを保持すること(equality-preserving)。

## メンバ関数

| 名前 | 説明 |
|---------------|-----------------|
| `operator ()` | `<` と等価 |


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
  std::cout << std::boolalpha << std::ranges::less()(2, 3) << std::endl;
}
```
* std::ranges::less[color ff0000]

### 出力
```
true
```

## 参照
- [N4821 20.14.8 Concept-constrained comparisons](https://timsong-cpp.github.io/cppwp/n4861/range.cmp)
