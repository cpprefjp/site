# 制約式内での畳み込み式の順序付け [P2963R3]
* cpp26[meta cpp]

<!-- start lang caution -->

このページはC++26に採用される見込みの言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++26では、制約式 (constraint) 内で使用される畳み込み式 (fold expression) に対して、包摂関係 (subsumption) の規則を導入する。

C++23では、`(C<T> && ...)`のような畳み込み式は制約の順序付けにおいて単一の原子制約 (atomic constraint) として扱われていた。そのため、概念的には一方がもう一方をより強く制約しているにもかかわらず、オーバーロード解決で曖昧になるケースがあった。

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

C++26では、制約の種類として新たに「折りたたみ展開制約 (fold expanded constraint)」が導入され、畳み込み式を含む制約の間で包摂関係が認識されるようになる。


## 仕様
### 折りたたみ展開制約 (fold expanded constraint)
C++26では、制約の種類として連言 (conjunction)、選言 (disjunction)、原子制約 (atomic constraint) に加え、4番目の種類として「折りたたみ展開制約 (fold expanded constraint)」が導入される。

畳み込み式 `(E && ...)` や `(E || ...)` が制約の正規化において処理される際、通常は折りたたみ展開制約として正規化される。折りたたみ展開制約は、制約`E`の正規形と畳み込み演算子 (`&&`または`||`) の組から構成される。

ただし、`E`が展開されていないコンセプトテンプレートパラメータパック (unexpanded concept template parameter pack) を含む場合は、そのパックの要素数`N`に基づいて`E_0 Op ... Op E_{N-1}`の形に展開され、連言または選言にまで分解される。これはP2841R7 (コンセプトテンプレートパラメータ) との連携による動作である。

### 包摂の規則
折りたたみ展開制約`A`がもうひとつの折りたたみ展開制約`B`を包摂するのは、以下の条件をすべて満たす場合である：

- `A`と`B`が包摂の互換性 (compatible for subsumption) をもつこと。すなわち、それぞれの制約が同等の展開されていないパックを含むこと
- `A`と`B`が同じ畳み込み演算子 (`&&`または`||`) をもつこと
- `A`の制約が`B`の制約を包摂すること

異なる畳み込み演算子間の包摂は行われない。

```cpp
template <class T>
concept C = /* ... */;

template <class... T>
void f() requires (C<T> || ...); // #1

template <class... T>
void f() requires (C<T> && ...); // #2

// &&と||は異なる演算子なので、#2が#1を包摂するとはみなされない
f(); // 曖昧
```

### 短絡評価
折りたたみ展開制約の充足 (satisfaction) は、通常の連言／選言と同様に短絡評価される。`&&`の場合は充足されない最初の要素で、`||`の場合は充足される最初の要素で評価が停止する。


## この機能が必要になった背景・経緯
コンセプトと畳み込み式は、可変引数テンプレートの制約を簡潔に記述するために組み合わせて使われることが多い。しかし、C++23では畳み込み式が原子制約として扱われるため、概念的に明らかな包摂関係が認識されず、オーバーロード解決が曖昧になる問題があった。

たとえば、[`std::ranges::bidirectional_range`](/reference/ranges/bidirectional_range.md)と[`std::ranges::random_access_range`](/reference/ranges/random_access_range.md)は非可変引数テンプレートでは正しく順序付けられるが、可変引数テンプレートで畳み込み式を使用すると順序付けが失われていた。この提案はその問題を解決する。

この提案はP2841R0から派生したもので、折りたたみ展開制約の導入と包摂規則を定める。畳み込み式のパターンにコンセプトテンプレートパラメータパック (P2841で導入) が含まれる場合は、連言／選言にまで完全に分解される。


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++17 畳み込み式](/lang/cpp17/folding_expressions.md)
- [C++20 コンセプト](/lang/cpp20/concepts.md)
- [C++26 コンセプトと変数テンプレートをテンプレート引数として渡せるようにする](/lang/cpp26/concept_and_variable-template_template-parameters.md)


## 参照
- [P2963R3 Ordering of constraints involving fold expressions](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2963r3.pdf)

