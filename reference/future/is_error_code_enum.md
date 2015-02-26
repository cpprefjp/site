#is_error_code_enum (C++11)
* future[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <>
  struct is_error_code_enum<future_errc> : public true_type { };
}
```
* is_error_code_enum[link /reference/system_error/is_error_code_enum.md]
* future_errc[link /reference/future/future_errc.md]
* true_type[link /reference/type_traits/integral_constant-true_type-false_type.md]

##概要
[`future_errc`](./future_errc.md)に対する`is_error_code_enum`の特殊化。
[`error_code`](/reference/system_error/error_code.md)のコンストラクタに[`future_errc`](./future_errc.md)の列挙値を指定するために使用する。それによって`make_error_code()`の[`future_errc`](./future_errc.md)に対するオーバーロードが呼び出され、[`future_category()`](./future_category.md)の[`error_code`](/reference/system_error/error_code.md)オブジェクトが生成される。


##例
```cpp
#include <iostream>
#include <future>
#include <string>

int main()
{
  std::error_code ec(std::future_errc::broken_promise);
      // 内部でstd::make_error_code(std::future_errc::broken_promise)が呼ばれる

  std::cout << ec.message() << std::endl;
}
```

###出力例
```
Broken promise
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0


##参照


