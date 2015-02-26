#operator T& (C++11)
* functional[meta header]
* std[meta namespace]

```cpp
operator T& () const noexcept;
```

##概要
生参照への変換


##戻り値
保持している参照を返す


##例外
投げない


##例
```cpp
#include <iostream>
#include <functional>

int main()
{
  int x = 3;

  std::reference_wrapper<int> r(x);
  int& rx = r; // 参照に暗黙変換する
  rx += 1;

  std::cout << x << std::endl;
}
```

###出力
```
4
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


