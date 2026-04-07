# 制約式内での畳み込み式の順序付け [P2963R3]
* cpp26[meta cpp]

<!-- start lang caution -->

このページはC++26に採用される見込みの言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++26では、制約式 (constraint) 内で使用される畳み込み式 (fold expression) に対して、包摂関係 (subsumption) の規則を導入する。

C++23では、`(C<T> && ...)`のような畳み込み式は構文上は連言 (conjunction) や選言 (disjunction) のように見えるが、制約の順序付けにおいては単一の原子制約 (atomic constraint) として扱われていた。そのため、概念的には一方がもう一方をより強く制約しているにもかかわらず、オーバーロード解決で曖昧になるケースがあった。

```cpp
template <class T>
concept A = std::is_move_constructible_v<T>;

template <class T>
concept B = std::is_copy_constructible_v<T>;

template <class T>
concept C = A<T> && B<T>;

template <class... T>
  requires (A<T> && ...)
void g(T...);

template <class... T>
  requires (C<T> && ...)
void g(T...);

// C++23: g()の呼び出しが曖昧 (AとCの包摂関係が認識されない)
// C++26: C<T>はA<T>を包摂するため、2番目のオーバーロードが選択される
g(std::vector{1, 2, 3});
```
* std::is_move_constructible_v[link /reference/type_traits/is_move_constructible.md]
* std::is_copy_constructible_v[link /reference/type_traits/is_copy_constructible.md]

C++26では、`&&`による畳み込み式は個別の制約の連言として、`||`による畳み込み式は個別の制約の選言として正規化され、通常の原子制約と同じ包摂規則が適用される。


## 仕様
### 畳み込み式の正規化
畳み込み式が制約として使用される場合、以下のように正規化される：

- `(C<T> && ...)` は `C<T1> && C<T2> && ... && C<Tn>` のような連言として扱われる
- `(C<T> || ...)` は `C<T1> || C<T2> || ... || C<Tn>` のような選言として扱われる
- `(... && C<T>)` や二項畳み込み式 `(init && ... && C<T>)` も同様に正規化される

### 包摂の規則
畳み込み式の制約間の包摂は、同じ畳み込み演算子 (`&&`または`||`) を使用している場合にのみ成立する。異なる畳み込み演算子間の包摂は行われない。

```cpp
template <class T>
concept C = /* ... */;

template <class... T>
void f() requires (C<T> || ...); // #1

template <class... T>
void f() requires (C<T> && ...); // #2

// &&と||は異なる演算子なので、#2が#1を包摂するとはみなされない
// f()の呼び出しは曖昧
f();
```

### 短絡評価
畳み込み式の制約の評価と充足 (satisfaction) は、通常の連言／選言と同様に短絡評価される。


## この機能が必要になった背景・経緯
コンセプトと畳み込み式は、可変引数テンプレートの制約を簡潔に記述するために組み合わせて使われることが多い。しかし、C++23では畳み込み式が原子制約として扱われるため、概念的に明らかな包摂関係が認識されず、オーバーロード解決が曖昧になる問題があった。

たとえば、[`std::ranges::bidirectional_range`](/reference/ranges/bidirectional_range.md)と[`std::ranges::random_access_range`](/reference/ranges/random_access_range.md)は非可変引数テンプレートでは正しく順序付けられるが、可変引数テンプレートで畳み込み式を使用すると順序付けが失われていた。この提案はその問題を解決する。

この提案はP2841R0 (コンセプトと変数テンプレートのテンプレートテンプレートパラメータ) から派生したもので、畳み込み式のパターンが通常の制約式である場合を扱う。パターンがコンセプトテンプレートパラメータである場合はP2841で扱われる。


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++17 畳み込み式](/lang/cpp17/folding_expressions.md)
- [C++20 コンセプト](/lang/cpp20/concepts.md)
- [C++26 コンセプトと変数テンプレートをテンプレート引数として渡せるようにする](/lang/cpp26/concept_and_variable-template_template-parameters.md)


## 参照
- [P2963R3 Ordering of constraints involving fold expressions](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2963r3.pdf)

