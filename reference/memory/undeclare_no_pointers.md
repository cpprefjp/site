#undeclare_no_pointers
```cpp
namespace std {
  void undeclare_no_pointers(char* p, size_t n);
}
```

##概要
特定の領域に追跡可能なポインタが存在しないことの宣言を取り消す。

##要件
同じ領域が既に`declare_no_pointers()`で宣言されている。

##効果
`declare_no_pointers()`で登録された領域の登録を取り消す。
この関数は、指定された範囲のオブジェクトが寿命を終える前に呼ばれなければならない。

##戻り値
なし

##例外
なし

##例
```cpp
#include <memory>
#include <cstdlib>

int main()
{
  int* p = new int[100];
  std::undeclare_no_pointers(p); // ill-formed
  return EXIT_SUCCESS;
}
```

##バージョン
###言語
- C++11

###処理系
- GCC: ?
- Clang: ?
- Intel: ?
- Visual C++: ?
