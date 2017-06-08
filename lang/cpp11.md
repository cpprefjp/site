# C++11

## 概要
C++11とは、2011年8月に改訂され、ISO/IEC 14882:2011で標準規格化されたC++バージョンの通称である。

前バージョンであるC++03からメジャーバージョンアップされ、多くの有用な機能が追加された。

このバージョンは、策定中はC++0xと呼ばれていた。これは、2009年中までに策定を完了させることを目指して、下一桁を伏せ字にしたものである。


## 言語機能

### 一般的な機能

| 言語機能       | 説明 |
|----------------|------|
| [`auto`](cpp11/auto.md) | 型推論 |
| [`decltype`](cpp11/decltype.md) | 式の型を取得 |
| [範囲for文](cpp11/range_based_for.md) | 配列やコンテナといった範囲を表すオブジェクトを、簡潔に走査する |
| [初期化子リスト](cpp11/initializer_lists.md) | 波括弧による初期化をユーザー定義する。`vector<int> v = {1, 2, 3};`など。 |
| [一様初期化](cpp11/uniform_initialization.md) | コンストラクタの呼び出しを、波カッコで行う。`T x {a, b, c};` |
| [右辺値参照・ムーブセマンティクス](cpp11/rvalue_ref_and_move_semantics.md) | 右辺値によるオーバーロード、およびそれによるリソースの所有権移動 |
| [ラムダ式](cpp11/lambda_expressions.md) | 関数オブジェクトをその場に書く |
| [`noexcept`](cpp11/noexcept.md) | 関数の例外指定、例外を投げる可能性のある式か`bool`値を返す演算子 |
| [`constexpr`](cpp11/constexpr.md) | 定数式 |
| [`nullptr`](cpp11/nullptr.md) | ヌルポインタを表すポインタリテラル |
| [インライン名前空間](cpp11/inline_namespaces.md) | ネストした名前空間に、透過的にアクセスする |
| [ユーザー定義リテラル](cpp11/user_defined_literals.md) | リテラルのサフィックスをユーザー定義する |


### クラス関係の機能

| 言語機能       | 説明 |
|----------------|------|
| [関数の`default`／`delete`宣言](cpp11/defaulted_and_deleted_functions.md) | 自動定義される特殊関数の制御 |
| [移譲コンストラクタ](cpp11/delegating_constructors.md) | コンストラクタから他のコンストラクタに処理を移譲する |
| [非静的メンバ変数の初期化](cpp11/non_static_data_member_initializers.md) | メンバ変数を、宣言と同時に初期値指定する |
| [継承コンストラクタ](cpp11/inheriting_constructors.md) | 基本クラスのコンストラクタを継承する |
| [`override`と`final`](cpp11/override_final.md) | メンバ関数のオーバーライド指定、および派生クラスでのオーバーライドの禁止を指定する |
| [明示的な型変換演算子のオーバーロード](cpp11/explicit_conversion_operator.md) | 明示的な型変換が行われる場合にのみ呼び出される演算子をオーバーロードできるようにする |
| [`friend`宣言できる対象を拡張](cpp11/extend_friend_targets.md) | テンプレートパラメータや型の別名を`friend`宣言する |
| [メンバ関数の左辺値／右辺値修飾](cpp11/ref_qualifier_for_this.md) | オブジェクトが左辺値／右辺値の場合のみ呼び出し可能であることの指定 |


### クラス以外の型に関する機能

| 言語機能       | 説明 |
|----------------|------|
| [スコープを持つ列挙型](cpp11/scoped_enum.md) | 強い型付けとスコープを持つ列挙型の導入と、それにともなって従来の列挙型を機能拡張 |
| [共用体の制限解除](cpp11/unrestricted_unions.md) | 共用体のメンバ変数として、クラスオブジェクトを持てるようにする |


### テンプレート関係の機能

