#サイズ付きデアロケーション
* cpp14[meta cpp]

##概要
C++03ではクラス用の`delete`演算子として、サイズをとるバージョンをオーバーロードできた。C++14では、それに対応するグローバルの`delete`演算子を定義できるようにする。

C++14では、オーバーロード可能なグローバルの`new`演算子、`delete`演算子として、以下を許可する：

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
operator delete(void*, std::size_t, const std::nothrow_t&)   // C++14から追加
operator delete[](void*, std::size_t)                        // C++14から追加
operator delete[](void*, std::size_t, const std::nothrow_t&) // C++14から追加
```
* std::size_t[link /reference/cstddef/size_t.md]
* std::nothrow_t[link /reference/new/nothrow_t.md]


追加分の詳細なインタフェースは、以下のようになっている：

```cpp
void operator delete(void* ptr, std::size_t size) noexcept;
void operator delete(void* ptr, std::size_t size,
                     const std::nothrow_t&) noexcept;

void operator delete[](void* ptr, std::size_t size) noexcept;
void operator delete[](void* ptr, std::size_t size,
                       const std::nothrow_t&) noexcept;
```
* std::size_t[link /reference/cstddef/size_t.md]
* std::nothrow_t[link /reference/new/nothrow_t.md]

この機能を有効活用することで、メモリアロケータのパフォーマンスを向上できる可能性がある。


##仕様
- サイズをとる`delete`演算子に渡される`size`パラメータは、対応する`new`演算子に渡された`size`パラメータと等しい
- 型`T`が完全型でかつ、`void*`をパラメータにとる`delete`演算子と`void*`と[`std::size_t`](/reference/cstddef/size_t.md)のパラメータにとる`delete`演算子の両方が定義されている場合、型`T`のポインタに対する`delete`演算子の呼び出しは[`std::size_t`](/reference/cstddef/size_t.md)をとるバージョンを呼び出す


##例
```cpp
#include <cstdio>
#include <cstdlib>
#include <new>

void* operator new[](std::size_t size)
{
  std::printf("new size:%llu\n", static_cast<unsigned long long>(size));
  return std::malloc(size);
}

void operator delete[](void*) noexcept
{
  std::printf("delete\n");
}

void operator delete[](void*, std::size_t t) noexcept
{
  std::printf("delete with two arguments, %llu\n", static_cast<unsigned long long>(t));
}

struct A {
  ~A() {} // デストラクタを明示的に定義しない場合、
          // 破棄処理を呼び出す必要なしと判断され、
          // delete演算子が呼び出されない可能性がある
};

int main()
{
  delete[] (new A[5]);
}
```


###出力
```
new size:13
delete with two arguments, 13
```


##備考
Clangは3.7以降、サイズをとる`delete`演算子を使用する場合、`-fsized-deallocation`オプションを付ける必要がある。


##関連項目
- [`allocator::deallocate`](/reference/memory/allocator/deallocate.md)
- [`operator delete`](/reference/new/op_delete.md)
- [`operator delete[]`](/reference/new/op_delete[].md)


##参照
- [N3432 C++ Sized Deallocation](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3432.html)
- [N3536 C++ Sized Deallocation](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3536.html)
- [N3663 C++ Sized Deallocation](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3663.html)
- [N3778 C++ Sized Deallocation](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3778.html)

