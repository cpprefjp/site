# コンストラクタ
* memory_resource[meta header]
* function[meta id-type]
* std::pmr[meta namespace]
* monotonic_buffer_resource[meta class]
* cpp17[meta cpp]

```cpp
explicit monotonic_buffer_resource(memory_resource* upstream);                      //(1)

monotonic_buffer_resource(size_t initial_size, memory_resource *upstream);          //(2)

monotonic_buffer_resource(void *buffer, size_t buffer_size,
                            memory_resource *upstream);                             //(3)

monotonic_buffer_resource()
        : monotonic_buffer_resource(get_default_resource()) {}                      //(4)

explicit monotonic_buffer_resource(size_t initial_size)
        : monotonic_buffer_resource(initial_size, get_default_resource()) {}        //(5)

monotonic_buffer_resource(void *buffer, size_t buffer_size)
        : monotonic_buffer_resource(buffer, buffer_size, get_default_resource()) {} //(6)

monotonic_buffer_resource(const monotonic_buffer_resource&) = delete;               //(7)
```
* size_t[link /reference/cstddef/size_t.md]

## 概要

- (1) : 上流[`memory_resource`](/reference/memory_resource/memory_resource.md)を受けて構築
- (2) : 内部メモリ領域の初期サイズを指定し、上流[`memory_resource`](/reference/memory_resource/memory_resource.md)を受けて構築
- (3) : 別に確保されたメモリ領域を初期メモリ領域として使用し、上流[`memory_resource`](/reference/memory_resource/memory_resource.md)を受けて構築
- (4) : デフォルトコンストラクタ、
- (5) : 内部メモリ領域の初期サイズを指定し構築
- (6) : 別に確保されたメモリ領域を初期メモリ領域として使用し構築
- (7) : コピーコンストラクタ、コピー禁止

## 要件

- (1)(2)(3) : `upstream`は有効な`memory_resource`オブジェクトを指していること。（当然、nullでないこと）
- (2)(5) : `initial_size`は0より大きいこと
- (3)(6) : `buffer_size`は`buffer`に割り当てられているメモリ領域のサイズ以下であること。

## 引数

- `upstream` -- 利用したい上流`memory_resource`へのポインタ
- `initial_size` -- 内部メモリ領域の初期サイズ
- `buffer` -- 初期メモリ領域として利用する外部メモリへのポインタ
- `buffer_size` -- `buffer`の指す領域のサイズ

## 効果

- (1) : `upstream`を上流`memory_resource`として設定し、初期メモリ領域を空（`nullptr`）、次に補充するメモリサイズを実装定義の値に設定

- (2) : `upstream`を上流`memory_resource`として設定し、初期メモリ領域を空（`nullptr`）、次に補充するメモリサイズを`initial_size`に設定

- (3) : `upstream`を上流`memory_resource`として設定し、`buffer`を初期メモリ領域、`buffer_size`に実装定義の増加分を足した値（整数とは限らない）を次に補充するメモリサイズに設定

- (4) : [`get_default_resource()`](/reference/memory_resource/get_default_resource.md)から取得した`memory_resource`を(1)に渡し委譲

- (5) : `initial_size`と[`get_default_resource()`](/reference/memory_resource/get_default_resource.md)から取得した`memory_resource`を(2)に渡し委譲

- (6) : `buffer`と`buffer_size`及び[`get_default_resource()`](/reference/memory_resource/get_default_resource.md)から取得した`memory_resource`を(3)に渡し委譲

(4)(5)(6)のコンストラクタは上流メモリリソースとして[`get_default_resource()`](/reference/memory_resource/get_default_resource.md)から取得した`memory_resource`を利用する。

## 備考
どのコンストラクタの初期化においても、上流メモリリソースの所有権を保持しない。

## 例
```cpp example
#include <memory_resource>

int main()
{
  //(1) 上流メモリリソースを受けて構築
  {
    std::pmr::synchronized_pool_resource pr{};
    std::pmr::monotonic_buffer_resource mr{ &pr };
  }

  //(2) 初期サイズと上流メモリリソースを受けて構築
  {
    std::pmr::synchronized_pool_resource pr{};
    std::pmr::monotonic_buffer_resource mr{ 1024, &pr };
  }

  //(3) 外部領域を初期メモリ領域として利用し、上流メモリリソースを受けて構築
  {
    char buf[1024]{};
    std::pmr::synchronized_pool_resource pr{};
    std::pmr::monotonic_buffer_resource mr{ buf, sizeof(buf), &pr };
  }

  //(4) デフォルト構築
  {
    std::pmr::monotonic_buffer_resource mr{};
  }

  //(5) 初期サイズのみを指定して構築
  {
    std::pmr::monotonic_buffer_resource mr{ 1024 };
  }

  //(6) 外部領域を初期メモリ領域として利用し構築
  {
    char buf[1024]{};
    std::pmr::monotonic_buffer_resource mr{ buf, sizeof(buf) };
  }
}
```
* monotonic_buffer_resource[color ff0000]
* synchronized_pool_resource[link /reference/memory_resource/pool_resource.md]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 9.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2017 update 6 [mark verified]

## 関連項目
- [`pool_options`](../pool_options.md)
- [`memory_resource`](../memory_resource.md)

## 参照
- [P0220R1 Adopt Library Fundamentals V1 TS Components for C++17 (R1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0220r1.html)
- [P0337r0 | Delete operator= for polymorphic_allocator](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0337r0.html)
- [Working Draft, C++ Extensions for Library Fundamentals, Version 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4562.html#memory.resource.synop)
