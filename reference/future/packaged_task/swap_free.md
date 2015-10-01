#swap (非メンバ関数)
* future[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class R, class... ArgTypes>
  void swap(packaged_task<R(ArgTypes...)>& x, packaged_task<R(ArgTypes...)>& y) noexcept;
}
```

##概要
2つの`packaged_task`オブジェクトを入れ替える


##効果
`x.`[`swap`](./swap.md)`(y)`


##戻り値
なし


##例外
投げない


##例
```cpp
#include <iostream>
#include <future>

int foo() { return 1; }
int bar() { return 2; }

int main()
{
  std::packaged_task<int()> task1(foo);
  std::packaged_task<int()> task2(bar);

  std::swap(task1, task2);

  std::future<int> f1 = task1.get_future();
  std::future<int> f2 = task2.get_future();

  task1();
  task2();

  std::cout << f1.get() << std::endl;
  std::cout << f2.get() << std::endl;
}
```
* swap[color ff0000]

###出力
```
2
1
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0


##参照


