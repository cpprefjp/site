# memory
* memory[meta header]

`<memory>`ヘッダでは、メモリアロケータ、未初期化領域に関する関数群、スマートポインタ、ガベージコレクションを作るためのユーティリティ関数といった、メモリを扱うための機能を定義する。

このヘッダでは、以下の標準ヘッダをインクルードする：

- [`<compare>`](compare.md) (C++20)


## メモリアロケータ

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------|--------------------------------------------|-------|
| [`allocator`](memory/allocator.md)             | メモリアロケータの標準実装(class template) | |
| [`allocator_traits`](memory/allocator_traits.md) | アロケータクラスへの間接的なアクセス(class template) | C++11 |
| [`allocation_result`](memory/allocation_result.md) | [`allocate_at_least()`](memory/allocator/allocate_at_least.md)関数の戻り値型 | C++23 |
| [`allocator_arg_t`](memory/allocator_arg_t.md) | アロケータを引数として渡す際の、オーバーロード解決のためのタグ(class) | C++11 |
| [`allocator_arg`](memory/allocator_arg_t.md) | アロケータを引数として渡す際の、オーバーロード解決のためのタグ(constant value) | C++11 |
| [`uses_allocator`](memory/uses_allocator.md) | 型`T`がアロケータを使用するか調べる | C++11 |
| [`uses_allocator_construction_args`](memory/uses_allocator_construction_args.md) | uses-allocator 構築のためのコンストラクタ引数を [`tuple`](tuple/tuple.md) 型にして返す | C++20 |
| [`make_obj_using_allocator`](memory/make_obj_using_allocator.md) | uses-allocator 構築する | C++20 |
| [`uninitialized_construct_using_allocator`](memory/uninitialized_construct_using_allocator.md) | 指定された領域に uses-allocator 構築する | C++20 |


## メモリ特化のコンセプト

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`no-throw-input-iterator`](memory/no-throw-input-iterator.md) | 各操作で例外送出をしない説明用の入力イテレータ (concept) | C++20 |
| [`no-throw-forward-iterator`](memory/no-throw-forward-iterator.md) | 各操作で例外送出をしない説明用の前方向イテレータ (concept) | C++20 |
| [`no-throw-sentinel`](memory/no-throw-sentinel.md) | 各操作で例外送出をしない説明用の番兵 (concept) | C++20 |
| [`no-throw-input-range`](memory/no-throw-input-range.md) | 各操作で例外送出をしない入力Range (concept) | C++20 |
| [`no-throw-forward-range`](memory/no-throw-forward-range.md) | 各操作で例外送出をしない前方向Range (concept) | C++20 |


