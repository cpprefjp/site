# C++17

## 概要
C++17とは、2017年中に改訂される予定の、C++バージョンの通称である。

このバージョンは、策定中はC++1zと呼ばれていた。前バージョンであるC++11が策定中にC++0xと呼ばれ、C++14がC++1yと呼ばれており、「201z年にリリースされる」という年数の伏せ字として「z」が使われていた。

## 策定体制
C++14の策定開始段階から「Study Group (SG)」と呼ばれる専門家グループが複数作られ、そこで同時並行に新機能の議論、策定が進められていた。C++14ではそれらの機能は導入されなかったが、C++17ではSGで議論された機能のうち、仕様が固まったもののいくつかが導入されることとなった。

各SGで考えられた仕様は「Technical Specification (TS)」という単位で個別に各国の承認をとっている。その段階では、ライブラリ機能は`std::exprerimental`名前空間などで各コンパイラが実験的にサポートをしていた。これはコンパイラが実装経験を積み、ユーザーが使用経験を得てから標準に採用するためである。

C++17では以下のTSが採用された：

| TS | 説明 |
|----|------|
| Library Fundamentals TS | 基本的なライブラリ機能。`any`, `optional`, `string_view`, メモリプール, 検索アルゴリズム, サンプリングアルゴリズム, タプルを展開して関数呼び出しする`apply`関数, `shared_ptr`の配列対応, 最大公約数と最小公倍数などが含まれる |
| Filesystem TS | ファイルシステムのライブラリ |
| Parallelism TS | 並列ライブラリ。`<algorithm>`や`<numeric>`に並列アルゴリズムが追加される |


## 言語機能
### 変数・データ構造関係

| 言語機能 | 説明 |
|----------|------|
| 浮動小数点数の16進数リテラル | 16進数表記で浮動小数点数リテラルを記述できるようにする |
| インライン変数               | 翻訳単位を跨いでひとつのオブジェクトになる変数を定義する |
| 構造化束縛                   | 組・タプル・配列を展開して変数定義する |
| [波括弧初期化の型推論の新規則](cpp17/new_rules_for_auto_deduction_from_braced-init-list.md) | 波括弧初期化子が単一要素の場合は `T` に推論，複数要素の場合は不適格 |
| [`[[maybe_unused]]`属性](cpp17/maybe_unused.md)       | 使用しない可能性のある変数に対する警告を抑制する |
| [`[[nodiscard]]`属性](cpp17/nodiscard.md)             | 戻り値を捨ててはならないことを指定する |
| 値のコピー省略を保証         | 右辺値を変数の初期化のために使用する場合、コピーもムーブも省略することを保証 |
| 厳密な式の評価順             | 式の評価順を規定する |
| 参照メンバをもつクラスの置き換え | 参照型メンバや`const`データメンバを含むクラスについてこれまで結果は未定義とされていた配置`new`によるオブジェクトの置き換えを条件付きで可能とする |
| `enum class`変数の初期値として整数を指定する際の規則を調整 | キャストを使用することなく整数を初期値として使用し、`E e{0};`のような初期化を許可 |


### 制御構文

| 言語機能 | 説明 |
|----------|------|
| `if`文と`switch`文の条件式と初期化を分離 | `if (init; condition)`のように初期化と条件式を分けて記述できるようにする |
| [`[[fallthrough]]`属性](cpp17/fallthrough.md)                    | フォールスルー時の警告を抑制する |
| `if constexpr`文                         | `if constexpr(cond)`とすることで、その`if`文はコンパイル時に処理される |
| 範囲`for`文のための`begin()`と`end()`関数が、異なる型を返すことを許可 | `begin()`と`end()`が異なるイテレータ型を返せるようにすることで、終端イテレータを定義しやすくする |


### ラムダ式

| 言語機能 | 説明 |
|----------|------|
| ラムダ式での`*this`のコピーキャプチャ | キャプチャリストに`*this`を指定することで、`*this`をコピーキャプチャする |
| `constexpr`ラムダ                     | ラムダ式の関数オブジェクトが定数式の文脈で使用された場合に、それがコンパイル時に評価されるようにする |


### テンプレート

