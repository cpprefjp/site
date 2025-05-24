# コンストラクタ
* memory_resource[meta header]
* function[meta id-type]
* std::pmr[meta namespace]
* polymorphic_allocator[meta class]
* cpp17[meta cpp]

```cpp
polymorphic_allocator() noexcept;           //(1)

polymorphic_allocator(memory_resource* r);  //(2)

polymorphic_allocator(const polymorphic_allocator& other) = default;    //(3)

template <class U>
polymorphic_allocator(const polymorphic_allocator<U>& other) noexcept;  //(4)
```

## 概要
- (1) : デフォルトコンストラクタ
- (2) : [`memory_resource`](/reference/memory_resource/memory_resource.md)オブジェクトのポインタを受けて構築
- (3) : コピーコンストラクタ
- (4) : `value_type`に変換可能な`U`の`polymorphic_allocator`からのコピー構築

## 要件
- (2) : `r`がnullでないこと

## 引数
- `r` -- 任意の`memory_resource`へのポインタ
- `other` -- コピーする他の`polymorphic_allocator`オブジェクト

## 効果
- (1) : [`get_default_resource()`](/reference/memory_resource/get_default_resource.md)からデフォルトの`memory_resource`を取得して構築
- (2) : `r`を`memory_resource`として構築
- (3), (4) : [`other.resource()`](resource.md)から`memory_resource`を取得して構築

## 例外
- (1), (4) : 投げない

## 備考
どのコンストラクタからの初期化においても、取得する`memory_resource`の所有権を保持しない。

## 例
```cpp example
#include <memory_resource>

int main() {
  //(1) デフォルト構築
  {
    std::pmr::polymorphic_allocator<int> alloc{};
  }

  //(2) memory_resourceを受けて構築
  {
    auto* rs = std::pmr::null_memory_resource();
    std::pmr::polymorphic_allocator<int> alloc{rs};
  }

  //(3) 同じ型のpolymorphic_allocatorからコピー構築
  {
    std::pmr::polymorphic_allocator<int> alloc1{};
    std::pmr::polymorphic_allocator<int> alloc{alloc1};
  }

  //(4) 変換可能な型のpolymorphic_allocatorからコピー構築
  {
    std::pmr::polymorphic_allocator<short> alloc1{};
    std::pmr::polymorphic_allocator<int> alloc{alloc1};
  }
}
```
* polymorphic_allocator[color ff0000]
* null_memory_resource[link /reference/memory_resource/null_memory_resource.md]

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

## 参照
- [P0220R1 Adopt Library Fundamentals V1 TS Components for C++17 (R1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0220r1.html)
- [P0337r0 | Delete operator= for polymorphic_allocator](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0337r0.html)
- [Working Draft, C++ Extensions for Library Fundamentals, Version 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4562.html#memory.resource.synop)