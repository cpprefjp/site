# C++20

## 概要
C++20とは、2020年中に改訂される予定の、C++バージョンの通称である。

このバージョンは、策定中はC++2aと呼ばれることがあった。「202a年にリリースされる」という伏せ字として「a」が使われているが、3年周期に次のバージョンが策定されることが決まっているため、伏せ字になっている年数がずれることはない。


## 言語機能
### クラス
| 言語機能 | 説明 |
|----------|------|
| [一貫比較](cpp20/consistent_comparison.md.nolink) | |
| [契約に基づくプログラミング](cpp20/contract-based_programming.md.nolink) | 事前条件、事後条件、表明を宣言する新たな属性構文を追加 |
| [ビットフィールドのメンバ変数初期化](cpp20/default_member_initializers_for_bit_fields.md) | ビットフィールドメンバ変数のデフォルト値を設定する構文を追加する |
| [コンストラクタを条件付きで`explicit`にする構文を追加](cpp20/explicit_bool.md.nolink) | `explicit(true)`のように`explicit`に真理値パラメータを指定できるようにする |
| [`const`修飾されたメンバポインタの制限を修正](cpp20/fixing_const_qualified_pointers_to_members.md) | `.*`演算子での左辺値の`const`メンバ関数呼び出しを許可する |
| デフォルトのコピーコンストラクタと非`const`なコンストラクタが衝突する問題を修正 | |
| 特殊化のアクセスチェック | |
| [空オブジェクトを言語サポート](cpp20/language_support_for_empty_objects.md.nolink) | `[[no_unique_address]]`属性を導入し、空の型のオブジェクトをほかのオブジェクトと共有する最適化を許可する |
| [friend指定された関数内から構造化束縛を使用して非公開メンバ変数にアクセスすることを許可](cpp20/allow_structured_bindings_to_accessible_members.md) | 構造化束縛の仕様として公開メンバ変数のみを取り出せるようになっていたが、friend指定された関数からは非公開メンバ変数にもアクセスできるようにする |
| [構造化束縛がカスタマイゼーションポイントを見つけるルールを緩和](cpp20/relaxing_the_structured_bindings_customization_point_finding_rules.md) | 非テンプレートの`get()`メンバ関数が見つかった場合は、非メンバ関数の`get()`を探しにいく |
| [抽象型のチェック](cpp20/checking_for_abstract_class_types.md.nolink) | 関数の宣言段階では、パラメータおよび戻り値型が抽象型かどうかをチェックしないようにする | | | | |
| [可変長データを扱うクラスの効率的な`delete`](cpp20/efficient_sized_delete_for_variable_sized_classes.md.nolink) | クラスの`delete`演算子が呼び出される前にデストラクタが呼ばれないようにするオプションを追加 |


### 変数

| 言語機能 | 説明 |
|----------|------|
| 指示付き初期化 | |
| [構造化束縛を拡張して通常の変数宣言のように使用できるようにする](cpp20/extending_structured_bindings_to_be_more_like_variable_declarations.md.nolink) | 記憶域指定子として`static`と`thread_local`の指定を許可 |
| [丸カッコの値リストからの集成体初期化を許可](cpp20/allow_initializing_aggregates_from_a_parenthesized_list_of_values.md.nolink) | `T x{1, 2, 3};`と同様に`T x(1, 2, 3);`でも集成体初期化できるようにする |
| [`new`式での配列要素数の推論](cpp20/array_size_deduction_in_new-expressions.md.nolink) | `double* p = new double[]{1,2,3};`を許可 |


### 整数

| 言語機能 | 説明 |
|----------|------|
| [符号付き整数型が2の補数表現であることを規定](cpp20/signed_integers_are_twos_complement.md.nolink) | 処理系が2の補数以外をサポートしていなかったこともあり、現実に即した規定とする |


### 文字列

