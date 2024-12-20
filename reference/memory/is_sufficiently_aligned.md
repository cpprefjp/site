# is_sufficiently_aligned
* memory[meta header]
* function template[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std {
  template<size_t Alignment, class T>
    bool is_sufficiently_aligned(T* ptr);
}
```

## 概要
ポインタ値が指定したアライメントを満たすか否かを返す。


## 事前条件
ポインタ`p`が、`T`に類似(similar)した型のオブジェクト`X`を指すこと。


## 戻り値
`X`が少なくとも`Alignment`でアライメントされるならば`true`。そうでなければ`false`。


## 例外
投げない


## この機能が必要になった背景・経緯
この関数テンプレートは[`<mdspan>`](/reference/mdspan.md)ヘッダへの[`aligned_accessor`](/reference/mdspan/aligned_accessor.md.nolink)導入に伴って必要とされた機能である。
一方で、ポインタ値のアライメント要件を検査するユースケースは一般的と考えられたため、汎用ユーティリティとして`<memory>`ヘッダに対して機能追加された。


## 例
```cpp example
#include <cassert>
#include <memory>
#include <new>

int main()
{
  int *ptr = new(std::align_val_t{32}) int;
  assert( std::is_sufficiently_aligned<32>(ptr) );
  delete ptr;
}
```
* std::is_sufficiently_aligned[color ff0000]
* std::align_val_t[link /reference/new/align_val_t.md]

### 出力
```
```


## 実装例
```cpp
// 提案文書P2897R7より引用
template<size_t ByteAlignment, class ElementType>
bool is_sufficiently_aligned(ElementType* p)
{
  return bit_cast<uintptr_t>(p) % ByteAlignment == 0;
}
```
* bit_cast[link /reference/bit/bit_cast.md]


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`assume_aligned`](assume_aligned.md)
- [アライメント指定されたデータの動的メモリ確保](/lang/cpp17/dynamic_memory_allocation_for_over-aligned_data.md)


## 参照
- [P2897R7 `aligned_accessor`: An mdspan accessor expressing pointer over-alignment](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2897r7.html)
