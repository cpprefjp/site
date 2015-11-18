#atomic
* atomic[meta header]
* cpp11[meta cpp]

`<atomic>`ヘッダでは、アトミック操作(atomic operation ： 不可分操作とも呼ばれる)のライブラリを提供する。

アトミック操作は、スレッド間でデータをやり取りするための最も基本的な同期プリミティブであり、
変数への不可分(atomic)な読み込みや書き込み、および読み書きを同時に行う操作(Read-Modify-Write operation)を提供する。

##順序と一貫性

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------|---------------------------------------------|-------|
| [`memory_order`](atomic/memory_order.md) | メモリオーダーの種類(enum) | C++11 |
| [`kill_dependency`](atomic/kill_dependency.md) | データ依存性を切る(function template) | C++11 |


##ロックフリープロパティ

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------------------------|------------------------------------------------------------|-------|
| [`ATOMIC_BOOL_LOCK_FREE`](atomic/lock_free_property.md) | `atomic<bool>`に対する操作がロックフリーかを調べる(define) | C++11 |
| [`ATOMIC_CHAR_LOCK_FREE`](atomic/lock_free_property.md) | `atomic<char>`に対する操作がロックフリーかを調べる(define) | C++11 |
| [`ATOMIC_CHAR16_T_LOCK_FREE`](atomic/lock_free_property.md) | `atomic<char16_t>`に対する操作がロックフリーかを調べる(define) | C++11 |
| [`ATOMIC_CHAR32_T_LOCK_FREE`](atomic/lock_free_property.md) | `atomic<char32_t>`に対する操作がロックフリーかを調べる(define) | C++11 |
| [`ATOMIC_WCHAR_T_LOCK_FREE`](atomic/lock_free_property.md) | `atomic<wchar_t>`に対する操作がロックフリーかを調べる(define) | C++11 |
| [`ATOMIC_SHORT_LOCK_FREE`](atomic/lock_free_property.md) | `atomic<short>`に対する操作がロックフリーかを調べる(define) | C++11 |
| [`ATOMIC_INT_LOCK_FREE`](atomic/lock_free_property.md) | `atomic<int>`に対する操作がロックフリーかを調べる(define) | C++11 |
| [`ATOMIC_LONG_LOCK_FREE`](atomic/lock_free_property.md) | `atomic<long>`に対する操作がロックフリーかを調べる(define) | C++11 |
| [`ATOMIC_LLONG_LOCK_FREE`](atomic/lock_free_property.md) | `atomic<long long>`に対する操作がロックフリーかを調べる(define) | C++11 |
| [`ATOMIC_POINTER_LOCK_FREE`](atomic/lock_free_property.md) | `atomic<T*>`に対する操作がロックフリーかを調べる(define) | C++11 |


##汎用型

| 名前 | 説明 | 対応バージョン |
|--------------------------------|------------------------------|-------|
| [`atomic`](atomic/atomic.md) | アトミック型(class template) | C++11 |


##アトミック型に対する一般的な操作

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------|--------------------------------------------------------------|-------|
| [`atomic_is_lock_free`](atomic/atomic_is_lock_free.md) | 指定されたオブジェクトがロックフリーに振る舞うことができるかを調べる(function template) | C++11 |
| [`atomic_init`](atomic/atomic_init.md) | 初期化(function template) | C++11 |
| [`atomic_store`](atomic/atomic_store.md) | 値を書き込む(function template) | C++11 |
| [`atomic_store_explicit`](atomic/atomic_store_explicit.md) | メモリオーダーを指定して値を書き込む(function template) | C++11 |
| [`atomic_load`](atomic/atomic_load.md) | 値を読み込む(function template) | C++11 |
| [`atomic_load_explicit`](atomic/atomic_load_explicit.md) | メモリオーダーを指定して値を読み込む(function template) | C++11 |
| [`atomic_exchange`](atomic/atomic_exchange.md) | 値を入れ替える(function template) | C++11 |
| [`atomic_exchange_explicit`](atomic/atomic_exchange_explicit.md) | メモリオーダーを指定して値を入れ替える(function template) | C++11 |
| [`atomic_compare_exchange_weak`](atomic/atomic_compare_exchange_weak.md) | 弱い比較で値の入れ替えを行う(function template) | C++11 |
| [`atomic_compare_exchange_strong`](atomic/atomic_compare_exchange_strong.md) | 強い比較で値の入れ替えを行う(function template) | C++11 |
| [`atomic_compare_exchange_weak_explicit`](atomic/atomic_compare_exchange_weak_explicit.md) | 弱い比較でメモリオーダーを指定して値の入れ替えを行う(function template) | C++11 |
| [`atomic_compare_exchange_strong_explicit`](atomic/atomic_compare_exchange_strong_explicit.md) | 強い比較でメモリオーダーを指定して値の入れ替えを行う(function template) | C++11 |


