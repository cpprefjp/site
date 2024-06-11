# coroutine
* coroutine[meta header]
* cpp20[meta cpp]

## 概要

`<coroutine>`ヘッダでは、[コルーチン](/lang/cpp20/coroutines.md)の制御に関する機能を提供する。

このヘッダでは、以下の標準ヘッダをインクルードする：

- [`<compare>`](compare.md) (C++20)

本ヘッダはフリースタンディング環境でも提供される。


## コルーチントレイト

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`coroutine_traits`](coroutine/coroutine_traits.md)| Promise型導出トレイト(class template) | C++20 |


## コルーチンハンドル

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`coroutine_handle`](coroutine/coroutine_handle.md)| コルーチンハンドル(class template) | C++20 |


## 何もしないコルーチン

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`noop_coroutine_promise`](coroutine/noop_coroutine_handle.md)| 何もしないコルーチンPromise型(class)| C++20 |
| [`noop_coroutine_handle`](coroutine/noop_coroutine_handle.md) | 何もしないコルーチンのハンドル(class) | C++20 |
| [`noop_coroutine`](coroutine/noop_coroutine.md) | 何もしないコルーチンのハンドルを取得(function) | C++20


## トリビアルAwaitable型

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`suspend_never`](coroutine/suspend_never.md) | 常に中断しないAwaitable型(class) | C++20 |
| [`suspend_always`](coroutine/suspend_always.md) | 常に中断するAwaitable型(class) | C++20 |


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 11.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??

## 関連項目
- [C++20 コルーチン](/lang/cpp20/coroutines.md)


## 参照
- [P2051R0 C++ Standard Library Issues to be moved in Prague](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2051r0.html)