## 未初期化領域に対する操作

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------|--------------------------------------------|-------|
| [`uninitialized_default_construct`](memory/uninitialized_default_construct.md) | 未初期化領域の範囲の各要素をデフォルト構築する(function template) | C++17 |
| [`uninitialized_default_construct_n`](memory/uninitialized_default_construct_n.md) | 未初期化領域の範囲のうち、先頭`N`個の要素をデフォルト構築する(function template) | C++17 |
| [`uninitialized_value_construct`](memory/uninitialized_value_construct.md) | 未初期化領域の範囲の各要素配置を値構築する(function template) | C++17 |
| [`uninitialized_value_construct_n`](memory/uninitialized_value_construct_n.md) | 未初期化領域の範囲のうち、先頭`N`個の要素を値構築する(function template) | C++17 |
| [`uninitialized_copy`](memory/uninitialized_copy.md) | 未初期化領域の範囲を配置`new`で初期化してコピー出力する(function template) | |
| [`uninitialized_copy_n`](memory/uninitialized_copy_n.md) | 未初期化領域の範囲のうち、先頭`N`個の要素を配置`new`で初期化してコピー出力する(function template) | C++11 |
| [`uninitialized_move`](memory/uninitialized_move.md) | 未初期化領域の範囲を配置`new`で初期化してムーブ出力する(function template) | |
| [`uninitialized_move_n`](memory/uninitialized_move_n.md) | 未初期化領域の範囲のうち、先頭`N`個の要素を配置`new`で初期化してムーブ出力する(function template) | C++11 |
| [`uninitialized_fill`](memory/uninitialized_fill.md) | 未初期化領域の範囲を、指定された値で配置`new`する(function template) | |
| [`uninitialized_fill_n`](memory/uninitialized_fill_n.md) | 未初期化領域の範囲のうち、先頭`N`個の要素を指定された値で配置`new`する(function template) | |
| [`construct_at`](memory/construct_at.md) | コンストラクタを呼び出す(function template) | C++20 |
| [`destroy_at`](memory/destroy_at.md) | デストラクタを呼び出す(function template) | C++17 |
| [`destroy`](memory/destroy.md) | 範囲の各要素に対してデストラクタを呼び出す(function template) | C++17 |
| [`destroy_n`](memory/destroy_n.md) | 範囲のうち、先頭`N`個の要素に対してデストラクタを呼び出す(function template) | C++17 |
| [`ranges::uninitialized_default_construct`](memory/ranges_uninitialized_default_construct.md) | 未初期化領域の範囲の各要素をデフォルト構築する(function template) | C++20 |
| [`ranges::uninitialized_default_construct_n`](memory/ranges_uninitialized_default_construct_n.md) | 未初期化領域の範囲のうち、先頭`N`個の要素をデフォルト構築する(function template) | C++20 |
| [`ranges::uninitialized_value_construct`](memory/ranges_uninitialized_value_construct.md) | 未初期化領域の範囲の各要素配置を値構築する(function template) | C++20 |
| [`ranges::uninitialized_value_construct_n`](memory/ranges_uninitialized_value_construct_n.md) | 未初期化領域の範囲のうち、先頭`N`個の要素を値構築する(function template) | C++20 |
| [`ranges::uninitialized_copy`](memory/ranges_uninitialized_copy.md) | 未初期化領域の範囲を配置`new`で初期化してコピー出力する(function template) | C++20 |
| [`ranges::uninitialized_copy_n`](memory/ranges_uninitialized_copy_n.md) | 未初期化領域の範囲のうち、先頭`N`個の要素を配置`new`で初期化してコピー出力する(function template) | C++20 |
| [`ranges::uninitialized_move`](memory/ranges_uninitialized_move.md) | 未初期化領域の範囲を配置`new`で初期化してムーブ出力する(function template) | C++20 |
| [`ranges::uninitialized_move_n`](memory/ranges_uninitialized_move_n.md) | 未初期化領域の範囲のうち、先頭`N`個の要素を配置`new`で初期化してムーブ出力する(function template) | C++20 |
| [`ranges::uninitialized_fill`](memory/ranges_uninitialized_fill.md) | 未初期化領域の範囲を、指定された値で配置`new`する(function template) | C++20 |
| [`ranges::uninitialized_fill_n`](memory/ranges_uninitialized_fill_n.md) | 未初期化領域の範囲のうち、先頭`N`個の要素を指定された値で配置`new`する(function template) | C++20 |
| [`ranges::construct_at`](memory/ranges_construct_at.md) | コンストラクタを呼び出す(function template) | C++20 |
| [`ranges::destroy_at`](memory/ranges_destroy_at.md) | デストラクタを呼び出す(function template) | C++20 |
| [`ranges::destroy`](memory/ranges_destroy.md) | 範囲の各要素に対してデストラクタを呼び出す(function template) | C++20 |
| [`ranges::destroy_n`](memory/ranges_destroy_n.md) | 範囲のうち、先頭`N`個の要素に対してデストラクタを呼び出す(function template) | C++20 |
| [`raw_storage_iterator`](memory/raw_storage_iterator.md) | 未初期化領域に書き込むための出力イテレータ(class template) | C++17から非推奨<br/> C++20で削除 |
| [`get_temporary_buffer`](memory/get_temporary_buffer.md) | 短期的なメモリ領域を確保する(function template) | C++17から非推奨<br/> C++20で削除 |
| [`return_temporary_buffer`](memory/return_temporary_buffer.md) | `get_temporary_buffer()`で確保された領域を解放する(function) | C++17から非推奨<br/> C++20で削除 |


