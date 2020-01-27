# コンパイラの実装状況
このページでは、C++のバージョンごとの言語機能を、どのコンパイラがどのバージョンからサポートしているかをまとめる。

ライブラリ機能については、本サイトのリファレンスで各機能を参照してもらいたい。

- [C++11](#cpp11)
- [C++14](#cpp14)
- [C++17](#cpp17)
- [C++20](#cpp20)

## <a id="cpp11" href="#cpp11">C++11言語機能の実装状況</a>

| 言語機能                         | 説明 | [GCC][gcc] | [Clang][clang] | [ICC][icc] | [MSVC][msvc] |
|----------------------------------|------|-----|-------|-----|------|
| [`alignas`](/lang/cpp11/alignas.md) | アライメント指定 | 4.8 | 3.0 | No | 2015<br/>2003あるいはそれ以前からある`__declspec(align(x))`構文で代替可能。 |
| [`alignof`](/lang/cpp11/alignof.md) | アライメント取得 | 4.5 | 3.3 | No | 2015<br/>2003あるいはそれ以前よりある`__alignof`で代替可能。 |
| [`auto`](/lang/cpp11/auto.md) | 型推論 | 4.4 | 2.9 | 12.0 | 2010 |
| [`decltype`](/lang/cpp11/decltype.md) | 式の型を取得 | 4.3 | 2.9 | 13.0 | 2010 (partial)<br/> 2012 |
| C99互換のプリプ�セッサ          | [可変引数マク�](/lang/cpp11/variadic_macros.md)、[Pragma演算�](/lang/cpp11/pragma_operator.md)、[`__func__`](/lang/cpp11/func.md) | 4.3 | 2.9 | 11.1 | 2005 (partial): 可変引数のみ `_Pragma`の代わりに`__pragma`が�在する。 |
| [`constexpr`](/lang/cpp11/constexpr.md) | 定数式 | 4.6 | 3.1 | 13.0 (partial)<br/> 14.0 | 2015 (partial) |
| [関数の`default/delete`宣言](/lang/cpp11/defaulted_and_deleted_functions.md) | 自動定義される特殊関数の制御 | 4.4 | 3.0 | 12.0 | 2013: ムーブコンストラクタ・ムーブ代入演算�の`default`は不可<br/> 2015 |
| [移�コンストラクタ](/lang/cpp11/delegating_constructors.md) | コンストラクタから他のコンストラクタに処理を移�する | 4.7 | 3.0 | 14.0 | 2013 |
| [明示的な型変換演算�のオーバー�ード](/lang/cpp11/explicit_conversion_operator.md) | 明示的な型変換が行われる場合にのみ呼び出される演算�をオーバー�ードできるようにする | 4.5 | 3.0 | 14.0 | 2013 |
| [`friend`宣言できる対象を拡張](/lang/cpp11/extend_friend_targets.md) | テンプレートパラメータや型の別名を`friend`宣言 | 4.7 | 2.9 | 11.1 (partial) <br/> 12.0 | 2010 |
| [`extern template`](/lang/cpp11/extern_template.md) | テンプレートのインスタンス化抑� | 3.3 | 2.9 | 11.1 | 6.0 |
| [継承コンストラクタ](/lang/cpp11/inheriting_constructors.md) | 基底クラスのコンストラクタを継承する | 4.8 | 3.3 | 15.0 | 2015 |
| [ラムダ式](/lang/cpp11/lambda_expressions.md) | 関数オブジェクトをその場に書く | 4.5 | 3.1 | 12.0 | 2010 (partial)<br/> 2012 |
| [�ーカル型と無名型を、テンプレート引数として使用することを許可](/lang/cpp11/local_and_unnamed_type_as_template_arguments.md) | �ーカルおよび無名として定義したクラスや列挙型を、テンプレート引数として渡せるようにする | 4.5 | 2.9 | 12.0 | 2010 |
| [`long long`型](/lang/cpp11/long_long_type.md) | 64ビット以上の大きさを持つ整数型 | 4.3 | 2.9 | 11.1 | 2003 |
| [インライン名前空間](/lang/cpp11/inline_namespaces.md) | ネストした名前空間に、透過的にアクセスする | 4.4 | 2.9 | 14.0 | 2015 |
| [`char16_t`と`char32_t`](/lang/cpp11/char16_32.md) | UTF-16とUTF-32の文�型 | 4.4 | 2.9 | 12.1 (Windows: partial) <br/> 12.1 (GNU/Linux, macOS)<br/> 14.0 | 2015<br/> 2010より組み込み型ではなく型の別名として�在する |
| [UTF-8文�列リテラル](/lang/cpp11/utf8_string_literals.md) | `char`の文�列をUTF-8エンコーディングするプレフィックス | 4.5 | 3.0 | 12.1 (Windows: partial) <br/> 12.1 (GNU/Linux, macOS)<br/> 14.0 | 2015 |
| [生文�列リテラル](/lang/cpp11/raw_string_literals.md) | 文�列リテラルにRプレフィックスを付けることで、エスケープシーケンスを無視する | 4.5 | 3.0 | 14.0 | 2013 |
| [ユーザー定義リテラル](/lang/cpp11/user_defined_literals.md) | リテラルのサフィックスをユーザー定義する | 4.7 | 3.1 | 15.0 | 2015 |
| [戻り値の型を後置する関数宣言構文](/lang/cpp11/trailing_return_types.md) | 以下のような形式での関数宣言<br/> `auto f(arg_types...) -> return_type` | 4.4 | 2.9 | 12.0 | 2010 |
| [`nullptr`](/lang/cpp11/nullptr.md) | ヌルポインタを表すポインタリテラル | 4.6 | 2.9 | 11.1 | 2010 |
| [テンプレートの右山カッコ](/lang/cpp11/right_angle_brackets.md) | `vector<basic_string<char>>`のように、`>>`をスペースを空けずに記述可能にする | 4.3 | 2.9 | 11.1 | 2005 |
| [右辺値参照・ムーブセマンティクス](/lang/cpp11/rvalue_ref_and_move_semantics.md) | 右辺値によるオーバー�ード、およびそれによるリソースの所有権移動 | 4.3 (partial)<br/> 4.6 | 2.9 | 12.0 | 2010 (partial) ムーブコンストラクタと代入演算�の暗黙定義に対応していない。<br/> 2015 |
| [コンパイル時アサート](/lang/cpp11/static_assert.md) | コンパイル時に条件式が真であることを表明する | 4.3 | 2.9 | 11.1 | 2010 |
| [`enum`の先行宣言](/lang/cpp11/scoped_enum.md#extended-unscoped-enum) |  | 4.6 | 3.1 | 11.1 (partial)<br/> 14.0 | 2012 |
| [スコープを持つ列挙型](/lang/cpp11/scoped_enum.md) | 強い型付けとスコープを持つ列挙型 | 4.4 | 2.9 | 11.1 (partial)<br/> 14.0 | 2012 |
| [エイリアステンプレート](/lang/cpp11/alias_templates.md) | テンプレートによって型の別名を定義する | 4.7 | 3.0 | 12.1 | 2013 |
| [共用体の制限解除](/lang/cpp11/unrestricted_unions.md) | 共用体のメンバ変数として、クラスオブジェクトを持つ | 4.6 | 3.0 | 14.0(Linux系OSおよびMacのみ。Windowsは非対応) | 2015 |
| [可変引数テンプレート](/lang/cpp11/variadic_templates.md) | 任意の数のテンプレートパラメータを受け取れるようにする | 4.3 (partial)<br/> 4.4 | 2.9 | 12.1 | 2013 |
| [範囲for文](/lang/cpp11/range_based_for.md) | 配列やコンテナといった範囲を表すオブジェクトを、簡潔に走査する | 4.6 | 3.0 | 13.0 | 2012 |
| [`override`と`final`](/lang/cpp11/override_final.md) | メンバ関数のオーバーライド指定、および派生クラスでのオーバー�ードを禁�する指定 | 4.7 | 2.9 | 14.0 | 2005 (partial): `override`のみ。`final`の代わりにsealedが�在する。ただし両者ともデストラクタには指定できない。<br/> 2012 |
| [属性構文](/lang/cpp11/attributes.md) | `[[attr]]`構文による、クラス、関数、変数の属性指定 | 4.8 | 3.3 | 12.1 | 2015 |
| [メンバ関数の左辺値／右辺値修飾](/lang/cpp11/ref_qualifier_for_this.md) | オブジェクトが左辺値／右辺値の場合のみ呼び出し可能であることの指定 | 4.8.1 | 2.9 | 14.0 | 2015 |
| [非静的メンバ変数の初期化](/lang/cpp11/non_static_data_member_initializers.md) | メンバ変数を、宣言と同時に初期値指定する | 4.7 | 3.0 | 14.0 | 2013 |
| [初期化�リスト](/lang/cpp11/initializer_lists.md) | 波括弧による初期化をユーザー定義する。`vector<int> v = {1, 2, 3};`など。 | 4.4 | 3.1 | 14.0 | 2013 |
| [一様初期化](/lang/cpp11/uniform_initialization.md) | コンストラクタ呼び出しを波カッコで行う。 `T x { a, b, c };` | 4.6 | 3.1 | 13.0(partial)<br/> 14.0 | 2013 |
| [`noexcept`](/lang/cpp11/noexcept.md) | 関数の例外指定、例外を投げる可能性のある式かbool値を返す演算� | 4.6 | 3.0 | 13.0(partial)<br/>14.0 | 2015 |
| [任意の式によるSFINAE](/lang/cpp11/sfinae_expressions.md) | 特定の式が有効かどうかで、その関数をオーバー�ード解決に含めるかどうかを決定する | 4.4 | 2.9 | 12.0 | 2015 Update 1 (partial)<br/> 2017 Update 7 |
| [スレッド�ーカルストレージ](/lang/cpp11/thread_local_storage.md) | スレッドごとに異なる静的記憶域に保持される変数 | 4.8 | 3.3 | 11.1 (partial) | 2010<br/> `__declspec(thread)`属性での部分サポート<br/> 2015 |
| [ブ�ックスコープを持つ`static`変数初期化のスレッドセーフ化](/lang/cpp11/static_initialization_thread_safely.md) | 関数�ーカルで定義した`static`変数の初期化を、スレッドセーフにする | 4.0 | 2.9 | 11.0 (Lnux/macOS)<br/> 14.0 | 2015 |


各処理系のC++11実装状況ページ：

- 全体的な対応状況： [C++0xCompilerSupport](https://wiki.apache.org/stdcxx/C++0xCompilerSupport)
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
| [2進数リテラル](/lang/cpp14/binary_literals.md) | 2進数を表す`0b` or `0B`プレフィックスを付けた数値リテラルの記述を可能とする | 4.3(GNU)<br/> 4.9 | 3.2 | 11.0 | 2015 |
| [通常関数の戻り値型推論](/lang/cpp14/return_type_deduction_for_normal_functions.md) | 関数の戻り値型を`auto`にすることで、`return`文から戻り値の型を推論させる | 4.8(partial)<br/>4.9 | 3.3(partial)<br/> 3.4 | 15.0 | 2015 |
| [ラムダ式の初期化�ャプチャ](/lang/cpp14/initialize_capture.md) | �ャプチャに代入構文を導入し、一つの変数に複数の�ャプチャ方法を指定可能にする | 4.9 | 3.4 | 15.0 | 2015 |
| [ジェネリックラムダ](/lang/cpp14/generic_lambdas.md) | ラムダ式のパラメータを`auto`にすることで、ジェネリックな関数呼び出し演算�を持つ関数オブジェクトを生成する | 4.9 | 3.4 | 16.0 | 2015 |
| [変数テンプレート](/lang/cpp14/variable_templates.md) | 変数定義時のテンプレート指定を可能にする。 | 5.1 | 3.4 | 16.0 | 2015 Update 2 |
| [`constexpr`の制限緩和](/lang/cpp14/relaxing_constraints_on_constexpr.md) | `if`文、`switch`文による条件分岐の許可。<br/>`for`文、`while`文、`do-while`文によるループの許可。<br/>`void`戻り値型の許可<br/>初期化を伴う変数宣言の許可。<br/>変数書き換えの許可。 | 5.1 | 3.3(partial) <br/> 3.4 | 16.0 | 2017 |
| [宣言時のメンバ初期化を持つ型の集成体初期化を許可](/lang/cpp14/brace_elision_in_array_temporary_initialization.md) | 一様初期化と初期化�リストを組み合わせた際、二重に波カッコが必要となっていた仕様を緩和し、波カッコを省略できるようにする | 5.1 | 3.3 | 16.0 | 2017 |
| [`[[deprecated]]`属性](/lang/cpp14/deprecated_attr.md) | 非推奨の機能であることを示す属性。 | 4.9 | 3.4 | 15.0<br/> (Linux/Mac OS) | 2015<br/>それ以前は`__declspec(deprecated)`で代替可能 |
| [数値リテラルの桁区切り文�](/lang/cpp14/digit_separators.md) | シングルクォーテーションで数値リテラルを桁区切りする。 | 4.9 | 3.4 | 16.0 | 2015 |
| [サイズ付きデア�ケーション](/lang/cpp14/sized_deallocation.md) | サイズをとる`delete`演算�のオーバー�ードを許可する。 | 5.1 | 3.4 | 16.0 | 2015 |


各処理系のC++14実装状況ページ：

- GCC: [C++14 Support in GCC](https://gcc.gnu.org/projects/cxx-status.html#cxx14)
- libstdc++: [C++ 2014](https://gcc.gnu.org/onlinedocs/libstdc++/manual/status.html#status.iso.2014)
- Clang: [C++98, C++11, and C++14 Support in Clang](http://clang.llvm.org/cxx_status.html)
- libc++: [libc++ C++1Y Status](http://libcxx.llvm.org/cxx1y_status.html)
- Visual C++ (MSVC):
    - [Visual C++ 言語への準拠](https://docs.microsoft.com/ja-jp/cpp/visual-cpp-language-conformance)
    - [Announcing: MSVC Conforms to the C++ Standard](https://blogs.msdn.microsoft.com/vcblog/2018/05/07/announcing-msvc-conforms-to-the-c-standard/)
- ICC: [C++14 Features Supported by Intel C++ Compiler](https://software.intel.com/en-us/articles/c14-features-supported-by-intel-c-compiler)
    - [Intel (R) Parallel Studio XE 2016 Beta program has begun](https://software.intel.com/en-us/forums/topic/549502)


## <a id="cpp17" href="#cpp17">C++17言語機能の実装状況</a>

| 言語機能 | 説明 | [GCC][gcc] | [Clang][clang] | [ICC][icc] | [MSVC][msvc] |
|----------|------|-----|-------|-----|------|
| [メッセージなしの`static_assert`](/lang/cpp17/extending_static_assert.md) | デフォルトの表明メッセージを使用する | 6 | 3.5 | 18.0 | 2017 |
| [トライグラフを削除](/lang/cpp17/removing_trigraphs.md) | | 5.1 | 3.5 | 19.1 | 2010 |
| [テンプレートテンプレートパラメータに`typename`を許可](/lang/cpp17/allow_typename_in_a_template_template_parameter.md) | `class`�ーワードしか使用できなかった部分に、`typename`を許可 | 5.0 | 3.5 | 17.0 | 2015 |
| [単一要素初期化�リストを`auto`で受け取った場合の型を変更](/lang/cpp17/new_rules_for_auto_deduction_from_braced-init-list.md) | `initializer_list<T>`だったのを`T`に変更 | 5 | 3.8 | 17.0 | 2015 |
| [畳み込み式](/lang/cpp17/folding_expressions.md) | パラメータパックに対する2項演算の集積処理 | 6 | 3.6 | 19.0 | 2017 
5 |
| [UTF-8文�リテラル](/lang/cpp17/utf8_character_literals.md) | 文�列リテラルだけでなく、文�リテラルにもUTF-8指定できるようにする | 6 | 3.6 | 17.0 | 2015 |
| [入れ�名前空間の定義](/lang/cpp17/nested_namespace.md) | `namespace A::B {}`のように、入れ�の名前空間を簡単に定義できるようにする | 6 | 3.6 | 17.0 | 2015 Update 3 |
| [名前空間と列挙�に属性の付加を許可](/lang/cpp17/attributes_for_namespaces_and_enumerators.md) | 名前空間の定義と、列挙型の各要素の定義に、属性を付けられるようにする | 名前空間は4.0<br/>列挙�は6 | 3.6 | 17.0 | 2015 |
| [全ての非型テンプレート引数の定数式評価を許可](/lang/cpp17/allow_constant_evaluation_for_all_non-type_template_arguments.md) | ポインタの定数式評価として、配列からポインタへの変換や、関数から関数ポインタへの変換などを許可 | 6 | 3.6 | 19.1 | 2017 Update 5 |
| [非推奨だった`register`�ーワードを削除](/lang/cpp17/remove_deprecated_use_of_the_register_keyword.md) | | 7 | 3.8 | 18.0 | 2017 Update 3 |
| [非推奨だった`bool`型オブジェクトに対するインクリメントの仕様を削除](/lang/cpp17/remove_deprecated_increment_of_bool.md) | | 7 | 3.8 | 18.0 | 2017 Update 3 |
| [例外仕様を型システムの一部にする](/lang/cpp17/exception_spec_be_part_of_the_type_system.md) | | 7 | 4 | 18.0 | 2017 Update 5 |
| [プリプ�セッサでの条件式`__has_include`](/lang/cpp17/has_include.md) | 対象のインクルードファイルが�在するかをプリプ�セス時に判定する | 5.0 | 3.0 | 18.0 | 2017 Update 3 |
| [継承コンストラクタの新仕様][P0136R1] | デフォルト引数を引き継ぐようにした | 7 | 3.9 | No | 2017 Update 7 |
| [`[[fallthrough]]`属性](/lang/cpp17/fallthrough.md) | `case`節で`break`や`return`を書かなかった場合に、それが意図したフォールスルーであることをコンパイラに伝える属性 | 7 | 3.9 | 18.0 | 2017 |
| [`[[nodiscard]]`属性](/lang/cpp17/nodiscard.md) | 関数の戻り値を無視してはならないことをユーザーに伝える属性 | 4.8からは`[[gnu::warn_unused_result]]`を使用すること<br/> 7からサポート | 3.9 | 18.0 | 2017 Update 3 |
| [`[[maybe_unused]]`属性](/lang/cpp17/maybe_unused.md) | 使用しない可能性がある変数であることをコンパイラに伝える属性 | 4.8からは`[[gnu::unused]]`を使用すること<br/> 7からサポート | 3.9 | 18.0 | 2017 Update 3 |
| [基底クラスのメンバ変数を集成体初期化するための波カッコを省略できるようにする][P0017R1] | 基底クラスのメンバを集成体初期化するために、`derived d {{42}};`の代わりに`derived d {42};`と書けるようにする | 7 | 3.9 | 19.1 | 2017 Update 7 |
| [ラムダ式を`constexpr`として使用できるようにする](/lang/cpp17/constexpr_lambda.md) | ラムダ式の関数オブジェクトが定数式の文脈で使用された場合に、それがコンパイル時に評価されるようにする | 7 | 5 | 19.0 | 2017 Update 3 |
| [範囲for文のための`begin()`と`end()`関数が、異なる型を返すことを許可](/lang/cpp17/generalizing_the_range-based_for_loop.md) | `begin()`と`end()`が異なるイテレータ型を返せるようにすることで、終端イテレータを定義しやすくする | 6 | 3.9 | 18.0 | 2017 |
| [ラムダ式での`*this`のコピー�ャプチャ](/lang/cpp17/lambda_capture_of_this_by_value.md) | �ャプチャリストに`*this`を指定することで、`*this`をコピー�ャプチャする | 7 | 3.8 | 19.0 | 2017 Update 3 |
| [`enum class`変数の初期値として整数を指定する際の規則を調整](/lang/cpp17/construction_enum_class_values.md) | �ャストを使用することなく整数を初期値として使用し、`E e{0};`のような初期化を許可 | 7 | 1.9 | 19.0 | 2017 Update 3 |
| [浮動小数点数の16進数リテラル](/lang/cpp17/hexadecimal_floating_literals.md) | `hexfloat`マニピュレータや`printf()`の16進数出力に合わせて、浮動小数点数のリテラルも16進数表記できるようにする | 3.0 | 3.0 | 18.0 | 2017 Update 5 |
| [属性の名前空間指定に繰り返しをなくす](/lang/cpp17/using_attribute_namespaces.md) | `[[using CC: opt(1), debug]]`のように属性の名前空間宣言をまとめて行う | 7 | 3.9 | 18.0 | 2017 Update 3 |
| [アライメント指定されたデータの動的メモリ確保](/lang/cpp17/dynamic_memory_allocation_for_over-aligned_data.md) | `operator new`と`operator delete`でアライメント値を取得できるようにする | 7 | 4 | No | 2017 Update 5 |
| [クラステンプレートのテンプレート引数推論](/lang/cpp17/type_deduction_for_class_templates.md) | コンストラクタの引数からクラスのテンプレート引数を推論できるようにする | 7 | 5 | 19.1 | 2017 Update 7 |
| [非型テンプレート引数の`auto`宣言](/lang/cpp17/declaring_non-type_template_arguments_with_auto.md) | `template <typename T, T x>`という冗長なコードを`template <auto x>`のようにして受けられるようにし、<br/> `X<3>; X<true>; X<'a'>`のように定数を簡潔に渡せるようにする | 7 | 4 | 19.1 | 2017 Update 7 |
| [値のコピー省略を保証](/lang/cpp17/guaranteed_copy_elision.md) | 一時オブジェクトをコピーする際に、単純な値を持つクラスであればコピーが省略されることを保証する | 7 | 4 | 19.1 | 2017 Update 6 |
| [厳密な式の評価順](/lang/cpp17/expression_evaluation_order.md) | 式の項が評価される順序を厳密に規定する。<br/> `b = a;`の式が右から順番(a, bの順)に評価される | 7 | 4 | 19.1 | 2017 Update 7 |
| [不明な属性を無視する](/lang/cpp17/non_standard_attributes.md) | 実装が知らない名前空間の属性は無視する | 4.8 | 3.0 | 18.0 | 2015 |
| [constexpr if文](/lang/cpp17/if_constexpr.md) | `if constexpr(cond)`とすることで、そのif文はコンパイル時に処理される | 7 | 3.9 | 19.0 | 2017 Update 3 |
| [処理の進行保証][P0296R2] | 並行処理に関して「処理の進行」を明確に定義<br/> (TODO:言葉の定義だけなので実装状況ページからは取り除く) | No | No | No | No |
| [インライン変数](/lang/cpp17/inline_variables.md) | インライン指定を関数だけでなく変数にも指定できるようにする | 7 | 3.9 | 19.0 | 2017 Update 5 |
| [templated entityという用語を導入][P0391R0] | (TODO:言葉の定義だけなので実装状況ページからは取り除く) | - | - | - | - |
| [構造化束縛](/lang/cpp17/structured_bindings.md) | タプルやユーザー定義型を分解して受け取れるようにする<br/> `tuple<int, string> f();` <br/> `const auto [a, b] = f(); // aはintの値、bはstringの値` | 7 | 4 | 18.0 | 2017 Update 3 |
| [if文とswitch文の条件式と初期化を分離](/lang/cpp17/selection_statements_with_initializer.md) | `if (init; condition)`のように初期化と条件式を分けて記述できるようにする | 7 | 3.9 | 18.0 | 2017 Update 3 |
| [参照メンバをもつクラスの置き換え](/lang/cpp17/replacement_of_class_objects_containing_reference_members.md) | 参照型メンバや`const`データメンバを含むクラスについてこれまで結果は未定義とされていた配置`new`によるオブジェクトの置き換えを条件付きで可能とする | 7 | 6.0 | No | 2017 Update 7 |
| [非推奨だった例外仕様を削除](/lang/cpp17/remove_deprecated_exception_specifications.md) | `noexcept`が入ったことによって非推奨になった`throw`�ーワードによる例外仕様を削除 | 7 | 4 | No | 2017 Update 5 |
| [using宣言でのパック展開](/lang/cpp17/pack_expansions_in_using.md) | パラメータパックの型を基底クラスとして指定した場合に、`using`宣言に基底クラスのパラメータパックを指定できるようにする | 7 | 4 | No | 2017 Update 7 |
| [クラステンプレート引数の推論仕様を調整][P0512R0] | | 8 | 5.0 | No | 2017 Update 7 |
| [Committee Draftに対するNational Body Commentへの対応][P0490R0] | | - | - | - | - |
| [テンプレートテンプレート引数のマッチングにおいて、互換性のあるテンプレートを除外][P0522R0] | | 7 | 4 (partial) | 19.1 | 2017 Update 5 |


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
- libc++ : [libc++ C++1z Status](http://libcxx.llvm.org/cxx1z_status.html)
- Visual C++ (MSVC):
    - [Visual C++ 言語への準拠](https://docs.microsoft.com/ja-jp/cpp/visual-cpp-language-conformance)
    - [Announcing: MSVC Conforms to the C++ Standard](https://blogs.msdn.microsoft.com/vcblog/2018/05/07/announcing-msvc-conforms-to-the-c-standard/)
- ICC: [C++17 Features Supported by Intel C++ Compiler](https://software.intel.com/en-us/articles/c17-features-supported-by-intel-c-compiler)


## <a id="cpp20" href="#cpp20">C++20言語機能の実装状況</a>

| 言語機能 | 説明 | [GCC][gcc] | [Clang][clang] | [ICC][icc] | [MSVC][msvc] |
|----------|------|-----|-------|-----|------|
| [ビットフィールドのメンバ変数初期化](/lang/cpp20/default_member_initializers_for_bit_fields.md) | ビットフィールドメンバ変数のデフォルト値を�定する構文を追加する | 8 | 6.0 | |
| [ラムダ式の�ャプチャとして`[=, this]`を許可する](/lang/cpp20/allow_lambda_capture_equal_this.md) | デフォルトコピー�ャプチャと`this`ポインタのコピー�ャプチャを両方指定できるようにする | 8 | 6.0 | | 2019 Update 1 |
| [`[=]`による`this`の暗黙の�ャプチャを非推奨化](/lang/cpp20/deprecate_implicit_capture_of_this_via_defcopy.md) | コピーのデフォルト�ャプチャでは、`this`ポインタを�ャプチャされなくする | 9 | | | 2019 Update 2 |
| [ジェネリックラムダのテンプレート構文](/lang/cpp20/familiar_template_syntax_for_generic_lambdas.md) | ジェネリックラムダでテンプレートパラメータを定義できるようにする | 8 | 9.0 | | 2019 Update 2 |
| [`const`修飾されたメンバポインタの制限を修�](/lang/cpp20/fixing_const_qualified_pointers_to_members.md) | `.*`演算�での左辺値の`const`メンバ関数呼び出しを許可する | 8 | 6.0 | | 2015 |
| [可変引数が空でない場合のトークン置換](/lang/cpp20/va_opt.md) | プリプ�セッサの置換で可変引数が空の場合に余計なカンマが付いてしまう問題に対処 | 8 (partial, `#__VA_OPT__`による文�列化が未サポート) | 6.0<br/> 9.0 ([p1042](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1042r1.html)) | | |
| [指示付き初期化][P0329] | | 8 | 6.0 (partial) | | 2019 Update 1 |
| [コンセプト][P0734] | テンプレートパラメータに対する制約を行う | | | | 2019 Update 3 |
| [初期化式をともなう範囲for文](/lang/cpp20/range-based_for_statements_with_initializer.md) | 範囲for文スコープで使用する変数の初期化のための構文を追加 | 9 | 8.0 | | |
| [暗黙のラムダ�ャプチャを簡略化][p0588] | | 8 | | | 2019 Update 4 |
| [関数テンプレートに明示的に型指定した場合にADLで見つからない問題を修�][p0846] | | 9 | 9.0 | | 2019 Update 1 |
| [デフォルトのコピーコンストラクタと非`const`なコンストラクタが衝突する問題を修�][p0641] | | 9 | 8.0 | | |
| [評価されない文脈で`constexpr`関数が定数式評価されることを規定][p0859] | | 9 | | | |
| [一貫性ある比較][p0515] | | | 8.0 (partial) | | 2019 |
| [ラムダ式の制約][p0857] | | | | | 2019 Update 3 |
| [特殊化のアクセスチェック][p0692] | | Yes | | | |
| [状態を持たないラムダ式を、デフォルト構築可能、代入可能とする][p0624] | | 9 | 8.0 | | 2019 Update 2 |
| [PODを非推奨化][p0767] | | | | | |
| [評価されない文脈でのラムダ式][p0315] | | 9 | | | |
| [空オブジェクトを言語サポート][p0840] | `[[no_unique_address]]`属性を導入し、空の型のオブジェクトをほかのオブジェクトと共有する最適化を許可する | 9 | 9.0 | | |
| [範囲for文がカスタマイゼーションポイントを見つけるルールを緩和](/lang/cpp20/relaxing_the_range_for_loop_customization_point_finding_rules.md) | `begin()`/`end()`メンバ関数のどちらかが見つからなかった場合に非メンバ関数の`begin()`/`end()`を探しにいく | 8 | | | |
| [friend指定された関数内から構造化束縛を使用して非公開メンバ変数にアクセスすることを許可](/lang/cpp20/allow_structured_bindings_to_accessible_members.md) | 構造化束縛の仕様として公開メンバ変数のみを取り出せるようになっていたが、friend指定された関数からは非公開メンバ変数にもアクセスできるようにする | 8 | | | |
| [構造化束縛がカスタマイゼーションポイントを見つけるルールを緩和](/lang/cpp20/relaxing_the_structured_bindings_customization_point_finding_rules.md) | 非テンプレートの`get()`メンバ関数が見つかった場合は、非メンバ関数の`get()`を探しにいく | 8 | | | 2019 |
| [型の文脈で`typename`の省略を許可][p0634] | 型しか現れない文脈では、依�名を解決するための`typename`�ーワードを省略できるようにする | 9 | | | |
| [ラムダ式の初期化�ャプチャでのパック展開を許可][p0780] | `[...args = std::move(args)]`のような�ャプチャを許可 | 8 | 9.0 | | 2019 Update 2 |
| [当たる確率が高い分岐と、当たる確率が低い分岐をコンパイラに伝える属性を追加][p0479] | コンパイラが分岐予測するためのヒントとする | 9 | | | |
| [宇宙船演算�に対称性をもたせる][p0905] | `a <=> b`が妥当であれば`b <=> a`も妥当とする | | | | 2019 Update 2 |
| [抽象型のチェック][p0929] | 関数の宣言段階では、パラメータおよび戻り値型が抽象型かどうかをチェックしないようにする | | | | |
| [非型テンプレートパラメータとしてクラス型を許可する][p0732] | `std::strong_equality`に変換可能な非メンバ関数`<=>`をもつ型を、非型テンプレートパラメータとして使用できるようにする | 9 | | | |
| [可変長データを扱うクラスの効率的な`delete`][p0722] | クラスの`delete`演算�が呼び出される前にデストラクタが呼ばれないようにするオプションを追加 | 9 | 6.0 | | |
| [定数式からの仮想関数の呼び出しを許可](/lang/cpp20/allow_virtual_function_calls_in_constant_expressions.md) | 仮想関数に`constexpr`を付けられない制限を解除 | 9 | 9.0 | | |
| [定数式での`dynamic_cast`、多態的な`typeid`を許可][p1327] | 定数式での動的多態を許可 | 9 | 9.0 | | |
| [constexpr関数内でのtry-catchブ�ックを許可][p1002] | constexpr関数内でtry-catchブ�ックを書けるようにする | 9 | 8.0 | | |
| [即時関数][p1073] | `consteval`�ーワードを追加し、常に定数式評価されるよう指定できるようにする | | | | |
| [定数式内での共用体のアクティブメンバの変更を許可][p1330] | 共用体メンバの書き換えを定数式内で行えるようにする | 9 | 9.0 | | 2017 |
| [ユーザー宣言したコンストラクタを持つクラスの集成体初期化を禁�][p1008] | コンストラクタが`delete`宣言されているクラスを、集成体初期化によってコンストラクタ呼び出しを回避して構築できてしまっていた技法を禁� | 9 | 8.0 | | 2019 |
| [契約に基づくプ�グラミング][p0542] | 事前条件、事後条件、表明を宣言する新たな属性構文を追加 | | | | |
| [関数を条件付きで`explicit`にする構文を追加][p0892] | `explicit(true)`のように`explicit`に真理値パラメータを指定できるようにする | 9 | 9.0 | | 2019 Update 2 |
| [符号付き整数型が2の補数表現であることを規定](/lang/cpp20/signed_integers_are_twos_complement.md) | 符号付き整数型のビット表現を2の補数に規定する | 9 | 9.0 | | |
| [UTF-8エンコーディングされた文�の型として`char8_t`を追加][p0486] | UTF-8エンコードされた文�かどうかでオーバー�ード・特殊化をできるようにする | 9 | 7 (`-fchar8_t`オプションが必要) | | 2019 Update 2 |
| [入れ�名前空間定義でのインライン名前空間][p1094] | `namespace ns1::inline ns2::ns3 {}`のように、入れ�名前空間を定義する式にインライン名前空間の指定を含められるようにする | 9 | 8.0 | | |
| [構造化束縛を拡張して通常の変数宣言のように使用できるようにする](/lang/cpp20/extending_structured_bindings_to_be_more_like_variable_declarations.md) | 記憶域指定�として`static`と`thread_local`の指定を許可 | 10 | 8.0 (partial) | | 2019 Update 4 |
| [構造化束縛したビットフィールドの参照�ャプチャ](/lang/cpp20/reference_capture_of_structured_bindings.md.nolink) | ビットフィールドを含む構造化束縛をした場合にラムダ式で参照�ャプチャできない規定を緩和し、ビットフィールドを直接参照�ャプチャ、もしくはデフォルト参照�ャプチャして使用しなければ適格とする | 8 | 8.0 (partial) | | |
| [丸カッコの値リストからの集成体初期化を許可](/lang/cpp20/allow_initializing_aggregates_from_a_parenthesized_list_of_values.md.nolink) | `T x{1, 2, 3};`と同様に`T x(1, 2, 3);`でも集成体初期化できるようにする | | | | |
| [`new`式での配列要素数の推論](/lang/cpp20/array_size_deduction_in_new-expressions.md.nolink) | `double* p = new double[]{1,2,3};`を許可 | | | | |
| [`char16_t`と`char32_t`の文�・文�列リテラルを、文�コードUTF-16/32に規定](/lang/cpp20/make_char16t_char32t_string_literals_be_utf16_32.md.nolink) | `__STDC_UTF_16__`、`__STDC_UTF_32__`の定義に関係なく、`char16_t`、`char32_t`のリテラルをUTF-16/32文�コードに規定する | | Yes | | 2015 |
| [モジュール](/lang/cpp20/modules.md) | ヘッダファイル・ソースファイル、インクルードに変わる仕組みとしてモジュールを導入する | | 8.0 partial (`-fmodules`, `-fmodules-ts`が必要) | | |
| [コルーチン](/lang/cpp20/coroutines.md.nolink) | 関数実行を��・再開する仕組みとしてコルーチンを導入する | | 8.0 (partial) | | |
| [添�演算�内でのカンマ演算�の使用を非推奨化](/lang/cpp20/deprecate_uses_of_the_comma_operator_in_subscripting_expressions.md.nolink) | `ar[i, j]`を非推奨化。`ar[(i, j)]`はOK | 10 | 9.0 | | |
| [constexprの文脈での自明なデフォルト初期化を許可](/lang/cpp20/permitting_trivial_default_initialization_in_constexpr_contexts.md.nolink) | constexpr関数内でのデフォルト初期化を許可し、未初期化値を�むことのみ禁�する | | | | |
| [特殊メンバ関数の条件付き自明定義](/lang/cpp20/conditionally_trivial_special_member_functions.md.nolink) | 制約によって自明な特殊メンバ関数と非自明な特殊メンバ関数をオーバー�ードできるようにする | | | | |
| [`[[nodiscard]]`属性に理由となる文�列を付加できるようにする](cpp20/nodiscard_should_have_a_reason.md.nolink) | 関数の戻り値を無視してはならない理由を関数宣言に持たせ、�告メッセージに役立てる | | 9.0 | | |
| [スコープ付き列挙型のusing宣言](/lang/cpp20/using_enum.md.nolink) | `using enum EnumType;`もしくは`using EnumType::enumerator`とすることで、列挙値のスコープ指定を省略できるようにする | | | | 2019 Update 4 |
| [集成体クラステンプレートのテンプレート引数推論](cpp20/class_template_argument_deduction_for_aggregates.md.nolink) | クラステンプレートのテンプレート引数推論はコンストラクタ引数から推論されるが、集成体初期化からも推論できるようにする | | | | |
| [constexpr関数内で未評価のインラインアセンブリを許可することによる組み込み関数のconstexpr有効化](/lang/cpp20/enabling_constexpr_intrinsics_by_permitting_unevaluated_inline-assembly_in_constexpr_functions.md.nolink) | コンパイル時に評価されない場合にconstexpr関数にasm定義を含めることを許可 | 10 | | | |
| [要素数不明の配列への変換を許可](/lang/cpp20/permit_conversions_to_arrays_of_unknown_bound.md.nolink) | 要素数が判明している配列から、要素数が不明の配列への変換を許可 | | | | |
| [コンパイル時初期化を強制する`constinit`�ーワードを追加](/lang/cpp20/constinit.md.nolink) | 初期化のみコンパイル時におわらせたい場合に使用する | 10 | | | |
| [ほとんどの`volatile`を非推奨化](/lang/cpp20/deprecating_volatile.md.nolink) | `volatile`の有用な機能のみを残し、効果が疑わしい、または壊れている機能を非推奨化する | 10 | | | |
| [エイリアステンプレートに対するクラステンプレートのテンプレート引数推論](cpp20/class_template_argument_deduction_for_alias_templates.md.nolink) | エイリアステンプレートからクラステンプレートのテンプレート引数を推論できるようにする | | | | |
| [可変サイズをもつコンテナの`constexpr`化](cpp20/more_constexpr_containers.md.nolink) | `constexpr`記憶域をもつメモリア�ケータの�在を考慮することで、可変サイズをもつコンテナをコンパイル時に使用できるようにする | | | | |


[p0329]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0329r4.pdf
[p0734]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0734r0.pdf
[p0588]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0588r1.html
[p0846]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0846r0.html
[p0641]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0641r2.html
[p0859]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0859r0.html
[p0515]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0515r3.pdf
[p0857]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0857r0.html
[p0692]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0692r1.html
[p0624]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0624r2.pdf
[p0767]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0767r1.html
[p0315]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0315r4.pdf
[p0840]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0840r2.html
[p0962]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0962r1.html
[p0634]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0634r3.html
[p0780]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0780r2.html
[p0479]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0479r5.html
[p0905]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0905r1.html
[p0929]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0929r2.html
[p0732]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0732r2.pdf
[p0722]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0722r1.html
[p1008]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1008r1.pdf
[p0542]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0542r5.html
[p0892]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0892r2.html
[p1002]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1002r1.pdf
[p1327]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1327r1.html
[p0486]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0482r6.html
[p1073]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1073r3.html
[p1094]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1094r2.html
[p1330]: http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1330r0.pdf

各処理系のC++20実装状況ページ：

- GCC: [C++20 Support in GCC](https://gcc.gnu.org/projects/cxx-status.html#cxx2a)
- Clang: [C++ Support in Clang](http://clang.llvm.org/cxx_status.html)
- libstdc++: [C++ 2020 Implementation Status](https://gcc.gnu.org/onlinedocs/libstdc++/manual/status.html#status.iso.2020)
- libc++: [libc++ C++2a Status](http://libcxx.llvm.org/cxx2a_status.html)

[gcc]: ./implementation.md#gcc
[clang]: ./implementation.md#clang
[icc]: ./implementation.md#icc
[msvc]: ./implementation.md#visual_cpp

