#memory
* memory[meta header]

`<memory>`ヘッダでは、メモリアロケータ、未初期化領域に関する関数群、スマートポインタ、ガベージコレクションを作るためのユーティリティ関数といった、メモリを扱うための機能を定義する。


##メモリアロケータ

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------|--------------------------------------------|-------|
| [`allocator`](memory/allocator.md)             | メモリアロケータの標準実装(class template) | |
| [`allocator_traits`](memory/allocator_traits.md) | アロケータクラスへの間接的なアクセス(class template) | C++11 |
| [`allocator_arg_t`](memory/allocator_arg_t.md) | アロケータを引数として渡す際の、オーバーロード解決のためのタグ(class) | C++11 |
| [`allocator_arg`](memory/allocator_arg_t.md) | アロケータを引数として渡す際の、オーバーロード解決のためのタグ(constant value) | C++11 |
| [`uses_allocator`](memory/uses_allocator.md) | 型`T`がアロケータを使用するか調べる | C++11 |


##未初期化領域に対する操作

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------|--------------------------------------------|-------|
| [`raw_storage_iterator`](memory/raw_storage_iterator.md) | 未初期化領域に書き込むための出力イテレータ(class template) | |
| [`uninitialized_copy`](memory/uninitialized_copy.md) | 未初期化領域の範囲を配置`new`で初期化して出力する(function template) | |
| [`uninitialized_copy_n`](memory/uninitialized_copy_n.md) | 未初期化領域の範囲のうち、先頭`N`個の要素を配置`new`で初期化して出力する(function template) | C++11 |
| [`uninitialized_fill`](memory/uninitialized_fill.md) | 未初期化領域の範囲を、指定された値で配置`new`する(function template) | |
| [`uninitialized_fill_n`](memory/uninitialized_fill_n.md) | 未初期化領域の範囲のうち、先頭`N`個の要素を指定された値で配置`new`する(function template) | |
| [`get_temporary_buffer`](memory/get_temporary_buffer.md) | 短期的なメモリ領域を確保する(function template) | |
| [`return_temporary_buffer`](memory/return_temporary_buffer.md) | `get_temporary_buffer()`で確保された領域を解放する(function) | |


##スマートポインタ

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------|--------------------------------------------|-------|
| [`shared_ptr`](memory/shared_ptr.md) | 共有方式スマートポインタ(class template) | C++11 |
| [`make_shared`](memory/make_shared.md) | `shared_ptr`を構築するヘルパ関数(function template) | C++11 |
| [`allocate_shared`](memory/allocate_shared.md) | アロケータを指定して`shared_ptr`を構築するヘルパ関数(function template) | C++11 |
| [`enable_shared_from_this`](memory/enable_shared_from_this.md) | `this`を指す`shared_ptr`を可能にする(class template) | C++11 |
| [`weak_ptr`](memory/weak_ptr.md) | `shared_ptr`のインスタンス監視(class template) | C++11 |
| [`bad_weak_ptr`](memory/bad_weak_ptr.md) | `weak_ptr`から投げられる例外クラス(class template) | C++11 |
| [`owner_less`](memory/owner_less.md) | 所有権ベースの小なり比較(class template) | C++11 |
| [`unique_ptr`](memory/unique_ptr.md) | 専有方式スマートポインタ(class template) | C++11 |
| [`make_unique`](memory/make_unique.md) | `unique_ptr`を構築するヘルパ関数(function template) | C++14 |
| [`default_delete`](memory/default_delete.md) | `unique_ptr`のデフォルトの削除子(class template) | C++11 |
| `auto_ptr` | 古い専有方式スマートポインタ(class template) | C++11から非推奨 |

`auto_ptr`の代わりに`unique_ptr`を推奨する。

##ガベージコレクション支援

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------|--------------------------------------------|-------|
| [`pointer_safety`](memory/pointer_safety.md) | ポインタ安全性について実装/挙動を示す列挙型(enum class) | C++11 |
| [`get_pointer_safety`](memory/get_pointer_safety.md) | 処理系の、ポインタ安全性についての実装/挙動を取得する(function) | C++11 |
| [`declare_reachable`](memory/declare_reachable.md) | ポインタが到達可能であることを宣言する(function) | C++11 |
| [`undeclare_reachable`](memory/undeclare_reachable.md) | ポインタが到達可能であるという宣言を削除する(function template) | C++11 |
| [`declare_no_pointers`](memory/declare_no_pointers.md) | 指定された範囲のポインタが、追跡可能ではないことを宣言する(function) | C++11 |
| [`undeclare_no_pointers`](memory/undeclare_no_pointers.md) | `declare_no_pointers`で宣言された範囲を無効化する(function) | C++11 |


##ポインタのユーティリティ

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------|-------------------------------------------------|-------|
| [`pointer_traits`](memory/pointer_traits.md) | ポインタの型特性(class template)                | C++11 |
| [`addressof`](memory/addressof.md)           | 変数のアドレスを必ず取得する(function template) | C++11 |
| [`align`](memory/align.md)                   | アラインメント調整された領域を得る(function)    | C++11 |



