#unique (C++11)
* memory[meta header]

```cpp
bool unique() const noexcept;
```

##概要
有効なリソースを所有しているかを判定する。


##戻り値

```cpp
use_count() == 1
```
* get()[link ./get.md]


##備考
この関数は、[`use_count()`](./use_count.md)を使用するよりも高速である可能性がある。


##例
```cpp
#include <iostream>
#include <memory>

int main()
{
  std::shared_ptr<int> p(new int(3));

  // 所有権を持つユーザーが1人
  if (p.unique()) {
    std::cout << "unique" << std::endl;
  }

  // 所有権を持つユーザーが2人
  std::shared_ptr<int> q = p;
  if (!p.unique()) {
    std::cout << "non unique" << std::endl;
  }
}
```

###出力
```
unique
non unique
```

##バージョン
###言語
- C++11

###処理系
- [GCC](/implementation.md#gcc): 4.4.7
- [Clang libc++, C++11 mode](/implementation.md#clang): 3.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 9.0 (TR1), 10.0, 11.0, 12.0
