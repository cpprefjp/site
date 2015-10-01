#is_error_code_enum
* system_error[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_error_code_enum : public false_type {};
}
```
* false_type[link /reference/type_traits/integral_constant-true_type-false_type.md]

##概要
[`error_code`](./error_code.md)のエラー値として見なせる列挙型かどうかを判定する。

`is_error_code_enum`はデフォルトでは[`false_type`](/reference/type_traits/integral_constant-true_type-false_type.md)を継承し、`is_error_code_enum<T>::value`は`false`となる。

`is_error_code_enum<T>::value == true`であることを要求する関数にユーザー定義の列挙型を渡したい場合は、`is_error_code_enum`クラスを特殊化し、[`true_type`](/reference/type_traits/integral_constant-true_type-false_type.md)を継承するよう特殊化する必要がある。標準では`is_error_code_enum<T>::value == true`となるような特殊化は提供しない。


##例
```cpp
#include <system_error>

enum class user_defined_error {
  success = 0,
  error = 1,
};

namespace std {
  template <>
  struct is_error_code_enum<user_defined_error> : true_type {};
}

int main()
{
  static_assert(!std::is_error_code_enum<std::errc>::value, "");
  static_assert(std::is_error_code_enum<user_defined_error>::value, "");
}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp):


##参照
