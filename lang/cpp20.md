# C++20

## 概要
C++20とは、2020年�に改訂される予定の、C++バージョンの通称である。

このバージョンは、�定�はC++2aと呼ばれることがあった。「202a年にリリースされる」という伏せ�として「a」が使われているが、3年周期に次のバージョンが�定されることが決まっているため、伏せ�になっている年数がずれることはない。


## 言語機能
### クラス

| 言語機能 | 説明 |
|----------|------|
| [一貫比較](cpp20/consistent_comparison.md) | 三方比較演算�によって比較演算�の自動生成を行うようにする |
| [ビットフィールドのメンバ変数初期化](cpp20/default_member_initializers_for_bit_fields.md) | ビットフィールドメンバ変数のデフォルト値を�定する構文を追加する |
| [関数を条件付きで`explicit`にする構文を追加](cpp20/explicit_bool.md) | `explicit(true)`のように`explicit`に真理値パラメータを指定できるようにする |
| [`const`修飾されたメンバポインタの制限を修�](cpp20/fixing_const_qualified_pointers_to_members.md) | `.*`演算�での左辺値の`const`メンバ関数呼び出しを許可する |
| デフォルトのコピーコンストラクタと非`const`なコンストラクタが衝突する問題を修� | |
| 特殊化のアクセスチェック | |
| [空オブジェクトを言語サポート](cpp20/language_support_for_empty_objects.md.nolink) | `[[no_unique_address]]`属性を導入し、空の型のオブジェクトをほかのオブジェクトと共有する最適化を許可する |
| [friend指定された関数内から構造化束縛を使用して非公開メンバ変数にアクセスすることを許可](cpp20/allow_structured_bindings_to_accessible_members.md) | 構造化束縛の仕様として公開メンバ変数のみを取り出せるようになっていたが、friend指定された関数からは非公開メンバ変数にもアクセスできるようにする |
| [構造化束縛がカスタマイゼーションポイントを見つけるルールを緩和](cpp20/relaxing_the_structured_bindings_customization_point_finding_rules.md) | 非テンプレートの`get()`メンバ関数が見つかった場合は、非メンバ関数の`get()`を探しにいく |
| [抽象型のチェック](cpp20/checking_for_abstract_class_types.md.nolink) | 関数の宣言段階では、パラメータおよび戻り値型が抽象型かどうかをチェックしないようにする | | | | |
| [可変長データを扱うクラスの効率的な`delete`](cpp20/efficient_sized_delete_for_variable_sized_classes.md.nolink) | クラスの`delete`演算�が呼び出される前にデストラクタが呼ばれないようにするオプションを追加 |
| [特殊メンバ関数の条件付き自明定義](cpp20/conditionally_trivial_special_member_functions.md.nolink) | 制約によって自明な特殊メンバ関数と非自明な特殊メンバ関数をオーバー�ードできるようにする |


### 列挙型

| 言語機能 | 説明 |
|----------|------|
| [スコープ付き列挙型のusing宣言](cpp20/using_enum.md.nolink) | `using enum EnumType;`もしくは`using EnumType::enumerator`とすることで、列挙値のスコープ指定を省略できるようにする |


### 変数

| 言語機能 | 説明 |
|----------|------|
| 指示付き初期化 | |
| [構造化束縛を拡張して通常の変数宣言のように使用できるようにする](cpp20/extending_structured_bindings_to_be_more_like_variable_declarations.md) | 記憶域指定�として`static`と`thread_local`の指定を許可 |
| [丸カッコの値リストからの集成体初期化を許可](cpp20/allow_initializing_aggregates_from_a_parenthesized_list_of_values.md.nolink) | `T x{1, 2, 3};`と同様に`T x(1, 2, 3);`でも集成体初期化できるようにする |
| [`new`式での配列要素数の推論](cpp20/array_size_deduction_in_new-expressions.md.nolink) | `double* p = new double[]{1,2,3};`を許可 |
| [要素数不明の配列への変換を許可](cpp20/permit_conversions_to_arrays_of_unknown_bound.md.nolink) | 要素数が判明している配列から、要素数が不明の配列への変換を許可 |
| [ほとんどの`volatile`を非推奨化](cpp20/deprecating_volatile.md.nolink) | `volatile`の有用な機能のみを残し、効果が疑わしい、または壊れている機能を非推奨化する |


### 整数

| 言語機能 | 説明 |
|----------|------|
| [符号付き整数型が2の補数表現であることを規定](cpp20/signed_integers_are_twos_complement.md) | 符号付き整数型のビット表現を2の補数に規定する |