| 言語機能       | 説明 |
|----------------|------|
| [テンプレートの右山カッコ](cpp11/right_angle_brackets.md) | `vector<basic_string<char>>`のように、`>>`をスペースを空けずに記述可能にする |
| [`extern template`](cpp11/extern_template.md) | テンプレートのインスタンス化を抑止する |
| [エイリアステンプレート](cpp11/alias_templates.md) | テンプレートによって型の別名を定義する |
| [可変引数テンプレート](cpp11/variadic_templates.md) | 任意の数のテンプレートパラメータを受け取れるようにする |
| [ローカル型と無名型を、テンプレート引数として使用することを許可](cpp11/local_and_unnamed_type_as_template_arguments.md) | ローカルおよび無名として定義したクラスや列挙型を、テンプレート引数として渡せるようにする |
| [任意の式によるSFINAE](cpp11/sfinae_expressions.md) | 特定の式が有効かどうかで、その関数をオーバーロード解決に含めるかどうかを決定する |
| [テンプレートのエクスポート機能を削除](cpp11/remove_export_templates.md) | テンプレート定義をエクスポートする機能を削除する |


### 並行関係の機能

| 言語機能       | 説明 |
|----------------|------|
| [スレッドローカルストレージ](cpp11/thread_local_storage.md) | スレッドごとに異なる静的記憶域に保持される変数 |
| [ブロックスコープを持つ`static`変数初期化のスレッドセーフ化](cpp11/static_initialization_thread_safely.md) | 関数ローカルで定義した`static`変数の初期化を、スレッドセーフにする |


### その他様々なユーティリティ

| 言語機能       | 説明 |
|----------------|------|
| [戻り値の型を後置する関数宣言構文](cpp11/trailing_return_types.md) | 戻り値の型を後ろに書けるようにすることで、パラメータオブジェクトを戻り値型の文脈で使用できるようにする |
| [コンパイル時アサート](cpp11/static_assert.md) | コンパイル時に条件式が真であることを表明する |
| [生文字列リテラル](cpp11/raw_string_literals.md) | 文字列リテラルにRプレフィックスを付けることで、エスケープシーケンスを無視する |
| [`char16_t`と`char32_t`](cpp11/char16_32.md)  | UTF-16とUTF-32の文字型 |
| [UTF-8文字列リテラル](cpp11/utf8_string_literals.md) | `char`の文字列をUTF-8エンコーディングするプレフィックス |
| [属性構文](cpp11/attributes.md) | `[[attr]]`構文による、クラス、関数、変数の属性指定 |
| [`alignas`](cpp11/alignas.md) | アライメントを指定する |
| [`alignof`](cpp11/alignof.md) | アライメントを取得する |


### 小さな変更

ここでは、コア言語作業グループへ問題報告され、その解決策として導入された言語仕様の変更を解説する。

| 言語機能 | 説明 |
|----------|------|
| [更新された定義済みマクロ](cpp11/predefined_macros.md) | 標準規格で定義されたマクロの更新 |
| [テンプレート再帰回数の制限緩和](cpp11/recursive_template_limit.md) | 17回から1024回に制限緩和 |
| [依存名に対する`typename`と`template`の制限緩和](cpp11/dependent_name_specifier_outside_of_templates.md) | テンプレート外でも`typename`と`template`を付けられるようになった |
| [入れ子名の指定にグローバルスコープ`::`を付加することを許可](cpp11/global_scope_syntax_in_nested_name_specifier.md) | `struct ::A {};`のように入れ子名を指定する際にグローバルスコープから指定できるようになった |
| [宣言時に要素数を指定した配列オブジェクトの、定義時の要素数を規定](cpp11/ealier_declarated_array_bounds.md) | `static`メンバや`extern`として宣言した配列を定義した際、宣言時に指定した要素数として定義されることが規定された |
| [POSIX用の名前空間を予約](cpp11/reserved_namespaces_for_posix.md) | 将来の標準化のためにPOSIX用の名前空間を予約し、ユーザーがその名前空間で機能を定義することを禁止する |
| [`sizeof`演算子にクラスの非静的メンバを、オブジェクトを作らずに指定できるようにする](cpp11/extending_sizeof_to_apply_to_non_static_data_members_without_an_object.md) | `sizeof(T::data_member)`のように指定して非静的メンバのサイズを取得する |
| [`register`キーワードを非推奨化](cpp11/deprecation_of_the_register_keyword.md) | コンパイラに使われなくなった最適化用の機能を非推奨化 |
| [参照への参照を折りたたむ](cpp11/reference_collapsing.md) | `T&`型に参照を足しても`T&`となる |


