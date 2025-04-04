# stop_token
* stop_token[meta header]
* cpp20[meta cpp]

`<stop_token>`ヘッダは、マルチスレッド処理や非同期処理おける停止要求の状態 `停止状態` を扱うクラスを定義する。

- [`stop_token`](stop_token/stop_token.md), [`stop_source`](stop_token/stop_source.md), [`stop_callback`](stop_token/stop_callback.md)は停止状態を共有所有する。最後に破棄されたオブジェクトが停止状態を自動的に解放する。
- [`inplace_stop_source`](stop_token/inplace_stop_source.md.nolink)は停止状態をメンバとして直接所有する。[`inplace_stop_token`](stop_token/inplace_stop_token.md.nolink)と[`inplace_stop_callback`](stop_token/inplace_stop_callback.md.nolink)は停止状態の所有には関与しない。

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------------|------------------------------|-------|
| [`stoppable_token`](stop_token/stoppable_token.md.nolink) | 停止可能な停止トークン(concept) | C++26 |
| [`unstoppable_token`](stop_token/unstoppable_token.md.nolink) | 停止不可能な停止トークン(concept) | C++26 |
| [`stop_token`](stop_token/stop_token.md)      | 停止トークン(class) | C++20 |
| [`stop_source`](stop_token/stop_source.md)    | 停止要求を発生させるクラス(class) | C++20 |
| [`stop_callback`](stop_token/stop_callback.md)| 停止要求に応じて呼び出されるコールバック (class template) | C++20 |
| [`nostopstate`](stop_token/nostopstate.md)    | 停止状態を扱わない[`stop_source`](stop_token/stop_source.md)を構築するためのタグ (class) | C++20 |
| [`never_stop_token`](stop_token/never_stop_token.md.nolink) | 停止不可能な停止トークン(class) | C++26 |
| [`inplace_stop_token`](stop_token/inplace_stop_token.md.nolink) | インプレース停止トークン(class) | C++26 |
| [`inplace_stop_source`](stop_token/inplace_stop_source.md.nolink) | インプレース停止要求を発生させるクラス(class) | C++26 |
| [`inplace_stop_callback`](stop_token/inplace_stop_callback.md.nolink) | インプレース停止要求に応じて呼び出されるコールバック(class template) | C++26 |
| [`stop_callback_for_t`](stop_token/stop_callback_for_t.md.nolink) | 停止トークンに対応するコールバック型を取得(alias template) | C++26 |


## バージョン
### 言語
- C++20

### 処理系

- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [P0660R10 Stop token and joining thread](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0660r10.pdf)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
