# print
* print[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  template <class... Args>
  void print(format_string<Args...> fmt,
             Args&&... args);             // (1) C++23

  template <class... Args>
  void print(FILE* stream,
             format_string<Args...> fmt,
             Args&&... args);             // (2) C++23
}
```
* format_string[link /reference/format/basic_format_string.md]
* FILE[link /reference/cstdio/file.md.nolink]

## 概要
書式指定で出力する。

書式は[`std::format()`](/reference/format/format.md)関数のページを参照。

この関数は、[`std::printf()`](/reference/cstdio/printf.md.nolink)関数ライクな書式指定で引数を文字列化して出力する。

- (1) : 標準出力に、書式指定で出力する
- (2) : 指定された[`FILE`](/reference/cstdio/file.md.nolink)に、書式指定で出力する

この関数は、末尾に改行コードが付かないことに注意。改行コードを自動で付けたい場合は、[`std::println()`](println.md)関数を使用すること。

[`std::ostream`](/reference/ostream/basic_ostream.md)から派生したクラスオブジェクトに対して出力したい場合は、[`<ostream>`](/reference/ostream.md)ヘッダの[`std::print()`](/reference/ostream/print.md)関数を使用すること。


## 効果
- (1) : 以下と等価：
    ```cpp
    print(stdout, fmt, std::forward<Args>(args)...);
    ```
    * stdout[link /reference/cstdio/stdout.md.nolink]
    * std::forward[link /reference/utility/forward.md]

- (2) : 通常の文字列リテラルがUTF-8エンコーディングされている場合、以下と等価：
    ```cpp
    vprint_unicode(stream, fmt.get(), make_format_args(std::forward<Args>(args)...));
    ```
    * vprint_unicode[link vprint_unicode.md]
    * fmt.get()[link /reference/format/format_string/get.md.nolink]
    * make_format_args[link /reference/format/make_format_args.md]
    * std::forward[link /reference/utility/forward.md]

    - そうでなければ、以下と等価：
    ```cpp
    vprint_nonunicode(stream, fmt.get(), make_format_args(std::forward<Args>(args)...));
    ```
    * vprint_nonunicode[link vprint_nonunicode.md]
    * fmt.get()[link /reference/format/format_string/get.md.nolink]
    * make_format_args[link /reference/format/make_format_args.md]
    * std::forward[link /reference/utility/forward.md]


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
#include <print>

int main()
{
  std::print("Hello {} World\n", 42);

  // 出力先を指定
  std::print(stdout, "Hello {} World\n", 42); // 標準出力に出力
  std::print(stderr, "Hello {} World\n", 42); // 標準エラーに出力
}
```
* std::print[color ff0000]

#### 出力
```
Hello 42 World
Hello 42 World
Hello 42 World
```

### モジュールをインポートする例
```cpp example
import std;
#include <cstdio>

int main()
{
  std::print("Hello {} World\n", 42);

  // stdout / stderrはマクロとして定義される。
  // モジュールはマクロをエクスポートしないので、
  // stdout / stderrを使用する場合は<cstdio>をインクルードする必要がある
  std::print(stdout, "Hello {} World\n", 42);
}
```

#### 出力
```
Hello 42 World
Hello 42 World
```

### 実行時の書式文字列を使用する (C++26)
```cpp example
#include <print>

int main()
{
  std::string fmt = "{}\n";
  std::print(std::runtime_format(fmt), "Hello");
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
