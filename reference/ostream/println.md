# println
* ostream[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  template <class... Args>
  void println(ostream& os,
               format_string<Args...> fmt,
               Args&&... args);             // (1) C++23
}
```
* format_string[link /reference/format/basic_format_string.md]
* ostream[link basic_ostream.md]

## 概要
書式指定で出力する。この関数は、出力の末尾に改行コードが自動で付加される。

書式は[`std::format()`](/reference/format/format.md)関数のページを参照。

この関数は、[`std::printf()`](/reference/cstdio/printf.md.nolink)関数ライクな書式指定で引数を文字列化して出力する。

- (1) : 指定した[`ostream`](basic_ostream.md)に、書式指定で出力する

この関数は、末尾に改行コードが付くことに注意。改行コードが不要な場合は、[`std::print()`](print.md)関数を使用すること。

デフォルトの標準出力に出力したい場合は、[`<print>`](/reference/print.md)ヘッダの[`std::println()`](/reference/print/println.md)関数を使用すること。


## 効果
- (1) : 以下と等価：
    ```cpp
    print(os, "{}\n", format(fmt, std::forward<Args>(args)...));
    ```
    * print[link print.md]
    * format[link /reference/format/format.md]
    * std::forward[link /reference/utility/forward.md]


## 例
### 基本的な使い方
```cpp example
#include <iostream>

int main()
{
  std::println(std::cout, "Hello {} World", 42); // 標準出力に出力
  std::println(std::cerr, "Hello {} World", 42); // 標準エラーに出力
}
```
* std::println[color ff0000]

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
  std::string fmt = "{}";
  std::println(std::cout, std::runtime_format(fmt), "Hello");
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
- [Clang](/implementation.md#clang): 19
- [GCC](/implementation.md#gcc): 14
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 7


## 関連項目
- [`std::format()`](/reference/format/format.md)
- [`std::runtime_format()`](/reference/format/runtime_format.md)
- [`std::print()`](print.md)


## 参照
- [P2093R14 Formatted output](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2093r14.html)
