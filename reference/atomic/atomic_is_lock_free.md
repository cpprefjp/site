#atomic_is_lock_free
```cpp
namespace std {

  template <class T>
  bool atomic_is_lock_free(const volatile atomic<T>* object) noexcept;

  template <class T>
  bool atomic_is_lock_free(const atomic<T>* object) noexcept;

}
```
* atomic[link /reference/atomic/atomic]

##概要

<b>オブジェクトがロックフリーに振る舞えるかを判定する</b>


##戻り値

オブジェクトに対する操作がロックフリーに振る舞えるなら`true`、そうでなければ`false`を返す



##例外

投げない


##備考

この関数は、特殊化された[`atomic`](/reference/atomic/atomic)型に対して定義される。


##例

```cpp
#include <iostream>
#include <atomic>

int main()
{
  std::atomic<int> x(3);

  if (std::atomic_is_lock_free(&x)) {
    std::cout << "atomic<int> is lock-free" << std::endl;
  }
  else {
    std::cout << "atomic<int> isn't lock-free" << std::endl;
  }
}
```
* atomic_is_lock_free[color ff0000]

###出力例

```cpp
atomic<int> is lock-free
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


