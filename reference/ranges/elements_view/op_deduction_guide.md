# 推論補助
* ranges[meta header]
* std::ranges[meta namespace]
* elements_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<class R, size_t N>
  elements_view(R&&, const integral_constant<size_t, N>&) ->
    elements_view<views::all_t<R>, N>; // (1) C++20 (削除)

  template<class R, size_t N>
  elements_view(R&&) -> elements_view<views::all_t<R>, N>;  // (2) C++23
}
```
* integral_constant[link /reference/type_traits/integral_constant.md]
* views::all_t[link ../all.md]

## 概要
`elements_view`クラステンプレートの型推論補助。

- (1) : C++20で導入されたが、C++23で削除された
- (2) : C++23で導入された新しい推論補助

## 備考

C++20では、`elements_view`は第2引数として`integral_constant`を受け取っていたが、C++23からはテンプレート引数として`N`を直接指定するように変更された。

## 例
```cpp example
#include <ranges>
#include <map>
#include <string>
#include <type_traits>

int main() {
  std::map<int, std::string> m = {{1, "one"}, {2, "two"}, {3, "three"}};
  
  // C++23以降の使用方法
  std::ranges::elements_view<std::views::all_t<std::map<int, std::string>&>, 0> ev{m};
  
  // 推論された型を確認
  static_assert(std::same_as<
    decltype(ev),
    std::ranges::elements_view<std::ranges::ref_view<std::map<int, std::string>>, 0>
  >);
}
```
* std::ranges::elements_view[color ff0000]
* std::views::all_t[link ../all.md]

### 出力
```
```

## バージョン
### 言語
- C++20: (1)
- C++23: (2)

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 関連項目
- [`views::all`](../all.md)

## 参照
- [P2367R0 Remove misuses of list-initialization in Clause 24](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2367r0.html)