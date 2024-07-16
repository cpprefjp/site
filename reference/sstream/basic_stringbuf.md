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
| `(constructor)`                 | コンストラクタ                             | |
| `(destructor)`                  | デストラクタ                               | |
| `operator=`                     | ムーブ代入                                 | C++11 |
| `swap`                          | 値の交換                                   | C++11 |
| [`str`](basic_stringbuf/str.md) | 文字列オブジェクトの設定・取得             | |
| `view`                          | 文字列ビューオブジェクトの取得             | C++20 |
| `get_allocator`                 | アロケータの取得                           | C++20 |


## 非メンバ関数

| 名前   | 説明                          | 対応バージョン |
|--------|-------------------------------|----------------|
| `swap` | 2つのオブジェクトを入れ替える | C++11 |


## メンバ型

| 名前             | 説明                          | 対応バージョン |
|------------------|-------------------------------|----------------|
| `char_type`      | テンプレート仮引数`CharT`     | |
| `int_type`       | `Traits::int_type`            | |
| `pos_type`       | `Traits::pos_type`            | |
| `off_type`       | `Traits::off_type`            | |
| `traits_type`    | テンプレート仮引数`Traits`    | |
| `allocator_type` | テンプレート仮引数`Allocator` | |


## 参照
- [P0408R7 Efficient Access to `basic_stringbuf`’s Buffer](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0408r7.pdf)
