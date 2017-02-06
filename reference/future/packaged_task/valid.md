#valid
* future[meta header]
* std[meta namespace]
* packaged_task[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
bool valid() const noexcept;
```

##概要
共有状態を持っているか確認する


##戻り値
`*this`が共有状態を持っていれば`true`を返し、そうでなければ`false`を返す。


##例外
投げない


##例
```cpp
#include <iostream>
#include <future>
#include <utility>

void foo() {}

int main()
{
  {
    std::packaged_task<void()> task;
    std::cout << std::boolalpha << task.valid() << std::endl;
  }
  {
    std::packaged_task<void()> task(foo);
    std::cout << std::boolalpha << task.valid() << std::endl;
  }
}
```
* valid()[color ff0000]

###出力
```
false
true
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


