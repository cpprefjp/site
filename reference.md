#リファレンス
<b>言語サポートライブラリ(Language support library) 5/5</b>


| | | | |
|-----------------------------------------------------------------------------------------------------------------|------------------------------|------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|  |  | <b>担当</b> | <b>状況</b> |
| [`<limits>`](/reference/limits) | 実装プロパティ | @cpp_akira<br/> @pepshiso | <span style='background-color:rgb(0,255,0)>完了</span><br/><span style='background-color:rgb(255,255,255)> </span><span style='background-color:rgb(0,255,0)>スタイル見直し完了</span> |
| [`<new>`](/reference/new) | 動的メモリ管理 | @USAGI_WRP | <span style='background-color:rgb(0,255,0)>完了</span><br/><span style='background-color:rgb(255,255,255)> </span><span style='background-color:rgb(0,255,0)>スタイル見直し完了</span> |
| [`<typeinfo>`](/reference/typeinfo) | 型情報 | @cpp_akira | <span style='background-color:rgb(0,255,0)>完了</span><br/><span style='background-color:rgb(255,255,255)> </span><span style='background-color:rgb(0,255,0)>スタイル見直し完了</span> |
| [`<exception>`](/reference/exception) | 例外ハンドリング | @riskrisk<br/> @cpp_akira | <span style='background-color:rgb(0,255,0)>完了</span><br/><span style='background-color:rgb(255,255,255)> </span><span style='background-color:rgb(0,255,0)>スタイル見直し完了</span> |
| [`<initializer_list>`](/reference/initializer_list) | 初期化子リスト(C++11) | @cpp_akira | <span style='background-color:rgb(0,255,0)>完了</span><br/><span style='background-color:rgb(255,255,255)> </span><span style='background-color:rgb(0,255,0)>スタイル見直し完了</span> |

<b>
</b>

<b>診断ライブラリ(Diagnostics library) 2/2</b>


| | | | |
|---------------------------------------------------------------------------------------------------------|------------------------------------------|-------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [`<stdexcept>`](/reference/stdexcept) | 例外クラス | @uchan_nos<br/> | <span style='background-color:rgb(0,255,0)>完了</span><br/><span style='background-color:rgb(255,255,255)> </span><span style='background-color:rgb(0,255,0)>スタイル見直し完了</span> |
| [`<system_error>`](/reference/system_error) | システムエラーサポート(C++11) | @cpp_akira | <span style='background-color:rgb(0,255,0)>完了</span><br/><span style='background-color:rgb(255,255,255)> </span><span style='background-color:rgb(0,255,0)>スタイル見直し完了</span> |



<b>一般的なユーティリティライブラリ(General utilities library) 4/10</b>


| | | | |
|-----------------------------------------------------------------------------------------------------------------|--------------------------------------------|-----------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [`<utility>`](/reference/utility) | ユーティリティコンポーネント | @SubaruG<br/> @cpp_akira | <span style='background-color:rgb(0,255,0)>完了</span><br/><span style='background-color:rgb(255,255,255)> </span><span style='background-color:rgb(0,255,0)>スタイル見直し完了</span> |
| [`<bitset>`](/reference/bitset) | ビットの固定サイズシーケンス | 担当不在 | <span style='background-color:rgb(255,0,0)>未着手</span> |
| [`<ratio>`](/reference/ratio) | コンパイル時有理数(C++11) | 担当不在 | <span style='background-color:rgb(255,0,0)>未着手</span> |
| [`<tuple>`](/reference/tuple) | タプル(C++11) | @cpp_akira | <span style='background-color:rgb(0,255,0)>完了</span><br/><span style='background-color:rgb(255,255,255)> </span><span style='background-color:rgb(0,255,0)>スタイル見直し完了</span> |
| [`<type_traits>`](/reference/type_traits) | 型特性(C++11)  | @bolero_MURAKAMI<br/> @sscrisk |<span style='background-color:rgb(255,153,0)> 44/89 (49%) 残り45</span> |
| [`<functional>`](/reference/functional) | 関数オブジェクト | @kikairoya | under construction |
| [`<memory>`](/reference/memory) | メモリ | @krustf | <span style='background-color:rgb(255,153,0)>着手開始。 10%程度</span><br/> |
| [`<scoped_allocator>`](/reference/scoped_allocator) | スコープ付きアロケータ(C++11) | 担当不在 | <span style='background-color:rgb(255,0,0)>未着手</span> |
| [`<chrono>`](/reference/chrono) | 時間ユーティリティ(C++11) | @cpp_akira | <span style='background-color:rgb(0,255,0)>完了。スタイル見直し完了。</span>他が一段落したらどこかにClock Conceptを書く予定。 |
| [`<typeindex>`](/reference/typeindex) | 型のインデックス(C++11) | @cpp_akira | <span style='background-color:rgb(0,255,0)>完了</span><br/><span style='background-color:rgb(255,255,255)> </span><span style='background-color:rgb(0,255,0)>スタイル見直し完了</span> |



