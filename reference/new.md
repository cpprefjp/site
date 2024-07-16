# new
* new[meta header]

`<new>`ヘッダは、プログラムが動的に記憶域を確保し、管理するための機能を定義し、記憶域の管理のエラー報告（例外の送出）についても定義する。このヘッダはグローバルネームスペースの`new`演算子および`delete`演算子をオーバーロードする。placement new を行いたい場合などに用いる。

本ヘッダはフリースタンディング環境でも提供される。

## 型

| 名前 | 説明 | 対応バージョン |
|-----------------------------------|-------------------------------------------------|-------|
| [`bad_alloc`](new/bad_alloc.md) | 何らかの理由で記憶域の動的確保に失敗するなど、`get_new_handler()`が`nullptr`を返した場合にスローされる例外(class) | |
| [`bad_array_new_length`](new/bad_array_new_length.md) | 動的に記憶域を確保しようとする配列の長さが0未満または処理系の最大値以上の場合にスローされる例外(class) | C++11 |
| [`align_val_t`](new/align_val_t.md) | デフォルトよりも大きなアライメントを要求するとき、`new` に渡されるアライメント値の型 | C++17 |
| [`nothrow_t`](new/nothrow_t.md) | 例外をスローしないための`std::nothrow`の型 | |
| [`new_handler`](new/new_handler.md) | `new`失敗時に呼ばれる関数の型 | |
| [`destroying_delete_t`](new/destroying_delete_t.md) | *destroying operator delete*を定義するためのタグ型 | C++20 |


## 関数

| 名前                                          | 説明                                           | 対応バージョン |
|-----------------------------------------------|------------------------------------------------|----------------|
| [`get_new_handler`](new/get_new_handler.md) | `new`失敗時に呼ばれる関数を取得する(function)  | C++11          |
| [`launder`](new/launder.md)   | 置き換えられたオブジェクトに適格にアクセスする(function) | C++17          |
| [`set_new_handler`](new/set_new_handler.md) | `new`失敗時に呼ばれる関数を設定する(function)  |                |
| [`operator new`](new/op_new.md)             | 動的に記憶域を確保する(function)               |                |
| [`operator new[]`](new/op_new[].md)         | 動的に配列の記憶域を確保する(function)         |                |
| [`operator delete`](new/op_delete.md)       | 動的に確保した記憶域を解放する(function)       |                |
| [`operator delete[]`](new/op_delete[].md)   | 動的に確保した配列の記憶域を解放する(function) |                |


## 干渉サイズ

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`hardware_destructive_interference_size`](new/hardware_destructive_interference_size.md) | 2つのオブジェクトに並行アクセスする際に、パフォーマンス低下を避けられる最小アライメントサイズ (variable) | C++17 |
| [`hardware_constructive_interference_size`](new/hardware_constructive_interference_size.md) | 2つのオブジェクトに一時局所的にアクセスできる最大サイズ (variable) | C++17 |

