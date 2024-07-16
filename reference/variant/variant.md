# variant
* variant[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class... Types>
  class variant;
}
```

## 概要
`variant`クラスは、格納されうる候補の型リスト (`Types...`) に含まれる型のオブジェクトを切り替えながら保持する記憶域型である。継承関係にない複数の型を、単一のオブジェクトに代入・切り替えができる。

これは、継承によって基底クラスのオブジェクトに派生クラスのオブジェクトを代入できることと同様に、候補として列挙した複数の型のオブジェクトを単一の型のオブジェクトに代入して扱えるという点で、多態性を表現している。インタフェースが異なる複数の型の場合はビジター関数オブジェクトによって型ごとの動作を定義でき、インタフェースが共通の型の場合は、関数テンプレートの関数呼び出し演算子をもつ関数オブジェクトをビジターにすることで共通の動作をさせることができる。

```cpp
// 継承関係にないクラス群
struct A { void f() {} };
struct B { void f() {} };
struct C { void f() {} };

// A, B, Cのいずれかの型を代入できる型
std::variant<A, B, C> v = A{}; // A型のオブジェクトを代入
v = B{}; // B型のオブジェクトに切り替え

// B型オブジェクトを保持しているか
if (std::holds_alternative<B>(v)) {
  // 保持しているB型オブジェクトを取得
  B& b = std::get<B>(v);
}

// どの型が代入されていたとしても、共通のインタフェースを呼び出す
std::visit([](auto& x) {
  x.f();
}, v);
```
* std::holds_alternative[link holds_alternative.md]
* std::visit[link visit.md]
* std::get[link variant/get.md]

このクラスと同様のことは共用体を使用しても達成できるが、このクラスはより使いやすいよう設計されている。

このクラスは追加の動的メモリ確保は行わず、保持するオブジェクトを自身のオブジェクト表現内に直接割り当てる。


### 備考
- このクラスは[Boost Variant Library](https://boost.org/libs/variant)を元に設計されている
- Boost Variant Libraryは、recursive variantによって再帰的なデータ構造を扱えるが、現時点の`std::variant`クラスではそのようなデータ構造は扱えない
    - これは、JSONデータ形式のように値として数値・文字列・配列などを設定でき、配列の要素にもまた数値・文字列・配列などを設定できる、というようなデータの読み込み、書き込みで必要となる
- Boost Variant Libraryは、「[決して空にならない保証 ("Never-Empty" Guarantee)](https://www.boost.org/doc/libs/release/doc/html/variant/design.html#variant.design.never-empty)」を提供しており、たとえ代入中に例外が発生したとしても、候補型のいずれの型も代入されていない状況が起こらないよう設計・実装されていた。標準ライブラリに導入されたこのクラスは、代入中に例外が発生した場合に空になる可能性をもっている
- このクラスは、他の言語で「代数データ型 (Algebraic data type)」「直和型 (Union type, Sum type)」「タグ付き共用体 (Tagged union)」と呼ばれる機能の一部を表現できる。また、`Either`型として近しい機能が提供されている場合もある


## テンプレートパラメータ制約
- `Types...`の全ての型が、[`std::destructible`](/reference/concepts/destructible.md)要件を満たすこと
    - 例えば`void`はこれを満たさない。空、あるいは無効な型を入れ込みたい場合には[`std::monostate`](/reference/variant/monostate.md)が使用できる
- コンストラクタや代入の制約として、`variant<`[`std::string`](/reference/string/basic_string.md)`,` [`std::string`](/reference/string/basic_string.md)`>`のように、`Types...`内に同じ型が複数回現れる指定をする場合は、型のインデックスを指定する形式の機能のみ使用できる
    - こういった指定は、正常データかエラーデータどちらかが代入されるオブジェクトを用意する状況で、正常データとエラーデータがどちらも文字列、という場合に必要になる


## 適格要件
- `Types...`が空ではないこと


## メンバ関数
### 構築・破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](variant/op_constructor.md) | コンストラクタ | C++17 |
| [`(destructor)`](variant/op_destructor.md)   | デストラクタ | C++17 |


### 代入

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator=`](variant/op_assign.md) | 代入演算子 | C++17 |
| [`emplace`](variant/emplace.md)     | 要素型のコンストラクタ引数から直接構築する | C++17 |
| [`swap`](variant/swap.md)           | 他の`variant`オブジェクトとデータを入れ替える | C++17 |


### 値の観測

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`valueless_by_exception`](variant/valueless_by_exception.md) | 例外によって値を持たない状態になっているかを判定する | C++17 |
| [`index`](variant/index.md) | 候補型の何番目の型が代入されているかを取得する | C++17 |