### 文�列

| 言語機能 | 説明 |
|----------|------|
| [UTF-8エンコーディングされた文�の型として`char8_t`を追加](cpp20/char8_t.md) | UTF-8エンコードされた文�かどうかでオーバー�ード・特殊化をできるようにする |
| [`char16_t`と`char32_t`の文�・文�列リテラルを、文�コードUTF-16/32に規定](cpp20/make_char16t_char32t_string_literals_be_utf16_32.md.nolink) | `__STDC_UTF_16__`、`__STDC_UTF_32__`の定義に関係なく、`char16_t`、`char32_t`のリテラルをUTF-16/32文�コードに規定する |


### 関数

| 言語機能 | 説明 |
|----------|------|
| [`[[nodiscard]]`属性に理由となる文�列を付加できるようにする](cpp20/nodiscard_should_have_a_reason.md.nolink) | 関数の戻り値を無視してはならない理由を関数宣言に持たせ、�告メッセージに役立てる |


### 制御構文

| 言語機能 | 説明 |
|----------|------|
| [初期化式をともなう範囲for文](cpp20/range-based_for_statements_with_initializer.md) | 範囲for文スコープで使用する変数の初期化のための構文を追加 |
| [範囲for文がカスタマイゼーションポイントを見つけるルールを緩和](cpp20/relaxing_the_range_for_loop_customization_point_finding_rules.md) | `begin()`/`end()`メンバ関数のどちらかが見つからなかった場合に非メンバ関数の`begin()`/`end()`を探しにいく |
| [当たる確率が高い分岐と、当たる確率が低い分岐をコンパイラに伝える属性を追加](cpp20/likely_and_unlikely_attributes.md.nolink) | コンパイラが分岐予測するためのヒントとする |


### テンプレート

| 言語機能 | 説明 |
|----------|------|
| [コンセプト](cpp20/concepts.md) | テンプレートパラメータに対する制約を行う |
| [autoパラメータによる関数テンプレートの簡易定義](cpp20/function_templates_with_auto_parameters.md) | ジェネリックラムダと同様、関数パラメータをの型を`auto`にすることで簡易的に関数テンプレートを定義できるようにする |
| [型の文脈で`typename`の省略を許可](cpp20/down_with_typename.md.nolink) | 型しか現れない文脈では、依�名を解決するための`typename`�ーワードを省略できるようにする |
| [非型テンプレートパラメータとしてクラス型を許可する](cpp20/class_types_in_non-type_template_parameters.md.nolink) | `std::strong_equality`に変換可能な非メンバ関数`<=>`をもつ型を、非型テンプレートパラメータとして使用できるようにする |
| 関数テンプレートに明示的に型指定した場合にADLで見つからない問題を修� | |
| [集成体クラステンプレートのテンプレート引数推論](cpp20/class_template_argument_deduction_for_aggregates.md.nolink) | クラステンプレートのテンプレート引数推論はコンストラクタ引数から推論されるが、集成体初期化からも推論できるようにする |
| [エイリアステンプレートに対するクラステンプレートのテンプレート引数推論](cpp20/class_template_argument_deduction_for_alias_templates.md.nolink) | エイリアステンプレートからクラステンプレートのテンプレート引数を推論できるようにする |


### 定数式

| 言語機能 | 説明 |
|----------|------|
| 評価されない文脈で`constexpr`関数が定数式評価されることを規定 | |
| [定数式からの仮想関数の呼び出しを許可](cpp20/allow_virtual_function_calls_in_constant_expressions.md) | 仮想関数に`constexpr`を付けられない制限を解除 |
| [定数式での`dynamic_cast`、多態的な`typeid`を許可](cpp20/allowing_dynamic_cast_polymorphic_typeid_in_constant_expressions.md.nolink) | 定数式での動的多態を許可 |
| [constexpr関数内でのtry-catchブ�ックを許可](cpp20/try-catch_blocks_in_constexpr_functions.md.nolink) | constexpr関数内での例外の捕捉を許可する |
| [即時関数](cpp20/immediate_functions.md.nolink) | `consteval`�ーワードを追加し、常に定数式評価されるよう指定できるようにする |
| [定数式内での共用体のアクティブメンバの変更を許可](cpp20/changing_the_active_member_of_a_union_inside_constexpr.md.nolink) | 共用体メンバの書き換えを定数式内で行えるようにする |
| [constexprの文脈での自明なデフォルト初期化を許可](cpp20/permitting_trivial_default_initialization_in_constexpr_contexts.md.nolink) | constexpr関数内でのデフォルト初期化を許可し、未初期化値を�むことのみ禁�する |
| [constexpr関数内で未評価のインラインアセンブリを許可することによる組み込み関数のconstexpr有効化](cpp20/enabling_constexpr_intrinsics_by_permitting_unevaluated_inline-assembly_in_constexpr_functions.md.nolink) | コンパイル時に評価されない場合にconstexpr関数にasm定義を含めることを許可 |
| [コンパイル時初期化を強制する`constinit`�ーワードを追加](cpp20/constinit.md.nolink) | 初期化のみコンパイル時におわらせたい場合に使用する |
| [可変サイズをもつコンテナの`constexpr`化](cpp20/more_constexpr_containers.md.nolink) | `constexpr`記憶域をもつメモリア�ケータの�在を考慮することで、可変サイズをもつコンテナをコンパイル時に使用できるようにする |


