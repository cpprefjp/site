# throw_with_nested
* exception[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  [[noreturn]] void throw_with_nested(T&& t); // (1) C++11
}
```

## 概要
現在処理中の例外を入れ子にした例外を送出する


## 事前条件
`U`を [`decay_t`](/reference/type_traits/decay.md)`<T>` として、型`U`がコピー構築可能（*Cpp17CopyConstructible*）の要件を満たすこと。


## 例外
`U`を [`decay_t`](/reference/type_traits/decay.md)`<T>` とする。

- [`is_class_v`](/reference/type_traits/is_class.md)`<U> && !`[`is_final_v`](/reference/type_traits/is_final.md)`<U> && !`[`is_base_of_v`](/reference/type_traits/is_base_of.md)`<`[`nested_exception`](nested_exception.md)`, U>`が`true`である場合、`U`と[`nested_exception`](nested_exception.md)の両方からpublic派生した未規定の型のオブジェクトを、`std::`[`forward`](/reference/utility/forward.md)`<T>(t)`から構築して送出する。
- そうでない場合、`std::`[`forward`](/reference/utility/forward.md)`<T>(t)`を送出する。


## 戻り値
この関数は決して返らない


## 例
```cpp example
#include <iostream>
#include <exception>
#include <memory>

struct inner_error : public std::exception {};
struct outer_error : public std::nested_exception {};

// 現在の例外を取得
template <class T>
std::shared_ptr<T> get_exception(std::exception_ptr ep)
{
  try {
    std::rethrow_exception(ep);
  }
  catch (T& e) {
    return std::shared_ptr<T>(new T(e));
  }
  catch (...) {}
  return nullptr;
}

// 入れ子になってる例外を取得
template <class T>
std::shared_ptr<T> get_nested_exception(std::nested_exception& ex)
{
  try {
    std::rethrow_if_nested(ex); // 入れ子になってる例外を送出
  }
  catch (T& e) {
    return std::shared_ptr<T>(new T(e));
  }
  catch (...) {}
  return nullptr;
}

int main()
{
  try {
    try {
      throw inner_error();
    }
    catch (...) {
      // inner_errorを入れ子にしてouter_errorを送出
      std::throw_with_nested(outer_error());
    }
  }
  catch (...) {
    // 外側の例外を取得
    if (std::shared_ptr<outer_error> outer = get_exception<outer_error>(std::current_exception())) {
      std::cout << "outer" << std::endl;

      // 入れ子になった例外を取得
      if (std::shared_ptr<inner_error> inner = get_nested_exception<inner_error>(*outer)) {
        std::cout << "inner" << std::endl;
      }
    }
  }
}
```
* std::throw_with_nested[color ff0000]
* std::exception[link exception.md]
* std::nested_exception[link nested_exception.md]
* std::exception_ptr[link exception_ptr.md]
* std::rethrow_if_nested[link rethrow_if_nested.md]
* std::current_exception()[link current_exception.md]

### 出力
```
outer
inner
```

## バージョン
### 言語
- C++11

### 処理系

- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2015 [mark verified]


## 関連項目
- [C++26 定数評価での例外送出を許可](/lang/cpp26/allowing_exception_throwing_in_constant-evaluation.md)


## 参照
- [P3842R2 A conservative fix for constexpr `uncaught_exceptions()` and `current_exception()`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3842r2.pdf)
    - C++26の策定中に`constexpr`が追加されたが、本提案文書により巻き戻された (C++29で再検討予定)
- [LWG Issue 2483. `throw_with_nested()` should use `is_final`](https://cplusplus.github.io/LWG/issue2483)
    - ラップするかどうかの判定に[`is_final`](/reference/type_traits/is_final.md)による条件が追加され、`final`指定されたクラスも引数に取れるようになった
    - この修正は欠陥報告(DR)であり、C++11以降に遡及して適用される。`final`指定されたクラスから派生した型を送出するという元の規定は実装不可能であり、処理系は当初から派生させずにそのまま送出していたため、これと異なる観測可能な挙動が出荷されていたわけではない
- [LWG Issue 2855. `std::throw_with_nested("string_literal")`](https://cplusplus.github.io/LWG/issue2855)
    - 判定に[`decay_t`](/reference/type_traits/decay.md)`<T>`を用いるよう変更され、文字列リテラルや関数など（配列型・関数型）を渡せることが明確化された
    - この修正は欠陥報告(DR)であり、C++11以降に遡及して適用される。配列型・関数型を排除していた元の要件は文言上の欠陥であり、処理系は当初から`decay`後の型で動作していたため