| 言語機能 | 説明 |
|----------|------|
| [UTF-8エンコーディングされた文字の型として`char8_t`を追加](cpp20/char8_t.md.nolink) | UTF-8エンコードされた文字かどうかでオーバーロード・特殊化をできるようにする |
| [`char16_t`と`char32_t`の文字・文字列リテラルを、文字コードUTF-16/32に規定](cpp20/make_char16t_char32t_string_literals_be_utf16_32.md.nolink) | `__STDC_UTF_16__`、`__STDC_UTF_32__`の定義に関係なく、`char16_t`、`char32_t`のリテラルをUTF-16/32文字コードに規定する |


### 制御構文

| 言語機能 | 説明 |
|----------|------|
| [初期化式をともなう範囲for文](cpp20/range-based_for_statements_with_initializer.md) | 範囲for文スコープで使用する変数の初期化のための構文を追加 |
| [範囲for文がカスタマイゼーションポイントを見つけるルールを緩和](cpp20/relaxing_the_range_for_loop_customization_point_finding_rules.md) | `begin()`/`end()`メンバ関数のどちらかが見つからなかった場合に非メンバ関数の`begin()`/`end()`を探しにいく |
| [当たる確率が高い分岐と、当たる確率が低い分岐をコンパイラに伝える属性を追加](cpp20/likely_and_unlikely_attributes.md.nolink) | コンパイラが分岐予測するためのヒントとする |


### テンプレート

| 言語機能 | 説明 |
|----------|------|
| コンセプト | |
| [型の文脈で`typename`の省略を許可](cpp20/down_with_typename.md.nolink) | 型しか現れない文脈では、依存名を解決するための`typename`キーワードを省略できるようにする |
| [非型テンプレートパラメータとしてクラス型を許可する](cpp20/class_types_in_non-type_template_parameters.md.nolink) | `std::strong_equality`に変換可能な非メンバ関数`<=>`をもつ型を、非型テンプレートパラメータとして使用できるようにする |
| 関数テンプレートに明示的に型指定した場合にADLで見つからない問題を修正 | |


### 定数式

| 言語機能 | 説明 |
|----------|------|
| 評価されない文脈で`constexpr`関数が定数式評価されることを規定 | |
| [定数式からの仮想関数の呼び出しを許可](cpp20/allow_virtual_function_calls_in_constant_expressions.md) | 仮想関数に`constexpr`を付けられない制限を解除 |
| [定数式での`dynamic_cast`、多態的な`typeid`を許可](cpp20/allowing_dynamic_cast_polymorphic_typeid_in_constant_expressions.md.nolink) | 定数式での動的多態を許可 |
| [constexpr関数内でのtry-catchブロックを許可](cpp20/try-catch_blocks_in_constexpr_functions.md.nolink) | constexpr関数内での例外の捕捉を許可する |
| [即時関数](cpp20/immediate_functions.md.nolink) | `consteval`キーワードを追加し、常に定数式評価されるよう指定できるようにする |
| [定数式内での共用体のアクティブメンバの変更を許可](cpp20/changing_the_active_member_of_a_union_inside_constexpr.md.nolink) | 共用体メンバの書き換えを定数式内で行えるようにする |


### ラムダ式

| 言語機能 | 説明 |
|----------|------|
| [ジェネリックラムダのテンプレート構文](cpp20/familiar_template_syntax_for_generic_lambdas.md) | ジェネリックラムダでテンプレートパラメータを定義できるようにする |
| [ラムダ式のキャプチャとして`[=, this]`を許可する](cpp20/allow_lambda_capture_equal_this.md) | デフォルトコピーキャプチャと`this`ポインタのコピーキャプチャを両方指定できるようにする |
| [`[=]`による`this`の暗黙のキャプチャを非推奨化](cpp20/deprecate_implicit_capture_of_this_via_defcopy.md) | コピーのデフォルトキャプチャでは、`this`ポインタをキャプチャされなくする |
| ラムダ式の制約 | |
| 暗黙のラムダキャプチャを簡略化 | |
| 状態を持たないラムダ式を、デフォルト構築可能、代入可能とする | |
| 評価されない文脈でのラムダ式 | |
| [ラムダ式の初期化キャプチャでのパック展開を許可](cpp20/allow_pack_expansion_in_lambda_init_capture.md.nolink) | `[...args = std::move(args)]`のようなキャプチャを許可 |
| [構造化束縛したビットフィールドの参照キャプチャ](cpp20/reference_capture_of_structured_bindings.md.nolink) | ビットフィールドを含む構造化束縛をした場合にラムダ式で参照キャプチャできない規定を緩和し、ビットフィールドを直接参照キャプチャ、もしくはデフォルト参照キャプチャして使用しなければ適格とする |


