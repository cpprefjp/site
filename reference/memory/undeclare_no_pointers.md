# undeclare_no_pointers
* memory[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  void undeclare_no_pointers(char* p, size_t n);
}
```

## 概要
特定の領域に追跡可能なポインタが�在しないことの宣言を取り消す。


## 要件
同じ領域が既に[`declare_no_pointers()`](declare_no_pointers.md)で宣言されている。


## 効果
[`declare_no_pointers()`](declare_no_pointers.md)で登録された領域の登録を取り消す。

この関数は、指定された範囲のオブジェクトが寿命を終える前に呼ばれなければならない。


## 戻り値
なし


## 例外
投げない


## 例
```cpp example
#include <memory>
#include <cstdlib>

int main()
{
  int* p = new int[100];
  std::undeclare_no_pointers(p); // ill-formed
  return EXIT_SUCCESS;
}
```
* std::undeclare_no_pointers[color ff0000]
* EXIT_SUCCESS[link /reference/cstdlib/exit_success.md]

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): ?
- [Clang](/implementation.md#clang): 3.4 (relaxed実装)
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013 (relaxed実装)
