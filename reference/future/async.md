#async
```cpp
namespace std {
  template <class F, class... Args>
  future<typename result_of<F(Args...)>::type>
    async(F&& f, Args&&... args);

  template <class F, class... Args>
  future<typename result_of<F(Args...)>::type>
    async(launch policy, F&& f, Args&&... args);
}
```
* future[link ./future.md]
* launch[link ./launch.md]

##概要
関数を非同期実行する。

この関数は、指定された関数を非同期実行し、結果値を取得するための`future`オブジェクトを返す。
返された`future`オブジェクトの`get()`もしくは`wait()`を呼び出すことにより、非同期実行の完了を待機する。

##要件
関数オブジェクト`F`および`Args...`の各型が、[`is_move_construcitble`](/reference/type_traits/is_move_constructible.md)`<T>::value == true`であること。
[`INVOKE`](/reference/functional/invoke.md)`(DECAY_COPY(std::`[`forward`](/reference/utility/forward.md)`<F>(f)), DECAY_COPY(std::`[`forward`](/reference/utility/forward.md)`<Args>(args))...)`が可能であること。

##効果
この関数は、パラメータ`policy`で指定された実行ポリシーの値によって振る舞いを変える。
`policy`を指定しない場合は[`launch::async`](./launch.md)` | `[`launch::deferred`](./launch.md)となり、どちらの実行ポリシーが選択されるかは実装定義となる。

各実行ポリシーの振る舞いは以下のようになる：

- `policy & launch::async`が`0`じゃない場合新たなスレッドで関数オブジェクト`f`に`args...`を渡して実行する( [`INVOKE`](/reference/functional/invoke.md)`(DECAY_COPY(std::`[`forward`](/reference/utility/forward.md)`<F>(f)), DECAY_COPY(std::`[`forward`](/reference/utility/forward.md)`<Args>(args))...)` )。関数オブジェクト`f`の戻り値が、この関数の戻り値である[`future`](./future.md)オブジェクトとの共有状態に書き込まれる。関数オブジェクト`f`の内部で例外が投げられた場合は、共有状態に投げられた例外が設定される。
- `policy & launch::deferred`が`0`じゃない場合関数オブジェクト`f`をその場では実行せず、遅延状態にする(`DECAY_COPY(std::`[`forward`](/reference/utility/forward.md)`<F>(f))`と`DECAY_COPY(std::`[`forward`](/reference/utility/forward.md)`<Args>(args))...`を[`future`](./future.md)オブジェクトとの共有状態に格納する)。この関数の戻り値である[`future`](./future.md)オブジェクトの[`get()`](./future/get.md)もしくは[`wait()`](./future/wait.md)が呼び出されるタイミングで関数オブジェクト`f`に`args...`を渡して実行する。

##戻り値
非同期実行される関数オブジェクト`f`の結果値取得のための`future`オブジェクトを返す。

##例外
この関数は、以下のerror conditionを持つ[`future_error`](./future_error.md)例外オブジェクトを送出する可能性がある：

- [`resource_unavailable_try_again`](./future_errc.md) ： [`launch::async`](./launch.md)が指定され、新たなスレッドをを起動しようとしたができなかった


##備考


##例
```cpp
#include <iostream>
#include <future>

int foo() { return 3; }

int main()
{
  // 新たなスレッドで関数foo()を非同期実行
  {
    std::future<int> f = std::async(std::launch::async, foo);

    // 非同期実行の結果を取得
    int result = f.get();
    std::cout << result << std::endl;
  }

  // 関数fを遅延状態で非同期実行
  {
    // この段階では関数foo()を実行しない
    std::future<int> f = std::async(std::launch::deferred, foo);

    // 非同期実行の結果を取得
    // この段階で関数foo()を実行
    int result = f.get();
    std::cout << result << std::endl;
  }
}
```
* async[color ff0000]

###出力
```
3
3
```

##バージョン

###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照

