#リファレンス
##言語サポートライブラリ(Language support library) 5/5

| ヘッダ                                                 | 説明                  | 担当 | 状況 |
|--------------------------------------------------------|-----------------------|---------------------------|------------------------------------------|
| [`<limits>`](/reference/limits.md)                     | 実装プロパティ        | @cpp_akira<br/> @pepshiso | <span style="background-color:rgb(0,255,0)">完了</span> |
| [`<new>`](/reference/new.md)                           | 動的メモリ管理        | @USAGI_WRP | <span style="background-color:rgb(0,255,0)">完了</span> |
| [`<typeinfo>`](/reference/typeinfo.md)                 | 型情報                | @cpp_akira | <span style="background-color:rgb(0,255,0)">完了</span> |
| [`<exception>`](/reference/exception.md)               | 例外ハンドリング      | @riskrisk<br/> @cpp_akira | <span style="background-color:rgb(0,255,0)">完了</span> |
| [`<initializer_list>`](/reference/initializer_list.md) | 初期化子リスト(C++11) | @cpp_akira | <span style="background-color:rgb(0,255,0)">完了</span> |


##診断ライブラリ(Diagnostics library) 2/2

| ヘッダ                                         | 説明                          | 担当 | 状況 |
|------------------------------------------------|-------------------------------|------------|---------------------------------------------------------|
| [`<stdexcept>`](/reference/stdexcept.md)       | 例外クラス                    | @uchan_nos | <span style="background-color:rgb(0,255,0)">完了</span> |
| [`<system_error>`](/reference/system_error.md) | システムエラーサポート(C++11) | @cpp_akira | <span style="background-color:rgb(0,255,0)">完了</span> |


##一般的なユーティリティライブラリ(General utilities library) 4/10

| ヘッダ                                       | 説明                         | 担当 | 状況 |
|----------------------------------------------|------------------------------|----------|--------------------------------------------------------------|
| [`<utility>`](/reference/utility.md)         | ユーティリティコンポーネント | @SubaruG<br/> @cpp_akira | <span style="background-color:rgb(0,255,0)">完了</span> |
| [`<bitset>`](/reference/bitset.md)           | ビットの固定サイズシーケンス | 担当不在 | <span style="background-color:rgb(255,0,0)">未着手</span> |
| [`<ratio>`](/reference/ratio.md)             | コンパイル時有理数(C++11)    | 担当不在 | <span style="background-color:rgb(255,0,0)">未着手</span> |
| [`<tuple>`](/reference/tuple.md)             | タプル(C++11)                | @cpp_akira | <span style="background-color:rgb(0,255,0)">完了</span> |
| [`<type_traits>`](/reference/type_traits.md) | 型特性(C++11)                | @bolero_MURAKAMI<br/> @sscrisk |<span style="background-color:rgb(255,153,0)"> 44/89 (49%) 残り45</span> |
| [`<functional>`](/reference/functional.md)   | 関数オブジェクト             | @kikairoya | under construction |
| [`<memory>`](/reference/memory.md)           | メモリ                       | @krustf | <span style="background-color:rgb(255,153,0)">着手開始。 10%程度</span> |
| [`<scoped_allocator>`](/reference/scoped_allocator.md) | スコープ付きアロケータ(C++11) | 担当不在 | <span style="background-color:rgb(255,0,0)">未着手</span> |
| [`<chrono>`](/reference/chrono.md)           | 時間ユーティリティ(C++11) | @cpp_akira | <span style="background-color:rgb(0,255,0)">完了。</span>他が一段落したらどこかにClock Conceptを書く予定。 |
| [`<typeindex>`](/reference/typeindex.md)     | 型のインデックス(C++11)   | @cpp_akira | <span style="background-color:rgb(0,255,0)">完了</span> |


##文字列ライブラリ(Strings library) 0/1

| ヘッダ                             | 説明                     | 担当 | 状況 |
|------------------------------------|--------------------------|------------|--------------------------------------------------------|
| [`<string>`](/reference/string.md) | 文字列クラスと、文字特性 | @uchan_nos | <span style="background-color:rgb(255,153,0)">?</span> |


##ローカライズライブラリ(Localization library) 0/2

| ヘッダ                               | 説明                 | 担当 | 状況 |
|--------------------------------------|----------------------|--------|--------------------------------------------------------------|
| [`<locale>`](/reference/locale.md)   | ロケール             | @egtra | <span style="background-color:rgb(255,153,0)">?</span> |
| [`<codecvt>`](/reference/codecvt.md) | コード変換ファセット | @egtra | <span style="background-color:rgb(255,0,0)">未着手</span> |


##コンテナライブラリ(Container library) 7/11

