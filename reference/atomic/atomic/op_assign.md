```cpp
atomic& operator=(const atomic&) = delete;
atomic& operator=(const atomic&) volatile = delete;

T operator=(T desired) volatile noexcept;
T operator=(T desired) noexcept;
```

##概要

<b>値を書き込む</b>


##効果

[`store`](/reference/atomic/atomic/store)(desired)

##戻り値

`desired`

##例外

投げない


##例

```cpp
#include <iostream>
#include <atomic>

int main()
{
  std::atomic<int> x(1);

  x = 2;

  std::cout << x.load() << std::endl;
}
```
* x = 2[color ff0000]

###出力

```cpp
2
```

##バージョン


###言語


- C++11



###処理系

- [Clang](/implementation#clang): ??
- [GCC](/implementation#gcc): ??
- [GCC, C++0x mode](/implementation#gcc): 4.7.0
- [ICC](/implementation#icc): ??
- [Visual C++](/implementation#visual_cpp) ??



##参照