### ラムダ式

| 言語機能 | 説明 |
|----------|------|
| [ジェネリックラムダのテンプレート構文](cpp20/familiar_template_syntax_for_generic_lambdas.md) | ジェネリックラムダでテンプレートパラメータを定義できるようにする |
| [ラムダ式の�ャプチャとして`[=, this]`を許可する](cpp20/allow_lambda_capture_equal_this.md) | デフォルトコピー�ャプチャと`this`ポインタのコピー�ャプチャを両方指定できるようにする |
| [`[=]`による`this`の暗黙の�ャプチャを非推奨化](cpp20/deprecate_implicit_capture_of_this_via_defcopy.md) | コピーのデフォルト�ャプチャでは、`this`ポインタを�ャプチャされなくする |
| ラムダ式の制約 | |
| 暗黙のラムダ�ャプチャを簡略化 | |
| 状態を持たないラムダ式を、デフォルト構築可能、代入可能とする | |
| 評価されない文脈でのラムダ式 | |
| [ラムダ式の初期化�ャプチャでのパック展開を許可](cpp20/allow_pack_expansion_in_lambda_init_capture.md) | `[...args = std::move(args)]`のような�ャプチャを許可 |
| [構造化束縛したビットフィールドの参照�ャプチャ](cpp20/reference_capture_of_structured_bindings.md.nolink) | ビットフィールドを含む構造化束縛をした場合にラムダ式で参照�ャプチャできない規定を緩和し、ビットフィールドを直接参照�ャプチャ、もしくはデフォルト参照�ャプチャして使用しなければ適格とする |


### 名前空間

| 言語機能 | 説明 |
|----------|------|
| [入れ�名前空間定義でのインライン名前空間](cpp20/nested_inline_mamespaces.md.nolink) | `namespace ns1::inline ns2::ns3 {}`のように、入れ�名前空間を定義する式にインライン名前空間の指定を含められるようにする |


### モジュール化

| 言語機能 | 説明 |
|----------|------|
| [モジュール](cpp20/modules.md) | ヘッダファイル・ソースファイル、インクルードに変わる仕組みとしてモジュールを導入する |


### 並行・並列処理

| 言語機能 | 説明 |
|----------|------|
| [コルーチン](cpp20/coroutines.md.nolink) | 関数実行を��・再開する仕組みとしてコルーチンを導入する |


### プリプ�セッサ

| 言語機能 | 説明 |
|----------|------|
| [可変引数が空でない場合のトークン置換](cpp20/va_opt.md) | プリプ�セッサの置換で可変引数が空の場合に余計なカンマが付いてしまう問題に対処 |



### 機能の非推奨化

| 言語機能 | 説明 |
|----------|------|
| PODを非推奨化 | |
| [`[=]`による`this`の暗黙の�ャプチャを非推奨化](cpp20/deprecate_implicit_capture_of_this_via_defcopy.md) | コピーのデフォルト�ャプチャでは、`this`ポインタを�ャプチャされなくする |
| [添�演算�内でのカンマ演算�の使用を非推奨化](cpp20/deprecate_uses_of_the_comma_operator_in_subscripting_expressions.md.nolink) | `ar[i, j]`を非推奨化。`ar[(i, j)]`はOK |


### 機能の削除

| 言語機能 | 説明 |
|----------|------|
| `throw()`による例外送出しない指定を削除 | 代わりに`noexcept`を使用すること |
| [ユーザー宣言したコンストラクタを持つクラスの集成体初期化を禁�](cpp20/prohibit_aggregates_with_user-declared_constructors.md.nolink) | コンストラクタが`delete`宣言されているクラスを、集成体初期化によってコンストラクタ呼び出しを回避して構築できてしまっていた技法を禁� |


