# from_overaligned
* memory[meta header]
* std[meta namespace]
* pointer_tag_pair[meta class]
* function template[meta id-type]
* cpp29[meta cpp]

```cpp
template <size_t PromisedAlignment,
          tagging-compatible-pointee<pointer_type, bits_requested, PromisedAlignment> U>
static constexpr pointer_tag_pair from_overaligned(U* p, tag_type t); // (1) C++29
```
* tagging-compatible-pointee[link ../tagging-compatible-pointee.md]

## 概要
型のアライメントより大きくアライメントされている（過剰アライメントされている）と約束したポインタから、`pointer_tag_pair`を構築する。

指す先の型のアライメントだけではタグに必要なビット数を確保できない場合でも、実際のポインタ値が`PromisedAlignment`にアライメントされていることをユーザーが保証することで構築できる。


## テンプレートパラメータ制約
- 説明専用コンセプト[`tagging-compatible-pointee`](../tagging-compatible-pointee.md)によって、[コンストラクタ](op_constructor.md)(2)と同じ要件が、`alignof(U)`の代わりに`PromisedAlignment`を用いて要求される


## 事前条件
- `p`がオブジェクトの末尾の次を指すポインタではないこと
- `p == nullptr ||` [`is_sufficiently_aligned`](/reference/memory/is_sufficiently_aligned.md)`<PromisedAlignment>(p)`が`true`であること
- タグ値`t`の表現に必要なビット数が`bits_requested`以下であること


## 戻り値
`ptp.`[`pointer()`](pointer.md)が`p`と等値、`ptp.`[`tag()`](tag.md)が`t`と等値であるようなオブジェクト`ptp`を返す。


## 例外
投げない。


## 定数式に評価される条件
事前条件を満たしていること。


## 備考
- 事前条件違反となりうる危険な操作であるため、意図が目立つよう、通常のコンストラクタとは別の冗長な名前の関数として提供される


## 例
```cpp
#include <memory>
#include <iostream>

int main()
{
  // charのアライメントは1だが、64バイト境界に確保したポインタであることを
  // 約束して、6ビットのタグを詰め込む
  alignas(64) char buffer[64] = "Hello";

  auto p = std::pointer_tag_pair<char*, 6>::from_overaligned<64>(buffer, 42u);
  std::cout << p.pointer() << ':' << p.tag() << std::endl;
}
```
* from_overaligned[color ff0000]
* std::pointer_tag_pair[link ../pointer_tag_pair.md]
* p.pointer()[link pointer.md]
* p.tag()[link tag.md]

### 出力
```
Hello:42
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
