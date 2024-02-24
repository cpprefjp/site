# C++23

## 概要
C++23とは、2023年中に改訂される予定の、C++バージョンの通称である。

このバージョンは、策定中のためC++2bと呼ばれることがある。「(C++20である2020年の次の) 202b年にリリースされる」という伏せ字として「b」が使われているが、3年周期に次のバージョンが策定されることが決まっているため、伏せ字になっている年数がずれることはない。


## 言語機能
### 変数

| 言語機能 | 説明 |
|----------|------|
| [(符号付き)`size_t`リテラルのためのサフィックス](cpp23/literal_suffix_for_signed_size_t.md) | `42z`/`42Z`とすることで`size_t`に対応する符号付き整数型のリテラルとする |
| [暗黙的なムーブを簡略化](cpp23/simpler_implicit_move.md) | 参照を返す関数の`return`文で暗黙的にムーブされない問題を修正 |

これらに加えて、ライブラリ機能として拡張浮動小数点数型が定義された。[`<stdfloat>`](/reference/stdfloat.md)を参照。


### 関数

| 言語機能 | 説明 |
|----------|------|
| [スコープと名前ルックアップの仕様整理](cpp23/declarations_and_where_to_find_them.md.nolink) | 複雑で不完全になっているスコープと名前ルックアップの仕様を整理し、一部の問題を解決する |
| [無意味なexport宣言を禁止する](cpp23/meaningful_exports.md) | いくつかの不必要な宣言に対するモジュールexportを禁止する |


### 制御構文

| 言語機能 | 説明 |
|----------|------|
| [初期化文での型の別名宣言を許可](cpp23/extend_init_statement_to_allow_alias_declaration.md) | `for (using T = int; T e : v) {}`を許可 |
| [範囲for文が範囲初期化子内で生じた一時オブジェクトを延命することを規定](cpp23/lifetime_extension_in_range_based_for_loop.md) | 範囲初期化子内で生じた一時オブジェクトは範囲for文の終わりまで延命される |
| [複合文の末尾へのラベルを許可](cpp23/labels_at_the_end_of_compound_statements.md) | C互換のため、複合文の末尾でのgoto文のラベルを許可する |


### クラス

| 言語機能 | 説明 |
|----------|------|
| [自身のオブジェクトを明示的にパラメータとして指定する](cpp23/deducing_this.md.nolink) | メンバ関数が`*this`の型・オブジェクトをパラメータとしてとり、`*this`オブジェクトがconst/非const、左辺値/右辺値であるかをメンバ関数内で識別できるようにする |
| [アクセス制御の異なるメンバ変数のレイアウトを宣言順に規定](cpp23/make_declaration_order_layout_mandated.md) | アクセス制御の異なるメンバ変数のレイアウトは並び替えを許可されていたが宣言順に規定する |
| [添字演算子の多次元サポート](cpp23/multidimensional_subscript_operator.md) | `operator[](int x, int y, int z)`のように添字演算子のオーバーロードで複数のパラメータをとることを許可 |
| [`this`ポインタをもつ必要のない演算子を`static`として宣言できるようにする](cpp23/static_operator.md) | 状態をもたないいくつかの演算子を`static`として宣言できるようにする |


### 文字列

| 言語機能 | 説明 |
|----------|------|
| [異なる文字エンコーディングをもつ文字列リテラルの連結を不適格とする](cpp23/mixed_string_literal_concatenation.md) | `auto a = u8"" L"";`のような異なる文字エンコーディング同士での文字列リテラルを連結を禁止する |
| [エスケープシーケンスの区切り](cpp23/delimited_escape_sequences.md) | エスケープシーケンスの範囲を明確にする構文を追加する |
| [文字・文字列リテラル中の数値・ユニバーサルキャラクタのエスケープに関する問題解決](cpp23/numeric_and_universal_character_escapes_in_character_and_string_literals.md.nolink) | |
| [1ワイド文字に収まらないワイド文字リテラルを禁止する](cpp23/remove_non_encodable_wide_character_literals_and_multicharacter_wide_character_literals.md) | エンコード結果として`wchar_t`の大きさに収まらないワイド文字リテラルを禁止する |
| [名前付きユニバーサルキャラクタ名](cpp23/named_universal_character_escapes.md) | 16進数のユニバーサルキャラクタだけでなく、その文字の名前を入力できるようにする |


