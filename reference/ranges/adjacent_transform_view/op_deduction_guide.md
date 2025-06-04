# 推論補助
* ranges[meta header]
* std::ranges[meta namespace]
* adjacent_transform_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template<class R, class F>
  adjacent_transform_view(R&&, F) ->
    adjacent_transform_view<views::all_t<R>, decay_t<F>, 2>;
}
```

## 概要
`adjacent_transform_view`クラステンプレートの型推論補助。

## 備考

この推論補助は、第3テンプレート引数`N`のデフォルト値として`2`を使用する。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <type_traits>

int main() {
  std::vector<int> v = {1, 2, 3, 4, 5};
  auto diff = [](int x, int y) { return y - x; };
  
  // adjacent_transform_viewの型を明示的に指定する必要がない（Nはデフォルトで2）
  std::ranges::adjacent_transform_view atv{v, diff};
  
  // 推論された型を確認
  static_assert(std::same_as<
    decltype(atv),
    std::ranges::adjacent_transform_view<
      std::ranges::ref_view<std::vector<int>>,
      decltype(diff),
      2
    >
  >);
}
```

### 出力
```
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 20 [mark noimpl]
- [GCC](/implementation.md#gcc): 15 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 14 [mark noimpl]
