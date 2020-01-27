# ラムダ式の初期化�ャプチャ
* cpp14[meta cpp]

## 概要
「初期化�ャプチャ(init-capture)」は、任意の式の結果をラムダ式に�ャプチャする機能である。

```cpp
int increment(int x)
{
  return x + 1;
}

int main()
{
  // increment(3)の戻り値を、変数aとしてラムダ式内で使用する
  auto f = [a = increment(3)](int b) { return a + b; };

  int result = f(2); // result == 6
}
```

この機能を使用することで、以下のようなこともできる：

- 変数をムーブによって�ャプチャする

    ```cpp
    std::vector<T> v; // 巨大な配列
    auto f = [x = std::move(v)] { /* … */ };
    ```
    * std::move[link /reference/utility/move.md]

- ひとつの変数に対して、コピー�ャプチャと参照�ャプチャを同時に行う

    ```cpp
    int a = 3;
    auto f = [b = a, &c = a] {
      // このラムダ式内で、変数bはaのコピー、変数cはaへの参照
    };
    ```


## 仕様
「初期化�ャプチャ(init-capture)」が追加されたことにより、従来の変数名もしくは`this`を指定する�ャプチャは「簡易�ャプチャ(simple-capture)」と呼ばれることとなった。

初期化�ャプチャの構文は以下：

```
identifier initializer
& identifier initializer
```

1行目は、初期化式の結果を、任意の�別�で受け取る構文。

2行目は、初期化式の結果への参照を、任意の�別�で受け取る構文。

```cpp
int x = 3;
std::vector<int> v = {1, 2, 3};
auto f = [a = x + 1,            // 式x + 1の結果を変数名aとして、ラムダ式内で使用する
          &b = x,               // 変数xへの参照を変数名bとして、ラムダ式内で使用する
          c {std::move(v)}] {}; // 波カッコによる初期化構文を使用して、変数vを変数cにムーブする
```
* std::move[link /reference/utility/move.md]

初期化�ャプチャの初期化式は、ラムダ式を定義した時点で評価される。

初期化�ャプチャでは、パラメータパックの�ャプチャはできない。


## 例
### unique_ptrの所有権を移動させる
```cpp example
#include <memory>
#include <utility>

int main()
{
  std::unique_ptr<int> p = std::make_unique<int>(3);

  // pの所有権を、ラムダ式内の変数qに移動させる
  // unique_ptrは、ムーブはできるがコピーはできない型だが、
  // そのためにpを参照�ャプチャすると、寿命が切れたpに不�アクセスしてしまう
  // 可能性がある。
  auto f = [q = std::move(p)] {};
}
```
* <memory>[link /reference/memory.md]
* <utility>[link /reference/utility.md]
* std::unique_ptr[link /reference/memory/unique_ptr.md]
* std::make_unique[link /reference/memory/make_unique.md]
* std::move[link /reference/utility/move.md]

出力 :

```
```


### promiseの所有権を別なスレッドに移動させる
```cpp example
#include <iostream>
#include <utility>
#include <thread>
#include <future>

int main()
{
  std::promise<int> p;
  std::future<int> f = p.get_future();

  // 時間のかかる処理用のスレッドに、
  // 処理結果を書き込むためのpromiseオブジェクトを移動させる。
  //
  // 処理結果を書き込むスレッドにはpromiseオブジェクトの所有権を持たせ、
  // 処理結果を�み込むスレッドにはfutureオブジェクトの所有権を持たせる。
  std::thread t {[x = std::move(p)]() mutable {
    // …時間のかかる処理…

    // 処理の結果を書き込む
    x.set_value(3);
  }};

  // 別スレッドでの処理結果を�み込む
  int result = f.get();
  std::cout << result << std::endl;

  t.join();
}
```
* <utility>[link /reference/utility.md]
* <thread>[link /reference/thread.md]
* <future>[link /reference/future.md]
* std::promise[link /reference/future/promise.md]
* p.get_future()[link /reference/future/promise/get_future.md]
* std::future[link /reference/future/future.md]
* std::thread[link /reference/thread/thread.md]
* std::move[link /reference/utility/move.md]
* x.set_value[link /reference/future/promise/set_value.md]
* f.get()[link /reference/future/future/get.md]
* t.join()[link /reference/thread/thread/join.md]

出力 :
```
3
```


## 関連項目
- [C++11 ラムダ式](/lang/cpp11/lambda_expressions.md)
- [C++14 ジェネリックラムダ](generic_lambdas.md)


## 参照
- [N3610 Generic lambda-capture initializers, supporting capture-by-move](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3610.html)
- [N3648 Wording Changes for Generalized Lambda-capture](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3648.html)

