# C++14

## 概要
C++14とは、2014年12月に改訂され、ISO/IEC 14882:2014で標準規格化されたC++バージョンの通称である。

前バージョンであるC++11からマイナーバージョンアップされ、小さな機能拡張が行われた。

このバージョンは、�定�はC++1yと呼ばれていた。前バージョンであるC++11が�定�、C++0xと呼ばれていたことから、「xの次」という意味で「y」が使われていた。


## 言語機能

| 言語機能               | 説明 |
|------------------------|------|
| [2進数リテラル](cpp14/binary_literals.md) | 2進数を表す`0b` or `0B`プレフィックスを付けた数値リテラルの記述を可能とする |
| [通常関数の戻り値型推論](cpp14/return_type_deduction_for_normal_functions.md) | 関数の戻り値型を`auto`にすることで、`return`文から戻り値の型を推論させる |
| [`decltype(auto)`](cpp14/decltype_auto.md) | `decltype`の規則による変数の型推論 |
| [後置戻り値型をプレースホルダーにすることを許可](cpp14/placeholder_type_in_trailing_return_type.md) | 戻り値の型を後置する関数宣言構文とラムダ式の戻り値型に`auto`を使用できるようにする |
| [ラムダ式の初期化�ャプチャ](cpp14/initialize_capture.md) | �ャプチャに代入構文を導入し、一つの変数に複数の�ャプチャ方法を指定可能にする |
| [ジェネリックラムダ](cpp14/generic_lambdas.md) | ラムダ式のパラメータを`auto`にすることで、ジェネリックな関数呼び出し演算�を持つ関数オブジェクトを生成する |
| [変数テンプレート](cpp14/variable_templates.md)       | 変数定義時のテンプレート指定を可能にする |
| [`constexpr`の制限緩和](cpp14/relaxing_constraints_on_constexpr.md) | `if`文、`switch`文による条件分岐の許可。<br/>`for`文、`while`文、`do-while`文によるループの許可。<br/>`void`戻り値型の許可<br/>初期化を伴う変数宣言の許可。<br/>変数書き換えの許可 |
| [宣言時のメンバ初期化を持つ型の集成体初期化を許可](cpp14/brace_elision_in_array_temporary_initialization.md) | 一様初期化と初期化�リストを組み合わせた際、二重に波カッコが必要となっていた仕様を緩和し、波カッコを省略できるようにする |
| [`[[deprecated]]`属性](cpp14/deprecated_attr.md) | 非推奨の機能であることを示す属性 |
| [数値リテラルの桁区切り文�](cpp14/digit_separators.md) | シングルクォーテーションで数値リテラルを桁区切りする |
| [サイズ付きデア�ケーション](cpp14/sized_deallocation.md) | サイズをとる`delete`演算�のオーバー�ードを許可する |


### 小さな変更

ここでは、コア言語作�グループへ問題報告され、その解決�として導入された言語仕様の変更を解説する。

| 言語機能 | 説明 |
|----------|------|
| [更新された定義済みマク�](cpp14/predefined_macros.md) | 標準規格で定義されたマク�の更新 |
| [機能テストマク�](cpp14/feature_test_macros.md)       | C++14 の機能がサポートされているかどうかをテストするためのマク� |
| [リテラル演算�のスペースを省略可能とする](cpp14/no_whitespace_literal_operators.md) | `operator""`とサフィックス名の間にスペースを入力しなくてもよくなった |
| [`nullptr_t`型の定数式を非型テンプレートパラメータとすることを許可](cpp14/nontype_template_parameters_of_type_nullptr_t.md) | `nullptr_t`型の値をテンプレート引数として渡せるようになった |


## ライブラリ更新の概要

### コンテナ
- 順序付き連想コンテナのルックアップ処理で、一時オブジェクトが生成されるコストを抑える拡張が行われた
    - [`std::map::find()`](/reference/map/map/find.md)
	- [`std::map::count()`](/reference/map/map/count.md)
	- [`std::map::lower_bound()`](/reference/map/map/lower_bound.md)
	- [`std::map::upper_bound()`](/reference/map/map/upper_bound.md)
	- [`std::map::equal_range()`](/reference/map/map/equal_range.md)
	- `std::map`クラスのほか、`std::set`、`std::multiset`、`std::multimap`の上記メンバ関数も対象


