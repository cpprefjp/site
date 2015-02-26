#swap (C++11)
* thread[meta header]
* std[meta namespace]

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
- [GCC, C++0x mode](/implementation.md#gcc): 4.6.3, 4.7.0
- [ICC](/implementation.md#icc):
- [Visual C++](/implementation.md#visual_cpp):


##参照
