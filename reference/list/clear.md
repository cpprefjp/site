#clear
```cpp
void clear();          // C++03
void clear() noexcept; // C++11
```

##概要
全ての要素を削除する


##効果
`list`オブジェクトが管理しているすべての要素を破棄する。
また、要素を指す全ての参照、ポインタ、イテレータが無効になる。past-the-end イテレータは無効にならない。


##戻り値
なし


##例外
投げない


##例
```cpp
#include <iostream>
#include <cassert>
#include <list>

int main()
{
  std::list<int> ls = {1, 2, 3};

  ls.clear();

  assert(ls.empty());

  for (int x : ls) {
    std::cout << x << std::endl;
  }
}
```

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


