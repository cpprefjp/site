# new_object
* memory_resource[meta header]
* function[meta id-type]
* std::pmr[meta namespace]
* polymorphic_allocator[meta class]
* cpp20[meta cpp]

```cpp
template <class T, class... CtorArgs>
[[nodiscard]] T* new_object(CtorArgs&&... ctor_args);
```

## 概要

メモリを確保し`T`のオブジェクトを構築する（`new`式相当の処理を行う）。

## 引数
- `ctor_args...` -- `T`のコンストラクタへ渡す引数

## 効果

以下と等価。

```cpp
T* p = this->allocate_object<T>();
try {
  this->construct(p, std::forward<CtorArgs>(ctor_args)...);
} catch (...) {
  this->deallocate_object(p);
  throw;
}
return p;
```
* allocate_object[link allocate_object.md]
* construct[link construct.md]
* deallocate_object[link deallocate_object.md]

## 戻り値
構築したオブジェクトへのポインタ。

## 例外
メモリの確保に失敗した場合および`T`のコンストラクタが例外を送出した場合、それぞれ任意の例外を送出しうる。

## 備考

型`T`は引数から推論することができないため、明示的に指定する必要がある。

## 例
```cpp example
#include <iostream>
#include <memory_resource>

int main() {
  //メモリ確保・解放処理を切り替え
  std::pmr::monotonic_buffer_resource mr{};
  std::pmr::polymorphic_allocator<> alloc{&mr};

  //int型の領域を確保しそこにオブジェクトを構築
  int* p1 = alloc.new_object<int>(20);
  //new式
  int* p2 = new int{17};


  std::cout << "address : " << p1 << "\n";
  std::cout << "address : " << p2 << "\n";

  std::cout << *p1 << "\n";
  std::cout << *p2 << "\n";


  //構築したオブジェクトを破棄し、確保したメモリ領域を解放
  alloc.delete_object(p1);
  //delete式
  delete p2;
}
```
* new_object[color ff0000]
* monotonic_buffer_resource[link /reference/memory_resource/monotonic_buffer_resource.md]
* delete_object[link delete_object.md]

### 出力例（GCC9.2）
```
address : 0x1a2b150
address : 0x1a2b960
20
17
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 9.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 update 9 [mark verified]

## 参照
- [P0339R6 polymorphic_allocator<> as a vocabulary type](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0339r6.pdf) 
- [LWG Issue 3304. Allocate functions of `std::polymorphic_allocator` should require `[[nodiscard]]`](https://wg21.cmeerw.net/lwg/issue3304)