| 言語機能 | 説明 |
|----------|------|
| [畳み込み式](cpp17/folding_expressions.md)   | パラメータパックに対する二項演算の累積処理 |
| テンプレートテンプレートパラメータに`typename`キーワードの使用を許可 | `class`キーワードしか使用できなかった部分に、`typename`を許可する |
| クラステンプレートのテンプレート引数推論 | コンストラクタの引数からクラスのテンプレート引数を推論できるようにする |
| 非型テンプレートパラメータの`auto`宣言   | `template <auto x>`とすることで、`X<3>;` `X<true>;` `X<'a'>`のように定数を受け取りやすくする |
| 全ての非型テンプレート引数の定数式評価を許可 | ポインタの定数式評価として、配列からポインタへの変換や、関数から関数ポインタへの変換などを許可 |
| `using`宣言のパック展開                      | パラメータパックの型を基本クラスとして指定した場合に、using宣言に基本クラスのパラメータパックを指定できるようにする |


### 定数式

| 言語機能               | 説明 |
|------------------------|------|
| [`static_assert`のメッセージ省略を許可](cpp17/extending_static_assert.md) | 第2引数だった診断メッセージの省略を許可する |
| `constexpr`ラムダ                     | ラムダ式の関数オブジェクトが定数式の文脈で使用された場合に、それがコンパイル時に評価されるようにする |
| `if constexpr`文                      | `if constexpr(cond)`とすることで、その`if`文はコンパイル時に処理される |


### 名前空間

| 言語機能 | 説明 |
|----------|------|
| [入れ子名前空間の定義](cpp17/nested_namespace.md)               | `namespace A::B {}`のように、入れ子の名前空間を簡単に定義できるようにする |
| [名前空間と列挙子への属性付加を許可](cpp17/attributes_for_namespaces_and_enumerators.md) | 名前空間の定義と、列挙型の各要素の定義に、属性を付けられるようにする |
| `using`宣言のパック展開            | パラメータパックの型を基本クラスとして指定した場合に、using宣言に基本クラスのパラメータパックを指定できるようにする |


### 例外

| 言語機能 | 説明 |
|----------|------|
| [例外仕様を型システムの一部にする](cpp17/exception_spec_be_part_of_the_type_system.md.nolink) | 関数の型に例外仕様が含まれるようにする |
| [非推奨だった古い例外仕様を削除](cpp17/remove_deprecated_exception_specifications.md) | `throw`キーワードによる例外仕様を削除。`throw()`は残る |


### 属性

| 言語機能 | 説明 |
|----------|------|
| [`[[fallthrough]]`属性](cpp17/fallthrough.md)                 | フォールスルー時の警告を抑制する |
| [`[[maybe_unused]]`属性](cpp17/maybe_unused.md)               | 使用しない可能性のある変数に対する警告を抑制する |
| [`[[nodiscard]]`属性](cpp17/nodiscard.md)                     | 戻り値を捨ててはならないことを指定する |
| [名前空間と列挙子への属性付加を許可](cpp17/attributes_for_namespaces_and_enumerators.md) | 名前空間の定義と、列挙型の各要素の定義に、属性を付けられるようにする |
| [属性の名前空間指定に繰り返しをなくす](cpp17/using_attribute_namespaces.md) | `[[using CC: opt(1), debug]]`のように属性の名前空間宣言をまとめて行う |
| [不明な属性を無視する](cpp17/non_standard_attributes.md)                 | 実装が知らない名前空間の属性は無視する |


### プリプロセッサ

| 言語機能 | 説明 |
|----------|------|
| [`__has_include`](cpp17/has_include.md) | インクルードするファイルが存在するかを確認する |


### 機能の削除

| 言語機能 | 説明 |
|----------|------|
| トライグラフを削除                     | 現代では使用する必要がなくなったトライグラフ機能を削除 |
| [非推奨だった`register`キーワードを削除](cpp17/remove_deprecated_use_of_the_register_keyword.md) | コンパイラから単に無視されていた`register`キーワードを削除。予約語は残る |
| [非推奨だった`bool`型に対するインクリメント演算子を削除](cpp17/remove_deprecated_increment_of_bool.md) | `bool`変数に対して`++`すると`true`になる仕様を削除 |
| [非推奨だった古い例外仕様を削除](cpp17/remove_deprecated_exception_specifications.md) | `throw`キーワードによる例外仕様を削除。`throw()`は残る |



### 小さな変更

ここでは、コア言語作業グループへ問題報告され、その解決策として導入された言語仕様の変更を解説する。

