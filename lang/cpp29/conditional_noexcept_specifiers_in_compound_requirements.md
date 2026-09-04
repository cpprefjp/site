# requires式の複合要件で条件付きnoexcept指定を許可 [P3822R2]
* cpp29[meta cpp]

<!-- start lang caution -->

このページはC++29に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++29では、[requires式](/lang/cpp20/concepts.md)の複合要件の`noexcept`指定に、関数宣言と同じく条件となる定数式を指定できるようになる。

```cpp
{ 式 } noexcept(定数式) -> 戻り値型の制約(省略可);
```

C++26までの複合要件では無条件の`noexcept`しか書けなかったため、例外を送出しないことを条件付きで要求するには、requires式全体を書き分ける必要があった。

```cpp
// C++26まで
template <typename F, bool noexc>
concept invocable = noexc
  ? requires(F f) { { f() } noexcept; }
  : requires(F f) { f(); };

// C++29
template <typename F, bool noexc>
concept invocable = requires(F f) {
  { f() } noexcept(noexc);
};
```


## 仕様
- 複合要件の文法が、`noexcept`キーワードのみを許可する形から、関数宣言と共通の`noexcept`指定を許可する形へ変更される
- `noexcept`指定の定数式は、`bool`型へ文脈的に変換された定数式であること。定数式を指定しない`noexcept`は`noexcept(true)`と等価である
- テンプレート引数の置換と要件の検証は、式、`noexcept`指定の定数式、戻り値型の制約の順に行われる
- 定数式が`true`に評価された場合、式が例外を送出する可能性があると要件は満たされない。定数式が`false`に評価された場合や`noexcept`指定がない場合は、式が例外を送出する可能性があってもよい
- 定数式の`bool`への変換に失敗した場合、プログラムは不適格とはならず、要件が満たされないものとして扱われる。requires式はオーバーロード解決に使われることが多く、想定外の型が渡された場合にはほかのオーバーロードの検討を継続することが期待されるためである


## 例
```cpp example
template <class F, bool NoThrow>
concept maybe_nothrow_invocable = requires(F f) {
  { f() } noexcept(NoThrow);
};

void f1();
void f2() noexcept;

int main()
{
  // NoThrowがfalseの場合、f()が例外を送出する可能性があってもよい
  static_assert(maybe_nothrow_invocable<decltype(f1)&, false>);
  static_assert(maybe_nothrow_invocable<decltype(f2)&, false>);

  // NoThrowがtrueの場合、f()が例外を送出する可能性があると要件を満たさない
  static_assert(!maybe_nothrow_invocable<decltype(f1)&, true>);
  static_assert(maybe_nothrow_invocable<decltype(f2)&, true>);
}
```
* noexcept(NoThrow)[color ff0000]

### 出力
```
```


## この機能が必要になった背景・経緯
requires式では、式が例外を送出しないことを`noexcept`で表明できたが、これを条件付きにする方法はなく、ジェネリックプログラミングで必要になった場合はrequires式を重複して書く必要があった。また、関数宣言はC++11から条件付きの`noexcept`指定を持っており、複合要件だけが無条件の`noexcept`しか書けないのは一貫性を欠いていた。


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++20 コンセプト](/lang/cpp20/concepts.md)
- [C++11 `noexcept`](/lang/cpp11/noexcept.md)


## 参照
- [P3822R2 Conditional noexcept specifiers in compound requirements](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3822r2.html)
