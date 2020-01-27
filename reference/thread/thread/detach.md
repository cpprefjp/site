# detach
* thread[meta header]
* std[meta namespace]
* thread[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void detach();
```

## 概要
スレッドの管理を手放す


## 要件
`thread`オブジェクトにスレッドが関連付けられていること([`joinable()`](joinable.md) `== true`)。


## 効果
`this`に関連付けられていたスレッドはそのまま処理が続行される。またそのスレッドが完了した後には、処理系が同スレッドで利用していたリソース（スレッド�ーカル変数など）を開放する。一方、この関数を呼び出したスレッドはブ�ックされない。


## 事後条件
`this`は何も指さない空の`thread`オブジェクトとなる。


## 例外
detach操作に失敗した場合、[`system_error`](/reference/system_error/system_error.md)例外を投げる。


## 備考
detachされたスレッドは、他のスレッドから直接アクセスすることが出来なくなる。ただし、[`mutex`](/reference/mutex/mutex.md)や[`future`](/reference/future/future.md)オブジェクトなどを介して間接的に同期することは可能。


## 例
```cpp example
#include <iostream>
#include <thread>
#include <future>

std::future<int> start_async(int x, int y)
{
  std::packaged_task<int()> task([x,y]{
    // 非同期実行されるタスク...
    return x + y;
  });
  auto ftr = task.get_future();

  // 新しいスレッド作成後にdetach操作
  std::thread t(std::move(task));
  t.detach();

  return ftr;
  // 変数tにはスレッドが紐付いていないため破棄可能
}

int main()
{
  auto result = start_async(1, 2);
  //...

  std::cout << result.get() << std::endl;
}
```
* detach()[color ff0000]
* std::future[link /reference/future/future.md]
* std::packaged_task[link /reference/future/packaged_task.md]
* task.get_future()[link /reference/future/packaged_task/get_future.md]
* std::move[link /reference/utility/move.md]
* result.get()[link /reference/future/future/get.md]

### 出力
```
3
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 4.6.3, 4.7.0
- [ICC](/implementation.md#icc):
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015

## 参照
