# 条件式での構造化束縛の使用を許可 [P0963R3]
* cpp26[meta cpp]

<!-- start lang caution -->

このページはC++26に採用される見込みの言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++26では、`if`文、`while`文、`for`文、`switch`文の条件式において構造化束縛を使用できるようになる。

C++23までは、条件分岐文の初期化式で構造化束縛は使用できたが、その場合に条件式を別途指定する必要があった。C++26では構造化束縛した全体が`bool`型に変換可能であれば、条件式として構造化束縛を使用できるようになった。

```
// C++23
if (auto [to, ec] = std::to_chars(p, last, 42); ec == std::errc{}) {
  auto s = std::string(p, to);
  …
}

// C++26
// std::to_charsの戻り値型であるstd::to_chars_resultは、
// boolへの変換演算子をもつ
if (auto [to, ec] = std::to_chars(p, last, 42)) {
  auto s = std::string(p, to);
  …
}
```
* std::to_chars[link /reference/charconv/to_chars.md]
* std::to_chars_result[link /reference/charconv/to_chars_result.md]
* std::errc[link /reference/system_error/errc.md]
* std::to_string[link /reference/string/to_string.md]

なお、条件分岐文での初期化式と、全体を`bool`変換する条件式は別で指定できる。

```cpp
#include <print>
#include <charconv>
#include <string_view>

int f() { return 123; }

int main()
{
  char out[50]{};
  auto begin = std::begin(out);
  auto end = std::end(out);

  if (int value = f(); auto [ptr, ec] = std::to_chars(begin, end, value)) {
    std::println("{}", std::string_view(begin, ptr - begin));
  }
  else {
    std::println("conversion failed.");
  }
}
```
* std::to_chars[link /reference/charconv/to_chars.md]

## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++17 構造化束縛](/lang/cpp17/structured_bindings.md)
- [C++17 `if`文と`switch`文の条件式と初期化を分離](/lang/cpp17/selection_statements_with_initializer.md)


## 参照
- [P0963R3 Structured binding declaration as a condition](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0963r3.html)
