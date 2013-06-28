#リファレンス
##言語サポートライブラリ(Language support library)

| ヘッダ                                                 | 説明                  | 対応バージョン |
|--------------------------------------------------------|-----------------------|----------------|
| [`<limits>`](/reference/limits.md)                     | 実装プロパティ        |                |
| [`<new>`](/reference/new.md)                           | 動的メモリ管理        |                |
| [`<typeinfo>`](/reference/typeinfo.md)                 | 型情報                |                |
| [`<exception>`](/reference/exception.md)               | 例外ハンドリング      |                |
| [`<initializer_list>`](/reference/initializer_list.md) | 初期化子リスト        | C++11          |


##診断ライブラリ(Diagnostics library)

| ヘッダ                                         | 説明                          | 対応バージョン |
|------------------------------------------------|-------------------------------|----------------|
| [`<stdexcept>`](/reference/stdexcept.md)       | 例外クラス                    |                |
| [`<system_error>`](/reference/system_error.md) | システムエラーサポート        | C++11          |


##一般的なユーティリティライブラリ(General utilities library)

| ヘッダ                                       | 説明                         | 対応バージョン |
|----------------------------------------------|------------------------------|----------------|
| [`<utility>`](/reference/utility.md)         | ユーティリティコンポーネント |                |
| [`<bitset>`](/reference/bitset.md)           | ビットの固定サイズシーケンス |                |
| [`<ratio>`](/reference/ratio.md)             | コンパイル時有理数           | C++11          |
| [`<tuple>`](/reference/tuple.md)             | タプル                       | C++11          |
| [`<type_traits>`](/reference/type_traits.md) | 型特性                       | C++11          |
| [`<functional>`](/reference/functional.md)   | 関数オブジェクト             |                |
| [`<memory>`](/reference/memory.md)           | メモリ                       |                |
| [`<scoped_allocator>`](/reference/scoped_allocator.md) | スコープ付きアロケータ        | C++11          |
| [`<chrono>`](/reference/chrono.md)           | 時間ユーティリティ        | C++11          |
| [`<typeindex>`](/reference/typeindex.md)     | 型のインデックス          | C++11          |


##文字列ライブラリ(Strings library)

| ヘッダ                             | 説明                     | 対応バージョン |
|------------------------------------|--------------------------|----------------|
| [`<string>`](/reference/string.md) | 文字列クラスと、文字特性 |                |


##ローカライズライブラリ(Localization library)

| ヘッダ                               | 説明                 | 対応バージョン |
|--------------------------------------|----------------------|----------------|
| [`<locale>`](/reference/locale.md)   | ロケール             |                |
| [`<codecvt>`](/reference/codecvt.md) | コード変換ファセット |                |


##コンテナライブラリ(Container library)

| ヘッダ                                           | 説明                  | 対応バージョン |
|--------------------------------------------------|-----------------------|----------------|
| [`<array>`](/reference/array.md)                 | 配列                  | C++11          |
| [`<deque>`](/reference/deque.md)                 | 両端キュー            |                |
| [`<forward_list>`](/reference/forward_list.md)   | 単方向リスト          | C++11          |
| [`<list>`](/reference/list.md)                   | 双方向リスト          |                |
| [`<queue>`](/reference/queue.md)                 | FIFOキュー            |                |
| [`<stack>`](/reference/stack.md)                 | LIFOスタック          |                |
| [`<vector>`](/reference/vector.md)               | ベクタ配列            |                |
| `<map>`                                          | 連想配列              |                |
| [`<set>`](/reference/set.md)                     | 集合                  |                |
| [`<unordered_map>`](/reference/unordered_map.md) | 非順序連想配列        | C++11          |
| [`<unordered_set>`](/reference/unordered_set.md) | 非順序集合            | C++11          |


##イテレータライブラリ(Iterator library)

| ヘッダ                                 | 説明             | 対応バージョン |
|----------------------------------------|------------------|----------------|
| [`<iterator>`](/reference/iterator.md) | イテレータの定義 |                |


##アルゴリズムライブラリ(Algorithm library)

| ヘッダ                                   | 説明         | 対応バージョン |
|------------------------------------------|--------------|----------------|
| [`<algorithm>`](/reference/algorithm.md) | アルゴリズム |                |


##数値ライブラリ(Numerics library)

