# async
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
  future<invoke_result_t<decay_t<F>, decay_t<Args>...>>
    async(F&& f, Args&&... args);                // (1) C++17

  template <class F, class... Args>
  [[nodiscard]] future<invoke_result_t<decay_t<F>, decay_t<Args>...>>
    async(F&& f, Args&&... args);                // (1) C++20


  template <class F, class... Args>
  future<typename result_of<F(Args...)>::type>
    async(launch policy, F&& f, Args&&... args); // (2) C++11

  template <class F, class... Args>
  future<
    typename result_of<
      typename decay<F>::type(typename decay<Args>::type...)
    >::type
  > async(launch policy, F&& f, Args&&... args); // (2) C++14

  template <class F, class... Args>
  future<invoke_result_t<decay_t<F>, decay_t<Args>...>>
    async(launch policy, F&& f, Args&&... args); // (2) C++17

  template <class F, class... Args>
  [[nodiscard]] future<invoke_result_t<decay_t<F>, decay_t<Args>...>>
    async(launch policy, F&& f, Args&&... args); // (2) C++20
}
```
* future[link future.md]
* launch[link launch.md]
* result_of[link /reference/type_traits/result_of.md]
* invoke_result_t[link /reference/type_traits/invoke_result.md]
* decay[link /reference/type_traits/decay.md]
* decay_t[link /reference/type_traits/decay.md]

## 概要
関数を非同期実行する。

この関数は、指定された関数を非同期実行し、結果値を取得するための`future`オブジェクトを返す。

返された`future`オブジェクトの`get()`もしくは`wait()`を呼び出すことにより、非同期実行の完了を待機する。

## 要件
- 関数オブジェクト`F`および`Args...`の各型が、[`is_move_construcitble`](/reference/type_traits/is_move_constructible.md)`<T>::value == true`であること。
- [`INVOKE`](/reference/concepts/Invoke.md)`(DECAY_COPY(std::`[`forward`](/reference/utility/forward.md)`<F>(f)), DECAY_COPY(std::`[`forward`](/reference/utility/forward.md)`<Args>(args))...)`が可能であること。

## 効果
この関数は、パラメータ`policy`で指定された実行ポリシーの値によって振る舞いを変える。

`policy`を指定しない場合は[`launch::async`](launch.md) `|` [`launch::deferred`](launch.md)となり、どちらの実行ポリシーが選択されるかは実装定義となる。

各実行ポリシーの振る舞いは以下のようになる：

- `policy & launch::async`が`0`でない場合、新たなスレッドで関数オブジェクト`f`に`args...`を渡して実行する
    - ( [`INVOKE`](/reference/concepts/Invoke.md)`(DECAY_COPY(std::`[`forward`](/reference/utility/forward.md)`<F>(f)), DECAY_COPY(std::`[`forward`](/reference/utility/forward.md)`<Args>(args))...)` )
    - 関数オブジェクト`f`の戻り値が、この関数の戻り値である[`future`](future.md)オブジェクトとの共有状態に書き込まれる。
    - 関数オブジェクト`f`の内部で例外が投げられた場合は、共有状態に投げられた例外が設定される。
- `policy & launch::deferred`が`0`でない場合、関数オブジェクト`f`をその場では実行せず、遅延状態にする
    - (`DECAY_COPY(std::`[`forward`](/reference/utility/forward.md)`<F>(f))`と`DECAY_COPY(std::`[`forward`](/reference/utility/forward.md)`<Args>(args))...`を[`future`](future.md)オブジェクトとの共有状態に格納する)。
    - この関数の戻り値である[`future`](future.md)オブジェクトの[`get()`](future/get.md)もしくは[`wait()`](future/wait.md)が呼び出されるタイミングで、関数オブジェクト`f`に`args...`を渡して実行する。
- 有効な実行ポリシーが指定されていない場合(整数値を`launch`型にキャストするような状況)、その動作は未定義(C++14)。


## 戻り値
非同期実行される関数オブジェクト`f`の結果値取得のための`future`オブジェクトを返す。

## 例外
この関数は、以下のerror conditionを持つ[`system_error`](/reference/system_error/system_error.md)例外オブジェクトを送出する可能性がある：

- [`resource_unavailable_try_again`](/reference/system_error/errc.md) ： [`launch::async`](launch.md)が指定され、新たなスレッドを起動しようとしたができなかった

## launch::asyncポリシーを指定した場合の注意点

### 戻り値

[`launch::async`](launch.md)を指定してこの関数を呼び出した場合のみ、戻り値の`future`オブジェクトはそのデストラクタにおいて、指定された関数の終了を待機する（おそらく、[`wait()`](future/wait.md)を呼ぶ）。

すなわち、[`launch::async`](launch.md)を指定した場合には戻り値を何かしらの形で受けておかないとこの関数は同期的に実行されているかのように振舞う。また、戻り値を何かしらの形で受けた場合でもそのスコープを抜ける際に指定された関数の終了を待機する。この挙動はクラスのメンバ変数に保存する等、外部スコープに持ち出したとしても変わらない。

```cpp
//これらの呼び出しは別スレッドで実行されるが、同期的に呼び出される
std::async(std::launch::async, []{ f(); }); //f()が完了するまではこの行で待機する
std::async(std::launch::async, []{ g(); }); //g()の呼び出しは必ずf()の終了後、g()の完了まで処理はブロックされる