### テンプレート

| 言語機能 | 説明 |
|----------|------|
| [変数テンプレートの部分特殊化を許可](cpp23/generalized_wording_for_partial_specializations.md) | 変数テンプレートの部分特殊化を許可するために部分特殊化の仕様を汎用化 |
| [継承コンストラクタからのクラステンプレート引数の推論](cpp23/class_template_argument_deduction_from_inherited.md) | 継承コンストラクタからもクラステンプレート引数を推論できるようにする |


### 定数式

| 言語機能 | 説明 |
|----------|------|
| [`if consteval`](cpp23/if_consteval.md) | コンパイル時の文脈かどうかで分岐させる |
| [定数式の文脈での`bool`への縮小変換を許可](cpp23/narrowing_contextual_conversions_to_bool.md) | `if constexpr(flags & Flags::Exec)`や`static_assert(N);`を許可 |
| [定数式内での非リテラル変数、静的変数・スレッドローカル変数およびgotoとラベルの存在を許可する](cpp23/non_literal_variables_in_constexpr_functions.md) | コンパイル時に評価されない限り、定数式内に静的変数・スレッドローカル変数およびgoto文とラベルを含むことを許可する |
| [静的な診断メッセージの文字エンコーディング](cpp23/character_encoding_of_diagnostic_text.md) | `static_assert`や`[[deprecated]]`などの診断メッセージの文字集合に関する要件をなくす |
| [`constexpr`関数が定数実行できない場合でも適格とする](cpp23/relaxing_some_constexpr_restrictions.md) | 定数式実行できない関数であっても、実際にコンパイル時に評価されない限り`constexpr`指定することを許可する |
| [`constexpr`関数内での`static constexpr`変数を許可](cpp23/permitting_static_constexpr_variables_in_constexpr_functions.md) | `constexpr`関数のローカルで定数を定義できるようにする |
| [`constexpr`関数内で`consteval`関数を呼び出せない問題を軽減](cpp23/consteval_needs_to_propagate_up.md) | `consteval`呼び出しを含む`constexpr`関数を条件付きで`consteval`関数とみなすようにする |


### ラムダ式

| 言語機能 | 説明 |
|----------|------|
| [ラムダ式で`()`を省略できる条件を緩和](cpp23/down_with_lambda_parens.md) | 修飾や戻り値型をともなってもパラメータリストが空であれば`()`を省略できる |
| [ラムダ式に対する属性](cpp23/attributes_on_lambda_expressions.md) | ラムダ式のいくつかの箇所に属性を記述できるようにする |


### 属性

| 言語機能 | 説明 |
|----------|------|
| [コード内容の仮定をコンパイラに伝えるassume属性](cpp23/portable_assumptions.md) | 最適化のために、コードの仮定をコンパイラに伝える属性を標準化する |


### プリプロセッサ

| 言語機能 | 説明 |
|----------|------|
| [文字リテラルエンコーディングを一貫させる](cpp23/consistent_character_literal_encoding.md) | プリプロセッサの条件式での文字リテラルの扱いをC++式と同様にする |
| [`elif`/`elifdef`/`elifndef`のサポートを追加](cpp23/add_support_for_preprocessing_directives_elifdef_and_elifndef.md) | `#if`/`#ifdef`/`#ifndef`に対応する複数条件命令のサポートを追加する |
| [`#warning`のサポートを追加](cpp23/warning.md) | 多くのC++コンパイラが実装していたプリプロセス時の警告`#warning message`を正式サポート |
| [汎用的なソースコードのエンコーディングとしてUTF-8をサポート](cpp23/support_for_utf8_as_a_portable_source_file_encoding.md) | すべてのコンパイラはUTF-8文字コードのソースコードをサポートしなければならない |


### 小さな変更

| 言語機能 | 説明 |
|----------|------|
| [参照するPOSIX規格を更新](cpp23/update_normative_reference_to_posix.md) | 新しいPOSIX規格の機能を標準C++が参照していたため、参照するPOSIX規格のバージョンを更新 |
| [行末スペースを無視するよう規定](cpp23/trimming_whitespaces_before_line_splicing.md) | 行末が「<code>\ </code>」でおわっていた場合にMSVCは行の継続をしない実装になっていたため動作を共通化するため仕様を規定 |


## ライブラリ更新の概要
### 新ライブラリ

