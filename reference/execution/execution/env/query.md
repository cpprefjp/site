# query
* execution[meta header]
* std::execution[meta namespace]
* env[meta class]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
template<class QueryTag>
constexpr decltype(auto) query(QueryTag q) const noexcept(see below);
```

## 概要
[クエリオブジェクト](../../queryable.md)`q`をキーとして、対応する値を問い合わせる。


## テンプレートパラメータ制約
説明専用のコンセプト`has-query`を次のように定義したとき、`(has-query<Envs, QueryTag> || ...)`が`true`であること。

```cpp
template<class Env, class QueryTag>
concept has-query =
  requires (const Env& env) {
    env.query(QueryTag());
  };
```


## 効果
説明用の`fe`を、`env`クラステンプレートの説明専用メンバ変数`envs0_`, ..., `envsN_`のうち最初に式`fe.query(q)`が適格となる要素としたとき、下記と等価。

```cpp
return fe.query(q);
```


## 例外
式`noexcept(fe.query(q))`が`true`のとき、例外送出しない。
それ以外の場合、式`fe.query(q)`から送出される例外。


## 例
```cpp example
#include <concepts>
#include <stop_token>
#include <execution>
using ex = std::execution;

int main()
{
  // get_allocatorとget_stop_tokenをサポートするクエリ可能オブジェクト
  auto env0 = ex::env{
    ex::prop(std::get_allocator, std::allocator<std::byte>{}),
    ex::prop(std::get_stop_token, std::never_stop_token{})
  };
  auto token0 = env0.query(std::get_stop_token);
  static_assert(std::same_as<decltype(token0), std::never_stop_token>);

  // env0のget_stop_tokenクエリオブジェクト動作を上書き
  auto env1 = ex::env{
    ex::prop(std::get_stop_token, std::stop_token{}),
    env0
  };
  auto token1 = env1.query(std::get_stop_token);
  static_assert(std::same_as<decltype(token1), std::stop_token>);
}
```
* query[color ff0000]
* ex::env[link ../env.md]
* ex::prop[link ../prop.md]
* std::get_allocator[link ../../get_allocator.md]
* std::get_stop_token[link ../../get_stop_token.md]
* std::never_stop_token[link /reference/stop_token/never_stop_token.md]
* std::stop_token[link /reference/stop_token/stop_token.md]

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


## 参照
- [P3325R5 A Utility for Creating Execution Environments](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3325r5.html)
