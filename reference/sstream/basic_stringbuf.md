# basic_stringbuf
* sstream[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class CharT, class Traits = char_traits<CharT>,
            class Allocator = allocator<CharT> >
  class basic_stringbuf : public basic_streambuf<CharT, Traits>;

  using stringbuf  = basic_stringbuf<char>;
  using wstringbuf = basic_stringbuf<wchar_t>;
}
```
* char_traits[link /reference/string/char_traits.md]
* allocator[link /reference/memory/allocator.md]
* basic_streambuf[link /reference/streambuf/basic_streambuf.md]

## 概要
文字列を保持するストリームバッファ


## メンバ関数

| 名前                            | 説明                                       | 対応バージョン |
|---------------------------------|--------------------------------------------|----------------|
| [`(constructor)`](basic_stringbuf/op_constructor.md) | コンストラクタ                             | |
| [`(destructor)`](basic_stringbuf/op_destructor.md)  | デストラクタ                               | |
| [`operator=`](basic_stringbuf/op_assign.md)         | ムーブ代入                                 | C++11 |
| [`swap`](basic_stringbuf/swap.md)                   | 値の交換                                   | C++11 |
| [`str`](basic_stringbuf/str.md)                     | 文字列オブジェクトの設定・取得             | |
| [`view`](basic_stringbuf/view.md)                   | 文字列ビューオブジェクトの取得             | C++20 |
| [`get_allocator`](basic_stringbuf/get_allocator.md) | アロケータの取得                           | C++20 |


## 非メンバ関数

| 名前   | 説明                          | 対応バージョン |
|--------|-------------------------------|----------------|
| [`swap`](basic_stringbuf/swap_free.md) | 2つのオブジェクトを入れ替える | C++11 |


## メンバ型

| 名前             | 説明                          | 対応バージョン |
|------------------|-------------------------------|----------------|
| `char_type`      | テンプレート仮引数`CharT`     | |
| `int_type`       | `Traits::int_type`            | |
| `pos_type`       | `Traits::pos_type`            | |
| `off_type`       | `Traits::off_type`            | |
| `traits_type`    | テンプレート仮引数`Traits`    | |
| `allocator_type` | テンプレート仮引数`Allocator` | |


## 例
```cpp example
#include <iostream>
#include <sstream>
#include <string>
#include <cstring>

int main()
{
  // basic_stringbufはストリームの内部バッファとして動作する
  std::stringbuf buf;
  
  // 書き込み: sputc()で1文字ずつ書き込む
  buf.sputc('H');
  buf.sputc('e');
  buf.sputc('l');
  buf.sputc('l');
  buf.sputc('o');
  
  // 文字列として取得
  std::cout << "Written: " << buf.str() << std::endl;
  
  // 新しい文字列を設定
  buf.str("World");
  
  // 読み取り: sbumpc()で1文字ずつ読み取る
  std::cout << "Read: ";
  while (buf.in_avail() > 0) {
    char c = buf.sbumpc();
    std::cout << c;
  }
  std::cout << std::endl;
  
  // sputn()で文字列を一度に書き込む
  buf.str("");  // バッファをクリア
  const char* message = "Hello, World!";
  buf.sputn(message, std::strlen(message));
  
  // C++20以降: view()で文字列ビューとして取得
  // std::string_view sv = buf.view();
  // std::cout << "View: " << sv << std::endl;
  
  std::cout << "Final: " << buf.str() << std::endl;
}
```
* sputc[link /reference/streambuf/basic_streambuf/sputc.md]
* sbumpc[link /reference/streambuf/basic_streambuf/sbumpc.md]
* in_avail[link /reference/streambuf/basic_streambuf/in_avail.md]
* sputn[link /reference/streambuf/basic_streambuf/sputn.md]
* str[link basic_stringbuf/str.md]

### 出力
```
Written: Hello
Read: World
Final: Hello, World!
```

## 参照
- [P0408R7 Efficient Access to `basic_stringbuf`’s Buffer](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0408r7.pdf)