### 小さな変更

| 言語機能 | 説明 |
|----------|------|
| [Unicode標準への参照を更新](cpp20/update_the_reference_to_the_unicode_standard.md.nolink) | 標準C++からISO/IEC 10646への参照を更新し、古い固定バージョンへの参照をやめる |



## ライブラリ更新の概要
### 新ライブラリ
- バージョン情報ライブラリとして[`<version>`](/reference/version.md)を追加。ここでは、実装依�の情報 (バージョンやリリース日付など) が標準ライブラリの実装によって定義される
- [`<chrono>`](/reference/chrono.md)ライブラリに、カレンダーとタイムゾーンの機能を拡張
- 任意のシーケンスの部分シーケンスを参照するライブラリとして[`<span>`](/reference/span.md)を追加
- 文�列フォーマットライブラリとして[`<format>`](/reference/format.md)を追加
- 出力ストリームを同期するライブラリとして[`<syncstream>`](/reference/syncstream.md)を追加
- 三方比較ライブラリとして[`<compare>`](/reference/compare.md)を追加
- 数値ライブラリとして[`<numbers>`](/reference/numbers.md)を追加。数�定数が定義される
- ビット操作ライブラリとして[`<bit>`](/reference/bit.md)を追加
    - Strict Aliasing規則に抵触しないビットレベルの再解釈�ャストである[`std::bit_cast()`](/reference/bit/bit_cast.md)関数を追加
    - 2の乗数関係の関数として、整数値が2の累乗かを判定する[`std::ispow2()`](/reference/bit/ispow2.md)関数、整数値を2の累乗値に切り上げる[`std::ceil2()`](/reference/bit/ceil2.md)関数、整数値を2の累乗値に切り下げる[`std::floor2()`](/reference/bit/floor2.md)関数、2を底とした整数値の対数を求めて1を足す[`std::log2p1()`](/reference/bit/log2p1.md)関数を追加
    - 循環ビットシフトを行う[`std::rotl()`](/reference/bit/rotl.md)と[`std::rotr()`](/reference/bit/rotr.md)を追加
    - 連続した0もしくは1のビットを数える[`std::countl_zero()`](/reference/bit/countl_zero.md)、[`std::countl_one()`](/reference/bit/countl_one.md)、[`std::countr_zero()`](/reference/bit/countr_zero.md)、[`std::countr_one()`](/reference/bit/countr_one.md)、および立っているビットを数える[`std::popcount()`](/reference/bit/popcount.md)を追加
    - エンディアンを表す列挙型として[`std::endian`](/reference/bit/endian.md)を追加
- 型制約のための要件ライブラリとして[`<concepts>`](/reference/concepts.md)を追加
- 言語機能であるコルーチンを制御するライブラリとして[`<coroutine>`](/reference/coroutine.md.nolink)を追加
- スレッドの実行を停�させるメカニズムとして[`<stop_token>`](/reference/stop_token.md)を追加し、停�に対応したスレッドクラスとして[`<thread>`](/reference/thread.md)に[`std::jthread`](/reference/thread/jthread.md.nolink)クラスを追加
- 軽量な同期プリミティブであるセマフォのライブラリとして[`<semaphore>`](/reference/semaphore.md.nolink)を追加
- スレッド調整メカニズムとして、ラッチライブラリの[`<latch>`](/reference/latch.md.nolink)、バリアライブラリの[`<barrier>`](/reference/barrier.md.nolink)を追加
- イテレータの組ではなく、コンテナや配列、部分的なコンテナなどを扱う範囲ライブラリとして[`<ranges>`](/reference/ranges.md.nolink)を追加
    - 既�のイテレータの組を扱うアルゴリズムは、`std::ranges`名前空間に範囲版アルゴリズムが追加される
- ソースコードの位置を取得するライブラリとして[`<source_location>`](/reference/source_location.md)を追加


### 取り決め
- `std`名前空間以下の関数テンプレートをユーザーが特殊化することを禁�する (参照 : [P0551R3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0551r3.pdf))


