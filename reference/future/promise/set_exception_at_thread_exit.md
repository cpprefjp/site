# set_exception_at_thread_exit
* future[meta header]
* std[meta namespace]
* promise[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void set_exception_at_thread_exit(exception_ptr p);
```
* exception_ptr[link /reference/exception/exception_ptr.md]

## 概要
スレッド終了時に結果の例外を�定する


## 効果
例外ポインタ`p`を、すぐに準備完了状態([`future_status::ready`](../future_status.md))にはせずに共有状態に格納する。現在のスレッドが終了し、スレッド�ーカル記憶域を持つ全てのオブジェクトを破棄したあと、準備完了状態にする。


## 戻り値
なし


## 例外
この関数は、以下のerror conditionを持つ[`future_error`](../future_error.md)例外オブジェクトを送出する可能性がある：

- [`promise_already_satisfied`](../future_errc.md) ： すでに値もしくは例外が�定されている
- [`no_state`](../future_errc.md) ： `*this`が共有状態を持っていない(`promise`オブジェクトがムーブされると起こりうる)


## 例
```cpp example
#include <iostream>
#include <future>
#include <thread>
#include <utility>
#include <stdexcept>
#include <functional>

// promiseを左辺値参照にしているのはVisual C++ 2012のバグのため
// https://connect.microsoft.com/VisualStudio/feedback/details/737812
void calc(std::promise<int>& p)
{
  try {
    // 計算で何らかのエラーが発生した
    throw std::invalid_argument("invalid argument!");
  }
  catch (...) {
    // 呼び出し元スレッドに例外を�定し、
    // このスレッド終了時に準備完了状態にする
    std::exception_ptr ep = std::current_exception();
    p.set_exception_at_thread_exit(ep);
  }
}

int main()
{
  std::promise<int> p;
  std::future<int> f = p.get_future();

  std::thread t(calc, std::ref(p));

  try {
    int result = f.get(); // promiseで�定された例外が送出される
  }
  catch (std::invalid_argument& e) {
    std::cout << e.what() << std::endl;
  }

  t.join();
}
```
* https://connect.microsoft.com/VisualStudio/feedback/details/737812[link https://connect.microsoft.com/VisualStudio/feedback/details/737812]
* set_exception_at_thread_exit[color ff0000]
* std::invalid_argument[link /reference/stdexcept.md]
* std::exception_ptr[link /reference/exception/exception_ptr.md]
* std::current_exception[link /reference/exception/current_exception.md]
* std::future[link /reference/future/future.md]
* p.get_future()[link get_future.md]
* std::ref[link /reference/functional/ref.md]
* f.get()[link /reference/future/future/get.md]

### 出力
```
invalid argument!
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 5.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012


## 参照
- [_at_thread_exit系の関数が�在している理由](/article/lib/at_thread_exit.md)


