# when_all_with_variant
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  struct when_all_with_variant_t { unspecified };
  inline constexpr when_all_with_variant_t when_all_with_variant{};
}
```
* unspecified[italic]

## 概要
`when_all_with_variant`は、複数の入力[Sender](sender.md)が全て完了するまで待機するSenderアダプタである。

`when_all_with_variant`は入力Senderが複数の[値完了シグネチャ](set_value.md)を持つケースに対応する。
全入力Senderの値完了シグネチャが1個だけの場合は[`when_all`](when_all.md)アルゴリズムを利用する。

- 入力Sender全てが値完了のとき、全ての値完了結果を[`variant`](/reference/variant/variant.md)の[`tuple`](/reference/tuple/tuple.md)に結合して値完了操作を行う。
- いずれかがエラー完了のとき、同エラー値をもってエラー完了操作を行う。このとき停止要求が作成される。
- いずれかが停止完了のとき、停止完了操作を行う。このとき停止要求が作成される。


## 効果
説明用のパック`sndrs`に対してパック`Sndrs`を`decltype((sndrs))...`としたとき、型`CD`を[`common_type_t`](/reference/type_traits/common_type.md)`<decltype(`[`get-domain-early`](get-domain-early.md)`(sndrs))...>`とする。型`CD`が適格ならば型`CD2`を`CD`とし、そうでなければ[`default_domain`](default_domain.md)とする。

下記いずれかが`true`となるとき、呼び出し式`when_all_with_variant(sndrs...)`は不適格となる。

- `sizeof...(sndrs) == 0`、または
- `(`[`sender`](sender.md)`<Sndrs> && ...) == false`、または
- 型`CD`が不適格

そうでなければ、呼び出し式`when_all_with_variant(sndrs...)`は下記と等価。

```cpp
transform_sender(CD2(), make-sender(when_all_with_variant, {}, sndrs...))
```
* transform_sender[link transform_sender.md]
* make-sender[link make-sender.md]


### Senderアルゴリズムタグ `when_all_with_variant`
説明用の式`sndr`と`env`に対して、[`sender-for`](sender-for.md)`<decltype((sndr)), when_all_with_variant_t> == false`のとき、式`when_all_with_variant.transform_sender(sndr, env)`は不適格となる。

そうでなければ、式`when_all_with_variant.transform_sender(sndr, env)`は下記と等価。

```cpp
auto&& [_, _, ...child] = sndr;
return when_all(into_variant(std::forward_like<decltype((sndr))>(child))...);
```
* when_all[link when_all.md]
* into_variant[link into_variant.md]


## カスタマイゼーションポイント
Senderアルゴリズム構築時に、全入力Senderに関連付けられた共通の実行ドメイン`CD`に対して[`execution::transform_sender`](transform_sender.md)経由でSender変換が行われる。
[デフォルト実行ドメイン](default_domain.md)では無変換。

[Receiver](receiver.md)との[接続(connect)](connect.md)時に、[関連付けられた実行ドメイン](get-domain-late.md)に対して[`execution::transform_sender`](transform_sender.md)経由でSender変換が行われる。
[デフォルト実行ドメイン](default_domain.md)では`when_all_with_variant.transform_sender(sndr, env)`が呼ばれ、前述仕様通りのSenderへと変換される。


## 例
```cpp example
#include <print>
#include <string>
#include <execution>
namespace ex = std::execution;

// MySenderは下記いずれかの完了操作を行う
//   値完了     set_value(int), set_value(string)
//   エラー完了 set_error(int)
struct MySender {
  using sender_concept = ex::sender_t;
  using completion_signatures = ex::completion_signatures<
    ex::set_value_t(int),
    ex::set_value_t(std::string),
    ex::set_error_t(int)
  >;

  template <typename Rcvr>
  struct state {
    using operation_state_concept = ex::operation_state_t;

    state(Rcvr rcvr, int val)
      : rcvr_{std::move(rcvr)}, val_{val} {}

    void start() noexcept {
      using namespace std::string_literals;
      switch (val_) {
      case 1:
        ex::set_value(std::move(rcvr_), 100);
        break;
      case 2:
        ex::set_value(std::move(rcvr_), "C++"s);
        break;
      default:
        ex::set_error(std::move(rcvr_), val_);
        break;
      }
    }

    Rcvr rcvr_;
    int val_;
  };

  template <typename Rcvr>
  auto connect(Rcvr rcvr) noexcept {
    return state{std::move(rcvr), val_};
  }

  int val_;
};

int main()
{
  ex::sender auto snd1 = MySender{1};
  ex::sender auto snd2 = MySender{2};
  ex::sender auto sndr = ex::when_all_with_variant(snd1, snd2);

  auto result = std::this_thread::sync_wait(sndr);
  // result := optional<
  //             tuple<
  //               variant<tuple<int>, tuple<string>>,
  //               variant<tuple<int>, tuple<string>>
  //             >
  //           >型

  auto [val1, val2] = result.value();
  // val1,val2 := variant<tuple<int>, tuple<string>>型

  struct DumpVal {
    void operator()(std::tuple<int> n) {
      std::println("(int) {}", get<0>(n));
    }
    void operator()(std::tuple<std::string> s) {
      std::println("(str) {}", get<0>(s));
    }
  };
  std::visit(DumpVal{}, val1);
  std::visit(DumpVal{}, val2);
}
```
* ex::when_all_with_variant[color ff0000]
* ex::sender_t[link sender.md]
* ex::sender[link sender.md]
* ex::completion_signatures[link completion_signatures.md]
* ex::set_value_t[link set_value.md]
* ex::set_value[link set_value.md]
* ex::set_error_t[link set_error.md]
* ex::set_error[link set_error.md]
* ex::operation_state_t[link operation_state.md]
* std::this_thread::sync_wait[link ../this_thread/sync_wait.md]
* value()[link /reference/optional/optional/value.md]
* std::move[link /reference/utility/move.md]
* std::visit[link /reference/variant/visit.md]
* get<0>[link /reference/tuple/tuple/get.md]

### 出力
```
(int) 100
(str) C++
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
- [`execution::when_all`](when_all.md)
- [`execution::into_variant`](into_variant.md)


## 参照
- [P2999R3 Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2999r3.html)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [P3557R3 High-Quality Sender Diagnostics with Constexpr Exceptions](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3557r3.html)
