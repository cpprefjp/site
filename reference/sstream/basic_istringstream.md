#basic_istringstream
* sstream[meta header]
* std[meta namespace]
* class[meta id-type]

```cpp
namespace std {
  template <class CharT, class Traits = char_traits<CharT>,
            class Allocator = allocator<CharT> >
  class basic_istringstream : public basic_istream<CharT, Traits>;
  
  using istringstream  = basic_istringstream<char>;
  using wistringstream = basic_istringstream<wchar_t>;
}
```
* char_traits[link /reference/string/char_traits.md]
* allocator[link /reference/memory/allocator.md]
* basic_istream[link /reference/istream/basic_istream.md]

##概要


##メンバ関数

| 名前          | 説明                                       | 対応バージョン |
|---------------|--------------------------------------------|----------------|
| (constructor) | コンストラクタ                             | |
| (destructor)  | デストラクタ                               | |
| `operator=`   | ムーブ代入                                 | C++11 |
| `swap`        | 値の交換                                   | C++11 |
| `rdbuf`       | ストリームバッファオブジェクトの設定・取得 | |
| `str`         | 文字列オブジェクトの設定・取得             | |


##非メンバ関数

| 名前   | 説明                          | 対応バージョン |
|--------|-------------------------------|----------------|
| `swap` | 2つのオブジェクトを入れ替える | C++11 |


##メンバ型

| 名前             | 説明                          | 対応バージョン |
|------------------|-------------------------------|----------------|
| `char_type`      | テンプレート仮引数`CharT`     | |
| `int_type`       | `Traits::int_type`            | |
| `pos_type`       | `Traits::pos_type`            | |
| `off_type`       | `Traits::off_type`            | |
| `traits_type`    | テンプレート仮引数`Traits`    | |
| `allocator_type` | テンプレート仮引数`Allocator` | |

##例
```cpp
```

###出力
```
```

