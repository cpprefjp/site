# constexpr配置new [P2747R2]
* cpp26[meta cpp]

<!-- start lang caution -->

このページはC++26に採用される見込みの言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++26では、配置`new`構文を定数式の文脈で使用できるようになる。

```cpp
template <class T, class... Args>
constexpr void f(T* p, Args... args) {
  new (p) T(args...); // C++26: OK
}
```

C++20では、[`std::construct_at()`](/reference/memory/construct_at.md)関数が導入された。この関数には`constexpr`がついており、コンパイラが特別扱いすることによって、コンパイル時に配置`new`相当のことができた。

しかし、配置`new`構文と[`std::construct_at()`](/reference/memory/construct_at.md)では、できることに大きな差がある。

| 操作 | 配置`new` | `std::construct_at()` |
|------|-----------|-----------------------|
| 値初期化         | `new (p) T(args...)`    | `std::construct_at(p, args...)` |
| デフォルト初期化 | `new (p) T`             | できない。`std::default_construct_at()`が提案されている |
| リスト初期化     | `new (p) T{a, b}`       | できない |
| 指示付き初期化   | `new (p) T{.a=a, .b=b}` | できない。関数で表現する方法が現状ない |

これらの表現力の違いから、配置`new`構文自体が`constexpr`内で使用できることとなった。

関連して、[`<new>`](/reference/new.md)ライブラリの配置`new`演算子もまた、`constexpr`に対応する


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++11 constexpr](/lang/cpp11/constexpr.md)
- [`new`演算子](/reference/new/op_new.md)
- [`new[]`演算子](/reference/new/op_new[].md)


## 参照
- [P2747R2 constexpr placement new](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2747r2.html)