### 名前空間

| 言語機能 | 説明 |
|----------|------|
| [入れ子名前空間定義でのインライン名前空間](cpp20/nested_inline_mamespaces.md.nolink) | `namespace ns1::inline ns2::ns3 {}`のように、入れ子名前空間を定義する式にインライン名前空間の指定を含められるようにする |


### モジュール化

| 言語機能 | 説明 |
|----------|------|
| [モジュール](cpp20/modules.md.nolink) | ヘッダファイル・ソースファイル、インクルードに変わる仕組みとしてモジュールを導入する |


### 並行・並列処理

| 言語機能 | 説明 |
|----------|------|
| [コルーチン](cpp20/coroutines.md.nolink) | 関数実行を中断・再開する仕組みとしてコルーチンを導入する |


### プリプロセッサ

| 言語機能 | 説明 |
|----------|------|
| [可変引数が空でない場合のトークン置換](cpp20/va_opt.md) | プリプロセッサの置換で可変引数が空の場合に余計なカンマが付いてしまう問題に対処 |



### 機能の非推奨化

| 言語機能 | 説明 |
|----------|------|
| PODを非推奨化 | |
| [`[=]`による`this`の暗黙のキャプチャを非推奨化](cpp20/deprecate_implicit_capture_of_this_via_defcopy.md) | コピーのデフォルトキャプチャでは、`this`ポインタをキャプチャされなくする |


### 機能の削除

| 言語機能 | 説明 |
|----------|------|
| `throw()`による例外送出しない指定を削除 | 代わりに`noexcept`を使用すること |
| [ユーザー宣言したコンストラクタを持つクラスの集成体初期化を禁止](cpp20/prohibit_aggregates_with_user-declared_constructors.md.nolink) | コンストラクタが`delete`宣言されているクラスを、集成体初期化によってコンストラクタ呼び出しを回避して構築できてしまっていた技法を禁止 |


### 小さな変更

| 言語機能 | 説明 |
|----------|------|
| [Unicode標準への参照を更新](cpp20/update_the_reference_to_the_unicode_standard.md.nolink) | 標準C++からISO/IEC 10646への参照を更新し、古い固定バージョンへの参照をやめる |



## ライブラリ更新の概要
### 新ライブラリ
- [`<version>`](/reference/version.md)ヘッダを新設する。ここでは、実装依存の情報 (バージョンやリリース日付など) が標準ライブラリの実装によって定義される
- [`<chrono>`](/reference/chrono.md)ヘッダに、カレンダーとタイムゾーンの機能を拡張
- 任意のシーケンスの部分シーケンスを参照するライブラリとして[`<span>`](/reference/span.md.nolink)を追加
- 出力ストリームを同期するライブラリとして[`<syncstream>`](/reference/syncstream.md.nolink)を追加
- [`<compare>`](/reference/compare.md.nolink)ヘッダを新設する。ここでは、一貫比較 (宇宙船演算子) をサポートするための型と比較関数が定義される
- [`<bit>`](/reference/bit.md)ヘッダを新設する
    - Strict Aliasing規則に抵触しないビットレベルの再解釈キャストである[`std::bit_cast()`](/reference/bit/bit_cast.md)関数を追加
    - 2の乗数関係の関数として、整数値が2の累乗かを判定する[`std::ispow2()`](/reference/bit/ispow2.md)関数、整数値を2の累乗値に切り上げる[`std::ceil2()`](/reference/bit/ceil2.md)関数、整数値を2の累乗値に切り下げる[`std::floor2()`](/reference/bit/floor2.md)関数、2を底とした整数値の対数を求めて1を足す[`std::log2p1()`](/reference/bit/log2p1.md)関数を追加