### コンテナ
- 連想コンテナに、要素がコンテナに含まれているかを判定する`contains()`メンバ関数を追加
- 順序付き連想コンテナと同様に、非順序連想コンテナの検索処理で、一時オブジェクトが生成されるコストを抑える拡張を追加。ハッシュ計算を行う関数オブジェクトに`transparent_key_equal`が定義されていれば、透過的な検索が使用できる。[`std::hash`](/reference/functional/hash.md)クラスのページを参照
- 各コンテナの非メンバ関数として、要素を削除する`std::erase()`関数と`std::erase_if()`関数を追加
- [`std::forward_list`](/reference/forward_list/forward_list.md)と[`std::list`](/reference/list/list.md)のメンバ関数`remove()`、`remove_if()`、`unique()`の戻り値型を、`void`から`Container::size_type`に変更
- [`std::array`](/reference/array/array.md)クラスの比較演算�、[`fill()`](/reference/array/array/fill.md)メンバ関数、[`swap()`](/reference/array/array/swap.md)メンバ関数、[`swap()`](/reference/array/array/swap_free.md)非メンバ関数に`constexpr`を追加。このクラスのメンバ関数はすべて`constexpr`に対応した
- 組み込み配列を[`std::array`](/reference/array/array.md)に変換する関数として[`std::to_array()`](/reference/array/to_array.md)を追加
- [`<iterator>`](/reference/iterator.md)に、符号付き整数としてコンテナの要素数を取得する[`std::ssize()`](/reference/iterator/ssize.md)関数を追加
- [`std::allocator`](/reference/memory/allocator.md)、および[`std::vector`](/reference/vector/vector.md)と[`std::basic_string`](/reference/string/basic_string.md)を`constexpr`対応


### アルゴリズム
- [`<algorithm>`](/reference/algorithm.md)の多くの関数に`constexpr`を追加
- [`<algorithm>`](/reference/algorithm.md)に、要素位置をシフトする[`std::shift_left()`](/reference/algorithm/shift_left.md)、[`std::shift_right()`](/reference/algorithm/shift_right.md)を追加
- [`<algorithm>`](/reference/algorithm.md)に三方比較による辞書順比較アルゴリズム[`std::lexicographical_compare_three_way()`](/reference/algorithm/lexicographical_compare_three_way.md)を追加
- 数値とポインタの�点を求める関数として、[`<numeric>`](/reference/numeric.md)に[`std::midpoint()`](/reference/numeric/midpoint.md)関数を追加
- 浮動小数点数を線形補間する関数として、[`<cmath>`](/reference/cmath.md)に[`std::lerp()`](/reference/cmath/lerp.md)関数を追加
- [`<numeric>`](/reference/numeric.md)の数値計算アルゴリズムをムーブに対応
- [`<numeric>`](/reference/numeric.md)の数値計算アルゴリズムに`constexpr`を追加


### イテレータ
- [`std::back_insert_iterator`](/reference/iterator/back_insert_iterator.md)クラス、[`std::front_insert_iterator`](/reference/iterator/front_insert_iterator.md)クラス、[`std::insert_iterator`](/reference/iterator/insert_iterator.md)クラスのコンストラクタ、代入演算�、間接参照演算�、インクリメント演算�、および[`std::back_inserter()`](/reference/iterator/back_inserter.md)、[`std::front_inserter()`](/reference/iterator/front_inserter.md)、[`std::inserter()`](/reference/iterator/inserter.md)に`constexpr`を追加。これらのクラスのメンバ関数はすべて`constexpr`に対応した


### 関数オブジェクト
- [`<functional>`](/reference/functional.md)に、[`std::reference_wrapper`](/reference/functional/reference_wrapper.md)`<T>`型を`T&`型に展開する[`std::unwrap_reference`](/reference/functional/unwrap_reference.md)型特性、[`std::decay`](/reference/type_traits/decay.md) + [`std::reference_wrapper`](/reference/functional/reference_wrapper.md)`<T>`型の展開をする[`std::unwrap_ref_decay`](/reference/functional/unwrap_ref_decay.md)型特性を追加
- [`std::reference_wrapper`](/reference/functional/reference_wrapper.md)クラス、[`std::ref()`](/reference/functional/ref.md)関数、[`std::cref()`](/reference/functional/cref.md)関数のテンプレートパラメータ`T`型に不完全型を指定することを許可
- メンバ関数の部分適用をかんたんにするために、プレースホルダーの指定なく引数を先�から順に束縛する[`std::bind_front()`](/reference/functional/bind_front.md)関数を追加
- [`std::invoke()`](/reference/functional/invoke.md)、[`std::reference_wrapper`](/reference/functional/reference_wrapper.md)の各操作、[`std::not_fn()`](/reference/functional/not_fn.md)、[`std::bind()`](/reference/functional/bind.md)、[`std::mem_fn()`](/reference/functional/mem_fn.md)を`constexpr`対応


