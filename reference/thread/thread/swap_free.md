#swap(非メンバ関数)
```cpp
namespace std {
  void swap(thread& x, thread& y) noexcept;

}
```

##概要

<b>2つのthreadオブジェクトを入れ替える</b>


##効果

`x.[swap](/reference/thread/thread/swap.md)(y);`

##戻り値

なし


##例外

投げない


##例

```cpp
#include <thread>

int main()
{
  std::thread th1([]{ /*...*/ });
  std::thread th2;

  std::swap(th1, th2);

  th2.join();

  return 0;
}
```
* swap[color ff0000]

###出力

```cpp
```

##バージョン
```
###言語


- C++11



###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??



##参照


