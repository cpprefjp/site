#default_error_condition
```cpp
error_condition default_error_condition() const noexcept;
```
* error_condition[link /reference/system_error/error_condition.md]

##概要

<b>包含しているエラー値とエラーカテゴリに対応するerror_conditionを構築</b>


##戻り値

[`category()`](/reference/system_error/error_code/category.md).[default_error_condition](./default_error_condition.md)([value()](/reference/system_error/error_code/value.md))

##例外

投げない

##備考
構築される[`error_condition`](/reference/system_error/error_condition.md)オブジェクトの[`value()`](/reference/system_error/error_condition/value.md)および[`category()`](/reference/system_error/error_condition/category.md)は、`default_error_condition()`関数内において対応するエラー値、カテゴリに変換される可能性がある(VC10, GCC 4.6.1では同じエラー値、同じカテゴリとなる)。


##例

```cpp
#include <iostream>
#include <system_error>
#include <string>

int main()
{
  std::error_code ec(static_cast<int>(std::errc::invalid_argument),
                     std::generic_category());

  std::error_condition ed = ec.default_error_condition();

  std::cout << ec.value() << std::endl;
  std::cout << ec.category().name() << std::endl;
  std::cout << ec.message() << std::endl;

  std::cout << std::endl;

  std::cout << ed.value() << std::endl;
  std::cout << ed.category().name() << std::endl;
  std::cout << ed.message() << std::endl;
}
```
* default_error_condition[color ff0000]

###出力例

```cpp
22
generic
Invalid argument

22
generic
Invalid argument
```

##バージョン


###言語


- C++11



###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) 10.0<h4>備考</h4>
(処理系やライブラリのバグや不完全な実装などをここに書く。なければ備考欄を削除)



##実装例

```cpp
```

##参照
```