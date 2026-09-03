# at
* ranges[meta header]
* std::ranges[meta namespace]
* view_interface[meta class]
* function template[meta id-type]
* cpp29[meta cpp]

```cpp
template<random_access_range R = D>
  requires sized_range<R>
constexpr decltype(auto) at(range_difference_t<R> n);       // (1) C++29

template<random_access_range R = const D>
  requires sized_range<R>
constexpr decltype(auto) at(range_difference_t<R> n) const; // (2) C++29
```
* random_access_range[link ../random_access_range.md]
* sized_range[link ../sized_range.md]
* range_difference_t[link ../range_difference_t.md]

## 概要
範囲チェックをともなって、Rangeの要素にアクセスする。

範囲チェックがない[`operator[]`](op_at.md)と異なり、範囲外のインデックスを指定した場合は例外を送出する。


## テンプレートパラメータ制約
[`view_interface`](../view_interface.md)`<D>`に対して、

- (1) : `D`が[`random_access_range`](../random_access_range.md)かつ[`sized_range`](../sized_range.md)であること
- (2) : `const D`が[`random_access_range`](../random_access_range.md)かつ[`sized_range`](../sized_range.md)であること


## 戻り値
(1), (2)ともに`(*this)[n]`


## 例外
`n < 0`もしくは`n >=` [`ranges::distance`](/reference/iterator/ranges_distance.md)`(`[`derived`](derived.md)`())`である場合、[`std::out_of_range`](/reference/stdexcept.md)を送出する。


## 備考
- この関数は、例外を送出しうるため、フリースタンディング処理系では削除される（フリースタンディング処理系では使用できない）


## 例
```cpp example
#include <iostream>
#include <ranges>
#include <stdexcept>
#include <vector>

int main()
{
  std::vector<int> v = {1, 2, 3};
  auto sub = std::ranges::subrange{v.begin(), v.end()};

  std::cout << sub.at(1) << std::endl;

  // 範囲外のインデックスを指定すると例外が送出される
  try {
    sub.at(3);
  }
  catch (const std::out_of_range&) {
    std::cout << "out_of_range" << std::endl;
  }
}
```
* at[color ff0000]
* std::ranges::subrange[link ../subrange.md]

### 出力
```
2
out_of_range
```


## バージョン
### 言語
- C++29

### 処理系
- [Clang](/implementation.md#clang): 24 [mark verified]
- [GCC](/implementation.md#gcc): 17 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 6 [mark noimpl]


## 関連項目
- [`operator[]`](op_at.md)
- [`front`](front.md)
- [`back`](back.md)
- [`std::span::at`](/reference/span/span/at.md)


## 参照
- [P3052R2 `view_interface::at()`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3052r2.html)
    - C++29で、このメンバ関数が追加された。[`std::span`](/reference/span/span.md)や[`std::basic_string_view`](/reference/string_view/basic_string_view.md)が`at()`を持つのに対し、`<ranges>`のビューには範囲チェック付きの要素アクセスがなかったため
