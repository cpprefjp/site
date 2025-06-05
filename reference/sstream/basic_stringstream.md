# basic_stringstream
* sstream[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class CharT, class Traits = char_traits<CharT>,
            class Allocator = allocator<CharT> >
  class basic_stringstream : public basic_iostream<CharT, Traits>;

  using stringstream  = basic_stringstream<char>;
  using wstringstream = basic_stringstream<wchar_t>;
}
```
* char_traits[link /reference/string/char_traits.md]
* allocator[link /reference/memory/allocator.md]
* basic_iostream[link /reference/istream/basic_iostream.md]

## 概要
バッファに保持された文字列への読み取りおよび書き込み操作ができるストリーム


## メンバ関数

| 名前                                | 説明                                       | 対応バージョン |
|-------------------------------------|--------------------------------------------|----------------|
| [`(constructor)`](basic_stringstream/op_constructor.md) | コンストラクタ                             | |
| [`(destructor)`](basic_stringstream/op_destructor.md)  | デストラクタ                               | |
| [`operator=`](basic_stringstream/op_assign.md)         | ムーブ代入                                 | C++11 |
| [`swap`](basic_stringstream/swap.md)                   | 値の交換                                   | C++11 |
| [`rdbuf`](basic_stringstream/rdbuf.md)                 | ストリームバッファオブジェクトの設定・取得 | |
| [`str`](basic_stringstream/str.md)                     | 文字列オブジェクトの設定・取得             | |
| [`view`](basic_stringstream/view.md)                   | 文字列ビューオブジェクトの取得             | C++20 |


## 非メンバ関数

| 名前   | 説明                          | 対応バージョン |
|--------|-------------------------------|----------------|
| [`swap`](basic_stringstream/swap_free.md) | 2つのオブジェクトを入れ替える | C++11 |


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
```cpp
```

### 出力
```
```

## 参照
- [P0408R7 Efficient Access to `basic_stringbuf`’s Buffer](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0408r7.pdf)
