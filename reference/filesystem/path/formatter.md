# formatter
* filesystem[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template <class charT>
  struct formatter<filesystem::path, charT>;
}
```

## 概要
`filesystem::path`クラスに対する[`std::formatter`](/reference/format/formatter.md)クラステンプレートの特殊化。

書式としては、以下を使用できる：

```
[[fill] align] [width] [?] [g]
```

* `fill` : アライメントに使う文字 (デフォルト: スペース)
* `align` : アライメント(デフォルトは型による)
    * `>` : 右寄せ
    * `<` : 左寄せ
    * `^` : 中央寄せ
* `width` : 幅 (アライメントもしくは0埋めの幅)
    * 置換フィールドを使って変数で指定できる
* `?` : デバッグ出力
    * 文字・文字列を引用符で囲み、エスケープシーケンスをエスケープして出力
* `g` : 環境非依存のパスフォーマット ([`generic_string()`](generic_string.md)) を使用する
    * これが指定されない場合は、プラットフォームごとのパスフォーマット ([`native()`](native.md)) を使用する


## 例
```cpp example
#include <print>
#include <filesystem>

namespace fs = std::filesystem;

int main() {
  fs::path a = "/a/b/c.txt";
  fs::path b = "multi\nline";
  fs::path c = "a\\b\\c.txt";

  // デフォルトフォーマットは、operator<<とちがって
  // 引用符で囲まずに出力する
  std::println("1 : {}", a);

  // デバッグ出力。
  // 引用符で囲み、エスケープシーケンスをエスケープして出力する
  std::println("2 : {:?}", a);
  std::println("3 : {:?}", b);

  // 環境非依存のパスフォーマット
  std::println("4 : {:g}", c);
  std::println("5 : {}", c);
}
```

### 出力例
```
1. /a/b/c.txt
2. "/a/b/c.txt"
3. "multi\nline"
4. a/b/c.txt
5. a\b\c.txt
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 20.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 14 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 10 [mark noimpl]


## 関連項目
- [`std::format()`](/reference/format/format.md) (フォーマットの詳細)


## 参照
- [P2845R8 Formatting of `std::filesystem::path`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2845r8.html)
