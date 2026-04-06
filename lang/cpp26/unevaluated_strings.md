# コンパイル時にのみ使用される文字列の扱いを明確化 [P2361R6]
* cpp26[meta cpp]

<!-- start lang caution -->

このページはC++26に採用される見込みの言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
文字列リテラルは、文字配列の初期化だけでなく、コンパイル時の診断メッセージやプリプロセッシング、その他の実装定義の動作にも使用される。これらのコンパイル時にのみ使用される文字列は「非評価文字列 (unevaluated string)」と呼ばれ、実行時のエンコーディングに変換されることはない。

C++26では、非評価文字列が使用される文脈を明確にし、これらの文字列に対して以下の制約を設ける：

- エンコーディングプレフィックス (`L`, `u`, `U`, `u8`) は許可されない
- 文字列は実行時エンコーディングに変換されない
- ユニバーサルキャラクタ名および (単純な) エスケープシーケンス (`\0`を除く) はUnicodeコードポイントに置換され、数値エスケープシーケンスなどその他のエスケープシーケンスは不適格となる

これらの変更は既存コードとの互換性を崩す変更 (破壊的変更) ではあるが、オープンソースプロジェクトの調査では、既存コードへの影響はほぼないとされている。


## 非評価文字列が使用される文脈

| 文脈 | 説明 |
|-----------|------|
| [`static_assert`](/lang/cpp11/static_assert.md) | 表明失敗時の診断メッセージ |
| [`[[deprecated]]`](/lang/cpp14/deprecated_attr.md) | 非推奨の理由メッセージ |
| [`[[nodiscard]]`](/lang/cpp17/nodiscard.md) | 戻り値無視時の警告メッセージ |
| [`= delete`](/lang/cpp26/delete_reason.md) | 削除された関数の診断メッセージ |
| `extern` | リンケージ指定の文字列 (例: `extern "C"`) |
| `_Pragma` | プリプロセッサプラグマの文字列 |
| `asm` | インラインアセンブリの文字列 |
| `#line` | 行番号ディレクティブのファイル名 |
| リテラル演算子 | ユーザー定義リテラルの接尾辞識別 |


## 仕様
### エンコーディングプレフィックスの禁止
非評価文字列には、エンコーディングプレフィックスを指定できない。

```cpp
// C++23まで: 実装定義の動作
// C++26: 不適格
static_assert(true, L"message");
static_assert(true, u8"message");

// C++26: OK
static_assert(true, "message");
```

### エスケープシーケンスの制限
非評価文字列では、ユニバーサルキャラクタ名 (`\uNNNN`, `\UNNNNNNNN`) と (単純な) エスケープシーケンス (`\\`, `\"`, `\n`など。ただし`\0`を除く) のみが許可される。数値エスケープシーケンス (`\x1B`, `\012`など) は不適格となる。

```cpp
// C++26: OK
static_assert(true, "hello\nworld"); // エスケープシーケンス
static_assert(true, "\u0041");       // ユニバーサルキャラクタ名

// C++26: 不適格 (数値エスケープシーケンス)
static_assert(true, "\x48\x65\x6c\x6c\x6f");
```

これは、コンパイラが非評価文字列を実行時エンコーディングに変換しないため、数値エスケープシーケンスによるコードユニットの直接指定が意味を持たないためである。


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++11 `constexpr`](/lang/cpp11/constexpr.md)
- [C++11 コンパイル時アサート](/lang/cpp11/static_assert.md)
- [C++14 `[[deprecated]]`属性](/lang/cpp14/deprecated_attr.md)
- [C++17 `[[nodiscard]]`属性](/lang/cpp17/nodiscard.md)
- [C++26 文字列リテラルの文字エンコーディング失敗を不適格とする](/lang/cpp26/making_non-encodable_string_literals_ill-formed.md)
- [C++26 `static_assert`の診断メッセージにユーザーが生成した文字列の指定を許可](/lang/cpp26/user-generated_static_assert_messages.md)


## 参照
- [P2361R6 Unevaluated Strings](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2361r6.pdf)
