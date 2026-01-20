# formatted_size

* format[meta header]
* function template[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class... Args>
  size_t
    formatted_size(format_string<Args...> fmt,
                   Args&&... args);            // (1) C++20
  template<class... Args>
  constexpr size_t
    formatted_size(format_string<Args...> fmt,
                   Args&&... args);            // (1) C++26

  template<class... Args>
  size_t
    formatted_size(wformat_string<Args...> fmt,
                   Args&&... args);            // (2) C++20
  template<class... Args>
  constexpr size_t
    formatted_size(wformat_string<Args...> fmt,
                   Args&&... args);            // (2) C++26

  template<class... Args>
  size_t
    formatted_size(const locale& loc,
                   format_string<Args...> fmt,
                   Args&&... args);            // (3) C++20

  template<class... Args>
  size_t
    formatted_size(const locale& loc,
                   wformat_string<Args...> fmt,
                   Args&&... args);            // (4) C++20
}
```
* format_string[link basic_format_string.md]
* wformat_string[link basic_format_string.md]
* locale[link /reference/locale/locale.md]

## 概要

書式文字列`fmt`に従ったフォーマットで`args...`の文字列表現を格納するために必要な文字数を返す。

* (1): マルチバイト文字列版
* (2): ワイド文字列版
* (3): マルチバイト文字列版 (ロケール指定あり)
* (4): ワイド文字列版 (ロケール指定あり)

```cpp
formatted_size("The answer is {}.", 42); // => 17
```

## 適格要件

* 書式文字列は定数式であり、[`string_view`](/reference/string_view/basic_string_view.md)(ワイド文字列版は[`wstring_view`](/reference/string_view/basic_string_view.md))に暗黙変換できること。
* 書式文字列にエラーがないこと。例えば、
    * 閉じていないカッコなどの構文エラーがないこと。
    * 実際に渡している引数の型が書式文字列中の置換フィールドが要求する型に合うこと。

## 事前条件

`charT`を`decltype(fmt)::value_type`として、

* `Args`のそれぞれの引数`Ti`に対応するフォーマッター`formatter<remove_cvref_t<Ti>, charT>`が`BasicFormatter`要件を満たす。

## 戻り値

書式文字列`fmt`に従ったフォーマットで`args...`の文字列表現を格納するために必要な文字数。

## 例外

書式文字列が正しくなかったり、フォーマット実行時に失敗したりした場合、[`format_error`](format_error.md)を投げる。

## 備考

マルチバイト文字列、ワイド文字列の区別は、可変長引数部分で受け取れる文字列の型にも適用される。

## 例
```cpp example
#include <iostream>
#include <format>

int main()
{
  std::cout << std::formatted_size("The answer is {}.", 42) << std::endl;
}
```

### 出力
```
17
```

## 実装例

```cpp
template<class CharT>
class Counter {
  size_t count_ = 0;
public:
  using value_type = CharT;

  constexpr void push_back(const value_type&) {
    count_++;
  }

  constexpr size_t size() const {
    return count_;
  }
};

template<class Out, class... Args>
size_t formatted_size(format_string<Args...> fmt, const Args&... args) {
  Counter<char> counter;
  format_to(back_inserter(counter), fmt, forward<Args>(args)...);
  return counter.size();
}

template<class Out, class... Args>
size_t formatted_size(wformat_string<Args...> fmt, const Args&... args) {
  Counter<wchar_t> counter;
  format_to(back_inserter(counter), fmt, forward<Args>(args)...);
  return counter.size();
}

template<class Out, class... Args>
size_t formatted_size(const locale& loc, format_string<Args...> fmt, const Args&... args) {
  Counter<char> counter;
  format_to(loc, back_inserter(counter), fmt, forward<Args>(args)...);
  return counter.size();
}

template<class Out, class... Args>
size_t formatted_size(const locale& loc, wformat_string<Args...> fmt, const Args&... args) {
  Counter<wchar_t> counter;
  format_to(loc, back_inserter(counter), fmt, forward<Args>(args)...);
  return counter.size();
}
```
* format_string[link basic_format_string.md]
* wformat_string[link basic_format_string.md]
* format_to[link format_to.md]
* locale[link /reference/locale/locale.md]
* forward[link /reference/utility/forward.md]
* back_inserter[link /reference/iterator/back_inserter.md]

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照

- [Working Draft, Standard for Programming Language C++ [format]](https://timsong-cpp.github.io/cppwp/format)
- [P0645R10 Text Formatting](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0645r10.html)
- [P2216R3 std::format improvements](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2216r3.html)
- [［C++］ std::formatあるいは{fmt}のコンパイル時フォーマット文字列チェックの魔術 - 地面を見下ろす少年の足蹴にされる私](https://onihusube.hatenablog.com/entry/2021/07/01/195912)
- [P2418R2 Add support for `std::generator`-like types to `std::format`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2418r2.html)
- [P3391R2 `constexpr std::format`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3391r2.html)
    - C++26から非ロケール版が`constexpr`に対応した
