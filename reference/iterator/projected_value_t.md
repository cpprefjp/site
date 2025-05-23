# projected_value_t
* iterator[meta header]
* std[meta namespace]
* type-alias[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template <indirectly_­readable I,
            indirectly_­regular_­unary_­invocable<I> Proj>
  using projected_value_t = remove_cvref_t<invoke_result_t<Proj&, iter_value_t<I>&>>;
}
```
* indirectly_readable[link /reference/iterator/indirectly_readable.md]
* indirectly_­regular_­unary_­invocable[link /reference/iterator/indirectly_­regular_­unary_­invocable.md.nolink]

## 概要
イテレータ型`I`が指す値型を取得する。

この型は、間接参照可能な型`I`に任意の射影操作`Proj`を適用した結果となる値型を返す。


## 例
```cpp example
#include <concepts>
#include <iterator>
#include <functional>
#include <vector>

int main() {  
  using vec_iterator = std::vector<int>::iterator;
  using pointer = double*;

  static_assert(std::same_as<
    std::projected_value_t<vec_iterator, std::identity>,
    int
  >);

  static_assert(std::same_as<
    std::projected_value_t<pointer, std::identity>,
    double
  >);
}
```
* std::projected_value_t[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 21 [mark verified]
- [GCC](/implementation.md#gcc): 15.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 13 [mark noimpl]


## 関連項目
- [`std::projected`](projected.md)
- [`std::ranges::find()`](/reference/algorithm/ranges_find.md)
- [`std::ranges::find_last()`](/reference/algorithm/ranges_find_last.md)
- [`std::ranges::count()`](/reference/algorithm/ranges_count.md)
- [`std::ranges::search_n()`](/reference/algorithm/ranges_search_n.md)
- [`std::ranges::replace()`](/reference/algorithm/ranges_replace.md)
- [`std::ranges::replace_if()`](/reference/algorithm/ranges_replace_if.md)
- [`std::ranges::replace_copy()`](/reference/algorithm/replace_copy.md)
- [`std::ranges::remove()`](/reference/algorithm/ranges_remove.md)
- [`std::ranges::remove_copy()`](/reference/algorithm/ranges_remove_copy.md)
- [`std::ranges::lower_bound()`](/reference/algorithm/ranges_lower_bound.md)
- [`std::ranges::upper_bound()`](/reference/algorithm/ranges_upper_bound.md)
- [`std::ranges::equal_range()`](/reference/algorithm/ranges_equal_range.md)
- [`std::ranges::binary_search()`](/reference/algorithm/ranges_binary_search.md)
- [`std::ranges::contains()`](/reference/algorithm/ranges_contains.md)


## 参照
- [P2248R8 Enabling list-initialization for algorithms](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2248r8.html)
    - C++26で、アルゴリズムに波カッコ初期化 (リスト初期化) を渡せるようにするために導入された。`find(r, {1, 2});`
