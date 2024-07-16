# operator delete[]
* new[meta header]
* function[meta id-type]
* [meta namespace]

```cpp
void operator delete[](void* ptr) throw();                                                // (1) C++03 まで
void operator delete[](void* ptr) noexcept;                                               // (1) C++11 から

void operator delete[](void* ptr, std::size_t size) noexcept;                             // (2) C++14 から

void operator delete[](void* ptr, std::align_val_t alignment) noexcept;                   // (3) C++17 から

void operator delete[](void* ptr, std::size_t size, std::align_val_t alignment) noexcept; // (4) C++17 から

void operator delete[](void* ptr, const std::nothrow_t&) throw();                              // (5) C++03 まで
void operator delete[](void* ptr, const std::nothrow_t&) noexcept;                             // (5) C++11 から

void operator delete[](void* ptr, std::align_val_t alignment, const std::nothrow_t&) noexcept; // (6) C++17 から

void operator delete[](void* ptr, void*) throw();                                       // (7) C++03 まで
void operator delete[](void* ptr, void*) noexcept;                                      // (7) C++11 から
```
* std::nothrow_t[link nothrow_t.md]
* std::align_val_t[link align_val_t.md]

## 概要
動的に確保された配列オブジェクトの記憶域を解放する。

- (1) : 単純な配列の記憶域の解放
- (2) : オブジェクトサイズが判明している場合の、配列オブジェクトの記憶域の解放
- (3) : デフォルトより大きいアライメント要求の、配列オブジェクトの記憶域の解放
- (4) : オブジェクトサイズが判明している場合の、デフォルトより大きいアライメント要求の、配列オブジェクトの記憶域の解放
- (5) : 単純な記憶域の解放。例外を送出しない設定で記憶域を確保されたオブジェクトに対する、配列オブジェクトの記憶域の解放
- (6) : 単純な記憶域の解放。例外を送出しない設定で記憶域を確保されたオブジェクトに対する、デフォルトより大きいアライメント要求の、配列オブジェクトの記憶域の解放
- (7) : 配置newで確保された配列オブジェクトの記憶域の解放


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
* std::nothrow[link nothrow_t.md]
* std::bad_alloc[link bad_alloc.md]

### 出力
```
```


## 関連項目
- [C++14 サイズ付きデアロケーション](/lang/cpp14/sized_deallocation.md)
- [C++17 アライメント指定されたデータの動的メモリ確保](/lang/cpp17/dynamic_memory_allocation_for_over-aligned_data.md)


## 参照
- [LWG 2458. N3778 and new library deallocation signatures](https://wg21.cmeerw.net/lwg/issue2458)
