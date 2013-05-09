#T&への変換演算子
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
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照


