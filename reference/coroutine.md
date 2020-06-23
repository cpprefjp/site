# coroutine
* coroutine[meta header]
* cpp20[meta cpp]

## 概要

`<coroutine>`ヘッダでは、[コルーチン](/lang/cpp20/coroutines.md)の制御に関する機能を提供する。


## コルーチントレイト

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`coroutine_traits`](coroutine/coroutine_traits.md.nolink)| Promise型導出トレイト(class template) | C++20 |


## コルーチンハンドル

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`coroutine_handle`](coroutine/coroutine_handle.md.nolink)| コルーチンハンドル(class template) | C++20 |


## コルーチン実装補助クラス

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`noop_coroutine_promise`](coroutine/noop_coroutine_promise.md.nolink)| 何もしないコルーチンPromise型(class)| C++20 |
| [`suspend_never`](coroutine/suspend_never.md.nolink)| 中断しないAwaitable型(class) | C++20 |
| [`suspend_always`](coroutine/suspend_always.md.nolink)| 中断するAwaitable型(class) | C++20 |


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 11.0
- [Visual C++](/implementation.md#visual_cpp): ??

## 関連項目
- [C++20 コルーチン](/lang/cpp20/coroutines.md)
