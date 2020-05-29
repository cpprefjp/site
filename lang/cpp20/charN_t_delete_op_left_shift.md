# `char8_t`/`char16_t`/`char32_t`に対するostreamの`operator<<`のdelete宣言
* cpp20[meta cpp]

## 概要

[`char8_t`型の追加](char8_t.md)に伴って、次に示すようなコードに破壊的変更が生じてしまった。

```cpp
#include <iostream>
int main()
{
    std::cout << u8'x';    // C++17までは x と表示された。C++20では120と表示される
    std::cout << u8"text"; // C++20までは test と表示された。C++20では文字列先頭へのポインタが表示される
}
```

これは`char8_t`/`char16_t`/`char32_t`に対するostreamの`operator<<`が提供されないため、他のオーバーロードが選ばれるためにこのような直感に反する挙動が発生する。

そこで次のように`delete`指定された`operator<<`を追加することで不適格にし、このような直感的ではない挙動を避ける。

```cpp
namespace std {
    template<class traits>
    basic_ostream<char, traits>& operator<<(basic_ostream<char, traits>&, wchar_t) = delete;
    template<class traits>
    basic_ostream<char, traits>& operator<<(basic_ostream<char, traits>&, char8_t) = delete;
    template<class traits>
    basic_ostream<char, traits>& operator<<(basic_ostream<char, traits>&, char16_t) = delete;
    template<class traits>
    basic_ostream<char, traits>& operator<<(basic_ostream<char, traits>&, char32_t) = delete;
    template<class traits>
    basic_ostream<wchar_t, traits>& operator<<(basic_ostream<wchar_t, traits>&, char8_t) = delete;
    template<class traits>
    basic_ostream<wchar_t, traits>& operator<<(basic_ostream<wchar_t, traits>&, char16_t) = delete;
    template<class traits>
    basic_ostream<wchar_t, traits>& operator<<(basic_ostream<wchar_t, traits>&, char32_t) = delete;

    template<class traits>
    basic_ostream<char, traits>& operator<<(basic_ostream<char, traits>&, const wchar_t*) = delete;
    template<class traits>
    basic_ostream<char, traits>& operator<<(basic_ostream<char, traits>&, const char8_t*) = delete;
    template<class traits>
    basic_ostream<char, traits>& operator<<(basic_ostream<char, traits>&, const char16_t*) = delete;
    template<class traits>
    basic_ostream<char, traits>& operator<<(basic_ostream<char, traits>&, const char32_t*) = delete;
    template<class traits>
    basic_ostream<wchar_t, traits>& operator<<(basic_ostream<wchar_t, traits>&, const char8_t*) = delete;
    template<class traits>
    basic_ostream<wchar_t, traits>& operator<<(basic_ostream<wchar_t, traits>&, const char16_t*) = delete;
    template<class traits>
    basic_ostream<wchar_t, traits>& operator<<(basic_ostream<wchar_t, traits>&, const char32_t*) = delete;
}
```

## 備考

[機能テストマクロ](../../lang/cpp20/feature_test_macros.md.nolink)は`__cpp_lib_char8_t`で、値は`201907`。

## 関連項目

- [UTF-8エンコーディングされた文字の型として`char8_t`を追加](char8_t.md)
- [char16_tとchar32_t](/lang/cpp11/char16_32.md)
- [UTF-8文字列リテラル](/lang/cpp11/utf8_string_literals.md)
- [UTF-8文字リテラル](/lang/cpp17/utf8_character_literals.md)
- [ostream `operator<<`](/reference/ostream/basic_ostream/op_ostream_free.md)

## 参照

[P1423R3: char8_t backward compatibility remediation](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1423r3.html)
