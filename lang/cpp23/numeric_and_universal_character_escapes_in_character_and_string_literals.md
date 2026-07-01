# 文字・文字列リテラル中の数値・ユニバーサルキャラクタのエスケープに関する問題解決 [P2029R4]
* cpp23[meta cpp]

<!-- start lang caution -->

このページはC++23に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
文字リテラル・文字列リテラル中の数値エスケープ (8進エスケープ`\ooo`、16進エスケープ`\xhh`) およびユニバーサルキャラクタ名 (`\u`、`\U`) の仕様には、いくつかの曖昧さや欠陥があった。この変更は、それらをコア言語の問題を解決する。主な内容は以下：

- 数値エスケープを`u8`/`u`/`U`文字リテラルでも使用できることを明確化する
- 数値エスケープは、リテラルの文字エンコーディングへの変換対象とならず、コードユニットの値を直接指定する
    - たとえば`u8"\xc3\x80"`は、2バイトのコードユニット列`0xC3, 0x80`をそのまま表す (`0xC3`や`0x80`を個別のコードポイントとみなしてUTF-8に再エンコードするわけではない)
- 複数のコードユニットを必要とする文字は、文字リテラルには書けないが文字列リテラルには書けることを明確化する
    - 文字リテラルにそのような文字を指定した場合は「非エンコード文字リテラル (non-encodable character literal) 」となり、条件付きサポートで型は`int`となる。
- 範囲外の数値エスケープの動作を規定する
    - 通常の文字・文字列リテラルおよびワイド文字・文字列リテラルにおいて、数値エスケープが指定する値がコードユニット型の表現範囲を超える場合、その値が対応する符号なし型の範囲に収まるなら整数変換と同様にコードユニットを初期化し、そうでなければ不適格とする

これらの仕様はGCCやClangの既存の実装に沿ったものであり、主にMicrosoft Visual C++の`u8`リテラルにおける数値エスケープの扱いに影響する。


## 例
```cpp example
#include <cstddef>

int main()
{
  // u8文字列リテラル中の16進エスケープは、UTF-8のコードユニット値を直接指定する
  // (ソースのコードポイントとして再エンコードされない)
  constexpr const char8_t a[] = u8"\xc3\x80"; // バイト列 0xC3, 0x80
  static_assert(sizeof(a) == 3);
  static_assert(a[0] == 0xC3 && a[1] == 0x80 && a[2] == u8'\0');

  // これはU+00C0 (À) のUTF-8エンコーディングと一致する
  constexpr const char8_t b[] = u8"À";
  static_assert(sizeof(b) == sizeof(a));
  static_assert(b[0] == a[0] && b[1] == a[1]);

  // 16進・8進エスケープはu8/u/U文字リテラルでも使用できる
  static_assert(u8'\x41' == u8'A');
}
```

### 出力
```
```


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++23 名前付きユニバーサルキャラクタ名](named_universal_character_escapes.md)
- [C++11 `char16_t`と`char32_t`](/lang/cpp11/char16_32.md)


## 参照
- [P2029R4 Proposed resolution for core issues 411, 1656, and 2333; numeric and universal character escapes in character and string literals](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2029r4.html)
    - CWG 411、CWG 1656、CWG 2333を解決するものとして、数値エスケープとユニバーサルキャラクタ名の仕様を整理した
