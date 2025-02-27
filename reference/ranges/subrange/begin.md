# begin
* ranges[meta header]
* std::ranges[meta namespace]
* subrange[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr I begin() const requires copyable<I>;             // (1) C++20

[[nodiscard]] constexpr I begin() requires (!copyable<I>);  // (2) C++20
constexpr I begin() requires (!copyable<I>);                // (2) C++26
```
* copyable[link /reference/concepts/copyable.md]
* nodiscard[link /lang/cpp17/nodiscard.md]

## 概要
先頭要素を指すイテレータを取得する。

## 効果
- (1): `return begin_;`
- (2): `return std::move(begin_);`

ただし、`begin_`は`subrange`が内部で保持するイテレータ。

## 例
```cpp example
#include <ranges>
#include <iostream>

int main()
{
  constexpr int a[] = {1, 2, 3};
  const std::ranges::subrange sub(a);
  // .begin と .end を暗黙的に使用
  for (int x : sub) {
    std::cout << x << '\n';
  }
}
```

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
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
- [P2422R1 Remove `nodiscard` annotations from the standard library specification](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2422r1.html)
    - C++26で`[[nodiscard]]`指定が削除された
