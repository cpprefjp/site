# schedule_from
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  struct schedule_from_t { unspecified };
  inline constexpr schedule_from_t schedule_from{};
}
```
* unspecified[italic]

## 概要
`schedule_from`は、実行コンテキストからの遷移制御で[Scheduler](scheduler.md)から利用されるSenderアダプタである。


## 効果
説明用の式`sndr`に対して`decltype((sndr))`が[`sender`](sender.md)を満たさないとき、呼び出し式`schedule_from(sndr)`は不適格となる。

そうでなければ、呼び出し式`schedule_from(sndr)`は下記と等価。

```cpp
make-sender(schedule_from, {}, sndr)
```
* make-sender[link make-sender.md]


## カスタマイゼーションポイント
[Receiver](receiver.md)との[接続(connect)](connect.md)時に、関連付けられた実行ドメインに対して[`execution::transform_sender`](transform_sender.md)経由でSender変換が行われる。
[デフォルト実行ドメイン](default_domain.md)では無変換。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::continues_on`](continues_on.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [P3826R5 Fix Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3826r5.html)
