# コンパイル時のタプルやリストを展開処理する`template for`文 [P1306R5]
* cpp26[meta cpp]

<!-- start lang caution -->

このページはC++26に採用される見込みの言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++26では、タプル、構造体、Range、パラメータパック展開リストなどの各要素に対して、コンパイル時に文を繰り返し展開する「展開文 (expansion statement)」として`template for`文を導入する。

```cpp
auto tup = std::make_tuple(0, 'a', 3.14);
template for (auto elem : tup) {
  std::println("{}", elem);
}
```
* std::make_tuple[link /reference/tuple/make_tuple.md]

出力：

```
0
a
3.14
```

この`template for`文は、本体の文をコンパイル時に要素数分だけ展開する。上記のコードは以下と等価である：

```cpp
{
  { auto elem = get<0>(tup); std::println("{}", elem); }
  { auto elem = get<1>(tup); std::println("{}", elem); }
  { auto elem = get<2>(tup); std::println("{}", elem); }
}
```

各展開において要素の型が異なりうるため、通常の`for`文では実現できない処理が可能となる。


## 構文

```
template for ( init-statement(opt) for-range-declaration : expansion-initializer ) compound-statement
```

`expansion-initializer`には以下の3種類の形式がある：

- 列挙展開: `{ expression-list }` — 引数パック展開や、任意のタプル指定
- 反復展開 (Range) : `expression` — `begin()`/`end()`が定義され、要素数がコンパイル時に確定するRange
- 分解展開 (構造体・タプル) : `expression` — 構造化束縛可能なオブジェクト


## 展開の種類
### 列挙展開
ブレース区切りの式リストやパック展開を展開する。

```cpp
template <typename... Ts>
void print_all(Ts... elems) {
  template for (auto elem : {elems...}) {
    std::println("{}", elem);
  }
}

print_all(1, 2.0, "three");
```

パック展開のほか、任意の式のリストも使用できる：

```cpp
template for (auto x : {1, 2.0, "three"}) {
  std::println("{}", x);
}
```


### 反復展開
`begin()`/`end()`が定義され、`end - begin`がコンパイル時に確定するRangeを展開する。

```cpp
void f() {
  template for (constexpr int I : std::array{1, 2, 3}) {
    static_assert(I < 4);
  }
}
```

### 分解展開
構造化束縛可能なオブジェクト（タプル、構造体など）を展開する。

```cpp
struct Point { int x; int y; int z; };

consteval long total_size(Point p) {
  long result = 0;
  template for (auto field : p) {
    result += sizeof(field);
  }
  return result;
}
```

範囲としても分解としても解釈できる場合は、範囲が優先される。


## `break`と`continue`
`template for`文の本体内で`break`と`continue`を使用できる。これらは実行時の制御フローとして動作する。

- `break` : 展開全体の末尾に飛ぶ
- `continue` : 次の展開の先頭に飛ぶ

同じ型の要素のみのタプルであれば、通常の`if`文で条件分岐できる：

```cpp
auto tup = std::make_tuple(1, 2, 3);
template for (auto elem : tup) {
  if (elem == 2) break;
  std::println("{}", elem);
}
// 出力: 1
```

異なる型の要素をもつタプルでは、型に依存する条件を`if constexpr`で分岐する必要がある：

```cpp
auto tup = std::make_tuple(1, "hello", 3.14);
template for (auto elem : tup) {
  // 整数型の場合のみ値を判定してcontinueする
  if constexpr (std::is_integral_v<decltype(elem)>) {
    if (elem == 1) continue;
  }
  std::println("{}", elem);
}
// 出力:
// hello
// 3.14
```
* std::is_integral_v[link /reference/type_traits/is_integral.md]


## `return`
`template for`文の本体内で`return`を使用すると、所属する関数から直接返る。これは[`std::apply()`](/reference/tuple/apply.md)にラムダ式を渡す方法では実現できなかった利点である。

```cpp
// タプルの要素から最初の整数型の値を探して返す
template <class Tuple>
std::optional<int> find_first_int(Tuple&& tup) {
  template for (auto&& elem : tup) {
    if constexpr (std::is_integral_v<std::remove_cvref_t<decltype(elem)>>) {
      return elem;  // 所属する関数から直接返る
    }
  }
  return std::nullopt;
}

auto tup = std::make_tuple("hello", 42, 3.14);
auto result = find_first_int(tup);  // 42
```
* std::is_integral_v[link /reference/type_traits/is_integral.md]
* std::remove_cvref_t[link /reference/type_traits/remove_cvref.md]
* std::make_tuple[link /reference/tuple/make_tuple.md]


## `co_await`
`template for`文の本体内で`co_await`を使用すると、所属するコルーチンを直接サスペンドできる。ラムダ式内の`co_await`は囲む関数ではなくラムダ自体をコルーチンにしてしまうため、従来の方法では実現が困難であった。

```cpp
// タプルの各要素に対して非同期処理を順番に実行する
template <class Tuple>
Task process_all(Tuple&& tup) {
  template for (auto&& elem : tup) {
    co_await async_process(elem);  // 所属するコルーチンをサスペンドする
  }
}
```


## この機能が必要になった背景・経緯
C++23以前では、[`std::tuple`](/reference/tuple/tuple.md)のような異種型コンテナの各要素を処理するために、テンプレートの再帰的インスタンス化や[`std::apply()`](/reference/tuple/apply.md)を使用する必要があった。これらの手法には以下の問題があった：

- コンパイル時間とメモリの消費が大きい
- ラムダ式内での`return`や`co_await`が囲む関数に影響を与えない
- コードが不自然で読みにくい

`template for`文はこれらの問題を解決し、異種型コンテナの反復処理を通常の`for`文と同様の構文で記述できるようにする。


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++11 可変引数テンプレート](/lang/cpp11/variadic_templates.md)
- [C++17 畳み込み式](/lang/cpp17/folding_expressions.md)
- [C++17 構造化束縛](/lang/cpp17/structured_bindings.md)
- [C++26 構造化束縛でパックを導入できるようにする](/lang/cpp26/structured_bindings_can_introduce_a_pack.md)
- [C++26 静的リフレクション](/lang/cpp26/reflection.md.nolink)
- [`std::tuple`](/reference/tuple/tuple.md)
- [`std::apply()`](/reference/tuple/apply.md)


## 参照
- [P1306R5 Expansion Statements](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p1306r5.html)