| 言語機能 | 説明 |
|----------|------|
| [更新された定義済みマクロ](cpp17/predefined_macros.md) | 標準規格で定義されたマクロの更新 |
| [`noexcept`付きのラムダ式から変換する関数ポインタに`noexcept`を付加する](cpp17/lambda_to_noexcept_function_pointer.md) | キャプチャを持たない非ジェネリックラムダに`noexcept`を付加した場合、変換した関数ポインタに`noexcept`を付加する |


## ライブラリ更新の概要
### 新ライブラリ
- [`<filesystem>`](/reference/filesystem.md.nolink)ヘッダを新設し、ファイルシステムライブラリを追加。ファイル、ディレクトリなどを扱う
- [`<algorithm>`](/reference/algorithm.md)や[`<numeric>`](/reference/numeric.md)のアルゴリズムに、並列実行のオプションを追加
- [`<optional>`](/reference/optional.md.nolink)ヘッダを新設し、統一的な有効値と無効値の表現をもつ[`optional`](/reference/optional/optional.md.nolink)クラスを追加
- [`<variant>`](/reference/variant.md.nolink)ヘッダを新設し、型安全な共用体[`variant`](/reference/variant/variant.md.nolink)クラスを追加
- [`<any>`](/reference/any.md.nolink)ヘッダを新設し、なんでも代入できる[`any`](/reference/any/any.md.nolink)クラスを追加
- 標準ライブラリの参照をC11に更新
    - [`<cfloat>`](/reference/cfloat.md)に、非正規化数の有無を判定するマクロ、10進数の桁数を表すマクロ、正の最小数を表すマクロを追加
    - [`<cstdlib>`](/reference/cstdlib.md)に、[`aligned_alloc()`](/reference/cstdlib/aligned_alloc.md.nolink)関数を追加
    - [`<ctime>`](/reference/ctime.md.nolink)に、[`TIME_UTC`](/reference/ctime/time_utc.md.nolink)マクロ, [`timespec`](/reference/ctime/timespec.nolink)構造体, [`timespec_get()`](/reference/ctime/timespec_get.md.nolink)関数を追加
    - [`<cstdio>`](/reference/cstdio.md.nolink)に、[`vfscanf()`](/reference/cstdio/vfscanf.md.nolink)関数を追加
    - `<ccomplex>`, `<cstdalign>`, `<cstdbool>`, `<ctgmath>`を非推奨化


### コンテナ
- コンテナのコピー・ムーブ、`swap`操作に`noexcept`を追加
- コンテナの要素情報にアクセスする非メンバ関数として、[`<iterator>`](/reference/iterator.md)に[`size()`](/reference/iterator/size.md.nolink), [`empty()`](/reference/iterator/empty.md.nolink), [`data()`](/reference/iterator/data.md.nolink)関数を追加
- コンテナに不完全型の最小サポートを追加。[`vector`](/reference/vector.md), [`list`](/reference/list.md), [`forward_list`](/reference/forward_list.md)の要素型に、不完全型の指定を許可。ただし、これらのコンテナのなんらかのメンバ関数を呼び出す前には、要素型が完全型になっていること
- 多相アロケータとメモリプール。[`<memory_resource>`](/reference/memory_resource.md.nolink)が新設され、アロケートする型を規定しないアロケータと、それを利用したメモリプールの仕組みが導入される
- 標準イテレータ全般と[`array`](/reference/array.md)の変更操作に`constexpr`を追加
- `emplace_front()`と`emplace_back()`メンバ関数で、追加された要素を返すようにする
- 連想コンテナの接合機能を追加。ほかのコンテナに要素を移すために抽出する`extract()`メンバ関数、抽出された要素をほかのコンテナに移すための`insert()`メンバ関数のオーバーロード、2つの連想コンテナをまるごと接合する`merge()`メンバ関数を追加
- `map`と`unordered_map`に、挿入失敗時の動作を規定した新たなメンバ関数として、`try_emplace()`と`insert_or_assign()`を追加
- イテレータの分類に「隣接イテレータ (contiguous iterator)」を追加。要素間のメモリが隣接していることを表す。以下のコンテナのイテレータは、隣接イテレータであることが規定される：
    - [`basic_string`](/reference/string/basic_string.md)
    - [`array`](/reference/array.md)
    - `bool`以外を要素型とする[`vector`](/reference/vector.md)
    - [`valarray`](/reference/valarray/valarray.md) (の非メンバ関数である[`std::begin()`](/reference/valarray/valarray/begin_free.md)、[`std::end()`](/reference/valarray/valarray/end_free.md)で返されるイテレータは隣接イテレータ)


