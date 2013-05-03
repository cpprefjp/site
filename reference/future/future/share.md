#share
```cpp
shared_future<R> share();
```
* shared_future[link /reference/future/shared_future.md]

##概要

<b>futureオブジェクトを共有する。</b>
<b>*thisのfutureオブジェクトと同じ共有状態を持つshared_futureオブジェクトを生成する。</b>
<b></b>
<b>この関数を呼び出したあと、*thisのfutureオブジェクトは無効となる。</b>


##事後条件

`[valid()](/reference/future/future/valid.md) == false`

##戻り値

[`shared_future`](/reference/future/shared_future.md)<R>(std::[move](/reference/utility/move.md)(*this))

##例

```cpp
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
  p.set_value(value);  // 計算結果を設定する

  t1.join();
  t2.join();
}
```
* share[color ff0000]

###出力

```cpp
3
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

[futureとshared_future - yohhoyの日記](http://d.hatena.ne.jp/yohhoy/20120201/p1)

[future::share()は何のためにあるのか - Faith and Brave - C++で遊ぼう](http://d.hatena.ne.jp/faith_and_brave/20121029/1351494001)
