# get_env
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  struct get_env_t { unspecified };
  inline constexpr get_env_t get_env{};
}
```
* unspecified[italic]

## 概要
`get_env`は、対象オブジェクトに関連付けられた[クエリ可能オブジェクト](../queryable.md)を取得するカスタマイゼーションポイントオブジェクトである。

- [Sender](sender.md)に関連付けられた属性
- [Receiver](receiver.md)に関連付けられた環境


## 効果
式`get_env(o)`は下記と等価であり、[`queryable`](../queryable.md)を満たす型の値となる。

- 引数`o`がconst修飾された`co`を用いて、式`co.get_env()`が適格であればその値。
- そうでなければ、空のクエリ可能オブジェクト[`env<>{}`](env.md)


## 例外
投げない


## カスタマイゼーションポイント
const修飾された対象オブジェクト`co`に対して式`co.get_env()`が呼び出される。
このとき、`noexcept(co.get_env()) == true`であること。


## 備考
[Sender](sender.md)に関連付けられたクエリ可能オブジェクトは「属性(attributes)」と呼ばれるが、本`get_env`を用いてクエリ可能オブジェクトを取得する。実行制御ライブラリ仕様検討中には専用の`get_attrs`として存在していたが、同じ動作セマンティクスを持つ`get_env`に統合された経緯がある。


## 例
```cpp example
#include <execution>
namespace ex = std::execution;

int main()
{
  ex::sender auto sndr = ex::just(42);
  auto env = ex::get_env(sndr);
}
```
* ex::get_env[color ff0000]
* ex::sender[link sender.md]
* ex::just[link just.md.nolink]

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
- [`execution::sender`](sender.md)
- [`execution::receiver`](receiver.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
