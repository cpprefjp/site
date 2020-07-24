# C++23

## 概要
C++23とは、2023年中に改訂される予定の、C++バージョンの通称である。


## 言語機能

| 言語機能 | 説明 |
|----------|------|
| [契約に基づくプログラミング](cpp23/contract-based_programming.md) | 事前条件、事後条件、表明を宣言する新たな属性構文を追加 |

## ライブラリ更新の概要
### 新ライブラリ

- 契約違反のハンドリングをするためのライブラリとして[`<contract>`](/reference/contract.md)を追加

### スマートポインタ
- [`<memory>`](/reference/memory.md)に[`std::owner_hash`](/reference/memory/owner_hash.md.nolink)と[`std::owner_equal`](/reference/memory/owner_equal.md.nolink)が追加され、非順序連想コンテナのキーとして[`std::weak_ptr`](/reference/memory/weak_ptr.md)を使用できるようになった


### 型特性
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