##アトミック型に対する算術操作

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------|-------------------------|-------|
| [`atomic_fetch_add`](atomic/atomic_fetch_add.md) | 加算(function template) | C++11 |
| [`atomic_fetch_add_explicit`](atomic/atomic_fetch_add_explicit.md) | メモリオーダーを指定して加算(function template) | C++11 |
| [`atomic_fetch_sub`](atomic/atomic_fetch_sub.md) | 減算(function template) | C++11 |
| [`atomic_fetch_sub_explicit`](atomic/atomic_fetch_sub_explicit.md) | メモリオーダーを指定して減算(function template) | C++11 |
| [`atomic_fetch_and`](atomic/atomic_fetch_and.md) | AND演算(function template) | C++11 |
| [`atomic_fetch_and_explicit`](atomic/atomic_fetch_and_explicit.md) | メモリオーダーを指定してAND演算(function template) | C++11 |
| [`atomic_fetch_or`](atomic/atomic_fetch_or.md) | OR演算(function template) | C++11 |
| [`atomic_fetch_or_explicit`](atomic/atomic_fetch_or_explicit.md) | メモリオーダーを指定してOR演算(function template) | C++11 |
| [`atomic_fetch_xor`](atomic/atomic_fetch_xor.md) | XOR演算(function template) | C++11 |
| [`atomic_fetch_xor_explicit`](atomic/atomic_fetch_xor_explicit.md) | メモリオーダーを指定してXOR演算(function template) | C++11 |


##初期化

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------|--------------------------------|-------|
| [`ATOMIC_VAR_INIT`](atomic/atomic_var_init.md) | アトミック変数の初期化(define) | C++11 |


##フラグ型とその操作

| 名前 | 説明 | 対応バージョン |
|------------------------------------------|-----------------------------|-------|
| [`atomic_flag`](atomic/atomic_flag.md) | フラグ用アトミック型(class) | C++11 |
| [`atomic_flag_test_and_set`](atomic/atomic_flag_test_and_set.md) | フラグを立てる(function) | C++11 |
| [`atomic_flag_test_and_set_explicit`](atomic/atomic_flag_test_and_set_explicit.md) | メモリオーダーを指定してフラグを立てる(function) | C++11 |
| [`atomic_flag_clear`](atomic/atomic_flag_clear.md) | フラグをクリアする(function) | C++11 |
| [`atomic_flag_clear_explicit`](atomic/atomic_flag_clear_explicit.md) | メモリオーダーを指定してフラグをクリアする(function) | C++11 |
| [`ATOMIC_FLAG_INIT`](atomic/atomic_flag_init.md) | フラグ変数の初期化(define) | C++11 |


##フェンス

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------------|------------------------------------------------|-------|
| [`atomic_thread_fence`](atomic/atomic_thread_fence.md) | スレッド間で有効なフェンスを設定する(function) | C++11 |
| [`atomic_signal_fence`](atomic/atomic_signal_fence.md) | スレッドと、そのスレッド上で処理されるシグナルハンドラとの間でのみ有効なフェンスを設定する(function) | C++11 |


##バージョン
###言語
- C++11

##参照
- [N2047 An Atomic Operations Library for C++](http://www.open-std.org/JTC1/SC22/WG21/docs/papers/2006/n2047.html)
- [N2427 C++ Atomic Types and Operations](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2427.html)
- [Boost Atomic Library](http://www.boost.org/doc/libs/release/libs/atomic/)

