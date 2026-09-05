# 汎用的なソースコードのエンコーディングとしてUTF-8をサポート [P2295R6]
* cpp23[meta cpp]

<!-- start lang caution -->

このページはC++23に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++20まで、ソースコードの文字集合は実装定義だったが、その仕様では移植性に問題があった。C++23からは、すべてのコンパイラはUTF-8文字コードのソースコードをサポートしなければならないことが規定される。

コンパイラは、ほかの文字コードと区別するため、入力ファイルがUTF-8であることを決定する実装定義の手段をもたなければならない。つまり、BOM (バイトオーダーマーク) を認識するだけでは十分ではない。


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++26 基本文字集合に`@`、`$`、`` ` ``を追加](/lang/cpp26/add_atsign_dollar_graveaccent_to_the_basic_character_set.md)
- [C++29 数学互換記法の文字を識別子として許可](/lang/cpp29/adjust_identifier_following_new_Unicode_recommendations.md)


## 参照
- [P2295R6 Support for UTF-8 as a portable source file encoding](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2295r6.pdf)
