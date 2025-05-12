# パラメータパックへのインデックスアクセスを許可 [P2662R3]
* cpp26[meta cpp]

<!-- start lang caution -->

このページはC++26に採用される見込みの言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++26では、可変引数テンプレートのパラメータパックに対してインデックスアクセスを行う添字構文が導入される。この機能により、パラメータパックの特定の要素に直接アクセスできるようになる。

これにより、従来の再帰的テンプレートメタプログラミングやタプルの[`std::get()`](/reference/tuple/tuple/get.md)などを使用する必要がなくなり、コードの簡潔さと可読性が向上する。

```cpp
template <class... T>
constexpr auto first_plus_last(T... values) -> T...[0] {
  return T...[0](values...[0] + values...[sizeof...(values)-1]);
}

int main() {
  //first_plus_last(); // コンパイルエラー！
  static_assert(first_plus_last(1, 2, 10) == 11);
}
```

パラメータパックへのインデックスアクセスは、値のパラメータパック、および型のパラメータパックどちらに対しても使用できる。

インデックスが範囲外の場合、コンパイルエラーとなる。


## 例
### N番目の要素を取得する
```cpp example
#include <iostream>
#include <utility>
#include <tuple>

template <int I, typename... Args>
void print_nth(Args&&... args) {
  // C++23実装 : タプルに変換してからI番目の要素を参照する
  // auto value = std::get<I>(std::forward_as_tuple(std::forward<Args>(args)...));

  // C++26実装 : 添字構文でI番目の要素を参照する
  auto value = args...[I];

  std::cout << value << std::endl;
}

int main() {
  print_nth<2>("A", "B", "C", "D"); // 出力: C
}
```
* std::get[link /reference/tuple/tuple/get.md]

#### 出力
```
C
```

## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++11 可変引数テンプレート](/lang/cpp11/variadic_templates.md)


## 参照
- [P2662R3 Pack Indexing](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2662r3.pdf)