- 型制約のための要件ライブラリとして[`<concepts>`](/reference/concepts.md)を追加
- 言語機能であるコルーチンを制御するライブラリとして[`<coroutine>`](/reference/coroutine.md.nolink)を追加
- イテレータの組ではなく、コンテナや配列、部分的なコンテナなどを扱う範囲ライブラリとして[`<ranges>`](/reference/ranges.md.nolink)を追加
    - 既存のイテレータの組を扱うアルゴリズムは、`std::ranges`名前空間に範囲版アルゴリズムが追加される


### 取り決め
- `std`名前空間以下の関数テンプレートをユーザーが特殊化することを禁止する (参照 : [P0551R3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0551r3.pdf))


### コンテナ
- 連想コンテナに、要素がコンテナに含まれているかを判定する`contains()`メンバ関数を追加
- 順序付き連想コンテナと同様に、非順序連想コンテナのルックアップ処理で、一時オブジェクトが生成されるコストを抑える拡張を追加
- 非順序連想コンテナの検索メンバ関数`find()`、`count()`、`contains()`、`equal_range()`に、事前計算したハッシュ値を指定するオーバーロードを追加。これによって、ハッシュ値をキャッシュして検索を高速化できる
- 各コンテナの非メンバ関数として、要素を削除する`std::erase()`関数と`std::erase_if()`関数を追加
- [`std::forward_list`](/reference/forward_list/forward_list.md)と[`std::list`](/reference/list/list.md)のメンバ関数`remove()`、`remove_if()`、`unique()`の戻り値型を、`void`から`Container::size_type`に変更
- [`std::array`](/reference/array/array.md)クラスの比較演算子、[`fill()`](/reference/array/array/fill.md)メンバ関数、[`swap()`](/reference/array/array/swap.md)メンバ関数、[`swap()`](/reference/array/array/swap_free.md)非メンバ関数に`constexpr`を追加。このクラスのメンバ関数はすべて`constexpr`に対応した
- [`<iterator>`](/reference/iterator.md)に、符号付き整数としてコンテナの要素数を取得する[`std::ssize()`](/reference/iterator/ssize.md.nolink)関数を追加


### アルゴリズム
- [`<algorithm>`](/reference/algorithm.md)の多くの関数に`constexpr`を追加
- [`<algorithm>`](/reference/algorithm.md)に、要素位置をシフトする[`std::shift_left()`](/reference/algorithm/shift_left.md.nolink)、[`std::shift_right()`](/reference/algorithm/shift_right.md.nolink)を追加
- 一貫比較への対応のため、[`<algorithm>`](/reference/algorithm.md)に[`std::lexicographical_compare_3way()`](/reference/algorithm/lexicographical_compare_3way.md.nolink)および[`std::compare_3way()`](/reference/algorithm/compare_3way.md.nolink)を追加
- [`<numeric>`](/reference/numeric.md)の数値計算アルゴリズムをムーブに対応


### 数値計算
- 数値とポインタの中点を求める関数として、[`<numeric>`](/reference/numeric.md)に[`std::midpoint()`](/reference/numeric/midpoint.md)関数を追加
- 浮動小数点数を線形補間する関数として、[`<cmath>`](/reference/cmath.md)に[`std::lerp()`](/reference/cmath/lerp.md)関数を追加


### イテレータ
- [`std::back_insert_iterator`](/reference/iterator/back_insert_iterator.md)クラス、[`std::front_insert_iterator`](/reference/iterator/front_insert_iterator.md)クラス、[`std::insert_iterator`](/reference/iterator/insert_iterator.md)クラスのコンストラクタ、代入演算子、間接参照演算子、インクリメント演算子、および[`std::back_inserter()`](/reference/iterator/back_inserter.md)、[`std::front_inserter()`](/reference/iterator/front_inserter.md)、[`std::inserter()`](/reference/iterator/inserter.md)に`constexpr`を追加。これらのクラスのメンバ関数はすべて`constexpr`に対応した


