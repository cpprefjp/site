# コンストラクタ
* stop_token[meta header]
* std[meta namespace]
* stop_callback[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
template<class Initializer>
explicit stop_callback(const stop_token& st, Initializer&& init)
  noexcept(is_nothrow_constructible_v<CallbackFn, Initializer>);  // (1)

template<class Initializer>
explicit stop_callback(stop_token&& st, Initializer&& init)
  noexcept(is_nothrow_constructible_v<CallbackFn, Initializer>);  // (2)

stop_callback(const stop_callback&) = delete;  // (3)
stop_callback(stop_callback&&) = delete;       // (4)
```
* stop_token[link ../stop_token.md]
* is_nothrow_constructible_v[link /reference/type_traits/is_nothrow_constructible.md]

## 概要
- (1) : [`stop_token`](../stop_token.md)の左辺値参照を受け取り、その`stop_token`が所有する停止状態への停止要求に応じて呼び出されるコールバックを登録する。
- (2) : [`stop_token`](../stop_token.md)の右辺値参照を受け取り、その`stop_token`が所有する停止状態への停止要求に応じて呼び出されるコールバックを登録する。
- (3) : コピーコンストラクタ。コピー不可。
- (4) : ムーブコンストラクタ。ムーブ不可。


## テンプレートパラメータ制約
クラステンプレートのテンプレート引数`CallbackFn`とコンストラクタのテンプレート引数`Initializer`は[`constructible_from`](/reference/concepts/constructible_from.md)`<CallbackFn, Initializer>`制約を満たすこと。


## 効果
説明専用のメンバ変数`callback-fn`を[`std::forward`](/reference/utility/forward.md)`<CallbackFn>(init)`で初期化し、[停止可能コールバック登録](../stoppable_token.md)を実行する（備考欄を参照）。

コールバックが`st`の停止状態に登録されたた場合、`*this`が停止状態の所有権を共有する。


## 例外
説明専用のメンバ変数`callback-fn`を`init`で初期化する際に例外が発生する場合は、その例外を送出する。


## 備考
停止可能コールバック登録は次のように行われる。

もし`st.`[`stop_requested()`](../stop_token/stop_requested.md) `==` `true` の場合は、コンストラクタを呼び出したスレッドの中で`std::forward<CallbackFn>(callback-fn)()`を評価し、コールバックを呼び出す。したがってこのコールバックの呼び出しはコンストラクタから処理が戻るより前に完了する。

そうでない場合は、`st`が所有している停止状態への所有権を取得して停止状態を共有し、その停止状態に対する最初の[`request_stop()`](../stop_source/request_stop.md)の呼び出しで`std::forward<CallbackFn>(callback-fn)()`を評価するようなコールバックを登録する。
`st`が停止状態を所有していない場合は何もしない。

もし`std::forward<CallbackFn>(callback-fn)()`の呼び出しが例外によって終了した場合は、[`std::terminate()`](/reference/exception/terminate.md)関数が呼び出され、プログラムが異常終了する。


## 例
```cpp example
#include <cassert>
#include <stop_token>
#include <string>

int main()
{
  std::string msg;

  std::stop_source ss;
  std::stop_token st = ss.get_token();
  std::stop_callback cb1(st, [&] { msg += "hello"; });

  assert(msg == "");

  ss.request_stop();

  // 停止要求が作成される前に登録されていたコールバック関数は、
  // 停止要求が作成された際にその中で呼び出される
  assert(msg == "hello");

  std::stop_callback cb2(st, [&] { msg += " world"; });

  // 停止要求が作成されたあとに登録されたコールバック関数は、
  // std::stop_callback のコンストラクタの中で即座に呼び出される
  assert(msg == "hello world");
}
```
* std::stop_token[link ../stop_token.md]
* std::stop_source[link ../stop_source.md]
* std::stop_callback[link ../stop_callback.md]
* request_stop()[link ../stop_source/request_stop.md]
* get_token()[link ../stop_source/get_token.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0660R10 Stop token and joining thread](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0660r10.pdf)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
