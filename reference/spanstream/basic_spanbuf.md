# basic_spanbuf
* spanstream[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp23[meta cpp]
* spanbuf,wspanbuf[meta alias]

```cpp
namespace std {
  template <class CharT,
            class Traits = char_traits<CharT> >
  class basic_spanbuf : public basic_streambuf<CharT, Traits>;

  using spanbuf  = basic_spanbuf<char>;
  using wspanbuf = basic_spanbuf<wchar_t>;
}
```
* char_traits[link /reference/string/char_traits.md]
* basic_streambuf[link /reference/streambuf/basic_streambuf.md]

## 概要
`std::basic_spanbuf`クラスは、[`std::span`](/reference/span/span.md) を使用した固定長ストリームバッファである。


## メンバ関数

| 名前                            | 説明                                       | 対応バージョン |
|---------------------------------|--------------------------------------------|----------------|
| [`(constructor)`](basic_spanbuf/op_constructor.md) | コンストラクタ                             | C++23 |
| [`operator=`](basic_spanbuf/op_assign.md)         | ムーブ代入                                 | C++23 |
| [`swap`](basic_spanbuf/swap.md)                   | 値の交換                                   | C++23 |
| [`span`](basic_spanbuf/span.md)                   | [`std::span`](/reference/span/span.md)オブジェクトの設定・取得 | C++23 |


## 非メンバ関数

| 名前   | 説明                          | 対応バージョン |
|--------|-------------------------------|----------------|
| [`swap`](basic_spanbuf/swap_free.md) | 2つのオブジェクトを入れ替える | C++23 |


## メンバ型

| 名前             | 説明                          | 対応バージョン |
|------------------|-------------------------------|----------------|
| `char_type`      | テンプレート仮引数`CharT`     | C++23 |
| `int_type`       | `Traits::int_type`            | C++23 |
| `pos_type`       | `Traits::pos_type`            | C++23 |
| `off_type`       | `Traits::off_type`            | C++23 |
| `traits_type`    | テンプレート仮引数`Traits`    | C++23 |


## 例
```cpp example
#include <iostream>
#include <span>
#include <spanstream>

int main()
{
  // basic_spanbufはストリームの内部バッファとして動作する
  char buf[256] = {};
  std::span<char> span{buf};
  std::spanbuf sb(span);

  // 書き込み: sputc()で1文字ずつ書き込む
  sb.sputc('H');
  sb.sputc('e');
  sb.sputc('l');
  sb.sputc('l');
  sb.sputc('o');

  // 文字列として取得
  std::cout << "Written: " << sb.span().data() << std::endl;

  char buf2[256] = "World";
  std::span<char> span2{buf2};

  // 新しい文字列を設定
  sb.span(span2);

  // 読み取り: sbumpc()で1文字ずつ読み取る
  std::cout << "Read: ";
  while (sb.in_avail() > 0) {
    char c = sb.sbumpc();
    std::cout << c;
  }
  std::cout << std::endl;
}
```
* std::spanbuf[color ff0000]
* std::span<char>[link /reference/span/span.md]
* sputc[link /reference/streambuf/basic_streambuf/sputc.md]
* span()[link /reference/spanstream/basic_spanbuf/span.md]
* data()[link /reference/span/span/data.md]
* span(span2)[link /reference/spanstream/basic_spanbuf/span.md]
* sbumpc[link /reference/streambuf/basic_streambuf/sbumpc.md]
* in_avail[link /reference/streambuf/basic_streambuf/in_avail.md]

### 出力
```
Written: Hello
Read: World
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0448R4 A strstream replacement using span&lt;charT&gt; as buffer](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p0448r4.pdf)
