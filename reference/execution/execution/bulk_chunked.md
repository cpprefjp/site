# bulk_chunked
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  struct bulk_chunked_t { unspecified };
  inline constexpr bulk_chunked_t bulk_chunked{};
}
```
* unspecified[italic]

## 概要
`bulk_chunked`は、インデクス空間を区間分割したチャンク単位でタスクを一括実行するSenderアダプタである。

`bulk_chunked`は[パイプ可能Senderアダプタオブジェクト](sender_adaptor_closure.md)であり、パイプライン記法をサポートする。

実行制御ライブラリのデフォルト動作では、下記のように振る舞う。

- [並列Scheduler](parallel_scheduler.md)上では、インデクス空間を区間分割されたチャンク単位で並列実行される。
- 明示的にカスタマイズされていなければ、各インデクスに対する処理は逐次実行される。


## 効果
説明用の式`sndr`, `policy`, `shape`, `f`に対して、型`Policy`を[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<decltype(policy)>`、型`Shape`を`decltype(auto(shape))`、型`Func`を[`decay_t`](/reference/type_traits/decay.md)`<decltype((f))>`とする。下記いずれかの条件をみたすとき、呼び出し式`bulk_chunked(sndr, policy, shape, f)`は不適格となる。

- `decltype((sndr))`が[`sender`](sender.md)を満たさない、もしくは
- [`is_execution_policy_v`](../is_execution_policy.md)`<Policy> == false`、もしくは
- `Shape`が[`integral`](/reference/concepts/integral.md)を満たさない、もしくは
- `Func`が[`copy_constructible`](/reference/concepts/copy_constructible.md)のモデルでないとき。

そうでなければ、呼び出し式`bulk_chunked(sndr, policy, shape, f)`は`sndr`が1回だけ評価されることを除いて、下記と等価。

```cpp
transform_sender(
  get-domain-early(sndr),
  make-sender(bulk_chunked, product-type<see below, Shape, Func>{policy, shape, f}, sndr))
```
* transform_sender[link transform_sender.md]
* get-domain-early[link get-domain-early.md]
* make-sender[link make-sender.md]
* product-type[link product-type.md]

`product-type`の第1テンプレート引数は、`Policy`が[`copy_constructible`](/reference/concepts/copy_constructible.md)のモデルであるとき`Policy`となる。そうでなければ、`const Policy&`となる。


### Senderアルゴリズムタグ `bulk_chunked`
Senderアルゴリズム動作説明用のクラステンプレート[`impls-for`](impls-for.md)に対して、下記の特殊化が定義される。

```cpp
namespace std::execution {
  template<>
  struct impls-for<bulk_chunked_t> : default-impls {
    static constexpr auto complete = see below;

    template<class Sndr, class... Env>
    static consteval void check-types();
  };
}
```
* impls-for[link impls-for.md]
* default-impls[link impls-for.md]

`impls-for<bulk_chunked_t>::complete`メンバは、下記ラムダ式と等価な関数呼び出し可能なオブジェクトで初期化される。

```cpp
[]<class Index, class State, class Rcvr, class Tag, class... Args>
  (Index, State& state, Rcvr& rcvr, Tag, Args&&... args) noexcept
  -> void requires see below {
    if constexpr (same_as<Tag, set_value_t>) {
      auto& [policy, shape, f] = state;
      constexpr bool nothrow = noexcept(f(auto(shape), auto(shape), args...));
      TRY-EVAL(rcvr, [&]() noexcept(nothrow) {
        f(static_cast<decltype(auto(shape))>(0), auto(shape), args...);
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

型`Tag`が[`set_value_t`](set_value.md)以外の型であるとき、もしくは式`f(auto(shape), auto(shape), args...)`が適格なときに限って、上記ラムダ式のrequires節が満たされる。

メンバ関数`impls-for<bulk_chunked_t>::check-types`の効果は下記の通り。

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

説明用の式`out_sndr`を`bulk_chunked(sndr, policy, shape, f)`の戻り値[Sender](sender.md)とし、式`rcvr`を式[`connect`](connect.md)`(out_sndr, rcvr)`が適格となる[Receiver](receiver.md)とする。式[`connect`](connect.md)`(out_sndr, rcvr)`は[開始(start)](start.md)時に下記を満たす非同期操作を生成しない場合、動作は未定義となる。

- 説明用の`args`を`sndr`の値完了結果を参照する左辺値式のパック、または[`copy_constructible`](/reference/concepts/copy_constructible.md)のモデルであるならばそれらの値のdecayコピーのパックとする。`sndr`が値完了したとき、
    - `out_sndr`もまた値完了するとき、範囲`[0, shape]`にある型`Shape`の0個以上の`b`と`e`のペアに対して`f(b, e, args...)`を呼び出す。このとき`b < e`であり、かつ`0`から`shape`までの型`Shape`の全ての`i`において、`b`と`e`のペアに対して`i`が範囲`[b, e)`にあるような呼び出しが正確に1回だけ存在する。
    - `out_sndr`が[`set_error`](set_error.md)`(rcvr, eptr)`で完了するとき、エラー完了ハンドラが呼び出される前に非同期操作は`f`呼び出しのサブセットを呼び出す可能性があり、`eptr`は下記いずれかを指す[`exception_ptr`](/reference/exception/exception_ptr.md)となる。
        - `f`呼び出しから送出された例外、または
        - 処理系が要求リソースの確保に失敗したときは[`bad_alloc`](/reference/new/bad_alloc.md)例外、または
        - [`runtime_error`](/reference/stdexcept.md)から派生された例外。
    - `out_sndr`が[`set_stopped`](set_stopped.md)`(rcvr)`で完了するとき、停止完了ハンドラが呼び出される前に非同期操作は`f`呼び出しのサブセットを呼び出す可能性がある。
- `sndr`が[`set_value`](set_value.md)で完了しないとき、その完了操作は`recv`に転送される。
- パラメータ`policy`は、アルゴリズムに対応した非同期操作の実行を並列化する方法、および`f`に適用する方法を規程する。並列アルゴリズム要素アクセス関数に対する権限と要件は`f`に適用される。



## 例
```cpp example
#include <print>
#include <execution>
namespace ex = std::execution;

int main()
{
  ex::sender auto sndr =
    ex::just()
    | ex::bulk_chunked(3, ex::seq,
        [](int begin, int end) {
          for (int i = begin; i < end; i++) {
            std::println("{}", i);
          }
        });
  std::this_thread::sync_wait(sndr);
}
```
* ex::bulk_chunked[color ff0000]
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
- [`execution::bulk`](bulk.md)
- [`execution::bulk_unchunked`](bulk_unchunked.md)
- [`execution::parallel_scheduler`](parallel_scheduler.md)


## 参照
- [P2999R3 Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2999r3.html)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [P2079R10 Parallel scheduler](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2079r10.html)
- [P3481R5 `std::execution::bulk()` issues](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3481r5.html)
- [P3557R3 High-Quality Sender Diagnostics with Constexpr Exceptions](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3557r3.html)
