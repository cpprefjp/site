# C++23

## 概要
C++23とは、2023年中に改訂される予定の、C++バージョンの通称である。

このバージョンは、策定中のためC++2bと呼ばれることがある。「(C++20である2020年の次の) 202b年にリリースされる」という伏せ字として「b」が使われているが、3年周期に次のバージョンが策定されることが決まっているため、伏せ字になっている年数がずれることはない。


## 言語機能

| 言語機能 | 説明 |
|----------|------|
| [(符号付き)`size_t`リテラルのためのサフィックス](cpp23/literal_suffix_for_signed_size_t.md.nolink) | `42z`/`42Z`とすることで`size_t`に対応する符号付き整数型のリテラルとする |
| [部分特殊化の汎用化仕様](cpp23/generalized_wording_for_partial_specializations.md.nolink) | 変数テンプレートの部分特殊化を許可するために部分特殊化の仕様を汎用化 |
| [文字・文字列リテラル中の数値・ユニバーサルキャラクタのエスケープに関する問題解決](cpp23/numeric_and_universal_character_escapes_in_character_and_string_literals.md.nolink) | |
| [スコープと名前ルックアップの仕様整理](cpp23/declarations_and_where_to_find_them.md.nolink) | 複雑で不完全になっているスコープと名前ルックアップの仕様を整理し、一部の問題を解決する |
| [契約に基づくプログラミング (まだ入っていない)](cpp23/contract-based_programming.md) | 事前条件、事後条件、表明を宣言する新たな属性構文を追加 |

### 小さな変更

| 言語機能 | 説明 |
|----------|------|
| [参照するPOSIX規格を更新](cpp23/update_normative_reference_to_posix.md.nolink) | 新しいPOSIX規格の機能を標準C++が参照していたため、参照するPOSIX規格のバージョンを更新 |


## ライブラリ更新の概要
### 新ライブラリ

- スタックトレースを取得するためのライブラリとして[`<stacktrace>`](/reference/stacktrace.md.nolink)を追加
- CとC++の間でのアトミック操作の相互運用のため、C互換ライブラリとして[`<stdatomic.h>`](/reference/stdatomic.h.nolink)を追加
- 契約違反のハンドリングをするためのライブラリとして[`<contract>`](/reference/contract.md)を追加 (まだ入っていない)


### 文字列
- [`std::basic_string`](/reference/string/basic_string.md)クラスと[`std::basic_string_view`](/reference/string_view/basic_string_view.md)クラスに、文字列内に指定した文字・文字列が含まれているかを判定するメンバ関数`contains()`を追加

### スマートポインタ
- [`<memory>`](/reference/memory.md)に[`std::owner_hash`](/reference/memory/owner_hash.md.nolink)と[`std::owner_equal`](/reference/memory/owner_equal.md.nolink)が追加され、非順序連想コンテナのキーとして[`std::weak_ptr`](/reference/memory/weak_ptr.md)を使用できるようになった


### 型特性
- [`<type_traits>`](/reference/type_traits.md)に、スコープ付き列挙型かを判定する型特性[`std::is_scoped_enum`](/reference/type_traits/is_scoped_enum.md.nolink)を追加
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

