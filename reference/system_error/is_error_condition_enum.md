# is_error_condition_enum
* system_error[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_error_condition_enum : public false_type {};

  template <>
  struct is_error_condition_enum<errc> : true_type {};
}
```
* false_type[link /reference/type_traits/false_type.md]
* true_type[link /reference/type_traits/true_type.md]
* errc[link errc.md]


## 概要
[`error_condition`](error_condition.md)のエラー値として見なせる列挙型かどうかを判定する。

`is_error_condition_enum`はデフォルトでは[`false_type`](/reference/type_traits/false_type.md)を継承し、`is_error_condition_enum<T>::value`は`false`となる。

`is_error_condition_enum<T>::value == true`であることを要求する関数（[`error_condition`](error_condition.md) の[コンストラクタ](error_condition/op_constructor.md)、および、[代入演算子](error_condition/op_assign.md)）にユーザー定義の列挙型を渡したい場合は、`is_error_condition_enum`クラスを特殊化し、[`true_type`](/reference/type_traits/true_type.md)を継承するよう特殊化する必要がある。

標準では、[`errc`](errc.md)列挙型に対する[`true_type`](/reference/type_traits/true_type.md)の特殊化を提供する。


## 例
```cpp
#include <system_error>

enum class user_defined_error {
  success = 0,
  error = 1,
};

int main()
{
  static_assert(std::is_error_condition_enum<std::errc>::value, "");
  static_assert(!std::is_error_condition_enum<user_defined_error>::value, "");
}
```
* std::is_error_condition_enum[color ff0000]
* std::errc[link errc.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5.0, 3.6.0, 3.7.0, 3.8.0
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.4.7, 4.5.4, 4.6.4, 4.7.0, 4.7.3, 4.8.2, 4.9.0, 4.9.1, 4.9.2, 5.1.0, 5.2.0, 6.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp)


## 参照
- [`error_condition`](error_condition.md)
- [`error_condition`](error_condition.md)`::`[`error_condition`](error_condition/op_constructor.md)
- [`error_condition`](error_condition.md)`::`[`operator=`](error_condition/op_assign.md)
* [`errc`](errc.md)
- [`error_code`](error_code.md)
- [`is_error_code_enum`](is_error_code_enum.md)
