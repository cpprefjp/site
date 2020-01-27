# delete_object
* memory_resource[meta header]
* function[meta id-type]
* std::pmr[meta namespace]
* polymorphic_allocator[meta class]
* cpp20[meta cpp]

```cpp
template <class T>
void delete_object(T* p);
```

## 概要

指定された領域にあるオブジェクトを破棄し、そのメモリ領域を解放する（`delete`式相当の処理を行う）。

## 事前条件

`p`の指すメモリ領域は以前に`*this`の確保関数のいずれかによって確保された領域であること。  
かつ、そのメモリ領域は未解放であり`p`の指すオブジェクトは破棄されていないこと。

## 引数

- `p` -- 対象となるオブジェクトが構築されているメモリへのポインタ


## 効果

以下と�価。

```cpp
this->destroy(p);
this->deallocate_object(p);
```
* destroy[link destroy.md]
* deallocate_object[link deallocate_object.md]

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
* delete_object[color ff0000]
* monotonic_buffer_resource[link /reference/memory_resource/monotonic_buffer_resource.md]
* new_object[link new_object.md]

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
- [GCC](/implementation.md#gcc): 9.1
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [P0339R6 polymorphic_allocator<> as a vocabulary type](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0339r6.pdf) 