### C99互換機能
C99は、1999年に改訂され、ISO/IEC 9899:1999で標準規格化されたC言語バージョンの通称である。

C++11では、参照するC言語の規格がC89からC99に変更となり、C99の言語機能が一部、C++に導入された。

| 言語機能       | 説明 |
|----------------|------|
| [可変引数マクロ](cpp11/variadic_macros.md) | マクロで任意の数の引数を受け取る |
| [Pragma演算子](cpp11/pragma_operator.md) | 処理系定義の機能を使用する単項演算子 |
| [定義済みマクロ](cpp11/c99_predefined_macros.md) | C99互換で導入された定義済みマクロ |
| [文字列リテラルとワイド文字列リテラルの結合](cpp11/string_literal_concatenation.md) | ワイド文字列定数として結合する |
| [`long long`型](cpp11/long_long_type.md) | 64ビット以上の大きさを持つ整数型 |
| [事前定義識別子`__func__`](cpp11/func.md) | 現在いる関数名が格納されている識別子 |
| [列挙子の末尾へのカンマ付加を許可](cpp11/trailing_comma_following_enumerator_list.md) | 末尾の列挙子の後ろにカンマを書くことが許可された |
| [整数に対する除算と剰余算の丸め結果を規定](cpp11/result_of_integer_division_and_modulo.md) | これまで実装定義だった整数の除算と剰余算に対する丸め方法を、標準で規定する |


## ライブラリ更新の概要

### コンテナ

- 固定長配列クラス[`std::array`](/reference/array.md)を追加
- 単方向リンクリストの実装である[`std::forward_list`](/reference/forward_list.md)を追加
- ハッシュ表の連想コンテナである[`std::unordered_map`](/reference/unordered_map/unordered_map.md)クラス、[`std::unordered_set`](/reference/unordered_set/unordered_set.md)クラス、およびその重複を許可するバージョンを追加
- コンテナ全般がムーブセマンティクスに対応
    - クラステンプレートのパラメータ`T`が、コピー構築可能な型だけでなく、ムーブ構築のみ可能な型も受け付けるようになった
	- `push_back()`や`insert()`等の要素追加のためのメンバ関数が、新たな要素のコピーだけでなく、一時オブジェクトも受け取れて、ムーブで挿入ができるようになった。
- 要素追加のためのメンバ関数として、クラステンプレートのパラメータ`T`のコンストラクタ引数を受け取り、一時オブジェクトの生成コストを減らせるものが追加された。これらは、以下のように命名されたメンバ関数である：`emplace()`、`emplace_back()`、`emplace_front()`
- コンテナのメモリアロケータが状態を持てるようになった
- 初期化子リストでコンテナを初期化できるようになった
- 初期化子リストをパラメータで受け取れるようにするためのクラス[`std::initializer_list`](/reference/initializer_list.md)を追加
- 型情報型を連想コンテナのキーとして使用するための[`std::type_index`](/reference/typeindex/type_index.md)クラスを追加


### イテレータ

- イテレータを進める関数[`std::next()`](/reference/iterator/next.md)、イテレータを逆に進める関数[`std::prev()`](/reference/iterator/prev.md)を追加
- 要素をムーブするイテレータとして、[`std::move_iterator`](/reference/iterator/move_iterator.md)クラスを追加
- 先頭イテレータと末尾イテレータを取得する非メンバ関数として、[`std::begin()`](/reference/iterator/begin.md)と[`std::end()`](/reference/iterator/end.md)を追加


