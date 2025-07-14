# operator=
* variant[meta header]
* std[meta namespace]
* variant[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
constexpr variant& operator=(const variant& rhs);              // (1)
constexpr variant& operator=(variant&& t) noexcept(see below); // (2)

template <class T>
variant& operator=(T&& rhs) noexcept(see below);               // (3) C++17
template <class T>
constexpr variant& operator=(T&& rhs) noexcept(see below);     // (3) C++23
```

## 概要
`variant`オブジェクトもしくは候補型の値を代入する。

- (1) : コピー代入演算子
- (2) : ムーブ代入演算子
- (3) : クラスのテンプレート引数で指定した候補型のうち、いずれかの型の値を代入する


## テンプレートパラメータ制約
- (2) :
    - `Types...`のすべての型`Ti`について、[`is_move_constructible_v`](/reference/type_traits/is_move_constructible.md)`<Ti> &&` [`is_move_assignable_v`](/reference/type_traits/is_move_assignable.md)`<Ti>`が`true`であること
- (3) :
    - C++17 : ここで説明用に、`*this`が保持している型`Tj`と、そのインデックス値`j`を定義する。`Types...`の各型`Ti`に対して擬似的な関数`FUN(Ti)`を定義したとして、`FUN(`[`std::forward`](/reference/utility/forward.md)`<T>(t))`呼び出しによって選択されたオーバーロードされた関数のパラメータ型を、代入してその後含まれる値の型を`Tj`とする
    - C++20 : ここで説明用に、`*this`が保持している型`Tj`と、そのインデックス値`j`を定義する。`Types...`の各型`Ti`を、縮小変換を受け付けない型であり (`Ti x[] = {`[`std::forward`](/reference/utility/forward.md)`<T>(t)};`)、CV修飾付き`bool`の場合にCV修飾を外した`bool`型になるとして、その型に対して擬似的な関数`FUN(Ti)`を定義したとして、`FUN(`[`std::forward`](/reference/utility/forward.md)`<T>(t))`呼び出しによって選択されたオーバーロードされた関数のパラメータ型を、代入してその後含まれる値の型を`Tj`とする
    - [`is_same_v`](/reference/type_traits/is_same.md)`<`[`decay_t`](/reference/type_traits/decay.md)`<T>, variant>`が`false`であること
    - [`is_assignable_v`](/reference/type_traits/is_assignable.md)`<Tj&, T> &&` [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<Tj, T>`が`true`であること


## 効果
- (1) :
    - `*this`と`rhs`がどちらも値を保持していない場合、なにもしない
    - `*this`が値を保持し、`rhs`が保持していない場合、`*this`が値を保持していない状態にする
    - [`index()`](index.md) `== rhs.`[`index()`](index.md)である場合、`rhs`が保持している値を`*this`が保持する値としてコピー代入する (型の切り替えを行わない)
    - `rhs.`[`index()`](index.md)を`j`、`Types...`の`j`番目の型を`Tj`として、[`is_nothrow_copy_constructible_v`](/reference/type_traits/is_nothrow_copy_constructible.md)`<Tj> == true`もしくは[`is_nothrow_move_constructible_v`](/reference/type_traits/is_nothrow_move_constructible.md)`<Tj> == false`である場合、[`emplace`](emplace.md)`<j>(`[`get`](get.md)`<j>(rhs))`と等価
    - いずれにも当てはまらない場合、`operator=(variant(rhs))`と等価
- (2) :
    - `*this`と`t`がどちらも値を保持していない場合、なにもしない
    - `*this`が値を保持し、`t`が保持していない場合、`*this`が値を保持していない状態にする
    - [`index()`](index.md) `== t.`[`index()`](index.md)である場合、`t`が保持している値を`*this`が保持する値としてムーブ代入する (型の切り替えを行わない)
    - いずれにも当てはまらない場合、`t.`[`index()`](index.md)を`j`として、[`emplace`](emplace.md)`<j>(`[`get`](get.md)`<j>(`[`std::move`](/reference/utility/move.md)`(t)))`と等価
- (3) :
    - `*this`が`Tj`型の値を保持している場合、[`std::forward`](/reference/utility/forward.md)`<T>(rhs)`の値を`*this`に代入する (型の切り替えを行わない)
    - [`is_nothrow_constructible_v`](/reference/type_traits/is_nothrow_constructible.md)`<Tj, T> || !`[`is_nothrow_move_constructible_v`](/reference/type_traits/is_nothrow_move_constructible.md)`<Tj>`が`true`である場合、[`emplace`](emplace.md)`<j>(`[`std::forward`](/reference/utility/forward.md)`<T>(rhs))`の呼び出しと等価
    - いずれにも当てはまらない場合、`operator=(variant(`[`std::forward`](/reference/utility/forward.md)`<T>(rhs)))`呼び出しと等価


## 戻り値
`*this`


## 事後条件
- (1), (2) : [`index()`](index.md) `== rhs.`[`index()`](index.md)
- (3) : [`holds_alternative`](/reference/variant/holds_alternative.md)`<Tj>(*this)`が`true`であること


## 例外
- (2) :
    - `noexcept`演算子内部の式は、以下と等価となる：
        - `Types...`のすべての型`Ti`について、[`is_nothrow_move_constructible_v`](/reference/type_traits/is_nothrow_move_constructible.md)`<Ti> &&` [`is_nothrow_move_assignable_v`](/reference/type_traits/is_nothrow_move_assignable.md)`<Ti>`
    - `t.`[`index()`](index.md)を`j`、`Types...`の`j`番目の型を`Tj`として、型`Tj`のムーブ構築中に例外が発生した場合、その`variant`オブジェクトは値を保持しない状態になる
    - `t.`[`index()`](index.md)を`j`、`Types...`の`j`番目の型を`Tj`として、型`Tj`のムーブ代入中に例外が発生した場合、型`Tj`のムーブ代入演算子が保証する例外安全性が定義する値の保持状態となり、`*this`の[`index()`](index.md)は`j`となる
- (3) :
    - `noexcept`演算子内部の式は、以下と等価となる：
        - [`is_nothrow_assignable_v`](/reference/type_traits/is_nothrow_assignable.md)`<Tj&, T> &&` [`is_nothrow_constructible_v`](/reference/type_traits/is_nothrow_constructible.md)`<Tj, T>`
    - 値を保持する`*this`に対して[`std::forward`](/reference/utility/forward.md)`<T>(rhs)`の代入中に例外が発生した場合、`*this`が保持する値と`rhs`の値は、代入式の例外安全性が保証する状態となり、[`valueless_by_exception()`](valueless_by_exception.md)は`false`となる
    - 保持する値の初期化中に例外が発生した場合、`variant`オブジェクトは値を保持しない可能性がある


## トリビアルに定義される条件
- (1) : `Types...`のすべての型`Ti`について、[`is_trivially_copy_constructible_v`](/reference/type_traits/is_trivially_copy_constructible.md)`<Ti> &&` [`is_trivially_copy_assignable_v`](/reference/type_traits/is_trivially_copy_assignable.md)`<Ti> &&` [`is_trivially_destructible_v`](/reference/type_traits/is_trivially_destructible.md)`<Ti>`が`true`であること
- (2) : `Types...`のすべての型`Ti`について、[`is_trivially_move_constructible_v`](/reference/type_traits/is_trivially_move_constructible.md)`<Ti> &&` [`is_trivially_move_assignable_v`](/reference/type_traits/is_trivially_move_assignable.md)`<Ti> &&` [`is_trivially_destructible_v`](/reference/type_traits/is_trivially_destructible.md)`<Ti>`が`true`であること


## delete定義される条件
- (1) : `Types...`のすべての型`Ti`について、[`is_copy_constructible_v`](/reference/type_traits/is_copy_constructible.md)`<Ti> &&` [`is_copy_assignable_v`](/reference/type_traits/is_copy_assignable.md)`<Ti>`が`true`でないこと


## 備考
- (3) : 以下のコードは不適格となる。第1テンプレート引数の型をとるコンストラクタオーバーロードと、第2テンプレート引数の型をとるコンストラクタオーバーロードが定義されるため、曖昧になる：
    ```cpp
    std::variant<std::string, std::string> v;
    v = "abc"; // コンパイルエラー！
    ```


## 例
### 基本的な使い方
```cpp example
#include <cassert>
#include <variant>

int main()
{
  // (1) コピー代入
  {
    std::variant<int, char, double> v1 = 1;
    std::variant<int, char, double> v2;
    v2 = v1;

    assert(std::holds_alternative<int>(v1));
    assert(std::holds_alternative<int>(v2));
    assert(std::get<int>(v1) == 1);
    assert(std::get<int>(v2) == 1);
  }

  // (2) ムーブ代入
  {
    std::variant<int, char, double> v1 = 1;
    std::variant<int, char, double> v2;
    v2 = std::move(v1);

    assert(std::holds_alternative<int>(v2));
    assert(std::get<int>(v2) == 1);
  }

  // (3) 型と値の切り替え
  {
    std::variant<int, char, double> v = 1;

    // 値を更新
    v = 2;

    // 保持する型を切り替え
    v = 'a';

    assert(std::holds_alternative<char>(v));
    assert(std::get<char>(v) == 'a');
  }
}
```
* std::holds_alternative[link /reference/variant/holds_alternative.md]
* std::get[link get.md]
* std::move[link /reference/utility/move.md]

#### 出力
```
```


### あいまいになりそうな代入の例 (C++20)
```cpp example
#include <cassert>
#include <variant>
#include <string>

int main()
{
  // 縮小変換 (narrowing conversion) は行われないので、
  // 0がfloat型に代入されたりはしない
  {
    std::variant<float, int> v;
    v = 0;
    assert(std::holds_alternative<int>(v));
  }

  {
    // 文字列リテラルは、C++17ではstd::stringよりもboolに優先的に変換されてしまう
    std::variant<std::string, bool> v;
    v = "abc";
    assert(std::holds_alternative<std::string>(v)); // C++17ではbool、C++20ではstd::string

    std::variant<std::string> v2;
    v2 = "abc";
    assert(std::holds_alternative<std::string>(v2));

    std::variant<std::string, bool> v3;
    v3 = std::string("abc"); // C++17/C++20でstd::string
    assert(std::holds_alternative<std::string>(v3));
  }
}
```
* std::holds_alternative[link /reference/variant/holds_alternative.md]

#### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0.1 [mark verified]
- [GCC](/implementation.md#gcc): 7.3 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0608R3 A sane variant converting constructor](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0608r3.html)
- [P0602R4 `variant` and `optional` should propagate copy/move triviality](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0602r4.html)
- [P2231R1 Missing `constexpr` in `std::optional` and `std::variant`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2231r1.html)
