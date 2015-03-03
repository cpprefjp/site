#swap (非メンバ関数) (C++11)
* mutex[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  template <class Mutex>
  void swap(unique_lock<Mutex>& x, unique_lock<Mutex>& y) noexcept;
}
```

##概要
2つの`unique_lock`オブジェクトを入れ替える


##効果
```cpp
x.swap(y);
```
* swap[link ./swap.md]


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
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照