- C++標準ライブラリ全体のモジュールとして[`std`](/module/std.md)、C互換ライブラリ全体のモジュールとして[`std.compat`](/module/std.compat.md)を追加
- スタックトレースを取得するためのライブラリとして[`<stacktrace>`](/reference/stacktrace.md)を追加
- CとC++の間でのアトミック操作の相互運用のため、C互換ライブラリとして[`<stdatomic.h>`](/reference/stdatomic.h.md)を追加
- 外部から提供されるメモリバッファでストリーム処理を行うライブラリとして[`<spanstream>`](/reference/spanstream.md.nolink)を追加
- 正常値とエラー値のどちらかを持つクラスおよびライブラリとして[`<expected>`](/reference/expected.md)を追加
- 多次元配列ビューのライブラリとして[`<mdspan>`](/reference/mdspan.md)を追加
- ノードベースではないソート済みキーによる順序付き連想コンテナのライブラリとして、[`<flat_map>`](/reference/flat_map.md)と[`<flat_set>`](/reference/flat_set.md.nolink)を追加
- 書式指定で出力するライブラリとして[`<print>`](/reference/print.md)を追加
- コルーチンによるRangeの生成をサポートする[`<generator>`](/reference/generator.md)を追加
- 拡張浮動小数点数のライブラリとして[`<stdfloat>`](/reference/stdfloat.md)を追加


### コンテナ
- [`std::stack`](/reference/stack/stack.md)と[`std::queue`](/reference/queue/queue.md)に、イテレータのペアをとるコンストラクタを追加
- `auto v = std::vector(v, alloc);`のようなアロケータ引数をともなう場合のクラステンプレートのテンプレート引数推論が動作しなかったため、各コンテナクラスのコンストラクタにおけるアロケータパラメータの型を`const Allocator&`から`const` [`std::type_identity_t`](/reference/type_traits/type_identity.md)`<Allocator>&`に修正
- N要素のメモリアロケート時にアロケータが実際にどれくらいのメモリを確保したかを得られるインタフェースとして、[`std::allocator`](/reference/memory/allocator.md)クラスに、[`allocate_at_least()`](/reference/memory/allocator/allocate_at_least.md.nolink)メンバ関数を追加
- [`std::pair`](/reference/utility/pair.md)の転送コンストラクタにデフォルトテンプレート引数を追加することで、`{}`のような型推論ができない引数を渡した場合でも完全転送が行われるよう修正
- 順序付き連想コンテナの要素削除の処理について、一時オブジェクトのコストを抑える拡張が行われた
    - [`std::map::erase()`](/reference/map/map/erase.md)
    - [`std::map::extract()`](/reference/map/map/extract.md)
- [`<ranges>`](/reference/ranges.md)に、複数の範囲を綴じ合わせる[`std::views::zip`](/reference/ranges/zip_view.md.nolink)を追加
- [`<ranges>`](/reference/ranges.md)に、複数の範囲の直積をとる[`std::views::cartesian_product`](/reference/ranges/cartesian_product_view.md.nolink)を追加
- Rangeから任意のコンテナに変換するRangeアダプタ[`std::ranges::to()`](/reference/ranges/to.md)を追加
- Rangeから任意のコンテナに変換するために、可変長のコンテナ ([`std::array`](/reference/array/array.md)以外) に、以下の機能を追加：
    - Rangeから変換するコンストラクタ
    - Rangeを挿入する`insert_range()`メンバ関数
    - Rangeを先頭に追加する`prepend_range()`メンバ関数
    - Rangeを末尾に追加する`append_range()`メンバ関数
    - Rangeを代入する`assign_range()`メンバ関数
