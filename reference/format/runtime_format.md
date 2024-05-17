# runtime_format
* format[meta header]
* function template[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std {
  runtime-format-string<char>
    runtime_format(string_view fmt) noexcept;  // (1) C++26

  runtime-format-string<wchar_t>
    runtime_format(wstring_view fmt) noexcept; // (2) C++26
}
```
* runtime-format-string[link runtime-format-string.md]
* wstring_view[link /reference/string_view/basic_string_view.md]

## 概要
実行時文字列を書式文字列として使用できるようラップする。

このクラスは、[`std::string`](/reference/string/basic_string.md)や[`std::string_view`](/reference/string_view/basic_string_view.md)の文字列を、書式文字列として[`std::format()`](/reference/format/format.md)関数に指定するための型に変換する関数である。


## 戻り値
```cpp
return fmt;
```


## 例
```cpp example
#include <print>

int main()
{
  std::string fmt = "{}";

  std::string s = std::format(std::runtime_format(fmt), "Hello");
  std::println(std::runtime_format(fmt), s);
}
```
* std::runtime_format[color ff0000]
* std::format[link format.md]

### 出力
```
Hello
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 14
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`std::format()`](format.md)
- [`runtime-format-string`](runtime-format-string.md)
- [`std::basic_format_string`クラスのコンストラクタ](basic_format_string/op_constructor.md)


## 参照
- [P2918R2 Runtime format strings II](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2918r2.html)
