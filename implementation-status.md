#コンパイラの実装状況
このページでは、C++のバージョンごとの言語機能を、どのコンパイラがどのバージョンからサポートしているかをまとめる。

ライブラリ機能については、本サイトのリファレンスで各機能を参照してもらいたい。


MSVC(Microsoft Visual C++)のバージョン表記の、製品との対応付けは以下のようになっている：


| MSVCのバージョン | 製品のバージョン |
|------------------|------------------|
| 6.0 | Visual Studio 6.0 |
| 7.0 | Visual Studio .NET 2002 |
| 7.1 | Visual Studio .NET 2003 |
| 8.0 | Visual Studio 2005 |
| 9.0 | Visual Studio 2008 |
| 10.0 | Visual Studio 2010 |
| 11.0 | Visual Studio 2012 |
| 12.0 | Visual Studio 2013 |
| 14.0 | Visual Studio 2015 |



##C++11言語機能の実装状況

| 言語機能                         | 説明 | GCC | Clang | ICC | MSVC |
|----------------------------------|------|-----|-------|-----|------|
| `alignas`                        | アラインメント指定 | 4.8 | 3.0 | | 14.0<br/>7.1あるいはそれ以前からある`__declspec(align(x))`構文で代替可能。 |
| `alignof`                        | アラインメント取得 | 4.5 | 3.3 | | 14.0<br/>7.1あるいはそれ以前よりある`__alignof`で代替可能。 |
| `auto`                           | 型推論 | 4.4 | 2.9 | 12.0 | 10.0 |
| C99互換のプリプロセッサ          | 可変引数マクロ等 | 4.3 | 2.9 | 11.1 | 8.0 (partial) 可変引数のみ `_Pragma`の代わりに`__pragma`が存在する。 |
| `constexpr`                      | 定数式 | 4.6 | 3.1 | 13.0 (partial)<br/> 14.0 | 14.0 (partial) |
| `decltype`                       | 式の型を取得 | 4.3 | 2.9 | 13.0 | 10.0 (partial)<br/> 11.0 |
| 関数の`default/delete`宣言       | 自動定義される特殊関数の制御 | 4.4 | 3.0 | 12.0 | 14.0<br/>12.0 ムーブコンストラクタ・ムーブ代入演算子の`default`は不可<br/> 14.0 |
| 移譲コンストラクタ               | コンストラクタから他のコンストラクタに処理を移譲する | 4.7 | 3.0 | No | 12.0 |
| `explicit operator T()`          | 明示的型変換の演算子 | 4.5 | 3.0 | 14.0 | 12.0 |
| 拡張`friend`宣言                 | テンプレートパラメータや`typedef`名を`friend`宣言 | 4.7 | 2.9 | 11.1 (partial) <br/> 12.0 | 10.0 |
| `extern template`                | テンプレートのインスタンス化抑止 | 3.3 | 2.9 | 11.1 | 6.0 |
| `enum`の先行宣言                 |  | 4.6 | 3.1 | 11.1 (partial)<br/> 14.0 | 11.0 |
| 継承コンストラクタ               | 基本クラスのコンストラクタを継承 | 4.8 | 3.3 | No | 14.0 |
| ラムダ式                         | 関数オブジェクトをその場に書く | 4.5 | 3.1 | 12.0 | 10.0 (partial)<br/> 11.0 |
| ローカルクラスと無名クラスを、テンプレート実引数として使用する |  | 4.5 | 2.9 | 12.0 | 10.0 |
| `long long`型                    | `long`以上の大きさを持つ整数型 | 4.3 | 2.9 | 11.1 | 7.1 |
| `inline namespace`               | ネストした名前空間に、透過的にアクセスする | 4.4 | 2.9 | 14.0 | 14.0 |
| `char16_t`、`char32_t`型         | UTF-16とUTF-32の文字型 | 4.4 | 2.9 | 12.1 (Windows: partial) <br/> 12.1 (GNU/Linux, OS X)<br/> 14.0 | 14.0<br/> 10.0より同名のtypedefが存在する |
| 戻り値の型を後置する関数宣言構文 | 以下のような形式での関数宣言<br/> `auto f(arg_types...) -> return_type` | 4.4 | 2.9 | 12.0 | 10.0 |
| `nullptr`                        | ヌルポインタを表すポインタリテラル | 4.6 | 2.9 | 11.1 | 10.0 |
| Unicode文字列リテラル            | uプレフィックスでUTF-16 (`char16_t`)<br/> UプレフィックスでUTF-32 (`char32_t`)<br/> u8プレフィックスでUTF-8 (`char`) | 4.5 | 3.0 | No | 14.0 |
| 生文字列リテラル                 | 文字列リテラルにRプレフィックスを付けることで、エスケープシーケンスを無視する | 4.5 | 3.0 | 14.0 | 12.0 |
| ユーザー定義リテラル             | リテラルのサフィックスをユーザー定義する | 4.7 | 3.1 | No | 14.0 |
| テンプレートの右山括弧           | `vector<basic_string>>`のように、`>>`をスペースを空けずに記述可能にする | 4.3 | 2.9 | 11.1 | 8.0 |
| 右辺値参照と`std::move()`        | 右辺値によるオーバーロード、およびそれによるリソースの所有権移動 | 4.3 (partial)<br/> 4.6 | 2.9 | 12.0 | 10.0 (partial) ムーブコンストラクタと代入演算子の暗黙定義に対応していない。<br/> 14.0 |
| `static_assert`                  | コンパイル時アサート | 4.3 | 2.9 | 11.1 | 10.0 |
| `enum class`                     | 強い型付けを持つ列挙型 | 4.4 | 2.9 | 11.1 (partial)<br/> 14.0 | 11.0 |
| エイリアステンプレート           | テンプレートによる型の別名付け | 4.7 | 3.0 | 12.1 | 12.0 |
| `thread_local`                   | スレッドローカルストレージ | 4.8 | 3.3 | 11.1 (partial) | 10.0<br/> `__declspec(thread)`属性での部分サポート<br/> 14.0 |
| `union`の制限解除                | 共用体のメンバ変数として、クラスオブジェクトを持つ | 4.6 | 3.0 | 14.0(Linux系OSおよびMacのみ。Windowsは非対応) | 14.0 |
| 可変引数テンプレート             |  | 4.3 (partial)<br/> 4.4 | 2.9 | 12.1 | 12.0 |
| 範囲for文                        |  | 4.6 | 3.0 | 13.0 | 11.0 |
| `override`と`final`              | メンバ関数のオーバーライド指定、および派生クラスでのオーバーロードを禁止する指定 | 4.7 | 2.9 | 14.0 | 8.0 (partial): `override`のみ。`final`の代わりにsealedが存在する。ただし両者ともデストラクタには指定できない。<br/> 11.0 |
| 属性構文                         | `[[attr]]`構文による、クラス、関数、変数の属性指定 | 4.8 | 3.3 | 12.1 | No |
| メンバ関数の左辺値／右辺値修飾   | オブジェクトが左辺値／右辺値の場合のみ呼び出し可能であることの指定 | 4.8.1 | 2.9 | 14.0 | 14.0 |
| 非静的データメンバの初期化       | メンバ変数を、宣言と同時に初期値指定する | 4.7 | 3.0 | 14.0 | 12.0 |
| ブロックスコープな`static`変数初期化のスレッドセーフ化 |  | 4.0 | 2.9 | ? | 14.0 |
| 初期化子リスト                   | 波括弧による初期化。`vector<int> v = {1, 2, 3};`など。 | 4.4 | 3.1 | 14.0 | 12.0 |
| `noexcept`                       | 関数の例外指定、例外を投げる可能性のある式かbool値を返す演算子 | 4.6 | 3.0 | 13.0(partial)<br/>14.0 | 14.0 |
| 任意の式によるSFINAE             | | 4.4 | 2.9 | 12.0 | No |
| 一様初期化                       | コンストラクタ呼び出しを波カッコで行う `T x { a, b, c }` | 4.6 | 3.1 | 13.0(partial)<br/> 14.0 | 12.0 |