### アルゴリズム
- ランダムサンプリングアルゴリズムとして、[`sample()`](/reference/algorithm/sample.md.nolink)を追加
- 値を範囲内に収める[`clamp()`](/reference/algorithm/clamp.md.nolink)関数を追加
- `bool`を返す関数オブジェクトの結果を反転させる[`not_fn()`](/reference/functional/not_fn.md.nolink)関数を追加
- INVOKEコンセプトに従った関数呼び出しをする[`invoke()`](/reference/functional/invoke.md.nolink)関数を追加
- [`reference_wrapper`](/reference/functional/reference_wrapper.md)がTriviallyCopyableであることを保証
- オブジェクトを`const`にする[`as_const()`](/reference/utility/as_const.md)関数を追加
- 未初期化メモリのアルゴリズムと、デストラクタ呼び出しの関数として、以下の関数を追加： [`destroy_at()`](/reference/memory/destroy_at.md.nolink), [`destroy()`](/reference/memory/destroy.md.nolink), [`destroy_n()`](/reference/memory/destroy_n.md.nolink), [`uninitialized_move()`](/reference/memory/uninitialized_move.md.nolink), [`uninitialized_move_n()`](/reference/memory/uninitialized_move_n.md.nolink), [`uninitialized_value_construct()`](/reference/memory/uninitialized_value_construct.md.nolink), [`uninitialized_value_construct_n()`](/reference/memory/uninitialized_value_construct_n.md.nolink), [`uninitialized_default_construct()`](/reference/memory/uninitialized_default_construct.md.nolink), [`uninitialized_default_construct()`](/reference/memory/uninitialized_default_construct.md.nolink)


### 文字列
- [`<string_view>`](/reference/string_view.md.nolink)クラスを新設し、所有権を持たない文字列クラスである[`basic_string_view`](/reference/string_view/basic_string_view.md.nolink)を追加
- [`basic_string::data()`](/reference/string/basic_string/data.md)メンバ関数の非`const`版を追加
- 文字列検索アルゴリズムとして、「ボイヤー・ムーア法 (Boyer-Moore)」と「ボイヤー・ムーア・ホースプール法 (Boyer-Moore-Horspool)」を追加。[`std::search()`](/reference/algorithm/search.md)関数のポリシーとして、検索アルゴリズムを指定する
- ロケール依存なし、フォーマット解析なしの高速な文字列・数値変換関数として、[`to_chars()`](/reference/utility/to_chars.md.nolink)と[`from_chars()`](/reference/utility/from_chars.md.nolink)を追加
- [`char_traits`](/reference/string/char_traits.md)クラスを`constexpr`に対応
- バイトデータを表す[`byte`](/reference/cstddef/byte.md.nolink)型を追加


### 並行処理
- タイムアウト機能がないReaders-writer lockのミューテックスとして、[`shared_mutex`](/reference/shared_mutex/shared_mutex.md.nolink)クラスを追加
- スコープ付きロックの可変引数版として、[`scoped_lock`](/reference/mutex/scoped_lock.md.nolink)クラスを追加
- [`atomic`](/reference/atomic/atomic.md)クラスに、指定された要素型に対するアトミック操作がロックフリー(非ミューテックス)に振る舞うかを判定するために`is_always_lock_free`定数を追加
- false sharingとtrue sharingを制御するための機能として、[`hardware_destructive_interference_size`](/reference/new/hardware_destructive_interference_size.md.nolink)定数と、[`hardware_constructive_interference_size`](/reference/new/hardware_constructive_interference_size.md.nolink)定数を追加


### スマートポインタ
- [`shared_ptr`](/reference/memory/shared_ptr.md)を配列に対応
- [`shared_ptr`](/reference/memory/shared_ptr.md)クラスに、指定された要素型の[`weak_ptr`](/reference/memory/weak_ptr.md)型を表す`weak_type`メンバ型を追加
- [`shared_ptr`](/reference/memory/shared_ptr.md)`::`[`use_count()`](/reference/memory/shared_ptr/use_count.md)の仕様を明確化
- [`shared_from_this`](/reference/memory/enable_shared_from_this/shared_from_this.md)の指す先が書き換わらないことを規定
- 配列版[`unique_ptr`](/reference/memory/unique_ptr.md)の型変換として、以下のコードが不適格だった：

    ```cpp
    std::unique_ptr<Foo const * const []> ptr1(new Foo*[10]);
    Foo const * ptr = ptr1[9];
    ```

    - このようなコードが適格になるよう、変換コンストラクタと変換代入演算子を追加