- ユーザー定義のRangeアダプタがパイプライン演算子 `|` をサポートしやすくするために、[`<ranges>`](/reference/ranges.md)に[`std::ranges::range_adaptor_closure`](/reference/ranges/range_adaptor_closure.md.nolink)クラスを追加
- [`<ranges>`](/reference/ranges.md)に、Rangeを連結させる[`join_with`](/reference/ranges/join_with.md.nolink)を追加
- Rangeを指定の大きさで分割する[`std::views::chunk`](/reference/ranges/chunk_view.md.nolink)と、Rangeを指定の大きさの隣接要素で分割する[`std::views::slide`](/reference/ranges/slide_view.md.nolink)を追加
- Rangeを条件一致する間の要素で分割する[`std::views::chunk_by`](/reference/ranges/chunk_by_view.md.nolink)を追加
- [`<ranges>`](/reference/ranges.md)に、Rangeを等間隔からなるRangeに変換する[`std::views::stride`](/reference/ranges/stride_view.md.nolink)を追加
- [`<ranges>`](/reference/ranges.md)に、Rangeをムーブするための[`std::views::as_rvalue`](/reference/ranges/as_rvalue_view.md)を追加
- [`<ranges>`](/reference/ranges.md)に、指定した値をN回繰り返すRangeを生成する[`std::views::repeat`](/reference/ranges/repeat_view.md)を追加
- [`<ranges>`](/reference/ranges.md)に、Rangeをインデックス付きでループさせる[`std::views::enumerate`](/reference/ranges/enumerate.md.nolink)を追加


### アルゴリズム
- [`<algorithm>`](/reference/algorithm.md)に、範囲の先頭が指定した範囲と合致するかを判定する[`std::starts_with()`](/reference/algorithm/starts_with.md.nolink)、範囲の末尾が指定した範囲と合致するかを判定する[`std::ends_with()`](/reference/algorithm/ends_with.md.nolink)を追加
- [`<algorithm>`](/reference/algorithm.md)に、要素を左シフトさせるRangeアルゴリズム[`std::ranges::shift_left()`](/reference/algorithm/ranges_shift_left.md)、要素を右シフトさせるRangeアルゴリズム[`std::ranges::shift_right()`](/reference/algorithm/ranges_shift_right.md)を追加
- [`<algorithm>`](/reference/algorithm.md)に、範囲の末尾から要素を検索する以下のアルゴリズムを追加：
    - [`std::ranges::find_last()`](/reference/algorithm/ranges_find_last.md.nolink)
    - [`std::ranges::find_last_if()`](/reference/algorithm/find_last_if.md.nolink)
    - [`std::ranges::find_last_if_not()`](/reference/algorithm/find_last_if_not.md.nolink)
- [`<algorithm>`](/reference/algorithm.md)に、範囲に特定の値が含まれているかを判定する[`std::ranges::contains()`](/reference/algorithm/ranges_contains.md.nolink)、[`std::ranges::contains_subrange`](/reference/algorithm/ranges_contains_subrange.md.nolink)を追加
- [`<algorithm>`](/reference/algorithm.md)に、数値に限定しない汎用的な畳み込みアルゴリズムとして、以下を追加：
    - [`std::ranges::fold_left()`](/reference/algorithm/ranges_fold_left.md)
    - [`std::ranges::fold_left_first()`](/reference/algorithm/ranges_fold_left_first.md)
    - [`std::ranges::fold_right()`](/reference/algorithm/ranges_fold_right.md)
    - [`std::ranges::fold_right_last()`](/reference/algorithm/ranges_fold_right_last.md)
    - [`std::ranges::fold_left_with_iter()`](/reference/algorithm/ranges_fold_left_with_iter.md)
    - [`std::ranges::fold_left_first_with_iter()`](/reference/algorithm/ranges_fold_left_first_with_iter.md)
- [`<numeric>`](/reference/numeric.md)に、連番を生成するRangeアルゴリズム[`std::ranges::iota()`](/reference/numeric/ranges_iota.md)を追加


### 文字列
- [`std::basic_string`](/reference/string/basic_string.md)クラスと[`std::basic_string_view`](/reference/string_view/basic_string_view.md)クラスに、文字列内に指定した文字・文字列が含まれているかを判定するメンバ関数`contains()`を追加
- [`std::basic_string_view`](/reference/string_view/basic_string_view.md)のコンストラクタに、範囲をとるオーバーロードを追加
- `std::string s = nullptr;`のような文字列オブジェクトに`nullptr`を代入するようなコードはバグの元であるため、[`std::basic_string`](/reference/string/basic_string.md)と[`std::basic_string_view`](/reference/string_view/basic_string_view.md)に、[`nullptr_t`](/reference/cstddef/nullptr_t.md)をとるコンストラクタをdelete定義として追加
- [`std::basic_string`](/reference/string/basic_string.md)クラスに、resize時に任意の初期化を行う[`resize_and_overwrite()`](/reference/string/basic_string/resize_and_overwrite.md.nolink)メンバ関数を追加
- [`std::basic_string`](/reference/string/basic_string.md)クラスのコンストラクタと[`substr()`](/reference/string/basic_string/substr.md)メンバ関数に一時オブジェクトのオーバーロードを追加
- [`std::format()`](/reference/format/format.md)関数でRange・コンテナ、[`std::tuple`](/reference/tuple/tuple.md)、[`std::pair`](/reference/utility/pair.md)を出力できるよう、[`std::formatter`](/reference/format/formatter.md)に特殊化を追加
    - Range・シーケンスコンテナは`[1, 2, 3]`、`["hello", "world"]`、`['a', 'b', 'c']`のように出力される
    - 連想コンテナの場合、`std::map<int, int>{{1, 2}, {3, 4}}`は`{1: 2, 3: 4}`のように出力され、`std::set<int>{1, 2, 3}`は`{1, 2, 3}`のように出力される
    - [`std::tuple`](/reference/tuple/tuple.md)、[`std::pair`](/reference/utility/pair.md)は`(1, 2)`のように出力される
