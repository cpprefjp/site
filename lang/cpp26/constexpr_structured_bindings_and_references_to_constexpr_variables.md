# constexpr構造化束縛の許可と、constexpr参照の制限緩和 [P2686R5]
* cpp26[meta cpp]

<!-- start lang caution -->

このページはC++26に採用される見込みの言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++26では、定数式の文脈での構造化束縛が許可されるようになり、`constexpr`変数への参照が定数式として扱われるようになる。

### `constexpr`構造化束縛の許可

C++23までは構造化束縛を`constexpr`として使用することはできなかったが、C++26では以下のようなコードが許可される。

```cpp
constexpr std::tuple<int, int> p{1, 2};
constexpr auto [x, y] = p; // C++26: OK
```

構造化束縛は以下のように参照に展開されるため、`constexpr`参照と同じ制限を受ける：

```cpp
void f() {
  constexpr std::tuple<int, int> p{1, 2};
  constexpr const auto& x = get<0>(p);
  constexpr const auto& y = get<1>(p);
}
```
* get[link /reference/tuple/tuple/get.md]


### `constexpr`変数への参照の制限緩和
`constexpr`参照はC++23まで、静的記憶域をもつ変数への参照のみ許可されていた (テンプレートパラメータの`template <auto& r>`も同様)。C++26ではその制限が緩和され、自動記憶域 (ブロックスコープ) をもつ変数でも`constexpr`参照ができるようになる。

```cpp
void f() {
  constexpr int a = 42;
  constexpr const int& ref = a; // C++23: NG, C++26: OK
}
```

ただし`constexpr`参照の制限として、参照する変数のアドレスが、参照または構造化束縛が存在するスタックフレームを基準とした定数である場合に限られる。


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++11 constexpr](/lang/cpp11/constexpr.md)
- [C++17 構造化束縛](/lang/cpp17/structured_bindings.md)


## 参照
- [P2686R5 `constexpr` structured bindings and references to `constexpr` variables](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2686r5.pdf)
- [Trip report: November 2024 ISO C++ standards meeting (Wrocław, Poland) - Sutter's Mill](https://herbsutter.com/2024/11/24/wg21-2024-11/)
