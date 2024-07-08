# noexcept付きのラムダ式から変換する関数ポインタにnoexceptを付加する
* cpp17[meta cpp]

<-- start lang caution -->

このページはC++17に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative_page)を参照してください。

<-- last lang caution -->

## 概要
キャプチャを持たない非ジェネリックなラムダ式は、関数ポインタに変換できる。そのラムダ式が例外を投げない指定をされていた場合、変換された関数ポインタもまた`noexcept`を持つ。

例外を投げない指定とは、以下のいずれかである：

- `noexcept`
- `noexcept(true)`
- `throw()` (C++17から非推奨)


## 例
```cpp example
#include <iostream>
#include <iomanip>

int main()
{
  int (*fp0)()          = []()          { return 0; };
  int (*fp1)() noexcept = []() noexcept { return 1; };

  std::cout << std::boolalpha;
  std::cout << noexcept(fp0()) << std::endl;
  std::cout << noexcept(fp1()) << std::endl;

  // noexcept付きラムダからnoexceptなし関数ポインタへは変換可能
  int (*fp2)() = []() noexcept { return 2; };

  // noexceptなしラムダからnoexcept付き関数ポインタへは変換不可
//int (*fp3)() noexcept = []() { return 3; };
}
```

### 出力
```
false
true
```


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++17 例外仕様を型システムの一部にする](exception_spec_be_part_of_the_type_system.md)
- [C++11 ラムダ式](/lang/cpp11/lambda_expressions.md)
- [C++14 ジェネリックラムダ](/lang/cpp14/generic_lambdas.md)


## 参照
- [CWG Issue 1722. Should lambda to function pointer conversion function be `noexcept`?](https://wg21.cmeerw.net/cwg/issue1722)
