# print
* ostream[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  template <class... Args>
  void print(ostream& os,
             format_string<Args...> fmt,
             Args&&... args);             // (1) C++23
}
```
* format_string[link /reference/format/basic_format_string.md]
* ostream[link basic_ostream.md]

## 概要
書式指定で出力する。

書式は[`std::format()`](/reference/format/format.md)関数のページを参照。

この関数は、[`std::printf()`](/reference/cstdio/printf.md.nolink)関数ライクな書式指定で引数を文字列化して出力する。

- (1) : 指定した[`ostream`](basic_ostream.md)に、書式指定で出力する

この関数は、末尾に改行コードが付かないことに注意。改行コードを自動で付けたい場合は、[`std::println()`](println.md)関数を使用すること。

デフォルトの標準出力に出力したい場合は、[`<print>`](/reference/print.md)ヘッダの[`std::print()`](/reference/print/print.md)関数を使用すること。


## 効果
- (1) : 通常の文字列リテラルがUTF-8エンコーディングされている場合、以下と等価：
    ```cpp
    vprint_unicode(os, fmt.get(), make_format_args(std::forward<Args>(args)...));
    ```
    * vprint_unicode[link vprint_unicode.md]
    * fmt.get()[link /reference/format/format_string/get.md.nolink]
    * make_format_args[link /reference/format/make_format_args.md]

    - そうでなければ、以下と等価：
    ```cpp
    vprint_nonunicode(os, fmt.get(), make_format_args(std::forward<Args>(args)...));
    ```
    * vprint_nonunicode[link vprint_nonunicode.md]
    * fmt.get()[link /reference/format/format_string/get.md.nolink]
    * make_format_args[link /reference/format/make_format_args.md]


## 備考
- LinuxやmacOSといった環境では、通常の`char`配列の文字列リテラルはUTF-8にエンコーディングされる
- WindowsのVisual Studioにおいては、ソースコードと実行時文字集合をUTF-8にする[`/utf-8`オプション](https://learn.microsoft.com/en-us/cpp/build/reference/utf-8-set-source-and-executable-character-sets-to-utf-8?view=msvc-170)を使用することで、通常の`char`配列の文字列リテラルがUTF-8にエンコーディングされる
- 「通常の文字列リテラルがUTF-8エンコーディングされている場合」という仕様は、コードでは以下のように表現できる：
    ```cpp
    constexpr bool is_utf8() {
      const unsigned char micro[] = "\u00B5";
      return sizeof(micro) == 3 && micro[0] == 0xC2 && micro[1] == 0xB5;
    }

    template <typename... Args>
    void print(string_view fmt, const Args&... args) {
      if (is_utf8())
        vprint_unicode(fmt, make_format_args(args...));
      else
        vprint_nonunicode(fmt, make_format_args(args...));
    }
    ```
    * vprint_unicode[link vprint_unicode.md]
    * vprint_nonunicode[link vprint_nonunicode.md]


## 例
### 基本的な使い方
```cpp example
#include <iostream>

int main()
{
  std::print(std::cout, "Hello {} World\n", 42); // 標準出力に出力
  std::print(std::cerr, "Hello {} World\n", 42); // 標準エラーに出力
}
```
* std::print[color ff0000]

#### 出力
```
Hello 42 World
Hello 42 World
```

### 実行時の書式文字列を使用する (C++26)
```cpp example
#include <iostream>

int main()
{
  std::string fmt = "{}\n";
  std::print(std::cout, std::runtime_format(fmt), "Hello");
}
```
* std::runtime_format[link /reference/format/runtime_format.md]

#### 出力
```
Hello
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 19 [mark verified]
- [GCC](/implementation.md#gcc): 14 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 7 [mark verified]


## 関連項目
- [`std::format()`](/reference/format/format.md)
- [`std::runtime_format()`](/reference/format/runtime_format.md)
- [`std::println()`](println.md)


## 参照
- [P2093R14 Formatted output](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2093r14.html)
