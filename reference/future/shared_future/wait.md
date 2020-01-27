# wait
* future[meta header]
* std[meta namespace]
* shared_future[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void wait() const;
```

## 概要
処理が完了するまで待機する


## 効果
共有状態が準備完了状態([`future_status::ready`](../future_status.md))になるまでこの関数をブ�ックする。


## 戻り値
なし


## 例

```cpp example
#include <iostream>
#include <future>
#include <thread>
#include <utility>

void calc(std::promise<int> p)
{
  p.set_value(3); // 結果を書き込む
}

int main()
{
  std::promise<int> p;
  std::shared_future<int> f = p.get_future().share();

  std::thread t(calc, std::move(p));

  // 結果が書き込まれるまで待機する
  f.wait();

  // 結果を取り出す(準備完了しているため、すぐに値を取り出せる)
  std::cout << f.get() << std::endl;

  t.join();
}
```
* wait[color ff0000]
* std::promise[link /reference/future/promise.md]
* p.set_value[link /reference/future/promise/set_value.md]
* p.get_future()[link /reference/future/promise/get_future.md]
* share()[link /reference/future/future/share.md]
* std::move[link /reference/utility/move.md]
* f.get()[link get.md]

### 出力
```
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


