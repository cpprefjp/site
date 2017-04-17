# noexcept付きのラムダ式から変換する関数ポインタにnoexceptを付加する
* cpp17[meta cpp]

## 概要
キャプチャを持たない非ジェネリックなラムダ式は、関数ポインタに変換できる。そのラムダ式が例外を投げない指定をされていた場合、変換された関数ポインタもまた`noexcept`を持つ。

例外を投げない指定とは、以下のいずれかである：

- `noexcept`
- `noexcept(true)`
- `throw()` (C++17から非推奨)


## 例
```cpp
#include <iostream>

int main()
{
  int(*fp)() noexcept = []() noexcept { return 1; };

  std::cout << fp() << std::endl;
}
```

### 出力
```
1
```


## 関連項目
- [C++17 例外仕様を型システムの一部にする](exception_spec_be_part_of_the_type_system.md.nolink)
- [C++11 ラムダ式](/lang/cpp11/lambda_expressions.md)
- [C++14 ジェネリックラムダ](/lang/cpp14/generic_lambdas.md)


## 参照
- [CWG Issue 1722. Should lambda to function pointer conversion function be `noexcept`?](https://wg21.cmeerw.net/cwg/issue1722)