<b>文字列ライブラリ(Strings library) 0/1</b>


| | | | |
|---------------------------------------------------------------------------------------------|--------------------------------------|------------|--------------------------------------------------------|
| [`<string>`](/reference/string) | 文字列クラスと、文字特性 | @uchan_nos | <span style='background-color:rgb(255,153,0)>?</span> |


<b>ローカライズライブラリ(Localization library) 0/2</b>


| | | | |
|-----------------------------------------------------------------------------------------------|--------------------------------|--------|--------------------------------------------------------------|
| [`<locale>`](/reference/locale) | ロケール | @egtra | <span style='background-color:rgb(255,153,0)>?</span> |
| [`<codecvt>`](/reference/codecvt) | コード変換ファセット | @egtra | <span style='background-color:rgb(255,0,0)>未着手</span> |



<b>コンテナライブラリ(Container library) 7/11</b>


| | | | |
|-----------------------------------------------------------------------------------------------------------|------------------------------|----------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [`<array>`](/reference/array) | 配列(C++11) | @cpp_akira | <span style='background-color:rgb(0,255,0)>完了</span><span style='background-color:rgb(255,255,255)> </span><span style='background-color:rgb(0,255,0)>スタイル見直し完了</span> |
| [`<deque>`](/reference/deque) | 両端キュー | @PG_kura | <span style='background-color:rgb(0,255,0)>完了</span><span style='background-color:rgb(255,255,255)> </span><span style='background-color:rgb(0,255,0)>スタイル見直し完了</span> |
| [`<forward_list>`](/reference/forward_list) | 単方向リスト(C++11) | @cpp_akira | <span style='background-color:rgb(0,255,0)>完了</span><span style='background-color:rgb(255,255,255)> </span><span style='background-color:rgb(0,255,0)>スタイル見直し完了</span> |
| [<list>](/reference/list) | 双方向リスト | @mikiemon_h | <span style='background-color:rgb(255,153,0)>着手開始。</span> |
| [<queue>](/reference/queue) | FIFOキュー | @lunatic_star<br/> @cpp_akira | <span style='background-color:rgb(0,255,0)>完了</span> |
| [<stack>](/reference/stack) | LIFOスタック | @mikiemon_h<br/> @nishiken | <span style='background-color:rgb(0,255,0)>完了</span> |
| [<vector>](/reference/vector) | ベクタ配列 | @coiledcoil<br/> @cpp_akira | <span style='background-color:rgb(0,255,0)>完了</span> |
| <map> | 連想配列 | 担当不在 | <span style='background-color:rgb(255,0,0)>未着手</span> |
| [<set>](/reference/set) | 集合 | @PG_kura | <span style='background-color:rgb(255,153,0)>5%</span> |
| [`<unordered_map>`](/reference/unordered_map) | 非順序連想配列(C++11) | @kariya_mitsuru | <span style='background-color:rgb(255,153,0)>着手中</span> |
| [`<unordered_set>`](/reference/unordered_set) | 非順序集合(C++11) | @kariya_mitsuru | <span style='background-color:lime>一応完了</span>ツッコミ希望 |


<b>イテレータライブラリ(Iterator library) 1/1</b>


