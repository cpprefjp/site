# コンストラクタ
* spanstream[meta header]
* std[meta namespace]
* basic_ispanstream[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
explicit basic_ispanstream(std::span<charT> s,
  ios_base::openmode which = ios_base::in);           // (1)

basic_ispanstream(const basic_ispanstream&) = delete; // (2)

basic_ispanstream(basic_ispanstream&& rhs);           // (3)

template<class ROS>
explicit basic_ispanstream(ROS&& s);                  // (4)
```
* ios_base[link /reference/ios/ios_base.md]
* std::span[link /reference/span/span.md]

## 概要
`basic_ispanstream`オブジェクトを構築する。

- (1) : 入力データとして[`std::span`](/reference/span/span.md)オブジェクト、およびモードを指定して構築する
- (2) : （削除）
- (3) : ムーブコンストラクタ
- (4) : `s` から [`std::span`](/reference/span/span.md) 型の固定長バッファを作成し、構築する


## テンプレートパラメータ制約
- (4) : `ROS` が [`ranges::borrowed_range`](/reference/ranges/borrowed_range.md) の要求を満たすこと (`(!convertible_to<ROS, std::span<charT>>) && convertible_to<ROS, std::span<const charT>>`が`true`であること)。

## 効果
- (1) : 内部で保持している [`basic_spanbuf<charT, traits>`](/reference/spanstream/basic_spanbuf.md) 型の固定長バッファを `sb` とすると、ベースクラスを `basic_istream<charT, traits>(addressof(sb))` で構築し、さらに `sb` を `basic_spanbuf<charT, traits>(s, which | ios_base::in)` で初期化する
- (2) : （削除）
- (3) : 内部で保持している [`basic_spanbuf<charT, traits>`](/reference/spanstream/basic_spanbuf.md) 型の固定長バッファを `sb` とすると、ベースクラスを `std::move(rhs)` で構築し、さらに `sb` を `std::move(rhs.sb)` で初期化する。続いて、`basic_istream<charT, traits>::set_rdbuf(addressof(sb))` を呼び、[`basic_spanbuf`](/reference/spanstream/basic_spanbuf.md) を設定する。
- (4) : `std::span<const charT>(std::forward<ROS>(s))` を `sp` とした時、`basic_ispanstream(std::span<charT>(const_cast<charT*>(sp.data()), sp.size()))` と同等


## 例
```cpp example
#include <iostream>
#include <span>
#include <spanstream>

int main()
{
  char buf[32] = "hello";
  std::span<char> span{buf};
  
  // (1) std::spanから構築
  std::ispanstream iss1{span};

  std::cout << iss1.span().data() << std::endl;
  
  // (3) ムーブ構築
  std::ispanstream iss3{std::move(iss1)};

  std::cout << iss3.span().data() << std::endl;
}
```
* std::span<char>[link /reference/span/span.md]
* span()[link span.md]
* data()[link /reference/span/span/data.md]
* std::move[link /reference/utility/move.md]

### 出力
```
hello
hello
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
