#operator T (C++11)
* atomic[meta header]
* std[meta namespace]
* atomic[meta class]
* function[meta id-type]

```cpp
operator T() const volatile noexcept;
operator T() const noexcept;
```

##概要
型`T`への暗黙の型変換


##戻り値
[`load()`](./load.md)

##例外
投げない


##例
```cpp
#include <iostream>
#include <atomic>

int main()
{
  std::atomic<int> x(1);

  int value = x;
  std::cout << value << std::endl;
}
```
* x[color ff0000]

###出力
```
1
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0

##参照