## スマートポインタ

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------|--------------------------------------------|-------|
| [`shared_ptr`](memory/shared_ptr.md) | 共有方式スマートポインタ(class template) | C++11 |
| [`make_shared`](memory/make_shared.md) | `shared_ptr`を構築するヘルパ関数(function template) | C++11 |
| [`make_shared_for_overwrite`](memory/make_shared_for_overwrite.md) | `shared_ptr`を構築するヘルパ関数(function template) | C++20 |
| [`allocate_shared`](memory/allocate_shared.md) | アロケータを指定して`shared_ptr`を構築するヘルパ関数(function template) | C++11 |
| [`allocate_shared_for_overwrite`](memory/allocate_shared_for_overwrite.md) | アロケータを指定して`shared_ptr`を構築するヘルパ関数(function template) | C++20 |
| [`enable_shared_from_this`](memory/enable_shared_from_this.md) | `this`を指す`shared_ptr`を可能にする(class template) | C++11 |
| [`weak_ptr`](memory/weak_ptr.md) | `shared_ptr`のインスタンス監視(class template) | C++11 |
| [`bad_weak_ptr`](memory/bad_weak_ptr.md) | `weak_ptr`から投げられる例外クラス(class template) | C++11 |
| [`owner_less`](memory/owner_less.md) | 所有権ベースの小なり比較(class template) | C++11 |
| [`unique_ptr`](memory/unique_ptr.md) | 専有方式スマートポインタ(class template) | C++11 |
| [`make_unique`](memory/make_unique.md) | `unique_ptr`を構築するヘルパ関数(function template) | C++14 |
| [`make_unique_for_overwrite`](memory/make_unique_for_overwrite.md) | `unique_ptr`を構築するヘルパ関数(function template) | C++20 |
| [`default_delete`](memory/default_delete.md) | `unique_ptr`のデフォルトの削除子(class template) | C++11 |
| `auto_ptr` | 古い専有方式スマートポインタ(class template) | C++11から非推奨<br/> C++17で削除 |


## スマートポインタアダプタ

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`out_ptr_t`](memory/out_ptr_t.md) | スマートポインタへの出力サポート(class template) | C++23 |
| [`out_ptr`](memory/out_ptr.md) | スマートポインタへの出力サポートヘルパ関数(function template) | C++23 |
| [`inout_ptr_t`](memory/inout_ptr_t.md) | スマートポインタへの入出力サポート(class template) | C++23 |
| [`inout_ptr`](memory/inout_ptr.md) | スマートポインタへの入出力サポートヘルパ関数(function template) | C++23 |


