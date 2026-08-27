# operator delete
* new[meta header]
* function[meta id-type]
* [meta namespace]

```cpp
void operator delete(void* ptr) throw();                                                // (1) C++98 まで
void operator delete(void* ptr) noexcept;                                               // (1) C++11 から

void operator delete(void* ptr, std::size_t size) noexcept;                             // (2) C++14 から

void operator delete(void* ptr, std::align_val_t alignment) noexcept;                   // (3) C++17 から

void operator delete(void* ptr, std::size_t size, std::align_val_t alignment) noexcept; // (4) C++17 から

void operator delete(void* ptr, const std::nothrow_t&) throw();                              // (5) C++98 まで
void operator delete(void* ptr, const std::nothrow_t&) noexcept;                             // (5) C++11 から

void operator delete(void* ptr, std::align_val_t alignment, const std::nothrow_t&) noexcept; // (6) C++17 から

void operator delete(void* ptr, void*) throw();                                     // (7) C++98 まで
void operator delete(void* ptr, void*) noexcept;                                    // (7) C++11 から
constexpr void operator delete(void* ptr, void*) noexcept;                          // (7) C++26 から
```
* std::nothrow_t[link nothrow_t.md]
* std::align_val_t[link align_val_t.md]

## 概要
動的に確保された単一オブジェクトの記憶域を解放する。

- (1) : 単純な記憶域の解放
- (2) : オブジェクトサイズが判明している場合の、単一オブジェクトの記憶域の解放
- (3) : デフォルトより大きいアライメント要求の、単一オブジェクトの記憶域の解放
- (4) : オブジェクトサイズが判明している場合の、デフォルトより大きいアライメント要求の、単一オブジェクトの記憶域の解放
- (5) : 単純な記憶域の解放。例外を送出しない設定で記憶域を確保されたオブジェクトに対する、単一オブジェクトの記憶域の解放
- (6) : 単純な記憶域の解放。例外を送出しない設定で記憶域を確保されたオブジェクトに対する、デフォルトより大きいアライメント要求の、単一オブジェクトの記憶域の解放
- (7) : 配置newで確保された記憶域の解放


## 事前条件
- (1), (5) : 処理系が厳密なポインタ安全性 ([`pointer_safety::strict`](/reference/memory/pointer_safety.md)) を持つ場合、`ptr`は安全に派生したポインタであること


## 効果
[`new`](op_new.md)演算子によって動的に確保した記憶域を解放する。

`nothrow`版の`delete`演算子は、`nothrow`版の[`new`](op_new.md)演算子によって生成されたオブジェクトのコンストラクタが例外を送出した場合に呼び出される。


## 備考
- これらの関数と、利用者が置き換えた版、および[`std::free`](/reference/cstdlib/free.md)は、異なるスレッドから並行に呼び出されてもデータ競合を引き起こさない。  
    ある記憶域の確保が、同じ記憶域を返した以前の解放よりも後に発生する（*happens after*）ことが保証されるため、再利用された記憶域へのアクセスがデータ競合とならない。
- `alignment` 引数を取らない `delete` 演算子に渡される `ptr` は、 `alignment` 引数を取らない `new` 演算子によって確保されたものでなければならない。
- `alignment` 引数を取る `delete` 演算子に渡される `ptr` は、同じ `alignment` の値を取った `alignment` 版 `new` 演算子によって確保されたものでなければならない。


## 例
```cpp example
#include <iostream>
#include <new>

int main()
{
  try {
    // int型変数を動的に作成
    // 確保失敗時にbad_alloc例外が送出される
    int* p1 = new int();
    delete p1; // p1の領域を解放

    // int型変数を動的に作成
    // 確保失敗時にヌルポインタが返される
    int* p2 = new (std::nothrow) int();
    delete p2;
  }
  catch (std::bad_alloc& e) {
    std::cout << e.what() << std::endl;
    throw;
  }
}
```
* delete[color ff0000]
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
- [LWG Issue 1006. `operator delete` in garbage collected implementation](https://cplusplus.github.io/LWG/issue1006)
    - C++11で、厳密なポインタ安全性を持つ処理系では`ptr`が安全に派生したポインタでなければならないという事前条件が追加された
- [LWG Issue 1524. Allocation functions are missing happens-before requirements and guarantees](https://cplusplus.github.io/LWG/issue1524)
    - C++11で、記憶域の確保・解放関数について、ある確保が以前の解放よりも後に発生するという順序関係が規定された。再利用された記憶域に対するアクセスがデータ競合とならないようにするため
- [LWG Issue 4477. Placement `operator delete` should be constexpr](https://cplusplus.github.io/LWG/issue4477)
    - C++26で、配置`new`に対応する配置`operator delete` (7) に`constexpr`が付いた。定数式評価中の配置new式でコンストラクタが例外を送出した場合に、この解放処理が定数評価文脈で呼ばれるために必要となった
