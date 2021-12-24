# C++23

## 概要
C++23とは、2023年中に改訂される予定の、C++バージョンの通称である。

このバージョンは、策定中のためC++2bと呼ばれることがある。「(C++20である2020年の次の) 202b年にリリースされる」という伏せ字として「b」が使われているが、3年周期に次のバージョンが策定されることが決まっているため、伏せ字になっている年数がずれることはない。


## 言語機能

| 言語機能 | 説明 |
|----------|------|
| [(符号付き)`size_t`リテラルのためのサフィックス](cpp23/literal_suffix_for_signed_size_t.md) | `42z`/`42Z`とすることで`size_t`に対応する符号付き整数型のリテラルとする |
| [部分特殊化の汎用化仕様](cpp23/generalized_wording_for_partial_specializations.md.nolink) | 変数テンプレートの部分特殊化を許可するために部分特殊化の仕様を汎用化 |
| [文字・文字列リテラル中の数値・ユニバーサルキャラクタのエスケープに関する問題解決](cpp23/numeric_and_universal_character_escapes_in_character_and_string_literals.md.nolink) | |
| [スコープと名前ルックアップの仕様整理](cpp23/declarations_and_where_to_find_them.md.nolink) | 複雑で不完全になっているスコープと名前ルックアップの仕様を整理し、一部の問題を解決する |
| [ラムダ式で`()`を省略できる条件を緩和](cpp23/down_with_lambda_parens.md.nolink) | キャプチャや修飾をともなってもパラメータリストが空であれば`()`を省略できる | 11 | 13 | - | - |
| [`if consteval`](/lang/cpp23/if_consteval.md.nolink) | コンパイル時の文脈かどうかで分岐させる |
| [定数式の文脈での`bool`への縮小変換を許可](cpp23/narrowing_contextual_conversions_to_bool.md.nolink) | `if constexpr(flags & Flags::Exec)`や`static_assert(N);`を許可 |
| [行末スペースを無視するよう規定](cpp23/trimming_whitespaces_before_line_splicing.md.nolink) | 行末が`\ `でおわっていた場合にMSVCは行の継続をしない実装になっていたため動作を共通化するため仕様を規定 |
| [アクセス制御の異なるメンバ変数のレイアウトを宣言順に規定](cpp23/make_declaration_order_layout_mandated.md.nolink) | アクセス制御の異なるメンバ変数のレイアウトが実装によって異なっていたため仕様を規定 |
| [異なる文字エンコーディングをもつ文字列リテラルの連結を不適格とする](/lang/cpp23/mixed_string_literal_concatenation.md.nolink) | `auto a = u8"" L"";`のような異なる文字エンコーディング同士での文字列リテラルを連結を禁止する |
| [契約に基づくプログラミング (まだ入っていない)](cpp23/contract-based_programming.md) | 事前条件、事後条件、表明を宣言する新たな属性構文を追加 |

### 小さな変更

| 言語機能 | 説明 |
|----------|------|
| [参照するPOSIX規格を更新](cpp23/update_normative_reference_to_posix.md) | 新しいPOSIX規格の機能を標準C++が参照していたため、参照するPOSIX規格のバージョンを更新 |


## ライブラリ更新の概要
### 新ライブラリ

- スタックトレースを取得するためのライブラリとして[`<stacktrace>`](/reference/stacktrace.md)を追加
- CとC++の間でのアトミック操作の相互運用のため、C互換ライブラリとして[`<stdatomic.h>`](/reference/stdatomic.h.md)を追加
- 外部から提供されるメモリバッファでストリーム処理を行うライブラリとして[`<spanstream>`](/reference/spanstream.md.nolink)を追加
- 契約違反のハンドリングをするためのライブラリとして[`<contract>`](/reference/contract.md)を追加 (まだ入っていない)


### コンテナ
- [`std::stack`](/reference/stack/stack.md)と[`std::queue`](/reference/queue/queue.md)に、イテレータのペアをとるコンストラクタを追加
- `auto v = std::vector(v, alloc);`のようなアロケータ引数をともなう場合のクラステンプレートのテンプレート引数推論が動作しなかったため、各コンテナクラスのコンストラクタにおけるアロケータパラメータの型を`const Allocator&`から`const` [`std::type_identity_t`](/reference/type_traits/type_identity.md)`<Allocator>&`に修正
- N要素のメモリアロケート時にアロケータが実際にどれくらいのメモリを確保したかを得られるインタフェースとして、[`std::allocator`](/reference/memory/allocator.md)クラスに、[`allocate_at_least()`](/reference/memory/allocator/allocate_at_least.md.nolink)メンバ関数を追加
- [`std::pair`](/reference/utility/pair.md)の転送コンストラクタにデフォルトテンプレート引数を追加することで、`{}`のような型推論ができない引数を渡した場合でも完全転送が行われるよう修正


### アルゴリズム
- [`<algorithm>`](/reference/algorithm.md)に、範囲の先頭が指定した範囲と合致するかを判定する[`std::starts_with()`](/reference/algorithm/starts_with.md.nolink)、範囲の末尾が指定した範囲と合致するかを判定する[`std::ends_with()`](/reference/algorithm/ends_with.md.nolink)を追加


