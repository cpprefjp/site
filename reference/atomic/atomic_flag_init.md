#ATOMIC_FLAG_INIT
```cpp
namespace std {

  #define ATOMIC_FLAG_INIT see below
}
```

##概要

<b>フラグを初期化する。</b>
<b></b>
<b>このマクロは、[atomic_flag](/reference/atomic/atomic_flag)オブジェクトの初期化に使用し、フラグをクリア状態にする。静的オブジェクトに対しては、その初期化は静的に行われなければならない。</b>


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

- [Clang](/implementation#clang): ??
- [GCC](/implementation#gcc): 
- [GCC, C++0x mode](/implementation#gcc): 4.7.0
- [ICC](/implementation#icc): ??
- [Visual C++](/implementation#visual_cpp) ??



##参照


