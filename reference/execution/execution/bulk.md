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
`bulk`は、インデクス空間の各インデクスに対してタスクを一括実行するSenderアダプタである。

`bulk`は[パイプ可能Senderアダプタオブジェクト](sender_adaptor_closure.md)であり、パイプライン記法をサポートする。

実行制御ライブラリのデフォルト動作では、`bulk`は[`bulk_chukned`](bulk_chunked.md)に変換され、下記のように振る舞う。

- [並列Scheduler](parallel_scheduler.md)上では、インデクス空間を区間分割されたチャンク単位で並列実行される。
- 明示的にカスタマイズされていなければ、各インデクスに対する処理は逐次実行される。


## 効果
説明用の式`sndr`, `policy`, `shape`, `f`に対して、型`Policy`を[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<decltype(policy)>`、型`Shape`を`decltype(auto(shape))`、型`Func`を[`decay_t`](/reference/type_traits/decay.md)`<decltype((f))>`とする。下記いずれかの条件をみたすとき、呼び出し式`bulk(sndr, policy, shape, f)`は不適格となる。

- `decltype((sndr))`が[`sender`](sender.md)を満たさない、もしくは
- [`is_execution_policy_v`](../is_execution_policy.md)`<Policy> == false`、もしくは
- `Shape`が[`integral`](/reference/concepts/integral.md)を満たさない、もしくは
- `Func`が[`copy_constructible`](/reference/concepts/copy_constructible.md)のモデルでないとき。

そうでなければ、呼び出し式`bulk(sndr, policy, shape, f)`は`sndr`が1回だけ評価されることを除いて、下記と等価。

```cpp
transform_sender(
  get-domain-early(sndr),
  make-sender(bulk, product-type<see below, Shape, Func>{policy, shape, f}, sndr))
```
* transform_sender[link transform_sender.md]
* get-domain-early[link get-domain-early.md]
* make-sender[link make-sender.md]
* product-type[link product-type.md]

`product-type`の第1テンプレート引数は、`Policy`が[`copy_constructible`](/reference/concepts/copy_constructible.md)のモデルであるとき`Policy`となる。そうでなければ、`const Policy&`となる。


### Senderアルゴリズムタグ `bulk`
説明用の式`sndr`と`env`に対して、型`Sndr`を`decltype((sndr))`とする。[`sender-for`](sender-for.md)`<Sndr, bulk_t> == false`のとき、式`bulk.transform_sender(sndr, env)`は不適格となる。

そうでなければ、式`bulk.transform_sender(sndr, env)`は下記と等価。

```cpp
auto [_, data, child] = sndr;
auto& [policy, shape, f] = data;
auto new_f = [func = std::move(f)](Shape begin, Shape end, auto&&... vs)
    noexcept(noexcept(f(begin, vs...))) {
  while (begin != end) func(begin++, vs...);
}
return bulk_chunked(std::move(child), policy, shape, std::move(new_f));
```
* bulk_chunked[link bulk_chunked.md]
* std::move[link /reference/utility/move.md]


## カスタマイゼーションポイント
Senderアルゴリズム構築時に、[Sender](sender.md)`sndr`に[関連付けられた実行ドメイン](get-domain-early.md)に対して[`execution::transform_sender`](transform_sender.md)経由でSender変換が行われる。
[デフォルト実行ドメイン](default_domain.md)では無変換。

[Receiver](receiver.md)との[接続(connect)](connect.md)時に、[関連付けられた実行ドメイン](get-domain-late.md)に対して[`execution::transform_sender`](transform_sender.md)経由でSender変換が行われる。
[デフォルト実行ドメイン](default_domain.md)では`bulk.transform_sender(out_sndr, env)`が呼ばれ、[`bulk_chunked`](bulk_chunked.md)Senderへと変換される。

説明用の式`out_sndr`を`bulk(sndr, policy, shape, f)`の戻り値[Sender](sender.md)とし、式`rcvr`を式[`connect`](connect.md)`(out_sndr, rcvr)`が適格となる[Receiver](receiver.md)とする。式[`connect`](connect.md)`(out_sndr, rcvr)`は[開始(start)](start.md)時に下記を満たす非同期操作を生成しない場合、動作は未定義となる。

- 説明用の`args`を`sndr`の値完了結果を参照する左辺値式のパック、または[`copy_constructible`](/reference/concepts/copy_constructible.md)のモデルであるならばそれらの値のdecayコピーのパックとする。`sndr`が値完了したとき、
    - `out_sndr`もまた値完了するとき、`0`から`shape`までの型`Shape`の全ての`i`に対して`f(i, args...)`を呼び出す。
    - `out_sndr`が[`set_error`](set_error.md)`(rcvr, eptr)`で完了するとき、エラー完了ハンドラが呼び出される前に非同期操作は`f`呼び出しのサブセットを呼び出す可能性があり、`eptr`は下記いずれかを指す[`exception_ptr`](/reference/exception/exception_ptr.md)となる。
        - `f`呼び出しから送出された例外、または
        - 処理系が要求リソースの確保に失敗したときは[`bad_alloc`](/reference/new/bad_alloc.md)例外、または
        - [`runtime_error`](/reference/stdexcept.md)から派生された例外。
    - `out_sndr`が[`set_stopped`](set_stopped.md)`(rcvr)`で完了するとき、停止完了ハンドラが呼び出される前に非同期操作は`f`呼び出しのサブセットを呼び出す可能性がある。
- `sndr`が[`set_value`](set_value.md)で完了しないとき、その完了操作は`recv`に転送される。
- パラメータ`policy`は、アルゴリズムに対応した非同期操作の実行を並列化する方法、および`f`に適用する方法を規程する。並列アルゴリズム要素アクセス関数に対する権限と要件は`f`に適用される。


## 備考
`bulk`アルゴリズムを直接カスタマイズしない実行ドメインであっても、`bulk`の動作は[Receiver](receiver.md)接続時に変換される[`bulk_chunked`](bulk_chunked.md)へ委譲される。


## 例
```cpp example
#include <print>
#include <execution>
namespace ex = std::execution;

int main()
{
  ex::sender auto sndr =
    ex::just()
    | ex::bulk(3, ex::seq, [](int i) {
        std::println("{}", i);
      });
  std::this_thread::sync_wait(sndr);
}
```
* ex::bulk[color ff0000]
* ex::sender[link sender.md]
* ex::just[link just.md]
* ex::seq[link execution_policy.md]
* std::this_thread::sync_wait[link ../this_thread/sync_wait.md]

### 出力
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


## 関連項目
- [`execution::bulk_chunked`](bulk_chunked.md)
- [`execution::bulk_unchunked`](bulk_unchunked.md)


## 参照
- [P2999R3 Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2999r3.html)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [P3481R5 `std::execution::bulk()` issues](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3481r5.html)