| ヘッダ                                 | 説明             | 対応バージョン |
|----------------------------------------|------------------|----------------|
| [`<complex>`](/reference/complex.md)   | 複素数           |                |
| [`<random>`](/reference/random.md)     | 乱数生成         | C++11          |
| [`<valarray>`](/reference/valarray.md) | 数値の配列       |                |
| [`<numeric>`](/reference/numeric.md)   | 一般的な数値操作 |                |


##入出力ライブラリ(Input/output library)

| ヘッダ        | 説明                         | 対応バージョン |
|---------------|------------------------------|----------------|
| `<iosfwd>`    | 先行宣言                     |                |
| `<iostream>`  | 標準`iostream`オブジェクト   |                |
| `<ios>`       | `iostream`基本クラス         |                |
| `<streambuf>` | ストリームバッファ           |                |
| `<istream>`   | 入力ストリーム               |                |
| `<ostream>`   | 出力ストリーム               |                |
| `<iomanip>`   | フォーマットとマニピュレータ |                |
| `<sstream>`   | 文字列ストリーム             |                |
| `<fstream>`   | ファイルストリーム           |                |


##正規表現ライブラリ(Regular expressions library)

| ヘッダ                           | 説明            | 対応バージョン |
|----------------------------------|-----------------|----------------|
| [`<regex>`](/reference/regex.md) | 正規表現        | C++11          |


##アトミック操作ライブラリ(Atomic operations library)

| ヘッダ                             | 説明                                            | 対応バージョン |
|------------------------------------|-------------------------------------------------|----------------|
| [`<atomic>`](/reference/atomic.md) | アトミックアクセスのためのコンポーネント        | C++11          |


##スレッドサポートライブラリ(Thread support library)

| ヘッダ                                                     | 説明                  | 対応バージョン |
|------------------------------------------------------------|-----------------------|----------------|
| [`<thread>`](/reference/thread.md)                         | スレッド              | C++11          |
| [`<mutex>`](/reference/mutex.md)                           | ミューテックス        | C++11          |
| [`<condition_variable>`](/reference/condition_variable.md) | 条件変数              | C++11          |
| [`<future>`](/reference/future.md)                         | Future                | C++11          |


##C互換ライブラリ (C library facilities)

| ヘッダ                               | 説明                                | 対応バージョン |
|--------------------------------------|-------------------------------------|----------------|
| `<cassert>`                          | アサート                            |                |
| `<ccomplex>`                         | 複素数                              | C++11 (C99)    |
| `<cctype>`                           | 文字種別の判定と変換                |                |
| `<cerrno>`                           | エラー番号                          |                |
| `<cfenv>`                            | 浮動小数点環境へのアクセス          | C++11 (C99)    |
| [`<cfloat>`](/reference/cfloat.md)   | 浮動小数点数の定数                  |                |
| `<cinttypes>`                        | 固定精度整数のための書式指定マクロ  | C++11 (C99)    |
| `<ciso646>`                          | `&&`に対する別名`and`のような、各種演算子に対するマクロを定義する。ただしC++ではこれらの別名はキーワードとして定義されるため、このヘッダでは何も定義されない。 |                |
| [`<climits>`](/reference/climits.md) | 整数型の最小値、最大値を表すマクロ  |                |
| `<clocale>`                          | ロケール                            |                |
| [`<cmath>`](/reference/cmath.md)     | 数学関数                            |                |
| `<csetjmp>`                          | ジャンプ処理                        |                |
| `<csignal>`                          | シグナル                            |                |
| `<cstdalign>`                        | アラインメント操作のマクロ          |                |
| `<cstdarg>`                          | 可変引数操作                        |                |
| `<cstdbool>`                         | 真理値型の定義                      | C++11 (C99)    |
| [`<cstddef>`](/reference/cstddef.md) | 基本的な型、値、マクロの定義        |                |
| [`<cstdint>`](/reference/cstdint.md) | 大きさが規定されている整数型        | C++11 (C99)    |
| `<cstdio>`                           | 入出力                              |                |
| `<cstdlib>`                          | ユーティリティ関数                  |                |
| `<cstring>`                          | 文字列操作                          |                |
| `<ctgmath>`                          | ジェネリックな数学関数              | C++11 (C99)    |
| `<ctime>`                            | 日付・時間                          |                |
| `<cuchar>`                           | ユニコード文字型                    | C++11 (C99)    |
| `<cwchar>`                           | ワイド文字型                        |                |
| `<cwctype>`                          | ワイド文字の種別と判定              |                |
