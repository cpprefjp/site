# memory
* memory[meta header]

`<memory>`ヘッダでは、メモリア�ケータ、未初期化領域に関する関数群、スマートポインタ、ガベージコレクションを作るためのユーティリティ関数といった、メモリを扱うための機能を定義する。


## メモリア�ケータ

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------|--------------------------------------------|-------|
| [`allocator`](memory/allocator.md)             | メモリア�ケータの標準実装(class template) | |
| [`allocator_traits`](memory/allocator_traits.md) | ア�ケータクラスへの間接的なアクセス(class template) | C++11 |
| [`allocator_arg_t`](memory/allocator_arg_t.md) | ア�ケータを引数として渡す際の、オーバー�ード解決のためのタグ(class) | C++11 |
| [`allocator_arg`](memory/allocator_arg_t.md) | ア�ケータを引数として渡す際の、オーバー�ード解決のためのタグ(constant value) | C++11 |
| [`uses_allocator`](memory/uses_allocator.md) | 型`T`がア�ケータを使用するか調べる | C++11 |
| [`uses_allocator_construction_args`](memory/uses_allocator_construction_args.md) | uses-allocator 構築のためのコンストラクタ引数を [`tuple`](tuple/tuple.md) 型にして返す | C++20 |
| [`make_obj_using_allocator`](memory/make_obj_using_allocator.md) | uses-allocator 構築する | C++20 |
| [`uninitialized_construct_using_allocator`](memory/uninitialized_construct_using_allocator.md) | 指定された領域に uses-allocator 構築する | C++20 |


## 未初期化領域に対する操作

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------|--------------------------------------------|-------|
| [`uninitialized_default_construct`](memory/uninitialized_default_construct.md) | 未初期化領域の範囲の各要素をデフォルト構築する(function template) | C++17 |
| [`uninitialized_default_construct_n`](memory/uninitialized_default_construct_n.md) | 未初期化領域の範囲のうち、先�`N`個の要素をデフォルト構築する(function template) | C++17 |
| [`uninitialized_value_construct`](memory/uninitialized_value_construct.md) | 未初期化領域の範囲の各要素配置を値構築する(function template) | C++17 |
| [`uninitialized_value_construct_n`](memory/uninitialized_value_construct_n.md) | 未初期化領域の範囲のうち、先�`N`個の要素を値構築する(function template) | C++17 |
| [`uninitialized_copy`](memory/uninitialized_copy.md) | 未初期化領域の範囲を配置`new`で初期化してコピー出力する(function template) | |
| [`uninitialized_copy_n`](memory/uninitialized_copy_n.md) | 未初期化領域の範囲のうち、先�`N`個の要素を配置`new`で初期化してコピー出力する(function template) | C++11 |
| [`uninitialized_move`](memory/uninitialized_move.md) | 未初期化領域の範囲を配置`new`で初期化してムーブ出力する(function template) | |
| [`uninitialized_move_n`](memory/uninitialized_move_n.md) | 未初期化領域の範囲のうち、先�`N`個の要素を配置`new`で初期化してムーブ出力する(function template) | C++11 |
| [`uninitialized_fill`](memory/uninitialized_fill.md) | 未初期化領域の範囲を、指定された値で配置`new`する(function template) | |
| [`uninitialized_fill_n`](memory/uninitialized_fill_n.md) | 未初期化領域の範囲のうち、先�`N`個の要素を指定された値で配置`new`する(function template) | |
| [`destroy_at`](memory/destroy_at.md) | デストラクタを呼び出す | C++17 |
| [`destroy`](memory/destroy.md) | 範囲の各要素に対してデストラクタを呼び出す | C++17 |
| [`destroy_n`](memory/destroy_n.md) | 範囲のうち、先�`N`個の要素に対してデストラクタを呼び出す | C++17 |
| [`raw_storage_iterator`](memory/raw_storage_iterator.md) | 未初期化領域に書き込むための出力イテレータ(class template) | C++17から非推奨<br/> C++20で削除 |
| [`get_temporary_buffer`](memory/get_temporary_buffer.md) | �期的なメモリ領域を確保する(function template) | C++17から非推奨<br/> C++20で削除 |
| [`return_temporary_buffer`](memory/return_temporary_buffer.md) | `get_temporary_buffer()`で確保された領域を解放する(function) | C++17から非推奨<br/> C++20で削除 |


