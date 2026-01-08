# basic_format_string
* format[meta header]
* class[meta id-type]
* std[meta namespace]
* cpp23[meta cpp]
* format_string,wformat_string[meta alias]

```cpp
namespace std {
  template <class charT, class... Args>
  struct basic_format_string;

  template <class... Args>
  using format_string = basic_format_string<char, type_identity_t<Args>...>;

  template <class... Args>
  using wformat_string = basic_format_string<wchar_t, type_identity_t<Args>...>;
}
```
* type_identity_t[link /reference/type_traits/type_identity.md]


## 概要
`basic_format_string`クラスは、コンパイル時の書式文字列を表すクラスである。

C++20までは説明専用クラス`basic-format-string`として定義されていたが、C++23からはユーザーが利用できる正式な機能として定義される。

このクラスは、書式文字列のコンパイル時チェックを行う。

```cpp
auto str = std::format("{:d}", "I am not a number"); // コンパイルエラー！
                                                     // 書式文字列は「d」で整数を要求しているが、引数として文字列が渡された
```

このクラスのコンストラクタは、パラメータの書式文字列と、クラステンプレートパラメータの`Args...`を照合し、

- 書式文字列の型チェック
- 開きカッコと閉じカッコの一致
- その他、型ごとに許可されたオプションが正しいか

などをチェックする。

C++23で説明専用クラスでなく正式な機能として定義されたことにより、以下のように書式化を含むロギングなどをユーザーが定義できるようになる。

```cpp
template <typename... Args>
void log(std::format_string<Args...> s, Args&&... args) {
  if (logging_enabled) {
    log_raw(std::format(s, std::forward<Args>(args)...));
  }
}
```
* std::format[link /reference/format/format.md]


## メンバ関数

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`(constructor)`](basic_format_string/op_constructor.md) | コンストラクタ | C++23 |
| [`get`](basic_format_string/get.md)                      | 書式文字列を取得する | C++23 |

## 例
```cpp example
#include <iostream>
#include <format>
#include <chrono>

thread_local bool logging_enabled = true;

// 現在時刻付きで、文字列フォーマットしてログ出力する
template <typename... Args>
void log(std::format_string<Args...> s, Args&&... args) {
  if (!logging_enabled) {
    return;
  }

  namespace chrono = std::chrono;
  auto now = chrono::floor<chrono::seconds>(chrono::system_clock::now());
  std::cout << std::format("{}: {}",
    chrono::zoned_time{"Asia/Tokyo", now},
    std::format(s, std::forward<Args>(args)...)
  ) << std::endl;
}

int main()
{
  log("Hello {} World", 42);
}
```
* std::format_string[color ff0000]
* chrono::system_clock[link /reference/chrono/system_clock.md]
* now[link /reference/chrono/system_clock/now.md]
* chrono::floor[link /reference/chrono/time_point/floor.md]
* chrono::zoned_time[link /reference/chrono/zoned_time.md]
* std::format[link /reference/format/format.md]

### 出力
```
2023-02-06 10:46:53 JST: Hello 42 World
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 13.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [P2508R1 Expose `std::basic-format-string<charT, Args...>`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2508r1.html)
