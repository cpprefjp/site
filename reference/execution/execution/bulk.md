# bulk
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  struct bulk_t { unspecified };
  inline constexpr bulk_t bulk{};
}
```
* unspecified[italic]

## 概要
`bulk`は、インデクス空間の各インデクスに対してタスクを反復実行するSenderアダプタである。

`bulk`は[パイプ可能Senderアダプタオブジェクト](sender_adaptor_closure.md)であり、パイプライン記法をサポートする。


## 効果
説明用の式`sndr`, `shape`, `f`に対して、型`Shape`を`decltype(auto(shape))`とする。下記いずれかの条件をみたすとき、呼び出し式`bulk(sndr, shape, f)`は不適格となる。

- `decltype((sndr))`が[`sender`](sender.md)を満たさない、もしくは
- `Shape`が[`integral`](/reference/concepts/integral.md)を満たさない、もしくは
- `decltype((f))`が[`movable-value`](../movable-value.md)を満たさないとき。

そうでなければ、呼び出し式`bulk(sndr, shape, f)`は`sndr`が1回だけ評価されることを除いて、下記と等価。

```cpp
transform_sender(get-domain-early(sndr), make-sender(bulk, product-type{shape, f}, sndr))
```
* transform_sender[link transform_sender.md]
* get-domain-early[link get-domain-early.md]
* make-sender[link make-sender.md]
* product-type[link product-type.md]


### Senderアルゴリズムタグ `bulk`
Senderアルゴリズム動作説明用のクラステンプレート[`impls-for`](impls-for.md)に対して、下記の特殊化が定義される。

```cpp
namespace std::execution {
  template<>
  struct impls-for<bulk_t> : default-impls {
    static constexpr auto complete = see below;

    template<class Sndr, class... Env>
    static consteval void check-types();
  };
}
```
* impls-for[link impls-for.md]
* default-impls[link impls-for.md]

`impls-for<bulk_t>::complete`メンバは、下記ラムダ式と等価な関数呼び出し可能なオブジェクトで初期化される。

```cpp
[]<class Index, class State, class Rcvr, class Tag, class... Args>
  (Index, State& state, Rcvr& rcvr, Tag, Args&&... args) noexcept -> void requires see below {
    if constexpr (same_as<Tag, set_value_t>) {
      auto& [shape, f] = state;
      constexpr bool nothrow = noexcept(f(auto(shape), args...));
      TRY-EVAL(rcvr, [&]() noexcept(nothrow) {
        for (decltype(auto(shape)) i = 0; i < shape; ++i) {
          f(auto(i), args...);
        }
        Tag()(std::move(rcvr), std::forward<Args>(args)...);
      }());
    } else {
      Tag()(std::move(rcvr), std::forward<Args>(args)...);
    }
  }
```
* set_value_t[link set_value.md]
* TRY-EVAL[link set_value.md]
* std::move[link /reference/utility/move.md]

型`Tag`が[`set_value_t`](set_value.md)以外の型であるとき、もしくは式`f(auto(shape), args...)`が適格なときに限って、上記ラムダ式のrequires節が満たされる。

メンバ関数`impls-for<bulk_t>::check-types`の効果は下記の通り。

```cpp
auto cs = get_completion_signatures<child-type<Sndr>, FWD-ENV-T(Env)...>();
auto fn = []<class... Ts>(set_value_t(*)(Ts...)) {
  if constexpr (!invocable<remove_cvref_t<data-type<Sndr>>, Ts&...>)
    throw unspecified-exception();
};
cs.for-each(overload-set{fn, [](auto){}});
```
* get_completion_signatures[link get_completion_signatures.md]
* child-type[link child-type.md]
* FWD-ENV-T[link ../forwarding_query.md]
* set_value_t[link set_value.md]
* data-type[link data-type.md]
* for-each[link completion_signatures.md]
* overload-set[link overload-set.md]

`unspecified-exception`は[`exception`](/reference/exception/exception.md)から派生した型となる。


## カスタマイゼーションポイント
Senderアルゴリズム構築時および[Receiver](receiver.md)接続時に、関連付けられた実行ドメインに対して[`execution::transform_sender`](transform_sender.md)経由でSender変換が行われる。
[デフォルト実行ドメイン](default_domain.md)では無変換。

説明用の式`out_sndr`を`bulk(sndr, shape, f)`の戻り値[Sender](sender.md)とし、式`rcvr`を式[`connect`](connect.md)`(out_sndr, rcvr)`が適格となる[Receiver](receiver.md)とする。式[`connect`](connect.md)`(out_sndr, rcvr)`は[開始(start)](start.md)時に下記を満たす非同期操作を生成しない場合、動作は未定義となる。

- 値完了操作において、パック`args`を入力[Sender](sender.md)の値完了結果データを参照する左辺値式としたとき、型`Shape`の半開区間`[0, Shape)`における全ての`i`に対して`f(i, args...)`を呼び出すこと。
- `sndr`により送信された全ての完了操作を伝搬すること。


## 備考
非同期実行フレームワークで定義される[デフォルト実行ドメイン](default_domain.md)では、`bulk`に指定したタスク`f`は単一スレッド上で逐次実行される。


## 例
```cpp example
#include <print>
#include <execution>
namespace ex = std::execution;

int main()
{
  ex::sender auto sndr =
    ex::just()
    | ex::bulk(3, [](int i) {
        std::println("{}", i);
      });
  std::this_thread::sync_wait(sndr);
}
```
* ex::bulk[color ff0000]
* ex::sender[link sender.md]
* ex::just[link just.md]
* std::this_thread::sync_wait[link ../this_thread/sync_wait.md]

### 出力例
```
0
1
2
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
- [P2999R3 Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2999r3.html)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [P3557R3 High-Quality Sender Diagnostics with Constexpr Exceptions](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3557r3.html)
