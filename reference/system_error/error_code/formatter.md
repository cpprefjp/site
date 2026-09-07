# formatter
* system_error[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp29[meta cpp]

```cpp
namespace std {
  template <class charT>
  struct formatter<error_code, charT>;
}
```

## 概要
[`error_code`](../error_code.md)クラスに対する[`std::formatter`](/reference/format/formatter.md)クラステンプレートの特殊化。

フォーマットフラグとしては、以下を使用できる：

```
[[fill] [align] [width]] [?] [s]
```

- デフォルトでは、[ストリーム出力](op_ostream.md)と同じ「カテゴリ名`:`エラー値」の形式（例：`generic:2`）で出力される
- `s`を指定すると、[`message()`](message.md)で得られるエラーメッセージが出力される
    - `charT`が`char`であり、通常の文字列リテラルのエンコーディングがUTF-8である場合、メッセージはUTF-8へ変換され、不正なバイト列はU+FFFD（置換文字）に置き換えられる
- `?`を指定すると、デバッグ出力としてエラーコード全体が引用符で囲まれたエスケープ文字列として出力される
    - カテゴリ名とエラー値を区切る`:`が、連想コンテナのフォーマット出力におけるキーと値の区切りの`:`と紛らわしくなることを避けられる


## 備考
- ストリーム出力の`operator<<`では、`std::setw()`などの入出力マニピュレータがカテゴリ名だけに適用されてしまう問題があった。この`formatter`特殊化では、幅や整列の指定はエラーコード全体に適用される
- エラー値のみを出力するためのフラグは提供されない。エラー値はカテゴリの情報がなければ有用性が低く、必要であれば`ec.`[`value()`](value.md)を直接フォーマットすればよいためである


## 例
```cpp
#include <format>
#include <iostream>
#include <system_error>

int main()
{
  std::error_code ec = std::make_error_code(std::errc::no_such_file_or_directory);

  std::cout << std::format("{}", ec) << std::endl;
  std::cout << std::format("[{:>12}]", ec) << std::endl;
  std::cout << std::format("{:?}", ec) << std::endl;
  std::cout << std::format("{:s}", ec) << std::endl;
}
```
* std::make_error_code[link /reference/system_error/make_error_code.md]
* std::errc[link /reference/system_error/errc.md]

### 出力例
```
generic:2
[   generic:2]
"generic:2"
No such file or directory
```


## バージョン
### 言語
- C++29

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`std::format()`](/reference/format/format.md) (フォーマットの詳細)
- [`operator<<`](op_ostream.md)


## 参照
- [P3395R6 Fix encoding issues and add a `formatter` for `std::error_code`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3395r6.html)