各処理系のC++11実装状況ページ：

- 全体的な対応状況： [C++0xCompilerSupport](http://wiki.apache.org/stdcxx/C++0xCompilerSupport)
- GCC： [C++0x/C++11 Support in GCC](http://gcc.gnu.org/projects/cxx0x.html)
- libstdc++ : [C++ 2011](http://gcc.gnu.org/onlinedocs/libstdc++/manual/status.html#status.iso.2011)
- Clang： [C++98 and C++11 Support in Clang](http://clang.llvm.org/cxx_status.html)
- ICC : [C++11 Features Supported by Intel&#174; C++ Compiler](http://software.intel.com/en-us/articles/c0x-features-supported-by-intel-c-compiler)
- VC++： [C++11 Features (Modern C++)](http://msdn.microsoft.com/en-us/library/vstudio/hh567368%28v=vs.120%29.aspx)
- VC++ November 2013 CTP: [Visual C++ Compiler November 2013 CTP](http://herbsutter.com/2013/11/18/visual-c-compiler-november-2013-ctp/)
- Visual Studio “14” CTP: [Visual Studio “14” CTP - Visual C++ Team Blog - Site Home - MSDN Blogs](http://blogs.msdn.com/b/vcblog/archive/2014/06/03/visual-studio-14-ctp.aspx)
- [C++11/14/17 Features In VS 2015 Preview - Visual C++ Team Blog](http://blogs.msdn.com/b/vcblog/archive/2014/11/17/c-11-14-17-features-in-vs-2015-preview.aspx)


##C++14
C++14は、C++11のバグフィックス + マイナーアップデートが予定されているバージョンである。

| 言語機能                     | 説明 | GCC | Clang | ICC | MSVC |
|------------------------------|------|-----|-------|-----|------|
| 2進数リテラル                | 2進数を表す`0b` or `0B`プレフィックスを付けた数値リテラルの記述を可能とする | 4.3(GNU)<br/> 4.9 | 3.2 | No | 14.0 |
| 通常関数の戻り値型推論       | 関数の戻り値型を`auto`にすることで、`return`文から戻り値の型を推論させる | 4.8(partial)<br/>4.9 | 3.3(partial)<br/> 3.4 | No | 14.0 |
| 汎用ラムダキャプチャ | キャプチャに代入構文を導入し、一つの変数に複数のキャプチャ方法を指定可能にする | 4.9 | 3.4 | No | 14.0 |
| ジェネリックラムダ           | ラムダ式のパラメータを`auto`にすることで、ジェネリックな関数呼び出し演算子を持つ関数オブジェクトを生成する | 4.9 | 3.4 | No | 14.0 |
| 変数テンプレート             | 変数定義時のテンプレート指定を可能にする。 | 5.0 | 3.4 | No | No |
| `constexpr`の制限緩和        | `if`文、`switch`文による条件分岐の許可。<br/>`for`文、`while`文、`do-while`文によるループの許可。<br/>`void`戻り値型の許可<br/>初期化を伴う変数宣言の許可。<br/>変数書き換えの許可。 | 5.0 | 3.3(partial) | No | No |
| 宣言時のメンバ初期化を持つ型の集成体初期化を許可 | | 5.0 | 3.3 | No | No |
| `[[deprecated]]`属性         | 非推奨の機能であることを示す属性。 | 4.9 | 3.4 | No | No<br/>`__declspec(deprecated)` |
| 数値リテラルの桁区切り文字   | シングルクォーテーションで数値リテラルを桁区切りする。 | 4.9 | 3.4 | No | 14.0 |
| サイズ付きデアロケーション   | サイズをとる`delete`演算子のオーバーロードを許可する。 | 5.0 | 3.4 | No | 14.(partial) |

GCCとClangでは、-std=c++1yコンパイルオプションを付けることで、これらの機能を使用できる。

各処理系のC++14実装状況ページ：

- GCC: [C++1y/C++14 Support in GCC](http://gcc.gnu.org/projects/cxx1y.html)
- libstdc++: [C++ 2014](http://gcc.gnu.org/onlinedocs/libstdc++/manual/status.html#status.iso.2014)
- Clang: [C++98, C++11, and C++14 Support in Clang](http://clang.llvm.org/cxx_status.html)
- libc++: [libc++ C++1Y Status](http://libcxx.llvm.org/cxx1y_status.html)
- Visual C++: [C++11/14 Feature Tables For Visual Studio 14 CTP1 - Visual C++ Team Blog](http://blogs.msdn.com/b/vcblog/archive/2014/06/11/c-11-14-feature-tables-for-visual-studio-14-ctp1.aspx)
- [C++11/14/17 Features In VS 2015 Preview - Visual C++ Team Blog](http://blogs.msdn.com/b/vcblog/archive/2014/11/17/c-11-14-17-features-in-vs-2015-preview.aspx)


##Technical Specificationの実装状況
Technical Specificationは、C++14に追加で導入する言語機能、およびライブラリである。

| 言語機能                     | 説明 | GCC | Clang | ICC | MSVC |
|------------------------------|------|-----|-------|-----|------|
| 実行時サイズの配列           | 組み込み配列を、実行時の要素数で構築することを可能にする | 4.9 | No | No | No |


