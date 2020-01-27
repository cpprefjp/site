# サイズ付きデア�ケーション
* cpp14[meta cpp]

## 概要
C++03ではクラス用の`delete`演算�として、サイズをとるバージョンをオーバー�ードできた。C++14では、それに対応するグ�ーバルの`delete`演算�を定義できるようにする。

C++14では、オーバー�ード可能なグ�ーバルの`new`演算�、`delete`演算�として、以下を許可する：

```cpp
operator new(std::size_t)
operator new(std::size_t, const std::nothrow_t&)
operator new[](std::size_t)
operator new[](std::size_t, const std::nothrow_t&)
operator delete(void*)
operator delete(void*, const std::nothrow_t&)
operator delete[](void*)
operator delete[](void*, const std::nothrow_t&)
operator delete(void*, std::size_t)                          // C++14から追加
operator delete(void*, std::size_t, const std::nothrow_t&)   // C++14から追加（ただし、備考を参照）
operator delete[](void*, std::size_t)                        // C++14から追加
operator delete[](void*, std::size_t, const std::nothrow_t&) // C++14から追加（ただし、備考を参照）
```
* std::nothrow_t[link /reference/new/nothrow_t.md]


追加分の詳細なインタフェースは、以下のようになっている：

```cpp
void operator delete(void* ptr, std::size_t size) noexcept;
void operator delete(void* ptr, std::size_t size,
                     const std::nothrow_t&) noexcept;           // ただし、備考を参照

void operator delete[](void* ptr, std::size_t size) noexcept;
void operator delete[](void* ptr, std::size_t size,
                       const std::nothrow_t&) noexcept;         // ただし、備考を参照
```
* std::nothrow_t[link /reference/new/nothrow_t.md]

この機能を有効活用することで、メモリア�ケータのパフォーマンスを向上できる可能性がある。


## 仕様
- サイズをとる`delete`演算�に渡される`size`パラメータは、対応する`new`演算�に渡された`size`パラメータと�しい
- 型`T`が完全型でかつ、`void*`をパラメータにとる`delete`演算�と`void*`と[`std::size_t`](/reference/cstddef/size_t.md)のパラメータにとる`delete`演算�の両方が定義されている場合、型`T`のポインタに対する`delete`演算�の呼び出しは[`std::size_t`](/reference/cstddef/size_t.md)をとるバージョンを呼び出す


## 例
```cpp example
#include <cstdio>
#include <cstdlib>
#include <new>

void* operator new[](std::size_t size)
{
  std::printf("new size:%zu\n", size);
  return std::malloc(size);
}

void operator delete[](void*) noexcept
{
  std::printf("delete\n");
}

void operator delete[](void*, std::size_t t) noexcept
{
  std::printf("delete with two arguments, %zu\n", t);
}

struct A {
  ~A() {} // デストラクタを明示的に定義しない場合、
          // delete演算�が呼び出されない可能性がある
};

int main()
{
  delete[] (new A[5]);
}
```
* std::printf[link /reference/cstdio/printf.md.nolink]
* std::malloc[link /reference/cstdlib/malloc.md.nolink]


### 出力
```
new size:13
delete with two arguments, 13
```


## 備考
- C++14 で追加された関数のうち、最後の引数が `const std::nothrow_t&` であるオーバー�ード 2 つは、次期規格では削除される予定である。  
	これは、当該オーバー�ードが `new` 式、あるいは `delete` 式から暗黙で呼び出される事は無いためである。
- Clangは3.7以降、サイズをとる`delete`演算�を使用する場合、`-fsized-deallocation`オプションを付ける必要がある。


## 関連項目
- [`allocator::deallocate`](/reference/memory/allocator/deallocate.md)
- [`operator delete`](/reference/new/op_delete.md)
- [`operator delete[]`](/reference/new/op_delete[].md)


## 参照
- [N3432 C++ Sized Deallocation](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3432.html)
- [N3536 C++ Sized Deallocation](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3536.html)
- [N3663 C++ Sized Deallocation](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3663.html)
- [N3778 C++ Sized Deallocation](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3778.html)
- [LWG Issue 2458. N3778 and new library deallocation signatures](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2458)
