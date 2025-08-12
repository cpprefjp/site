# コンストラクタ
* spanstream[meta header]
* std[meta namespace]
* basic_ospanstream[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
explicit basic_ospanstream(std::span<charT> s,
  ios_base::openmode which = ios_base::out);          // (1)

basic_ospanstream(const basic_ospanstream&) = delete; // (2)

basic_ospanstream(basic_ospanstream&& rhs);           // (3)
```
* ios_base[link /reference/ios/ios_base.md]
* std::span[link /reference/span/span.md]

## 概要
`basic_ospanstream`オブジェクトを構築する。

- (1) : 入力データとして[`std::span`](/reference/span/span.md)オブジェクト、およびモードを指定して構築する
- (2) : （削除）コピーコンストラクタ
- (3) : ムーブコンストラクタ

## 効果
- (1) : 内部で保持している [`basic_spanbuf<charT, traits>`](/reference/spanstream/basic_spanbuf.md) 型の固定長バッファを `sb` とすると、ベースクラスを `basic_ostream<charT, traits>(addressof(sb))` で構築し、さらに `sb` を `basic_spanbuf<charT, traits>(s, which | ios_base::out)` で初期化する
- (2) : （削除）
- (3) : 内部で保持している [`basic_spanbuf<charT, traits>`](/reference/spanstream/basic_spanbuf.md) 型の固定長バッファを `sb` とすると、ベースクラスを `std::move(rhs)` で構築し、さらに `sb` を `std::move(rhs.sb)` で初期化する。続いて、`basic_ostream<charT, traits>::set_rdbuf(addressof(sb))` を呼び、[`basic_spanbuf`](/reference/spanstream/basic_spanbuf.md) を設定する。


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
  std::ospanstream oss1{span};

  std::cout << oss1.span().data() << std::endl;
  
  // (3) ムーブ構築
  std::ospanstream oss3{std::move(oss1)};

  std::cout << oss3.span().data() << std::endl;
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
