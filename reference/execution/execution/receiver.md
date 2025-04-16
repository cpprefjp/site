# receiver
* execution[meta header]
* concept[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<class Rcvr>
  concept receiver =
    derived_from<typename remove_cvref_t<Rcvr>::receiver_concept, receiver_t> &&
    requires(const remove_cvref_t<Rcvr>& rcvr) {
      { get_env(rcvr) } -> queryable;
    } &&
    move_constructible<remove_cvref_t<Rcvr>> &&
    constructible_from<remove_cvref_t<Rcvr>, Rcvr>;

  struct receiver_t {};  // タグ型
}
```
* get_env[link get_env.md]
* queryable[link ../queryable.md]
* derived_from[link /reference/concepts/derived_from.md]
* move_constructible[link /reference/concepts/move_constructible.md]
* constructible_from[link /reference/concepts/constructible_from.md]

## 概要
`receiver`は、型`Rcvr`がReceiver型の要件を満たすことを表すコンセプトである。

`receiver_t`をメンバ型`Rcvr::receiver_concept`として定義するクラス型はReceiverとみなせる。


## モデル
`final`指定されたクラス型は`receiver`のモデルではない。


## 例
```cpp example
#include <execution>
namespace ex = std::execution;

struct SinkReceiver {
  using receiver_concept = ex::receiver_t;

  void set_value(auto&&...) noexcept {}
  void set_error(auto&&) noexcept {}
  void set_stopped() noexcept {}
};

int main()
{
  static_assert(ex::receiver<SinkReceiver>);
}
```
* ex::receiver[color ff0000]

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
- [`execution::receiver_of`](receiver_of.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
