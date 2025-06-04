# 推論補助
* ranges[meta header]
* std::ranges[meta namespace]
* adjacent_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template<class R>
  adjacent_view(R&&) -> adjacent_view<views::all_t<R>, 1>;
}
```

## 概要
`adjacent_view`クラステンプレートの型推論補助。

## 備考

この推論補助は、第2テンプレート引数`N`のデフォルト値として`1`を使用する。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <type_traits>

int main() {
  std::vector<int> v = {1, 2, 3, 4, 5};
  
  // adjacent_viewの型を明示的に指定する必要がない（Nはデフォルトで1）
  std::ranges::adjacent_view av{v};
  
  // 推論された型を確認
  static_assert(std::same_as<
    decltype(av),
    std::ranges::adjacent_view<std::ranges::ref_view<std::vector<int>>, 1>
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
- [Clang](/implementation.md#clang): 19 [mark verified]
- [GCC](/implementation.md#gcc): 13 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 7 [mark verified]
