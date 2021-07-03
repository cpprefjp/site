# format_to_n

* format[meta header]
* function template[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class Out, class... Args>
  format_to_n_result<Out> format_to_n(Out out, iter_difference_t<Out> n, format_string<Args...> fmt, const Args&... args); // (1)

  template<class Out, class... Args>
  format_to_n_result<Out> format_to_n(Out out, iter_difference_t<Out> n, wformat_string<Args...> fmt, const Args&... args); // (2)

  template<class Out, class... Args>
  format_to_n_result<Out> format_to_n(Out out, iter_difference_t<Out> n, const locale& loc, format_string<Args...> fmt, const Args&... args); // (3)

  template<class Out, class... Args>
  format_to_n_result<Out> format_to_n(Out out, iter_difference_t<Out> n, const locale& loc, wformat_string<Args...> fmt, const Args&... args); // (4)
}
```
* format_string[italic]
* wformat_string[italic]
* format_to_n_result[link format_to_n_result.md]
* locale[link /reference/locale/locale.md]

## 概要

書式文字列`fmt`に従ったフォーマットで`args...`の文字列表現を、最大で`n`文字だけ出力イテレーター`out`に出力する。

* (1): マルチバイト文字列版
* (2): ワイド文字列版
* (3): マルチバイト文字列版 (ロケール指定あり)
* (4): ワイド文字列版 (ロケール指定あり)

```cpp
char buffer[256];
auto [end, n] = format_to_n(buffer, size(buffer)-1, "The answer is {}.", 42);
*end = '\0';    // null文字は出力されない
cout << buffer; // The answer is 42.
```

## 適格要件

* 書式文字列は定数式であり、[`string_view`](/reference/string_view/basic_string_view.md)(ワイド文字列版は[`wstring_view`](/reference/string_view/basic_string_view.md))に暗黙変換できること。
* 書式文字列にエラーがないこと。例えば、
    * 閉じていないカッコなどの構文エラーがないこと。
    * 実際に渡している引数の型が書式文字列中の置換フィールドが要求する型に合うこと。

## テンプレートパラメータ制約

`charT`を`decltype(fmt)::value_type`として、

* `Out`は`OutputIterator<const charT&>`を満たす。

## 事前条件

`charT`を`decltype(fmt)::value_type`として、

* `out`は`OutputIterator<const charT&>`を満たす型の有効なオブジェクトである。
* `Args`のそれぞれの引数`Ti`に対応するフォーマッター`formatter<Ti, charT>`が`Formatter`要件を満たす。

## 戻り値

`format_to_n_result{out + M, N}` (ただし、`N` = `formatted_size(fmt, args...)` または `formatted_size(loc, fmt, args...)`、`M` = `min(max(n, 0), N)`)

## 例外

フォーマット実行時に失敗した場合、[`format_error`](format_error.md)を投げる。

## 備考

マルチバイト文字列、ワイド文字列の区別は、可変長引数部分で受け取れる文字列の型にも適用される。

## 例
```cpp example
#include <iostream>
#include <string>
#include <format>

int main()
{
  char buffer[256];
  auto [end, n] = std::format_to_n(buffer, std::size(buffer)-1, "The answer is {}.", 42);
  *end = '\0';
  std::cout << buffer << std::endl;
}
```

### 出力
```
The answer is 42.
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照

* [Working Draft, Standard for Programming Language C++ [format]](https://timsong-cpp.github.io/cppwp/format)
* [P0645R10 Text Formatting](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0645r10.html)
* [P2216R3 std::format improvements](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2216r3.html)
* [［C++］ std::formatあるいは{fmt}のコンパイル時フォーマット文字列チェックの魔術 - 地面を見下ろす少年の足蹴にされる私](https://onihusube.hatenablog.com/entry/2021/07/01/195912)
