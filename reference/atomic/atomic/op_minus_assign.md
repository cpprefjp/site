#operator-=
* atomic[meta header]
* std[meta namespace]
* atomic[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
T operator-=(T operand) volatile noexcept;
T operator-=(T operand) noexcept;
```

##概要
加算を行う


##戻り値
[`fetch_sub`](./fetch_sub.md)`(operand) - operand`


##例外
投げない


##備考
この関数は、`atomic`クラスの整数型およびポインタに対する特殊化で定義される。


##例
```cpp
#include <iostream>
#include <atomic>

int main()
{
  std::atomic<int> x(3);

  x -= 2;

  std::cout << x.load() << std::endl;
}
```
* x -= 2;[color ff0000]

###出力
```
1
```


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0


##参照


