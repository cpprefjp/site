#wait
```cpp
void wait() const;
```

##概要

<b>処理が完了するまで待機する</b>


##効果

共有状態が準備完了状態([`future_status::ready`](/reference/future/future_status.md))になるまでこの関数をブロックする。


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
  std::future<int> f = p.get_future();

  std::thread t(calc, std::move(p));

  // 結果が書き込まれるまで待機する
  f.wait();

  // 結果を取り出す(準備完了しているため、すぐに値を取り出せる)
  std::cout << f.get() << std::endl;

  t.join();
}
```

###出力

```cpp
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


