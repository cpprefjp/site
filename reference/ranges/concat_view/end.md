# end
* ranges[meta header]
* std::ranges[meta namespace]
* concat_view[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr auto end()
  requires (!simple-view<Views> || ...);       // (1) C++26

constexpr auto end() const
  requires (range<const Views> && ...);        // (2) C++26
```

## 概要
終端イテレータもしくは番兵を取得する。

## 効果
`is-const`を、`const`修飾版の (2) では`true`、非`const`版の (1) では`false`とする。`Views`の要素数を`N`として、以下と等価である：

- 全ての範囲（`is-const`に応じて`const`修飾したもの）が[`forward_range`](/reference/ranges/forward_range.md)であり、かつ最後の範囲`Views...[N - 1]`が[`common_range`](/reference/ranges/common_range.md)である場合、最後の範囲の終端を指す`concat_view`のイテレータを返す。
- そうでなければ、[`default_sentinel`](/reference/iterator/default_sentinel_t.md)を返す。

## 例

```cpp example
#include <print>
#include <ranges>
#include <array>
#include <vector>

int main() {
  std::vector<int> v1{1, 2, 3};
  std::vector<int> v2{4, 5};
  std::array<int, 3> a{6, 7, 8};

  std::ranges::concat_view r{v1, v2, a};

  auto it = r.begin();
  auto end_it = r.end();
  while (it != end_it) {
    std::print("{} ", *it);
    ++it;
  }
  std::println();
}
```
* end[color ff0000]
* begin[link begin.md]

### 出力

```
1 2 3 4 5 6 7 8
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 23 [mark verified]
- [GCC](/implementation.md#gcc): 15 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 14 [mark noimpl]


## 参照
- [LWG Issue 4166. `concat_view::end()` should be more constrained in order to support noncopyable iterators](https://cplusplus.github.io/LWG/issue4166)
    - C++26で、`end()`の効果で終端イテレータを返す条件に「全ての範囲が`forward_range`であること」（`all-forward`）が追加された。一部の範囲が前方範囲でない場合にイテレータを返してしまい、コピー不可能なイテレータを含む場合などに問題が生じるのを防ぐもの
