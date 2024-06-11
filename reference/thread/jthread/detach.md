# detach
* thread[meta header]
* std[meta namespace]
* jthread[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
void detach();
```

## 概要
スレッドの管理を手放す


## 要件
`jthread`オブジェクトにスレッドが関連付けられていること([`joinable()`](joinable.md) `== true`)。


## 効果
`this`に関連付けられていたスレッドはそのまま処理が続行される。またそのスレッドが完了した後には、処理系が同スレッドで利用していたリソース（スレッドローカル変数など）を解放する。一方、この関数を呼び出したスレッドはブロックされない。


## 事後条件
`this`は何も指さない空の`jthread`オブジェクトとなる。


## 例外
detach操作に失敗した場合、[`system_error`](/reference/system_error/system_error.md)例外を投げる。


## 備考
- detachされたスレッドは、他のスレッドから直接アクセスすることが出来なくなる。ただし、[`mutex`](/reference/mutex/mutex.md)や[`future`](/reference/future/future.md)オブジェクトなどを介して間接的に同期することは可能。
- detachされたスレッドに対して停止要求は引き続き発行できる。ただし、このクラスのデストラクタでは[`request_stop()`](request_stop.md)は呼び出されなくなる


## 例
```cpp example
#include <iostream>
#include <thread>
#include <future>

std::future<int> start_async(int x, int y)
{
  std::packaged_task<int(std::stop_token)> task([x,y](std::stop_token stoken) {
    // 非同期実行されるタスク...
    if (stoken.stop_requested()) { return -1; }
    return x + y;
  });
  auto ftr = task.get_future();

  // 新しいスレッド作成後にdetach操作
  std::jthread t(std::move(task));
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
* std::stop_token[link /reference/stop_token/stop_token.md]
* stop_requested()[link /reference/stop_token/stop_token/stop_requested.md]

### 出力
```
3
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 10.2.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??