### アルゴリズム

- 範囲が特定の条件を満たしているか調べる、[`std::all_of()`](/reference/algorithm/all_of.md)、[`std::any_of()`](/reference/algorithm/any_of.md)、[`std::none_of`](/reference/algorithm/none_of.md)を追加
- 条件を満たしていない最初の要素を検索する[`std::find_if_not()`](/reference/algorithm/find_if_not.md)を追加
- 指定された数の要素をコピーする[`std::copy_n()`](/reference/algorithm/copy_n.md)を追加
- 条件を満たす要素のみをコピーする[`std::copy_if()`](/reference/algorithm/copy_if.md)を追加
- 範囲の要素をムーブする[`std::move()`](/reference/algorithm/move.md)、[`std::move_backward()`](/reference/algorithm/move_backward.md)を追加
- 新たな乱数ライブラリ[`<random>`](/reference/random.md)に対応した範囲のシャッフルアルゴリズム[`std::shuffle()`](/reference/algorithm/shuffle.md)を追加
- 範囲がソート済みか調べる[`std::is_sorted()`](/reference/algorithm/is_sorted.md)を追加
- 2つの値の最小値を取得する[`std::min()`](/reference/algorithm/min.md)、最大値を取得する[`std::max()`](/reference/algorithm/max.md)に、初期化子リストによる可変引数版を追加
- 最小値と最大値を同時に取得する関数[`std::minmax()`](/reference/algorithm/minmax.md)、[`std::minmax_element()`](/reference/algorithm/minmax_element.md)を追加
- 指定された値から始まる整数列を生成する[`std::iota()`](/reference/numeric/iota.md)を追加


### メモリ管理

- メモリアロケータの実装をより容易にするために、コンテナとメモリアロケータの中間インタフェースとして[`std::allocator_traits`](/reference/memory/allocator_traits.md)を追加
- スマートポインタの実装として、所有権共有方式の[`std::shared_ptr`](/reference/memory/shared_ptr.md)クラスと、所有権専有方式の[`std::unique_ptr`](/reference/memory/unique_ptr.md)クラスを追加
- 従来のスマートポインタ`auto_ptr`クラスを、非推奨とする
- `operator&()`がオーバーロードされていたとしても正しく変数のアドレスを取得する関数、[`std::addressof()`](/reference/memory/addressof.md)を追加


### 入出力
- 標準ライブラリ中の入力ストリーム演算子`operator<<()`と出力ストリーム演算子`operator>>()`がムーブセマンティクスに対応。ストリームの一時オブジェクトを受け取れるようになった


### 文字列処理
- UTF-16の文字列型[`std::u16string`](/reference/string/basic_string.md)、UTF-32の文字列型[`std::u32string`](/reference/string/basic_string.md)を追加
- UTF-8とUTF-16、UTF-8とUTF-32といった、マルチバイト文字とワイド文字列の相互変換を行うクラス[`std::wstring_convert`](/reference/locale/wstring_convert.md)を追加
- 数値から文字列オブジェクトに変換する関数として、[`std::to_string()`](/reference/string/to_string.md)と[`std::to_wstring()`](/reference/string/to_wstring.md)を追加
- 文字列オブジェクトから数値に変換する、[`std::stoi()`](/reference/string/stoi.md)や[`std::stof()`](/reference/string/stof.md)といった関数を追加


