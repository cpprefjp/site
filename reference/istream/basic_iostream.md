# basic_iostream
* istream[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_iostream :
    public basic_istream<CharT, Traits>,
    public basic_ostream<CharT, Traits> { …… };

  using iostream  = basic_iostream<char>;
  using wiostream = basic_iostream<wchar_t>;
}
```
* basic_istream[link basic_istream.md]
* basic_ostream[link ../ostream/basic_ostream.md]
* char_traits[link ../string/char_traits.md]

## 概要
`basic_iostream`は、入出力両方が可能なストリームを表現するクラスである。
すなわち、`rdbuf()`が指し示すストリームバッファオブジェクトに対する�み取り操作・書き込み操作を提供する。
入力操作は[`basic_istream`](basic_istream.md)から、出力操作は[`basic_ostream`](../ostream/basic_ostream.md)から継承している。

テンプレートパラメータとして文�型を受け取るようになっており、使用を容易にするため、以下のパラメータ�定済みエイリアスが定義されている。
このエイリアスは`<istream>`ヘッダと`<iosfwd>`ヘッダで定義されている。

| エイリアス  | 説明 | 対応バージョン |
|-------------|------|----------------|
| `iostream`  | `char`型。ASCII、UTF-8�のマルチバイト文�列や、バイナリデータとして使用する。 | |
| `wiostream` | `wchar_t`型。ワイド文�列として使用する。                                      | |

## メンバ

基底クラスも参照のこと。

- [`ios_base`](../ios/ios_base.md)
- [`basic_ios`](../ios/basic_ios.md)
- [`basic_istream`](basic_istream.md)
- [`basic_ostream`](../ostream/basic_ostream.md)

### 型

多重継承による曖昧さを解消するため、`basic_ios`と同じ内容でこのクラスでも定義されている。

| 名前          | 説明                             | 対応バージョン |
|---------------|----------------------------------|----------------|
| `char_type`   | テンプレート仮引数`CharT`の別名  | C++11          |
| `int_type`    | `Traits::int_type`の別名         | C++11          |
| `pos_type`    | `Traits::pos_type`の別名         | C++11          |
| `off_type`    | `Traits::off_type`の別名         | C++11          |
| `traits_type` | テンプレート仮引数`Traits`の別名 | C++11          |

### 構築・破棄

| 名前                                                | 説明           | 対応バージョン |
|-----------------------------------------------------|----------------|----------------|
| [`(constructor)`](basic_iostream/op_constructor.md) | コンストラクタ |                |
| `(destructor)`                                      | デストラクタ   |                |
| `operator=`                                         | ムーブ代入     | C++11          |
| `swap`                                              | 値の交換       | C++11          |

- コピーコンストラクタとコピー代入演算�はdelete定義されている。
- ムーブコンストラクタ・ムーブ代入演算�と`swap`はprotectedで定義されている。


## 参照

- 基底クラス
    - [`ios_base`](../ios/ios_base.md)
    - [`basic_ios`](../ios/basic_ios.md)