| | | | |
|-------------------------------------------------------------------------------------------------|--------------------------|------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [`<iterator>`](/reference/iterator) | イテレータの定義 | @cpp_akira | <span style='background-color:rgb(0,255,0)>完了</span><br/><span style='background-color:rgb(255,255,255)> </span><span style='background-color:rgb(0,255,0)>スタイル見直し完了</span> |


<b>アルゴリズムライブラリ(Algorithm library) 1/1</b>


| | | | |
|--------------------------------------------------------------------------------------|--------------------|-----------------------|-----------------------------------------------------------|
| [<algorithm>](/reference/algorithm) | アルゴリズム | @melponn<br/> @cpp_akira | <span style='background-color:rgb(0,255,0)>完了</span> |


<b>数値ライブラリ(Numerics library) 1/4</b>


| | | | |
|------------------------------------------------------------------------------------|--------------------------|-----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [<complex>](/reference/complex) | 複素数 | @USAGI_WRP | <span style='background-color:rgb(0,255,0)><strike>完了</strike><br/>※もっと詳しく具体的に必要なので作業続行</span><br/> |
| [<random>](/reference/random) | 乱数生成(C++11) | @USAGI_WRP |<span style='background-color:rgb(255,153,0)>tasks:<br/>  // エンジン系<br/>  mersenne_twister_engine<br/>  subtract_with_carry_engine<br/>  discard_block_engine<br/>  independent_bits_engine<br/>  shuffle_order_engine<br/><br/>  // エンジンアダプタ系<br/>  minstd_rand0<br/>  minstd_rand<br/>  mt19937<br/>  mt19937_64<br/>  ranlux24_base<br/>  ranlux48_base<br/>  ranlux24<br/>  ranlux48<br/>  knuth_b<br/>  default_random_engine<br/><br/>  // ほか分布系など<br/>  random_device<br/>  seed_seq<br/>  generate_canonical<br/>  uniform_int_distribution<br/>  uniform_real_distribution<br/>  bernoulli_distribution<br/>  binomial_distribution<br/>  geometric_distribution<br/>  egative_binomial_distribution<br/>  poisson_distribution<br/>  exponential_distribution<br/>  gamma_distribution<br/>  weibull_distribution<br/>  extreme_value_distribution</span><br/> |
| [<valarray>](/reference/valarray) | 数値の配列 | @USAGI_WRP | <span style='background-color:rgb(0,255,0)><strike>完了</strike><br/>※もっと詳しく具体的に必要なので作業続行</span><br/> |
| [<numeric>](/reference/numeric) | 一般的な数値操作 | @USAGI_WRP<br/> @sscrisk | <span style='background-color:rgb(0,255,0)>完了</span> |


<b>入出力ライブラリ(Input/output library) 0/9</b>


| | | | |
|-------------|--------------------------------------------|--------|--------------------------------------------------------------|
| <iosfwd> | 先行宣言 | @egtra | <span style='background-color:rgb(255,0,0)>未着手</span> |
| <iostream> | 標準iostreamオブジェクト | @egtra | <span style='background-color:rgb(255,0,0)>未着手</span> |
| <ios> | iostream基本クラス | @egtra | <span style='background-color:rgb(255,0,0)>未着手</span> |
| <streambuf> | ストリームバッファ | @egtra | <span style='background-color:rgb(255,0,0)>未着手</span> |
| <istream> | 入力ストリーム | @egtra | <span style='background-color:rgb(255,0,0)>未着手</span> |
| <ostream> | 出力ストリーム | @egtra | <span style='background-color:rgb(255,0,0)>未着手</span> |
| <iomanip> | フォーマットとマニピュレータ | @egtra | <span style='background-color:rgb(255,0,0)>未着手</span> |
| <sstream> | 文字列ストリーム | @egtra | <span style='background-color:rgb(255,0,0)>未着手</span> |
| <fstream> | ファイルストリーム | @egtra | <span style='background-color:rgb(255,0,0)>未着手</span> |


<b>正規表現ライブラリ(Regular expressions library) 0/1</b>


