# basic_ospanstream
* spanstream[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp23[meta cpp]
* ospanstream,wospanstream[meta alias]

```cpp
namespace std {
  template <class CharT,
            class Traits = char_traits<CharT> >
  class basic_ospanstream : public basic_ostream<CharT, Traits>;

  using ospanstream  = basic_ospanstream<char>;
  using wospanstream = basic_ospanstream<wchar_t>;
}
```
* char_traits[link /reference/string/char_traits.md]
* basic_ostream[link /reference/ostream/basic_ostream.md]

## 概要
`std::basic_ospanstream`クラスは、[`std::span`](/reference/span/span.md) を使用した固定長ストリームバッファを出力先とする出力ストリームである。


## メンバ関数

| 名前                                | 説明                                       | 対応バージョン |
|-------------------------------------|--------------------------------------------|----------------|
| [`(constructor)`](basic_ospanstream/op_constructor.md) | コンストラクタ                             | C++23 |
| [`operator=`](basic_ospanstream/op_assign.md)         | ムーブ代入                                 | C++23 |
| [`swap`](basic_ospanstream/swap.md)                   | 値の交換                                   | C++23 |
| [`rdbuf`](basic_ospanstream/rdbuf.md)                 | ストリームバッファオブジェクトの設定・取得 | C++23 |
| [`span`](basic_ospanstream/span.md)                   | [`std::span`](/reference/span/span.md)オブジェクトの設定・取得 | C++23 |


## 非メンバ関数

| 名前   | 説明                          | 対応バージョン |
|--------|-------------------------------|----------------|
| [`swap`](basic_ospanstream/swap_free.md) | 2つのオブジェクトを入れ替える | C++23 |


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
  char buf[256] = {};
  std::span<char> span{buf};
  std::ospanstream oss(span);

  // 数値や文字列を書き込む
  oss << "The answer is " << 42 << " and pi is approximately " << 3.14;

  // 先頭から文字列出力
  const char* p = oss.span().data();
  std::cout << p << std::endl;
}
```
* std::ospanstream[color ff0000]
* std::span<char>[link /reference/span/span.md]
* span()[link /reference/spanstream/basic_ospanstream/span.md]
* data()[link /reference/span/span/data.md]

### 出力
```
The answer is 42 and pi is approximately 3.14
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
