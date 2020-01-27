# basic_filebuf
* fstream[meta header]
* std[meta namespace]
* class[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_filebuf : public basic_streambuf<CharT, Traits> { …… };

  using filebuf  = basic_filebuf<char>;
  using wfilebuf = basic_filebuf<wchar_t>;
}
```
* char_traits[link ../string/char_traits.md]
* basic_streambuf[link ../streambuf/basic_streambuf.md]

## 概要
`basic_filebuf`は、ファイルに対するストリームバッファを表現するクラスである。
Cの`FILE*`に対する入出力関数を使って実装される。

位置操作（`seekoff`と`seekpos`）は、入力・出力双方で共有される。

テンプレートパラメータとして文�型を受け取るようになっており、使用を容易にするため、以下のパラメータ�定済みエイリアスが定義されている。
このエイリアスは`<fstream>`ヘッダと`<iosfwd>`ヘッダで定義されている。

| エイリアス | 説明 | 対応バージョン |
|------------|------|----------------|
| `filebuf`  | `char`型。ASCII、UTF-8�のマルチバイト文�列や、バイナリデータとして使用する。 | |
| `wfilebuf` | `wchar_t`型。ワイド文�列として使用する。                                      | |


### 型

| 名前          | 説明                       | 対応バージョン |
|---------------|----------------------------|----------------|
| `char_type`   | テンプレート仮引数`CharT`  |                |
| `int_type`    | `Traits::int_type`         |                |
| `pos_type`    | `Traits::pos_type`         |                |
| `off_type`    | `Traits::off_type`         |                |
| `traits_type` | テンプレート仮引数`Traits` |                |

### 構築・破棄

| 名前                                              | 説明           | 対応バージョン |
|---------------------------------------------------|----------------|----------------|
| [`(constructor)`](basic_filebuf/op_constructor.md)  | コンストラクタ |                |
| [`(destructor)`](basic_filebuf/op_destructor.md)    | デストラクタ   |                |
| `operator=`                                       | ムーブ代入     | C++11          |
| `swap`                                            | 値の交換       | C++11          |

- コピーコンストラクタとコピー代入演算�は`delete`宣言されている。

### オープンとク�ーズ

| 名前                                  | 説明                           | 対応バージョン |
|---------------------------------------|--------------------------------|----------------|
| [`is_open`](basic_filebuf/is_open.md) | 開いている状態であることの判定 |                |
| [`open`](basic_filebuf/open.md)       | ファイルを開く                 |                |
| [`close`](basic_filebuf/close.md)     | ファイルを閉じる               |                |

### オーバーライドされている関数

すべて`protected`で定義されている。

| 名前                                        | 説明           | 対応バージョン |
|---------------------------------------------|----------------|----------------|
| `imbue`                                     | �ケールを�定する (protected virtual) | |
| `setbuf`                                    | バッファ領域を与える (protected virtual) | |
| `seekoff`                                   | 相対指定での位置移動 (protected virtual) | |
| `seekpos`                                   | 絶対指定での位置移動 (protected virtual) | |
| `sync`                                      | 出力列の同期 (protected virtual) | |
| `uflow`                                     | (protected virtual) |
| `underflow`                                 | (protected virtual) |
| `showmasync`                                | ブ�ックせずに�み取れると期待される文�数を得る (protected virtual) | |
| `pbackfail`                                 | 1文�を入力列に戻す (protected virtual) | |
| `overflow`                                  | (protected virtual) |

## 参照
- [`basic_streambuf`](../streambuf/basic_streambuf.md)