### 文字列
- [`std::basic_string`](/reference/string/basic_string.md)クラスと[`std::basic_string_view`](/reference/string_view/basic_string_view.md)クラスに、文字列内に指定した文字・文字列が含まれているかを判定するメンバ関数`contains()`を追加
- [`std::basic_string_view`](/reference/string_view/basic_string_view.md)のコンストラクタに、範囲をとるオーバーロードを追加
- `std::string s = nullptr;`のような文字列オブジェクトに`nullptr`を代入するようなコードはバグの元であるため、[`std::basic_string`](/reference/string/basic_string.md)と[`std::basic_string_view`](/reference/string_view/basic_string_view.md)に、[`nullptr_t`](/reference/cstddef/nullptr_t.md)をとるコンストラクタをdelete定義として追加


### 関数オブジェクト
- [`std::invoke()`](/reference/functional/invoke.md)の戻り値型を指定するバージョンである[`std::invoke_r()`](/reference/functional/onvoke_r.md.nolink)


### スマートポインタ
- [`<memory>`](/reference/memory.md)に[`std::owner_hash`](/reference/memory/owner_hash.md.nolink)と[`std::owner_equal`](/reference/memory/owner_equal.md.nolink)が追加され、非順序連想コンテナのキーとして[`std::weak_ptr`](/reference/memory/weak_ptr.md)を使用できるようになった
- [`<memory>`](/reference/memory.md)に、出力ポインタと入出力ポインタの抽象である[`std::out_ptr`](/reference/memory/out_ptr.md.nolink)と[`std::inout_ptr`](/reference/memory/inout_ptr.md.nolink)を追加


### ユーティリティ
- [`std::visit()`](/reference/variant/visit.md)に指定できるバリアントオブジェクトを、直接的な「[`std::variant`](/reference/variant/variant.md)型の特殊化であること」という制約を緩和し、[`std::variant`](/reference/variant/variant.md)から派生した型も許可
- [`<utility>`](/reference/utility.md)に、列挙値を基底型に変換する[`std::to_underlying()`](/reference/utility/to_underlying.md)関数を追加


### 型情報
- [`std::type_info`](/reference/typeinfo/type_info.md)クラスの[`operator==`](/reference/typeinfo/type_info/op_equal.md)を`constexpr`に対応


### 型特性
- [`<type_traits>`](/reference/type_traits.md)に、スコープ付き列挙型かを判定する型特性[`std::is_scoped_enum`](/reference/type_traits/is_scoped_enum.md)を追加
- [`<type_traits>`](/reference/type_traits.md)に、第1テンプレート引数についている型修飾を第2テンプレート引数の型に付加する型特性として、以下を追加：
    - [`std::copy_const`](/reference/type_traits/copy_const.md.nolink)
    - [`std::copy_volatile`](/reference/type_traits/copy_volatile.md.nolink)
    - [`std::copy_cv`](/reference/type_traits/copy_cv.md.nolink)
    - [`std::copy_reference`](/reference/type_traits/copy_reference.md.nolink)
    - [`std::copy_extent`](/reference/type_traits/copy_extent.md.nolink)
    - [`std::copy_all_extents`](/reference/type_traits/copy_all_extents.md.nolink)
    - [`std::copy_pointer`](/reference/type_traits/copy_pointer.md.nolink)
    - [`std::copy_all_pointers`](/reference/type_traits/copy_all_pointers.md.nolink)
    - [`std::copy_cvref`](/reference/type_traits/copy_cvref.md.nolink)
- [`<type_traits>`](/reference/type_traits.md)に、第1テンプレート引数についている型修飾を外す型特性として、以下を追加：
    - [`std::remove_all_pointers`](/reference/type_traits/remove_all_pointers.md.nolink)


### 機能の非推奨化
- [`std::algined_storage`](/reference/type_traits/aligned_storage.md)と[`std::aligned_union`](/reference/type_traits/aligned_union.md)を非推奨化。これらの機能は未定義動作を引き起こし、間違った保証が行われ、よくないAPI設計が行われていたため、非推奨となる。
    - [`std::algined_storage`](/reference/type_traits/aligned_storage.md)の代わりに`alignas(T)` [`std::byte`](/reference/cstddef/byte.md)`[sizeof(T)];`を使用することを推奨する
    - [`std::aligned_union`](/reference/type_traits/aligned_union.md)の代わりに`alignas(Ts...)` [`std::byte`](/reference/cstddef/byte.md)`[`[`std::max`](/reference/algorithm/max.md)`({sizeof(Ts)...})];`を使用することを推奨する


### 機能の削除
- ガベージコレクションの実装にうまく役立てられなかった、ガベージコレクション実装のサポートをする以下の機能を削除する：
    - [`std::declare_reachable()`](/reference/memory/declare_reachable.md)
    - [`std::undeclare_reachable()`](/reference/memory/undeclare_reachable.md)
    - [`std::declare_no_pointers()`](/reference/memory/declare_no_pointers.md)
    - [`std::undeclare_no_pointers()`](/reference/memory/undeclare_no_pointers.md)
    - [`std::get_pointer_safety()`](/reference/memory/get_pointer_safety.md)
    - [`std::pointer_safety`](/reference/memory/pointer_safety.md)
    - `__STDCPP_STRICT_POINTER_SAFETY__`マクロ

