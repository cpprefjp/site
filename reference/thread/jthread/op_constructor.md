# コンストラクタ
* thread[meta header]
* std[meta namespace]
* jthread[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
jthread() noexcept;                      // (1) C++20

template <class F, class... Args>
explicit jthread(F&& f, Args&&... args); // (2) C++20

jthread(const jthread&) = delete;        // (3) C++20

jthread(jthread&&) noexcept;             // (4) C++20
```


## 概要
- (1) : デフォルトコンストラクタ。新しいスレッドを生成せず、空の状態にする。
- (2) : 新しいスレッドを生成し、そのスレッド上で引数`args...`を渡して、関数オブジェクト`f`を呼び出す。
- (3) : コピーコンストラクタ。コピー不可。
- (4) : ムーブコンストラクタ。スレッドの所有権を移動する。


## テンプレートパラメータ制約
- (2) :
    - [`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<F>`が`jthread`ではないこと
    - [`decay_t`](/reference/type_traits/decay.md)`<F>`および[`decay_t`](/reference/type_traits/decay.md)`<Args>`の各型がCpp17MoveConstructible要件を満たすこと


## 適格要件
- (2) : 以下の条件がすべて`true`であること
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<`[`decay_t`](/reference/type_traits/decay.md)`<F>, F>`
    - `(`[`is_constructible_v`](/reference/type_traits/is_constructible.md)`<`[`decay_t`](/reference/type_traits/decay.md)`<Args>, Args> && ...)`
    - [`is_move_constructible_v`](/reference/type_traits/is_move_constructible.md)`<`[`decay_t`](/reference/type_traits/decay.md)`<F>>`
    - `(`[`is_move_constructible_v`](/reference/type_traits/is_move_constructible.md)`<`[`decay_t`](/reference/type_traits/decay.md)`<Args>> && ...)`
    - [`is_invocable_v`](/reference/type_traits/is_invocable.md)`<`[`decay_t`](/reference/type_traits/decay.md)`<F>,` [`decay_t`](/reference/type_traits/decay.md)`<Args>...> ||` [`is_invocable_v`](/reference/type_traits/is_invocable.md)`<`[`decay_t`](/reference/type_traits/decay.md)`<F>,` [`stop_token`](/reference/stop_token/stop_token.md)`,` [`decay_t`](/reference/type_traits/decay.md)`<Args>...>`


## 効果
- (2) :
    - メンバ変数として保持している[`std::stop_source`](/reference/stop_token/stop_source.md)型オブジェクトを初期化する
    - 以下の式が有効であればそれで新たなスレッドを生成して実行し、
        ```cpp
        invoke(decay-copy(std::forward<F>(f)), get_stop_token(), decay-copy(std::forward<Args>(args))...)
        ```
        * invoke[link /reference/functional/invoke.md]
        * decay-copy[link /reference/exposition-only/decay-copy.md]
        * get_stop_token()[link get_stop_token.md]

    - そうでなければ以下の式でスレッドを生成して実行する
        ```cpp
        invoke(decay-copy(std::forward<F>(f)), decay-copy(std::forward<Args>(args))...)
        ```
        * invoke[link /reference/functional/invoke.md]
        * decay-copy[link /reference/exposition-only/decay-copy.md]

    - この呼び出しでの戻り値は無視される。この関数呼び出しが例外を送出する場合、呼び出し元スレッドで[`std::terminate`](/reference/exception/terminate.md)が呼び出される


## 同期操作
- (2) : コンストラクタ呼び出しの完了は、`f`のコピーの呼び出し開始**に対して同期する**
    新しいスレッドを生成し、[`INVOKE`](/reference/concepts/Invoke.md)`(DECAY_COPY(`[`std::forward`](/reference/utility/forward.md)`<F>(f)), DECAY_COPY(`[`std::forward`](/reference/utility/forward.md)`<Args>(args))...)`を実行する。ただし`DECAY_COPY`は同コンストラクタを呼び出したスレッド上にて評価される。また`f`のコピーの戻り値は無視される。
    - `DECAY_COPY(x)`は `template <class T> typename std::decay<T>::type decay_copy(T&& v) { return` [`std::forward`](/reference/utility/forward.md)`<T>(v); }` と定義される。おおよそ、`x`が配列型なら先頭要素へのポインタ、`x`が関数型ならその関数ポインタ、`x`がコピーコンストラクト可能な型なら`x`からコピーされたオブジェクト、`x`がムーブコンストラクト可能な型なら`x`からムーブされたオブジェクトとなる。


## 同期操作
- (2) : 同コンストラクタの呼び出し完了は、fのコピーの呼び出し開始**に対して同期する**。つまり、「コンストラクタ呼び出し側スレッドT0でのコンストラクタ呼び出し完了」は、「新しいスレッド`T1`上での`f`のコピーの呼び出し開始」**よりも前に発生する**。


## 事後条件
- (1) :
    - [`get_id()`](get_id.md) `==` [`id()`](/reference/thread/thread/id.md)が`true`となること
    - [`get_stop_source()`](get_stop_source.md)で取得される[`std::stop_source`](/reference/stop_token/stop_source.md)オブジェクトの[`stop_possible()`](/reference/stop_token/stop_source/stop_possible.md)が`false`であること
- (2) :
    - [`get_id()`](get_id.md) `!=` [`id()`](/reference/thread/thread/id.md)が`true`となること
    - [`get_stop_source()`](get_stop_source.md)で取得される[`std::stop_source`](/reference/stop_token/stop_source.md)オブジェクトの[`stop_possible()`](/reference/stop_token/stop_source/stop_possible.md)が`true`であること
    - `*this`は新しいスレッドと関連付けられること
- (4) :
    - `x.`[`get_id()`](get_id.md) `==` [`get_id()`](get_id.md)が`true`であること
    - [`get_id()`](get_id.md)がムーブ前の`x.`[`get_id()`](get_id.md)の値であること
    - `x.`[`get_stop_source()`](get_stop_source.md)`.`[`stop_possible()`](/reference/stop_token/stop_source/stop_possible.md)が`false`であること


## 例外
- (2) : 新しいスレッドの作成に失敗した場合、[`system_error`](/reference/system_error/system_error.md)例外を投げる。その例外オブジェクトには、以下のエラー状態が設定されうる：

    - `resource_unavailable_try_again` : 新たなスレッドを作るためのリソースが不足している。もしくはシステムやプロセスが規定するスレッド数の上限を超過した。



## 例
```cpp example
#include <iostream>
#include <cstdint>
#include <thread>

std::uint64_t sum1 = 0;
std::uint64_t sum2 = 0;

void f1(std::stop_token stoken, std::uint64_t n)
{
  sum1 = 0;
  for (std::uint64_t i = 1; i < n; ++i) {
    if (stoken.stop_requested()) {
      // 中断リクエストがきたのでスレッドを終了する
      break;
    }
    sum1 += i;
  }
}

void f2(std::uint64_t n)
{
  sum2 = 0;
  for (std::uint64_t i = 1; i < n; ++i) {
    sum2 += i;
  }
}

int main()
{
  {
    // 関数の第1引数がstd::stop_token型である場合、
    // スレッドに中断リクエストを送れるようになる
    std::jthread jt1 {f1, 1'000'000};
    std::this_thread::sleep_for(std::chrono::milliseconds{3});
    jt1.request_stop(); // スレッドの中断要求を発行

    // スレッド実行する関数がstd::stop_tokenを受け取らない場合、
    // 中断リクエストを使用せず、
    // デストラクタで自動的にjoinするスレッドオブジェクトとして使用する
    std::jthread jt2 {
      [] { f2(1'000'000); }
    };
  } // jthreadのデストラクタでは、中断要求を発行し、スレッドの終了を待機する

  std::cout << sum1 << std::endl; // 計算できたところまで表示
  std::cout << sum2 << std::endl;
}
```
* std::stop_token[link /reference/stop_token/stop_token.md]
* stoken.stop_requested()[link /reference/stop_token/stop_token/stop_requested.md]
* jt1.request_stop()[link request_stop.md]


### 出力例
```
48458670270
499999500000
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 10.2.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??
