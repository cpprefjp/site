# operator++
* iterator[meta header]
* std[meta namespace]
* common_iterator[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
common_iterator& operator++();    // (1)
decltype(auto) operator++(int);   // (2)
```

## 概要
イテレータをインクリメントする。

## 堅牢化された事前条件

[`holds_alternative`](/reference/variant/holds_alternative.md)`<I>(v_) == true`

## 効果

`I, S`の値のどちらかを[`variant<I, S>`](/reference/variant/variant.md)型のメンバ変数`v_`に保持しているとして

- (1) : 以下と等価  
    ```cpp
    ++get<I>(v_);
    return *this;
    ```

- (2) : 次のどちらかと等価
    - `I`が[`forward_iterator`](/reference/iterator/forward_iterator.md)のモデルである場合  
      ```cpp
      common_iterator tmp = *this;
      ++*this;
      return tmp;
      ```

    - それ以外の場合 : `return get<I>(v_)++;`

## 例
```cpp example
#include <iostream>
#include <iterator>
#include <ranges>

int main() {
  auto seq = std::views::iota(1) | std::views::take(5);

  // common_iteratorを通すことでイテレータ型と番兵型を合わせる
  using CI = std::common_iterator<std::ranges::iterator_t<decltype(seq)>, std::ranges::sentinel_t<decltype(seq)>>;

  CI ci{std::ranges::begin(seq)};
  
  std::cout << *ci << std::endl;
  
  ++ci;
  
  std::cout << *ci << std::endl;

  ci++;

  std::cout << *ci << std::endl;
}
```
* ++ci[color ff0000]
* views::iota[link /reference/ranges/iota_view.md]
* views::take[link /reference/ranges/take_view.md]

### 出力
```
1
2
3
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 9 [mark verified]

## 参照
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
- [P3697R1 Minor additions to C++26 standard library hardening](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3697r1.html)
- [P3878R1 Standard library hardening should not use the 'observe' semantic](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3878r1.html)
