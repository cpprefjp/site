# stoppable-source
* stop_token[meta header]
* concept[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
mplate<class Source>
concept stoppable-source =
  requires (Source& src, const Source csrc) {
    { csrc.get_token() } -> stoppable_token;
    { csrc.stop_possible() } noexcept -> same_as<bool>;
    { csrc.stop_requested() } noexcept -> same_as<bool>;
    { src.request_stop() } -> same_as<bool>;
  };
```
* stoppable_token[link stoppable_token.md]

## 概要
`stoppable-source`は、型`Source`が次のインタフェースを持つことを表す説明専用のコンセプトである。

- [停止トークン](stoppable_token.md)を取得する(`get_token`)
- 停止可能か否かを問い合わせる(`stop_possible`)
- 停止要求が行われたか否かを問い合わせる(`stop_requested`)
- 停止要求を行う(`request_stop`)

`stoppable-source`のモデルとなる型は、最初に停止要求が行われた時に呼び出される停止コールバックの登録リストを管理する。


## モデル
`stoppable-source`のモデルである型のオブジェクトは次を満たすこと。

- 最大で1つの関連付けられた停止状態を持つ。
- オブジェクト`s`が停止状態を持たない(disengaged)とき、`s.stop_possible()`と`s.stop_requested()`は`false`となる。
- オブジェクト`t`が停止状態を持たないとき、`t.get_token()`は停止状態を持たない[停止トークン](stoppable_token.md)を返す。そうでなければ、`t`の停止状態に関連付けられた停止トークンを返す。
- `request_stop`, `stop_requested`, `stop_possible`メンバ関数の呼び出しはデータ競合を引き起こさない。
- `true`を返す`request_stop`呼び出しは、`stopppable_token`または`stoppable-source`オブジェクトにおける`true`を返す`stop_requested`呼び出しに対して同期する。
- コールバックの登録は、そのコールバック呼び出しに対して同期する。
- `stoppable-source`が停止状態を持たないとき、`request_stop`は効果をもたず`false`を返す。そうでなければ、関連づけられた停止状態に対して停止要求操作を実行する。
- 停止要求操作は停止状態が停止要求を受信済みか否かを判定し、未受信であれば停止要求を行う。この判定はアトミックに行われる。
- 停止要求が行われたとき、停止状態に登録されているコールバックが同期的に実行される。コールバック呼び出しが例外で終了した場合、[`terminate`](/reference/exception/terminate.md)が呼び出される。
- 停止要求が行われたとき`request_stop`は`true`を返す。そうでなければ`false`を返す。
- `request_stop`呼び出し後は、`stop_possible`が`false`を返すか、`stop_requested`が`true`を返す。


## 備考
- 停止状態に登録されたコールバック呼び出しの実行順序に制約は課されない。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
