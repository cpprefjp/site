# share
* future[meta header]
* std[meta namespace]
* future[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
shared_future<R> share();
```
* shared_future[link ../shared_future.md]

## 概要
`future`オブジェクトを共有する。

`*this`の`future`オブジェクトと同じ共有状態を持つ`shared_future`オブジェクトを生成する。

この関数を呼び出したあと、`*this`の`future`オブジェクトは無効となる。


## 事後条件
[`valid()`](valid.md) `== false`


## 戻り値
[`shared_future`](../shared_future.md)`<R>(std::`[`move`](/reference/utility/move.md)`(*this))`


## 例
```cpp example
#include <iostream>
#include <thread>
#include <mutex>
#include <future>

std::mutex print_mtx_;
template <class T>
void print(const T& x)
{
  std::lock_guard<std::mutex> lk(print_mtx_);
  std::cout << x << std::endl;
}

void process(std::shared_future<int> f)
{
  // 各shared_futureオブジェクトから結果値を取り出す
  int result = f.get();

  print(result);
}

int main()
{
  std::promise<int> p;
  std::shared_future<int> f = p.get_future().share();

  std::thread t1(process, f);
  std::thread t2(process, f);

  int value = 3; // 何らかの計算
  p.set_value(value);  // 計算結果を�定する

  t1.join();
  t2.join();
}
```
* share()[color ff0000]
* f.get()[link /reference/future/shared_future/get.md]
* std::promise[link /reference/future/promise.md]
* p.get_future()[link /reference/future/promise/get_future.md]
* p.set_value[link /reference/future/promise/set_value.md]

### 出力
```
3
3
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

[futureとshared_future - yohhoyの日記](http://d.hatena.ne.jp/yohhoy/20120201/p1)
[future::share()は何のためにあるのか - Faith and Brave - C++で遊ぼう](http://d.hatena.ne.jp/faith_and_brave/20121029/1351494001)
