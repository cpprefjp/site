# 定数評価での例外送出を許可 [P3068R6]
* cpp26[meta cpp]

<!-- start lang caution -->

このページはC++26に採用される見込みの言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++23まで、定数式内での例外送出、そのコードに到達した時点でコンパイルエラーとなっていた。

C++26からは定数式内での例外送出ができるようになり、ユーザーはその例外を捕捉できるようになる。

```cpp
consteval auto hello(std::string_view input) {
  if (input.empty()) {
      throw invalid_argument{"empty name provided"}; // C++23: このコードに到達した時点でthrow式側でコンパイルエラー
  }

  return concat_into_a_fixed_string("hello ",input);
}

const auto a = hello(""); // C++26: 呼び出し側でコンパイルエラー
const auto b = hello("Hana");

try {
  const auto c = hello(""); // C++26: 例外を捕捉
} catch (const validation_error&) {
  // everything is fine
}

// C++23: concat関数の深い場所にあるthrow式側でコンパイルエラー
// C++26: 呼び出し側で「文字列が長すぎる」のようなコンパイルエラーになる
const auto d = hello("Adolph Blaine Charles David Earl Frederick Gerald Hubert Irvin John Kenneth Lloyd Martin Nero Oliver Paul Quincy Randolph Sherman Thomas Uncas Victor William Xerxes Yancy Zeus");
```



## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++11 constexpr](/lang/cpp11/constexpr.md)
- [`std::exception`](/reference/exception/exception.md)
- [`std::nested_exception`](/reference/exception/nested_exception.md)
- [`std::bad_exception`](/reference/exception/bad_exception.md)
- [`std::uncaught_exceptions()`](/reference/exception/uncaught_exceptions.md)
- [`std::current_exception()`](/reference/exception/current_exception.md)
- [`std::rethrow_exception()`](/reference/exception/rethrow_exception.md)
- [`std::make_exception_ptr()`](/reference/exception/make_exception_ptr.md)
- [`std::throw_with_nested()`](/reference/exception/throw_with_nested.md)
- [`std::rethrow_if_nested()`](/reference/exception/rethrow_if_nested.md)
- [`std::bad_alloc`](/reference/new/bad_alloc.md)
- [`std::bad_array_new_length`](/reference/new/bad_array_new_length.md)
- [`std::bad_cast`](/reference/typeinfo/bad_cast.md)
- [`std::bad_typeid`](/reference/typeinfo/bad_typeid.md)
- [`<stdexcept>`](/reference/stdexcept.md)
- [`std::bad_expected_access`](/reference/expected/bad_expected_access.md)


## 参照
- [P3068R6 Allowing exception throwing in constant-evaluation](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3068r6.html)
