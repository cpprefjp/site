```cpp
namespace std {

  #define ATOMIC_FLAG_INIT see below
}
```

##概要

<b>フラグを初期化する。</b>
<b></b>
<b>このマクロは、[atomic_flag](https://sites.google.com/site/cpprefjp/reference/atomic/atomic_flag)オブジェクトの初期化に使用し、フラグをクリア状態にする。静的オブジェクトに対しては、その初期化は静的に行われなければならない。</b>


##例

```cpp
#include <iostream>
#include <atomic>

int main()
{
  std::atomic_flag x = ATOMIC_FLAG_INIT;

  // フラグを立て、変更前の値を確認する
  bool before = x.test_and_set();
  std::cout << std::boolalpha << before << std::endl;
}
```
* ATOMIC_FLAG_INIT[color ff0000]

###出力

```cpp
false
```

##バージョン


###言語


- C++11



###処理系

- [Clang](https://sites.google.com/site/cpprefjp/implementation#clang): ??
- [GCC](https://sites.google.com/site/cpprefjp/implementation#gcc): 
- [GCC, C++0x mode](https://sites.google.com/site/cpprefjp/implementation#gcc): 4.7.0
- [ICC](https://sites.google.com/site/cpprefjp/implementation#icc): ??
- [Visual C++](https://sites.google.com/site/cpprefjp/implementation#visual_cpp) ??



##参照


