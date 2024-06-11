# get
* variant[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <size_t I, class... Types>
  constexpr variant_alternative_t<I, variant<Types...>>&
    get(variant<Types...>& v);                                   // (1)

  template <size_t I, class... Types>
  constexpr variant_alternative_t<I, variant<Types...>>&&
    get(variant<Types...>&& v);                                  // (2)

  template <size_t I, class... Types>
  constexpr const variant_alternative_t<I, variant<Types...>>&
    get(const variant<Types...>& v);                             // (3)

  template <size_t I, class... Types>
  constexpr const variant_alternative_t<I, variant<Types...>>&&
    get(const variant<Types...>&& v);                            // (4)

  template <class T, class... Types>
  constexpr T& get(variant<Types...>& v);                        // (5)

  template <class T, class... Types>
  constexpr T&& get(variant<Types...>&& v);                      // (6)

  template <class T, class... Types>
  constexpr const T& get(const variant<Types...>& v);            // (7)

  template <class T, class... Types>
  constexpr const T&& get(const variant<Types...>&& v);          // (8)
}
```
* size_t[link /reference/cstddef/size_t.md]
* variant_alternative_t[link /reference/variant/variant_alternative.md]

## 概要
`variant`オブジェクトから、指定したインデックスもしくは型の値を取得する。

- (1) : 非`const`左辺値の`variant`オブジェクトから、候補型のインデックスを指定して値を取得する
- (2) : 非`const`右辺値の`variant`オブジェクトから、候補型のインデックスを指定して値を取得する
- (3) : `const`左辺値の`variant`オブジェクトから、候補型のインデックスを指定して値を取得する
- (4) : `const`右辺値の`variant`オブジェクトから、候補型のインデックスを指定して値を取得する
- (5) : 非`const`左辺値の`variant`オブジェクトから、候補型を指定して値を取得する
- (6) : 非`const`右辺値の`variant`オブジェクトから、候補型を指定して値を取得する
- (7) : `const`左辺値の`variant`オブジェクトから、候補型を指定して値を取得する
- (8) : `const`右辺値の`variant`オブジェクトから、候補型を指定して値を取得する


## 要件
- (1), (2), (3), (4) : `I < sizeof...(Types)`であること。そうでなければプログラムは不適格となる
- (5), (6), (7), (8) : `Types...`内に型`T`が正確にひとつ含まれること。そうでなければプログラムは不適格となる


## 戻り値
- (1), (2), (3), (4) : [`v.index()`](index.md)と`I`が等値である場合、`variant`オブジェクトに保持されている`I`番目の候補型の値を返す。そうでなければ、[`std::bad_variant_access`](/reference/variant/bad_variant_access.md)例外を送出する
- (5), (6), (7), (8) : `v`が`T`型の値を保持している場合、その値への参照を返す。そうでなければ、[`std::bad_variant_access`](/reference/variant/bad_variant_access.md)例外を送出する


## 例外
- (1), (2), (3), (4) : 指定したインデックスの型が`v`オブジェクトに保持されていない場合、[`std::bad_variant_access`](/reference/variant/bad_variant_access.md)例外を送出する
- (5), (6), (7), (8) : 指定した型が`v`オブジェクトに保持されていない場合、[`std::bad_variant_access`](/reference/variant/bad_variant_access.md)例外を送出する

例外を投げる動作が好ましくない場合は[get_if()](get_if.md)を使用する。こちらの関数は例外を投げる代わりに`nullptr`を返す。


## 備考
- この関数がメンバ関数ではなく非メンバ関数として定義されているのは、ユーザーにtemplate限定子を指定させるのを避けるためである。メンバ関数にした場合、テンプレート内でその関数を使用すると、`v.template get<I>()`のようにtemplateキーワードをユーザーが指定しなければならない
- 同名の非メンバ関数`get()`がタプルインタフェースとして定義されているが、この関数はタプルインタフェースではない


## 例
```cpp example
#include <iostream>
#include <variant>
#include <string>

std::variant<int, char, std::string> make()
{
  return std::string{"hello"};
}

const std::variant<int, char, std::string> const_make()
{
  return std::string{"hello"};
}

int main()
{
  // (1)
  {
    std::variant<int, char, std::string> v = 3;

    // 保持している値の型はintなので、
    // 0番目 (int, char, stringの先頭インデックス) を指定して値を取り出す
    int& x = std::get<0>(v);
    std::cout << "(1) : " << x << std::endl;
  }

  // (2)
  {
    // variantの一時オブジェクトから、
    // 型のインデックスを指定して値を取り出す
    std::string x = std::get<2>(make());

    std::cout << "(2) : " << x << std::endl;
  }

  // (3)
  {
    const std::variant<int, char, std::string> v = 'a';

    // const左辺値参照のvariantオブジェクトを渡すと、
    // const左辺値参照の値が返る
    const char& x = std::get<1>(v);
    std::cout << "(3) : " << x << std::endl;
  }

  // (4)
  {
    // const付きのvariant一時オブジェクトを渡すと、
    // const右辺値参照の値が返る
    const std::string x = std::get<2>(const_make());

    std::cout << "(4) : " << x << std::endl;
  }

  // (5)
  {
    std::variant<int, char, std::string> v = 3;

    // 保持している型を指定して値を取り出す。
    int& x = std::get<int>(v);
    std::cout << "(5) : " << x << std::endl;

    // 以下のコードはコンパイルエラーになる。
    // variantのクラステンプレート引数に与えた型を、ここでは指定しなければならない
    // const int& y = std::get<const int>(v);
  }

  // (6)
  {
    // variantの一時オブジェクトから、
    // 型を指定して値を取り出す
    std::string x = std::get<std::string>(make());

    std::cout << "(6) : " << x << std::endl;
  }

  // (7)
  {
    const std::variant<int, char, std::string> v = 'a';

    // const左辺値参照のvariantオブジェクトを渡すと、
    // const左辺値参照の値が返る
    const char& x = std::get<char>(v);
    std::cout << "(7) : " << x << std::endl;
  }

  // (8)
  {
    // const付きのvariant一時オブジェクトを渡すと、
    // const右辺値参照の値が返る
    const std::string x = std::get<std::string>(const_make());

    std::cout << "(8) : " << x << std::endl;
  }
}
```
* std::get[color ff0000]

### 出力
```
(1) : 3
(2) : hello
(3) : a
(4) : hello
(5) : 3
(6) : hello
(7) : a
(8) : hello
```

### get関数をADLで呼び出す (C++20)
```cpp
#include <iostream>
#include <variant>

int main() {
  std::variant<int, char> v = 1;
  std::cout << get<int>(v) << std::endl; // C++17:NG C++20:OK
}
```

#### 出力
```
1
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0.1 [mark verified]
- [GCC](/implementation.md#gcc): 7.3 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [C++20 関数テンプレートに明示的に型指定した場合にADLで見つからない問題を修正](/lang/cpp20/adl_and_function_templates_that_are_not_visible.md)