| ヘッダ                                           | 説明                  | 担当 | 状況 |
|--------------------------------------------------|-----------------------|------------|---------------------------------------------|
| [`<array>`](/reference/array.md)                 | 配列(C++11)           | @cpp_akira | <span style="background-color:rgb(0,255,0)">完了</span> |
| [`<deque>`](/reference/deque.md)                 | 両端キュー            | @PG_kura | <span style="background-color:rgb(0,255,0)">完了</span> |
| [`<forward_list>`](/reference/forward_list.md)   | 単方向リスト(C++11)   | @cpp_akira | <span style="background-color:rgb(0,255,0)">完了</span> |
| [`<list>`](/reference/list.md)                   | 双方向リスト          | @mikiemon_h | <span style="background-color:rgb(255,153,0)">着手開始。</span> |
| [`<queue>`](/reference/queue.md)                 | FIFOキュー            | @lunatic_star<br/> @cpp_akira | <span style="background-color:rgb(0,255,0)">完了</span> |
| [`<stack>`](/reference/stack.md)                 | LIFOスタック          | @mikiemon_h<br/> @nishiken | <span style="background-color:rgb(0,255,0)">完了</span> |
| [`<vector>`](/reference/vector.md)               | ベクタ配列            | @coiledcoil<br/> @cpp_akira | <span style="background-color:rgb(0,255,0)">完了</span> |
| `<map>`                                          | 連想配列              | 担当不在 | <span style="background-color:rgb(255,0,0)">未着手</span> |
| [`<set>`](/reference/set.md)                     | 集合                  | @PG_kura | <span style="background-color:rgb(255,153,0)">5%</span> |
| [`<unordered_map>`](/reference/unordered_map.md) | 非順序連想配列(C++11) | @kariya_mitsuru | <span style="background-color:rgb(255,153,0)">着手中</span> |
| [`<unordered_set>`](/reference/unordered_set.md) | 非順序集合(C++11)     | @kariya_mitsuru | <span style="background-color:lime">一応完了</span>ツッコミ希望 |


##イテレータライブラリ(Iterator library) 1/1

| ヘッダ                                 | 説明             | 担当 | 状況 |
|----------------------------------------|------------------|------------|------------------------------------------------------|
| [`<iterator>`](/reference/iterator.md) | イテレータの定義 | @cpp_akira | <span style="background-color:rgb(0,255,0)">完了</span> |


##アルゴリズムライブラリ(Algorithm library) 1/1

| ヘッダ                                   | 説明         | 担当 | 状況 |
|------------------------------------------|--------------|-----------------------|-----------------------------------------------------------|
| [`<algorithm>`](/reference/algorithm.md) | アルゴリズム | @melponn<br/> @cpp_akira | <span style="background-color:rgb(0,255,0)">完了</span> |


##数値ライブラリ(Numerics library) 1/4

| ヘッダ                                 | 説明             | 担当 | 状況 |
|----------------------------------------|------------------|------|------------------------------------------------|
| [`<complex>`](/reference/complex.md)   | 複素数           | @USAGI_WRP | <span style="background-color:rgb(0,255,0)"><strike>完了</strike><br/>※もっと詳しく具体的に必要なので作業続行</span> |
| [`<random>`](/reference/random.md)     | 乱数生成(C++11)  | @USAGI_WRP |<span style="background-color:rgb(255,153,0)">tasks:<br/>  // エンジン系<br/>  mersenne_twister_engine<br/>  subtract_with_carry_engine<br/>  discard_block_engine<br/>  independent_bits_engine<br/>  shuffle_order_engine<br/><br/>  // エンジンアダプタ系<br/>  minstd_rand0<br/>  minstd_rand<br/>  mt19937<br/>  mt19937_64<br/>  ranlux24_base<br/>  ranlux48_base<br/>  ranlux24<br/>  ranlux48<br/>  knuth_b<br/>  default_random_engine<br/><br/>  // ほか分布系など<br/>  random_device<br/>  seed_seq<br/>  generate_canonical<br/>  uniform_int_distribution<br/>  uniform_real_distribution<br/>  bernoulli_distribution<br/>  binomial_distribution<br/>  geometric_distribution<br/>  egative_binomial_distribution<br/>  poisson_distribution<br/>  exponential_distribution<br/>  gamma_distribution<br/>  weibull_distribution<br/>  extreme_value_distribution</span><br/> |
| [`<valarray>`](/reference/valarray.md) | 数値の配列       | @USAGI_WRP | <span style="background-color:rgb(0,255,0)"><strike>完了</strike><br/>※もっと詳しく具体的に必要なので作業続行</span><br/> |
| [`<numeric>`](/reference/numeric.md)   | 一般的な数値操作 | @USAGI_WRP<br/> @sscrisk | <span style="background-color:rgb(0,255,0)">完了</span> |


##入出力ライブラリ(Input/output library) 0/9

| ヘッダ        | 説明                         | 担当 | 状況 |
|---------------|------------------------------|--------|-----------------------------------------------------------|
| `<iosfwd>`    | 先行宣言                     | @egtra | <span style="background-color:rgb(255,0,0)">未着手</span> |
| `<iostream>`  | 標準`iostream`オブジェクト   | @egtra | <span style="background-color:rgb(255,0,0)">未着手</span> |
| `<ios>`       | `iostream`基本クラス         | @egtra | <span style="background-color:rgb(255,0,0)">未着手</span> |
| `<streambuf>` | ストリームバッファ           | @egtra | <span style="background-color:rgb(255,0,0)">未着手</span> |
| `<istream>`   | 入力ストリーム               | @egtra | <span style="background-color:rgb(255,0,0)">未着手</span> |
| `<ostream>`   | 出力ストリーム               | @egtra | <span style="background-color:rgb(255,0,0)">未着手</span> |
| `<iomanip>`   | フォーマットとマニピュレータ | @egtra | <span style="background-color:rgb(255,0,0)">未着手</span> |
| `<sstream>`   | 文字列ストリーム             | @egtra | <span style="background-color:rgb(255,0,0)">未着手</span> |
| `<fstream>`   | ファイルストリーム           | @egtra | <span style="background-color:rgb(255,0,0)">未着手</span> |


