#size (C++11)
```cpp
size_t size() const;
```

##概要
シード列の要素数を取得する。


##戻り値
シード列の要素数を返す。


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::seed_seq seq = {1, 2, 3};

  std::size_t size = seq.size();
  std::cout << size << std::endl;
}
```

###出力
```
3
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.2
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照


