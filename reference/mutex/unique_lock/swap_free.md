#swap(非メンバ関数)(C++11)
```cpp
namespace std {
  template <class Mutex>
  void swap(unique_lock<Mutex>& x, unique_lock<Mutex>& y) noexcept;
}
```

##概要
2つの`unique_lock`オブジェクトを入れ替える


##効果
`x.`[`swap`](./swap.md)`(y);`


##戻り値
なし


##例外
投げない


##例
```cpp
#include <mutex>
#include <utility>

int main()
{
  std::mutex mtx;
  {
    std::unique_lock<std::mutex> lk1(mtx);
    std::unique_lock<std::mutex> lk2;

    std::swap(lk1, lk2);

  } // lk1はunlock()せず、lk2がunlock()する
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
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照