- [`unique_ptr`](/reference/memory/unique_ptr.md)のテンプレート代入演算子に、不足していたSFINAEルールを追加
- [`owner_less`](/reference/memory/owner_less.md)で、任意の要素型を持つ[`shared_ptr`](/reference/memory/shared_ptr.md)同士を比較できるようにする


### 数学
- [`<cmath>`](/reference/cmath.md)に数学の特殊関数を追加
- [`hypot()`](/reference/cmath/hypot.md)関数の3引数版を追加
- 最大公約数と最小公倍数の関数として、[`gcd()`](/reference/numeric/gcd.md.nolink)と[`lcm()`](/reference/numeric/lcm.md.nolink)を追加


### タプル
- タプルを展開して関数呼び出しする[`apply()`](/reference/tuple/apply.md.nolink)関数を追加
- タプルを任意の型のオブジェクトに変換する[`make_from_tuple()`](/reference/tuple/make_from_tuple.md.nolink)関数を追加
- 初期化子リストから[`pair`](/reference/utility/pair.md)と[`tuple`](/reference/tuple/tuple.md)を構築しやすくするための改善として、以下のコードが適格になるようコンストラクタの仕様を調整：

    ```cpp
    std::tuple<int, int> pixel_coordinates()
    {
      return {10, -15};  // コンパイルエラー
    }

    struct NonCopyable { NonCopyable(int); NonCopyable(const NonCopyable&) = delete; };

    std::pair<NonCopyable, double> pmd{42, 3.14}; // C++14ではコンパイルエラー
                                                  // C++17ではOK
    ```


### 型特性
- 値を返す型特性クラスの`constexpr`変数テンプレート版を追加。変数テンプレート版は、末尾に`_v`が付く。`v`は`value` (値) を意味する
- 型特性クラスを定義しやすくするために、[`void_t`](/reference/type_traits/void_t.md.nolink)を追加
- `bool`定数を表す[`bool_constant`](/reference/type_traits/bool_constant.md.nolink)を追加
- コンパイル時条件の論理演算のために、論理積である[`conjunction`](/reference/type_traits/conjunction.md.nolink)、論理和である[`disjunction`](/reference/type_traits/disjunction.md.nolink)、否定である[`negation`](/reference/type_traits/negation.md.nolink)を追加
- `swap`可能かを判定する型特性クラスとして、[`is_swappable_with`](/reference/type_traits/is_swappable_with.md.nolink)、[`is_swappable`](/reference/type_traits/is_swappable.md.nolink)、[`is_nothrow_swappable_with`](/reference/type_traits/is_nothrow_swappable_with.md.nolink)、[`is_nothrow_swappable`](/reference/type_traits/is_nothrow_swappable.md.nolink)を追加
- 関数が呼び出し可能かを判定する型特性として、[`is_invocable`](/reference/type_traits/is_invocable.md.nolink)、[`is_invocable_r`](/reference/type_traits/is_invocable_r.md.nolink)、[`is_nothrow_invocable`](/reference/type_traits/is_nothrow_invocable.md.nolink)、[`is_nothrow_invocable_r`](/reference/type_traits/is_nothrow_invocable_r.md.nolink)を追加
- 自動的にハッシュ値が求められる型かを判定するために[`has_unique_object_representations`](/reference/type_traits/has_unique_object_representations.md.nolink)型特性を追加
- [`invoke()`](/reference/functional/invoke.md.nolink)の追加にともない、関数の戻り値型を取得する型特性[`invoke_result`](/reference/type_traits/invoke_result.md.nolink)を追加。これまでの[`result_of`](/reference/type_traits/result_of.md)と違って関数型のテンプレート引数を使用しないため、それによって起こっていた厄介な問題を回避する