### 文�列
- [`std::basic_string`](/reference/string/basic_string.md)クラスと[`std::basic_string_view`](/reference/string_view/basic_string_view.md)クラスに、先�の部分文�列を判定する`starts_with()`メンバ関数、末尾の部分文�列を判定する`ends_with()`メンバ関数を追加
- [`std::basic_string`](/reference/string/basic_string.md)`::`[`reserve()`](/reference/string/basic_string/reserve.md)メンバ関数の、メモリの縮小機能を削除し、伸長のみとする。
- [`std::char_traits`](/reference/string/char_traits.md)クラスの[`move()`](/reference/string/char_traits/move.md)、[`copy()`](/reference/string/char_traits/copy.md)、[`assign()`](/reference/string/char_traits/assign.md)静的メンバ関数に`constexpr`を追加


### 並行・並列処理
- [`std::atomic`](/reference/atomic/atomic.md)クラスと[`std::atomic_flag`](/reference/atomic/atomic_flag.md)クラスのデフォルトコンストラクタが、値初期化するよう動作変更。これまではC言語との互換性のために未初期化となっていた
- [`<memory>`](/reference/memory.md)に、[`std::atomic`](/reference/memory/atomic.md)クラスの[`std::shared_ptr`](/reference/memory/shared_ptr.md)と[`std::weak_ptr`](/reference/memory/weak_ptr.md)に対する特殊化を追加
- [`std::atomic`](/reference/atomic/atomic.md)クラスの浮動小数点数型に対する特殊化を追加
- アトミッククラスに対するブ�ッ�ング同期の機能として[`wait()`](/reference/atomic/atomic/wait.md)、[`notify_one()`](/reference/atomic/atomic/notify_one.md)、[`notify_all()`](/reference/atomic/atomic/notify_all.md)を追加
- �ックフリーであることが保証されたアトミック整数型の別名として[`atomic_signed_lock_free`](/reference/atomic/atomic.md)と[`atomic_unsigned_lock_free`](/reference/atomic/atomic.md)を追加
- [`std::memory_order`](/reference/atomic/memory_order.md)の列挙�にスコープをもたせた
- [`std::atomic_flag`](/reference/atomic/atomic_flag.md)クラスに、`bool`値を�み込むメンバ関数[`test()`](/reference/atomic/atomic_flag/test.md)を追加
- 非アトミックなオブジェクトにアトミック操作を適用するためのクラス[`std::atomic_ref`](/reference/atomic/atomic_ref.md)を追加
- ベクトル化の実行ポリシーとして、[`<execution>`](/reference/execution.md)に[`std::execution::unsequenced_policy`](/reference/execution/execution/execution_policy.md)型と[`std::execution::unseq`](/reference/execution/execution/execution_policy.md)タグを追加


### 入出力
- 同期ストリームの追加にともなって、[`<ostream>`](/reference/ostream.md)に、同期ストリーム関係の出力マニピュレータを追加
- [`operator>>`](/reference/istream/basic_istream/op_istream_free.md)`(basic_istream&, CharT*)`を`operator>>(basic_istream&, CharT (&)[N])`に修�
- [`operator<<`](/reference/ostream/basic_ostream/op_ostream_free.md)に、`wchar_t` (`char`版のみ)、`char8_t`、`char16_t`、`char32_t`のdelete宣言を追加
- [`std::istream_iterator`](/reference/iterator/istream_iterator.md)について、要件の書き方を整理し、振る舞いをより明確化
- `std::basic_stringbuf`、`std::basic_istringstream`、`std::basic_ostringstream`クラスに、ア�ケータを伝�させるためのインタフェースを追加


### スマートポインタ
- [`std::make_shared()`](/reference/memory/make_shared.md)と[`std::allocate_shared()`](/reference/memory/allocate_shared.md)を配列に対応
- スマートポインタをデフォルト初期化で構築するヘルパ関数として、[`std::make_unique_default_init()`](/reference/memory/make_unique_default_init.md)、[`std::make_shared_default_init()`](/reference/memory/make_shared_default_init.md)、[`std::allocate_shared_default_init()`](/reference/memory/allocate_shared_default_init.md)を追加
- ポインタを生ポインタに変換する[`std::to_address()`](/reference/memory/to_address.md)を追加
- [`std::pointer_traits`](/reference/memory/pointer_traits.md)`::`[`pointer_to()`](/reference/memory/pointer_traits/pointer_to.md)関数に`constexpr`を追加


