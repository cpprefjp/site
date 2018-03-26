# operator delete[]
* new[meta header]
* function[meta id-type]

```cpp
// 単純な配列の記憶域の解放
void operator delete[](void* ptr) throw();                                                // (1) C++03 まで
void operator delete[](void* ptr) noexcept;                                               // (1) C++11 から
void operator delete[](void* ptr, std::size_t size) noexcept;                             // (2) C++14 から
void operator delete[](void* ptr, std::align_val_t alignment) noexcept;                   // (4) C++17 から
void operator delete[](void* ptr, std::size_t size, std::align_val_t alignment) noexcept; // (4) C++17 から

// 単純な配列の記憶域の解放（例外をスローしない）
void operator delete[](void* ptr, const std::nothrow_t&) throw();                              // (3) C++03 まで
void operator delete[](void* ptr, const std::nothrow_t&) noexcept;                             // (3) C++11 から
void operator delete[](void* ptr, std::align_val_t alignment, const std::nothrow_t&) noexcept; // (4) C++17 から

// replacement-new による配列の記憶域の確保
void operator delete[](void* ptr, void*) throw();                                       // (5) C++03 まで
void operator delete[](void* ptr, void*) noexcept;                                      // (5) C++11 から
```
* nothrow_t[link /reference/new/nothrow_t.md]
* align_val_t[link /reference/new/align_val_t.md]

## 効果
[`new[]`](op_new[].md)演算子によって動的に確保した記憶域を解放する。

`nothrow`版の`delete[]`演算子は、`nothrow`版の[`new[]`](op_new[].md)演算子によって生成されたオブジェクトのコンストラクタが例外を送出した場合に呼び出される。

## 備考

- `alignment` 引数を取らない `delete[]` 演算子に渡される `ptr` は、 `alignment` 引数を取らない `new[]` 演算子によって確保されたものでなければならない。
- `alignment` 引数を取る `delete[]` 演算子に渡される `ptr` は、同じ `alignment` の値を取った `alignment` 版 `new[]` 演算子によって確保されたものでなければならない。

## 例
```cpp example
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
* delete[][color ff0000]

### 出力
```
```

## 参照
- [C++14 サイズ付きデアロケーション](/lang/cpp14/sized_deallocation.md)
- [LWG 2458. N3778 and new library deallocation signatures](https://wg21.cmeerw.net/lwg/issue2458)
