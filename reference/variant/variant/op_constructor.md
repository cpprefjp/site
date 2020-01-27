# コンストラクタ
* variant[meta header]
* std[meta namespace]
* variant[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
constexpr variant() noexcept(see below);                 // (1)
constexpr variant(const variant& other);                 // (2)
constexpr variant(variant&& other) noexcept(see below);  // (3)

template <class T>
constexpr variant(T&& t) noexcept(see below);            // (4)

template <class T, class... Args>
constexpr explicit variant(in_place_type_t<T>,
                           Args&&... args);              // (5)

template <class T, class U, class... Args>
constexpr explicit variant(in_place_type_t<T>,
                           initializer_list<U> il,
                           Args&&... args);              // (6)

template <size_t I, class... Args>
constexpr explicit variant(in_place_index_t<I>,
                           Args&&... args);              // (7)

template <size_t I, class U, class... Args>
constexpr explicit variant(in_place_index_t<I>,
                           initializer_list<U> il,
                           Args&&... args);              // (8)

template <class Alloc>
variant(allocator_arg_t,
        const Alloc& a);                                 // (9)

template <class Alloc>
variant(allocator_arg_t,
        const Alloc& a,
        const variant& other);                           // (10)

template <class Alloc>
variant(allocator_arg_t,
        const Alloc& a,
        variant&& other);                                // (11)

template <class Alloc, class T>
variant(allocator_arg_t,
        const Alloc& a,
        T&& x);                                          // (12)

template <class Alloc, class T, class... Args>
variant(allocator_arg_t,
        const Alloc& a,
        in_place_type_t<T> il,
        Args&&... args);                                 // (13)

template <class Alloc, class T, class U, class... Args>
variant(allocator_arg_t,
        const Alloc& a,
        in_place_type_t<T>,
        initializer_list<U> il,
        Args&&... args);                                 // (14)

template <class Alloc, size_t I, class... Args>
variant(allocator_arg_t,
       const Alloc& a,
       in_place_index_t<I>,
       Args&&... args);                                  // (15)

template <class Alloc, size_t I, class U, class... Args>
variant(allocator_arg_t,
        const Alloc& a,
        in_place_index_t<I>,
        initializer_list<U> il,
        Args&&... args);                                 // (16)
```
* size_t[link /reference/cstddef/size_t.md]
* initializer_list[link /reference/initializer_list/initializer_list.md]
* in_place_type_t[link /reference/utility/in_place_type_t.md]
* in_place_index_t[link /reference/utility/in_place_index_t.md]
* allocator_arg_t[link /reference/memory/allocator_arg_t.md]

## 概要
`variant`オブジェクトを構築する。

- (1) : デフォルト構築。0番目の候補型の値を保持する
- (2) : コピーコンストラクタ
- (3) : ムーブコンストラクタ
- (4) : 候補型のいずれかの型の値を保持する
- (5) : 候補型のうち、指定した型のコンストラクタ引数を受け取ってコンストラクタ内でそのオブジェクトを構築して保持する
- (6) : 候補型のうち、指定した型のコンストラクタ引数`il`と`args...`を受け取ってコンストラクタ内でそのオブジェクトを構築して保持する
- (7) : 候補型のうち、指定したインデックスの型のコンストラクタ引数を受け取ってコンストラクタ内でそのオブジェクトを構築して保持する
- (8) : 候補型のうち、指定したインデックスの型のコンストラクタ引数`il`と`args...`を受け取ってコンストラクタ内でそのオブジェクトを構築して保持する
- (9)-(16) : (1)-(8)のuses-allocator構築版


## テンプレートパラメータ制約
- 候補型`Types...`のi番目の型を`Ti`とする
- (1) :
    - [`is_default_constructible_v`](/reference/type_traits/is_default_constructible.md)`<T0>`であること
- (2) :
    - 全ての型`Ti`について、[`is_copy_constructible_v`](/reference/type_traits/is_copy_constructible.md)`<Ti>`が`true`であること
- (3) :
    - 全ての型`Ti`について、[`is_move_constructible_v`](/reference/type_traits/is_move_constructible.md)`<Ti>`が`true`であること
- (4) :
    - C++17 : ここで説明用に、`*this`が保持している型`Tj`と、そのインデックス値`j`を定義する。`Types...`の各型`Ti`に対して擬似的な関数`FUN(Ti)`を定義したとして、`FUN(`[`std::forward`](/reference/utility/forward.md)`<T>(t))`呼び出しによって選択されたオーバー�ードされた関数のパラメータ型を、構築してその後含まれる値の型を`Tj`とする
    - C++20 : ここで説明用に、`*this`が保持している型`Tj`と、そのインデックス値`j`を定義する。`Types...`の各型`Ti`を、縮小変換を受け付けない型であり (`Ti x[] = {`[`std::forward`](/reference/utility/forward.md)`<T>(t)};`)、CV修飾付き`bool`の場合にCV修飾を外した`bool`型になるとして、その型に対して擬似的な関数`FUN(Ti)`を定義したとして、`FUN(`[`std::forward`](/reference/utility/forward.md)`<T>(t))`呼び出しによって選択されたオーバー�ードされた関数のパラメータ型を、構築してその後含まれる値の型を`Tj`とする
    - [`is_same_v`](/reference/type_traits/is_same.md)`<`[`decay_t`](/reference/type_traits/decay.md)`<T>, variant>`が`false`であること
    - 型[`decay_t`](/reference/type_traits/decay.md)`<T>`が[`in_place_type_t`](/reference/utility/in_place_type_t.md)および[`in_place_index_t`](/reference/utility/in_place_index_t.md)の特殊化ではないこと
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<Tj, T>`が`true`であること
    - 式`FUN(`[`std::forward`](/reference/utility/forward.md)`<T>(x))`が適格であること
- (5) :
    - `Types...`内に`T`が一度だけ現れること
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<T, Args...>`が`true`であること
- (6) :
    - `Types...`内に`T`が一度だけ現れること
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<T,` [`initializer_list`](/reference/initializer_list.md)`<U>&, Args...>`が`true`であること
- (7) :
    - `Types...`の`I`番目の型を`Ti`とする
    - `I < sizeof...(Types)`であること
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<Ti, Args...>`が`true`であること
- (8) :
    - `Types...`の`I`番目の型を`Ti`とする
    - `I < sizeof...(Types)`であること
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<Ti,` [`initializer_list`](/reference/initializer_list.md)`<U>&, Args...>`が`true`であること


## 効果
- (1) :
    - `T0`型を値初期化して保持する
- (2) :
    - `other`が値を保持している場合、`other.`[`index()`](index.md)を`j`として、[`get`](get.md)`<j>(other)`で得られた`other`が保持する値を直接初期化によって`*this`に保持する
    - そうでない場合、`*this`は値を保持しない
- (3) :
    - `other`が値を保持している場合、`other.`[`index()`](index.md)を`j`として、[`get`](get.md)`<j>(`[`std::move`](/reference/utility/move.md)`(other))`で得られた`other`が保持する値を直接初期化によって`*this`に保持する
    - そうでない場合、`*this`は値を保持しない
- (4) :
    - [`std::forward`](/reference/utility/forward.md)`<T>(t)`によって`Tj`型を直接構築して`*this`に保持する
- (5) :
    - [`std::forward`](/reference/utility/forward.md)`<Args>(args)...`をコンストラクタ引数として`T`型オブジェクトを直接構築して`*this`に保持する
- (6) :
    - `il`と[`std::forward`](/reference/utility/forward.md)`<Args>(args)...`をコンストラクタ引数として`T`型オブジェクトを直接構築して`*this`に保持する
- (7) :
    - [`std::forward`](/reference/utility/forward.md)`<Args>(args)...`をコンストラクタ引数として`Ti`型オブジェクトを直接構築して`*this`に保持する
- (8) :
    - `il`と[`std::forward`](/reference/utility/forward.md)`<Args>(args)...`をコンストラクタ引数として`Ti`型オブジェクトを直接構築して`*this`に保持する
- (9)-(16) :
    - uses-allocator構築すること以外は、対応するコンストラクタと�価


## 事後条件
- (1) :
    - [`valueless_by_exception()`](valueless_by_exception.md)が`false`であること
    - [`index()`](index.md)が`0`であること
- (4) :
    - [`std::holds_alternative`](/reference/variant/holds_alternative.md)`<Tj>(*this)`が`true`であること
- (5), (6) :
    - [`std::holds_alternative`](/reference/variant/holds_alternative.md)`<T>(*this)`が`true`であること
- (7), (8) :
    - [`index()`](index.md)が`I`であること


## 例外
- (1) :
    - `T0`型を値初期化した際、その型のコンストラクタによって任意の例外が送出される可能性がある
    - `noexcept`内の式は、[`is_nothrow_default_constructible_v`](/reference/type_traits/is_nothrow_default_constructible.md)`<T0>`と�価
- (2) :
    - 全ての型`Ti`の直接初期化が、任意の例外を送出する可能性がある
- (3) :
    - 全ての型`Ti`のムーブ構築が、任意の例外を送出する可能性がある
    - `noexcept`内の式は、全ての`Ti`についての[`is_nothrow_move_constructible_v`](/reference/type_traits/is_nothrow_move_constructible.md)`<Ti>`を論理積したものと�価
- (4) :
    - `Tj`の選択された初期化方法 (コンストラクタ) が任意の例外を送出する可能性がある
    - `noexcept`内の式は、[`is_nothrow_constructible_v`](/reference/type_traits/is_nothrow_constructible.md)`<Tj, T>`と�価となる
- (5), (6) :
    - 型`T`の選択されたコンストラクタが任意の例外を送出する可能性がある
- (7), (8) :
    - 型`Ti`の選択されたコンストラクタが任意の例外を送出する可能性がある


## 自明定義される条件
- (2) : 全ての`Ti`型について、[`is_trivially_copy_constructible_v`](/reference/type_traits/is_trivially_copy_constructible.md)`<Ti>`が`true`であること
- (3) : 全ての`Ti`型について、[`is_trivially_move_constructible_v`](/reference/type_traits/is_trivially_move_constructible.md)`<Ti>`が`true`であること


## 定数式に評価される条件
- (1) : `T0`型の値初期化が`constexpr`関数の要件を満たすこと
- (4) : 型`Tj`の選択された初期化方法 (コンストラクタ) が`constexpr`評価できること
- (5), (6) : 型`T`の選択されたコンストラクタが`constexpr`評価できること
- (7), (8) : 型`Ti`の選択されたコンストラクタが`constexpr`評価できること


## 備考
- (4) : 以下のコードは不適格となる。第1テンプレート引数の型をとるコンストラクタオーバー�ードと、第2テンプレート引数の型をとるコンストラクタオーバー�ードが定義されるため、曖昧になる：
    ```cpp
    std::variant<std::string, std::string> v("abc"); // コンパイルエラー！
    ```


## 例
### 基本的な使い方
```cpp example
#include <cassert>
#include <variant>
#include <string>

int main()
{
  // (1)
  // デフォルト構築
  {
    // 0番目の型 (ここではint) が値初期化される
    std::variant<int, char, double> v;

    assert(v.index() == 0);
    assert(std::holds_alternative<int>(v));
    assert(std::get<int>(v) == 0); // 値初期化されるのでゼ�初期化される (不定値にはならない)
  }

  // (2)
  // コピー構築
  {
    std::variant<int, char, double> a = 1;
    std::variant<int, char, double> b = a;

    assert(a == b);
    assert(std::holds_alternative<int>(a));
    assert(std::holds_alternative<int>(b));
  }

  // (3)
  // ムーブ構築
  {
    std::variant<int, char, double> a = 1;
    std::variant<int, char, double> b = std::move(a);

    assert(std::holds_alternative<int>(b));
    assert(std::get<int>(b) == 1);
  }

  // (4)
  // 候補型のうち、いずれかの型の値を代入
  {
    std::variant<int, char, double> v = 3.14;

    assert(std::holds_alternative<double>(v));
    assert(std::get<double>(v) == 3.14);
  }

  // (5)
  // 候補型のうち、いずれかの型のコンストラクタ引数をとって、
  // コンストラクタ内でその型のオブジェクトを構築して保持する
  {
    // コンストラクタ引数3と'a'を渡して、
    // コンストラクタ内でstd::string型オブジェクトを構築する
    std::variant<int, char, std::string> v{
      std::in_place_type<std::string>,
      3,
      'a'
    };

    assert(std::holds_alternative<std::string>(v));
    assert(std::get<std::string>(v) == "aaa");
  }

  // (6)
  // (5) とほぼ同じ。コンストラクタ引数の先�が初期化�リストの場合に、
  // こちらが呼ばれる。
  {
    std::allocator<char> alloc;
    std::variant<int, char, std::string> v{
      std::in_place_type<std::string>,
      {'H', 'e', 'l', 'l', 'o'},
      alloc
    };

    assert(std::holds_alternative<std::string>(v));
    assert(std::get<std::string>(v) == "Hello");
  }

  // (7)
  // 候補型のうち、I番目の型のコンストラクタ引数をとって、
  // コンストラクタ内でその型のオブジェクトを構築して保持する
  {
    // コンストラクタ引数3と'a'を渡して、
    // コンストラクタ内で2番目の型 (std::string) のオブジェクトを構築する
    std::variant<int, char, std::string> v{
      std::in_place_index<2>,
      3,
      'a'
    };

    assert(v.index() == 2);
    assert(std::holds_alternative<std::string>(v));
    assert(std::get<std::string>(v) == "aaa");
  }

  // (7)
  // (6) とほぼ同じ。コンストラクタ引数の先�が初期化�リストの場合に、
  // こちらが呼ばれる。
  {
    // コンストラクタ引数3と'a'を渡して、
    // コンストラクタ内で2番目の型 (std::string) のオブジェクトを構築する
    std::allocator<char> alloc;
    std::variant<int, char, std::string> v{
      std::in_place_index<2>,
      {'H', 'e', 'l', 'l', 'o'},
      alloc
    };

    assert(v.index() == 2);
    assert(std::holds_alternative<std::string>(v));
    assert(std::get<std::string>(v) == "Hello");
  }
}
```
* index()[link index.md]
* std::holds_alternative[link /reference/variant/holds_alternative.md]
* std::get[link get.md]
* std::move[link /reference/utility/move.md]
* std::in_place_type[link /reference/utility/in_place_type_t.md]
* std::in_place_index[link /reference/utility/in_place_index_t.md]

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
    std::variant<float, int> v = 0;
    assert(std::holds_alternative<int>(v));
  }

  {
    // 文�列リテラルは、C++17ではstd::stringよりもboolに優先的に変換されてしまう
    std::variant<std::string, bool> v = "abc";
    assert(std::holds_alternative<std::string>(v)); // C++17ではbool、C++20ではstd::string

    std::variant<std::string> v2 = "abc";
    assert(std::holds_alternative<std::string>(v2));

    std::variant<std::string, bool> v3 = std::string("abc"); // C++17/C++20でstd::string
    assert(std::holds_alternative<std::string>(v3));
  }
}
```
* std::holds_alternative[link /reference/variant/holds_alternative.md]

#### 出力
```
```


### 同じ型を複数指定できる状況の例
```cpp example
#include <cassert>
#include <variant>
#include <string>

int main()
{
  // インデックスを指定した代入なら、同じ型が複数現れてもよい。
  // 代入演算�、emplace<T>()、std::get<T>()、std::holds_alternative<T>()は使用できない。
  // emplace<I>()、std::get<I>(), index()は使用できる
  std::variant<std::string, std::string> v1 { // OK
    std::in_place_index<0>,
    "abc"
  };
  std::string& s = std::get<0>(v1);
  assert(s == "abc");

  //std::variant<std::string, std::string> v2 { // コンパイルエラー！
  //  std::in_place_type<std::string>,
  //  "abc"
  //};

  //std::variant<std::string, std::string> v3 = "abc"; // コンパイルエラー！
}
```
* std::get[link get.md]
* std::holds_alternative[link /reference/variant/holds_alternative.md]
* std::in_place_type[link /reference/utility/in_place_type_t.md]
* std::in_place_index[link /reference/utility/in_place_index_t.md]
* emplace[link emplace.md]
* index()[link index.md]

#### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0.1
- [GCC](/implementation.md#gcc): 7.3
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0608R3 A sane variant converting constructor](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0608r3.html)
