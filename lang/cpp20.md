# C++20

## 概要
C++20とは、2020年中に改訂される予定の、C++バージョンの通称である。

このバージョンは、策定中はC++2aと呼ばれることがあった。「202a年にリリースされる」という伏せ字として「a」が使われているが、3年周期に次のバージョンが策定されることが決まっているため、伏せ字になっている年数がずれることはない。


## 言語機能

| 言語機能 | 説明 |
|----------|------|
| [ビットフィールドのメンバ変数初期化](cpp20/default_member_initializers_for_bit_fields.md) | ビットフィールドメンバ変数のデフォルト値を設定する構文を追加する |
| [ラムダ式のキャプチャとして`[=, this]`を許可する](cpp20/allow_lambda_capture_equal_this.md) | デフォルトコピーキャプチャと`this`ポインタのコピーキャプチャを両方指定できるようにする |
| [ジェネリックラムダのテンプレート構文](cpp20/familiar_template_syntax_for_generic_lambdas.md) | ジェネリックラムダでテンプレートパラメータを定義できるようにする |
| [`const`修飾されたメンバポインタの制限を修正](cpp20/fixing_const_qualified_pointers_to_members.md) | `.*`演算子での左辺値の`const`メンバ関数呼び出しを許可する |
| [可変引数が空でない場合のトークン置換](cpp20/va_opt.md) | プリプロセッサの置換で可変引数が空の場合に余計なカンマが付いてしまう問題に対処 |
| 指示付き初期化 | |
| コンセプト | |
| 範囲for文で初期化式を記述できるようにする | |
| 暗黙のラムダキャプチャを簡略化 | |
| 関数テンプレートに明示的に型指定した場合にADLで見つからない問題を修正 | |
| デフォルトのコピーコンストラクタと非`const`なコンストラクタが衝突する問題を修正 | |
| 評価されない文脈で`constexpr`関数が定数式評価されることを規定 | |
| 一貫性ある比較 | |
| ラムダ式の制約 | |
| 特殊化のアクセスチェック | |
| 状態を持たないラムダ式を、デフォルト構築可能、代入可能とする | |
| PODを非推奨化 | |
| 評価されない文脈でのラムダ式 | |
| [空オブジェクトを言語サポート](cpp20/language_support_for_empty_objects.md.nolink) | `[[no_unique_address]]`属性を導入し、空の型のオブジェクトをほかのオブジェクトと共有する最適化を許可する |
| [範囲for文がカスタマイゼーションポイントを見つけるルールを緩和](cpp20/relaxing_the_range_for_loop_customization_point_finding_rules.md) | `begin()`/`end()`メンバ関数のどちらかが見つからなかった場合に非メンバ関数の`begin()`/`end()`を探しにいく |
| [friend指定された関数内から構造化束縛を使用して非公開メンバ変数にアクセスすることを許可](cpp20/allow_structured_bindings_to_accessible_members.md.nolink) | 構造化束縛の仕様として公開メンバ変数のみを取り出せるようになっていたが、friend指定された関数からは非公開メンバ変数にもアクセスできるようにする |
| [構造化束縛がカスタマイゼーションポイントを見つけるルールを緩和](cpp20/relaxing_the_structured_bindings_customization_point_finding_rules.md.nolink) | 非テンプレートの`get()`メンバ関数が見つかった場合は、非メンバ関数の`get()`を探しにいく |
| [型の文脈で`typename`の省略を許可](cpp20/down_with_typename.md.nolink) | 型しか現れない文脈では、依存名を解決するための`typename`キーワードを省略できるようにする |
| [ラムダ式の初期化キャプチャでのパック展開を許可](cpp20/allow_pack_expansion_in_lambda_init_capture.md.nolink) | `[...args = std::move(args)]`のようなキャプチャを許可 |
| [当たる確率が高い分岐と、当たる確率が低い分岐をコンパイラに伝える属性を追加](cpp20/likely_and_unlikely_attributes.md.nolink) | コンパイラが分岐予測するためのヒントとする |
| [宇宙船演算子に対称性をもたせる](cpp20/symmetry_for_spaceship.md.nolink) | `a <=> b`が妥当であれば`b <=> a`も妥当とする |


## ライブラリ更新の概要
### 新ライブラリ
- [`<version>`](/reference/version.md.nolink)ヘッダを新設する。ここでは、実装依存の情報 (バージョンやリリース日付など) が標準ライブラリの実装によって定義される
- [`<chrono>`](/reference/chrono.md)ヘッダに、カレンダーとタイムゾーンの機能を拡張
- 任意のシーケンスの部分シーケンスを参照するライブラリとして[`<span>`](/reference/span.md.nolink)を追加
- 出力ストリームを同期するライブラリとして[`<syncstream>`](/reference/syncstream.md.nolink)を追加


### 取り決め
- `std`名前空間以下の関数テンプレートをユーザーが特殊化することを禁止する (参照 : [P0551R3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0551r3.pdf))


### アルゴリズム
- [`<algorithm>`](/reference/algorithm.md)の検索、ソート関係に`constexpr`を追加
- [`<numeric>`](/reference/numeric.md)の数値計算アルゴリズムをムーブに対応


### 並行処理
- [`std::atomic`](/reference/atomic/atomic.md)クラスのスマートポインタに対する特殊化を追加
- [`std::atomic`](/reference/atomic/atomic.md)クラスの浮動小数点数型に対する特殊化を追加
- [`std::memory_order`](/reference/atomic/memory_order.md)の列挙子にスコープをもたせた


### 入出力
- 同期ストリームの追加にともなって、[`<ostream>`](/reference/ostream.md)に、同期ストリーム関係の出力マニピュレータを追加


### スマートポインタ
- [`std::make_shared()`](/reference/memory/make_shared.md)と[`std::allocate_shared()`](/reference/memory/allocate_shared.md)を配列に対応
- ポインタを生ポインタに変換する[`std::to_address()`](/reference/memory/to_address.md)を追加


### ユーティリティ
- [`std::exchange()`](/reference/utility/exchange.md)関数に`constexpr`を追加
- [`std::complex`](/reference/complex.md)クラスを`constexpr`に対応


### 型特性
- [`<type_traits>`](/reference/type_traits.md)に、エンディアンを表す列挙型として[`std::endian`](/reference/type_traits/endian.md)を追加
- [`<type_traits>`](/reference/type_traits.md)に、型のCV修飾と参照を除去する型特性クラスとして[`std::remove_cvref`](/reference/type_traits/remove_cvref.md)を追加