### イテレータ
- Forward Iteratorを値初期化した場合に、どこも指さないヌルイテレータになる、という規定が追加された(参照 : [N3644 Null Forward Iterators](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3644.pdf))


### アルゴリズム
- 以下のアルゴリズムに、2つ目の範囲の終端イテレータをパラメータにとるバージョンを追加。これにより、2つの範囲が同じ長さかを事前にユーザーがチェックする必要がなくなった
    - [`std::mismatch()`](/reference/algorithm/mismatch.md)
	- [`std::equal()`](/reference/algorithm/equal.md)
	- [`std::is_permutation()`](/reference/algorithm/is_permutation.md)
- 乱数生成を行うアルゴリズム、`std::rand()`と[`std::random_shuffle()`](/reference/algorithm/random_shuffle.md)を非推奨とする。`std::rand()`の代わりに[`<random>`](/reference/random.md)ヘッダで定義される乱数生成器と分布クラスを、[`std::random_shuffle()`](/reference/algorithm/random_shuffle.md)の代わりに[`std::shuffle()`](/reference/algorithm/shuffle.md)を使用すること


### メモリ管理
- [`std::unique_ptr`](/reference/memory/unique_ptr.md)を生成するヘルパ関数[`std::make_unique()`](/reference/memory/make_unique.md)を追加


### 入出力
- 文�列をクォート修飾する[`std::quoted`](/reference/iomanip/quoted.md)マニピュレータを追加


### 汎用的なユーティリティ
- 2つの値を入れ替える関数[`std::exchange()`](/reference/utility/exchange.md)を追加
- コンパイル時整数シーケンス[`std::integer_sequence`](/reference/utility/integer_sequence.md)を追加
- タプルを型の集合と見なし、型を指定して対応する値を取得する[`std::get()`](/reference/tuple/tuple/get.md)のオーバー�ードを追加
- [`<type_traits>`](/reference/type_traits.md)ヘッダの、メンバ型`type`を定義するクラステンプレートに、エイリアステンプレート版を追加。そのバージョンには、`_t`サフィックスが付く


### リテラル演算�
- [`std::basic_string`](/reference/string/basic_string.md)の[リテラル演算�`s`](/reference/string/basic_string/op_s.md)を追加
    - `"hello"s`は、文�コード未規定の`std::string`オブジェクトを表すリテラル
	- `L"hello"s`は、文�コード未規定の`std::wstring`オブジェクトを表すリテラル
	- `u8"hello"s`は、UTF-8文�コードの`std::string`オブジェクトを表すリテラル
	- `u"hello"s`は、UTF-16文�コードの`std::u16string`オブジェクトを表すリテラル
	- `U"hello"s`は、UTF-32文�コードの`std::u32string`オブジェクトを表すリテラル
- [`std::chrono::duration`](/reference/chrono/duration.md)の、各時間単位を表す、以下のリテラルを追加
    - ナノ秒単位を表す[`ns`リテラル](/reference/chrono/duration/op_ns.md)
	- マイク�秒単位を表す[`us`リテラル](/reference/chrono/duration/op_us.md)
	- ミリ秒単位を表す[`ms`リテラル](/reference/chrono/duration/op_ms.md)
	- 秒単位を表す[`s`リテラル](/reference/chrono/duration/op_s.md)
	- 分単位を表す[`min`リテラル](/reference/chrono/duration/op_min.md)
	- 時単位を表す[`h`リテラル](/reference/chrono/duration/op_h.md)
- [`std::complex`](/reference/complex/complex.md)の、各要素型を表す、以下のリテラルを追加
    - `std::complex<double>`を表す[`i`リテラル](/reference/complex/complex/op_i.md)
	- `std::complex<float>`を表す[`if`リテラル](/reference/complex/complex/op_if.md)
	- `std::complex<long double>`を表す[`il`リテラル](/reference/complex/complex/op_il.md)


### 並行処理
- Readers-writer lockと呼ばれる、書き込みを行うユーザーが1人、�み込みを行うユーザーが複数いる状況で効率的に振る舞うミューテックスの実装として、[`<shared_mutex>`](/reference/shared_mutex.md)ヘッダを追加


## 参照
- [C++14 Overview - Standard C++](https://isocpp.org/wiki/faq/cpp14)

