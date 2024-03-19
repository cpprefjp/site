# コンパイラの実装状況
このページでは、C++のバージョンごとの言語機能を、どのコンパイラがどのバージョンからサポートしているかをまとめる。

ライブラリ機能については、本サイトのリファレンスで各機能を参照してもらいたい。

- [C++11](#cpp11)
- [C++14](#cpp14)
- [C++17](#cpp17)
- [C++20](#cpp20)
- [C++23](#cpp23)
- [C++26](#cpp26)

## <a id="cpp11" href="#cpp11">C++11言語機能の実装状況</a>

| 言語機能                         | 説明 | [GCC][gcc] | [Clang][clang] | [ICC][icc] | [MSVC][msvc] |
|----------------------------------|------|-----|-------|-----|------|
| N2341: [`alignas`](/lang/cpp11/alignas.md) | アライメント指定 | 4.8 | 3.0 | 15.0 | 2015<br/>2003あるいはそれ以前からある`__declspec(align(x))`構文で代替可能。 |
| N2341: [`alignof`](/lang/cpp11/alignof.md) | アライメント取得 | 4.5 | 3.3 | 15.0 | 2015<br/>2003あるいはそれ以前よりある`__alignof`で代替可能。 |
| N1984: [`auto`](/lang/cpp11/auto.md) | 型推論 | 4.4 | 2.9 | 12.0 | 2010 |
| N2343: [`decltype`](/lang/cpp11/decltype.md) | 式の型を取得 | 4.3 | 2.9 | 13.0 | 2010 (partial)<br/> 2012 |
| N1653: C99互換のプリプロセッサ | [可変引数マクロ](/lang/cpp11/variadic_macros.md)、[Pragma演算子](/lang/cpp11/pragma_operator.md)、[`__func__`](/lang/cpp11/func.md) | 4.3 | 2.9 | 11.1 | 2005 (partial): 可変引数のみ `_Pragma`の代わりに`__pragma`が存在する。<br/> 2019 Update 6 |
| N2235: [`constexpr`](/lang/cpp11/constexpr.md) | 定数式 | 4.6 | 3.1 | 13.0 (partial)<br/> 14.0 | 2015 (partial)<br/> 2015 Update 1 |
| N2346: [関数の`default/delete`宣言](/lang/cpp11/defaulted_and_deleted_functions.md) | 自動定義される特殊関数の制御 | 4.4 | 3.0 | 12.0 | 2013: ムーブコンストラクタ・ムーブ代入演算子の`default`は不可<br/> 2015 |
| N1986: [委譲コンストラクタ](/lang/cpp11/delegating_constructors.md) | コンストラクタから他のコンストラクタに処理を委譲する | 4.7 | 3.0 | 14.0 | 2013 |
| N2437: [明示的な型変換演算子のオーバーロード](/lang/cpp11/explicit_conversion_operator.md) | 明示的な型変換が行われる場合にのみ呼び出される演算子をオーバーロードできるようにする | 4.5 | 3.0 | 14.0 | 2013 |
| N1791: [`friend`宣言できる対象を拡張](/lang/cpp11/extend_friend_targets.md) | テンプレートパラメータや型の別名を`friend`宣言 | 4.7 | 2.9 | 11.1 (partial) <br/> 12.0 | 2010 |
| N1987: [`extern template`](/lang/cpp11/extern_template.md) | テンプレートのインスタンス化抑止 | 3.3 | 2.9 | 11.1 | 6.0 |
| N2540: [継承コンストラクタ](/lang/cpp11/inheriting_constructors.md) | 基底クラスのコンストラクタを継承する | 4.8 | 3.3 | 15.0 | 2015 |
| N2927: [ラムダ式](/lang/cpp11/lambda_expressions.md) | 関数オブジェクトをその場に書く | 4.5 | 3.1 | 12.0 | 2010 (partial)<br/> 2012 |
| N2657: [ローカル型と無名型を、テンプレート引数として使用することを許可](/lang/cpp11/local_and_unnamed_type_as_template_arguments.md) | ローカルおよび無名として定義したクラスや列挙型を、テンプレート引数として渡せるようにする | 4.5 | 2.9 | 12.0 | 2010 |
| N1811: [`long long`型](/lang/cpp11/long_long_type.md) | 64ビット以上の大きさを持つ整数型 | 4.3 | 2.9 | 11.1 | 2003 |
| N2535: [インライン名前空間](/lang/cpp11/inline_namespaces.md) | ネストした名前空間に、透過的にアクセスする | 4.4 | 2.9 | 14.0 | 2015 |
| N2249: [`char16_t`と`char32_t`](/lang/cpp11/char16_32.md) | UTF-16とUTF-32の文字型 | 4.4 | 2.9 | 12.1 (Windows: partial) <br/> 12.1 (GNU/Linux, macOS)<br/> 14.0 | 2015<br/> 2010より組み込み型ではなく型の別名として存在する |
| N2442: [UTF-8文字列リテラル](/lang/cpp11/utf8_string_literals.md) | `char`の文字列をUTF-8エンコーディングするプレフィックス | 4.5 | 3.0 | 12.1 (Windows: partial) <br/> 12.1 (GNU/Linux, macOS)<br/> 14.0 | 2015 |
| N2442: [生文字列リテラル](/lang/cpp11/raw_string_literals.md) | 文字列リテラルにRプレフィックスを付けることで、エスケープシーケンスを無視する | 4.5 | 3.0 | 14.0 | 2013 |
| N2765: [ユーザー定義リテラル](/lang/cpp11/user_defined_literals.md) | リテラルのサフィックスをユーザー定義する | 4.7 | 3.1 | 15.0 | 2015 |
| N2541: [戻り値の型を後置する関数宣言構文](/lang/cpp11/trailing_return_types.md) | 以下のような形式での関数宣言<br/> `auto f(arg_types...) -> return_type` | 4.4 | 2.9 | 12.0 | 2010 |
| N2431: [`nullptr`](/lang/cpp11/nullptr.md) | ヌルポインタを表すポインタリテラル | 4.6 | 3.0 | 11.1 | 2010 |
| N1757: [テンプレートの右山カッコ](/lang/cpp11/right_angle_brackets.md) | `vector<basic_string<char>>`のように、`>>`をスペースを空けずに記述可能にする | 4.3 | 2.9 | 11.1 | 2005 |
| N2118: [右辺値参照・ムーブセマンティクス](/lang/cpp11/rvalue_ref_and_move_semantics.md) | 右辺値によるオーバーロード、およびそれによるリソースの所有権移動 | 4.3 (partial)<br/> 4.6 | 2.9 | 12.0 | 2010 (partial) ムーブコンストラクタと代入演算子の暗黙定義に対応していない。<br/> 2015 |
| N1720: [コンパイル時アサート](/lang/cpp11/static_assert.md) | コンパイル時に条件式が真であることを表明する | 4.3 | 2.9 | 11.1 | 2010 |
| N2347: [`enum`の先行宣言](/lang/cpp11/scoped_enum.md#extended-unscoped-enum) |  | 4.6 | 3.1 | 11.1 (partial)<br/> 14.0 | 2012 |
| N2347: [スコープを持つ列挙型](/lang/cpp11/scoped_enum.md) | 強い型付けとスコープを持つ列挙型 | 4.4 | 2.9 | 11.1 (partial)<br/> 14.0 | 2012 |
| N2258: [エイリアステンプレート](/lang/cpp11/alias_templates.md) | テンプレートによって型の別名を定義する | 4.7 | 3.0 | 12.1 | 2013 |
| N2544: [共用体の制限解除](/lang/cpp11/unrestricted_unions.md) | 共用体のメンバ変数として、クラスオブジェクトを持つ | 4.6 | 3.1 | 14.0(Linux系OSおよびMacのみ。Windowsは非対応) | 2015 |
| N2242: [可変引数テンプレート](/lang/cpp11/variadic_templates.md) | 任意の数のテンプレートパラメータを受け取れるようにする | 4.3 (partial)<br/> 4.4 | 2.9 | 12.1 | 2013 |
| N2930: [範囲for文](/lang/cpp11/range_based_for.md) | 配列やコンテナといった範囲を表すオブジェクトを、簡潔に走査する | 4.6 | 3.0 | 13.0 | 2012 |
| N2928: [`override`と`final`](/lang/cpp11/override_final.md) | メンバ関数のオーバーライド指定、および派生クラスでのオーバーロードを禁止する指定 | 4.7 | 2.9 | 14.0 | 2005 (partial): `override`のみ。`final`の代わりにsealedが存在する。ただし両者ともデストラクタには指定できない。<br/> 2012 |
| N2761: [属性構文](/lang/cpp11/attributes.md) | `[[attr]]`構文による、クラス、関数、変数の属性指定 | 4.8 | 3.3 | 12.1 | 2015 |
| N2439: [メンバ関数の左辺値／右辺値修飾](/lang/cpp11/ref_qualifier_for_this.md) | オブジェクトが左辺値／右辺値の場合のみ呼び出し可能であることの指定 | 4.8.1 | 2.9 | 14.0 | 2015 |
| N2756: [非静的メンバ変数の初期化](/lang/cpp11/non_static_data_member_initializers.md) | メンバ変数を、宣言と同時に初期値指定する | 4.7 | 3.0 | 14.0 | 2013 |
| N2672: [初期化子リスト](/lang/cpp11/initializer_lists.md) | 波括弧による初期化をユーザー定義する。`vector<int> v = {1, 2, 3};`など。 | 4.4 | 3.1 | 14.0 | 2013 |
| N2672: [一様初期化](/lang/cpp11/uniform_initialization.md) | コンストラクタ呼び出しを波カッコで行う。 `T x { a, b, c };` | 4.4 | 3.1 | 13.0(partial)<br/> 14.0 | 2013 |
| N3050: [`noexcept`](/lang/cpp11/noexcept.md) | 関数の例外指定、例外を投げる可能性のある式かbool値を返す演算子 | 4.6 | 3.0 | 13.0(partial)<br/>14.0 | 2015 |
| N2634: [任意の式によるSFINAE](/lang/cpp11/sfinae_expressions.md) | 特定の式が有効かどうかで、その関数をオーバーロード解決に含めるかどうかを決定する | 4.4 | 2.9 | 12.0 | 2015 Update 1 (partial)<br/> 2017 Update 7 |
| N2659: [スレッドローカルストレージ](/lang/cpp11/thread_local_storage.md) | スレッドごとに異なる静的記憶域に保持される変数 | 4.8 | 3.3 | 11.1 (partial) | 2010<br/> `__declspec(thread)`属性での部分サポート<br/> 2015 |
| N2660: [ブロックスコープを持つ`static`変数初期化のスレッドセーフ化](/lang/cpp11/static_initialization_thread_safely.md) | 関数ローカルで定義した`static`変数の初期化を、スレッドセーフにする | 4.3 | 2.9 | 11.0 (Lnux/macOS)<br/> 14.0 | 2015 |


各処理系のC++11実装状況ページ：

- 全体的な対応状況： [C++0xCompilerSupport](http://web.archive.org/web/20160327011707/https://wiki.apache.org/stdcxx/C++0xCompilerSupport)
- GCC： [C++11 Support in GCC](https://gcc.gnu.org/projects/cxx-status.html#cxx11)
- libstdc++ : [C++ 2011](https://gcc.gnu.org/onlinedocs/libstdc++/manual/status.html#status.iso.2011)
- Clang： [C++98 and C++11 Support in Clang](http://clang.llvm.org/cxx_status.html)
    - [C++ Defect Report Support in Clang](http://clang.llvm.org/cxx_dr_status.html)
- ICC : [C++11 Features Supported by Intel&#174; C++ Compiler](https://software.intel.com/en-us/articles/c0x-features-supported-by-intel-c-compiler)
- Visual C++ (MSVC):
    - [Visual C++ 言語への準拠](https://docs.microsoft.com/ja-jp/cpp/visual-cpp-language-conformance)
    - [Announcing: MSVC Conforms to the C++ Standard](https://blogs.msdn.microsoft.com/vcblog/2018/05/07/announcing-msvc-conforms-to-the-c-standard/)


## <a id="cpp14" href="#cpp14">C++14言語機能の実装状況</a>

| 言語機能                     | 説明 | [GCC][gcc] | [Clang][clang] | [ICC][icc] | [MSVC][msvc] |
|------------------------------|------|-----|-------|-----|------|
| N3472: [2進数リテラル](/lang/cpp14/binary_literals.md) | 2進数を表す`0b` or `0B`プレフィックスを付けた数値リテラルの記述を可能とする | 4.3(GNU)<br/> 4.9 | 2.9 | 11.0 | 2015 |
| N3638: [通常関数の戻り値型推論](/lang/cpp14/return_type_deduction_for_normal_functions.md) | 関数の戻り値型を`auto`にすることで、`return`文から戻り値の型を推論させる | 4.8(partial)<br/>4.9 | 3.3(partial)<br/> 3.4 | 15.0 | 2015 |
| N3648: [ラムダ式の初期化キャプチャ](/lang/cpp14/initialize_capture.md) | キャプチャに代入構文を導入し、一つの変数に複数のキャプチャ方法を指定可能にする | 4.9 | 3.4 | 15.0 | 2015 |
| N3649: [ジェネリックラムダ](/lang/cpp14/generic_lambdas.md) | ラムダ式のパラメータを`auto`にすることで、ジェネリックな関数呼び出し演算子を持つ関数オブジェクトを生成する | 4.9 | 3.4 | 16.0 | 2015 |
| N3651: [変数テンプレート](/lang/cpp14/variable_templates.md) | 変数定義時のテンプレート指定を可能にする。 | 5.1 | 3.4 | 16.0 | 2015 Update 2 |
| N3652: [`constexpr`の制限緩和](/lang/cpp14/relaxing_constraints_on_constexpr.md) | `if`文、`switch`文による条件分岐の許可。<br/>`for`文、`while`文、`do-while`文によるループの許可。<br/>`void`戻り値型の許可<br/>初期化を伴う変数宣言の許可。<br/>変数書き換えの許可。 | 5.1 | 3.3(partial) <br/> 3.4 | 16.0 | 2017 |
| N3653: [宣言時のメンバ初期化を持つ型の集成体初期化を許可](/lang/cpp14/brace_elision_in_array_temporary_initialization.md) | 一様初期化と初期化子リストを組み合わせた際、二重に波カッコが必要となっていた仕様を緩和し、波カッコを省略できるようにする | 5.1 | 3.3 | 16.0 | 2017 |
| N3760: [`[[deprecated]]`属性](/lang/cpp14/deprecated_attr.md) | 非推奨の機能であることを示す属性。 | 4.9 | 3.4 | 15.0<br/> (Linux/Mac OS) | 2015<br/>それ以前は`__declspec(deprecated)`で代替可能 |
| N3781: [数値リテラルの桁区切り文字](/lang/cpp14/digit_separators.md) | シングルクォーテーションで数値リテラルを桁区切りする。 | 4.9 | 3.4 | 16.0 | 2015 |
| N3778: [サイズ付きデアロケーション](/lang/cpp14/sized_deallocation.md) | サイズをとる`delete`演算子のオーバーロードを許可する。 | 5.1 | 3.4 | 16.0 | 2015 |


各処理系のC++14実装状況ページ：

- GCC: [C++14 Support in GCC](https://gcc.gnu.org/projects/cxx-status.html#cxx14)
- libstdc++: [C++ 2014](https://gcc.gnu.org/onlinedocs/libstdc++/manual/status.html#status.iso.2014)
- Clang: [C++98, C++11, and C++14 Support in Clang](http://clang.llvm.org/cxx_status.html)
- libc++: [libc++ C++14 Status](https://libcxx.llvm.org/Status/Cxx14.html)
- Visual C++ (MSVC):
    - [Visual C++ 言語への準拠](https://docs.microsoft.com/ja-jp/cpp/visual-cpp-language-conformance)
    - [Announcing: MSVC Conforms to the C++ Standard](https://blogs.msdn.microsoft.com/vcblog/2018/05/07/announcing-msvc-conforms-to-the-c-standard/)
- ICC: [C++14 Features Supported by Intel C++ Compiler](https://software.intel.com/en-us/articles/c14-features-supported-by-intel-c-compiler)
    - [Intel (R) Parallel Studio XE 2016 Beta program has begun](https://software.intel.com/en-us/forums/topic/549502)


## <a id="cpp17" href="#cpp17">C++17言語機能の実装状況</a>

| 言語機能 | 説明 | [GCC][gcc] | [Clang][clang] | [ICC][icc] | [MSVC][msvc] |
|----------|------|-----|-------|-----|------|
| N3928: [メッセージなしの`static_assert`](/lang/cpp17/extending_static_assert.md) | デフォルトの表明メッセージを使用する | 6 | 3.5 | 18.0 | 2017 |
| N4086: [トライグラフを削除](/lang/cpp17/removing_trigraphs.md) | | 5.1 | 3.5 | 19.1 | 2010 |
| N4051: [テンプレートテンプレートパラメータに`typename`を許可](/lang/cpp17/allow_typename_in_a_template_template_parameter.md) | `class`キーワードしか使用できなかった部分に、`typename`を許可 | 5.0 | 3.5 | 17.0 | 2015 |
| N3922: [単一要素初期化子リストを`auto`で受け取った場合の型を変更](/lang/cpp17/new_rules_for_auto_deduction_from_braced-init-list.md) | `initializer_list<T>`だったのを`T`に変更 | 5 | 3.8 | 17.0 | 2015 |
| N4295: [畳み込み式](/lang/cpp17/folding_expressions.md) | パラメータパックに対する2項演算の集積処理 | 6 | 3.6 | 19.0 | 2017 Update 5 |
| N4267: [UTF-8文字リテラル](/lang/cpp17/utf8_character_literals.md) | 文字列リテラルだけでなく、文字リテラルにもUTF-8指定できるようにする | 6 | 3.6 | 17.0 | 2015 |
| N4230: [入れ子名前空間の定義](/lang/cpp17/nested_namespace.md) | `namespace A::B {}`のように、入れ子の名前空間を簡単に定義できるようにする | 6 | 3.6 | 17.0 | 2015 Update 3 |
| N4266: [名前空間と列挙子に属性の付加を許可](/lang/cpp17/attributes_for_namespaces_and_enumerators.md) | 名前空間の定義と、列挙型の各要素の定義に、属性を付けられるようにする | 名前空間は4.0<br/>列挙子は6 | 3.6 | 17.0 | 2015 |
| N4268: [全ての非型テンプレート引数の定数式評価を許可](/lang/cpp17/allow_constant_evaluation_for_all_non-type_template_arguments.md) | ポインタの定数式評価として、配列からポインタへの変換や、関数から関数ポインタへの変換などを許可 | 6 | 3.6 | 19.1 | 2017 Update 5 |
| P0001R1: [非推奨だった`register`キーワードを削除](/lang/cpp17/remove_deprecated_use_of_the_register_keyword.md) | | 7 | 3.8 | 18.0 | 2017 Update 3 |
| P0002R1: [非推奨だった`bool`型オブジェクトに対するインクリメントの仕様を削除](/lang/cpp17/remove_deprecated_increment_of_bool.md) | | 7 | 3.8 | 18.0 | 2017 Update 3 |
| P0012R1: [例外仕様を型システムの一部にする](/lang/cpp17/exception_spec_be_part_of_the_type_system.md) | | 7 | 4 | 18.0 | 2017 Update 5 |
| P0061R1: [プリプロセッサでの条件式`__has_include`](/lang/cpp17/has_include.md) | 対象のインクルードファイルが存在するかをプリプロセス時に判定する | 5.0 | 3.0 | 18.0 | 2017 Update 3 |
| P0136R1: [継承コンストラクタの新仕様][P0136R1] | デフォルト引数を引き継ぐようにした | 7 | 3.9 | No | 2017 Update 7 |
| P0188R1: [`[[fallthrough]]`属性](/lang/cpp17/fallthrough.md) | `case`節で`break`や`return`を書かなかった場合に、それが意図したフォールスルーであることをコンパイラに伝える属性 | 7 | 3.9 | 18.0 | 2017 |
| P0189R1: [`[[nodiscard]]`属性](/lang/cpp17/nodiscard.md) | 関数の戻り値を無視してはならないことをユーザーに伝える属性 | 4.8からは`[[gnu::warn_unused_result]]`を使用すること<br/> 7からサポート | 3.9 | 18.0 | 2017 Update 3 |
| P0212R1: [`[[maybe_unused]]`属性](/lang/cpp17/maybe_unused.md) | 使用しない可能性がある変数であることをコンパイラに伝える属性 | 4.8からは`[[gnu::unused]]`を使用すること<br/> 7からサポート | 3.9 | 18.0 | 2017 Update 3 |
| P0017R1: [基底クラスのメンバ変数を集成体初期化するための波カッコを省略できるようにする][P0017R1] | 基底クラスのメンバを集成体初期化するために、`derived d {{42}};`の代わりに`derived d {42};`と書けるようにする | 7 | 3.9 | 19.1 | 2017 Update 7 |
| P0170R1: [ラムダ式を`constexpr`として使用できるようにする](/lang/cpp17/constexpr_lambda.md) | ラムダ式の関数オブジェクトが定数式の文脈で使用された場合に、それがコンパイル時に評価されるようにする | 7 | 5 | 19.0 | 2017 Update 3 |
| P0184R0: [範囲for文のための`begin()`と`end()`関数が、異なる型を返すことを許可](/lang/cpp17/generalizing_the_range-based_for_loop.md) | `begin()`と`end()`が異なるイテレータ型を返せるようにすることで、終端イテレータを定義しやすくする | 6 | 3.9 | 18.0 | 2017 |
| P0018R3: [ラムダ式での`*this`のコピーキャプチャ](/lang/cpp17/lambda_capture_of_this_by_value.md) | キャプチャリストに`*this`を指定することで、`*this`をコピーキャプチャする | 7 | 3.9 | 19.0 | 2017 Update 3 |
| P0138R2: [`enum class`変数の初期値として整数を指定する際の規則を調整](/lang/cpp17/construction_enum_class_values.md) | キャストを使用することなく整数を初期値として使用し、`E e{0};`のような初期化を許可 | 7 | 3.9 | 19.0 | 2017 Update 3 |
| P0245R1: [浮動小数点数の16進数リテラル](/lang/cpp17/hexadecimal_floating_literals.md) | `hexfloat`マニピュレータや`printf()`の16進数出力に合わせて、浮動小数点数のリテラルも16進数表記できるようにする | 3.0 | 3.0 | 18.0 | 2017 Update 5 |
| P0028R4: [属性の名前空間指定に繰り返しをなくす](/lang/cpp17/using_attribute_namespaces.md) | `[[using CC: opt(1), debug]]`のように属性の名前空間宣言をまとめて行う | 7 | 3.9 | 18.0 | 2017 Update 3 |
| P0035R4: [アライメント指定されたデータの動的メモリ確保](/lang/cpp17/dynamic_memory_allocation_for_over-aligned_data.md) | `operator new`と`operator delete`でアライメント値を取得できるようにする | 7 | 4 | No | 2017 Update 5 |
| P0091R3: [クラステンプレートのテンプレート引数推論](/lang/cpp17/type_deduction_for_class_templates.md) | コンストラクタの引数からクラスのテンプレート引数を推論できるようにする | 7 | 5 | 19.1 | 2017 Update 7 |
| P0127R2: [非型テンプレート引数の`auto`宣言](/lang/cpp17/declaring_non-type_template_arguments_with_auto.md) | `template <typename T, T x>`という冗長なコードを`template <auto x>`のようにして受けられるようにし、<br/> `X<3>; X<true>; X<'a'>`のように定数を簡潔に渡せるようにする | 7 | 4 | 19.1 | 2017 Update 7 |
| P0135R1: [値のコピー省略を保証](/lang/cpp17/guaranteed_copy_elision.md) | 一時オブジェクトをコピーする際に、単純な値を持つクラスであればコピーが省略されることを保証する | 7 | 4 | 19.1 | 2017 Update 6 |
| P0145R3: [厳密な式の評価順](/lang/cpp17/expression_evaluation_order.md) | 式の項が評価される順序を厳密に規定する。<br/> `b = a;`の式が右から順番(a, bの順)に評価される | 7 | 4 | 19.1 | 2017 Update 7 |
| P0283R2: [不明な属性を無視する](/lang/cpp17/non_standard_attributes.md) | 実装が知らない名前空間の属性は無視する | 4.8 | 3.0 | 18.0 | 2015 |
| P0292R2: [constexpr if文](/lang/cpp17/if_constexpr.md) | `if constexpr(cond)`とすることで、そのif文はコンパイル時に処理される | 7 | 3.9 | 19.0 | 2017 Update 3 |
| P0296R2: [処理の進行保証][P0296R2] | 並行処理に関して「処理の進行」を明確に定義<br/> (TODO:言葉の定義だけなので実装状況ページからは取り除く) | No | No | No | No |
| P0386R2: [インライン変数](/lang/cpp17/inline_variables.md) | インライン指定を関数だけでなく変数にも指定できるようにする | 7 | 3.9 | 19.0 | 2017 Update 5 |
| P0391R0: [templated entityという用語を導入][P0391R0] | (TODO:言葉の定義だけなので実装状況ページからは取り除く) | - | - | - | - |
| P0217R3: [構造化束縛](/lang/cpp17/structured_bindings.md) | タプルやユーザー定義型を分解して受け取れるようにする<br/> `tuple<int, string> f();` <br/> `const auto [a, b] = f(); // aはintの値、bはstringの値` | 7 | 4 | 18.0 | 2017 Update 3 |
| P0305R1: [if文とswitch文の条件式と初期化を分離](/lang/cpp17/selection_statements_with_initializer.md) | `if (init; condition)`のように初期化と条件式を分けて記述できるようにする | 7 | 3.9 | 18.0 | 2017 Update 3 |
| P0137R1: [参照メンバをもつクラスの置き換え](/lang/cpp17/replacement_of_class_objects_containing_reference_members.md) | 参照型メンバや`const`メンバ変数を含むクラスについてこれまで結果は未定義とされていた配置`new`によるオブジェクトの置き換えを条件付きで可能とする | 7 | 6.0 | No | 2017 Update 7 |
| P0003R5: [非推奨だった例外仕様を削除](/lang/cpp17/remove_deprecated_exception_specifications.md) | `noexcept`が入ったことによって非推奨になった`throw`キーワードによる例外仕様を削除 | 7 | 4 | No | 2017 Update 5 |
| P0195R2: [using宣言でのパック展開](/lang/cpp17/pack_expansions_in_using.md) | パラメータパックの型を基底クラスとして指定した場合に、`using`宣言に基底クラスのパラメータパックを指定できるようにする | 7 | 4 | No | 2017 Update 7 |
| P0512R0: [クラステンプレート引数の推論仕様を調整][P0512R0] | | 8 | 5.0 | No | 2017 Update 7 |
| P0490R0: [Committee Draftに対するNational Body Commentへの対応][P0490R0] | | - | - | - | - |
| P0522R0: [テンプレートテンプレート引数のマッチングにおいて、互換性のあるテンプレートを除外][P0522R0] | | 7 | 4 (partial) | 19.1 | 2017 Update 5 |


[P0136R1]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0136r1.html
[P0017R1]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0017r1.html
[P0296R2]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0296r2.html
[P0391R0]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0391r0.html
[P0512R0]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0512r0.pdf
[P0490R0]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0490r0.html
[P0522R0]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0522r0.html


各処理系のC++17実装状況ページ：

- GCC: [C++17 Support in GCC](https://gcc.gnu.org/projects/cxx-status.html#cxx17)
- Clang: [C++ Support in Clang](http://clang.llvm.org/cxx_status.html)
- libc++ : [libc++ C++17 Status](https://libcxx.llvm.org/Status/Cxx17.html)
- Visual C++ (MSVC):
    - [Visual C++ 言語への準拠](https://docs.microsoft.com/ja-jp/cpp/visual-cpp-language-conformance)
    - [Announcing: MSVC Conforms to the C++ Standard](https://blogs.msdn.microsoft.com/vcblog/2018/05/07/announcing-msvc-conforms-to-the-c-standard/)
- ICC: [C++17 Features Supported by Intel C++ Compiler](https://software.intel.com/en-us/articles/c17-features-supported-by-intel-c-compiler)


## <a id="cpp20" href="#cpp20">C++20言語機能の実装状況</a>

| 言語機能 | 説明 | [GCC][gcc] | [Clang][clang] | [ICC][icc] | [MSVC][msvc] |
|----------|------|-----|-------|-----|------|
| P0683R1: [ビットフィールドのメンバ変数初期化](/lang/cpp20/default_member_initializers_for_bit_fields.md) | ビットフィールドメンバ変数のデフォルト値を設定する構文を追加する | 8 | 6.0 | 2021.4 | 2019 Update 5 |
| P0409R2: [ラムダ式のキャプチャとして`[=, this]`を許可する](/lang/cpp20/allow_lambda_capture_equal_this.md) | デフォルトコピーキャプチャと`this`ポインタのコピーキャプチャを両方指定できるようにする | 8 | 6.0 | 2021.4 | 2019 Update 2 |
| P0806R2: [`[=]`による`this`の暗黙のキャプチャを非推奨化](/lang/cpp20/deprecate_implicit_capture_of_this_via_defcopy.md) | コピーのデフォルトキャプチャでは、`this`ポインタをキャプチャされなくする | 9 | | | 2019 Update 2 |
| P0428R2: [ジェネリックラムダのテンプレート構文](/lang/cpp20/familiar_template_syntax_for_generic_lambdas.md) | ジェネリックラムダでテンプレートパラメータを定義できるようにする | 8 | 9.0 | 2021.4 | 2019 Update 2 |
| P0704R1: [`const`修飾されたメンバポインタの制限を修正](/lang/cpp20/fixing_const_qualified_pointers_to_members.md) | `.*`演算子での左辺値の`const`メンバ関数呼び出しを許可する | 8 | 6.0 | 2021.4 | 2015 |
| P0306R4: [可変引数が空でない場合のトークン置換](/lang/cpp20/va_opt.md) | プリプロセッサの置換で可変引数が空の場合に余計なカンマが付いてしまう問題に対処 | 8 (partial, `#__VA_OPT__`による文字列化が未サポート) | 6.0<br/> 9.0 ([p1042](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1042r1.html)) | 2021.4 | 2019 Update 5 |
| P0329R4: [指示付き初期化](/lang/cpp20/designated_initialization.md) | | 8 | 6.0 (partial) | 2021.4 | 2019 Update 1 |
| P0734R0: [コンセプト](/lang/cpp20/concepts.md) | テンプレートパラメータに対する制約を行う | 10 | 10.0 (partial) | 2021.6 | 2019 Update 3 |
| P0614R1: [初期化式をともなう範囲for文](/lang/cpp20/range-based_for_statements_with_initializer.md) | 範囲for文スコープで使用する変数の初期化のための構文を追加 | 9 | 8.0 | 2021.7 | 2019 Update 5 |
| P0588R1: [暗黙のラムダキャプチャを簡略化](/lang/cpp20/simplifying_implicit_lambda_capture.md) | ラムダ式のキャプチャに関する仕様整理 | 8 | No | 2021.4 | 2019 Update 4 |
| P0846R0: [関数テンプレートに明示的に型指定した場合にADLで見つからない問題を修正](/lang/cpp20/adl_and_function_templates_that_are_not_visible.md) | 名前空間内の関数テンプレートをテンプレート引数指定かつ非修飾・ADLで正しく呼び出せるよう修正 | 9 | 9.0 | 2021.4 | 2019 Update 1 |
| P0641R2: [デフォルトのコピーコンストラクタと非`const`なコンストラクタが衝突する問題を修正](/lang/cpp20/resolving_const_mismatch_with_defaulted_copy_constructor.md) | 非`const`なオブジェクトをとるコンストラクタを定義すると、そのクラスをラップしたクラスのコピーコンストラクタが不適格になってしまう問題を修正 | 9 | 8.0 | 2021.4 | 2015 |
| P0859R0: [評価されない文脈での定数式評価によって特殊メンバ関数がインスタンス化されることを規定](/lang/cpp20/less_eager_instantiation_of_constexpr_functions.md) | `sizeof`や`decltype`などの評価されない文脈において定数式評価を行った場合に、ムーブコンストラクタのような特殊メンバ関数が定義されることを規定 | 9 | 8 | | Partial in 2019 Update 7 |
| P0515R3: [一貫比較](/lang/cpp20/consistent_comparison.md) | 三方比較演算子によって比較演算子の自動生成を行うようにする | 10 | 8.0 (partial) | 2021.4 | 2019 |
| P0692R1: [特殊化のアクセスチェック](/lang/cpp20/access_checking_on_specializations.md) | | Yes | partial | 2021.4 | 2019 Update 6 |
| P0624R2: [状態を持たないラムダ式を、デフォルト構築可能、代入可能とする](/lang/cpp20/default_constructible_and_assignable_stateless_lambdas.md) | キャプチャしていないラムダ式をデフォルト構築・代入可能にする | 9 | 8.0 | 2021.4 | 2019 Update 2 |
| P0767R1: [PODを非推奨化](/lang/cpp20/deprecate_pod.md) | PODという用語を非推奨化する | | | 2021.4 | 2019 Update 5 |
| P0315R4: [評価されない文脈でのラムダ式](/lang/cpp20/wording_for_lambdas_in_unevaluated_contexts.md) | 評価されない文脈でもラムダ式を書くことができるようにする | 9 | Partial | | 2019 Update 8 |
| P0840R2: [空オブジェクトを言語サポート](/lang/cpp20/language_support_for_empty_objects.md) | `[[no_unique_address]]`属性を導入し、空の型のオブジェクトをほかのオブジェクトと共有する最適化を許可する | 9 | 9.0 | 2021.4 | 2019 Update 9 <sup><a href="#note-t1-1" id="note_ref-t1-1">†1</a></sup> |
| P0962R1: [範囲for文がカスタマイゼーションポイントを見つけるルールを緩和](/lang/cpp20/relaxing_the_range_for_loop_customization_point_finding_rules.md) | `begin()`/`end()`メンバ関数のどちらかが見つからなかった場合に非メンバ関数の`begin()`/`end()`を探しにいく | 8 | 8 | 2021.4 | 2019 Update 5 |
| P0969R0: [friend指定された関数内から構造化束縛を使用して非公開メンバ変数にアクセスすることを許可](/lang/cpp20/allow_structured_bindings_to_accessible_members.md) | 構造化束縛の仕様として公開メンバ変数のみを取り出せるようになっていたが、friend指定された関数からは非公開メンバ変数にもアクセスできるようにする | 8 | 8.0 | 2021.4 | 2019 |
| P0961R1: [構造化束縛がカスタマイゼーションポイントを見つけるルールを緩和](/lang/cpp20/relaxing_the_structured_bindings_customization_point_finding_rules.md) | 非テンプレートの`get()`メンバ関数が見つかった場合は、非メンバ関数の`get()`を探しにいく | 8 | 8.0 | 2021.4 | 2019 |
| P0634R3: [型の文脈で`typename`の省略を許可](/lang/cpp20/down_with_typename.md) | 型しか現れない文脈では、依存名を解決するための`typename`キーワードを省略できるようにする | 9 | 16 | 2023.1 | 2019 Update 9 |
| P0780R2: [ラムダ式の初期化キャプチャでのパック展開を許可](/lang/cpp20/allow_pack_expansion_in_lambda_init_capture.md) | `[...args = std::move(args)]`のようなキャプチャを許可 | 9<br/>10 | 9.0 | 2021.7 | 2019 Update 2 |
| P0479R5: [確率が高い分岐と低い分岐を伝える属性 `[[likely]]`, `[[unlikely]]`](/lang/cpp20/likely_and_unlikely_attributes.md) | 条件分岐の最適化ヒントを与える属性 | 9 (partial, `switch` 文のみ可能)<br/> 10 | 12.0 | 2021.7 | 2019 Update 6 |
| P0929R2: [抽象型のチェック](/lang/cpp20/checking_for_abstract_class_types.md) | 関数の宣言段階では、パラメータおよび戻り値型が抽象型かどうかをチェックしないようにする | 11 | | | 2019 Update 5 |
| P0732R2: [非型テンプレートパラメータとしてクラス型を許可する](/lang/cpp20/class_types_in_non-type_template_parameters.md) | 定数式として使用できる型を広く非型テンプレートパラメータとして使用できるようにする | 9 | partial | 2022.2 Partial | 2019 Update 6 |
| P0722R3: [可変長データを扱うクラスの効率的な`delete`](/lang/cpp20/efficient_sized_delete_for_variable_sized_classes.md) | クラスの`delete`演算子が呼び出される前にデストラクタが呼ばれないようにするオプションを追加 | 9 | 6.0 | 2023.0 | 2019 Update 7 |
| P1064R0: [定数式からの仮想関数の呼び出しを許可](/lang/cpp20/allow_virtual_function_calls_in_constant_expressions.md) | 仮想関数に`constexpr`を付けられない制限を解除 | 9 | 9.0 | 2021.4 | 2019 Update 9 |
| P1327R1: [定数式での`dynamic_cast`、多態的な`typeid`を許可](/lang/cpp20/allowing_dynamic_cast_polymorphic_typeid_in_constant_expressions.md) | 定数式での動的多態を許可 | 10 | 9.0 | 2021.4 | 2019 Update 9 |
| P1002R1: [constexpr関数内でのtry-catchブロックを許可](/lang/cpp20/try-catch_blocks_in_constexpr_functions.md) | constexpr関数内でtry-catchブロックを書けるようにする | 9 | 8.0 | 2023.1  | 2019 Update 5 |
| P1073R3: [即時関数](/lang/cpp20/immediate_functions.md) | `consteval`キーワードを追加し、常に定数式評価されるよう指定できるようにする | 11 | 15 | 2021.4 | 2019 Update 10 |
| P1330R0: [定数式内での共用体のアクティブメンバの変更を許可](/lang/cpp20/changing_the_active_member_of_a_union_inside_constexpr.md) | 共用体メンバの書き換えを定数式内で行えるようにする | 9 | 9.0 | 2021.4 | 2017 |
| P1008R1: [ユーザー宣言したコンストラクタを持つクラスの集成体初期化を禁止](/lang/cpp20/prohibit_aggregates_with_user-declared_constructors.md) | コンストラクタが`delete`／`default`宣言されているクラスを、集成体初期化によってコンストラクタ呼び出しを回避して構築できてしまっていた技法を禁止 | 9 | 8.0 | 2021.4 | 2019 |
| P0892R2: [関数を条件付きで`explicit`にする構文を追加](/lang/cpp20/explicit_bool.md) | `explicit(true)`のように`explicit`に真理値パラメータを指定できるようにする | 9 | 9.0 | 2021.4 | 2019 Update 2 |
| P1236R1: [符号付き整数型が2の補数表現であることを規定](/lang/cpp20/signed_integers_are_twos_complement.md) | 符号付き整数型のビット表現を2の補数に規定する | 9 | 9.0 | 2023.0 | |
| P0482R6: [UTF-8エンコーディングされた文字の型として`char8_t`を追加](/lang/cpp20/char8_t.md) | UTF-8エンコードされた文字かどうかでオーバーロード・特殊化をできるようにする | 9 | 7 (`-fchar8_t`オプションが必要) | 2021.4 | 2019 Update 2 |
| P1094R2: [入れ子名前空間定義でのインライン名前空間](/lang/cpp20/nested_inline_mamespaces.md) | `namespace ns1::inline ns2::ns3 {}`のように、入れ子名前空間を定義する式にインライン名前空間の指定を含められるようにする | 9 | 8.0 | 2021.4 | 2019 Update 7 |
| P1091R3: [構造化束縛を拡張して通常の変数宣言のように使用できるようにする](/lang/cpp20/extending_structured_bindings_to_be_more_like_variable_declarations.md) | 記憶域指定子として`static`と`thread_local`の指定を許可 | 10 | 8.0 (partial) | 2021.4 | 2019 Update 4 |
| P1381R1: [構造化束縛した変数の参照キャプチャを許可](/lang/cpp20/reference_capture_of_structured_bindings.md) | 構造化束縛をした変数は特殊な扱いのためラムダ式で参照キャプチャできない規定となっていたがこれを許可する | 8 | 8.0 (partial) | 2021.4 | 2017 Update 3 |
| P0960R3: [丸カッコの値リストからの集成体初期化を許可](/lang/cpp20/allow_initializing_aggregates_from_a_parenthesized_list_of_values.md) | `T x{1, 2, 3};`と同様に`T x(1, 2, 3);`でも集成体初期化できるようにする | 10 | No | 2021.4 | 2019 Update 8 |
| P1009R2: [`new`式での配列要素数の推論](/lang/cpp20/array_size_deduction_in_new-expressions.md) | `double* p = new double[]{1,2,3};`を許可 | 11 | 9 | 2021.4 | 2019 Update 7 |
| P1041R4: [`char16_t`と`char32_t`の文字・文字列リテラルを、文字コードUTF-16/32に規定](/lang/cpp20/make_char16t_char32t_string_literals_be_utf16_32.md) | `__STDC_UTF_16__`、`__STDC_UTF_32__`の定義に関係なく、`char16_t`、`char32_t`のリテラルをUTF-16/32文字コードに規定する | 10 | Yes | 2023.0 | 2015 |
| P1103R3: [モジュール](/lang/cpp20/modules.md) | ヘッダファイル・ソースファイル、インクルードに変わる仕組みとしてモジュールを導入する | 11 (`-fmodules-ts`が必要) | 15<br/>8.0 partial (`-fmodules`, `-fmodules-ts`が必要) | 2023.1 (Partial) | 2019 Update 8 |
| P0912R5: [コルーチン](/lang/cpp20/coroutines.md) | 関数実行を中断・再開する仕組みとしてコルーチンを導入する | 10 (`-fcoroutines`が必要) | 8.0 (partial) | 2021.4| 2019 Update 8 |
| P1161R3: [添字演算子内でのカンマ演算子の使用を非推奨化](/lang/cpp20/deprecate_uses_of_the_comma_operator_in_subscripting_expressions.md) | `ar[i, j]`を非推奨化。`ar[(i, j)]`はOK | 10 | 9.0 | 2021.6 | 2019 Update 5 |
| P1331R2: [constexpr関数内でのトリビアルなデフォルト初期化を許可](/lang/cpp20/permitting_trivial_default_initialization_in_constexpr_contexts.md) | constexpr関数内でのデフォルト初期化を許可し、未初期化値を読むことのみ禁止する | 10 | 10.0 | 2022.3 | 2019 Update 7 |
| P0848R3: [条件付きで特殊メンバ関数をトリビアルに定義するように](/lang/cpp20/conditionally_trivial_special_member_functions.md.nolink) | 制約によってトリビアルな特殊メンバ関数と非トリビアルな特殊メンバ関数をオーバーロードできるようにする | 10 | 16 Partial (consepts 未実装部あり) | 2022.3 | 2019 Update 8 |
| P1301R4: [`[[nodiscard]]`属性に理由となる文字列を付加できるようにする](/lang/cpp20/nodiscard_should_have_a_reason.md) | 関数の戻り値を無視してはならない理由を関数宣言に持たせ、警告メッセージに役立てる | 10 | 9.0 | 2021.6 | 2019 Update 5 |
| P1099R5: [スコープ付き列挙型のusing宣言](/lang/cpp20/using_enum.md) | `using enum EnumType;`もしくは`using EnumType::enumerator`とすることで、列挙値のスコープ指定を省略できるようにする | 11 | 13 | 2023.0 | 2019 Update 4 |
| P1816R0: [集成体クラステンプレートのテンプレート引数推論](/lang/cpp20/class_template_argument_deduction_for_aggregates.md) | クラステンプレートのテンプレート引数推論はコンストラクタ引数から推論されるが、集成体初期化からも推論できるようにする | 10 | No | | 2019 Update 7 |
| P1668R1: [constexpr関数内で未評価のインラインアセンブリを許可することによる組み込み関数のconstexpr有効化](/lang/cpp20/enabling_constexpr_intrinsics_by_permitting_unevaluated_inline-assembly_in_constexpr_functions.md) | コンパイル時に評価されない場合にconstexpr関数にasm定義を含めることを許可 | 10 | 10.0 | 2022.3 | 2019 Update 9 |
| P0388R4: [要素数不明の配列への変換を許可](/lang/cpp20/permit_conversions_to_arrays_of_unknown_bound.md) | 要素数が判明している配列から、要素数が不明の配列への変換を許可 | 10 | 14 | 2021.6 | 2019 Update 7 |
| P1143R2: [コンパイル時初期化を強制する`constinit`キーワードを追加](/lang/cpp20/constinit.md) | 初期化のみコンパイル時におわらせたい場合に使用する | 10 | 10.0 | 2022.3 | 2019 Update 10 |
| P1152R4: [ほとんどの`volatile`を非推奨化](/lang/cpp20/deprecating_volatile.md) | `volatile`の有用な機能のみを残し、効果が疑わしい、または壊れている機能を非推奨化する | 10 | 10.0 | 2021.6 | 2019 Update 7 |
| P1814R0: [エイリアステンプレート経由でのクラステンプレートのテンプレート引数推論](/lang/cpp20/class_template_argument_deduction_for_alias_templates.md) | エイリアステンプレートからクラステンプレートのテンプレート引数を推論できるようにする | 10 | No | | 2019 Update 7 |
| P0784R7: [可変サイズをもつコンテナの`constexpr`化](/lang/cpp20/more_constexpr_containers.md) | `constexpr`記憶域をもつメモリアロケータの存在を考慮することで、可変サイズをもつコンテナをコンパイル時に使用できるようにする | 10 | 10.0 | 2021.6 | 2019 Update 9 |
| P1957R2: [ポインタから`bool`への変換を縮小変換とする](/lang/cpp20/converting_from_pointer_to_bool_should_be_considered_narrowing.md) | ポインタから`bool`値への変換を縮小変換と規定することで、意図しない変換を防止する | 10 | 11.0 | | 2019 Update 7 |

- <a href="#note_ref-t1-1" id="note-t1-1">**^**</a> 不明な属性として無視されなくなっただけで期待する効果は得られない。完全に実装されるまでは、代わりに[`[[msvc::no_unique_address]]`](https://devblogs.microsoft.com/cppblog/msvc-cpp20-and-the-std-cpp20-switch/#msvc-extensions-and-abi)を使用できる。

各処理系のC++20実装状況ページ：

- GCC: [C++20 Support in GCC](https://gcc.gnu.org/projects/cxx-status.html#cxx20)
- Clang: [C++ Support in Clang](http://clang.llvm.org/cxx_status.html)
- libstdc++: [C++ 2020 Implementation Status](https://gcc.gnu.org/onlinedocs/libstdc++/manual/status.html#status.iso.2020)
- libc++: [libc++ C++20 Status](https://libcxx.llvm.org/Status/Cxx20.html)
- Visual C++ (MSVC):
    - [Visual C++ 言語への準拠](https://docs.microsoft.com/ja-jp/cpp/visual-cpp-language-conformance)
    - [次リリース情報(VS2019,2022) - Change log](https://github.com/microsoft/STL/wiki/Changelog)
- ICC: [C++20 Features Supported by Intel® C++ Compiler](https://www.intel.com/content/www/us/en/developer/articles/technical/c20-features-supported-by-intel-cpp-compiler.html)

## <a id="cpp23" href="#cpp23">C++23言語機能の実装状況</a>

| 言語機能 | 説明 | [GCC][gcc] | [Clang][clang] | [ICX][icx] | [MSVC][msvc] |
|----------|------|------------|----------------|------------|--------------|
| P0330R8: [(符号付き)`size_t`リテラルのためのサフィックス](/lang/cpp23/literal_suffix_for_signed_size_t.md) | `42z`/`42Z`とすることで`size_t`に対応する符号付き整数型のリテラルとする | 11 | 13 | 2022.2 | - |
| P2290R3: [エスケープシーケンスの区切り](/lang/cpp23/delimited_escape_sequences.md) | エスケープシーケンスの範囲を明確にする構文を追加する | 13 | 15 | 2023.2 | - |
| P2266R3: [暗黙的なムーブを簡略化](/lang/cpp23/simpler_implicit_move.md) | 参照を返す関数の`return`文で暗黙的にムーブされない問題を修正 | 13 | 13 | 2022.2 | - |
| P1787R6: [スコープと名前ルックアップの仕様整理](/lang/cpp23/declarations_and_where_to_find_them.md.nolink) | 複雑で不完全になっているスコープと名前ルックアップの仕様を整理し、一部の問題を解決する | - | - | - | - |
| P2615R1: [無意味なexport宣言を禁止する](/lang/cpp23/meaningful_exports.md) | いくつかの不必要な宣言に対するモジュールexportを禁止する | - | - | - | - |
| P2360R0: [初期化文での型の別名宣言を許可](/lang/cpp23/extend_init_statement_to_allow_alias_declaration.md) | `for (using T = int; T e : v) {}`を許可 | 12 | 14 | 2022.2 | - |
| P2718R0: [範囲for文が範囲初期化子内で生じた一時オブジェクトを延命することを規定](lang/cpp23/lifetime_extension_in_range_based_for_loop.md) | | - | - | - | - |
| P2324R2: [複合文の末尾へのラベルを許可](/lang/cpp23/labels_at_the_end_of_compound_statements.md) | C互換のため、複合文の末尾でのgoto文のラベルを許可する | 13 | 16 | 2023.2 | - |
| P0847R7: [自身のオブジェクトを明示的にパラメータとして指定する](/lang/cpp23/deducing_this.md.nolink) | メンバ関数が`*this`の型・オブジェクトをパラメータとしてとり、`*this`オブジェクトがconst/非const、左辺値/右辺値であるかをメンバ関数内で識別できるようにする | - | 18 | - | 2022 Update 2 (partial) |
| P1847R4: [アクセス制御の異なるメンバ変数のレイアウトを宣言順に規定](/lang/cpp23/make_declaration_order_layout_mandated.md) | アクセス制御の異なるメンバ変数のレイアウトは並び替えを許可されていたが宣言順に規定する | Yes | Yes | - | 2022 |
| P2128R6: [添字演算子の多次元サポート](/lang/cpp23/multidimensional_subscript_operator.md) | `operator[](int x, int y, int z)`のように添字演算子のオーバーロードで複数のパラメータをとることを許可 | 12 | 15 | 2022.2 | - |
| P1169R4: [`this`ポインタをもつ必要のない演算子を`static`として宣言できるようにする](/lang/cpp23/static_operator.md) | 状態をもたないいくつかの演算子を`static`として宣言できるようにする | 13 | 16 | 2023.2 | - |
| P2201R1: [異なる文字エンコーディングをもつ文字列リテラルの連結を不適格とする](/lang/cpp23/mixed_string_literal_concatenation.md) | `auto a = u8"" L"";`のような異なる文字エンコーディング同士での文字列リテラルを連結を禁止する | Yes | Yes | 2022.2 | Yes |
| P2029R4: [文字・文字列リテラル中の数値・ユニバーサルキャラクタのエスケープに関する問題解決](/lang/cpp23/numeric_and_universal_character_escapes_in_character_and_string_literals.md.nolink) | | - | - | - | - |
| P2362R3: [1ワイド文字に収まらないワイド文字リテラルを禁止する](/lang/cpp23/remove_non_encodable_wide_character_literals_and_multicharacter_wide_character_literals.md) | エンコード結果として`wchar_t`の大きさに収まらないワイド文字リテラルを禁止する | 13 | 14 | 2023.2 | - |
| P2071R2: [名前付きユニバーサルキャラクタ名](/lang/cpp23/named_universal_character_escapes.md) | 16進数のユニバーサルキャラクタだけでなく、その文字の名前を入力できるようにする | 13 | 15 | 2023.2 | - |
| P2096R2: [変数テンプレートの部分特殊化を許可](/lang/cpp23/generalized_wording_for_partial_specializations.md) | 変数テンプレートの部分特殊化を許可するために部分特殊化の仕様を汎用化 | - | - | - | - |
| P2582R1: [継承コンストラクタからのクラステンプレート引数の推論](/lang/cpp23/class_template_argument_deduction_from_inherited.md) | 継承コンストラクタからもクラステンプレート引数を推論できるようにする | - | - | - | - |
| P1938R3: [`if consteval`](/lang/cpp23/if_consteval.md) | コンパイル時の文脈かどうかで分岐させる | 12 | 14 | - | - |
| P1401R5: [定数式の文脈での`bool`への縮小変換を許可](/lang/cpp23/narrowing_contextual_conversions_to_bool.md) | `if constexpr(flags & Flags::Exec)`や`static_assert(N);`を許可 | 9 | 13 | 2022.2 | - |
| P2242R3: [定数式内での非リテラル変数、静的変数・スレッドローカル変数およびgotoとラベルの存在を許可する](/lang/cpp23/non_literal_variables_in_constexpr_functions.md) | コンパイル時に評価されない限り、定数式内に静的変数・スレッドローカル変数およびgoto文とラベルを含むことを許可する | 12 | 15 | 2022.2 | - |
| P2246R1: [静的な診断メッセージの文字エンコーディング](/lang/cpp23/character_encoding_of_diagnostic_text.md) | `static_assert`や`[[deprecated]]`などの診断メッセージの文字集合に関する要件をなくす | - | yes | - | 2022 |
| P2448R2: [`constexpr`関数が定数実行できない場合でも適格とする](/lang/cpp23/relaxing_some_constexpr_restrictions.md) | | 13 | 17 (partial) | 2024.0 (partial) | - |
| P2647R1: [`constexpr`関数内での`static constexpr`変数を許可](/lang/cpp23/permitting_static_constexpr_variables_in_constexpr_functions.md) | `constexpr`関数のローカルで定数を定義できるようにする | 13 | 16 | 2023.2 | - |
| P2564R3: [`constexpr`関数内で`consteval`関数を呼び出せない問題を緩和](/lang/cpp23/consteval_needs_to_propagate_up.md) | `consteval`呼び出しを含む`constexpr`関数を条件付きで`consteval`関数とみなすようにする | - | 17 | - | 2024.0 |
| P1102R2: [ラムダ式で`()`を省略できる条件を緩和](/lang/cpp23/down_with_lambda_parens.md) | 修飾や戻り値型をともなってもパラメータリストが空であれば`()`を省略できる | 11 | 13 | 2022.2 | - |
| P2173R1: [ラムダ式に対する属性](/lang/cpp23/attributes_on_lambda_expressions.md) | ラムダ式のいくつかの箇所に属性を記述できるようにする | 9 | 13 | 2022.2 | - |
| P1774R8: [コード内容の仮定をコンパイラに伝えるassume属性](/lang/cpp23/portable_assumptions.md) | 最適化のために、コードの仮定をコンパイラに伝える属性を標準化する | 13 | - | - | - |
| P2316R2: [文字リテラルエンコーディングを一貫させる](/lang/cpp23/consistent_character_literal_encoding.md) | プリプロセッサの条件式での文字リテラルの扱いをC++式と同様にする | yes | yes | 2022.2 | 2022 |
| P2334R1: [`elif`/`elifdef`/`elifndef`のサポートを追加](/lang/cpp23/add_support_for_preprocessing_directives_elifdef_and_elifndef.md) | `#if`/`#ifdef`/`#ifndef`に対応する複数条件命令のサポートを追加する | 12 | 13 | 2022.2 | - |
| P2437R1: [`#warning`のサポートを追加](/lang/cpp23/warning.md) | 多くのC++コンパイラが実装していたプリプロセス時の警告`#warning message`を正式サポート | yes | yes | 2023.2 | yes |
| P2295R6: [汎用的なソースコードのエンコーディングとしてUTF-8をサポート](/lang/cpp23/support_for_utf8_as_a_portable_source_file_encoding.md) | すべてのコンパイラはUTF-8文字コードのソースコードをサポートしなければならない | 13 | 15 | 2023.2 | 2019 Update 2 |
| P2223R2: [行末スペースを無視するよう規定](/lang/cpp23/trimming_whitespaces_before_line_splicing.md) | 行末が「<code>\ </code>」でおわっていた場合にMSVCは行の継続をしない実装になっていたため動作を共通化するため仕様を規定 | Yes | Yes | 2022.2 | - |


各処理系のC++23実装状況ページ：

- GCC: [C++23 Support in GCC](https://gcc.gnu.org/projects/cxx-status.html#cxx23)
- Clang: [C++2b implementation status](https://clang.llvm.org/cxx_status.html#cxx23)
- Visual C++ (MSVC):
    - [Visual C++ 言語への準拠](https://docs.microsoft.com/ja-jp/cpp/visual-cpp-language-conformance)
    - [次リリース情報(VS2019,2022) - Change log](https://github.com/microsoft/STL/wiki/Changelog)
- ICX: [C++23 Features Supported by Intel® C++ Compiler](https://www.intel.com/content/www/us/en/developer/articles/technical/c23-features-supported-by-intel-c-compiler.html)


## <a id="cpp26" href="#cpp26">C++26言語機能の実装状況</a>

| 言語機能 | 説明 | [GCC][gcc] | [Clang][clang] | [ICX][icx] | [MSVC][msvc] |
|----------|------|------------|----------------|------------|--------------|
| P2752R3: [`std::initializer_list`の配列を静的ストレージに配置する](/lang/cpp26/static_storage_for_braced_initializers.md.nolink) | `std::vector v = {1, 2, 3};`のような初期化で初期化子リストを静的ストレージに配置することで無駄なコピーをなくす | 14 | | | |
| P2169R4: [宣言のみで使用しない変数の名前として`_`をサポート](/lang/cpp26/nice_placeholder_with_no_name.md.nolink) | 変数名`_`は暗黙で`[[maybe_unused]]`が指定される | 14 | 18 | | |
| P1854R4: [文字列リテラルの文字エンコーディング失敗を不適格とする](/lang/cpp26/making_non-encodable_string_literals_ill-formed.md.nolink) | 文字列リテラルのエンコーディング時に文字表現が失われる場合にコンパイルエラーにする | 14 | 14 | | |
| P2361R6: [コンパイル時にのみ使用される文字列の扱いを明確化](/lang/cpp26/unevaluated_strings.md.nolink) | `static_assert`や`[[deprecated]]`などで使用されるコンパイル時の文字列について、文字コードの指定を禁止し、実行時エンコーディングが行われないことを規定 | 14 | 18 | | |
| P2552R3: [属性の無視性を見直し](/lang/cpp26/on_the_ignorability_of_standard_attributes.md.nolink) | 構文として適格な属性のみを無視できるようにし、そうでない属性の使用を不適格とする | | | | |
| P2738R1: [定数式での`void*`からポインタ型へのキャストを許可](/lang/cpp26/constexpr_cast_from_voidptr.md.nolink) | 型消去のために`void*`からポインタ型へのキャストを許可する | 14 | 17 | | |
| P2741R3: [`static_assert`の診断メッセージにユーザーが生成した文字列の指定を許可](/lang/cpp26/user-generated_static_assert_messages.md.nolink) | `constexpr`な`S.size()`と`S.data()`メンバ関数をもつオブジェクトをコンパイル時文字列として指定できるようにする | 14 | 17 | | |
| P2558R2: [基本文字集合に@、$、\`を追加](/lang/cpp26/add_atsign_dollar_graveaccent_to_the_basic_character_set.md.nolink) | C言語との互換性のためにこれらの文字を基本文字集合に追加 | | Yes | | |
| P2662R3: [パラメータパックへのインデックスアクセスを許可](/lang/cpp26/pack_indexing.md.nolink) | 可変引数テンプレートのパラメータパックに添字アクセスできるようにする | | | | |
| P2864R2: [非推奨となっていた列挙値から算術型への暗黙変換を削除](/lang/cpp26/remove_deprecated_arithmetic_conversion_on_enumerations.md.nolink) | C++20から非推奨となっていた列挙値への算術演算で算術型に暗黙変換される仕様を削除 | 14 | 18 | | |

各処理系のC++26実装状況ページ：

- GCC: [C++26 Support in GCC](https://gcc.gnu.org/projects/cxx-status.html#cxx26)
- Clang: [C++2c implementation status](https://clang.llvm.org/cxx_status.html#cxx26)
- Visual C++ (MSVC):
    - [Change log](https://github.com/microsoft/STL/wiki/Changelog)


[gcc]: ./implementation.md#gcc
[clang]: ./implementation.md#clang
[icc]: ./implementation.md#icc
[icx]: ./implementation.md#icc
[msvc]: ./implementation.md#visual_cpp

