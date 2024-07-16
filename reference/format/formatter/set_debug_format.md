# set_debug_format
* format[meta header]
* function[meta id-type]
* std[meta namespace]
* formatter[meta class]
* cpp23[meta cpp]

```cpp
constexpr void
  formatter<char-or-string>::set_debug_format(); // (1)
```

## 概要
デバッグ出力を有効にする。

このメンバ関数は、[`std::format()`](/reference/format/format.md)関数の文字・文字列に対する書式として「? (デバッグ出力)」の指定をすることで自動的に呼び出される。デフォルトは無効である。

この機能が有効になることで、文字・文字列が引用符で囲まれ、エスケープシーケンスがエスケープされて出力される (例:`"\n"`は`"\"\n\""`となる)。

タプルおよびRangeの要素としての文字・文字列に対しては、デフォルトで有効であることに注意。


## 効果
デバッグ出力を有効にする。


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2286R8 Formatting Ranges](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2286r8.html)
- [P2585R1 Improve default container formatting](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2585r1.html)
    - C++23から、Range・コンテナ、`pair`、`tuple`のフォーマット出力、および文字・文字列のデバッグ指定 (`"?"`) が追加された
