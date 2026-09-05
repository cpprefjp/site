# C++29

## 概要
C++29とは、2029年中に改訂される予定の、C++バージョンの通称である。

このバージョンは、策定中のためC++2dと呼ばれることがある。「(2020年代の4つ目のバージョンが) 202d年にリリースされる」という伏せ字として「d」が使われているが、3年周期に次のバージョンが策定されることが決まっているため、伏せ字になっている年数がずれることはない。


## 言語機能
### 変数

| 言語機能 | 説明 |
|----------|------|
| [浮動小数点演算のオーバーフローと無限大・NaNの扱いを明確化](/lang/cpp29/clarify_the_behavior_of_floating-point_overflow.md) | 無限大を表現できる浮動小数点型では、オーバーフローは未定義動作ではなく無限大を生成すると規定する。オーバーフローやNaNを新たに生成する演算は定数式にならず、無限大・NaNの伝播は定数式として扱える |

### 文字列

| 言語機能 | 説明 |
|----------|------|
| [名前付きユニバーサルキャラクタ名で使用できる別名を拡張](/lang/cpp29/more_named_universal_character_escapes.md) | `\N{…}`に指定できる文字名の別名の分類制限を撤廃し、`\N{NBSP}`のような略称 (abbreviation) なども使用できるようにする |

### 制御構文

| 言語機能 | 説明 |
|----------|------|
| [`return_value`と`return_void`は排他的ではない](/lang/cpp29/return_value_and_return_void_are_not_mutually_exclusive.md.nolink) | コルーチンの`promise`型が`return_value`と`return_void`の両方を持つことを許容する |


### 関数

| 言語機能 | 説明 |
|----------|------|
| [ラムダ式のキャプチャが書かれた順に初期化されることを保証](/lang/cpp29/lexical_order_for_lambdas.md) | 明示的なキャプチャに対応するクロージャ型のメンバ変数が、キャプチャを書いた順に宣言・初期化され、逆順に破棄されることを保証する |
| [例外を送出しうる例外指定をもつ解放関数を不適格とする](/lang/cpp29/deallocation_functions_with_throwing_exception_specification_are_ill_formed.md) | `operator delete`などの解放関数に、`noexcept(false)`のような例外を送出しうる例外指定を付けることを不適格とする。解放関数からの例外送出による未定義動作へ到達する経路を、宣言の時点で排除する |

### クラス

| 言語機能 | 説明 |
|----------|------|
| [基底クラスのメンバ変数に対する指示付き初期化を許可](/lang/cpp29/designated-initializers_for_base_classes.md) | `B{.a=1, .b=2}`のように、集成体の指示付き初期化で基底クラスのメンバ変数を直接指定できるようにする。基底クラス部分を初期化する指示なし初期化子との混在も許可する |
| [後置インクリメント・デクリメント演算のdefault定義](/lang/cpp29/defaulting_postfix_increment_and_decrement_operations.md) | 後置`++`／`--`を`= default`で定義（前置版から自動生成）できるようにする |
| [default定義できる代入演算子のシグネチャを制限](/lang/cpp29/adding_restrictions_to_defaulted_assignment_operator_functions.md) | `A& operator=(const A&) && = default`のような右辺値修飾やCV修飾された代入演算子のdefault定義を不適格とする。これらの代入演算子を自分で定義することは引き続きできる |
| [仮想関数への事前条件・事後条件の指定を許可](/lang/cpp29/contracts_for_virtual_functions.md) | C++26で不適格とされていた、仮想関数への事前条件`pre`・事後条件`post`の指定を許可する。仮想関数呼び出しでは、静的に選択された関数と実際に呼び出される関数の両方のアサーションが評価される |

### テンプレート

| 言語機能 | 説明 |
|----------|------|
| [テンプレートに対する言語リンケージ](/lang/cpp29/language_linkage_for_templates.md.nolink) | テンプレートに`extern "C"`等の言語リンケージを適用する規則を整備する |
| [requires式の複合要件で条件付き`noexcept`指定を許可](/lang/cpp29/conditional_noexcept_specifiers_in_compound_requirements.md) | requires式の複合要件で、`{ 式 } noexcept(定数式)`形式の条件付き`noexcept`指定を書けるようにする |
| [テンプレートテンプレートパラメータのパックへのインデックスアクセスを許可](/lang/cpp29/pack_indexing_for_template_names.md) | テンプレートテンプレートパラメータのパックに`TT...[N]`形式でインデックスアクセスできるようにする |

### 定数式

| 言語機能 | 説明 |
|----------|------|
| [`consteval`時のみの値](/lang/cpp29/consteval-only_values.md.nolink) | `consteval`文脈でのみ存在・利用できる値の扱いを規定する |

### 並行・並列処理

| 言語機能 | 説明 |
|----------|------|
| [整数からポインタへの変換とポインタの由来の扱いを規定](/lang/cpp29/nondeterministic_pointer_provenance.md) | 整数からポインタへの変換では、その整数へ変換できるポインタ値のうち、プログラムの動作が定義される値が選択されると規定する |
| [無効なポインタ値の読み書き・コピーを定義された動作とする](/lang/cpp29/invalid_pointer_operations.md) | 無効なポインタ値の使用のうち、間接参照は未定義動作、比較などは処理系定義のままとし、読み込み・書き込み・コピーなどそれ以外の操作を定義された動作とする |
| [アトミック操作とvolatileアクセスでの無効なポインタ値の扱いを規定](/lang/cpp29/pointer_lifetime-end_zap_proposed_solutions.md) | アトミックポインタの操作やvolatileアクセスの結果が無効なポインタ値となる場合、整数への往復変換を経た有効なポインタ値になると規定する。解放と並行してポインタを扱うロックフリーアルゴリズムを定義された動作にする |

