# memory_resource
* memory_resource[meta header]
* class[meta id-type]
* std[meta namespace]
* cpp17[meta cpp]

```cpp
namespace std::pmr {
  class memory_resource;
}
```

## 概要
`memory_resource`はメモリの確保・解放戦略と実際の処理を実装し、[`polymorphic_allocator`](polymorphic_allocator.md)から利用されるためのインターフェースである。

## メンバ関数
### 構築・破棄

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| `virtual ~memory_resource()`  | 仮想デストラクタ   | C++17 |


### 非仮想インターフェース（NVI）

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`allocate`](memory_resource/allocate.md) | メモリを確保する | C++17 |
| [`deallocate`](memory_resource/deallocate.md) | メモリを解放する | C++17 |
| [`is_equal`](memory_resource/is_equal.md) | オブジェクトを超えてメモリ領域の解放を行えるかを調べる | C++17 |


### プライベート純粋仮想関数

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`do_allocate`](memory_resource/do_allocate.md) | メモリを確保する | C++17 |
| [`do_deallocate`](memory_resource/do_deallocate.md) | メモリを解放する | C++17 |
| [`do_is_equal`](memory_resource/do_is_equal.md) | オブジェクトを超えてメモリ領域の解放を行えるかを調べる | C++17 |

## 非メンバ関数

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`operator==`](memory_resource/op_equal.md) | 等値比較 | C++17 |
| [`operator!=`](memory_resource/op_not_equal.md) | 非等値比較 | C++17 |

## 実装する例
```cpp example
#include <iostream>
#include <memory_resource>
#include <cstddef>

//スタック領域からメモリを割り当てるmemory_resource実装
template<size_t N>
struct stack_resource : public std::pmr::memory_resource {

  stack_resource() = default;
  //コピーに意味がないので禁止
  stack_resource(const stack_resource&) = delete;
  stack_resource& operator=(const stack_resource&) = delete;

  void* do_allocate(size_t bytes, size_t alignment) override {
    //空きがない
    if (N <= m_index) throw std::bad_alloc{};

    //2のべき乗をチェック（AVX512のアライメント要求である64byteを最大としておく）
    bool is_pow2 = false;
    for (size_t pow2 = 1; pow2 <= size_t(64); pow2 *= 2) {
      if (alignment == pow2) {
        is_pow2 = true;
        break;
      }
    }

    //2のべきでないアライメント要求はalignof(std::max_align_t)へ
    if (!is_pow2) {
      alignment = alignof(std::max_align_t);
    }

    auto addr = reinterpret_cast<uintptr_t>(&m_buffer[m_index]);

    //アライメント要求に合わせる
    while ((addr & uintptr_t(alignment - 1)) != 0) {
      ++addr;
      ++m_index;
    }

    m_index += bytes;

    //サイズが足りなくなったら
    if (N <= m_index) throw std::bad_alloc{};

    return reinterpret_cast<void*>(addr);
  }

  void do_deallocate(void* p, size_t bytes, [[maybe_unused]] size_t alignment) override {
    auto addr = static_cast<std::byte*>(p);
    auto end = std::end(m_buffer);

    if (m_buffer <= addr && addr < end) {
      //当てた領域をゼロ埋めするだけ
      for (size_t i = 0; i < bytes; ++i) {
        if ((addr + i) < end) {
          addr[i] = std::byte(0);
        }
      }
    }

  }

  bool do_is_equal(const memory_resource& other) const noexcept override {
    return this == &other;
  }

private:
  std::byte m_buffer[N]{};
  size_t m_index{};
};

int main(){
  stack_resource<100> s{};
  std::pmr::memory_resource* mr = &s;

  //int1つ分の領域をintのアライメント要求（多くの環境で共に4バイト）でメモリ確保
  void* p = mr->allocate(sizeof(int), alignof(int));
  //placement new して構築
  int* p_int = new(p) int{ 256 };

  std::cout << *p_int << std::endl;
  //一応アドレスを出力
  std::cout << p << std::endl;
  std::cout << p_int << std::endl;

  //基本型以外では型に応じてこれが必要
  //p_T->~T();

  //メモリの解放
  mr->deallocate(p, sizeof(int), alignof(int));

  std::cout << std::boolalpha;
  
  stack_resource<10> s2{};
  //自分以外とはtrueにならない
  std::cout << (*mr == s) << std::endl;
  std::cout << (*mr == s2) << std::endl;
}
```
* std::byte[link /reference/cstddef/byte.md]
* std::allocate[link /reference/memory_resource/memory_resource/allocate.md]
* std::deallocate[link /reference/memory_resource/memory_resource/deallocate.md]

### 出力例（VS2019 Preview2）
```
256
000000308BAFF5D8
000000308BAFF5D8
true
false
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 9.1
- [Visual C++](/implementation.md#visual_cpp): 2017 update 6

## 関連項目

## 参照
- [C++1z 多相アロケータとメモリプール - Faith and Brave - C++で遊ぼう ](https://faithandbrave.hateblo.jp/entry/2016/08/08/170454)
- [memory_resourceについて - 本の虫](https://cpplover.blogspot.com/2015/09/memoryresource.html)
- [Polymorphic Allocator in C++17 - Qita](https://qiita.com/MitsutakaTakeda/items/48980faa9498c46b15b2)
- [P0220R1 Adopt Library Fundamentals V1 TS Components for C++17 (R1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0220r1.html)
- [P0337r0 | Delete operator= for polymorphic_allocator](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0337r0.html)
- [Working Draft, C++ Extensions for Library Fundamentals, Version 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4562.html#memory.resource.synop)