- [`std::format()`](/reference/format/format.md)関数のフォーマット指定子としてデバッグ指定「`"?"`」を追加。これは文字・文字列を引用符で囲み、エスケープシーケンスをエスケープする
    - ただし、Range・コンテナ中の文字・文字列はデフォルトでエスケープされる
    - `format("{:?}", "h\tello")`は`"h\tello"`のように出力される


### 入出力
- [`std::basic_ostream`](/reference/ostream/basic_ostream.md)クラスの[`operator<<`](/reference/ostream/basic_ostream/op_ostream.md)に、`const volatile void*`をとるオーバーロードを追加
- ファイルを開く際のオプションとして、排他モードを表す[`noreplace`](/reference/ios/ios_base/type-openmode.md)を追加


### 関数オブジェクト
- [`std::invoke()`](/reference/functional/invoke.md)の戻り値型を指定するバージョンである[`std::invoke_r()`](/reference/functional/invoke_r.md)を追加
- [`std::function`](/reference/functional/function.md)クラスと等価な機能をもつ、ムーブのみ可能な[`std::move_only_function`](/reference/functional/move_only_function.md)クラスを追加
- ユーザー定義のRangeアダプタがパイプライン演算子 `|` をサポートしやすくするために、末尾から引数を束縛する[`std::bind_back()`](/reference/functional/bind_back.md.nolink)関数を追加


### メモリ
- [`<memory>`](/reference/memory.md)に、レガシーC関数からスマートポインタへの直接出力をサポートする、スマートポインタアダプタ[`std::out_ptr`](/reference/memory/out_ptr.md)と[`std::inout_ptr`](/reference/memory/inout_ptr.md)を追加
- [`std::unique_ptr`](/reference/memory/unique_ptr.md)クラスを`constexpr`に対応
- [`<memory>`](/reference/memory.md)に、オブジェクトの生存期間を開始することを明示する関数として、[`std::start_lifetime_as()`](/reference/memory/start_lifetime_as.md.nolink)と[`std::start_lifetime_as_array()`](/reference/memory/start_lifetime_as_array.md.nolink)を追加
- [`<bit>`](/reference/bit.md)に、値のバイト入れ替え (エンディアン変換) を行う[`std::byteswap()`](/reference/bit/byteswap.md)関数を追加


### ユーティリティ
- [`std::visit()`](/reference/variant/visit.md)に指定できるバリアントオブジェクトを、直接的な「[`std::variant`](/reference/variant/variant.md)型の特殊化であること」という制約を緩和し、[`std::variant`](/reference/variant/variant.md)から派生した型も許可
- [`<utility>`](/reference/utility.md)に、列挙値を基底型に変換する[`std::to_underlying()`](/reference/utility/to_underlying.md)関数を追加
- [`<utility>`](/reference/utility.md)に、 (主に) メンバ変数を転送するため、指定された型の`const`性と参照修飾で引数を転送する[`std::forward_like()`](/reference/utility/forward_like.md)関数を追加
- [`std::optional`](/reference/optional/optional.md)クラスにモナド操作としてメンバ関数[`and_then()`](/reference/optional/optional/and_then.md)、[`transform()`](/reference/optional/optional/transform.md)、[`or_else()`](/reference/optional/optional/or_else.md)を追加
- 到達しないパスであることを表明する関数[`std::unreachable()`](/reference/utility/unreachable.md)を追加
- [`std::bitset`](/reference/bitset/bitset.md)クラスをさらに`constexpr`対応


