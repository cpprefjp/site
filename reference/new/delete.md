#delete
* new[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
// 単純な記憶域の解放
void operator delete(void* ptr) noexcept;
// 単純な記憶域の解放（例外をスローしない）
void operator delete(void* ptr, const std::nothrow_t&) noexcept;

// 単純な配列の記憶域の解放
void operator delete[](void* ptr) noexcept;
// 単純な配列の記憶域の解放（例外をスローしない）
void operator delete(void* ptr, const std::nothrow_t&) noexcept;

// replacement-new に対応する記憶域の解放
void operator delete(void* ptr, void*) noexcept;
// replacement-new による配列の記憶域の確保
void operator delete[](void* ptr, void*) noexcept;
```
* nothrow_t[link /reference/new/nothrow_t.md]

##効果
[`new`](./new.md)演算子によって動的に確保した記憶域を解放する。

`nothrow`版の`delete`演算子は、`nothrow`版の[`new`](./new.md)演算子によって生成されたオブジェクトのコンストラクタが例外を送出した場合に呼び出される。

##例
```cpp
#include <iostream>
#include <new>

int main()
{
  try {
    // int型変数を動的に作成
    int* p1 = new int();
    delete p1; // p1の領域を解放

    // int型変数を動的に作成
    int* p2 = new (std::nothrow) int();
    delete p2;

    // 3要素のint型配列を動的に作成
    // 確保失敗時にbad_alloc例外が送出される
    int* p3 = new int[3];
    delete[] p3; // p3の配列領域を解放

    // 3要素のint型配列を動的に作成
    // 確保失敗時にbad_alloc例外が送出される
    int* p4 = new (std::nothrow) int[3];
    delete[] p4;
  }
  catch (std::bad_alloc& e) {
    std::cout << e.what() << std::endl;
    throw;
  }
}
```

###出力
```
```