## 非メンバ関数
### 値の取得

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`get`](variant/get.md) | 保持している値を取得する | C++17 |
| [`get_if`](variant/get_if.md) | 保持している値を指すポインタを取得する。エラー時にヌルポインタを返す | C++17 |


### ビジター

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`visit`](visit.md) | `variant`オブジェクトが現在保持している型に対応する関数を呼び出す | C++17 |


### 値の入れ替え

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`swap`](variant/swap_free.md) | 2つの`variant`オブジェクトを入れ替える | C++17 |


### 比較演算子

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator==`](variant/op_equal.md)         | 等値比較 | C++17 |
| [`operator!=`](variant/op_not_equal.md)     | 非等値比較 | C++17 |
| [`operator<=>`](variant/op_compare_3way.md) | 三方比較 | C++20 |
| [`operator<`](variant/op_less.md)           | 左辺が右辺より小さいかを判定する | C++17 |
| [`operator<=`](variant/op_less_equal.md)    | 左辺が右辺以下かを判定する | C++17 |
| [`operator>`](variant/op_greater.md)        | 左辺が右辺より大きいかを判定する | C++17 |
| [`operator>=`](variant/op_greater_equal.md) | 左辺が右辺以上かを判定する | C++17 |


## ハッシュサポート

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------|----------------------------------------|-------|
| `template <class T> struct hash;`              | `hash`クラスの先行宣言                 | C++17 |
| `template <class ...Types> struct hash<variant<Types...>>;` | `hash`クラスの`variant`に対する特殊化 | C++17 |


## アロケータインタフェース

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------|----------------------------------------|-------|
| `template <class T, class Alloc> struct uses_allocator;` | `uses_allocator`クラスの先行宣言 | C++17 |
| `template <class... Types, class Alloc>`<br/> `struct uses_allocator<variant<Types...>, Alloc>;` | `uses_allocator`クラスの`variant`に対する特殊化 | C++17 |


## 例
```cpp example
#include <iostream>
#include <variant>
#include <string>

int main()
{
  // int, char, std::stringのいずれかの型の値を保持できる型
  std::variant<int, char, std::string> v = 3; // int型の値を代入

  // 候補型の0番目の型 (int) を保持しているか
  if (v.index() == 0) {
    int& x = std::get<0>(v); // 型のインデックスを指定して、保持している値を取得
    std::cout << x << std::endl;
  }

  v = std::string("Hello"); // std::string型オブジェクトを代入

  // std::string型を保持しているか
  if (std::holds_alternative<std::string>(v)) {
    std::string& x = std::get<std::string>(v); // 型を指定して、保持している値を取得
    std::cout << x << std::endl;
  }
}
```
* v.index()[link variant/index.md]
* std::holds_alternative[link holds_alternative.md]
* std::get[link variant/get.md]

### 出力
```
3
Hello
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0 [mark verified]
- [GCC](/implementation.md#gcc): 7.3 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [N4218 Variant: a typesafe union.](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4218.pdf)
- [N4450 Variant: a typesafe union (v2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4450.pdf)
- [N4516 Variant: a type-safe union (v3)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4516.pdf)
- [N4542 Variant: a type-safe union (v4).](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4542.pdf)
- [P0032R0 Homogeneous interface for `variant`, `any` and `optional`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0032r0.pdf)
- [P0032R1 Homogeneous interface for `variant`, `any` and `optional` (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0032r1.pdf)
- [P0032R2 Homogeneous interface for `variant`, `any` and `optional` (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0032r2.pdf)
- [P0032R3 Homogeneous interface for `variant`, `any` and `optional` (Revision 3)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0032r3.pdf)
- [P0080 Variant: Discriminated Union with Value Semantics](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0080r0.pdf)
- [P0086R0 Variant design review](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0086r0.pdf)
- [P0087R0 Variant: a type-safe union without undefined behavior (v2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0087r0.pdf)
- [P0088R0 Variant: a type-safe union that is rarely invalid (v5)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0088r0.pdf)
- [P0088R1 Variant: a type-safe union that is rarely invalid (v6)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0088r1.html)
- [P0088R2 Variant: a type-safe union for C++17 (v7)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0088r2.html)
- [P0088R3 Variant: a type-safe union for C++17 (v8)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0088r3.html)
- [P0093R0 Simply a strong variant](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0093r0.html)
- [P0094R0 Simply a basic variant](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0094r0.html)
- [P0095R0 The Case for a Language Based Variant](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0095r0.html)
- [P0110R0 Implementing the strong guarantee for `variant<>` assignment](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0110r0.html)
- [P0308R0 Valueless Variants Considered Harmful](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0308r0.html)
- [P0510R0 Disallowing references, incomplete types, arrays, and empty variants](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0510r0.html)
- [LWG Issue 3196. `std::optional<T>` is ill-formed is `T` is an array](https://wg21.cmeerw.net/lwg/issue3196)
