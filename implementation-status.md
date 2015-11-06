#コンパイラの実装状況
このページでは、C++のバージョンごとの言語機能を、どのコンパイラがどのバージョンからサポートしているかをまとめる。

ライブラリ機能については、本サイトのリファレンスで各機能を参照してもらいたい。


## <a name="cpp11" href="#cpp11">C++11言語機能の実装状況</a>

| 言語機能                         | 説明 | [GCC][gcc] | [Clang][clang] | [ICC][icc] | [MSVC][msvc] |
|----------------------------------|------|-----|-------|-----|------|
| `alignas`                        | アラインメント指定 | 4.8 | 3.0 | | 14.0<br/>7.1あるいはそれ以前からある`__declspec(align(x))`構文で代替可能。 |
| `alignof`                        | アラインメント取得 | 4.5 | 3.3 | | 14.0<br/>7.1あるいはそれ以前よりある`__alignof`で代替可能。 |
| `auto`                           | 型推論 | 4.4 | 2.9 | 12.0 | 10.0 |
| `decltype`                       | 式の型を取得 | 4.3 | 2.9 | 13.0 | 10.0 (partial)<br/> 11.0 |
| C99互換のプリプロセッサ          | 可変引数マクロ等 | 4.3 | 2.9 | 11.1 | 8.0 (partial): 可変引数のみ `_Pragma`の代わりに`__pragma`が存在する。
| [`constexpr`](/lang/cpp11/constexpr.md) | 定数式 | 4.6 | 3.1 | 13.0 (partial)<br/> 14.0 | 14.0 (partial) |
| 関数の`default/delete`宣言       | 自動定義される特殊関数の制御 | 4.4 | 3.0 | 12.0 | 12.0: ムーブコンストラクタ・ムーブ代入演算子の`default`は不可<br/> 14.0 |
| 移譲コンストラクタ               | コンストラクタから他のコンストラクタに処理を移譲する | 4.7 | 3.0 | No | 12.0 |
| `explicit operator T()`          | 明示的型変換の演算子 | 4.5 | 3.0 | 14.0 | 12.0 |
| 拡張`friend`宣言                 | テンプレートパラメータや`typedef`名を`friend`宣言 | 4.7 | 2.9 | 11.1 (partial) <br/> 12.0 | 10.0 |
| `extern template`                | テンプレートのインスタンス化抑止 | 3.3 | 2.9 | 11.1 | 6.0 |
| 継承コンストラクタ               | 基本クラスのコンストラクタを継承 | 4.8 | 3.3 | No | 14.0 |
| ラムダ式                         | 関数オブジェクトをその場に書く | 4.5 | 3.1 | 12.0 | 10.0 (partial)<br/> 11.0 |
| ローカルクラスと無名クラスを、テンプレート実引数として使用することを許可 |  | 4.5 | 2.9 | 12.0 | 10.0 |
| `long long`型                    | `long`以上の大きさを持つ整数型 | 4.3 | 2.9 | 11.1 | 7.1 |
| `inline namespace`               | ネストした名前空間に、透過的にアクセスする | 4.4 | 2.9 | 14.0 | 14.0 |
| `char16_t`、`char32_t`型         | UTF-16とUTF-32の文字型 | 4.4 | 2.9 | 12.1 (Windows: partial) <br/> 12.1 (GNU/Linux, OS X)<br/> 14.0 | 14.0<br/> 10.0より同名のtypedefが存在する |
| Unicode文字列リテラル            | uプレフィックスでUTF-16 (`char16_t`)<br/> UプレフィックスでUTF-32 (`char32_t`)<br/> u8プレフィックスでUTF-8 (`char`) | 4.5 | 3.0 | No | 14.0 |
| 生文字列リテラル                 | 文字列リテラルにRプレフィックスを付けることで、エスケープシーケンスを無視する | 4.5 | 3.0 | 14.0 | 12.0 |
| ユーザー定義リテラル             | リテラルのサフィックスをユーザー定義する | 4.7 | 3.1 | No | 14.0 |
| 戻り値の型を後置する関数宣言構文 | 以下のような形式での関数宣言<br/> `auto f(arg_types...) -> return_type` | 4.4 | 2.9 | 12.0 | 10.0 |
| [`nullptr`](/lang/cpp11/nullptr.md) | ヌルポインタを表すポインタリテラル | 4.6 | 2.9 | 11.1 | 10.0 |
| テンプレートの右山カッコ         | `vector<basic_string<char>>`のように、`>>`をスペースを空けずに記述可能にする | 4.3 | 2.9 | 11.1 | 8.0 |
| 右辺値参照と`std::move()`        | 右辺値によるオーバーロード、およびそれによるリソースの所有権移動 | 4.3 (partial)<br/> 4.6 | 2.9 | 12.0 | 10.0 (partial) ムーブコンストラクタと代入演算子の暗黙定義に対応していない。<br/> 14.0 |
| `static_assert`                  | コンパイル時アサート | 4.3 | 2.9 | 11.1 | 10.0 |
| `enum`の先行宣言                 |  | 4.6 | 3.1 | 11.1 (partial)<br/> 14.0 | 11.0 |
| `enum class`                     | 強い型付けとスコープを持つ列挙型 | 4.4 | 2.9 | 11.1 (partial)<br/> 14.0 | 11.0 |
| エイリアステンプレート           | テンプレートによって型の別名を定義する | 4.7 | 3.0 | 12.1 | 12.0 |
| `union`の制限解除                | 共用体のメンバ変数として、クラスオブジェクトを持つ | 4.6 | 3.0 | 14.0(Linux系OSおよびMacのみ。Windowsは非対応) | 14.0 |
| 可変引数テンプレート             | 任意の数のテンプレートパラメータを受け取れるようにする | 4.3 (partial)<br/> 4.4 | 2.9 | 12.1 | 12.0 |
| 範囲for文                        | 配列やコンテナといった範囲を表すオブジェクトを、簡潔に走査する | 4.6 | 3.0 | 13.0 | 11.0 |
| `override`と`final`              | メンバ関数のオーバーライド指定、および派生クラスでのオーバーロードを禁止する指定 | 4.7 | 2.9 | 14.0 | 8.0 (partial): `override`のみ。`final`の代わりにsealedが存在する。ただし両者ともデストラクタには指定できない。<br/> 11.0 |
| 属性構文                         | `[[attr]]`構文による、クラス、関数、変数の属性指定 | 4.8 | 3.3 | 12.1 | 14.0 |
| メンバ関数の左辺値／右辺値修飾   | オブジェクトが左辺値／右辺値の場合のみ呼び出し可能であることの指定 | 4.8.1 | 2.9 | 14.0 | 14.0 |
| 非静的データメンバの初期化       | メンバ変数を、宣言と同時に初期値指定する | 4.7 | 3.0 | 14.0 | 12.0 |
| 初期化子リスト                   | 波括弧による初期化をユーザー定義する。`vector<int> v = {1, 2, 3};`など。 | 4.4 | 3.1 | 14.0 | 12.0 |
| 一様初期化                       | コンストラクタ呼び出しを波カッコで行う。 `T x { a, b, c };` | 4.6 | 3.1 | 13.0(partial)<br/> 14.0 | 12.0 |
| `noexcept`                       | 関数の例外指定、例外を投げる可能性のある式かbool値を返す演算子 | 4.6 | 3.0 | 13.0(partial)<br/>14.0 | 14.0 |
| 任意の式によるSFINAE             | 特定の式が有効かどうかで、その関数をオーバーロード解決に含めるかどうかを決定する | 4.4 | 2.9 | 12.0 | No |
| `thread_local`                   | スレッドローカルストレージ | 4.8 | 3.3 | 11.1 (partial) | 10.0<br/> `__declspec(thread)`属性での部分サポート<br/> 14.0 |
| ブロックスコープを持つ`static`変数初期化のスレッドセーフ化 |  | 4.0 | 2.9 | ? | 14.0 |


