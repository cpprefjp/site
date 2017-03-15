# is_error_code_enum
* ios[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <>
  struct is_error_code_enum<io_errc> : public true_type { };
}
```
* is_error_code_enum[link /reference/system_error/is_error_code_enum.md]
* io_errc[link io_errc.md]
* true_type[link /reference/type_traits/true_type.md]

## 概要
[`io_errc`](io_errc.md)に対する`is_error_code_enum`の特殊化。
[`error_code`](/reference/system_error/error_code.md)のコンストラクタに`io_errc`の列挙値を指定するために使用する。
それによって`make_error_code()`の`io_errc`に対するオーバーロードが呼び出され、[`iostream_category()`](iostream_category.md)の`error_code`オブジェクトが生成される。


## 例
```cpp
#include <iostream> // 自動的に<ios>もインクルードされる

int main()
{
  std::error_code ec(std::io_errc::stream);
      // 内部でstd::make_error_code(std::io_errc::stream)が呼ばれる

  std::cout << ec.message() << std::endl;
}
```
* std::error_code[link /reference/system_error/error_code.md]
* std::io_errc::stream[link io_errc.md]
* ec.message()[link /reference/system_error/error_code/message.md]

### 出力例
```
iostream stream error
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc):
- [GCC, C++11 mode](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0


## 参照