### プリプロセッサ

| 言語機能 | 説明 |
|----------|------|
| [`#embed`のオフセット引数](/lang/cpp29/embed_offset_parameter.md.nolink) | `#embed`にオフセット指定を追加し、埋め込むデータの開始位置を設定できるようにする |

### 未定義動作

| 言語機能 | 説明 |
|----------|------|
| [未定義動作とIFNDRの付録を整理](/lang/cpp29/undefined_behavior_and_ifndr_annexes.md.nolink) | 規格中のUBとIFNDR（診断不要の不適格）を付録として一覧化・整理する |

### ソースコード

| 言語機能 | 説明 |
|----------|------|
| [新しいUnicode勧告に従った識別子の調整](/lang/cpp29/adjust_identifier_following_new_Unicode_recommendations.md.nolink) | 識別子に使える文字を最新のUnicode勧告に合わせて調整する |



## ライブラリ更新の概要
### 整数
- 任意定義だった[`std::intptr_t`](/reference/cstdint/intptr_t.md) / [`std::uintptr_t`](/reference/cstdint/uintptr_t.md)型を必須定義とする

### 文字列
- [`std::format()`](/reference/format/format.md)関数での浮動小数点数の規定の出力形式を修正
    - これまでの既定書式が最短文字数を基準としていたため、`100000.0`→`"1e+05"`なのに`120000.0`→`"120000"`と一貫していない出力になっていたのを修正
    - また、大きな値で`1234567890123456774144`のような無意味な桁（garbage digits）がでる問題について、固定表記か指数表記かの切り替え基準を「値の大きさ（指数範囲 `[10⁻⁴, 10ⁿ)`）」に変更して修正した

### ビット操作
- [`<bit>`](/reference/bit.md)に、以下のビット操作関数を追加
    - ビット列の並びを反転する[`std::bit_reverse()`](/reference/bit/bit_reverse.md)関数
    - 指定した下位ビットパターンを繰り返す[`std::bit_repeat()`](/reference/bit/bit_repeat.md)関数
    - 指定したマスクで立っている一のビットを下位に詰める[`std::bit_compress()`](/reference/bit/bit_compress.md)関数
    - 下位ビットを指定したマスクが立っている位置へ展開する[`std::bit_expand()`](/reference/bit/bit_expand.md)関数
    - 未定義動作にならないビットシフト[`std::shl()`](/reference/bit/shl.md)関数と[`std::shr()`](/reference/bit/shr.md)関数

### コンテナ
- [`std::map`](/reference/map/map.md) / [`std::unordered_map`](/reference/unordered_map/unordered_map.md) / [`std::flat_map`](/reference/flat_map/flat_map.md)クラスに、[`std::optional`](/reference/optional/optional.md)`<要素への参照>`を返す検索メンバ関数`lookup()`を追加
- [`std::ranges::view_interface`](/reference/ranges/view_interface.md)クラスに、境界チェック付きでランダムアクセスをするメンバ関数[`at()`](/reference/ranges/view_interface/at.md)を追加
- [`std::mdspan`](/reference/mdspan/mdspan.md)クラス向けのアルゴリズムとして[`std::copy()`](/reference/mdspan/copy.md.nolink)と[`std::fill()`](/reference/mdspan/fill.md.nolink)を追加

### メモリ
- [`<memory>`](/reference/memory.md)ヘッダに、ポインタのタグ付けを行う[`std::pointer_tag_pair`](/reference/memory/pointer_tag_pair.md.nolink)クラスとその関連機能を追加

### エラーハンドリング
- [`std::error_code`](/reference/system_error/error_code.md)クラスのオブジェクトを文字列化する際の、カテゴリ名のエンコーディングの問題を修正し、[`std::format()`](/reference/format/format.md)用の`formatter`特殊化を追加

### 並行・並列
- [`std::thread`](/reference/thread/thread.md)クラスと[`std::jthread`](/reference/thread/jthread.md)クラスに、スレッド名とスタックサイズを設定する機能を追加
- SIMDデータ用に連番を生成する[`std::simd::iota`](/reference/simd/iota.md)変数テンプレートを追加
- [`<bit>`](/reference/bit.md)ヘッダと同様に、[`<simd>`](/reference/simd.md)ヘッダにも、以下のビット操作関数を追加
    - ビット列の並びを反転する[`std::simd::bit_reverse()`](/reference/simd/bit_reverse.md)関数
    - 指定した下位ビットパターンを繰り返す[`std::simd::bit_repeat()`](/reference/simd/bit_repeat.md)関数
    - 指定したマスクで立っている一のビットを下位に詰める[`std::simd::bit_compress()`](/reference/simd/bit_compress.md)関数
    - 下位ビットを指定したマスクが立っている位置へ展開する[`std::simd::bit_expand()`](/reference/simd/bit_expand.md)関数
    - 未定義動作にならないビットシフト[`std::simd::shl()`](/reference/simd/shl.md)関数と[`std::simd::shr()`](/reference/simd/shr.md)関数
- [`<hazard_pointer>`](/reference/hazard_pointer.md)に、複数のハザードポインタをまとめて構築・破棄する[`std::make_hazard_pointer_batch()`](/reference/hazard_pointer/make_hazard_pointer_batch.md)関数と[`std::clear_hazard_pointer_batch()`](/reference/hazard_pointer/clear_hazard_pointer_batch.md)関数を追加

### 非推奨化
- [`<iostream>`](/reference/iostream.md)において、`signed char` / `unsigned char`の入出力を非推奨化。[`std::int8_t`](/reference/cstdint/int8_t.md) / [`std::uint8_t`](/reference/cstdint/uint8_t.md)の別名として扱われるこれらの型の入出力で、整数型であることを期待して予期せぬ結果を招く可能性があった
