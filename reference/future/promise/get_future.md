# get_future
* future[meta header]
* std[meta namespace]
* promise[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
future<R> get_future();
```
* future[link /reference/future/future.md]

## 概要
結果取得のための`future`オブジェクトを取得する


## 戻り値
`*this`と同じ共有状態を持つ[`future`](../future.md)`<R>`オブジェクトを返す


## 同期操作
この関数の呼び出しでは、以下の呼び出しとのデータ競合は発生しない (C++20)：

- [`set_value()`](set_value.md)
- [`set_exception()`](set_exception.md)
- [`set_value_at_thread_exit()`](set_value_at_thread_exit.md)
- [`set_exception_at_thread_exit()`](set_exception_at_thread_exit.md)

これは、以下のようなケースをサポートするための規定：

```cpp
std::promise<void> p;
std::thread t{ []{
  p.get_future().wait();
}};
p.set_value();
t.join();
```
* wait()[link /reference/future/future/wait.md]
* p.set_value()[link set_value.md]

## 例外
この関数は、以下のerror conditionを持つ[`future_error`](../future_error.md)例外オブジェクトを送出する可能性がある：

- [`future_already_retrieved`](../future_errc.md) ： すでにこの関数によって共有状態が作られている
- [`no_state`](/reference/future/future_errc.md) ： `*this`が共有状態を持っていない(`promise`オブジェクトがムーブされると起こりうる)


## 例
```cpp example
#include <iostream>
#include <future>
#include <thread>
#include <utility>

void calc(std::promise<int> p)
{
  int sum = 0;
  for (int i = 0; i < 10; ++i) {
    sum += i + 1;
  }

  p.set_value(sum); // 結果値を書き込む
}

int main()
{
  std::promise<int> p;
  std::future<int> f = p.get_future();

  // 別スレッドで計算を行う
  std::thread t(calc, std::move(p));

  // calc()によって書き込まれた結果を取得
  std::cout << f.get() << std::endl;

  t.join();
}
```
* get_future()[color ff0000]
* p.set_value[link set_value.md]
* std::future[link /reference/future/future.md]
* std::move[link /reference/utility/move.md]
* f.get()[link /reference/future/future/get.md]

### 出力
```
55
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified]


## 参照
- [LWG Issue 2412. `promise::set_value()` and `promise::get_future()` should not race](https://wg21.cmeerw.net/lwg/issue2412)
