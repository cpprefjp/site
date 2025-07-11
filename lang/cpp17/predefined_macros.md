# 更新された定義済みマクロ
* cpp17[meta cpp]

<!-- start lang caution -->

このページはC++17に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要

定義済みマクロの値が、以下のように更新された：

| マクロ名      | 値        | 説明                    |
|---------------|-----------|-------------------------|
| `__cplusplus` | `201703L` | C++のバージョン値を表す |

新規マクロは以下：

| マクロ名      | 値        | 説明                    |
|---------------|-----------|-------------------------|
| `__STDCPP_DEFAULT_NEW_ALIGNMENT__` | 実装定義 | 動的メモリ確保時のデフォルトのアライメント値 |


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++17 アライメント指定されたデータの動的メモリ確保](dynamic_memory_allocation_for_over-aligned_data.md)
