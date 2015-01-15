#コンストラクタ (C++11)
```cpp
initializer_list() noexcept;           // C++11
constexpr initializer_list() noexcept; // C++14
```

##概要
空の`initializer_list`オブジェクトを構築する。


##例
```cpp
#include <cassert>
#include <initializer_list>

int main()
{
  std::initializer_list<int> init;
  assert(init.size() == 0);
}
```

###出力
```
```


##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](implementation.md#clang): 3.1
- [GCC, C++11 mode](/implementation.md#gcc): 4.4.0


