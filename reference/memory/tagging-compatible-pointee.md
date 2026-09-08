# tagging-compatible-pointee
* memory[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp29[meta cpp]
* [meta exposition-only]

```cpp
namespace std {
  template <class U, class PtrT, unsigned int BitsRequested,
            size_t Alignment = alignof(U)>
  concept tagging-compatible-pointee =  // 説明専用
    convertible_to<U*, PtrT> &&
    pointer_bits_available(Alignment) >= BitsRequested &&
    (is_void_v<element-of<PtrT>> ||
     is_scalar_v<element-of<PtrT>> ||
     is_union_v<element-of<PtrT>> ||
     is_pointer_interconvertible_base_of_v<element-of<PtrT>, U>);
}
```
* tagging-compatible-pointee[color ff0000]
* convertible_to[link /reference/concepts/convertible_to.md]
* pointer_bits_available[link pointer_bits_available.md]
* is_void_v[link /reference/type_traits/is_void.md]
* is_scalar_v[link /reference/type_traits/is_scalar.md]
* is_union_v[link /reference/type_traits/is_union.md]
* is_pointer_interconvertible_base_of_v[link /reference/type_traits/is_pointer_interconvertible_base_of.md]
* element-of[italic]

## 概要
`tagging-compatible-pointee`は、型`U`のポインタが、`PtrT`型のポインタとして`BitsRequested`ビットのタグ付けと互換であることを表す説明専用コンセプトである。

[`pointer_tag_pair`](pointer_tag_pair.md)の[コンストラクタ](pointer_tag_pair/op_constructor.md)と[`from_overaligned()`](pointer_tag_pair/from_overaligned.md)の制約として使用される。


## 要件
以下のすべてを満たすこと。

- `U*`が`PtrT`へ変換可能であること
- [`pointer_bits_available`](pointer_bits_available.md)`(Alignment) >= BitsRequested`であること（アライメントから、要求したビット数を確保できること）
- 指す先の型（説明専用の`element-of<PtrT>`。[`pointer_traits`](pointer_traits.md)`<PtrT>::element_type`）が次のいずれかであること
    - `void`・スカラ型・共用体である
    - `U`のポインタ相互変換可能 (pointer-interconvertible) な基底クラスである。これによって、仮想継承や先頭以外の基底クラスへのポインタなど、アドレス調整をともなうポインタ変換が除外される


## 例
```cpp
#include <memory>

struct Base { int a; };
struct Derived : Base {};          // 追加のメンバがないため標準レイアウト
struct WithMember : Base { int b; };
struct Virt : virtual Base { int c; };

int main()
{
  Derived d{};
  WithMember w{};
  Virt v{};
  char c = 0;

  // OK : Derivedのアライメントは4なので、1ビットのタグを確保できる。
  //      BaseはDerivedのポインタ相互変換可能な基底クラスであり、
  //      Derived*からBase*への変換でアドレスは変わらない
  std::pointer_tag_pair<Base*, 1> p1{&d, 1u};

  // コンパイルエラー！ WithMemberは基底クラスと派生クラスの両方にメンバを持ち、
  //                   標準レイアウトではないため、ポインタ相互変換可能ではない
  // std::pointer_tag_pair<Base*, 1> p2{&w, 1u};

  // コンパイルエラー！ 仮想継承では、ポインタの変換にアドレスの調整をともなうため、
  //                   下位ビットのタグが保たれる保証がない
  // std::pointer_tag_pair<Base*, 1> p3{&v, 1u};

  // コンパイルエラー！ charのアライメントは1なので、タグ用のビットを確保できない
  // std::pointer_tag_pair<char*, 1> p4{&c, 1u};
}
```
* std::pointer_tag_pair[link pointer_tag_pair.md]

### 出力
```
```


## バージョン
### 言語
- C++29

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`pointer_tag_pair`](pointer_tag_pair.md)


## 参照
- [P3125R6 constexpr pointer tagging](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3125r6.html)
