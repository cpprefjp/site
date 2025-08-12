# コンストラクタ
* spanstream[meta header]
* std[meta namespace]
* basic_spanstream[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
explicit basic_spanstream(std::span<charT> s,
  ios_base::openmode which = ios_base::out | ios_base::in); // (1)

basic_spanstream(const basic_spanstream&) = delete;         // (2)

basic_spanstream(basic_spanstream&& rhs);                   // (3)
```
* ios_base[link /reference/ios/ios_base.md]
* std::span[link /reference/span/span.md]

## 概要
`basic_spanstream`オブジェクトを構築する。

ここで、初期値としてデータは、既存のファイルを上書きモードで開くことに似ており、ストリームの初期位置が先頭のまま、ストリーム内容の文字列を設定するものである。

- (1) : 初期データとして[`std::span<charT>`](/reference/span/span.md)オブジェクトの設定して構築する
- (2) : （削除）コピーコンストラクタ
- (3) : ムーブコンストラクタ

## 効果
- (1) : 内部で保持している [`basic_spanbuf<charT, traits>`](/reference/spanstream/basic_spanbuf.md) 型の固定長バッファを `sb` とすると、ベースクラスを `basic_iostream<charT, traits>(addressof(sb))` で構築し、さらに `sb` を `basic_spanbuf<charT, traits>(s, which)` で初期化する
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
  std::spanstream ss1{span};

  std::cout << ss1.span().data() << std::endl;
  
  // (3) ムーブ構築
  std::spanstream ss3{std::move(ss1)};

  std::cout << ss3.span().data() << std::endl;
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
