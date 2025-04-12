# sender_in
* execution[meta header]
* concept[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<class Sndr, class Env = env<>>
  concept sender_in =
    sender<Sndr> &&
    queryable<Env> &&
    requires (Sndr&& sndr, Env&& env) {
      { get_completion_signatures(std::forward<Sndr>(sndr), std::forward<Env>(env)) }
        -> valid-completion-signatures;
    };
}
```
* env<>[link env.md.nolink]
* sender[link sender.md]
* queryable[link queryable.md.nolink]
* get_completion_signatures[link get_completion_signatures.md.nolink]
* valid-completion-signatures[link valid-completion-signatures.md.nolink]

## 概要
`sender_in`は、[Sender型](sender.md)`Sndr`が[環境](env.md.nolink)`Env`において非同期操作を作成できること表すコンセプトである。


## モデル
説明用に`sndr`を`decltype((sndr))`が`Sndr`型となる式、`rcvr`を環境`Env`に関連付けられたReceiverと定義する。

また、ある完了操作の完了シグネチャが[`completion_signatures_of_t`](completion_signatures_of_t.md.nolink)`<Sndr, Env>`で取得される[`completion_signatures`](completion_signatures.md.nolink)リストに含まれるとき、`Sndr`と`Env`における許容可能完了操作(permissible completion)となる。

`sndr`と`rcvr`の接続後に操作状態を開始することで評価されうる完了操作が、全て許容可能完了操作(permissible completion)である場合、`Sndr`と`Env`は`sender_in<Sndr, Env>`のモデルとなる。


## 例
```cpp example
#include <execution>
namespace ex = std::execution;

int main()
{
  ex::sender auto sndr = ex::just(42);
  static_assert(ex::sender_in<decltype(sndr), ex::env<>>);
}
```
* ex::sender_in[color ff0000]
* ex::sender[link sender.md]
* ex::just[link just.md.nolink]
* ex::env<>[link env.md.nolink]

### 出力
```
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`sender`](sender.md)
- [`env`](env.md.nolink)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
