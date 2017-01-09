#async
* future[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class F, class... Args>
  future<typename result_of<F(Args...)>::type>
    async(F&& f, Args&&... args);                // (1) C++11

  template <class F, class... Args>
  future<
    typename result_of<
      typename decay<F>::type(typename decay<Args>::type...)
    >::type
  > async(F&& f, Args&&... args);                // (1) C++14

  template <class F, class... Args>
  future<typename result_of<F(Args...)>::type>
    async(launch policy, F&& f, Args&&... args); // (2) C++11

  template <class F, class... Args>
  future<
    typename result_of<
      typename decay<F>::type(typename decay<Args>::type...)
    >::type
  > async(launch policy, F&& f, Args&&... args); // (2) C++14
}
```
* future[link future.md]
* launch[link launch.md]
* result_of[link /reference/type_traits/result_of.md]
* decay[link /reference/type_traits/decay.md]

##概要
関数を非同期実行する。

この関数は、指定された関数を非同期実行し、結果値を取得するための`future`オブジェクトを返す。

返された`future`オブジェクトの`get()`もしくは`wait()`を呼び出すことにより、非同期実行の完了を待機する。

##要件
- 関数オブジェクト`F`および`Args...`の各型が、[`is_move_construcitble`](/reference/type_traits/is_move_constructible.md)`<T>::value == true`であること。
- [`INVOKE`](/reference/functional/invoke.md)`(DECAY_COPY(std::`[`forward`](/reference/utility/forward.md)`<F>(f)), DECAY_COPY(std::`[`forward`](/reference/utility/forward.md)`<Args>(args))...)`が可能であること。

##効果
この関数は、パラメータ`policy`で指定された実行ポリシーの値によって振る舞いを変える。

`policy`を指定しない場合は[`launch::async`](launch.md) `|` [`launch::deferred`](launch.md)となり、どちらの実行ポリシーが選択されるかは実装定義となる。

各実行ポリシーの振る舞いは以下のようになる：

- `policy & launch::async`が`0`じゃない場合、新たなスレッドで関数オブジェクト`f`に`args...`を渡して実行する
    - ( [`INVOKE`](/reference/functional/invoke.md)`(DECAY_COPY(std::`[`forward`](/reference/utility/forward.md)`<F>(f)), DECAY_COPY(std::`[`forward`](/reference/utility/forward.md)`<Args>(args))...)` )
    - 関数オブジェクト`f`の戻り値が、この関数の戻り値である[`future`](future.md)オブジェクトとの共有状態に書き込まれる。
    - 関数オブジェクト`f`の内部で例外が投げられた場合は、共有状態に投げられた例外が設定される。
- `policy & launch::deferred`が`0`じゃない場合、関数オブジェクト`f`をその場では実行せず、遅延状態にする
    - (`DECAY_COPY(std::`[`forward`](/reference/utility/forward.md)`<F>(f))`と`DECAY_COPY(std::`[`forward`](/reference/utility/forward.md)`<Args>(args))...`を[`future`](future.md)オブジェクトとの共有状態に格納する)。
    - この関数の戻り値である[`future`](future.md)オブジェクトの[`get()`](future/get.md)もしくは[`wait()`](future/wait.md)が呼び出されるタイミングで、関数オブジェクト`f`に`args...`を渡して実行する。
- 有効な実行ポリシーが指定されていない場合(整数値を`launch`型にキャストするような状況)、その動作は未定義(C++14)。


##戻り値
非同期実行される関数オブジェクト`f`の結果値取得のための`future`オブジェクトを返す。


##例外
この関数は、以下のerror conditionを持つ[`future_error`](future_error.md)例外オブジェクトを送出する可能性がある：

- [`resource_unavailable_try_again`](future_errc.md) ： [`launch::async`](launch.md)が指定され、新たなスレッドを起動しようとしたができなかった


##例
```cpp
#include <iostream>
#include <future>
#include <thread>

int foo() { std::cout << "executes foo()\n"; return 3; }

int main()
{
  // 新たなスレッドで関数foo()を非同期実行
  {
    std::cout << "invokes std::async(std::launch::async, foo)" << std::endl;
    std::future<int> f = std::async(std::launch::async, foo);
    std::this_thread::sleep_for(std::chrono::milliseconds(10));
    std::cout << "main thread: slept for 10 msec\n";
    // 非同期実行の結果を取得
    int result = f.get();
    std::cout << "foo() = " << result << std::endl;
  }

  std::cout << std::endl;

  // 関数fを遅延状態で非同期実行
  {
    // この段階では関数foo()を実行しない
    std::cout << "invokes std::async(std::launch::deferred, foo)" << std::endl;
    std::future<int> f = std::async(std::launch::deferred, foo);
    std::this_thread::sleep_for(std::chrono::milliseconds(10));
    std::cout << "main thread: slept for 10 msec\n";

    // 非同期実行の結果を取得
    // この段階で関数foo()を実行
    int result = f.get();
    std::cout << "foo() = " << result << std::endl;
  }
  return 0;
}
```

###出力
```
invokes std::async(std::launch::async, foo)
executes foo()
main thread: slept for 10 msec
foo() = 3

invokes std::async(std::launch::deferred, foo)
main thread: slept for 10 msec
executes foo()
foo() = 3
```

##バージョン

###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0


##参照
- [LWG Issue 2120. What should `async` do if neither `async` nor `deferred` is set in policy?](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2120)
- [LWG Issue 2021. Further incorrect usages of `result_of`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2021)
    - C++14で、戻り値型の計算に`decay`を適用するようにした。