//次の様に戻り値を受けておけば、それぞれ非同期的に実行される
{
  auto futuref = std::async(std::launch::async, []{ f(); }); //f()の完了を待機しない
  auto futureg = std::async(std::launch::async, []{ g(); }); //g()の呼び出しはf()の完了前かもしれない

  /*何か他の処理*/

} //このブロックスコープを抜ける際に、f()とg()の完了を待機する
```

なお、この関数に[`launch::async`](launch.md)指定して得た`future`オブジェクトのみがデストラクタでの共有状態の完了待機を行う。その他の方法で取得した`future`オブジェクトはこのような振舞をしない。


### MSVCの実装とスレッドローカルストレージの利用
MSVCにおける`launch::async`指定した際のこの関数の実装は、Windowsの提供するスレッドプールのスレッドを用いて処理を実行するため、新しいスレッドを起動せず、処理スレッドは終了されない。

このため、スレッドローカルストレージを利用している場合、あるスレッドにおける同じ処理の1回目の呼び出しではスレッドローカルストレージ内のオブジェクトは破棄されず、2回目以降の呼び出しではスレッドローカルストレージ内オブジェクトの初期化処理は実行されない。  
また、どのスレッドが呼ばれるかはおそらくランダムであるため、違うスレッドローカルストレージにある同じ名前のオブジェクトを利用していることになる可能性もある。  
Windows環境においてMSVC実装の本関数とスレッドローカルストレージを合わせて利用する場合は注意が必要である。

なおC++標準規格ではC++11以降一貫して、「`launch::async`を指定して本関数を呼び出した場合は新しいスレッドを起動する」という様に記述されているため、MSVCのこの実装は規格違反となる。


## 例
```cpp example
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
* std::async[color ff0000]
* std::launch::async[link launch.md]
* std::launch::deferred[link launch.md]
* std::future[link future.md]
* std::this_thread::sleep_for[link /reference/thread/this_thread/sleep_for.md]
* f.get()[link future/get.md]

### 出力
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

## バージョン

### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012


## 参照
- [LWG Issue 2120. What should `async` do if neither `async` nor `deferred` is set in policy?](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2120)
- [LWG Issue 2021. Further incorrect usages of `result_of`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2021)
    - C++14で、戻り値型の計算に`decay`を適用するようにした。
- [async関数launch::asyncポリシーとfutureのちょっと特殊な動作 - yohhoyの日記](https://yohhoy.hatenadiary.jp/entry/20120317/p1)
- [P0604R0 Resolving GB 55, US 84, US 85, US 86](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0604r0.html)
- [P0600R1 `[[nodiscard]]` in the Library, Rev1](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0600r1.pdf)
- [In Visual Studio, `thread_local` variables' destructor not called when used with `std::async`, is this a bug? - stackoverflow](https://stackoverflow.com/questions/50897768/in-visual-studio-thread-local-variables-destructor-not-called-when-used-with)
- [&lt;future&gt; functions - Microsoft Docs](https://docs.microsoft.com/en-us/cpp/standard-library/future-functions?view=vs-2019#remarks)