### 型情報
- [`std::type_info`](/reference/typeinfo/type_info.md)クラスの[`operator==`](/reference/typeinfo/type_info/op_equal.md)を`constexpr`に対応


### 型特性
- [`<type_traits>`](/reference/type_traits.md)に、スコープ付き列挙型かを判定する型特性[`std::is_scoped_enum`](/reference/type_traits/is_scoped_enum.md)を追加
- [`<type_traits>`](/reference/type_traits.md)に、第1テンプレート引数についている型修飾を外す型特性として、以下を追加：
- [`<type_traits>`](/reference/type_traits.md)に、一時オブジェクトの参照への束縛を検出するための型特性として、以下を追加：
    - [`std::reference_constructs_from_temporary`](/reference/type_traits/reference_constructs_from_temporary.md)
    - [`std::reference_converts_from_temporary`](/reference/type_traits/reference_converts_from_temporary.md)


### C互換ライブラリ
- [`<cstdlib>`](/reference/cstdlib.md)ヘッダと[`<cmath>`](/reference/cmath.md)ヘッダの多くの関数を`constexpr`に対応


### 機能の非推奨化
- [`std::aligned_storage`](/reference/type_traits/aligned_storage.md)と[`std::aligned_union`](/reference/type_traits/aligned_union.md)を非推奨化。これらの機能は未定義動作を引き起こし、間違った保証が行われ、よくないAPI設計が行われていたため、非推奨とする
    - [`std::aligned_storage`](/reference/type_traits/aligned_storage.md)の代わりに`alignas(T)` [`std::byte`](/reference/cstddef/byte.md)`[sizeof(T)];`を使用することを推奨する
    - [`std::aligned_union`](/reference/type_traits/aligned_union.md)の代わりに`alignas(Ts...)` [`std::byte`](/reference/cstddef/byte.md)`[`[`std::max`](/reference/algorithm/max.md)`({sizeof(Ts)...})];`を使用することを推奨する
- [`std::allocator`](/reference/memory/allocator.md)のメンバ型`is_always_equal`を非推奨化。これはアロケータが状態をもたないことを表す型でありデフォルトでは[`true_type`](/reference/type_traits/true_type.md)となっている。状態をもつユーザー定義のアロケータ型でこのメンバ型の上書きを忘れることでバグが埋め込まれてしまっていたため誤用防止のために非推奨とする
- [`<limits>`](/reference/limits.md)の以下の非正規化数に関する機能を非推奨化。これらの機能は必ずしもコンパイル時に決まらない可能性のある値であり有用でないため、非推奨とする
    - [`std::numeric_limits`](/reference/limits/numeric_limits.md)`::`[`has_denorm`](/reference/limits/numeric_limits/has_denorm.md)
    - [`std::numeric_limits`](/reference/limits/numeric_limits.md)`::`[`has_denorm_loss`](/reference/limits/numeric_limits/has_denorm_loss.md)
    - [`std::float_denorm_style`](/reference/limits/float_denorm_style.md)


### 機能の削除
- ガベージコレクションの実装にうまく役立てられなかった、ガベージコレクション実装のサポートをする以下の機能を削除する：
    - [`std::declare_reachable()`](/reference/memory/declare_reachable.md)
    - [`std::undeclare_reachable()`](/reference/memory/undeclare_reachable.md)
    - [`std::declare_no_pointers()`](/reference/memory/declare_no_pointers.md)
    - [`std::undeclare_no_pointers()`](/reference/memory/undeclare_no_pointers.md)
    - [`std::get_pointer_safety()`](/reference/memory/get_pointer_safety.md)
    - [`std::pointer_safety`](/reference/memory/pointer_safety.md)
    - [`__STDCPP_STRICT_POINTER_SAFETY__`マクロ](/lang/cpp11/predefined_macros.md)


### 取り決め
- 以下のヘッダの一部機能をフリースタンディングライブラリとして追加：
    - [`<utility>`](/reference/utility.md)
    - [`<tuple>`](/reference/tuple.md)
    - [`<memory>`](/reference/memory.md)
    - [`<functional>`](/reference/functional.md)
    - [`<ratio>`](/reference/ratio.md)
    - [`<iterator>`](/reference/iterator.md)
    - [`<ranges>`](/reference/ranges.md)
