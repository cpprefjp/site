# is_error_code_enum
* system_error[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_error_code_enum : public false_type {};

  template <class T>
  inline constexpr bool is_error_code_enum_v = is_error_code_enum<T>::value; // C++17
}
```
* false_type[link /reference/type_traits/false_type.md]

## 概要
[`error_code`](error_code.md)のエラー値として見なせる列挙型かどうかを判定する。

`is_error_code_enum`はデフォルトでは[`false_type`](/reference/type_traits/false_type.md)を継承し、`is_error_code_enum<T>::value`は`false`となる。

`is_error_code_enum<T>::value == true`であることを要求する関数（[`error_code`](error_code.md) の[コンストラクタ](error_code/op_constructor.md)、および、[代入演算�](error_code/op_assign.md)）にユーザー定義の列挙型を渡したい場合は、`is_error_code_enum`クラスを特殊化し、[`true_type`](/reference/type_traits/true_type.md)を継承するよう特殊化する必要がある。

標準では、[`io_errc`](../ios/io_errc.md)列挙型と[`future_errc`](../future/future_errc.md)列挙型に対する[`true_type`](/reference/type_traits/true_type.md)の特殊化を提供する。


## 例
```cpp example
#include <system_error>
#include <ios>
#include <future>

enum class user_defined_error {
  success = 0,
  error = 1,
};

int main()
{
  static_assert(std::is_error_code_enum<std::io_errc>::value, "");
  static_assert(std::is_error_code_enum<std::future_errc>::value, "");
  static_assert(!std::is_error_code_enum<user_defined_error>::value, "");
}
```
* std::is_error_code_enum[color ff0000]
* std::io_errc[link ../ios/io_errc.md]
* std::future_errc[link ../future/future_errc.md]
* std::future_errc[link ../future/future_errc.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5.0, 3.6.0, 3.7.0, 3.8.0
- [GCC](/implementation.md#gcc): 4.4.7, 4.5.4, 4.6.4, 4.7.0, 4.7.3, 4.8.2, 4.9.0, 4.9.1, 4.9.2, 5.1.0, 5.2.0, 6.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 


### 備考
GCC では、4.4 から `is_error_code_enum` が提供されているものの、[`future_errc`](../future/future_errc.md) は 4.5 から、[`io_errc`](../ios/io_errc.md) は 5.1 からのサポートである。


## 関連項目
- [`error_code`](error_code.md)
- [`error_code`](error_code.md)`::`[`error_code`](error_code/op_constructor.md)
- [`error_code`](error_code.md)`::`[`operator=`](error_code/op_assign.md)
* [`future_errc`](../future/future_errc.md)
* [`io_errc`](../ios/io_errc.md)
- [`error_condition`](error_condition.md)
- [`is_error_condition_enum`](is_error_condition_enum.md)


## 参照
- [P0006R0 Adopt Type Traits Variable Templates from Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0006r0.html)
