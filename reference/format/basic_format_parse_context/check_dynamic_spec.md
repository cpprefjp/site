# check_dynamic_spec
* format[meta header]
* function template[meta id-type]
* std[meta namespace]
* basic_format_parse_context[meta class]
* cpp26[meta cpp]

```cpp
template<class... Ts>
constexpr void check_dynamic_spec(size_t id) noexcept;
```

## 概要
動的な幅・精度の引数の型がコンパイル時に正しいか検証する。

この関数はコンパイル時の定数式としてのみ意味のある検証を行う。`id`に対応するフォーマット引数の型が`Ts...`のいずれかでなければ、呼び出しがコア定数式ではなくなり、コンパイルエラーとなる。

## 適格要件
- `Ts...`の型は一意であること
- `Ts...`の各型は、`bool`, `char_type`, `int`, `unsigned int`, `long long int`, `unsigned long long int`, `float`, `double`, `long double`, `const char_type*`, [`basic_string_view`](/reference/string_view/basic_string_view.md)`<char_type>`, `const void*` のいずれかであること

## 備考
`id >= num_args_`である場合、または`id`に対応するフォーマット引数の型が`Ts...`のいずれでもない場合、呼び出しはコア定数式ではない。

## 例
### 動的な幅指定の正しい使用
```cpp example
#include <format>
#include <iostream>

int main()
{
  // OK: 動的な幅に整数を指定
  std::cout << std::format("{:>{}}", "hello", 10) << std::endl;

  // OK: 引数番号を明示的に指定して動的な幅を使用
  std::cout << std::format("{0:>{1}}", "hello", 10) << std::endl;
}
```

#### 出力
```
     hello
     hello
```

### C++26でコンパイルエラーになる例 (C++23では実行時エラー)
```cpp
#include <format>
#include <string>

int main()
{
  // C++23: 実行時エラー
  // C++26: コンパイルエラー
  // 動的な幅に文字列を渡しているが、整数型が必要
  std::string s = std::format("{:>{}}", "hello", "10");
}
```

C++23まではフォーマット引数の型チェックが実行時に行われるため、動的な幅に`"10"`(文字列)を指定した場合は実行時に[`format_error`](/reference/format/format_error.md)例外が送出されていた。

C++26では、[`formatter`](/reference/format/formatter.md)の[`parse()`](/reference/format/formatter/parse.md)内で`check_dynamic_spec_integral()`が呼ばれることにより、コンパイル時に型の不一致が検出されるようになった。

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [P2757R3 Type-checking format args](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2757r3.html)