### メモリ
- [`<memory>`](/reference/memory.md)に、Nバイトアライメントされたポインタであることをコンパイラに伝える[`std::assume_aligned()`](/reference/memory/assume_aligned.md)関数を追加
- [`<memory>`](/reference/memory.md)に、uses allocator構築をサポートするユーティリティ関数として、[`std::uses_allocator_construction_args()`](/reference/memory/uses_allocator_construction_args.md)、[`std::make_obj_using_allocator()`](/reference/memory/make_obj_using_allocator.md)、[`std::uninitialized_construct_using_allocator()`](/reference/memory/uninitialized_construct_using_allocator.md)を追加
- [`std::pmr::polymorphic_allocator`](/reference/memory_resource/polymorphic_allocator.md)に、以下の変更を追加：
    - クラステンプレートのデフォルトテンプレート引数を[`std::byte`](/reference/cstddef/byte.md)型とした
    - `void*`のバイト列をメモリ確保する[`allocate_bytes()`](/reference/memory_resource/polymorphic_allocator/allocate_bytes.md)、解放する[`deallocate_bytes()`](/reference/memory_resource/polymorphic_allocator/deallocate_bytes.md)メンバ関数を追加
    - 指定した型のメモリを確保する[`allocate_object()`](/reference/memory_resource/polymorphic_allocator/allocate_object.md)、解放する[`deallocate_object()`](/reference/memory_resource/polymorphic_allocator/deallocate_object.md)を追加
    - 指定した型のメモリ確保と構築をする[`new_object()`](/reference/memory_resource/polymorphic_allocator/new_object.md)、破棄と解放をする[`delete_object()`](/reference/memory_resource/polymorphic_allocator/delete_object.md)を追加


### ユーティリティ
- [`std::swap()`](/reference/utility/swap.md)関数に`constexpr`を追加
- [`std::exchange()`](/reference/utility/exchange.md)関数に`constexpr`を追加
- [`std::complex`](/reference/complex/complex.md)クラスを`constexpr`に対応
- [`std::pair`](/reference/utility/pair.md)クラスの[コンストラクタ](/reference/utility/pair/op_constructor.md)、[代入演算�](/reference/utility/pair/op_assign.md)、[`swap()`](/reference/utility/pair/swap.md)メンバ関数、[`swap()`](/reference/utility/pair/swap_free.md)非メンバ関数に`constexpr`を追加。このクラスのメンバ関数はすべて`constexpr`に対応した
- [`std::tuple`](/reference/tuple/tuple.md)クラスの[コンストラクタ](/reference/tuple/tuple/op_constructor.md)、[代入演算�](/reference/tuple/tuple/op_assign.md)、[`swap()`](/reference/tuple/tuple/swap.md)メンバ関数、[`swap()`](/reference/tuple/tuple/swap_free.md)非メンバ関数に`constexpr`を追加。このクラスのメンバ関数はすべて`constexpr`に対応した


### ファイルシステム
- [`std::filesystem::create_directory()`](/reference/filesystem/create_directory.md)と[`std::filesystem::create_directories()`](/reference/filesystem/create_directories.md)の仕様が直感的ではなく、すでにディレクトリが�在している場合にエラーとなっていた。C++20ではその状況ではエラーにならないようにする (エラーではなく`false`が返る)


### 型特性
- [`<type_traits>`](/reference/type_traits.md)に、constexpr関数が定数式評価されたかを判定する特殊な関数[`std::is_constant_evaluated()`](/reference/type_traits/is_constant_evaluated.md)を追加
- [`<type_traits>`](/reference/type_traits.md)に、型のCV修飾と参照を除去する型特性クラスとして[`std::remove_cvref`](/reference/type_traits/remove_cvref.md)を追加
- [`<type_traits>`](/reference/type_traits.md)に、受け取った型をそのまま返す[`std::type_identity`](/reference/type_traits/type_identity.md)を追加
- [`<type_traits>`](/reference/type_traits.md)に、例外送出せずに暗黙の型変換が可能かを判定する[`std::is_nothrow_convertible`](/reference/type_traits/is_nothrow_convertible.md)を追加
- [`<type_traits>`](/reference/type_traits.md)に、要素数が判明している配列型かを判定する[`std::is_bounded_array`](/reference/type_traits/is_bounded_array.md)、要素数が不明な配列型かを判定する[`std::is_unbounded_array`](/reference/type_traits/is_unbounded_array.md)を追加
- [`<type_traits>`](/reference/type_traits.md)に、レイアウト互換性、ポインタ変換可能性を判定する以下の型特性を追加：
    - 2つの型にレイアウト互換があるかを判定する[`std::is_layout_compatible`](/reference/type_traits/is_layout_compatible.md.nolink)
    - 基底クラスと派生クラスの間でポインタ変換可能かを判定する[`std::is_pointer_interconvertible_base_of`](/reference/type_traits/is_pointer_interconvertible_base_of.md.nolink)
    - メンバポインタがクラスのポインタに変換可能かを判定する[`is_pointer_interconvertible_with_class()`](/reference/type_traits/is_pointer_interconvertible_with_class.md.nolink)
    - 2つの互換レイアウトをもつメンバポインタが共通位置にあるかを判定する[`std::is_corresponding_member()`](/reference/type_traits/is_corresponding_member.md.nolink)


