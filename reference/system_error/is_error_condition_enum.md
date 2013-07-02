#is_error_condition_enum(C++11)
```cpp
namespace std {
  template <class T>
  struct is_error_code_enum : public false_type {};

  template <>
  struct is_error_condition_enum<errc> : true_type {};
}
```
* false_type[link /reference/type_traits/integral_constant-true_type-false_type.md]
* true_type[link /reference/type_traits/integral_constant-true_type-false_type.md]
* errc[link ./errc.md]


##概要
[`error_condition`](./error_condition.md)のエラー値として見なせる列挙型かどうかを判定する。 
`is_error_condition_enum`はデフォルトでは[`false_type`](/reference/type_traits/integral_constant-true_type-false_type.md)を継承し、`is_error_condition_enum<T>::value`は`false`となる。 

`is_error_condition_enum<T>::value == true`であることを要求する関数にユーザー定義の列挙型を渡したい場合は、
`is_error_condition_enum`クラスを特殊化し、[`true_type`](/reference/type_traits/integral_constant-true_type-false_type.md)を継承するよう特殊化する必要がある。

標準では、[`errc`](./errc.md)列挙型に対する[`true_type`](/reference/type_traits/integral_constant-true_type-false_type.md)の特殊化を提供する。


##例
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

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md)


##参照