## スマートポインタのアトミック操作

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `template<class T> struct atomic` | `atomic`クラスの先行宣言 (class template) | C++20 |
| [`template<class T> struct atomic<shared_ptr<T>>;`](memory/atomic.md) | `atomic`クラスの`shared_ptr`に対する特殊化 (class template) | C++20 |
| [`template<class T> struct atomic<weak_ptr<T>>;`](memory/atomic.md)   | `atomic`クラスの`weak_ptr`に対する特殊化 (class template) | C++20 |
| `atomic_is_lock_free` | `shared_ptr`に対するアトミック操作がロックフリーに振る舞うことができるかを調べる (function template) | C++11<br/> C++20で非推奨 |
| `atomic_load` | `shared_ptr`の値をアトミックに読み込む (function template) | C++11<br/> C++20で非推奨 |
| `atomic_load_explicit` | メモリオーダーを指定して、`shared_ptr`の値をアトミックに読み込む (function template) | C++11<br/> C++20で非推奨 |
| `atomic_store` | `shared_ptr`値をアトミックに書き込む (function template) | C++11<br/> C++20で非推奨 |
| `atomic_store_explicit` | メモリオーダーを指定して、`shared_ptr`の値をアトミックに書き込む (function template) | C++11<br/> C++20で非推奨 |
| `atomic_exchange` | `shared_ptr`の値をアトミックに入れ替える (function template) | C++11<br/> C++20で非推奨 |
| `atomic_exchange_explicit` | メモリオーダーを指定して、`shared_ptr`の値をアトミックに入れ替える (function template) | C++11<br/> C++20で非推奨 |
| `atomic_compare_exchange_weak` | 弱い比較で`shared_ptr`の値の入れ替えをアトミックに行う (function template) | C++11<br/> C++20で非推奨 |
| `atomic_compare_exchange_strong` | 強い比較で`shared_ptr`の値の入れ替えをアトミックに行う (function template) | C++11<br/> C++20で非推奨 |
| `atomic_compare_exchange_weak_explicit` | 弱い比較でメモリオーダーを指定して、`shared_ptr`の値の入れ替えをアトミックに行う (function template) | C++11<br/> C++20で非推奨 |
| `atomic_compare_exchange_strong_explicit` | 強い比較でメモリオーダーを指定して、`shared_ptr`の値の入れ替えをアトミックに行う (function template) | C++11<br/> C++20で非推奨 |


## ガベージコレクション支援（C++23で削除）

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------|--------------------------------------------|-------|
| [`pointer_safety`](memory/pointer_safety.md) | ポインタ安全性について実装/挙動を示す列挙型(enum class) | C++11<br/>C++23で削除 |
| [`get_pointer_safety`](memory/get_pointer_safety.md) | 処理系の、ポインタ安全性についての実装/挙動を取得する(function) | C++11<br/>C++23で削除 |
| [`declare_reachable`](memory/declare_reachable.md) | ポインタが到達可能であることを宣言する(function) | C++11<br/>C++23で削除 |
| [`undeclare_reachable`](memory/undeclare_reachable.md) | ポインタが到達可能であるという宣言を削除する(function template) | C++11<br/>C++23で削除 |
| [`declare_no_pointers`](memory/declare_no_pointers.md) | 指定された範囲のポインタが、追跡可能ではないことを宣言する(function) | C++11<br/>C++23で削除 |
| [`undeclare_no_pointers`](memory/undeclare_no_pointers.md) | `declare_no_pointers`で宣言された範囲を無効化する(function) | C++11<br/>C++23で削除 |


## ポインタのユーティリティ

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------|-------------------------------------------------|-------|
| [`pointer_traits`](memory/pointer_traits.md) | ポインタの型特性(class template)                | C++11 |
| [`to_address`](memory/to_address.md)         | ポインタと見なせるオブジェクトからアドレスを取得する (function template) | C++20 |
| [`addressof`](memory/addressof.md)           | 変数のアドレスを必ず取得する(function template) | C++11 |
| [`align`](memory/align.md)                   | アライメント調整された領域を得る(function)      | C++11 |
| [`assume_aligned`](memory/assume_aligned.md) | コンパイラへアライメントのヒントを与える(function template) | C++20 |


## 参照
- [N4190 Removing `auto_ptr`, `random_shuffle()`, And Old `<functional>` Stuff](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4190.htm)
- [P0718R2 Revising `atomic_shared_ptr` for C++20](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0718r2.html)
- [P2051R0 C++ Standard Library Issues to be moved in Prague](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2051r0.html)
- [P2186R2 Removing Garbage Collection Support](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2186r2.html)
- [P1132R8 out_ptr - a scalable output pointer abstraction](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p1132r8.html)
