#swap(フリー関数版)
```cpp
namespace std {

  template <class R, class... ArgTypes>
  void swap(packaged_task<R(ArgTypes...)>& x, packaged_task<R(ArgTypes...)>& y) noexcept;

}
```

##概要

<b>2つのpackaged_taskオブジェクトを入れ替える</b>


##効果

`x.[swap](/reference/future/packaged_task/swap.md)(y)`

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

```cpp
2
1
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


