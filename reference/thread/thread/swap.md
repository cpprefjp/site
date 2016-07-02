#swap
* thread[meta header]
* std[meta namespace]
* thread[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void swap(thread& x) noexcept;
```

##概要
別の`thread`と交換する。


##効果
`*this`と`x`を入れ替える。


##例外
送出しない。


##例
```cpp
#include <thread>

int main()
{
  std::thread th1([]{ /*...*/ });
  std::thread th2;

  th1.swap(th2);

  th2.join();

  return 0;
}
```
* swap[color ff0000]

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc):
- [GCC, C++11 mode](/implementation.md#gcc): 4.6.3, 4.7.0
- [ICC](/implementation.md#icc):
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0, 14.0


##参照
