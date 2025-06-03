# upon_error
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  struct upon_error_t { unspecified };
  inline constexpr upon_error_t upon_error{};
}
```
* unspecified[italic]

## 概要
`upon_error`は、入力[Sender](sender.md)の[エラー完了操作](set_error.md)の継続として関数呼び出しをアタッチし、戻り値データを[正常完了](set_value.md)として送信するSenderアダプタである。

`upon_error`は[パイプ可能Senderアダプタオブジェクト](sender_adaptor_closure.md)であり、パイプライン記法をサポートする。


## 効果
説明用の式`sndr`と`f`に対して、`decltype((sndr))`が[`sender`](sender.md)を満たさない、もしくは`decltype((f))`が[`movable-value`](../movable-value.md)を満たさないとき、呼び出し式`upon_error(sndr, f)`は不適格となる。

そうでなければ、呼び出し式`upon_error(sndr, f)`は`sndr`が1回だけ評価されることを除いて、下記と等価。

```cpp
transform_sender(get-domain-early(sndr), make-sender(upon_error, f, sndr))
```
* transform_sender[link transform_sender.md]
* get-domain-early[link get-domain-early.md]
* make-sender[link make-sender.md]


### Senderアルゴリズムタグ `upon_error`
Senderアルゴリズム動作説明用のクラステンプレート[`impls-for`](impls-for.md)に対して、下記の特殊化が定義される。

```cpp
namespace std::execution {
  template<>
  struct impls-for<decayed-typeof<upon_error>> : default-impls {
    static constexpr auto complete =
      []<class Tag, class... Args>
        (auto, auto& fn, auto& rcvr, Tag, Args&&... args) noexcept -> void {
          if constexpr (same_as<Tag, decayed-typeof<set_error>>) {
            TRY-SET-VALUE(rcvr,
                          invoke(std::move(fn), std::forward<Args>(args)...));
          } else {
            Tag()(std::move(rcvr), std::forward<Args>(args)...);
          }
        };
  };
}
```
* decayed-typeof[link /reference/functional/decayed-typeof.md]
* impls-for[link impls-for.md]
* default-impls[link impls-for.md]
* set_error[link set_error.md]
* TRY-SET-VALUE[link set_value.md]
* invoke[link /reference/functional/invoke.md]
* std::move[link /reference/utility/move.md]


## カスタマイゼーションポイント
Senderアルゴリズム構築時および[Receiver](receiver.md)接続時に、関連付けられた実行ドメインに対して[`execution::transform_sender`](transform_sender.md)経由でSender変換が行われる。
[デフォルト実行ドメイン](default_domain.md)では無変換。

戻り値の[Sender](sender.md)`out_sndr`が下記を満たさない場合、呼び出し式`upon_error(sndr, f)`の動作は未定義となる。

- `upon_error`に対する`sndr`のエラー結果データで`f`またはそのコピーを呼び出し、`out_sndr`の値完了として`f`の結果値を用いること。
- 他の完了操作では変更なしに転送すること。


## 例
```cpp example
#include <print>
#include <execution>
namespace ex = std::execution;

int main()
{
  { // 関数呼び出し
    ex::sender auto snd0 = ex::just_error(42);
    ex::sender auto snd1 = ex::upon_error(snd0, [](int err) {
      return err;
    });
    auto [v] = std::this_thread::sync_wait(snd1).value();
    std::println("{}", v);
  }

  { // パイプライン記法
    ex::sender auto sndr = ex::just_error(42)
      | ex::upon_error([](int err) {
          return err;
        });
    auto [v] = std::this_thread::sync_wait(sndr).value();
    std::println("{}", v);
  }
}
```
* ex::upon_error[color ff0000]
* ex::sender[link sender.md]
* ex::just_error[link just.md]
* std::this_thread::sync_wait[link ../this_thread/sync_wait.md]
* value()[link /reference/optional/optional/value.md]

### 出力
```
42
42
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
- [`execution::then`](then.md)
- [`execution::upon_stopped`](upon_stopped.md)


## 参照
- [P2999R3 Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2999r3.html)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
