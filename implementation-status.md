# コンパイラの実装状況
このページでは、C++のバージョンごとの言語機能を、どのコンパイラがどのバージョンからサポートしているかをまとめる。

ライブラリ機能については、本サイトのリファレンスで各機能を参照してもらいたい。


## <a name="cpp11" href="#cpp11">C++11言語機能の実装状況</a>

| 言語機能                         | 説明 | [GCC][gcc] | [Clang][clang] | [ICC][icc] | [MSVC][msvc] |
|----------------------------------|------|-----|-------|-----|------|
| [`alignas`](/lang/cpp11/alignas.md) | アライメント指定 | 4.8 | 3.0 | No | 14.0<br/>7.1あるいはそれ以前からある`__declspec(align(x))`構文で代替可能。 |
| [`alignof`](/lang/cpp11/alignof.md) | アライメント取得 | 4.5 | 3.3 | No | 14.0<br/>7.1あるいはそれ以前よりある`__alignof`で代替可能。 |
| [`auto`](/lang/cpp11/auto.md) | 型推論 | 4.4 | 2.9 | 12.0 | 10.0 |
| [`decltype`](/lang/cpp11/decltype.md) | 式の型を取得 | 4.3 | 2.9 | 13.0 | 10.0 (partial)<br/> 11.0 |
| C99互換のプリプロセッサ          | [可変引数マクロ](/lang/cpp11/variadic_macros.md)、[Pragma演算子](/lang/cpp11/pragma_operator.md)、[`__func__`](/lang/cpp11/func.md) | 4.3 | 2.9 | 11.1 | 8.0 (partial): 可変引数のみ `_Pragma`の代わりに`__pragma`が存在する。
| [`constexpr`](/lang/cpp11/constexpr.md) | 定数式 | 4.6 | 3.1 | 13.0 (partial)<br/> 14.0 | 14.0 (partial) |
| [関数の`default/delete`宣言](/lang/cpp11/defaulted_and_deleted_functions.md) | 自動定義される特殊関数の制御 | 4.4 | 3.0 | 12.0 | 12.0: ムーブコンストラクタ・ムーブ代入演算子の`default`は不可<br/> 14.0 |
| [移譲コンストラクタ](/lang/cpp11/delegating_constructors.md) | コンストラクタから他のコンストラクタに処理を移譲する | 4.7 | 3.0 | 14.0 | 12.0 |
| [明示的な型変換演算子のオーバーロード](/lang/cpp11/explicit_conversion_operator.md) | 明示的な型変換が行われる場合にのみ呼び出される演算子をオーバーロードできるようにする | 4.5 | 3.0 | 14.0 | 12.0 |
| [`friend`宣言できる対象を拡張](/lang/cpp11/extend_friend_targets.md) | テンプレートパラメータや型の別名を`friend`宣言 | 4.7 | 2.9 | 11.1 (partial) <br/> 12.0 | 10.0 |
| [`extern template`](/lang/cpp11/extern_template.md) | テンプレートのインスタンス化抑止 | 3.3 | 2.9 | 11.1 | 6.0 |
| [継承コンストラクタ](/lang/cpp11/inheriting_constructors.md) | 基本クラスのコンストラクタを継承する | 4.8 | 3.3 | 15.0 | 14.0 |
| [ラムダ式](/lang/cpp11/lambda_expressions.md) | 関数オブジェクトをその場に書く | 4.5 | 3.1 | 12.0 | 10.0 (partial)<br/> 11.0 |
| [ローカル型と無名型を、テンプレート引数として使用することを許可](/lang/cpp11/local_and_unnamed_type_as_template_arguments.md) | ローカルおよび無名として定義したクラスや列挙型を、テンプレート引数として渡せるようにする | 4.5 | 2.9 | 12.0 | 10.0 |
| [`long long`型](/lang/cpp11/long_long_type.md) | 64ビット以上の大きさを持つ整数型 | 4.3 | 2.9 | 11.1 | 7.1 |
| [インライン名前空間](/lang/cpp11/inline_namespaces.md) | ネストした名前空間に、透過的にアクセスする | 4.4 | 2.9 | 14.0 | 14.0 |
| [`char16_t`と`char32_t`](/lang/cpp11/char16_32.md) | UTF-16とUTF-32の文字型 | 4.4 | 2.9 | 12.1 (Windows: partial) <br/> 12.1 (GNU/Linux, macOS)<br/> 14.0 | 14.0<br/> 10.0より組み込み型ではなく型の別名として存在する |
| [UTF-8文字列リテラル](/lang/cpp11/utf8_string_literals.md) | `char`の文字列をUTF-8エンコーディングするプレフィックス | 4.5 | 3.0 | 12.1 (Windows: partial) <br/> 12.1 (GNU/Linux, macOS)<br/> 14.0 | 14.0 |
| [生文字列リテラル](/lang/cpp11/raw_string_literals.md) | 文字列リテラルにRプレフィックスを付けることで、エスケープシーケンスを無視する | 4.5 | 3.0 | 14.0 | 12.0 |
| [ユーザー定義リテラル](/lang/cpp11/user_defined_literals.md) | リテラルのサフィックスをユーザー定義する | 4.7 | 3.1 | 15.0 | 14.0 |
| [戻り値の型を後置する関数宣言構文](/lang/cpp11/trailing_return_types.md) | 以下のような形式での関数宣言<br/> `auto f(arg_types...) -> return_type` | 4.4 | 2.9 | 12.0 | 10.0 |
| [`nullptr`](/lang/cpp11/nullptr.md) | ヌルポインタを表すポインタリテラル | 4.6 | 2.9 | 11.1 | 10.0 |
| [テンプレートの右山カッコ](/lang/cpp11/right_angle_brackets.md) | `vector<basic_string<char>>`のように、`>>`をスペースを空けずに記述可能にする | 4.3 | 2.9 | 11.1 | 8.0 |
| [右辺値参照・ムーブセマンティクス](/lang/cpp11/rvalue_ref_and_move_semantics.md) | 右辺値によるオーバーロード、およびそれによるリソースの所有権移動 | 4.3 (partial)<br/> 4.6 | 2.9 | 12.0 | 10.0 (partial) ムーブコンストラクタと代入演算子の暗黙定義に対応していない。<br/> 14.0 |
| [コンパイル時アサート](/lang/cpp11/static_assert.md) | コンパイル時に条件式が真であることを表明する | 4.3 | 2.9 | 11.1 | 10.0 |
| [`enum`の先行宣言](/lang/cpp11/scoped_enum.md#extended-unscoped-enum) |  | 4.6 | 3.1 | 11.1 (partial)<br/> 14.0 | 11.0 |
| [スコープを持つ列挙型](/lang/cpp11/scoped_enum.md) | 強い型付けとスコープを持つ列挙型 | 4.4 | 2.9 | 11.1 (partial)<br/> 14.0 | 11.0 |
| [エイリアステンプレート](/lang/cpp11/alias_templates.md) | テンプレートによって型の別名を定義する | 4.7 | 3.0 | 12.1 | 12.0 |
| [共用体の制限解除](/lang/cpp11/unrestricted_unions.md) | 共用体のメンバ変数として、クラスオブジェクトを持つ | 4.6 | 3.0 | 14.0(Linux系OSおよびMacのみ。Windowsは非対応) | 14.0 |
| [可変引数テンプレート](/lang/cpp11/variadic_templates.md) | 任意の数のテンプレートパラメータを受け取れるようにする | 4.3 (partial)<br/> 4.4 | 2.9 | 12.1 | 12.0 |
| [範囲for文](/lang/cpp11/range_based_for.md) | 配列やコンテナといった範囲を表すオブジェクトを、簡潔に走査する | 4.6 | 3.0 | 13.0 | 11.0 |
| [`override`と`final`](/lang/cpp11/override_final.md) | メンバ関数のオーバーライド指定、および派生クラスでのオーバーロードを禁止する指定 | 4.7 | 2.9 | 14.0 | 8.0 (partial): `override`のみ。`final`の代わりにsealedが存在する。ただし両者ともデストラクタには指定できない。<br/> 11.0 |
| [属性構文](/lang/cpp11/attributes.md) | `[[attr]]`構文による、クラス、関数、変数の属性指定 | 4.8 | 3.3 | 12.1 | 14.0 |
| [メンバ関数の左辺値／右辺値修飾](/lang/cpp11/ref_qualifier_for_this.md) | オブジェクトが左辺値／右辺値の場合のみ呼び出し可能であることの指定 | 4.8.1 | 2.9 | 14.0 | 14.0 |
| [非静的メンバ変数の初期化](/lang/cpp11/non_static_data_member_initializers.md) | メンバ変数を、宣言と同時に初期値指定する | 4.7 | 3.0 | 14.0 | 12.0 |
| [初期化子リスト](/lang/cpp11/initializer_lists.md) | 波括弧による初期化をユーザー定義する。`vector<int> v = {1, 2, 3};`など。 | 4.4 | 3.1 | 14.0 | 12.0 |
| [一様初期化](/lang/cpp11/uniform_initialization.md) | コンストラクタ呼び出しを波カッコで行う。 `T x { a, b, c };` | 4.6 | 3.1 | 13.0(partial)<br/> 14.0 | 12.0 |
| [`noexcept`](/lang/cpp11/noexcept.md) | 関数の例外指定、例外を投げる可能性のある式かbool値を返す演算子 | 4.6 | 3.0 | 13.0(partial)<br/>14.0 | 14.0 |
| [任意の式によるSFINAE](/lang/cpp11/sfinae_expressions.md) | 特定の式が有効かどうかで、その関数をオーバーロード解決に含めるかどうかを決定する | 4.4 | 2.9 | 12.0 | 14.0 Update 1 (partial)<br/> 14.0 Update 3 |
| [スレッドローカルストレージ](/lang/cpp11/thread_local_storage.md) | スレッドごとに異なる静的記憶域に保持される変数 | 4.8 | 3.3 | 11.1 (partial) | 10.0<br/> `__declspec(thread)`属性での部分サポート<br/> 14.0 |
| [ブロックスコープを持つ`static`変数初期化のスレッドセーフ化](/lang/cpp11/static_initialization_thread_safely.md) | 関数ローカルで定義した`static`変数の初期化を、スレッドセーフにする | 4.0 | 2.9 | 11.0 (Lnux/macOS)<br/> 14.0 | 14.0 |


各処理系のC++11実装状況ページ：

- 全体的な対応状況： [C++0xCompilerSupport](https://wiki.apache.org/stdcxx/C++0xCompilerSupport)
- GCC： [C++11 Support in GCC](https://gcc.gnu.org/projects/cxx-status.html#cxx11)
- libstdc++ : [C++ 2011](https://gcc.gnu.org/onlinedocs/libstdc++/manual/status.html#status.iso.2011)
- Clang： [C++98 and C++11 Support in Clang](http://clang.llvm.org/cxx_status.html)
    - [C++ Defect Report Support in Clang](http://clang.llvm.org/cxx_dr_status.html)
- ICC : [C++11 Features Supported by Intel&#174; C++ Compiler](https://software.intel.com/en-us/articles/c0x-features-supported-by-intel-c-compiler)
- Visual C++ (MSVC): [C++11/14/17 の機能のサポート (Modern C++)](https://msdn.microsoft.com/ja-jp/library/hh567368.aspx)
- Visual C++ (MSVC): [C++11/14/17 Features In VS 2015 RTM - Visual C++ Team Blog](https://blogs.msdn.microsoft.com/b/vcblog/archive/2015/06/19/c-11-14-17-features-in-vs-2015-rtm.aspx)
- Visual C++ (MSVC): [Visual Studio 2015 Update 1 RC Available](https://blogs.msdn.microsoft.com/vcblog/2015/10/29/visual-studio-2015-update-1-rc-available/)
- Visual C++ (MSVC): [Compiler improvements in VS 2015 Update 3 RC - Visual C++ Team Blog](https://blogs.msdn.microsoft.com/vcblog/2016/06/07/compiler-improvements-in-vs-2015-update-3-rc/)


## <a name="cpp14" href="#cpp14">C++14言語機能の実装状況</a>

| 言語機能                     | 説明 | [GCC][gcc] | [Clang][clang] | [ICC][icc] | [MSVC][msvc] |
|------------------------------|------|-----|-------|-----|------|
| [2進数リテラル](/lang/cpp14/binary_literals.md) | 2進数を表す`0b` or `0B`プレフィックスを付けた数値リテラルの記述を可能とする | 4.3(GNU)<br/> 4.9 | 3.2 | 11.0 | 14.0 |
| [通常関数の戻り値型推論](/lang/cpp14/return_type_deduction_for_normal_functions.md) | 関数の戻り値型を`auto`にすることで、`return`文から戻り値の型を推論させる | 4.8(partial)<br/>4.9 | 3.3(partial)<br/> 3.4 | 15.0 | 14.0 |
| [ラムダ式の初期化キャプチャ](/lang/cpp14/initialize_capture.md) | キャプチャに代入構文を導入し、一つの変数に複数のキャプチャ方法を指定可能にする | 4.9 | 3.4 | 15.0 | 14.0 |
| [ジェネリックラムダ](/lang/cpp14/generic_lambdas.md) | ラムダ式のパラメータを`auto`にすることで、ジェネリックな関数呼び出し演算子を持つ関数オブジェクトを生成する | 4.9 | 3.4 | 16.0 | 14.0 |
| [変数テンプレート](/lang/cpp14/variable_templates.md) | 変数定義時のテンプレート指定を可能にする。 | 5.1 | 3.4 | 16.0 | 14.0 Update 2 |
| [`constexpr`の制限緩和](/lang/cpp14/relaxing_constraints_on_constexpr.md) | `if`文、`switch`文による条件分岐の許可。<br/>`for`文、`while`文、`do-while`文によるループの許可。<br/>`void`戻り値型の許可<br/>初期化を伴う変数宣言の許可。<br/>変数書き換えの許可。 | 5.1 | 3.3(partial) <br/> 3.4 | 16.0 | 14.1 |
| [宣言時のメンバ初期化を持つ型の集成体初期化を許可](/lang/cpp14/brace_elision_in_array_temporary_initialization.md) | 一様初期化と初期化子リストを組み合わせた際、二重に波カッコが必要となっていた仕様を緩和し、波カッコを省略できるようにする | 5.1 | 3.3 | 16.0 | 14.1 |
| [`[[deprecated]]`属性](/lang/cpp14/deprecated_attr.md) | 非推奨の機能であることを示す属性。 | 4.9 | 3.4 | 15.0<br/> (Linux/Mac OS) | 14.0<br/>それ以前は`__declspec(deprecated)`で代替可能 |
| [数値リテラルの桁区切り文字](/lang/cpp14/digit_separators.md) | シングルクォーテーションで数値リテラルを桁区切りする。 | 4.9 | 3.4 | 16.0 | 14.0 |
| [サイズ付きデアロケーション](/lang/cpp14/sized_deallocation.md) | サイズをとる`delete`演算子のオーバーロードを許可する。 | 5.1 | 3.4 | 16.0 | 14.(partial) |


各処理系のC++14実装状況ページ：

- GCC: [C++14 Support in GCC](https://gcc.gnu.org/projects/cxx-status.html#cxx14)
- libstdc++: [C++ 2014](https://gcc.gnu.org/onlinedocs/libstdc++/manual/status.html#status.iso.2014)
- Clang: [C++98, C++11, and C++14 Support in Clang](http://clang.llvm.org/cxx_status.html)
- libc++: [libc++ C++1Y Status](http://libcxx.llvm.org/cxx1y_status.html)
- Visual C++ (MSVC): [Support For C++11/14/17 Features (Modern C++)](https://msdn.microsoft.com/en-us/library/hh567368%28v=vs.140%29.aspx)
- Visual C++ (MSVC): [C++11/14/17 Features In VS 2015 RTM - Visual C++ Team Blog](https://blogs.msdn.microsoft.com/vcblog/2015/06/19/c111417-features-in-vs-2015-rtm/)
    - [Compiler improvements in VS 2015 Update 2 - Visual C++ Team Blog](https://blogs.msdn.microsoft.com/vcblog/2016/02/11/compiler-improvements-in-vs-2015-update-2/)
    - [C++14/17 Features and STL Fixes in VS “15” Preview 4 - Visual C++ Team Blog](https://blogs.msdn.microsoft.com/vcblog/2016/08/24/c1417-features-and-stl-fixes-in-vs-15-preview-4/)
    - [C++14/17 Features and STL Fixes in VS “15” Preview 5 - Visual C++ Team Blog](https://blogs.msdn.microsoft.com/vcblog/2016/10/11/c1417-features-and-stl-fixes-in-vs-15-preview-5/)
- ICC: [C++14 Features Supported by Intel C++ Compiler](https://software.intel.com/en-us/articles/c14-features-supported-by-intel-c-compiler)
    - [Intel (R) Parallel Studio XE 2016 Beta program has begun](https://software.intel.com/en-us/forums/topic/549502)


## <a name="cpp17" href="#cpp17">C++17言語機能の実装状況</a>

| 言語機能 | 説明 | [GCC][gcc] | [Clang][clang] | [ICC][icc] | [MSVC][msvc] |
|----------|------|-----|-------|-----|------|
| [メッセージなしの`static_assert`][n3928] | デフォルトの表明メッセージを使用する | 6 | 3.5 | 18.0 | 14.1 |
| [トライグラフを削除][n4086] | | 5.1 | 3.5 | No | 12.0 |
| [テンプレートテンプレートパラメータに`typename`を許可][n4051] | `class`キーワードしか使用できなかった部分に、`typename`を許可 | 5.0 | 3.5 | 17.0 | 14.0 |
| [単一要素初期化子リストを`auto`で受け取った場合の型を変更][n3922] | `initializer_list<T>`だったのを`T`に変更 | 5 | 3.8 | 17.0 | 14.0 |
| [畳み込み式][n4295] | パラメータパックに対する2項演算の集積処理 | 6 | 3.6 | No | No |
| [UTF-8文字リテラル][n4267] | 文字列リテラルだけでなく、文字リテラルにもUTF-8指定できるようにする | 6 | 3.6 | 17.0 | 14.0 |
| [入れ子名前空間の定義][n4230] | `namespace A::B {}`のように、入れ子の名前空間を簡単に定義できるようにする | 6 | 3.6 | 17.0 | 14.0 Update 3 |
| [名前空間と列挙子に属性の付加を許可][n4266] | 名前空間の定義と、列挙型の各要素の定義に、属性を付けられるようにする | 名前空間は4.0<br/>列挙子は6 | 3.6 | 17.0 | 14.0 |
| [非型テンプレートパラメータの定数式を評価する][n4268] | `nullptr`から任意の型のポインタへの変換等をテンプレート引数の指定時に行う | 6 | 3.6 | No | No |
| [非推奨だった`register`キーワードを削除][P0001R1] | | 7 | 3.8 | 18.0 | 14.1 Update 3 |
| [非推奨だった`bool`型オブジェクトに対するインクリメントの仕様を削除][P0002R1] | | 7 | 3.8 | 18.0 | 14.1 Update 3 |
| [例外仕様を型システムの一部にする][P0012R1] | | 7 | 4 | No | No |
| [プリプロセッサでの条件式`__has_include`][P0061R1] | 対象のインクルードファイルが存在するかをプリプロセス時に判定する | 5.0 | 3.0 | 18.0 | 14.1 Update 3 |
| [継承コンストラクタの新仕様][P0136R1] | デフォルト引数を引き継ぐようにした | 7 | 3.9 | No | No |
| [`[[fallthrough]]`属性][P0188R1] | `case`節で`break`や`return`を書かなかった場合に、それが意図したフォールスルーであることをコンパイラに伝える属性 | 7 | 3.9 | 18.0 | 14.1 |
| [`[[nodiscard]]`属性][P0189R1] | 関数の戻り値を無視してはならないことをユーザーに伝える属性 | 4.8からは`[[gnu::warn_unused_result]]`を使用すること<br/> 7からサポート | 3.9 | 18.0 | 14.1 Update 3 |
| [`[[maybe_unused]]`属性][P0212R1] | 使用しない可能性がある変数であることをコンパイラに伝える属性 | 4.8からは`[[gnu::unused]]`を使用すること<br/> 7からサポート | 3.9 | 18.0 | 14.1 Update 3 |
| [基本クラスのメンバ変数を集成体初期化するための波カッコを省略できるようにする][P0017R1] | 基本クラスのメンバを集成体初期化するために、`derived d {{42}};`の代わりに`derived d {42};`と書けるようにする | 7 | 3.9 | No | No |
| [ラムダ式を`constexpr`として使用できるようにする][P0170R1] | ラムダ式の関数オブジェクトが定数式の文脈で使用された場合に、それがコンパイル時に評価されるようにする | 7 | No | No | 14.1 Update 3 |
| [範囲for文のための`begin()`と`end()`関数が、異なる型を返すことを許可][P0184R0] | `begin()`と`end()`が異なるイテレータ型を返せるようにすることで、終端イテレータを定義しやすくする | 6 | 3.9 | 18.0 | 14.1 |
| [ラムダ式での`*this`のコピーキャプチャ][P0018R3] | キャプチャリストに`*this`を指定することで、`*this`をコピーキャプチャする | 7 | 3.8 | No | 14.1 Update 3 |
| [`enum class`変数の初期値として整数を指定する際の規則を調整][P0138R2] | キャストを使用することなく整数を初期値として使用し、`E e{0};`のような初期化を許可 | 7 | 1.9 | No | 14.1 Update 3 |
| [浮動小数点数の16進数リテラル][P0245R1] | `hexfloat`マニピュレータや`printf()`の16進数出力に合わせて、浮動小数点数のリテラルも16進数表記できるようにする | 3.0 | 3.0 | 18.0 | No |
| [属性の名前空間指定に繰り返しをなくす][P0028R4] | `[[using CC: opt(1), debug]]`のように属性の名前空間宣言をまとめて行う | 7 | 3.9 | 18.0 | 14.1 Update 3 |
| [アライメント指定されたデータの動的メモリ確保時][P0035R4] | `operator new`と`operator delete`でアライメント値を取得できるようにする | 7 | 4 | No | No |
| [クラステンプレートのテンプレート引数推論][P0091R3] | コンストラクタの引数からクラスのテンプレート引数を推論できるようにする | 7 | No | No | No |
| [非型テンプレート引数の`auto`宣言][P0127R2] | `template <typename T, T x>`という冗長なコードを`template <auto x>`のようにして受けられるようにし、<br/> `X<3>; X<true>; X<'a'>`のように定数を簡潔に渡せるようにする | 7 | 4 | No | No |
| [値のコピー省略を保証][P0135R1] | 一時オブジェクトをコピーする際に、単純な値を持つクラスであればコピーが省略されることを保証する | 7 | 4 | No | 14.1 Update 3 |
| 厳密な式の評価順 [P0145R3][P0145R3] [P0400R0][P0400R0] | 式の項が評価される順序を厳密に規定する。<br/> `b = a;`の式が右から順番(a, bの順)に評価される | 7 | 4 | No | No |
| [不明な属性を無視する][P0283R2] | 実装が知らない名前空間の属性は無視する | 4.8 | 3.0 | 18.0 | No |
| [if constexpr文][P0292R2] | `if constexpr(cond)`とすることで、そのif文はコンパイル時に処理される | 7 | 3.9 | No | 14.1 Update 3 |
| [処理の進行保証][P0296R1] | 並行処理に関して「処理の進行」を明確に定義<br/> (TODO:言葉の定義だけなので実装状況ページからは取り除く) | No | No | No | No |
| [インライン変数][P0386R2] | インライン指定を関数だけでなく変数にも指定できるようにする | 7 | 3.9 | No | No |
| [templated entityという用語を導入][P0391R0] | (TODO:言葉の定義だけなので実装状況ページからは取り除く) | - | - | - | - |
| [構造化束縛][P0217R3] | タプルやユーザー定義型を分解して受け取れるようにする<br/> `tuple<int, string> f();` <br/> `const auto [a, b] = f(); // aはintの値、bはstringの値` | 7 | 4 | 18.0 | 14.1 Update 3 |
| [if文とswitch文の条件式と初期化を分離][P0305R1] | `if (init; condition)`のように初期化と条件式を分けて記述できるようにする | 7 | 3.9 | 18.0 | 14.1 Update 3 |
| [参照メンバをもつクラスの置き換え][P0137R1] | 参照型メンバや`const`データメンバを含むクラスについてこれまで結果は未定義とされていた配置`new`によるオブジェクトの置き換えを条件付きで可能とする | No | No | No | No |
| [非推奨だった例外仕様を削除][P0003R4] | `noexcept`が入ったことによって非推奨になった`throw`キーワードによる例外仕様を削除 | 7 | 4 | No | No |
| [using宣言でのパック展開][P0195R2] | パラメータパックの型を基本クラスとして指定した場合に、`using`宣言に基本クラスのパラメータパックを指定できるようにする | 7 | 4 | No | No |
| [クラステンプレート引数の推論仕様を調整][P0512R0] | | No | No | No | No |
| [Committee Draftに対するNational Body Commentへの対応][P0490R0] | | - | - | - | - |
| [テンプレートテンプレート引数のマッチングにおいて、互換性のあるテンプレートを除外][P0522R0] | | 7 | 4 (partial) | No | No |


[n3928]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3928.pdf
[n4086]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4086.html
[n4051]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4051.html
[n3922]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3922.html
[n4295]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4295.html
[n4267]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4267.html
[n4230]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4230.html
[n4266]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4266.html
[n4268]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4268.html
[P0001R1]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0001r1.html
[P0002R1]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0002r1.html
[P0012R1]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0012r1.html
[P0061R1]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0061r1.html
[P0136R1]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0136r1.html
[P0188R1]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0188r1.pdf
[P0189R1]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0189r1.pdf
[P0212R1]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0212r1.pdf
[P0017R1]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0017r1.html
[P0170R1]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0170r1.pdf
[P0184R0]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0184r0.html
[P0018R3]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0018r3.html
[P0138R2]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0138r2.pdf
[P0245R1]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0245r1.html
[P0028R4]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0028r4.html
[P0035R4]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0035r4.html
[P0091R3]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0091r3.html
[P0127R2]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0127r2.html
[P0135R1]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0135r1.html
[P0145R3]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0145r3.pdf
[P0283R2]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0283r2.html
[P0292R2]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0292r2.html
[P0296R1]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0296r2.html
[P0386R2]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0386r2.pdf
[P0391R0]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0391r0.html
[P0217R3]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0217r3.html
[P0305R1]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0305r1.html
[P0137R1]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0137r1.html
[P0400R0]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0400r0.html
[P0003R4]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0003r4.html
[P0195R2]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0195r2.html
[P0512R0]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0512r0.pdf
[P0490R0]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0490r0.html
[P0522R0]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0522r0.html


各処理系のC++17実装状況ページ：

- GCC: [C++1z Support in GCC](https://gcc.gnu.org/projects/cxx-status.html#cxx1z)
- Clang: [C++ Support in Clang](http://clang.llvm.org/cxx_status.html)
- libc++ : [libc++ C++1z Status](http://libcxx.llvm.org/cxx1z_status.html)
- Visual C++ (MSVC):
    - [Support For C++11/14/17 Features (Modern C++)](https://msdn.microsoft.com/en-us/library/vstudio/hh567368%28v=vs.140%29.aspx)
    - [C++11/14/17 Features In VS 2015 RTM - Visual C++ Team Blog](https://blogs.msdn.microsoft.com/vcblog/2015/06/19/c111417-features-in-vs-2015-rtm/)
    - [C++14/17 Features and STL Fixes in VS “15” Preview 4 - Visual C++ Team Blog](https://blogs.msdn.microsoft.com/vcblog/2016/08/24/c1417-features-and-stl-fixes-in-vs-15-preview-4/)
    - [C++14/17 Features and STL Fixes in VS “15” Preview 5 - Visual C++ Team Blog](https://blogs.msdn.microsoft.com/vcblog/2016/10/11/c1417-features-and-stl-fixes-in-vs-15-preview-5/)
    - [Visual C++ Language Conformance](https://docs.microsoft.com/en-us/cpp/visual-cpp-language-conformance)
    - [C++17 Features In Visual Studio 2017 Version 15.3 Preview - Visual C++ Team Blog](https://blogs.msdn.microsoft.com/vcblog/2017/05/10/c17-features-in-vs-2017-3/)
- ICC: [C++17 Features Supported by Intel C++ Compiler](https://software.intel.com/en-us/articles/c17-features-supported-by-intel-c-compiler)


## <a name="cpp20" href="#cpp20">C++20言語機能の実装状況</a>

| 言語機能 | 説明 | [GCC][gcc] | [Clang][clang] | [ICC][icc] | [MSVC][msvc] |
|----------|------|-----|-------|-----|------|
| [ビットフィールドのメンバ変数初期化](/lang/cpp20/default_member_initializers_for_bit_fields.md) | ビットフィールドメンバ変数のデフォルト値を設定する構文を追加する | | | |
| [ラムダ式のキャプチャとして`[=, this]`を許可する](/lang/cpp20/allow_lambda_capture_equal_this.md) | デフォルトコピーキャプチャと`this`ポインタのコピーキャプチャを両方指定できるようにする | | | | |
| [ジェネリックラムダのテンプレート構文](/lang/cpp20/familiar_template_syntax_for_generic_lambdas.md) | ジェネリックラムダでテンプレートパラメータを定義できるようにする | | | | |
| [`const`修飾されたメンバポインタの制限を修正](/lang/cpp20/fixing_const_qualified_pointers_to_members.md) | `.*`演算子での左辺値の`const`メンバ関数呼び出しを許可する | | | | |
| [可変引数が空でない場合のトークン置換](/lang/cpp20/va_opt.md) | プリプロセッサの置換で可変引数が空の場合に余計なカンマが付いてしまう問題に対処 | | | | |
| [指示付き初期化][P0329] | | | | | |
| [コンセプト][P0734] | | | | | |

[P0329]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0329r4.pdf
[P0734]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0734r0.pdf


[gcc]: ./implementation.md#gcc
[clang]: ./implementation.md#clang
[icc]: ./implementation.md#icc
[msvc]: ./implementation.md#visual_cpp

