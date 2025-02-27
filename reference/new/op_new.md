# operator new
* new[meta header]
* function[meta id-type]
* [meta namespace]

```cpp
void* operator new(std::size_t size) throw(std::bad_alloc);         // (1) C++03
void* operator new(std::size_t size);                               // (1) C++11
[[nodiscard]] void* operator new(std::size_t size);                 // (1) C++20
void* operator new(std::size_t size);                               // (1) C++26

void* operator new(std::size_t size,
                   std::align_val_t alignment);                     // (2) C++17
[[nodiscard]] void* operator new(std::size_t size,
                                 std::align_val_t alignment);       // (2) C++20
void* operator new(std::size_t size,
                   std::align_val_t alignment);                     // (2) C++26

void* operator new(std::size_t size,
                   const std::nothrow_t&) throw();                  // (3) C++03
void* operator new(std::size_t size,
                   const std::nothrow_t&) noexcept;                 // (3) C++11
[[nodiscard]] void* operator new(std::size_t size,
                                 const std::nothrow_t&) noexcept;   // (3) C++20
void* operator new(std::size_t size,
                   const std::nothrow_t&) noexcept;                 // (3) C++26

void* operator new(std::size_t size,
                   std::align_val_t alignment,
                   const std::nothrow_t&) noexcept;                 // (4) C++17
[[nodiscard]] void* operator new(std::size_t size,
                                 std::align_val_t alignment,
                                 const std::nothrow_t&) noexcept;   // (4) C++20
void* operator new(std::size_t size,
                   std::align_val_t alignment,
                   const std::nothrow_t&) noexcept;                 // (4) C++26

void* operator new(std::size_t size, void* ptr) throw();            // (5) C++03
void* operator new(std::size_t size, void* ptr) noexcept;           // (5) C++11
[[nodiscard]] void* operator new(std::size_t size,
                                 void* ptr) noexcept;               // (5) C++20
void* operator new(std::size_t size,
                   void* ptr) noexcept;                             // (5) C++26
```
* std::bad_alloc[link bad_alloc.md]
* std::nothrow_t[link nothrow_t.md]
* std::align_val_t[link align_val_t.md]


## 概要
単一オブジェクトのために動的に記憶域を確保する。

- (1) : 単純な記憶域の確保。指定されたサイズの記憶域を確保する
- (2) : (1)に対してデフォルトよりも大きいアライメント要求がされた場合に、アライメント値付きで呼び出される
- (3) : 単純な記憶域の確保。確保失敗時に例外送出しない。指定されたサイズの記憶域を確保する
- (4) : (3)に対してデフォルトよりも大きいアライメント要求がされた場合に、アライメント値付きで呼び出される
- (5) : 配置newによる記憶域の確保


## 効果
- (1) : `size` で指定したサイズ（バイト）の記憶域を確保する。  
    確保された記憶域の先頭アドレスは、`size` バイトのあらゆるオブジェクトのアライメント要求を満たしている。それより大きいアライメントが`alignment` によって要求される場合、指定したアライメント要求を満たす。  
- (2) : `size` で指定したサイズ（バイト）の記憶域を確保する。  
    確保された記憶域の先頭アドレスは、`alignment`によって指定されたアライメント要求を満たす。
- (3) : `size` で指定したサイズ（バイト）の記憶域を確保する。  
    確保された記憶域の先頭アドレスは、`size` バイトのあらゆるオブジェクトのアライメント要求を満たしている。それより大きいアライメントが`alignment` によって要求される場合、指定したアライメント要求を満たす。
- (4) : `size` で指定したサイズ（バイト）の記憶域を確保する。  
    確保された記憶域の先頭アドレスは、`alignment` によって指定された、アライメント要求を満たす。
- (5) : 何もしない。


## 戻り値
- (1), (2) : 確保した記憶域の先頭アドレスを指すポインタ。
- (3), (4) : 記憶域を確保できた場合、確保した記憶域の先頭アドレスを指すポインタ。  
    確保できなかった場合、ヌルポインタ。
- (5) : 引数 `ptr`


## 例外
- (1), (2) : 確保に失敗した場合、[`bad_alloc`](bad_alloc.md) 例外を送出する
- (3), (4) : 確保に失敗した場合でも、例外を送出しない


## 備考
- (1)と(2)、および、(3)と(4) の形式は、`size` が `0` でも他の確保済みの記憶域と異なるアドレスを返す。  
    ただし、記憶域の確保に失敗する可能性もあり、また、成功しても当該ポインタを間接参照した場合は未定義動作を引き起こす。

- (1)と(2)、および、(3)と(4) の形式は、利用者がこれらとおなじシグネチャの関数を用意することで、標準ライブラリの提供している関数を置き換えることができる。  
    なお、(5) の形式については、置き換えることはできない（許可されていない）。

- (2)、および、(4) の形式は、C++17以降、デフォルトの `new` が保証するアライメントよりも大きなアライメントを要求する型については自動的に [`std::align_val_t`](align_val_t.md) を取るオーバーロードを選択する。
    このとき、`align_val_t(alignof(T))` が引数として渡される。この閾値は定義済みマクロ `__STDCPP_DEFAULT_NEW_ALIGNMENT__` で提供される。
    既存のコードを利用する観点から、利用者が `operator new` を置き換えていた場合は、その型がデフォルトより大きなアライメントを要求していたとしても、ユーザーが置き換えた関数が使用される。

- (2)、および、(4) の形式において、`alignment` に無効な値を渡した場合、未定義動作を引き起こす。