### 時間演算
- [`duration`](/reference/chrono/duration.md)の丸め演算として、切り下げをする[`floor()`](/reference/chrono/duration/floor.md.nolink)、切り上げをする[`ceil()`](/reference/chrono/duration/ceil.md.nolink)、最近接遇数への丸めをする[`round()`](/reference/chrono/duration/round.md.nolink)、絶対値を求める[`abs()`](/reference/chrono/duration/abs.md.nolink)を追加
- [`time_point`](/reference/chrono/time_point.md)の丸め演算として、切り下げをする[`floor()`](/reference/chrono/time_point/floor.md.nolink)、切り上げをする[`ceil()`](/reference/chrono/time_point/ceil.md.nolink)、最近接遇数への丸めをする[`round()`](/reference/chrono/time_point/round.md.nolink)を追加
- [`duration`](/reference/chrono/duration.md)クラスと[`time_point`](/reference/chrono/time_point.md)クラスの変更操作を`constexpr`に対応


### 乱数
- ランダムサンプリングアルゴリズムとして、[`sample()`](/reference/algorithm/sample.md.nolink)を追加
- 乱数用語を変更。乱数生成器のコンセプトに 「URNG (Uniform Random Number Generator, 一様乱数生成器)」という用語を使用していたが、一般的なURNGの用語とは異なり、C++の乱数生成器は一度の呼び出しで、(32ビットを超えるような) より多くのビットを単一の符号なし整数にパックして返すという動作が許可されている。動作の誤解を避けるために、「URBG (Uniform Random Bit Generator)」という用語に変更する


### エラーハンドリング
- 現在発生している例外の数を取得する[`uncaught_exceptions()`](/reference/exception/uncaught_exceptions.md.nolink)関数を追加


### 取り決め
- `std` + 数字の名前空間を予約。C++の今後のバージョンアップで標準ライブラリに大きな変更を加えるときのために、「`std` + 数字」 (正規表現では`std\d*`) の名前空間が予約される


### 機能の削除
- C++11から非推奨だった古いスマートポインタである`auto_ptr`を削除。代わりに[`shared_ptr`](/reference/memory/shared_ptr.md)か[`unique_ptr`](/reference/memory/unique_ptr.md)を使用すること
- C++14から非推奨だった配列をランダムに入れ替える[`random_shuffle()`](/reference/algorithm/random_shuffle.md)関数を削除。代わりに[`shuffle()`](/reference/algorithm/shuffle.md)を使用すること
- C++11から非推奨だった`throw`キーワードによる古い例外仕様に関連する、以下のライブラリ機能を削除する
    - [`unexpected()`](/reference/exception/unexpected.md)
    - [`set_unexpected()`](/reference/exception/set_unexpected.md)
    - [`get_unexpected()`](/reference/exception/get_unexpected.md)
    - [`unexpected_handler`](/reference/exception/set_unexpected.md)
    - `noexcept`による例外仕様では、例外を送出しないはずの関数から例外が送出された場合、[`terminate()`](/reference/exception/terminate.md)関数によって即座にプログラムが異常終了するため、想定されていない例外が送出された場合のハンドリングは機能しない
- C++11から非推奨だった古い[`<functional>`](/reference/functional.md)の機能を削除
    - 引数を束縛する`bind1st()`関数、`bind2nd()`関数、`binder1st`クラス、`binder2nd`クラスを削除。代わりに[`bind()`](/reference/functional/bind.md)関数や[ラムダ式](/lang/cpp11/lambda_expressions.md)を使用すること
    - 関数ポインタから関数オブジェクトに変換するための`ptr_fun()`関数、`pointer_to_unary_function`クラス、`pointer_to_binary_function`クラスを削除。`first_argument_type`や`second_argument_type`といった型が必要なくなったため、これらの機能は必要なくなった
    - メンバ関数から関数オブジェクトへの変換をするための`mem_fun()`関数、`mem_fun_ref()`関数、`mem_fun_t`クラス、`mem_fun1_t`クラス、`mem_fun_ref_t`クラス、`mem_fun1_ref_t`クラス、`const_mem_fun_t`クラス、`const_mem_fun1_t`クラス、`const_mem_fun_ref_t`クラス、`const_mem_fun1_ref_t`クラスを削除。代わりに[`mem_fn()`](/reference/functional/mem_fn.md)、[`bind()`](/reference/functional/bind.md)関数や[ラムダ式](/lang/cpp11/lambda_expressions.md)を使用すること
