#operator delete[]
* new[meta header]
* function[meta id-type]

```cpp
// 単純な配列の記憶域の解放
void operator delete[](void* ptr) throw();                                              // (1) C++03 まで
void operator delete[](void* ptr) noexcept;                                             // (1) C++11 から
void operator delete[](void* ptr, std::size_t size) noexcept;                           // (2) C++14 から

// 単純な配列の記憶域の解放（例外をスローしない）
void operator delete[](void* ptr, const std::nothrow_t&) throw();                       // (3) C++03 まで
void operator delete[](void* ptr, const std::nothrow_t&) noexcept;                      // (3) C++11 から
void operator delete[](void* ptr, std::size_t size, const std::nothrow_t&) noexcept;    // (4) C++14 から

// replacement-new による配列の記憶域の確保
void operator delete[](void* ptr, void*) throw();                                       // (5) C++03 まで
void operator delete[](void* ptr, void*) noexcept;                                      // (5) C++11 から
```
* nothrow_t[link /reference/new/nothrow_t.md]

##効果
[`new[]`](op_new[].md)演算子によって動的に確保した記憶域を解放する。

`nothrow`版の`delete[]`演算子は、`nothrow`版の[`new[]`](op_new[].md)演算子によって生成されたオブジェクトのコンストラクタが例外を送出した場合に呼び出される。

##例
```cpp
#include <iostream>
#include <new>

int main()
{
  try {
    // 3要素のint型配列を動的に作成
    // 確保失敗時にbad_alloc例外が送出される
    int* p3 = new int[3];
    delete[] p3; // p3の配列領域を解放

    // 3要素のint型配列を動的に作成
    // 確保失敗時にヌルポインタが返される
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

##参照
- [N3778 C++ Sized Deallocation](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3778.html)
    - C++14から追加された、領域サイズの引数が付いた`operator delete[]`の提案文書

