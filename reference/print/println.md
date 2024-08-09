# println
* print[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  template <class... Args>
  void println(format_string<Args...> fmt,
               Args&&... args);             // (1) C++23

  void println();                           // (2) C++26

  template <class... Args>
  void println(FILE* stream,
               format_string<Args...> fmt,
               Args&&... args);             // (3) C++23

  void println(FILE* stream);               // (4) C++26
}
```
* format_string[link /reference/format/basic_format_string.md]
* FILE[link /reference/cstdio/file.md.nolink]

## 概要
書式指定で出力する。この関数は、出力の末尾に改行コードが自動で付加される。

書式は[`std::format()`](/reference/format/format.md)関数のページを参照。

この関数は、[`std::printf()`](/reference/cstdio/printf.md.nolink)関数ライクな書式指定で引数を文字列化して出力する。

- (1) : 標準出力に、書式指定で出力する
- (2) : 標準出力に改行コードを出力する
- (3) : 指定された[`FILE`](/reference/cstdio/file.md.nolink)に、書式指定で出力する
- (4) : 指定された[`FILE`](/reference/cstdio/file.md.nolink)に、改行コードを出力する

この関数は、末尾に改行コードが付くことに注意。改行コードが不要な場合は、[`std::print()`](print.md)関数を使用すること。

[`std::ostream`](/reference/ostream/basic_ostream.md)から派生したクラスオブジェクトに対して出力したい場合は、[`<ostream>`](/reference/ostream.md)ヘッダの[`std::println()`](/reference/ostream/println.md)関数を使用すること。


## 効果
- (1) : 以下と等価：
    ```cpp
    println(stdout, fmt, std::forward<Args>(args)...);
    ```
    * stdout[link /reference/cstdio/stdout.md.nolink]
    * std::forward[link /reference/utility/forward.md]

- (2) : 以下と等価：
    ```cpp
    println(stdout);
    ```
    * stdout[link /reference/cstdio/stdout.md.nolink]

- (3) : 以下と等価：
    ```cpp
    print(stream, "{}\n", format(fmt, std::forward<Args>(args)...));
    ```
    * print[link print.md]
    * format[link /reference/format/format.md]
    * std::forward[link /reference/utility/forward.md]

- (4) : 以下と等価：
    ```cpp
    print(stream, "\n");
    ```
    * print[link print.md]


## 例
### 基本的な使い方
```cpp example
#include <print>

int main()
{
  std::println("Hello {} World", 42);

  // 出力先を指定
  std::println(stdout, "Hello {} World", 42); // 標準出力に出力
  std::println(stderr, "Hello {} World", 42); // 標準エラーに出力
}
```
* std::println[color ff0000]

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
  std::println("Hello {} World", 42);

  // stdout / stderrはマクロとして定義される。
  // モジュールはマクロをエクスポートしないので、
  // stdout / stderrを使用する場合は<cstdio>をインクルードする必要がある
  std::println(stdout, "Hello {} World", 42);
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
  std::string fmt = "{}";
  std::println(std::runtime_format(fmt), "Hello");
}
```
* std::runtime_format[link /reference/format/runtime_format.md]

#### 出力
```
Hello
```


### 改行コードを出力する (C++26)
```cpp example
#include <print>

int main()
{
  std::print("abc");
  std::println(); // 改行コードのみを出力する
  std::print("{}", 123);
  std::println();
}
```
* std::print[link print.md]

#### 出力
```
abc
123
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
- [`std::print()`](print.md)


## 参照
- [P2093R14 Formatted output](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2093r14.html)
- [P3142R0 Printing Blank Lines with `println`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3142r0.pdf)