| | | | |
|------------------------------------------------------------------------------|---------------------|------------|--------------------------------------------------------|
| [<regex>](/reference/regex) | 正規表現(C++11) | @uchan_nos | <span style='background-color:rgb(255,153,0)>?</span> |


<b>アトミック操作ライブラリ(Atomic operations library) 1/1</b>



| | | | |
|---------------------------------------------------------------------------------------------|------------------------------------------------------------------------|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [`<atomic>`](/reference/atomic) | アトミックアクセスのための<br/> コンポーネント(C++11) | @cpp_akira | <span style='background-color:rgb(0,255,0)>完了</span><span style='background-color:rgb(255,255,255)> </span><span style='background-color:rgb(0,255,0)>スタイル見直し完了</span> |


<b>スレッドサポートライブラリ(Thread support library) 4/4</b>


| | | | |
|---------------------------------------------------------------------------------------------------------------------|------------------------------|----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [`<thread>`](/reference/thread) | スレッド(C++11) | @yohhoy | <span style='background-color:rgb(0,255,0)>完了</span><span style='background-color:rgb(255,255,255)> </span><span style='background-color:rgb(0,255,0)>スタイル見直し完了</span> |
| [`<mutex>`](/reference/mutex) | ミューテックス(C++11) | @yohhoy<br/> @cpp_akira | <span style='background-color:rgb(0,255,0)>完了</span><br/><span style='background-color:rgb(255,255,255)> </span><span style='background-color:rgb(0,255,0)>スタイル見直し完了</span> |
| [`<condition_variable>`](/reference/condition_variable) | 条件変数(C++11) | @cpp_akira | <span style='background-color:rgb(0,255,0)>完了</span><br/><span style='background-color:rgb(255,255,255)> </span><span style='background-color:rgb(0,255,0)>スタイル見直し完了</span> |
| [`<future>`](/reference/future) | Future(C++11) | @cpp_akira | <span style='background-color:rgb(0,255,0)>完了</span><br/><span style='background-color:rgb(255,255,255)> </span><span style='background-color:rgb(0,255,0)>スタイル見直し完了</span> |


26/52

<hr/>

<b>C互換ライブラリ (C library facilities)</b>

// ※便宜上C互換ライブラリの一覧を設けます。これらの優先順位は低めではありますが、可能ならば埋めたいと考えています。


| | | | |
|-----------------------------------------------------------------------------------------------|---------------------------------------------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <cassert> |  |  |<br/> |
| <ccomplex> |  |  |<br/> |
| <cctype> |  |  |<br/> |
| <cerrno> |  |  |<br/> |
| <cfenv> |  |  |<br/> |
| [`<cfloat>`](/reference/cfloat) |  |  | <span style='background-color:rgb(255,153,0)>?</span> |
| <cinttypes> |  |  |<br/> |
| <ciso646> |  |  |<br/> |
| [<climits>](/reference/climits) |  | @pepshiso | 項目は埋めた。 |
| <clocale> |  |  |<br/> |
| [<cmath>](/reference/cmath) |  | @bolero_MURAKAMI | <span style='background-color:rgb(255,153,0)>項目リスト<br/></span> <span style='background-color:rgb(255,153,0)>三角関数、双曲線関数</span> <span style='background-color:rgb(255,153,0)>完了</span><br/> |
| <csetjmp> |  |  |<br/> |
| <csignal> |  |  |<br/> |
| <cstdalign> |  |  |<br/> |
| <cstdarg> |  |  |<br/> |
| <cstdbool> |  |  |<br/> |
| [`<cstddef>`](/reference/cstddef) | 基本的な型、値、マクロの定義 |  | <span style='background-color:rgb(255,255,255)>完了</span> |
| [`<cstdint>`](/reference/cstdint) | 大きさが規定されている整数型(C++11) |  | 完了<br/> |
| <cstdio> |  |  |<br/> |
| <cstdlib> |  |  |<br/> |
| <cstring> |  |  |<br/> |
| <ctgmath> |  |  |<br/> |
| <ctime> |  |  |<br/> |
| <cuchar> |  |  |<br/> |
| <cwchar> |  |  |<br/> |
| <cwctype> |  |  |<br/> |



