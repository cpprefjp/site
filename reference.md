# リファレンス

## 目次

- [言語サポートライブラリ](#language-support)
- [コンセプトライブラリ](#concepts)
- [診断ライブラリ](#diagnostics)
- [汎用的なユーティリティライブラリ](#general-utils)
- [文字列ライブラリ](#strings)
- [ローカライズライブラリ](#localization)
- [コンテナライブラリ](#container)
- [イテレータライブラリ](#iterator)
- [レンジライブラリ](#ranges)
- [アルゴリズムライブラリ](#algorithm)
- [数値ライブラリ](#numerics)
- [デバッグライブラリ](#debug)
- [入出力ライブラリ](#io)
- [正規表現ライブラリ](#regular-expressions)
- [アトミック操作ライブラリ](#atomic-operations)
- [スレッドサポートライブラリ](#thread-support)
- [C言語互換ライブラリ](#clib-facilities)
- [説明専用ライブラリ](#exposition-only)

***

## <a id="language-support" href="#language-support-library">言語サポートライブラリ</a>

| ヘッダ                                                 | 説明                     | 対応バージョン |
|--------------------------------------------------------|--------------------------|----------------|
| [`<limits>`](/reference/limits.md)                     | 実装プロパティ           |                |
| [`<version>`](/reference/version.md)                   | 実装依存のバージョン情報 | C++20          |
| [`<stdfloat>`](/reference/stdfloat.md)                 | 拡張浮動小数点数型       | C++23          |
| [`<new>`](/reference/new.md)                           | 動的メモリ管理           |                |
| [`<typeinfo>`](/reference/typeinfo.md)                 | 型情報                   |                |
| [`<source_location>`](/reference/source_location.md)   | ソースコード上の位置     | C++20          |
| [`<exception>`](/reference/exception.md)               | 例外ハンドリング         |                |
| [`<initializer_list>`](/reference/initializer_list.md) | 初期化子リスト           | C++11          |
| [`<compare>`](/reference/compare.md)                   | 比較演算                 | C++20          |
| [`<coroutine>`](/reference/coroutine.md)               | コルーチン               | C++20          |


## <a id="concepts" href="#concepts">コンセプトライブラリ</a>

| ヘッダ | 説明 | 対応バージョン |
|--------|------|----------------|
| [`<concepts>`](/reference/concepts.md) | 言語関係のコンセプト | C++20 |


## <a id="diagnostics" href="#diagnostics">診断ライブラリ</a>

| ヘッダ                                         | 説明                          | 対応バージョン |
|------------------------------------------------|-------------------------------|----------------|
| [`<stdexcept>`](/reference/stdexcept.md)       | 例外クラス                    |                |
| [`<system_error>`](/reference/system_error.md) | システムエラーサポート        | C++11          |


## <a id="general-utils" href="#general-utils">汎用的なユーティリティライブラリ</a>

| ヘッダ                                       | 説明                         | 対応バージョン |
|----------------------------------------------|------------------------------|----------------|
| [`<utility>`](/reference/utility.md)         | ユーティリティコンポーネント |                |
| [`<bitset>`](/reference/bitset.md)           | ビットの固定サイズシーケンス |                |
| [`<ratio>`](/reference/ratio.md)             | コンパイル時有理数           | C++11          |
| [`<tuple>`](/reference/tuple.md)             | タプル                       | C++11          |
| [`<optional>`](/reference/optional.md)       | 任意で値を持たせられるオブジェクト | C++17 |
| [`<variant>`](/reference/variant.md)         | 候補の型を切り替えながら保持できる記憶域型 | C++17 |
| [`<any>`](/reference/any.md)                 | あらゆる型の値を保持できる記憶域型 | C++17 |
| [`<expected>`](/reference/expected.md)       | 正常値かエラー値のどちらかを持たせられるオブジェクト | C++23 |
| [`<type_traits>`](/reference/type_traits.md) | 型特性                       | C++11          |
| [`<functional>`](/reference/functional.md)   | 関数オブジェクト             |                |
| [`<memory>`](/reference/memory.md)           | メモリ                       |                |
| [`<scoped_allocator>`](/reference/scoped_allocator.md) | スコープ付きアロケータ        | C++11          |
| [`<memory_resource>`](/reference/memory_resource.md) | 多相アロケータ       | C++17          |
| [`<chrono>`](/reference/chrono.md)           | 時間ユーティリティ           | C++11          |
| [`<typeindex>`](/reference/typeindex.md)     | 型のインデックス             | C++11          |
| [`<execution>`](/reference/execution.md)     | 実行ポリシー                 | C++17          |
| [`<charconv>`](/reference/charconv.md)       | 高速な文字列 ⇔ 数値変換     | C++17          |
| [`<format>`](/reference/format.md)           | 文字列フォーマット           | C++20          |
| [`<stacktrace>`](/reference/stacktrace.md)   | スタックトレース             | C++23          |


## <a id="strings" href="#strings">文字列ライブラリ</a>

| ヘッダ                             | 説明                     | 対応バージョン |
|------------------------------------|--------------------------|----------------|
| [`<string>`](/reference/string.md) | 文字列クラスと、文字特性 |                |
| [`<string_view>`](/reference/string_view.md) | 所有権を持たず文字列を参照する文字列クラス | C++17 |


## <a id="localization" href="#localization">ローカライズライブラリ</a>

| ヘッダ                               | 説明                 | 対応バージョン |
|--------------------------------------|----------------------|----------------|
| [`<locale>`](/reference/locale.md)   | ロケール             |                |
| [`<text_encoding>`](/reference/text_encoding.md.nolink) | 文字列エンコーディングの識別 | C++26 |
| [`<codecvt>`](/reference/codecvt.md) | コード変換ファセット | C++11<br/> C++17から非推奨<br/> C++26で削除 |


## <a id="container" href="#container">コンテナライブラリ</a>

| ヘッダ                                           | 説明                  | 対応バージョン |
|--------------------------------------------------|-----------------------|----------------|
| [`<array>`](/reference/array.md)                 | 配列                  | C++11          |
| [`<deque>`](/reference/deque.md)                 | 両端キュー            |                |
| [`<forward_list>`](/reference/forward_list.md)   | 単方向リスト          | C++11          |
| [`<list>`](/reference/list.md)                   | 双方向リスト          |                |
| [`<queue>`](/reference/queue.md)                 | FIFOキュー            |                |
| [`<stack>`](/reference/stack.md)                 | LIFOスタック          |                |
| [`<vector>`](/reference/vector.md)               | ベクタ配列            |                |
| [`<map>`](/reference/map.md)                     | 順序付き連想配列      |                |
| [`<set>`](/reference/set.md)                     | 順序付き集合          |                |
| [`<flat_map>`](/reference/flat_map.md)           | ソート済みキーによる順序付き連想配列 | C++23 |
| [`<flat_set>`](/reference/flat_set.md.nolink)           | ソート済みキーによる順序付き集合 | C++23 |
| [`<unordered_map>`](/reference/unordered_map.md) | 非順序連想配列        | C++11          |
| [`<unordered_set>`](/reference/unordered_set.md) | 非順序集合            | C++11          |
| [`<span>`](/reference/span.md)                   | 部分シーケンスの参照  | C++20          |
| [`<mdspan>`](/reference/mdspan.md)               | 多次元配列ビュー      | C++23          |


## <a id="iterator" href="#iterator">イテレータライブラリ</a>

| ヘッダ                                 | 説明             | 対応バージョン |
|----------------------------------------|------------------|----------------|
| [`<iterator>`](/reference/iterator.md) | イテレータの定義 |                |


## <a id="ranges" href="#ranges">レンジライブラリ</a>

| ヘッダ                                 | 説明             | 対応バージョン |
|----------------------------------------|------------------|----------------|
| [`<ranges>`](/reference/ranges.md)       | レンジアルゴリズム | C++20          |
| [`<generator>`](/reference/generator.md) | コルーチンによるレンジ生成 | C++23          |


## <a id="algorithm" href="#algorithm">アルゴリズムライブラリ</a>

| ヘッダ                                   | 説明         | 対応バージョン |
|------------------------------------------|--------------|----------------|
| [`<algorithm>`](/reference/algorithm.md) | アルゴリズム |                |


## <a id="numerics" href="#numerics">数値ライブラリ</a>

| ヘッダ                                 | 説明             | 対応バージョン |
|----------------------------------------|------------------|----------------|
| [`<complex>`](/reference/complex.md)   | 複素数           |                |
| [`<bit>`](/reference/bit.md)           | ビット操作       | C++20          |
| [`<random>`](/reference/random.md)     | 乱数生成         | C++11          |
| [`<valarray>`](/reference/valarray.md) | 数値の配列       |                |
| [`<numeric>`](/reference/numeric.md)   | 一般的な数値操作 |                |
| [`<numbers>`](/reference/numbers.md)   | 数値             | C++20          |
| [`<linalg>`](/reference/linalg.md)     | 線形代数 | C++26 |


## <a id="debug" href="debug">デバッグライブラリ</a>

| ヘッダ                                 | 説明             | 対応バージョン |
|----------------------------------------|------------------|----------------|
| [`<debugging>`](/reference/debugging.md.nolink) | デバッグサポート | C++26 |


## <a id="io" href="#io">入出力ライブラリ</a>

| ヘッダ                                     | 説明                         | 対応バージョン |
|--------------------------------------------|------------------------------|----------------|
| `<iosfwd>`                                 | 先行宣言                     |                |
| [`<iostream>`](/reference/iostream.md)     | 標準`iostream`オブジェクト   |                |
| [`<ios>`](/reference/ios.md)               | `iostream`基底クラス         |                |
| [`<streambuf>`](/reference/streambuf.md)   | ストリームバッファ           |                |
| [`<istream>`](/reference/istream.md)       | 入力ストリーム               |                |
| [`<ostream>`](/reference/ostream.md)       | 出力ストリーム               |                |
| [`<iomanip>`](/reference/iomanip.md)       | フォーマットとマニピュレータ |                |
| [`<sstream>`](/reference/sstream.md)       | 文字列ストリーム             |                |
| [`<fstream>`](/reference/fstream.md)       | ファイルストリーム           |                |
| [`<filesystem>`](/reference/filesystem.md) | ファイルシステム             | C++17          |
| [`<syncstream>`](/reference/syncstream.md) | 同期化出力ストリームラッパー | C++20          |
| [`<spanstream>`](/reference/spanstream.md.nolink) | メモリバッファの所有権をもたないストリーム | C++23 |
| [`<print>`](/reference/print.md)           | 書式指定による出力 | C++23 |


## <a id="regular-expressions" href="#regular-expressions">正規表現ライブラリ</a>

| ヘッダ                           | 説明            | 対応バージョン |
|----------------------------------|-----------------|----------------|
| [`<regex>`](/reference/regex.md) | 正規表現        | C++11          |


## <a id="atomic-operations" href="#atomic-operations">アトミック操作ライブラリ</a>

| ヘッダ                             | 説明                                            | 対応バージョン |
|------------------------------------|-------------------------------------------------|----------------|
| [`<atomic>`](/reference/atomic.md) | アトミックアクセスのためのコンポーネント        | C++11          |
| [`<stdatomic.h>`](/reference/stdatomic.h.md) | アトミック操作のC互換ライブラリ | C++23 |


## <a id="thread-support" href="#thread-support">スレッドサポートライブラリ</a>

| ヘッダ                                                     | 説明                  | 対応バージョン |
|------------------------------------------------------------|-----------------------|----------------|
| [`<stop_token>`](/reference/stop_token.md)                 | 停止状態              | C++20          |
| [`<thread>`](/reference/thread.md)                         | スレッド              | C++11          |
| [`<mutex>`](/reference/mutex.md)                           | ミューテックス        | C++11          |
| [`<shared_mutex>`](/reference/shared_mutex.md)             | 共有ミューテックス    | C++14          |
| [`<condition_variable>`](/reference/condition_variable.md) | 条件変数              | C++11          |
| [`<semaphore>`](/reference/semaphore.md)                   | セマフォ              | C++20          |
| [`<latch>`](/reference/latch.md)                           | ラッチ同期            | C++20          |
| [`<barrier>`](/reference/barrier.md)                       | バリア同期            | C++20          |
| [`<future>`](/reference/future.md)                         | Future                | C++11          |
| [`<rcu>`](/reference/rcu.md.nolink)                               | データの参照・更新    | C++26          |
| [`<hazard_pointer>`](/reference/hazard_pointer.md.nolink)         | ハザードポインタ      | C++26          |


## <a id="clib-facilities" href="#clib-facilities">C言語互換ライブラリ</a>

| ヘッダ                               | 説明                                | 対応バージョン |
|--------------------------------------|-------------------------------------|----------------|
| [`<cassert>`](/reference/cassert.md) | アサート                            |                |
| `<ccomplex>`                         | 複素数                              | C++11 (C99)<br/> C++17で非推奨<br/> C++20で削除 |
| [`<cctype>`](/reference/cctype.md)   | 文字種別の判定と変換                |                |
| [`<cerrno>`](/reference/cerrno.md)   | エラー番号                          |                |
| [`<cfenv>`](/reference/cfenv.md)     | 浮動小数点環境へのアクセス          | C++11 (C99)    |
| [`<cfloat>`](/reference/cfloat.md)   | 浮動小数点数の定数                  |                |
| `<cinttypes>`                        | 固定精度整数のための書式指定マクロ  | C++11 (C99)    |
| `<ciso646>`                          | `&&`に対する別名`and`のような、各種演算子に対するマクロを定義する。<br/> ただしC++ではこれらの別名はキーワードとして定義されるため、このヘッダでは何も定義されない。 | C++20で削除               |
| [`<climits>`](/reference/climits.md) | 整数型の最小値、最大値を表すマクロ  |                |
| `<clocale>`                          | ロケール                            |                |
| [`<cmath>`](/reference/cmath.md)     | 数学関数                            |                |
| `<csetjmp>`                          | ジャンプ処理                        |                |
| `<csignal>`                          | シグナル                            |                |
| `<cstdalign>`                        | アライメント操作のマクロ            | C++17で非推奨<br/> C++20で削除    |
| `<cstdarg>`                          | 可変引数操作                        |                |
| `<cstdbool>`                         | 真理値型の定義                      | C++11 (C99)<br/> C++17で非推奨<br/> C++20で削除 |
| [`<cstddef>`](/reference/cstddef.md) | 基本的な型、値、マクロの定義        |                |
| [`<cstdint>`](/reference/cstdint.md) | 大きさが規定されている整数型        | C++11 (C99)    |
| [`<cstdio>`](/reference/cstdio.md)   | 入出力                              |                |
| [`<cstdlib>`](/reference/cstdlib.md) | ユーティリティ関数                  |                |
| `<cstring>`                          | 文字列操作                          |                |
| `<ctgmath>`                          | ジェネリックな数学関数              | C++11 (C99)<br/> C++17で非推奨<br/> C++20で削除 |
| [`<ctime>`](/reference/ctime.md)     | 日付・時間                          |                |
| `<cuchar>`                           | ユニコード文字型                    | C++11 (C11)    |
| `<cwchar>`                           | ワイド文字型                        |                |
| `<cwctype>`                          | ワイド文字の種別と判定              |                |

## <a id="exposition-only" href="#exposition-only">説明専用ライブラリ</a>

| ヘッダ                                             | 説明                                                      | 対応バージョン |
|----------------------------------------------------|-----------------------------------------------------------|----------------|
| [`exposition-only`](/reference/exposition-only.md) | 説明のためのものを集めたページ (実際のライブラリではない) |                |