各処理系のC++11実装状況ページ：

- 全体的な対応状況： [C++0xCompilerSupport](http://wiki.apache.org/stdcxx/C++0xCompilerSupport)
- GCC： [C++0x/C++11 Support in GCC](http://gcc.gnu.org/projects/cxx0x.html)
- libstdc++ : [C++ 2011](http://gcc.gnu.org/onlinedocs/libstdc++/manual/status.html#status.iso.2011)
- Clang： [C++98 and C++11 Support in Clang](http://clang.llvm.org/cxx_status.html)
- ICC : [C++11 Features Supported by Intel&#174; C++ Compiler](http://software.intel.com/en-us/articles/c0x-features-supported-by-intel-c-compiler)
- Visual C++ (MSVC): [Support For C++11/14/17 Features (Modern C++)](https://msdn.microsoft.com/en-us/library/vstudio/hh567368%28v=vs.140%29.aspx)
- Visual C++ (MSVC): [C++11/14/17 Features In VS 2015 RTM - Visual C++ Team Blog](http://blogs.msdn.com/b/vcblog/archive/2015/06/19/c-11-14-17-features-in-vs-2015-rtm.aspx)


## <a name="cpp14" href="#cpp14">C++14言語機能の実装状況</a>
C++14は、C++11のバグフィックス + マイナーアップデートが行われたバージョンである。

| 言語機能                     | 説明 | [GCC][gcc] | [Clang][clang] | [ICC][icc] | [MSVC][msvc] |
|------------------------------|------|-----|-------|-----|------|
| [2進数リテラル](/lang/cpp14/binary_literals.md) | 2進数を表す`0b` or `0B`プレフィックスを付けた数値リテラルの記述を可能とする | 4.3(GNU)<br/> 4.9 | 3.2 | 11.0 | 14.0 |
| 通常関数の戻り値型推論       | 関数の戻り値型を`auto`にすることで、`return`文から戻り値の型を推論させる | 4.8(partial)<br/>4.9 | 3.3(partial)<br/> 3.4 | 15.0 | 14.0 |
| 汎用ラムダキャプチャ | キャプチャに代入構文を導入し、一つの変数に複数のキャプチャ方法を指定可能にする | 4.9 | 3.4 | 15.0 | 14.0 |
| ジェネリックラムダ           | ラムダ式のパラメータを`auto`にすることで、ジェネリックな関数呼び出し演算子を持つ関数オブジェクトを生成する | 4.9 | 3.4 | 16.0 | 14.0 |
| 変数テンプレート             | 変数定義時のテンプレート指定を可能にする。 | 5.1 | 3.4 | 16.0 | No |
| `constexpr`の制限緩和        | `if`文、`switch`文による条件分岐の許可。<br/>`for`文、`while`文、`do-while`文によるループの許可。<br/>`void`戻り値型の許可<br/>初期化を伴う変数宣言の許可。<br/>変数書き換えの許可。 | 5.1 | 3.3(partial) | 16.0 | No |
| 宣言時のメンバ初期化を持つ型の集成体初期化を許可 | | 5.1 | 3.3 | 16.0 | No |
| `[[deprecated]]`属性         | 非推奨の機能であることを示す属性。 | 4.9 | 3.4 | 15.0<br/> (Linux/Mac OS) | 14.0<br/>それ以前は`__declspec(deprecated)`で代替可能 |
| [数値リテラルの桁区切り文字](/lang/cpp14/digit_separators.md) | シングルクォーテーションで数値リテラルを桁区切りする。 | 4.9 | 3.4 | 16.0 | 14.0 |
| サイズ付きデアロケーション   | サイズをとる`delete`演算子のオーバーロードを許可する。 | 5.1 | 3.4 | 16.0 | 14.(partial) |


各処理系のC++14実装状況ページ：

- GCC: [C++1y/C++14 Support in GCC](http://gcc.gnu.org/projects/cxx1y.html)
- libstdc++: [C++ 2014](http://gcc.gnu.org/onlinedocs/libstdc++/manual/status.html#status.iso.2014)
- Clang: [C++98, C++11, and C++14 Support in Clang](http://clang.llvm.org/cxx_status.html)
- libc++: [libc++ C++1Y Status](http://libcxx.llvm.org/cxx1y_status.html)
- Visual C++ (MSVC): [Support For C++11/14/17 Features (Modern C++)](https://msdn.microsoft.com/en-us/library/vstudio/hh567368%28v=vs.140%29.aspx)
- Visual C++ (MSVC): [C++11/14/17 Features In VS 2015 RTM - Visual C++ Team Blog](http://blogs.msdn.com/b/vcblog/archive/2015/06/19/c-11-14-17-features-in-vs-2015-rtm.aspx)
- ICC: [C++14 Features Supported by Intel C++ Compiler](https://software.intel.com/en-us/articles/c14-features-supported-by-intel-c-compiler)
    - [Intel (R) Parallel Studio XE 2016 Beta program has begun](https://software.intel.com/en-us/forums/topic/549502)


##Technical Specificationの実装状況
Technical Specificationは、C++14に追加で導入する言語機能、およびライブラリである。

| 言語機能 | 説明 | [GCC][gcc] | [Clang][clang] | [ICC][icc] | [MSVC][msvc] |
|------------------------------|------|-----|-------|-----|------|
| 実行時サイズの配列           | 組み込み配列を、実行時の要素数で構築することを可能にする | 4.9 | No | No | No |


## <a name="cpp1z" href="#cpp1z">C++1z言語機能の実装状況</a>
C++1zは、2017年に策定予定の、C++14に対するメジャーバージョンアップである。

| 言語機能 | 説明 | [GCC][gcc] | [Clang][clang] | [ICC][icc] | [MSVC][msvc] |
|----------|------|-----|-------|-----|------|
| [メッセージなしの`static_assert`][n3928] | デフォルトの表明メッセージを使用する | No | 3.5 | No | No |
| [トライグラフを削除][n4086] | | No | 3.5 | No | 12.0 |
| [テンプレートテンプレートパラメータに`typename`を許可][n4051] | `class`キーワードしか使用できなかった部分に、`typename`を許可 | No | 3.5 | No | 14.0 |
| [単一要素初期化子リストを`auto`で受け取った場合の型を変更][n3922] | `initializer_list<T>`だったのを`T`に変更 | No | No | No | 14.0 |
| [畳み込み式][n4295] | パラメータパックに対する2項演算の集積処理 | No | 3.6 | No | No |
| [UTF-8文字リテラル][n4267] | 文字列リテラルだけでなく、文字リテラルにもUTF-8指定できるようにする | No | 3.6 | No | 14.0 |
| [入れ子名前空間の定義][n4230] | `namespace A::B {}`のように、入れ子の名前空間を簡単に定義できるようにする | No | 3.6 | No | No |
| [名前空間と列挙子に属性の付加を許可][n4266] | 名前空間の定義と、列挙型の各要素の定義に、属性を付けられるようにする | No | 3.6 | No | 14.0 |
| [非型テンプレートパラメータの定数式を評価する][n4268] | `nullptr`から任意の型のポインタへの変換等をテンプレート引数の指定時に行う | No | 3.6 | No | No |

[n3928]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3928.pdf
[n4086]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4086.html
[n4051]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4051.html
[n3922]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3922.html
[n4295]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4295.html
[n4267]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4267.html
[n4230]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4230.html
[n4266]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4266.html
[n4268]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4268.html

各処理系のC++1z実装状況ページ：

- Clang: [C++ Support in Clang](http://clang.llvm.org/cxx_status.html)
- Visual C++ (MSVC): [Support For C++11/14/17 Features (Modern C++)](https://msdn.microsoft.com/en-us/library/vstudio/hh567368%28v=vs.140%29.aspx)
- Visual C++ (MSVC): [C++11/14/17 Features In VS 2015 RTM - Visual C++ Team Blog](http://blogs.msdn.com/b/vcblog/archive/2015/06/19/c-11-14-17-features-in-vs-2015-rtm.aspx)

[gcc]: ./implementation.md#gcc
[clang]: ./implementation.md#clang
[icc]: ./implementation.md#icc
[msvc]: ./implementation.md#visual_cpp

