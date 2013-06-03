#swap
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
- [Clang](/implementation#clang.md):
- [GCC](/implementation#gcc.md):
- [GCC, C++0x mode](/implementation#gcc.md): 4.6.3, 4.7.0
- [ICC](/implementation#icc.md):
- [Visual C++](/implementation#visual_cpp.md):


##参照
