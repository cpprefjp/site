# then
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  struct then_t { unspecified };
  inline constexpr then_t then{};
}
```
* unspecified[italic]

## 概要
`then`は、入力[Sender](sender.md)の[値完了操作](set_value.md)の継続として関数呼び出しをアタッチするSenderアダプタである。

`then`はパイプライン記法をサポートする。


## 効果
説明用の式`sndr`と`f`に対して、`decltype((sndr))`が[`sender`](sender.md)を満たさない、もしくは`decltype((f))`が[`movable-value`](../movable-value.md)を満たさないとき、呼び出し式`then(sndr, f)`は不適格となる。

そうでなければ、呼び出し式`then(sndr, f)`は`sndr`が1回だけ評価されることを除いて、下記と等価。

```cpp
transform_sender(get-domain-early(sndr), make-sender(then, f, sndr))
```
* transform_sender[link transform_sender.md]
* get-domain-early[link get-domain-early.md]
* make-sender[link make-sender.md]


### Senderアルゴリズムタグ `then`
Senderアルゴリズム動作説明用のクラステンプレート[`impls-for`](impls-for.md)に対して、下記の特殊化が定義される。

```cpp
namespace std::execution {
  template<>
  struct impls-for<decayed-typeof<then>> : default-impls {
    static constexpr auto complete =
      []<class Tag, class... Args>
        (auto, auto& fn, auto& rcvr, Tag, Args&&... args) noexcept -> void {
          if constexpr (same_as<Tag, decayed-typeof<set_value>>) {
            TRY-SET-VALUE(rcvr,
                          invoke(std::move(fn), std::forward<Args>(args)...));
          } else {
            Tag()(std::move(rcvr), std::forward<Args>(args)...);
          }
        };
  };
}
```
* decayed-typeof[link decayed-typeof.md.nolink]
* impls-for[link impls-for.md]
* default-impls[link impls-for.md]
* set_value[link set_value.md]
* invoke[link /reference/functional/invoke.md]
* std::move[link /reference/utility/move.md]


## カスタマイゼーションポイント
Senderアルゴリズム構築時に、入力[Sender](sender.md)`sndr`に[関連付けられた実行ドメイン](get-domain-early.md)に対して[`execution::transform_sender`](transform_sender.md)経由でSender変換が行われる。
[デフォルト実行ドメイン](../execution/default_domain.md)では無変換。

戻り値の[Sender](sender.md)`out_sndr`が下記を満たさない場合、呼び出し式`then(sndr, f)`の動作は未定義となる。

- `then`に対する`sndr`の値結果データで`f`またはそのコピーを呼び出し、`out_sndr`の値完了として`f`の結果値を用いること。
- 他の完了操作では変更なしに転送すること。


## 例
```cpp example
#include <print>
#include <string>
#include <execution>
namespace ex = std::execution;

int main()
{
  { // 関数呼び出し
    ex::sender auto snd0 = ex::just('C', 2);
    ex::sender auto snd1 = ex::then(snd0, [](char ch, int n) {
      return ch + std::string(n, '+');
    });
    auto [s] = std::this_thread::sync_wait(snd1).value();
    std::println("{}", s);
  }

  { // パイプライン記法
    ex::sender auto sndr = ex::just('C', 2);
      | ex::then([](char ch, int n) {
          return ch + std::string(n, '+');
        });
    auto [s] = std::this_thread::sync_wait(sndr).value();
    std::println("{}", s);
  }
}
```
* ex::then[color ff0000]
* ex::sender[link sender.md]
* ex::just[link just.md]
* std::this_thread::sync_wait[link ../this_thread/sync_wait.md]
* value()[link /reference/optional/optional/value.md]

### 出力
```
C++
C++
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
- [`execution::upon_error`](upon_error.md.nolink)
- [`execution::upon_stopped`](upon_stopped.md.nolink)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
