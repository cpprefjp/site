# stop_token
* stop_token[meta header]
* cpp20[meta cpp]

`<stop_token>`ヘッダはマルチスレッド処理に対する停�要求の状態 `停�状態` を扱うクラスを定義する。

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------------|------------------------------|-------|
| [`stop_token`](stop_token/stop_token.md)      | 停�状態を表すクラス(class) | C++20 |
| [`stop_source`](stop_token/stop_source.md)    | 停�要求を発生させるクラス(class) | C++20 |
| [`stop_callback`](stop_token/stop_callback.md)| 停�要求に応じて呼び出されるコールバックを表すクラステンプレート (class template) | C++20 |
| [`nostopstate`](stop_token/nostopstate.md)    | 停�状態を扱わない[`stop_source`](stop_token/stop_source.md)を構築するためのタグ (class) | C++20 |

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
