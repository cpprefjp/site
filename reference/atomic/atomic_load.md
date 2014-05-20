#atomic_load (C++11)
```cpp
namespace std {
  template <class T>
  T atomic_load(const volatile atomic<T>* object) noexcept;

  template <class T>
  T atomic_load(const atomic<T>* object) noexcept;
}
```
* atomic[link /reference/atomic/atomic.md]


##概要
アトミックに値を読み込む


##効果
[`memory_order_seq_cst`](./memory_order.md)のメモリオーダーにしたがって、アトミックに値を読み込む


##戻り値
アトミックに読み込まれた値


##例外
投げない


##備考
この関数は、特殊化された[`atomic`](./atomic.md)型に対して定義される。


##例
```cpp
#include <iostream>
#include <atomic>

int main()
{
  std::atomic<int> x(3);

  // 値を読み込む
  int result = std::atomic_load(&x);

  std::cout << result << std::endl;
}
```
* atomic_load[color ff0000]


###出力
```
3
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