## スマートポインタ

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------|--------------------------------------------|-------|
| [`shared_ptr`](memory/shared_ptr.md) | 共有方式スマートポインタ(class template) | C++11 |
| [`make_shared`](memory/make_shared.md) | `shared_ptr`を構築するヘルパ関数(function template) | C++11 |
| [`make_shared_default_init`](memory/make_shared_default_init.md) | `shared_ptr`を構築するヘルパ関数(function template) | C++20 |
| [`allocate_shared`](memory/allocate_shared.md) | ア�ケータを指定して`shared_ptr`を構築するヘルパ関数(function template) | C++11 |
| [`allocate_shared_default_init`](memory/allocate_shared_default_init.md) | ア�ケータを指定して`shared_ptr`を構築するヘルパ関数(function template) | C++20 |
| [`enable_shared_from_this`](memory/enable_shared_from_this.md) | `this`を指す`shared_ptr`を可能にする(class template) | C++11 |
| [`weak_ptr`](memory/weak_ptr.md) | `shared_ptr`のインスタンス監視(class template) | C++11 |
| [`bad_weak_ptr`](memory/bad_weak_ptr.md) | `weak_ptr`から投げられる例外クラス(class template) | C++11 |
| [`owner_less`](memory/owner_less.md) | 所有権ベースの小なり比較(class template) | C++11 |
| [`unique_ptr`](memory/unique_ptr.md) | 専有方式スマートポインタ(class template) | C++11 |
| [`make_unique`](memory/make_unique.md) | `unique_ptr`を構築するヘルパ関数(function template) | C++14 |
| [`make_unique_default_init`](memory/make_unique_default_init.md) | `unique_ptr`を構築するヘルパ関数(function template) | C++20 |
| [`default_delete`](memory/default_delete.md) | `unique_ptr`のデフォルトの削除�(class template) | C++11 |
| `auto_ptr` | 古い専有方式スマートポインタ(class template) | C++11から非推奨<br/> C++17で削除 |


## スマートポインタのアトミック操作

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `template<class T> struct atomic` | `atomic`クラスの先行宣言 (class template) | C++20 |
| [`template<class T> struct atomic<shared_ptr<T>>;`](memory/atomic.md) | `atomic`クラスの`shared_ptr`に対する特殊化 (class template) | C++20 |
| [`template<class T> struct atomic<weak_ptr<T>>;`](memory/atomic.md)   | `atomic`クラスの`weak_ptr`に対する特殊化 (class template) | C++20 |
| `atomic_is_lock_free` | `shared_ptr`に対するアトミック操作が�ックフリーに振る舞うことができるかを調べる (function template) | C++11<br/> C++20で非推奨 |
| `atomic_load` | `shared_ptr`の値をアトミックに�み込む (function template) | C++11<br/> C++20で非推奨 |
| `atomic_load_explicit` | メモリオーダーを指定して、`shared_ptr`の値をアトミックに�み込む (function template) | C++11<br/> C++20で非推奨 |
| `atomic_store` | `shared_ptr`値をアトミックに書き込む (function template) | C++11<br/> C++20で非推奨 |
| `atomic_store_explicit` | メモリオーダーを指定して、`shared_ptr`の値をアトミックに書き込む (function template) | C++11<br/> C++20で非推奨 |
| `atomic_exchange` | `shared_ptr`の値をアトミックに入れ替える (function template) | C++11<br/> C++20で非推奨 |
| `atomic_exchange_explicit` | メモリオーダーを指定して、`shared_ptr`の値をアトミックに入れ替える (function template) | C++11<br/> C++20で非推奨 |
| `atomic_compare_exchange_weak` | 弱い比較で`shared_ptr`の値の入れ替えをアトミックに行う (function template) | C++11<br/> C++20で非推奨 |
| `atomic_compare_exchange_strong` | 強い比較で`shared_ptr`の値の入れ替えをアトミックに行う (function template) | C++11<br/> C++20で非推奨 |
| `atomic_compare_exchange_weak_explicit` | 弱い比較でメモリオーダーを指定して、`shared_ptr`の値の入れ替えをアトミックに行う (function template) | C++11<br/> C++20で非推奨 |
| `atomic_compare_exchange_strong_explicit` | 強い比較でメモリオーダーを指定して、`shared_ptr`の値の入れ替えをアトミックに行う (function template) | C++11<br/> C++20で非推奨 |


## ガベージコレクション支援

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------|--------------------------------------------|-------|
| [`pointer_safety`](memory/pointer_safety.md) | ポインタ安全性について実装/挙動を示す列挙型(enum class) | C++11 |
| [`get_pointer_safety`](memory/get_pointer_safety.md) | 処理系の、ポインタ安全性についての実装/挙動を取得する(function) | C++11 |
| [`declare_reachable`](memory/declare_reachable.md) | ポインタが到達可能であることを宣言する(function) | C++11 |
| [`undeclare_reachable`](memory/undeclare_reachable.md) | ポインタが到達可能であるという宣言を削除する(function template) | C++11 |
| [`declare_no_pointers`](memory/declare_no_pointers.md) | 指定された範囲のポインタが、追跡可能ではないことを宣言する(function) | C++11 |
| [`undeclare_no_pointers`](memory/undeclare_no_pointers.md) | `declare_no_pointers`で宣言された範囲を無効化する(function) | C++11 |


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