- (1)と(2) の形式の `operator new` を呼び出すだけであれば、（`new` 式から間接的に呼ばれる場合も含めて）`new` ヘッダをインクルードする必要はない。

- (1)と(2) の形式の詳細な正確な挙動は以下の通りである。
    - `size` で指定したサイズ（バイト）の記憶域を確保しようとする。なお、記憶域の確保に C 互換ライブラリ関数 `malloc()` や [`aligned_alloc()`](/reference/cstdlib/aligned_alloc.md) を用いるか否かは規定されていない。
    - もし、記憶域を確保できた場合、確保した先頭アドレスを返す。
    - もし、確保できなかった場合、
        - 現在の [`new_handler`](new_handler.md) が ヌルポインタであれば、[`bad_alloc`](bad_alloc.md) 例外をスローする。
        - 現在の [`new_handler`](new_handler.md) が ヌルポインタでなければ、当該関数を呼び出した後、最初に戻って記憶域の確保から再試行する（ループする）。

        なお、[`new_handler`](new_handler.md) は [`bad_alloc`](bad_alloc.md) 例外をスローしたり、呼び出し元に戻らなかったりすることがあるので注意。

- (3) の形式の詳細な正確な挙動は、以下の通り C++03 までと C++11 以降で異なる。
    - C++03 までの場合、(1) の形式とほぼ同様の処理を行うが、記憶域が確保できなかったり、現在の [`new_handler`](new_handler.md) が[`bad_alloc`](bad_alloc.md) 例外をスローしたりした場合には、ヌルポインタを返す。
    - C++11 以降の場合、(1) の形式を呼び出し、[`bad_alloc`](bad_alloc.md) 例外がスローされた場合には、ヌルポインタを返す。

    この差は、利用者が `operator new` を置き換えていない場合には顕在化しないが、利用者が (1) の形式のみを置き換えた場合、C++03 までは (2) の形式を呼び出しても置き換えられたバージョンは呼び出されない。  
    `new` 式と異なり、`delete` 式には配置構文が存在しないため、(3) の形式で確保した記憶域も通常の `delete` 式で解放することになる（コンストラクタで例外がスローされた場合を除く。[`operator delete`](op_delete.md)も参照）。  
    従って、C++03 までの場合、(1) の形式を利用者提供の関数で置き換える場合は、(3) の形式も (1) の形式と同様の記憶域確保を行う利用者提供の関数で置き換えるべきである。その場合、C++11 の (3) の形式のように、(1) を呼び出した上で例外ハンドリングする方法が安全確実な方法である。  
    なお、C++11 からは (3) の形式は (1) を呼び出すことになっているため、 (1) の形式のみを置き換えれば問題はないが、C++03 までのバージョンでも同様に動くようにするため、あるいは、標準ライブラリのバグで (3) の形式が (1) の形式を呼び出していない可能性もあるため、(3) の形式も提供した方が良いかもしれない。

- (5) の形式は、実質何もしていない。この形式は、記憶域を確保した上でそこに新たなオブジェクトを構築するのではなく、あらかじめ確保されている記憶域上に新たなオブジェクトを構築するのに用いられる。  
    一般に、プログラム実行中の記憶域の動的確保は、処理系が OS からヒープを確保するのに対し、(5) の形式では、既にプログラムに確保済みの任意の記憶域上にオブジェクトを構築するため、上手く使った場合には `new` / `delete` を大量に繰り返す必要のある処理を高速に実現しうる。

- `new` 式は `operator new` を呼び出すだけではない事に注意。  
    `new` 式は、`operator new` を呼び出した後、確保された記憶域上にオブジェクトを構築する（つまり、コンストラクタを呼び出す）。  
    特に、(3) の形式を使用するために `new` 式を `new(std::`[`nothrow`](nothrow_t.md)`)` のようにしても、依然としてコンストラクタが例外をスローする可能性はあるため、`new` 式が例外をスローしないとは限らない。


## 例
```cpp example
#include <iostream>
#include <new>
#include <complex>

int main()
{
  using cl = std::complex<long double>;

  try {
    // (1) cl 型変数を動的に作成
    // 確保失敗時に bad_alloc 例外が送出される
    cl* p1 = new cl();
    delete p1;

    // (3) cl 型変数を動的に作成
    // 確保失敗時にヌルポインタが返される
    cl* p2 = new (std::nothrow) cl();
    delete p2;  // 配置 delete と言うものはないので、通常の delete 式で記憶域を解放する

    // (5) char 配列のスタック領域に、cl 型変数を動的に作成
    // 領域のアライメントに注意
    alignas(cl) char one_field[sizeof(cl)] = {};
    cl* p3 = new(one_field) cl();
    p3->~cl();  // delete は使えないため、デストラクタを直接呼び出す
  }
  catch (std::bad_alloc& e) {
    std::cout << e.what() << std::endl;
    throw;
  }
}
```
* <new>[link /reference/new.md]
* new[color ff0000]
* std::complex[link /reference/complex/complex.md]
* std::nothrow[link nothrow_t.md]
* std::bad_alloc[link bad_alloc.md]

### 出力
```
```


## 関連項目
- [C++17 アライメント指定されたデータの動的メモリ確保](/lang/cpp17/dynamic_memory_allocation_for_over-aligned_data.md)


## 参照
- [P0600R1 `[[nodiscard]]` in the Library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0600r1.pdf)
    - C++20で`[[nodiscard]]`が付加された
- [P2422R1 Remove `nodiscard` annotations from the standard library specification](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2422r1.html)
    - C++26で`[[nodiscard]]`指定が削除された
