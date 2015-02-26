#wait (C++11)
* future[meta header]
* std[meta namespace]
* shared_future[meta class]
* function[meta id-type]

```cpp
void wait() const;
```

##概要
処理が完了するまで待機する


##効果
共有状態が準備完了状態([`future_status::ready`](../future_status.md))になるまでこの関数をブロックする。


##戻り値
なし


##例

```cpp
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

###出力
```
3
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0


##参照


