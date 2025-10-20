# basic_ispanstream
* spanstream[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  template <class CharT,
            class Traits = char_traits<CharT> >
  class basic_ispanstream : public basic_istream<CharT, Traits>;

  using ispanstream  = basic_ispanstream<char>;
  using wispanstream = basic_ispanstream<wchar_t>;
}
```
* char_traits[link /reference/string/char_traits.md]
* basic_istream[link /reference/istream/basic_istream.md]

## 概要
`std::basic_ospanstream`クラスは、[`std::span`](/reference/span/span.md) を使用した固定長ストリームバッファを入力元とする入力ストリームである。


## メンバ関数

| 名前                                | 説明                                       | 対応バージョン |
|-------------------------------------|--------------------------------------------|----------------|
| [`(constructor)`](basic_ispanstream/op_constructor.md) | コンストラクタ                             | C++23 |
| [`operator=`](basic_ispanstream/op_assign.md)         | ムーブ代入                                 | C++23 |
| [`swap`](basic_ispanstream/swap.md)                   | 値の交換                                   | C++23 |
| [`rdbuf`](basic_ispanstream/rdbuf.md)                 | ストリームバッファオブジェクトの設定・取得 | C++23 |
| [`span`](basic_ispanstream/span.md)                   | [`std::span`](/reference/span/span.md)オブジェクトの設定・取得 | C++23 |


## 非メンバ関数

| 名前   | 説明                          | 対応バージョン |
|--------|-------------------------------|----------------|
| [`swap`](basic_ispanstream/swap_free.md) | 2つのオブジェクトを入れ替える | C++11 |


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
  char abc[3] = {'A', 'B', 'C'};
  std::span<char> span{abc};
  std::ispanstream iss(span);

  char c;
  while (iss >> c) {
    std::cout << c << ' ';
  }
  std::cout << std::endl;
}
```
* std::ispanstream[color ff0000]
* std::span<char>[link /reference/span/span.md]

### 出力
```
A B C 
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
