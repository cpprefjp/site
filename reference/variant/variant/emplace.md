# emplace
* variant[meta header]
* std[meta namespace]
* variant[meta class]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
template <class T, class... Args>
T& emplace(Args&&... args);                                        // (1) C++17
template <class T, class... Args>
constexpr T& emplace(Args&&... args);                              // (1) C++23

template <class T, class U, class... Args>
T& emplace(std::initializer_list<U> il, Args&&... args);           // (2) C++17
template <class T, class U, class... Args>
constexpr T& emplace(std::initializer_list<U> il, Args&&... args); // (2) C++23

template <std::size_t I, class... Args>
variant_alternative_t<I, variant<Types...>>&
  emplace(Args&&... args);                                         // (3) C++17
template <std::size_t I, class... Args>
constexpr variant_alternative_t<I, variant<Types...>>&
  emplace(Args&&... args);                                         // (3) C++23

template <std::size_t I, class U, class... Args>
variant_alternative_t<I, variant<Types...>>&
  emplace(std::initializer_list<U> il, Args&&... args);            // (4) C++17
template <std::size_t I, class U, class... Args>
constexpr variant_alternative_t<I, variant<Types...>>&
  emplace(std::initializer_list<U> il, Args&&... args);            // (4) C++23
```
* variant_alternative_t[link /reference/variant/variant_alternative.md]

## 概要
`variant`に代入する値を直接構築する。

- (1) : 候補型に含まれる`T`型のオブジェクトを、コンストラクタ引数`args...`から構築して保持する
- (2) : 候補型に含まれる`T`型のオブジェクトを、コンストラクタ引数`il`と`args...`から構築して保持する
- (3) : `I`番目の候補型オブジェクトを、コンストラクタ引数`args...`から構築して保持する
- (4) : `I`番目の候補型オブジェクトを、コンストラクタ引数`il`と`args...`から構築して保持する


## テンプレートパラメータ制約
- (1) :
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<T, Args...>`が`true`であること
    - `Types...`内に型`T`が一度だけ現れること
- (2) :
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<T,` [`std::initializer_list`](/reference/initializer_list/initializer_list.md)`<U>&, Args...>`が`true`であること
    - `Types...`内に型`T`が一度だけ現れること
- (3) :
    - `I < sizeof...(Types)`であること
    - `Types...`の`I`番目の型を`Ti`として、[`is_constructible_v`](/reference/type_traits/is_constructible.md)`<Ti, Args...>`が`true`であること
- (4) :
    - `I < sizeof...(Types)`であること
    - `Types...`の`I`番目の型を`Ti`として、[`is_constructible_v`](/reference/type_traits/is_constructible.md)`<Ti,` [`std::initializer_list`](/reference/initializer_list/initializer_list.md)`<U>&, Args...>`が`true`であること


## 効果
- (1) : `Types...`に含まれる型`T`のインデックスを`I`として、以下と等価：
    ```cpp
    return emplace<I>(std::forward<Args>(args)...);
    ```
    * std::forward[link /reference/utility/forward.md]

- (2) : `Types...`に含まれる型`T`のインデックスを`I`として、以下と等価：
    ```cpp
    return emplace<I>(il, std::forward<Args>(args)...);
    ```
    * std::forward[link /reference/utility/forward.md]

- (3) :
    - 値を保持している場合、破棄する
    - `Types...`の`I`番目の型を`Ti`として、`Ti`型オブジェクトをコンストラクタ引数[`std::forward`](/reference/utility/forward.md)`<Args>(args)...`で構築して保持する
- (4) :
    - 値を保持している場合、破棄する
    - `Types...`の`I`番目の型を`Ti`として、`Ti`型オブジェクトをコンストラクタ引数`il`と[`std::forward`](/reference/utility/forward.md)`<Args>(args)...`で構築して保持する


## 戻り値
新たに保持する値への参照を返す。


## 事後条件
- (3), (4) : [`index()`](index.md)が`I`であること


## 例外
- (1), (2), (3), (4) : 保持する値の初期化中に例外が発生する可能性があり、その後、`variant`オブジェクトは値を保持しない可能性がある


## 備考
- この関数は、テンプレート内で使用する場合に、`v.template emplace<T>(args...)`のようにtemplate限定子を指定する必要がある。


## 例
### 基本的な使い方
```cpp example
#include <cassert>
#include <variant>
#include <string>

int main()
{
  // (1)
  {
    std::variant<int, char, std::string> v;

    // vオブジェクト内でstd::stringオブジェクトを構築して保持
    std::string& s = v.emplace<std::string>(3, 'a');

    assert(s == "aaa");
    assert(std::get<std::string>(v) == "aaa");
  }

  // (2)
  {
    std::variant<int, char, std::string> v;

    std::allocator<char> alloc;
    v.emplace<std::string>({'H', 'e', 'l', 'l', 'o'}, alloc);

    assert(std::get<std::string>(v) == "Hello");
  }

  // (3)
  {
    std::variant<int, char, std::string> v;
    v.emplace<2>(3, 'a');

    assert(std::get<2>(v) == "aaa");
  }

  // (4)
  {
    std::variant<int, char, std::string> v;

    std::allocator<char> alloc;
    v.emplace<2>({'H', 'e', 'l', 'l', 'o'}, alloc);

    assert(std::get<2>(v) == "Hello");
  }
}
```
* emplace[color ff0000]
* std::get[link get.md]

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
  // 代入演算子、emplace<T>()、std::get<T>()、std::holds_alternative<T>()は使用できない。
  // in_place_index<I>を指定するコンストラクタ、emplace<I>()、std::get<I>(), index()は使用できる
  std::variant<std::string, std::string> v;
  v.emplace<0>("abc"); // OK
  std::string& s = std::get<0>(v);
  assert(s == "abc");

  //v.emplace<std::string>("abc"); // コンパイルエラー！
  //v = "abc"; // コンパイルエラー！
}
```
* emplace[color ff0000]
* std::get[link get.md]
* std::holds_alternative[link /reference/variant/holds_alternative.md]
* index()[link index.md]
* in_place_index[link /reference/utility/in_place_index_t.md]

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
- [P2231R1 Missing `constexpr` in `std::optional` and `std::variant`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2231r1.html)
