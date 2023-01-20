# declare_no_pointers
* memory[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]
* cpp23removed[meta cpp]

```cpp
namespace std {
  void declare_no_pointers(char* p, size_t n);
}
```

この関数はC++23で削除された。

## 概要
特定の領域に追跡可能なポインタが存在しないことを宣言する。


## 要件
指定された領域が、

- 一部でも`declare_no_pointers()`で既に宣言されていない。
- 割り当てオブジェクトである場合
    - それは単一の割り当てオブジェクトに収まらなければならない。
    - 対応する[`undeclare_no_pointers()`](undeclare_no_pointers.md)の呼び出しまで生存しなければならない。


## 効果
- オブジェクトの型に関係なく、`[p, p + n)`の領域に追跡可能なポインタ位置を含まないものとして扱われる。
- ゆえに、領域に位置する、グローバルな`operator new`でつくられ、到達可能だと宣言されないポインタは、間接参照できない。


## 戻り値
なし


## 例外
投げない。

ただし、いくつかの実装方法ではメモリを割り当てる必要があり、それらでメモリの確保に失敗した場合には、宣言の申請が無視される。


## 備考
- GCの実装において指定された領域そのものの回収を妨げてはならない。
- この関数は、指定された領域が追跡を必要としないことを、GCやリーク検出機に通知するのに使用されることがある。


## 例
```cpp example
#include <cstdlib>
#include <memory>
#include <iostream>

// GC負荷が大きい関数のダミー定義
void some_operation_that_cause_gc() {}

int* ptr = nullptr;

int main()
{
  size_t const size = 10;
  ptr = new intptr_t[size];
  std::declare_no_pointers(ptr, sizeof(intptr_t) * size);

  // 以下のような間接参照は例え領域の型がintptr_tであってもしてはならない
  // *reinterpret_cast<int*>(ptr[10]);

  for(int i = 0; i < size; ++i) {
    ptr[i] = i * 2;
  }

  // 次のGC負荷が大きい関数呼び出しで、`declare_no_pointers()`でGCなどによる追跡が若干軽くなる
  some_operation_that_cause_gc();

  for(int i = 0; i < size; ++i) {
    std::cout << i << std::endl;
  }

  std::undeclare_no_pointers(ptr, sizeof(intptr_t) * size);

  return EXIT_SUCCESS;
}
```
* std::declare_no_pointers[color ff0000]
* intptr_t[link /reference/cstdint/intptr_t.md]
* std::undeclare_no_pointers[link undeclare_no_pointers.md]
* EXIT_SUCCESS[link /reference/cstdlib/exit_success.md]

### 出力
```
0
2
4
6
.
.
（中略）
.
.
198
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): ?
- [Clang](/implementation.md#clang): 3.4 (relaxed実装)
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013 (relaxed実装)


## 参照
- [P2186R2 Removing Garbage Collection Support](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2186r2.html)
