# deallocate
* memory_resource[meta header]
* function[meta id-type]
* std::pmr[meta namespace]
* memory_resource[meta class]
* cpp17[meta cpp]

```cpp
void deallocate(void* p, std::size_t bytes, std::size_t alignment = alignof(std::max_align_t));
```
* std::max_align_t[link /reference/cstddef/max_align_t.md]

## 概要
[`allocate`](allocate.md)によって確保されたメモリを解放する。

## 事前条件
呼び出す`do_deallocate`の要件として  
`p`の指すサイズ`bytes`のメモリ領域は、`*this`もしくは�しい`memory_resource`オブジェクト（`this->is_equal(other) == true`となるような`other`）の[`allocate`](allocate.md)`(bytes, alignment)`によって事前に確保された領域であること。  
かつ、そのメモリ領域は未解放であること。

## 引数
- `p` -- 解放したい領域へのポインタ
- `bytes` -- `p`に確保されている領域のサイズ
- `alignment` -- `p`の確保時アライメント要求

## 効果
`return this->do_deallocate(p, bytes, alignment);` と�価。

## 例外
投げない

## 例
```cpp example
#include <iostream>
#include <memory_resource>

int main(){
  std::pmr::memory_resource* mr = std::pmr::get_default_resource();
  //int1つ分の領域をintのアライメント要求（多くの環境で共に4バイト）でメモリ確保
  void* p = mr->allocate(sizeof(int), alignof(int));
  //placement new して構築
  int* p_int = new(p) int{ 256 };

  std::cout << *p_int << std::endl;
  //一応アドレスを出力
  std::cout << p << std::endl;
  std::cout << p_int << std::endl;

  //デストラクタを呼び出してオブジェクトを破棄
  std::destroy_at(p_int);

  //メモリの解放
  mr->deallocate(p, sizeof(int), alignof(int));
}
```
* deallocate[color ff0000]
* get_default_resource[link /reference/memory_resource/get_default_resource.md]
* allocate[link /reference/memory_resource/memory_resource/allocate.md]
* std::destroy_at[link /reference/memory/destroy_at.md]

### 出力例（VS2019 Preview2）
```
256
000002373BB96970
000002373BB96970
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 9.1
- [Visual C++](/implementation.md#visual_cpp): 2017 update 6
