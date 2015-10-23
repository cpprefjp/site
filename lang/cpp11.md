#C++11

##概要
C++11とは、2011年8月に改訂され、ISO/IEC 14882:2011で標準規格化されたC++バージョンの通称である。

前バージョンであるC++03からメジャーバージョンアップされ、多くの有用な機能が追加された。

このバージョンは、策定中はC++0xと呼ばれていた。これは、2009年中までに策定を完了させることを目指して、下一桁を伏せ字にしたものである。


##言語機能

| 言語機能       | 説明 |
|----------------|------|
| `alignas`      | アラインメント指定 |
| `alignof`      | アラインメント取得 |
| `auto`         | 型推論 |
| `decltype`     | 式の型を取得 |
| 定義済みマクロ | C++11で更新された定義済みマクロ |
| `constexpr`    | 定数式 |
| 関数の`default`／`delete`宣言 | 自動定義される特殊関数の制御 |
| 移譲コンストラクタ      | コンストラクタから他のコンストラクタに処理を移譲する |
| `explicit operator T()` | 明示的型変換の演算子オーバーロード |
| 拡張`friend`宣言        | テンプレートパラメータや`typedef`名を`friend`宣言する |
| `extern template`       | テンプレートのインスタンス化を抑止する |
| 継承コンストラクタ      | 基本クラスのコンストラクタを継承する |
| ラムダ式                | 関数オブジェクトをその場に書く |
| ローカルクラスと無名クラスを、テンプレート引数として使用する | |
| インライン名前空間      | ネストした名前空間に、透過的にアクセスする |
| `char16_t`、`char32_t`  | UTF-16とUTF-8の文字型 |
| Unicode文字列リテラル   | UTF-8、UTF-16、UTF-32のエンコーディングを規定したプレフィックス |
| 生文字列リテラル        | エスケープシーケンスを無視する |
| ユーザー定義リテラル    | リテラルのサフィックスをユーザー定義する |
| 戻り値の型を後置する関数宣言構文 | 戻り値の型を後ろに書けるようにすることで、パラメータオブジェクトを戻り値型の文脈で使用できるようにする |
| [`nullptr`](cpp11/nullptr.md) | ヌルポインタを表すポインタリテラル |
| テンプレートの右山カッコ | `vector<basic_string<char>>`のように、`>>`をスペースを空けずに記述可能にする |
| 右辺値参照・ムーブセマンティクス | 右辺値によるオーバーロード、およびそれによるリソースの所有権移動 |
| `static_assert`  | コンパイル時アサート |
| `enum`の先行宣言 | `enum`の先行宣言を許可する |
| `enum class`     | 強い型付けとスコープを持つ列挙型 |
| エイリアステンプレート | テンプレートによって型の別名を定義する |
| `union`の制限解除 | 共用体のメンバ変数として、クラスオブジェクトを持てるようにする |
| 可変引数テンプレート | 任意の数のテンプレートパラメータを受け取れるようにする |
| 範囲for文 | 配列やコンテナといった範囲を表すオブジェクトを、簡潔に走査する |
| `override`と`final` | メンバ関数のオーバーライド指定、および派生クラスでのオーバーロードの禁止を指定する |
| 属性構文 | `[[attr]]`構文による、クラス、関数、変数の属性指定 |
| メンバ関数の左辺値／右辺値修飾 | オブジェクトが左辺値／右辺値の場合のみ呼び出し可能であることの指定 |
| 非静的データメンバの初期化 | メンバ変数を、宣言と同時に初期値指定する |
| 初期化子リスト | 波括弧による初期化をユーザー定義する。`vector<int> v = {1, 2, 3};`など。 |
| 一様初期化     | コンストラクタの呼び出しを、波カッコで行う。`T x {a, b, c};` |
| `noexcept` | 関数の例外指定、例外を投げる可能性のある式か`boolP値を返す演算子 |
| 任意の式によるSFINAE | 特定の式が有効かどうかで、その関数をオーバーロード解決に含めるかどうかを決定する |
| `thread_local` | スレッドローカルストレージ |
| ブロックスコープを持つ`static`変数初期化のスレッドセーフ化 | |


###C99互換機能

| 言語機能       | 説明 |
|----------------|------|
| 可変引数マクロ | マクロで任意の数の引数を受け取る |
| `_Pragma`      | 処理系定義の機能を使用する単項演算子 |
| 定義済みマクロ | C99互換で導入された定義済みマクロ |
| 文字列リテラルとワイド文字列リテラルの結合 | ワイド文字列定数として結合する |
| `long long`型 | `long`以上の大きさを持つ整数型 |


##ライブラリ更新の概要

###コンテナ

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


###イテレータ

- イテレータを進める関数[`std::next()`](/reference/iterator/next.md)、イテレータを逆に進める関数[`std::prev()`](/reference/iterator/prev.md)を追加
- 要素をムーブするイテレータとして、[`std::move_iterator`](/reference/iterator/move_iterator.md)クラスを追加
- 先頭イテレータと末尾イテレータを取得する非メンバ関数として、[`std::begin()`](/reference/iterator/begin.md)と[`std::end()`](/reference/iterator/end.md)を追加


###アルゴリズム

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


###メモリ管理

- メモリアロケータの実装をより容易にするために、コンテナとメモリアロケータの中間インタフェースとして[`std::allocator_traits`](/reference/memory/allocator_traits.md)を追加
- スマートポインタの実装として、所有権共有方式の[`std::shared_ptr`](/reference/memory/shared_ptr.md)クラスと、所有権専有方式の[`std::unique_ptr`](/reference/memory/unique_ptr.md)クラスを追加
- 従来のスマートポインタ`auto_ptr`クラスを、非推奨とする
- `operator&()`がオーバーロードされていたとしても正しく変数のアドレスを取得する関数、[`std::addressof()`](/reference/memory/addressof.md)を追加


###入出力
- 標準ライブラリ中の入力ストリーム演算子`operator<<()`と出力ストリーム演算子`operator>>()`がムーブセマンティクスに対応。ストリームの一時オブジェクトを受け取れるようになった


###文字列処理
- UTF-16の文字列型[`std::u16string`](/reference/string/basic_string.md)、UTF-32の文字列型[`std::u32string`](/reference/string/basic_string.md)を追加
- UTF-8とUTF-16、UTF-8とUTF-32といった、マルチバイト文字とワイド文字列の相互変換を行うクラス[`std::wstring_convert`](/reference/locale/wstring_convert.md)を追加
- 数値から文字列オブジェクトに変換する関数として、[`std::to_string()`](/reference/string/to_string.md)と[`std::to_wstring()`](/reference/string/to_wstring.md)を追加
- 文字列オブジェクトから数値に変換する、[`std::stoi()`](/reference/string/stoi.md)や[`std::stof()`](/reference/string/stof.md)といった関数を追加


###関数オブジェクト
- 関数ポインタと関数オブジェクトを統一的に扱えるクラス[`std::function`](/reference/functional/function.md)を追加
- 関数の引数を束縛して部分適用する関数[`std::bind()`](/reference/functional/bind.md)を追加
- メンバ関数ポインタを関数オブジェクトにアダプトする関数[`std::mem_fn()`](/reference/functional/mem_fn.md)を追加
- テンプレートに、明示的に左辺値参照を渡すための渡すためのクラス[`std::reference_wrapper`](/reference/functional/reference_wrapper.md)と、そのヘルパ関数である[`std::ref()`](/reference/functional/ref.md)と[`std::cref()`](/reference/functional/cref.md)を追加
- ハッシュ表コンテナの追加にともない、オブジェクトのハッシュ値を計算する関数オブジェクト[`std::hash`](/reference/functional/hash.md)クラスを追加
- ビット演算の関数オブジェクトとして、[`std::bit_and`](/reference/functional/bit_and.md)、[`std::bit_or`](/reference/functional/bit_or.md)、[`std::bit_xor`](/reference/functional/bit_xor.md)を追加
- 従来の関数オブジェクトアダプタ`std::unary_function`、`std::binary_function`、`std::mem_fun()`、`std::mem_fun_ref()`等を非推奨とする
- 従来の関数バインダ`std::bind1st`、`std::bind2nd`等を非推奨とする


###並行処理
- スレッドを管理するクラス[`std::thread`](/reference/thread/thread.md)を追加
- スレッド間での排他制御を行うミューテックスの実装である[`std::mutex`](/reference/mutex/mutex.md)クラス、[`std::recursive_mutex`](/reference/mutex/recursive_mutex.md)クラス等を追加
    - ミューテックスの所有権放棄を自動的に行うためのクラス[`std::lock_guard`](/reference/mutex/lock_guard.md)、[`std::unique_lock`](/reference/mutex/unique_lock.md)を追加
- スレッドセーフに一度だけ処理を呼び出す関数、[`std::call_once()`](/reference/mutex/call_once.md)を追加
- 条件変数の実装である[`std::condition_variable`](/reference/condition_variable/condition_variable.md)クラス、[`std::condition_variable_any`](/reference/condition_variable/condition_variable_any.md)クラスを追加
- Futureデザインパターンをサポートする[`std::future`](/reference/future/future.md)クラス、[`std::promise`](/reference/future/promise.md)クラス、およびその補助機能を追加
- アトミック操作のライブラリ[`<atomic>`](/reference/atomic.md)を追加


##汎用的なユーティリティ
- `std::swap()`関数を、[`<algorithm>`](/reference/algorithm.md)から[`<utility>`](/reference/utility.md)に移動
- ムーブセマンティクスのために、左辺値を右辺値に変換する関数[`std::move()`](/reference/utility/move.md)を追加
- 引数転送のための関数[`std::forward()`](/reference/utility/forward.md)を追加
- [`std::pair`](/reference/utility/pair.md)クラスの[コンストラクタ](/reference/utility/pair/op_constructor.md)が、それぞれの要素型のコンストラクタ引数を直接受け取れるようになった
- タプルの実装である[`std::tuple`](/reference/tuple/tuple.md)クラスを追加
- SFINAEのために、型の値を取得する関数[`std::declval()`](/reference/utility/declval.md)を追加
- 時間ユーティリティライブラリ[`<chrono>`](/reference/chrono.md)を追加
- 型特性ライブラリ[`<type_traits>`](/reference/type_traits.md)を追加


###エラー報告
- OSのエラー値を扱うライブラリ[`<system_error>`](/reference/system_error.md)を追加


###正規表現ライブラリ
- 正規表現ライブラリ[`<regex>`](/reference/regex.md)を追加
- ECMAScript、POSIX、AWK、grepなどの構文を切り替えて使用できるのが特徴。デフォルトではECMAScript


###乱数ライブラリ
- 乱数ライブラリ[`<random>`](/reference/random.md)を追加
- 複数定義されている乱数生成器と分布アルゴリズムを、組み合わせて使用するのが特徴


###C互換ライブラリ
- ビット幅規定の整数型ライブラリである[`<cstdint>`](/reference/cstdint.md)を追加


##参照
- [C++11 Overview - Standard C++](https://isocpp.org/wiki/faq/cpp11)

