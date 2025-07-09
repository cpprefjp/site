# 推論補助
* string_view[meta header]
* std[meta namespace]
* basic_string_view[meta class]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class It, class End>
  basic_string_view(It, End)
    -> basic_string_view<iter_value_t<It>>;          // (1) C++20

  template<class R>
  basic_string_view(R&&)
    -> basic_string_view<ranges::range_value_t<R>>;  // (2) C++23
}
```
* ranges::range_value_t[link /reference/ranges/range_value_t.md]

## 概要
`std::basic_string_view`クラステンプレートの型推論補助。イテレータ範囲やレンジから推論する。


## テンプレートパラメータ制約
- (1) :
    - `It`は[`contiguous_iterator`](/reference/iterator/contiguous_iterator.md)の要件を満たすこと
    - `End`は[`sized_sentinel_for`](/reference/iterator/sized_sentinel_for.md)`<It>`の要件を満たすこと
- (2) :
    - `R`は[`ranges::contiguous_range`](/reference/ranges/contiguous_range.md)の要件を満たすこと


## 例
```cpp example
#include <iostream>
#include <string_view>

int main()
{
  std::string s = "Hello";
  std::basic_string_view sv{s.begin(), s.end()};
  std::cout << sv << std::endl;
}
```
* s.begin()[link /reference/string/basic_string/begin.md]
* s.end()[link /reference/string/basic_string/end.md]

### 出力
```
Hello
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [C++17 クラステンプレートのテンプレート引数推論](/lang/cpp17/type_deduction_for_class_templates.md)


## 参照
- [P1391R4 Range constructor for `std::string_view`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1391r4.pdf)
- [P1989R2 Range constructor for `std::string_view` 2: Constrain Harder](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p1989r2.pdf)
    - C++23での、レンジ版推論補助追加