### 関数オブジェクト
- 関数ポインタと関数オブジェクトを統一的に扱えるクラス[`std::function`](/reference/functional/function.md)を追加
- 関数の引数を束縛して部分適用する関数[`std::bind()`](/reference/functional/bind.md)を追加
- メンバ関数ポインタを関数オブジェクトにアダプトする関数[`std::mem_fn()`](/reference/functional/mem_fn.md)を追加
- テンプレートに、明示的に左辺値参照を渡すための渡すためのクラス[`std::reference_wrapper`](/reference/functional/reference_wrapper.md)と、そのヘルパ関数である[`std::ref()`](/reference/functional/ref.md)と[`std::cref()`](/reference/functional/cref.md)を追加
- ハッシュ表コンテナの追加にともない、オブジェクトのハッシュ値を計算する関数オブジェクト[`std::hash`](/reference/functional/hash.md)クラスを追加
- ビット演算の関数オブジェクトとして、[`std::bit_and`](/reference/functional/bit_and.md)、[`std::bit_or`](/reference/functional/bit_or.md)、[`std::bit_xor`](/reference/functional/bit_xor.md)を追加
- 従来の関数オブジェクトアダプタ`std::unary_function`、`std::binary_function`、`std::mem_fun()`、`std::mem_fun_ref()`等を非推奨とする
- 従来の関数バインダ`std::bind1st`、`std::bind2nd`等を非推奨とする


### 並行処理
- スレッドを管理するクラス[`std::thread`](/reference/thread/thread.md)を追加
- スレッド間での排他制御を行うミューテックスの実装である[`std::mutex`](/reference/mutex/mutex.md)クラス、[`std::recursive_mutex`](/reference/mutex/recursive_mutex.md)クラス等を追加
    - ミューテックスの所有権放棄を自動的に行うためのクラス[`std::lock_guard`](/reference/mutex/lock_guard.md)、[`std::unique_lock`](/reference/mutex/unique_lock.md)を追加
- スレッドセーフに一度だけ処理を呼び出す関数、[`std::call_once()`](/reference/mutex/call_once.md)を追加
- 条件変数の実装である[`std::condition_variable`](/reference/condition_variable/condition_variable.md)クラス、[`std::condition_variable_any`](/reference/condition_variable/condition_variable_any.md)クラスを追加
- Futureデザインパターンをサポートする[`std::future`](/reference/future/future.md)クラス、[`std::promise`](/reference/future/promise.md)クラス、およびその補助機能を追加
- アトミック操作のライブラリ[`<atomic>`](/reference/atomic.md)を追加


### 汎用的なユーティリティ
- `std::swap()`関数を、[`<algorithm>`](/reference/algorithm.md)から[`<utility>`](/reference/utility.md)に移動
- ムーブセマンティクスのために、左辺値を右辺値に変換する関数[`std::move()`](/reference/utility/move.md)を追加
- 引数転送のための関数[`std::forward()`](/reference/utility/forward.md)を追加
- [`std::pair`](/reference/utility/pair.md)クラスの[コンストラクタ](/reference/utility/pair/op_constructor.md)が、それぞれの要素型のコンストラクタ引数を直接受け取れるようになった
- タプルの実装である[`std::tuple`](/reference/tuple/tuple.md)クラスを追加
- SFINAEのために、型の値を取得する関数[`std::declval()`](/reference/utility/declval.md)を追加
- 時間ユーティリティライブラリ[`<chrono>`](/reference/chrono.md)を追加
- 型特性ライブラリ[`<type_traits>`](/reference/type_traits.md)を追加


### エラー報告
- OSのエラー値を扱うライブラリ[`<system_error>`](/reference/system_error.md)を追加


### 正規表現ライブラリ
- 正規表現ライブラリ[`<regex>`](/reference/regex.md)を追加
- ECMAScript、POSIX、AWK、grepなどの構文を切り替えて使用できるのが特徴。デフォルトではECMAScript


### 乱数ライブラリ
- 乱数ライブラリ[`<random>`](/reference/random.md)を追加
- 複数定義されている乱数生成器と分布アルゴリズムを、組み合わせて使用するのが特徴


### C互換ライブラリ
- ビット幅規定の整数型ライブラリである[`<cstdint>`](/reference/cstdint.md)を追加


## 参照
- [C++11 Overview - Standard C++](https://isocpp.org/wiki/faq/cpp11)