- [`function`](/reference/functional/function.md)クラスのアロケータサポートを削除。コンパイラが実装していなかったり、不完全な実装だったりしていた
- C++98から非推奨だったiostreamのエイリアスを削除
    - `ios_base::io_state`の代わりに[`ios_base::iostate`](/reference/ios/ios_base/type-iostate.md)を使用すること
    - `ios_base::open_mode`の代わりに[`ios_base::openmode`](/reference/ios/ios_base/type-openmode.md)を使用すること
    - `ios_base::seek_dir`の代わりに[`ios_base::seekdir`](/reference/ios/ios_base/type-seekdir.md)を使用すること
    - `ios_base::streamoff`の代わりに、`char_traits<CharT>::off_type`もしくは`basic_ios<CharT>::off_type`を使用すること ([`<iosfwd>`](/reference/iosfwd.md.nolink)で定義されている`std::streamoff`は残る)
    - `ios_base::streampos`の代わりに、`char_traits<CharT>::pos_type`もしくは`basic_ios<CharT>::pos_type`を使用すること ([`<iosfwd>`](/reference/iosfwd.md.nolink)で定義されている`std::streampos`は残る)
    - `basic_streambuf::stossc()`メンバ関数を削除。`sbumpc()`の単なる別名
    - `ios_base`クラスの別名型が削除されることにともない、それらの型をパラメータにとるオーバーロードを削除
    - `ios_base`クラスの別名型が削除されることにともない、それらの型をパラメータにとる関数が削除


### 機能の非推奨化
- [`std::iterator`](/reference/iterator/iterator.md)クラスを非推奨化。このクラスを使用しても、イテレータ定義は簡単にならなかった
- C++11で[`allocator_traits`](/reference/memory/allocator_traits.md)クラスが導入されたことで不要になった、[`allocator`](/reference/memory/allocator.md)の以下のメンバを非推奨化：
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
- C++11で[`allocator_traits`](/reference/memory/allocator_traits.md)クラスが導入されたことで不要になった、要素型を再束縛するための`allocator<void>`特殊化を非推奨化
- `constexpr`の機能拡張によって扱える型が増えている。将来的にほとんどの型が`constexpr`で扱えるようになるため、`constexpr`で扱える型の分類である[`is_literal_type`](/reference/type_traits/is_literal_type.md)型特性を非推奨化
- 一時的なメモリ確保のための`std::get_temporary_buffer()`関数と`std::return_temporary_buffer()`関数を非推奨化。これらは関数内での一時的なメモリ確保のために、最適化されたメモリ確保の仕組みを提供することを期待して定義されたが、実際にはどの実装も特別視せず、それゆえに便利に使われてはこなかった。将来的にスタックからのメモリ確保をする機能を作る予定だが、これらの関数は例外安全性やRAIIが考慮されていないため、これらの関数の実装・仕様のみを入れ替えるような改訂はできない
- [`raw_storage_iterator`](/reference/memory/raw_storage_iterator.md)クラスを非推奨化。アロケータとの連携ができず、限られた用途にしか使用できなかった
- [`not_fn()`](/reference/functional/not_fn.md.nolink)の追加にともない、古くなった以下の機能を非推奨化：
    - [`not1()`](/reference/functional/negators.md)関数
    - [`not2()`](/reference/functional/negators.md)関数
    - [`unary_negate`](/reference/functional/negators.md)クラス
    - [`binary_nagate`](/reference/functional/negators.md)クラス
    - 標準関数オブジェクトの`result_type`、`argument_type`、`first_argument_type`、`second_argument_type`型
- デバッグ用途にしか使用しない、[`shared_ptr`](/reference/memory/shared_ptr.md)`::`[`unique()`](/reference/memory/shared_ptr/unique.md)を非推奨化
- [`result_of`](/reference/type_traits/result_of.md)を非推奨化。代わりに[`invoke_result`](/reference/type_traits/invoke_result.md.nolink)を使用すること
- [`<codecvt>`](/reference/codecvt.md)を非推奨化。適切なエラーハンドリングの方法がなかったため、セキュリティ上攻撃の可能性があった
- [`memory_order_consume`](/reference/atomic/memory_order.md)を一時的に非推奨化。「その定義が現実に即していない」「acquire/releaseより弱いから使いにくい」といった理由から、より良い定義に変更するまでの間、非推奨とする


## 参照
- [P0636R0 Changes between C++14 and C++17 DIS](https://isocpp.org/files/papers/p0636r0.html)

