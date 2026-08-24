# basic_filebuf
* fstream[meta header]
* std[meta namespace]
* class template[meta id-type]
* filebuf,wfilebuf[meta alias]

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

テンプレートパラメータとして文字型を受け取るようになっており、使用を容易にするため、以下のパラメータ設定済みエイリアスが定義されている。
このエイリアスは[`<fstream>`](/reference/fstream.md)ヘッダと`<iosfwd>`ヘッダで定義されている。

| エイリアス | 説明 | 対応バージョン |
|------------|------|----------------|
| `filebuf`  | `char`型。ASCII、UTF-8等のマルチバイト文字列や、バイナリデータとして使用する。 | |
| `wfilebuf` | `wchar_t`型。ワイド文字列として使用する。                                      | |


## メンバ関数

### 構築・破棄

| 名前                                               | 説明           | 対応バージョン |
|----------------------------------------------------|----------------|----------------|
| [`(constructor)`](basic_filebuf/op_constructor.md) | コンストラクタ |                |
| [`(destructor)`](basic_filebuf/op_destructor.md)   | デストラクタ   |                |
| [`operator=`](basic_filebuf/op_assign.md)          | ムーブ代入     | C++11          |
| [`swap`](basic_filebuf/swap.md)                    | 値の交換       | C++11          |

- コピーコンストラクタとコピー代入演算子は`delete`宣言されている。

### オープンとクローズ

| 名前                                  | 説明                           | 対応バージョン |
|---------------------------------------|--------------------------------|----------------|
| [`is_open`](basic_filebuf/is_open.md) | 開いている状態であることの判定 |                |
| [`open`](basic_filebuf/open.md)       | ファイルを開く                 |                |
| [`close`](basic_filebuf/close.md)     | ファイルを閉じる               |                |

### 環境固有の情報

| 名前 | 説明 | 対応バージョン |
|-----|------|--------------|
| [`native_handle()`](basic_filebuf/native_handle.md) | ネイティブハンドルを取得する［処理系定義］ | C++26 |


### オーバーライドされている関数

すべて`protected`で定義されている。

| 名前                                        | 説明           | 対応バージョン |
|---------------------------------------------|----------------|----------------|
| [`imbue`](basic_filebuf/imbue.md)           | ロケールを設定する | |
| [`setbuf`](basic_filebuf/setbuf.md)         | バッファ領域を与える | |
| [`seekoff`](basic_filebuf/seekoff.md)       | 相対指定での位置移動 | |
| [`seekpos`](basic_filebuf/seekpos.md)       | 絶対指定での位置移動 | |
| [`sync`](basic_filebuf/sync.md)             | 出力列の同期 | |
| [`uflow`](basic_filebuf/uflow.md)           | ファイルから文字を読み込み、読み取り位置を進める | |
| [`underflow`](basic_filebuf/underflow.md)   | ファイルから文字を読み込む | |
| [`showmanyc`](basic_filebuf/showmanyc.md)   | ブロックせずに読み取れると期待される文字数を得る | |
| [`pbackfail`](basic_filebuf/pbackfail.md)   | 1文字を入力列に戻す | |
| [`overflow`](basic_filebuf/overflow.md)     | 蓄えられた文字をファイルへ書き出す | |


## 非メンバ関数

| 名前                                     | 説明                 | 対応バージョン |
|------------------------------------------|----------------------|----------------|
| [`swap`](basic_filebuf/swap_free.md)     | 2つのオブジェクトの値を交換する | C++11 |

## メンバ型

| 名前          | 説明                       | 対応バージョン |
|---------------|----------------------------|----------------|
| `char_type`   | テンプレート仮引数`CharT`  |                |
| `int_type`    | `Traits::int_type`         |                |
| `pos_type`    | `Traits::pos_type`         |                |
| `off_type`    | `Traits::off_type`         |                |
| `traits_type` | テンプレート仮引数`Traits` |                |
| `native_handle_type` | ネイティブハンドルの型 [処理系定義] | C++26 |


## 例
```cpp example
#include <iostream>
#include <fstream>

int main()
{
  // ファイルへ書き込む
  {
    std::filebuf buf;
    buf.open("test.txt", std::ios_base::out);
    buf.sputn("Hello", 5);
  }

  // ファイルから読み込む
  std::filebuf buf;
  buf.open("test.txt", std::ios_base::in);

  for (std::filebuf::int_type c = buf.sbumpc();
       c != std::filebuf::traits_type::eof();
       c = buf.sbumpc()) {
    std::cout << static_cast<char>(c);
  }
  std::cout << std::endl;
}
```
* std::filebuf[color ff0000]
* buf.open[link basic_filebuf/open.md]
* buf.sputn[link /reference/streambuf/basic_streambuf/sputn.md]
* buf.sbumpc()[link /reference/streambuf/basic_streambuf/sbumpc.md]
* traits_type::eof()[link /reference/string/char_traits/eof.md]

### 出力
```
Hello
```


## バージョン
### 言語
- C++98


## 関連項目
- [`basic_streambuf`](../streambuf/basic_streambuf.md)
- [`basic_fstream`](basic_fstream.md)
- [`basic_ifstream`](basic_ifstream.md)
- [`basic_ofstream`](basic_ofstream.md)