##正規表現ライブラリ(Regular expressions library) 0/1

| ヘッダ                           | 説明            | 担当 | 状況 |
|----------------------------------|-----------------|------------|--------------------------------------------------------|
| [`<regex>`](/reference/regex.md) | 正規表現(C++11) | @uchan_nos | <span style="background-color:rgb(255,153,0)">?</span> |


##アトミック操作ライブラリ(Atomic operations library) 1/1

| ヘッダ                             | 説明                                            | 担当 | 状況 |
|------------------------------------|-------------------------------------------------|------------|---------------------------------------------|
| [`<atomic>`](/reference/atomic.md) | アトミックアクセスのためのコンポーネント(C++11) | @cpp_akira | <span style="background-color:rgb(0,255,0)">完了</span> |


##スレッドサポートライブラリ(Thread support library) 4/4

| ヘッダ                                                     | 説明                  | 担当 | 状況 |
|------------------------------------------------------------|-----------------------|---------|----------------------------------------------|
| [`<thread>`](/reference/thread.md)                         | スレッド(C++11)       | @yohhoy | <span style="background-color:rgb(0,255,0)">完了</span> |
| [`<mutex>`](/reference/mutex.md)                           | ミューテックス(C++11) | @yohhoy<br/> @cpp_akira | <span style="background-color:rgb(0,255,0)">完了</span> |
| [`<condition_variable>`](/reference/condition_variable.md) | 条件変数(C++11)       | @cpp_akira | <span style="background-color:rgb(0,255,0)">完了</span> |
| [`<future>`](/reference/future.md)                         | Future(C++11)         | @cpp_akira | <span style="background-color:rgb(0,255,0)">完了</span> |


全体： 26/52



##C互換ライブラリ (C library facilities)

// ※便宜上C互換ライブラリの一覧を設けます。これらの優先順位は低めではありますが、可能ならば埋めたいと考えています。

| ヘッダ                               | 説明 | 担当 | 状況 |
|--------------------------------------|-------------------------------------|-------------|--------------------------|
| `<cassert>`                          | アサート                            | | |
| `<ccomplex>`                         | 複素数                              | | |
| `<cctype>`                           | 文字種別の判定と変換                | | |
| `<cerrno>`                           | エラー番号                          | | |
| `<cfenv>`                            | 浮動小数点環境へのアクセス          | | |
| [`<cfloat>`](/reference/cfloat.md)   | 浮動小数点数の定数                  | | <span style="background-color:rgb(255,153,0)">?</span> |
| `<cinttypes>`                        | 固定精度整数のための書式指定マクロ  | | |
| `<ciso646>`                          | `&&`に対する別名`and`のような、各種演算子に対するマクロを定義する。ただしC++ではこれらの別名はキーワードとして定義されるため、このヘッダでは何も定義されない。 |  | |
| [`<climits>`](/reference/climits.md) | 整数型の最小値、最大値を表すマクロ  | @pepshiso | 項目は埋めた。 |
| `<clocale>`                          | ロケール                            | | |
| [`<cmath>`](/reference/cmath.md)     | 数学関数                            | @bolero_MURAKAMI | <span style="background-color:rgb(255,153,0)">項目リスト<br/></span> <span style="background-color:rgb(255,153,0)">三角関数、双曲線関数</span> <span style="background-color:rgb(255,153,0)">完了</span><br/> |
| `<csetjmp>`                          | ジャンプ処理                        | | |
| `<csignal>`                          | シグナル                            | | |
| `<cstdalign>`                        | アラインメント操作のマクロ          | | |
| `<cstdarg>`                          | 可変引数操作                        | | |
| `<cstdbool>`                         | 真理値型の定義                      | | |
| [`<cstddef>`](/reference/cstddef.md) | 基本的な型、値、マクロの定義        | | <span style="background-color:rgb(255,255,255)">完了</span> |
| [`<cstdint>`](/reference/cstdint.md) | 大きさが規定されている整数型(C++11) | | 完了 |
| `<cstdio>`                           | 入出力                              | | |
| `<cstdlib>`                          | ユーティリティ関数                  | | |
| `<cstring>`                          | 文字列操作                          | | |
| `<ctgmath>`                          | ジェネリックな数学関数              | | |
| `<ctime>`                            | 日付・時間                          | | |
| `<cuchar>`                           | ユニコード文字型                    | | |
| `<cwchar>`                           | ワイド文字型                        | | |
| `<cwctype>`                          | ワイド文字の種別と判定              | | |