### 文字列
- [`std::basic_string`](/reference/string/basic_string.md)クラスと[`std::basic_string_view`](/reference/string_view/basic_string_view.md)クラスに、先頭の部分文字列を判定する`starts_with()`メンバ関数、末尾の部分文字列を判定する`ends_with()`メンバ関数を追加
- [`std::char_traits`](/reference/string/char_traits.md)クラスの[`move()`](/reference/string/char_traits/move.md)、[`copy()`](/reference/string/char_traits/copy.md)、[`assign()`](/reference/string/char_traits/assign.md)静的メンバ関数に`constexpr`を追加


### 並行・並列処理
- [`std::atomic`](/reference/atomic/atomic.md)クラスのスマートポインタに対する特殊化を追加
- [`std::atomic`](/reference/atomic/atomic.md)クラスの浮動小数点数型に対する特殊化を追加
- [`std::memory_order`](/reference/atomic/memory_order.md)の列挙子にスコープをもたせた
- 非アトミックな型にアトミック操作を適用するためのクラス[`std::atomic_ref`](/reference/atomic/atomic_ref.md.nolink)を追加
- ベクトル化の実行ポリシーとして、[`<execution>`](/reference/execution.md)に[`std::execution::unsequenced_policy`](/reference/execution/execution/execution_policy.md)型と[`std::execution::unseq`](/reference/execution/execution/execution_policy.md)タグを追加


### 入出力
- 同期ストリームの追加にともなって、[`<ostream>`](/reference/ostream.md)に、同期ストリーム関係の出力マニピュレータを追加
- [`operator>>`](/reference/istream/basic_istream/op_istream_free.md)`(basic_istream&, CharT*)`を`operator>>(basic_istream&, CharT (&)[N])`に修正
- [`std::istream_iterator`](/reference/iterator/istream_iterator.md)について、要件の書き方を整理し、振る舞いをより明確化


### スマートポインタ
- [`std::make_shared()`](/reference/memory/make_shared.md)と[`std::allocate_shared()`](/reference/memory/allocate_shared.md)を配列に対応
- スマートポインタをデフォルト初期化で構築するヘルパ関数として、[`std::make_unique_default_init()`](/reference/memory/make_unique_default_init.md.nolink)、[`std::make_shared_default_init()`](/reference/memory/make_shared_default_init.md.nolink)、[`std::allocate_shared_default_init()`](/reference/memory/allocate_shared_default_init.md.nolink)を追加
- ポインタを生ポインタに変換する[`std::to_address()`](/reference/memory/to_address.md)を追加
- [`std::pointer_traits`](/reference/memory/pointer_traits.md)`::`[`pointer_to()`](/reference/memory/pointer_traits/pointer_to.md)関数に`constexpr`を追加


### メモリ
- [`<memory>`](/reference/memory.md)に、Nバイトアライメントされたポインタであることをコンパイラに伝える[`std::assume_aligned()`](/reference/memory/assume_aligned.md.nolink)関数を追加
- [`<memory>`](/reference/memory.md)に、uses allocator構築をサポートするユーティリティ関数として、[`std::uses_allocator_construction_args()`](/reference/memory/uses_allocator_construction_args.md.nolink)、[`std::make_obj_using_allocator()`](/reference/memory/make_obj_using_allocator.md.nolink)、[`std::uninitialized_construct_using_allocator()`](/reference/memory/uninitialized_construct_using_allocator.md.nolink)を追加
- [`std::pmr::polymorphic_allocator`](/reference/memory_resource/polymorphic_allocator.md.nolink)に、以下の変更を追加：
    - クラステンプレートのデフォルトテンプレート引数を[`std::byte`](/reference/cstddef/byte.md)型とした
    - `void*`のバイト列をメモリ確保する[`allocate_bytes()`](/reference/memory_resource/polymorphic_allocator/allocate_bytes.md.nolink)、解放する[`deallocate_bytes()`](/reference/memory_resource/polymorphic_allocator/deallocate_bytes.md.nolink)メンバ関数を追加
    - 指定した型のメモリを確保する[`allocate_object()`](/reference/memory_resource/polymorphic_allocator/allocate_object.md.nolink)、解放する[`deallocate_object()`](/reference/memory_resource/polymorphic_allocator/deallocate_object.md.nolink)を追加


