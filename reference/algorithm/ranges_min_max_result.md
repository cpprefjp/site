# min_max_result
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  // (1)
  template<class T>
  struct min_max_result {
    [[no_unique_address]] T min;
    [[no_unique_address]] T max;

    template<class T2>
      requires convertible_to<const T&, T2>
    constexpr operator min_max_result<T2>() const & {
      return {min, max};
    }

    template<class T2>
      requires convertible_to<T, T2>
    constexpr operator min_max_result<T2>() && {
      return {std::move(min), std::move(max)};
    }
  };

  // (2)
  template<class T>
  using minmax_result = min_max_result<T>;

  // (3)
  template<class I>
  using minmax_element_result = min_max_result<I>;
}
```
* no_unique_address[link /lang/cpp20/language_support_for_empty_objects.md]
* convertible_to[link /reference/concepts/convertible_to.md]
* std::move[link /reference/utility/move.md]

## 概要
* (1): 最小値と最大値、またはそれらのイテレータを格納する型
* (2): [`ranges::minmax`](ranges_minmax.md)で使用するエイリアス
* (3): [`ranges::minmax_element`](ranges_minmax_element.md)で使用するエイリアス

この型は、関数が最小値と最大値またはそれらのイテレータを返す場合に使用される。

標準アルゴリズム関数ではこの型を直接返す代わりに、関数毎にエイリアスを定義している。


## メンバ変数

| 名前                          | 説明                                 | 対応バージョン |
|-------------------------------|--------------------------------------|----------------|
| `[[no_unique_address]] T min` | 最小値、または最小値を表すイテレータ | C++20          |
| `[[no_unique_address]] T max` | 最大値、または最大値を表すイテレータ | C++20          |


## メンバ関数

| 名前                          | 説明           | 対応バージョン |
|-------------------------------|----------------|----------------|
| `operator min_max_result<T2>` | 変換演算子     | C++20          |

変換演算子は、各テンプレートパラメーターが変換できる場合のみオーバーロード解決に参加する。

## 例
```cpp example
#include <cassert>
#include <algorithm>

int main()
{
  const std::ranges::min_max_result result = std::ranges::minmax({1, 2, 3});
  assert(result.min == 1 && result.max == 3);
}
```
* std::ranges::min_max_result[color ff0000]
* std::ranges::minmax[link ranges_minmax.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 参照
- [N4861 25 Algorithms library](https://timsong-cpp.github.io/cppwp/n4861/algorithms)
