#is_lock_free
```cpp
bool is_lock_free() const volatile noexcept;
bool is_lock_free() const noexcept;
```

##概要
オブジェクトに対する操作がロックフリーに振る舞えるかを判定する


##戻り値
オブジェクトに対する操作がロックフリーに振る舞えるなら`true`、そうでなければ`false`を返す


##例
```cpp
#include <iostream>
#include <atomic>

int main()
{
  std::atomic<int> x(3);

  if (x.is_lock_free()) {
    std::cout << "atomic<int> is lock-free" << std::endl;
  }
  else {
    std::cout << "atomic<int> isn't lock-free" << std::endl;
  }
}
```
* is_lock_free[color ff0000]


##出力例
```
atomic<int> is lock-free
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
[N2992 More Collected Issues with Atomics - Lock Free](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2992.htm#lockfree)

