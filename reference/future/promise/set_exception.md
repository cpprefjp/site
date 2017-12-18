# set_exception
* future[meta header]
* std[meta namespace]
* promise[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void set_exception(exception_ptr p);
```
* exception_ptr[link /reference/exception/exception_ptr.md]

## 概要
結果の例外を設定する


## 効果
例外ポインタ`p`をアトミックに共有状態に格納し、準備完了状態([`future_status::ready`](../future_status.md))にする。


## 戻り値
なし


## 例外
この関数は、以下のerror conditionを持つ[`future_error`](../future_error.md)例外オブジェクトを送出する可能性がある：

- [`promise_already_satisfied`](../future_errc.md) ： すでに値もしくは例外が設定されている
- [`no_state`](../future_errc.md) ： `*this`が共有状態を持っていない(`promise`オブジェクトがムーブされると起こりうる)


## 例
```cpp example
#include <iostream>
#include <future>
#include <thread>
#include <utility>
#include <stdexcept>

void calc(std::promise<int> p)
{
  try {
    // 計算で何らかのエラーが発生した
    throw std::invalid_argument("invalid argument!");
  }
  catch (...) {
    // 呼び出し元スレッドに例外を設定する
    std::exception_ptr ep = std::current_exception();
    p.set_exception(ep);
  }
}

int main()
{
  std::promise<int> p;
  std::future<int> f = p.get_future();

  std::thread t(calc, std::move(p));

  try {
    int result = f.get(); // promiseで設定された例外が送出される
  }
  catch (std::invalid_argument& e) {
    std::cout << e.what() << std::endl;
  }

  t.join();
}
```
* set_exception[color ff0000]
* std::invalid_argument[link /reference/stdexcept.md]
* std::exception_ptr[link /reference/exception/exception_ptr.md]
* std::current_exception[link /reference/exception/current_exception.md]
* std::future[link /reference/future/future.md]
* p.get_future()[link get_future.md]
* std::move[link /reference/utility/move.md]
* f.get()[link /reference/future/future/get.md]

### 出力
```
invalid argument!
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012


## 参照