### ユーティリティ
- [`std::swap()`](/reference/utility/swap.md)関数に`constexpr`を追加
- [`std::exchange()`](/reference/utility/exchange.md)関数に`constexpr`を追加
- [`std::complex`](/reference/complex/complex.md)クラスを`constexpr`に対応
- [`std::pair`](/reference/utility/pair.md)クラスの[コンストラクタ](/reference/utility/pair/op_constructor.md)、[代入演算子](/reference/utility/pair/op_assign.md)、[`swap()`](/reference/utility/pair/swap.md)メンバ関数、[`swap()`](/reference/utility/pair/swap_free.md)非メンバ関数に`constexpr`を追加。このクラスのメンバ関数はすべて`constexpr`に対応した
- [`std::tuple`](/reference/tuple/tuple.md)クラスの[コンストラクタ](/reference/tuple/tuple/op_constructor.md)、[代入演算子](/reference/tuple/tuple/op_assign.md)、[`swap()`](/reference/tuple/tuple/swap.md)メンバ関数、[`swap()`](/reference/tuple/tuple/swap_free.md)非メンバ関数に`constexpr`を追加。このクラスのメンバ関数はすべて`constexpr`に対応した
- [`<functional>`](/reference/functional.md)に、[`std::reference_wrapper`](/reference/functional/reference_wrapper.md)`<T>`型をアンラップする[`std::unwrap_reference`](/reference/functional/unwrap_reference.md.nolink)型特性、[`std::decay`](/reference/type_traits/decay.md) + [`std::reference_wrapper`](/reference/functional/reference_wrapper.md)`<T>`型のアンラップをする[`std::unwrap_ref_decay`](/reference/functional/unwrap_ref_decay.md.nolink)型特性を追加
- [`std::reference_wrapper`](/reference/functional/reference_wrapper.md)クラス、[`std::ref()`](/reference/functional/ref.md)関数、[`std::cref()`](/reference/functional/cref.md)関数のテンプレートパラメータ`T`型に不完全型を指定することを許可
- 関数の部分適用をかんたんにするために、[`std::bind_front()`](/reference/functional/bind_front.md.nolink)関数を追加


### ファイルシステム
- [`std::filesystem::create_directory()`](/reference/filesystem/create_directory.md)と[`std::filesystem::create_directories()`](/reference/filesystem/create_directories.md)の仕様が直感的ではなく、すでにディレクトリが存在している場合にエラーとなっていた。C++20ではその状況ではエラーにならないようにする (エラーではなく`false`が返る)


### 型特性
- [`<type_traits>`](/reference/type_traits.md)に、constexpr関数が定数式評価されたかを判定する特殊な関数[`std::is_constant_evaluated()`](/reference/type_traits/is_constant_evaluated.md.nolink)を追加
- [`<type_traits>`](/reference/type_traits.md)に、エンディアンを表す列挙型として[`std::endian`](/reference/type_traits/endian.md)を追加
- [`<type_traits>`](/reference/type_traits.md)に、型のCV修飾と参照を除去する型特性クラスとして[`std::remove_cvref`](/reference/type_traits/remove_cvref.md)を追加
- [`<type_traits>`](/reference/type_traits.md)に、受け取った型をそのまま返す[`std::type_identity`](/reference/type_traits/type_identity.md.nolink)を追加
- [`<type_traits>`](/reference/type_traits.md)に、例外送出せずに暗黙の型変換が可能かを判定する[`std::is_nothrow_convertible`](/reference/type_traits/is_nothrow_convertible.md.nolink)を追加
- [`<type_traits>`](/reference/type_traits.md)に、要素数が判明している配列型かを判定する[`std::is_bounded_array`](/reference/type_traits/is_bounded_array.md.nolink)、要素数が不明な配列型かを判定する[`std::unbounded_array`](/reference/type_traits/is_unbounded_array.md.nolink)を追加


### 機能の非推奨化
- 一貫比較機能にとって比較演算子の定義が容易になったため、不要になった演算子の簡潔定義機能である[`std::rel_ops`](/reference/utility/rel_ops.md)を非推奨化


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

