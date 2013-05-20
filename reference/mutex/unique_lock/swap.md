#swap
```cpp
void swap(unique_lock& u) noexcept;
```

##概要
他の`unique_lock`オブジェクトと値を入れ替える


##効果
`unique_lock`オブジェクト`u`が保持しているミューテックスの所有権を、自分のオブジェクトが保持しているミューテックスの所有権と入れ替える。


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

    lk1.swap(lk2);

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


