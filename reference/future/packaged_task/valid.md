#valid
```cpp
bool valid() const noexcept;
```

##概要

<b>共有状態を持っているか確認する</b>


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
* valid[color ff0000]
* valid[color ff0000]

###出力

```cpp
false
true
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


