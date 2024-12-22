# basic_common_reference
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class T, class U, template<class> class TQual, template<class> class UQual>
  struct basic_common_reference {};
}
```

## 概要

任意の2つのプログラム定義型について、[`common_reference`](common_reference.md)で共通の参照型を取得できるようにアダプトする。

## 特殊化

`basic_common_reference`は以下の条件を満たす場合に、型`T, U`を対象に取るものに限ってユーザー定義の特殊化が許可されている（`TQual, UQual`に対しては特殊化してはならない）。

- `T, U`の少なくとも片方はプログラム定義型に依存している
    - 「プログラム定義型に依存している」とは例えば、プログラム定義型に対する`vector`等の特殊化のこと
- `T, U`に対する[`decay`](/reference/type_traits/decay.md)の適用はともに恒等写像となる
    - `T, U`はともに配列型ではなく
    - `T, U`はともに関数型でもなく
    - `T, U`はともに参照型でもなく
    - `T, U`はともにCV修飾もされていない

そして、そのような特殊化は必ずしもメンバ型`type`を持たなくても構わない。もし`type`を定義する場合は`public`にただ一つだけ定義し、その型は`TQual<T>, UQual<U>`から明示的に変換可能な型である必要がある。  
なお、`TQual<T>, UQual<U>`はそれぞれ、使用時に`common_reference`に渡された実引数型の参照・CV修飾を対応する`T, U`にそのままコピーしたような型を示すエイリアステンプレートである。

そして、その特殊化は`T, U`の引数順を入れ替えても同じ結果を返す（対称性を持つ）必要がある。

上記のいずれかの規則に違反した特殊化を定義したとしてもコンパイルエラーにはならず、未定義動作を引き起こす。

なお、`common_type, basic_common_reference`以外の[`<type_traits>`](/reference/type_traits.md)内テンプレートに対するユーザー定義の特殊化は許可されていない。

## 例
```cpp example
#include <iostream>
#include <type_traits>
#include <concepts>

//共通の参照型を作るための基底型
struct B {};

//std::common_referenceにアダプトしたい2つの型
struct T : B {};
struct U : B {};

//std::common_referenceおよびstd::common_reference_withにアダプトする
namespace std {
  template<template<class> class TQual, template<class> class UQual>
  struct basic_common_reference<T, U, TQual, UQual> {
    using type = B&;
  };

  //対称性のために引数順を逆にしたものも定義する
  template<template<class> class TQual, template<class> class UQual>
  struct basic_common_reference<U, T, TQual, UQual> {
    using type = B&;
  };
}


int main()
{
  static_assert(std::same_as<std::common_reference_t<T, U>, B&>);
  static_assert(std::same_as<std::common_reference_t<U, T>, B&>);
}
```
* basic_common_reference[color ff0000]
* std::same_as[link /reference/concepts/same_as.md]
* std::common_reference_t[link common_reference.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark verified]

## 関連項目

- [`common_reference`](common_reference.md)
- [`common_reference_with`](/reference/concepts/common_reference_with.md)

## 参照

- [P0898R3 Standard Library Concepts](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0898r3.pdf)
- [P2655R0 `common_reference_t` of `reference_wrapper` Should Be a Reference Type](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2655r0.html)
    - `T&`と`reference_wrapper<T>`の`common_reference`を`T&`にするための`basic_common_reference`特殊化の例
