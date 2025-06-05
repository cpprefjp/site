# basic_ostringstream
* sstream[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class CharT, class Traits = char_traits<CharT>,
            class Allocator = allocator<CharT> >
  class basic_ostringstream : public basic_ostream<CharT, Traits>;

  using ostringstream  = basic_ostringstream<char>;
  using wostringstream = basic_ostringstream<wchar_t>;
}
```
* char_traits[link /reference/string/char_traits.md]
* allocator[link /reference/memory/allocator.md]
* basic_ostream[link /reference/ostream/basic_ostream.md]

## 概要
バッファに保持された文字列への書き込み操作ができるストリーム


## メンバ関数

| 名前                                | 説明                                       | 対応バージョン |
|-------------------------------------|--------------------------------------------|----------------|
| [`(constructor)`](basic_ostringstream/op_constructor.md) | コンストラクタ                             | |
| [`(destructor)`](basic_ostringstream/op_destructor.md)  | デストラクタ                               | |
| [`operator=`](basic_ostringstream/op_assign.md)         | ムーブ代入                                 | C++11 |
| [`swap`](basic_ostringstream/swap.md)                   | 値の交換                                   | C++11 |
| [`rdbuf`](basic_ostringstream/rdbuf.md)                 | ストリームバッファオブジェクトの設定・取得 | |
| [`str`](basic_ostringstream/str.md)                     | 文字列オブジェクトの設定・取得             | |
| [`view`](basic_ostringstream/view.md)                   | 文字列ビューオブジェクトの取得             | C++20 |


## 非メンバ関数

| 名前   | 説明                          | 対応バージョン |
|--------|-------------------------------|----------------|
| [`swap`](basic_ostringstream/swap_free.md) | 2つのオブジェクトを入れ替える | C++11 |


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
