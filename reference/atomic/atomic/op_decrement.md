#operator--
```cpp
T operator--() volatile noexcept;
T operator--() noexcept;
T operator--(int) volatile noexcept;
T operator--(int) noexcept;
```

##概要

<b>値をデクリメントする</b>



##戻り値

前置operator--：
`[fetch_sub](/reference/atomic/atomic/fetch_sub)(1) - 1`
後置operator--：
[`fetch_sub`](/reference/atomic/atomic/fetch_sub)(1)



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

  --x;

  std::cout << x.load() << std::endl;
}
```
* --x[color ff0000]

###出力

```cpp
2
```

##バージョン


###言語


- C++11



###処理系

- [Clang](/implementation#clang): ??
- [GCC](/implementation#gcc): 
- [GCC, C++0x mode](/implementation#gcc): 4.7.0
- [ICC](/implementation#icc): ??
- [Visual C++](/implementation#visual_cpp) ??



##参照


