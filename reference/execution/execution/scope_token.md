# scope_token
* execution[meta header]
* concept[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<class Token>
  concept scope_token =
    copyable<Token> &&
    requires(const Token token) {
      { token.try_associate() } -> same_as<bool>;
      { token.disassociate() } noexcept -> same_as<void>;
      { token.wrap(declval<test-sender>()) } -> sender_in<test-env>;
    };
}
```
* copyable[link /reference/concepts/copyable.md]
* sender_in[link sender_in.md]
* test-sender[italic]
* test-env[italic]

## 概要
`scope_token`コンセプトは、[Sender](sender.md)と非同期スコープ間の関連付けを作成するために利用できる型`Token`に対する要件を定義する。

`test-sender`と`test-env`は、[`sender_in`](sender_in.md)`<test-sender, test-env>`のモデルである未規定の型とする。


## モデル
型`Token`は、次のとき`scope_token`のモデルとなる。

- `Token`型オブジェクトのコピー構築、ムーブ構築、コピー代入、ムーブ代入から例外送出しない、かつ
- （const修飾の可能性のある）型`Token`の左辺値`token`が与えられたとき、型`decltype((sndr))`が[`sender`](sender.md)のモデルである全ての式`sndr`に対して、
    - `token.warp(sndr)`が有効な式、かつ
    - `decltype(token.warp(sndr))`は[`sender`](sender.md)のモデルであり、かつ
    - [`sender_in`](sender_in.md)`<decltype((sndr)), E>`のモデルである全ての`E`型に対して、[`completion_signatures_of_t`](completion_signatures_of_t.md)`<decltype(token.wrap(sndr)), E>`は[`completion_signatures_of_t`](completion_signatures_of_t.md)`<decltype((sndr)), E>`と同一の完了シグネチャを含むこと。


## 例
```cpp example
#include <execution>
namespace ex = std::execution;

int main()
{
  ex::counting_scope scope;
  ex::scope_token auto token = scope.get_token();
}
```
* ex::scope_token[color ff0000]
* ex::counting_scope[link counting_scope.md]

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
- [`execution::associate`](associate.md)
- [`execution::spawn_future`](spawn_future.md.nolink)
- [`execution::spawn`](spawn.md.nolink)


## 参照
- [P3149R11 `async_scope` - Creating scopes for non-sequential concurrency](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3149r11.html)
