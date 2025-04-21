# env
* execution[meta header]
* class template[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<queryable... Envs>
  struct env {
    Envs0 envs0_;  // exposition only
    Envs1 envs1_;  // exposition only
    // ...
    EnvsN envsN_;  // exposition only
  };

  template<class... Envs>
  env(Envs...) -> env<unwrap_reference_t<Envs>...>;
}
```
* queryable[link ../queryable.md]
* unwrap_reference_t[link /reference/type_traits/unwrap_reference.md]

## 概要
クラステンプレート`env`は、複数の[クエリ可能オブジェクト](../queryable.md)からクエリ可能オブジェクトを作成する。
結果オブジェクト上に対する問い合わせは、各サブオブジェクトに対して宣言順に問い合わせを行うことで解決される。

`env`の特殊化は代入可能ではない。

式リストが単一要素で構成される場合を除いて、`env`が丸カッコを用いた式リストによる初期化をサポートするか否かは未規定。


## メンバ関数

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|-------|
| `(constructor)` | コンストラクタ | C++26 |
| `(destructor)`  | デストラクタ   | C++26 |
| [`query`](env/query.md) | 問い合わせ | C++26 |


## 例
```cpp example
#include <stop_token>
#include <execution>
namespace ex = std::execution;

int main()
{
  // get_allocatorとget_stop_tokenをサポートするクエリ可能オブジェクト
  auto env = ex::env{
    ex::prop(std::get_allocator, std::allocator<std::byte>{}),
    ex::prop(std::get_stop_token, std::never_stop_token{})
  };

  // メモリアロケータを問い合わせ
  auto alloc = std::get_allocator(env);
  // 停止トークンを問い合わせ
  auto token = std::get_stop_token(env);
}
```
* ex::env[color ff0000]
* ex::prop[link prop.md]
* std::get_allocator[link get_allocator.md.nolink]
* std::get_stop_token[link ../get_stop_token.md]
* std::never_stop_token[link /reference/stop_token/never_stop_token.md]

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
- [`execution::prop`](prop.md)


## 参照
- [P3325R5 A Utility for Creating Execution Environments](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3325r5.html)