### 機能の非推奨化
- 一貫比較非機能によって比較演算�の定義が容易になったため、不要になった演算�の簡潔定義機能である[`std::rel_ops`](/reference/utility/rel_ops.md)を非推奨化
- [`std::basic_string`](/reference/string/basic_string.md)`::`[`reserve()`](/reference/string/basic_string/reserve.md)メンバ関数が、メモリの縮小をしなくなったため、デフォルト引数`0`を非推奨可
- [`std::atomic`](/reference/atomic/atomic.md)クラスと[`std::atomic_flag`](/reference/atomic/atomic_flag.md)クラスのデフォルトコンストラクタが値初期化するようになったため、不要になった以下のアトミックオブジェクトの初期化機能を非推奨化：
    - [`std::atomic_init()`](/reference/atomic/atomic_init.md)関数
    - [`ATOMIC_VAR_INIT`](/reference/atomic/atomic_var_init.md)マク�
    - [`ATOMIC_FLAG_INIT`](/reference/atomic/atomic_flag_init.md)マク�


### 機能の削除
- C++11で[`allocator_traits`](/reference/memory/allocator_traits.md)クラスが導入されたことでC++17から非推奨化されていた、[`allocator`](/reference/memory/allocator.md)の以下のメンバを削除：
    - `size_type`型
    - `difference_type`型
    - `pointer`型
    - `const_pointer`型
    - `reference`型
    - `const_reference`型
    - `rebind`型
    - [`address()`](/reference/memory/allocator/address.md)メンバ関数
    - [`allocate()`](/reference/memory/allocator/allocate.md)メンバ関数の`hint`パラメータ
    - [`max_size()`](/reference/memory/allocator/max_size.md)メンバ関数
    - [`construct()`](/reference/memory/allocator/construct.md)メンバ関数
    - [`destroy()`](/reference/memory/allocator/destroy.md)メンバ関数
- C++11で[`allocator_traits`](/reference/memory/allocator_traits.md)クラスが導入されたことでC++17から非推奨化されていた、要素型を再束縛するための`allocator<void>`特殊化を非推奨化
- C++17で非推奨化されていた、`constexpr`で扱える型の分類である[`is_literal_type`](/reference/type_traits/is_literal_type.md)型特性を削除
- C++17で非推奨化されていた、一時的なメモリ確保のための[`std::get_temporary_buffer()`](/reference/memory/get_temporary_buffer.md)関数と[`std::return_temporary_buffer()`](/reference/memory/return_temporary_buffer.md)関数を削除
- C++17で非推奨化されていた[`raw_storage_iterator`](/reference/memory/raw_storage_iterator.md)クラスを削除
- [`not_fn()`](/reference/functional/not_fn.md)の追加にともない、C++17から非推奨化されていた以下の機能を削除：
    - [`not1()`](/reference/functional/negators.md)関数
    - [`not2()`](/reference/functional/negators.md)関数
    - [`unary_negate`](/reference/functional/negators.md)クラス
    - [`binary_nagate`](/reference/functional/negators.md)クラス
    - 標準関数オブジェクトの`result_type`、`argument_type`、`first_argument_type`、`second_argument_type`型
- C++17から非推奨化されていた[`shared_ptr`](/reference/memory/shared_ptr.md)`::`[`unique()`](/reference/memory/shared_ptr/unique.md)を削除
- [`invoke_result`](/reference/type_traits/invoke_result.md)の追加にともない、C++17から非推奨化されていた[`result_of`](/reference/type_traits/result_of.md)を削除
- C++17での[`uncaught_exceptions()`](/reference/exception/uncaught_exceptions.md)の追加にともない、非推奨化していた[`uncaught_exception()`](/reference/exception/uncaught_exception.md)を削除
- C++17で非推奨化されていたC互換ライブラリ`<ccomplex>`, `<cstdalign>`, `<cstdbool>`, `<ctgmath>`を削除。また、C++ではなにも定義されないC互換ライブラリ`<ciso646>`を削除
