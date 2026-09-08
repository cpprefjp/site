# コンストラクタ
* memory[meta header]
* std[meta namespace]
* pointer_tag_pair[meta class]
* function[meta id-type]
* cpp29[meta cpp]

```cpp
constexpr pointer_tag_pair() noexcept;               // (1) C++29

template <tagging-compatible-pointee<pointer_type, bits_requested> U>
constexpr pointer_tag_pair(U* p, tag_type t);        // (2) C++29

constexpr pointer_tag_pair(nullptr_t p, tag_type t); // (3) C++29
```
* tagging-compatible-pointee[link ../tagging-compatible-pointee.md]
* nullptr_t[link /reference/cstddef/nullptr_t.md]

## 概要
- (1) : デフォルトコンストラクタ。ヌルポインタとタグの初期値で構築する
- (2) : ポインタ`p`とタグ値`t`のペアを構築する
- (3) : ヌルポインタとタグ値`t`のペアを構築する


## テンプレートパラメータ制約
- (2) : 説明専用コンセプト[`tagging-compatible-pointee`](../tagging-compatible-pointee.md)によって、以下が要求される
    - `U*`が`pointer_type`へ変換可能であること
    - [`pointer_bits_available`](/reference/memory/pointer_bits_available.md)`(alignof(U)) >= bits_requested`であること（`U`のアライメントから、要求したビット数を確保できること）
    - 指す先の型が`void`・スカラ型・共用体であるか、または指す先の型が`U`のポインタ相互変換可能な基底クラスであること


## 事前条件
- (2), (3) :
    - `p`がオブジェクトの末尾の次を指すポインタではないこと
    - タグ値`t`の表現に必要なビット数が`bits_requested`以下であること


## 事後条件
- (1) : [`pointer()`](pointer.md)がヌルポインタと等値であり、[`tag()`](tag.md)が`TagT()`と等値である
- (2), (3) : [`pointer()`](pointer.md)が`p`と等値であり、[`tag()`](tag.md)が`t`と等値である


## 例外
- (2), (3) : 投げない


## 定数式に評価される条件
- (2), (3) : 事前条件を満たしていること


## 例
```cpp
#include <memory>
#include <iostream>

int main()
{
  int x = 42;

  std::pointer_tag_pair<int*, 2> p{&x, 0b11u};
  std::cout << *p.pointer() << ':' << p.tag() << std::endl;

  // タグが2ビットに収まらない場合は事前条件違反となる
  // std::pointer_tag_pair<int*, 2> bad{&x, 0b100u};
}
```
* std::pointer_tag_pair[link ../pointer_tag_pair.md]
* p.pointer()[link pointer.md]
* p.tag()[link tag.md]

### 出力
```
42:3
```


## バージョン
### 言語
- C++29

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P3125R6 constexpr pointer tagging](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3125r6.html)
