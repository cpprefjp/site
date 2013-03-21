`<atomic>`ヘッダでは、アトミック操作(atomic operation ： 不可分操作とも呼ばれる)のライブラリを提供する。

アトミック操作は、スレッド間でデータをやり取りするための最も基本的な同期プリミティブであり、
変数への不可分(atomic)な読み込みや書き込み、および読み書きを同時に行う操作(Read-Modify-Write operation)を提供する。

<b>順序と一貫性</b>

| | |
|--------------------------------------------------------------------------------------------------------------------|------------------------------------------------|
| [`memory_order`](https://sites.google.com/site/cpprefjp/reference/atomic/memory_order) | メモリオーダーの種類(enum) |
| [`kill_dependency`](https://sites.google.com/site/cpprefjp/reference/atomic/kill_dependency) | データ依存性を切る(function template) |


<b>ロックフリープロパティ</b>

| | |
|---------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| [`ATOMIC_BOOL_LOCK_FREE`](https://sites.google.com/site/cpprefjp/reference/atomic/lock_free_property) | `atomic<bool>`に対する操作がロックフリーかを調べる(define) |
| [`ATOMIC_CHAR_LOCK_FREE`](https://sites.google.com/site/cpprefjp/reference/atomic/lock_free_property) | `atomic<char>`に対する操作がロックフリーかを調べる(define) |
| [`ATOMIC_CHAR16_T_LOCK_FREE`](https://sites.google.com/site/cpprefjp/reference/atomic/lock_free_property) | `atomic<char16_t>`に対する操作がロックフリーかを調べる(define) |
| [`ATOMIC_CHAR32_T_LOCK_FREE`](https://sites.google.com/site/cpprefjp/reference/atomic/lock_free_property) | `atomic<char32_t>`に対する操作がロックフリーかを調べる(define) |
| [`ATOMIC_WCHAR_T_LOCK_FREE`](https://sites.google.com/site/cpprefjp/reference/atomic/lock_free_property) | `atomic<wchar_t>`に対する操作がロックフリーかを調べる(define) |
| [`ATOMIC_SHORT_LOCK_FREE`](https://sites.google.com/site/cpprefjp/reference/atomic/lock_free_property) | `atomic<short>`に対する操作がロックフリーかを調べる(define) |
| [`ATOMIC_INT_LOCK_FREE`](https://sites.google.com/site/cpprefjp/reference/atomic/lock_free_property) | `atomic<int>`に対する操作がロックフリーかを調べる(define) |
| [`ATOMIC_LONG_LOCK_FREE`](https://sites.google.com/site/cpprefjp/reference/atomic/lock_free_property) | `atomic<long>`に対する操作がロックフリーかを調べる(define) |
| [`ATOMIC_LLONG_LOCK_FREE`](https://sites.google.com/site/cpprefjp/reference/atomic/lock_free_property) | `atomic<long long>`に対する操作がロックフリーかを調べる(define) |
| [`ATOMIC_POINTER_LOCK_FREE`](https://sites.google.com/site/cpprefjp/reference/atomic/lock_free_property) | `atomic<T*>`に対する操作がロックフリーかを調べる(define) |

<b>汎用型</b>

| | |
|--------------------------------------------------------------------------------------------------|------------------------------------|
| [`atomic`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic) | アトミック型(class template) |

<b>アトミック型に対する一般的な操作</b>

| | |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| [`atomic_is_lock_free`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic_is_lock_free) | 指定されたオブジェクトがロックフリーに振る舞うことができるかを調べる(function template) |
| [`atomic_init`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic_init) | 初期化(function template) |
| [`atomic_store`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic_store) | 値を書き込む(function template) |
| [`atomic_store_explicit`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic_store_explicit) | メモリオーダーを指定して値を書き込む(function template) |
| [`atomic_load`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic_load) | 値を読み込む(function template) |
| [`atomic_load_explicit`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic_load_explicit) | メモリオーダーを指定して値を読み込む(function template) |
| [`atomic_exchange`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic_exchange) | 値を入れ替える(function template) |
| [`atomic_exchange_explicit`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic_exchange_explicit) | メモリオーダーを指定して値を入れ替える(function template) |
| [`atomic_compare_exchange_weak`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic_compare_exchange_weak) | 弱い比較で値の入れ替えを行う(function template) |
| [`atomic_compare_exchange_strong`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic_compare_exchange_strong) | 強い比較で値の入れ替えを行う(function template) |
| [`atomic_compare_exchange_weak_explicit`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic_compare_exchange_weak_explicit) | 弱い比較でメモリオーダーを指定して値の入れ替えを行う(function template) |
| [`atomic_compare_exchange_strong_explicit`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic_compare_exchange_strong_explicit) | 強い比較でメモリオーダーを指定して値の入れ替えを行う(function template) |

<b>アトミック型に対する算術操作</b>

| | |
|----------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------|
| [`atomic_fetch_add`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic_fetch_add) | 加算(function template) |
| [`atomic_fetch_add_explicit`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic_fetch_add_explicit) | メモリオーダーを指定して加算(function template) |
| [`atomic_fetch_sub`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic_fetch_sub) | 減算(function template) |
| [`atomic_fetch_sub_explicit`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic_fetch_sub_explicit) | メモリオーダーを指定して減算(function template) |
| [`atomic_fetch_and`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic_fetch_and) | AND演算(function template) |
| [`atomic_fetch_and_explicit`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic_fetch_and_explicit) | メモリオーダーを指定してAND演算(function template) |
| [`atomic_fetch_or`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic_fetch_or) | OR演算(function template) |
| [`atomic_fetch_or_explicit`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic_fetch_or_explicit) | メモリオーダーを指定してOR演算(function template) |
| [`atomic_fetch_xor`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic_fetch_xor) | XOR演算(function template) |
| [`atomic_fetch_xor_explicit`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic_fetch_xor_explicit) | メモリオーダーを指定してXOR演算(function template) |

<b>初期化</b>

| | |
|--------------------------------------------------------------------------------------------------------------------|-------------------------------------------|
| [`ATOMIC_VAR_INIT`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic_var_init) | アトミック変数の初期化(define) |

<b>フラグ型とその操作</b>

| | |
|--------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------|
| [`atomic_flag`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic_flag) | フラグ用アトミック型(class) |
| [`atomic_flag_test_and_set`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic_flag_test_and_set) | フラグを立てる(function) |
| [`atomic_flag_test_and_set_explicit`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic_flag_test_and_set_explicit) | メモリオーダーを指定してフラグを立てる(function) |
| [`atomic_flag_clear`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic_flag_clear) | フラグをクリアする(function) |
| [`atomic_flag_clear_explicit`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic_flag_clear_explicit) | メモリオーダーを指定してフラグをクリアする(function) |
| [`ATOMIC_FLAG_INIT`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic_flag_init) | フラグ変数の初期化(define) |

<b>フェンス</b>

| | |
|----------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| [`atomic_thread_fence`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic_thread_fence) | スレッド間で有効なフェンスを設定する(function) |
| [`atomic_signal_fence`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic_signal_fence) | スレッドと、そのスレッド上で処理されるシグナルハンドラとの間でのみ有効なフェンスを設定する(function) |


##バージョン

###言語

- C++11

<b>参照</b>[N2047 An Atomic Operations Library for C++](http://www.open-std.org/JTC1/SC22/WG21/docs/papers/2006/n2047.html)
[Boost Atomic Library](http://www.boost.org/doc/libs/release/libs/atomic/)

