# get_if
* variant[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <size_t I, class... Types>
  constexpr add_pointer_t<variant_alternative_t<I, variant<Types...>>>
    get_if(variant<Types...>* v) noexcept;       // (1)

  template <size_t I, class... Types>
  constexpr add_pointer_t<const variant_alternative_t<I, variant<Types...>>>
    get_if(const variant<Types...>* v) noexcept; // (2)

  template <class T, class... Types>
  constexpr add_pointer_t<T>
    get_if(variant<Types...>* v) noexcept;       // (3)

  template <class T, class... Types>
  constexpr add_pointer_t<const T>
    get_if(const variant<Types...>* v) noexcept; // (4)
}
```
* size_t[link /reference/cstddef/size_t.md]
* variant_alternative_t[link /reference/variant/variant_alternative.md]
* add_pointer_t[link /reference/type_traits/add_pointer.md]

## 概要
`variant`オブジェクトから、指定したインデックスもしくは型の値を指すポインタを取得する。指定したインデックス/型の値を保持していない場合は例外を投げず、`nullptr`を返す。

- (1) : 非`const`左辺値の`variant`オブジェクトへのポインタから、候補型のインデックスを指定して、値を指すポインタを取得する
- (2) : `const`左辺値の`variant`オブジェクトへのポインタから、候補型のインデックスを指定して、値を指すポインタを取得する
- (3) : 非`const`左辺値の`variant`オブジェクトへのポインタから、候補型を指定して、値を指すポインタを取得する
- (4) : `const`左辺値の`variant`オブジェクトへのポインタから、候補型を指定して、値を指すポインタを取得する


## 要件
- (1), (2) : `I < sizeof...(Types)`であること。そうでなければプログラムは不適格となる
- (3), (4) : `Types...`内に型`T`が正確にひとつ含まれること。そうでなければプログラムは不適格となる


## 戻り値
- (1), (2) : [`v->index()`](index.md)と`I`が等値である場合、`variant`オブジェクトに保持されている`I`番目の候補型の値を指すポインタを返す。そうでなければ`nullptr`を返す
- (3), (4) : `v`が`T`型の値を保持している場合、その値を指すポインタを返す。そうでなければ`nullptr`を返す


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <variant>
#include <string>

int main()
{
  // (1)
  {
    std::variant<int, char, std::string> v = 3;

    // 保持している値の型はintなので、
    // 0番目 (int, char, stringの先頭インデックス) を指定して値を取り出す
    int* p = std::get_if<0>(&v);
    if (p) {
      std::cout << "(1) : " << *p << std::endl;
    }
    else {
      std::cout << "(1) : not found" << std::endl;
    }
  }

  // (2)
  {
    const std::variant<int, char, std::string> v = 'a';

    // const左辺値参照のvariantオブジェクトを渡すと、
    // const左辺値参照の値が返る
    const char* p = std::get_if<1>(&v);
    if (p) {
      std::cout << "(2) : " << *p << std::endl;
    }
    else {
      std::cout << "(2) : not found" << std::endl;
    }
  }

  // (3)
  {
    std::variant<int, char, std::string> v = 3;

    // 保持している型を指定して値を取り出す。
    int* p = std::get_if<int>(&v);
    if (p) {
      std::cout << "(3) : " << *p << std::endl;
    }
    else {
      std::cout << "(3) : not found" << std::endl;
    }

    // 以下のコードはコンパイルエラーになる。
    // variantのクラステンプレート引数に与えた型を、ここでは指定しなければならない
    // const int* q = std::get_if<const int>(v);
  }

  // (4)
  {
    const std::variant<int, char, std::string> v = 'a';

    // const左辺値参照のvariantオブジェクトを渡すと、
    // const左辺値参照の値が返る
    const char* p = std::get_if<char>(&v);
    if (p) {
      std::cout << "(4) : " << *p << std::endl;
    }
    else {
      std::cout << "(4) : not found" << std::endl;
    }
  }
}
```
* std::get_if[color ff0000]

### 出力
```
(1) : 3
(2) : a
(3) : 3
(4) : a
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0.1 [mark verified]
- [GCC](/implementation.md#gcc): 7.3 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??
