# value_types_of_t
* execution[meta header]
* std::execution[meta namespace]
* type-alias[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<class Sndr, class Env = env<>,
           template<class...> class Tuple = decayed-tuple,
           template<class...> class Variant = variant-or-empty>
    requires sender_in<Sndr, Env>
  using value_types_of_t =
    gather-signatures<set_value_t, completion_signatures_of_t<Sndr, Env>, Tuple, Variant>;
}
```
* env<>[link env.md]
* sender_in[link sender_in.md]
* decayed-tuple[link decayed-tuple.md.nolink]
* variant-or-empty[link variant-or-empty.md.nolink]
* gather-signatures[link gather-signatures.md]
* set_value_t[link set_value.md]
* completion_signatures_of_t[link completion_signatures_of_t.md]

## 概要
[Sender型](sender.md)`Sndr`が[環境](receiver.md)`Env`において非同期操作を作成できるとき、[完了シグネチャ集合](completion_signatures.md)のうち[値完了シグネチャ](set_value.md)の引数型リスト集合に対して型情報の変換操作を適用し、新たな型を取得する。

値完了シグネチャの引数型リスト集合を`{Ts0..., Ts1..., ... TsN...}`としたとき、2段階の型変換操作をテンプレートパラメータ`Tuple`, `Variant`で指定する。

- `Tuple` : それぞれの引数型リスト`Ts...`に適用する型変換操作。
- `Variant` : 上記変換後に、引数型リスト集合に適用する型変換操作。

`value_types_of_t`のデフォルト動作では、引数型リスト[`tuple`](/reference/tuple/tuple.md)の[`variant`](/reference/variant/variant.md)に変換される。


## 例
```cpp example
#include <concepts>
#include <execution>
namespace ex = std::execution;

int main()
{
  // 値完了シグネチャ set_value_t(int, char)
  ex::sender auto snd1 = ex::just(123, 'X');
  using Types1 = ex::value_types_of_t<decltype(snd1)>;
  static_assert(std::same_as<Types1, std::variant<std::tuple<int, char>>>);

  // 値完了シグネチャを持たないSender
  ex::sender auto snd2 = ex::just_error(42);
  using Types2 = ex::value_types_of_t<decltype(snd2)>;
  // Type2 == 有効だがオブジェクト構築不可な型
}
```
* ex::value_types_of_t[color ff0000]
* ex::sender[link sender.md]
* ex::just[link just.md]
* ex::just_error[link just_error.md.nolink]

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
- [`execution::completion_signatures`](completion_signatures.md)
- [`execution::set_value`](set_value.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
