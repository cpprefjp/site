# basic_spanstream
* spanstream[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  template <class CharT,
            class Traits = char_traits<CharT> >
  class basic_spanstream : public basic_iostream<CharT, Traits>;

  using spanstream  = basic_spanstream<char>;
  using wspanstream = basic_spanstream<wchar_t>;
}
```
* char_traits[link /reference/string/char_traits.md]
* basic_iostream[link /reference/istream/basic_iostream.md]

## 概要
`std::basic_spanstream`クラスは、[`std::span`](/reference/span/span.md) を使用した固定長ストリームバッファを出力先・入力元とするストリームであり、読み取りと書き込みの両方の操作ができる。


## メンバ関数

| 名前                                | 説明                                       | 対応バージョン |
|-------------------------------------|--------------------------------------------|----------------|
| [`(constructor)`](basic_spanstream/op_constructor.md) | コンストラクタ                             | C++23 |
| [`operator=`](basic_spanstream/op_assign.md)         | ムーブ代入                                 | C++23 |
| [`swap`](basic_spanstream/swap.md)                   | 値の交換                                   | C++23 |
| [`rdbuf`](basic_spanstream/rdbuf.md)                 | ストリームバッファオブジェクトの設定・取得 | C++23 |
| [`span`](basic_spanstream/span.md)                   | [`std::span`](/reference/span/span.md)オブジェクトの設定・取得 | C++23 |


## 非メンバ関数

| 名前   | 説明                          | 対応バージョン |
|--------|-------------------------------|----------------|
| [`swap`](basic_spanstream/swap_free.md) | 2つのオブジェクトを入れ替える | C++23 |


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
#include <string>

int main()
{
  // 読み取りと書き込みが可能なストリーム
  char buf[256] = {};
  std::span<char> span{buf};
  std::spanstream ss(span);

  // データを書き込む
  ss << "Hello " << 123 << " World " << 45.67;

  // 先頭から文字列出力
  const char* p = ss.span().data();
  std::cout << p << std::endl;

  // 読み取り位置をリセット
  ss.seekg(0);

  std::string word1, word2;
  int num1;
  double num2;

  // データを読み取る
  ss >> word1 >> num1 >> word2 >> num2;

  // データを出力
  std::cout << std::endl
            << "word1=\"" << word1 
            << "\", num1=" << num1 
            << ", word2=\"" << word2 
            << "\", num2=" << num2 << std::endl;
}
```
* std::spanstream[color ff0000]
* std::span<char>[link /reference/span/span.md]
* span()[link /reference/spanstream/basic_spanstream/span.md]
* data()[link /reference/span/span/data.md]

### 出力
```
Hello 123 World 45.67

word1="Hello", num1=123, word2="World", num2=45.67
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
