# basic_streambuf
* streambuf[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_streambuf { …… };

  using streambuf  = basic_streambuf<char>;
  using wstreambuf = basic_streambuf<wchar_t>;
}
```
* char_traits[link ../string/char_traits.md]

## 概要
`basic_streambuf`は、ストリームバッファを表現するクラスである。
入力ストリーム・出力ストリームに対して、実際の入出力機能を提供する。

テンプレートパラメータとして文字型を受け取るようになっており、使用を容易にするため、以下のパラメータ設定済みエイリアスが定義されている。
このエイリアスは`<streambuf>`ヘッダと`<iosfwd>`ヘッダで定義されている。

| エイリアス   | 説明 | 対応バージョン |
|--------------|------|----------------|
| `streambuf`  | `char`型。ASCII、UTF-8等のマルチバイト文字列や、バイナリデータとして使用する。 | |
| `wstreambuf` | `wchar_t`型。ワイド文字列として使用する。                                      | |

### ストリームバッファについて

`basic_streambuf`はストリームバッファを取り扱うクラステンプレートである。
ストリームバッファは入力列と出力列からなる。

入力列と出力列それぞれについて、`basic_streambuf`から直接アクセスできる部分は全体の一部分のみである（もちろん、全体がそこに収まっている場合もある）。
その直接アクセスできる部分列は`CharT`の配列として表現され、先頭・現在位置・終端の3つのポインタで指し示す。
ただし、先頭・現在位置・終端のポインタがすべてnullptrである状態もありえる。

`basic_streambuf`に対するすべての入出力処理は、この3つ組のポインタに対する処理や列全体と部分列の対応を変更する処理として実現されている。

たとえば`basic_filebuf`では、ファイルの内容を列全体と見なし、basic_filebuf内でバッファリングしている部分が先頭・現在位置・終端の3つのポインタで指し示されるという構成になる。

## メンバ

- publicな関数: 主に`basic_streambuf`を利用する側に対するもの。
- protectedな関数: `basic_streambuf`の派生クラスを作る側に対するもの。
- protected virtualな関数: `basic_streambuf`の派生クラスを作る際に必要に応じてオーバーライドするもの。

### 型

| 名前          | 説明                       | 対応バージョン |
|---------------|----------------------------|----------------|
| `char_type`   | テンプレート仮引数`CharT`  |                |
| `int_type`    | `Traits::int_type`         |                |
| `pos_type`    | `Traits::pos_type`         |                |
| `off_type`    | `Traits::off_type`         |                |
| `traits_type` | テンプレート仮引数`Traits` |                |

### 構築・破棄

| 名前                                                  | 説明                       | 対応バージョン |
|-------------------------------------------------------|----------------------------|----------------|
| [`(constructor)`](basic_streambuf/op_constructor.md) | コンストラクタ (protected) |                |
| `(destructor)`                                        | デストラクタ (virtual)     |                |
| [`operator=`](basic_streambuf/op_assign.md)           | コピー代入 (protected)     | C++11          |
| [`swap`](basic_streambuf/swap.md)                     | 値の交換 (protected)       | C++11          |

### ロケール

| 名前                                      | 説明                                     | 対応バージョン |
|-------------------------------------------|------------------------------------------|----------------|
| [`getloc`](basic_streambuf/getloc.md)     | 現在のロケールを返す。                   |                |
| [`pubimbue`](basic_streambuf/pubimbue.md) | ロケールを設定する。                     |                |
| [`imbue`](basic_streambuf/imbue.md)       | ロケールを設定する (protected virtual)。 |                |

### バッファとポジショニング

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`pubsetbuf`](basic_streambuf/pubsetbuf.md) | バッファ領域を与える。 | |
| [`pubseekoff`](basic_streambuf/pubseekoff.md) | 相対位置指定での移動。 | |
| [`pubseekpos`](basic_streambuf/pubseekpos.md) | 絶対位置指定での移動。 | |
| [`pubsync`](basic_streambuf/pubsync.md) | 出力列の同期。 | |
| [`setbuf`](basic_streambuf/setbuf.md) | バッファ領域を与える (protected virtual)。 | |
| [`seekoff`](basic_streambuf/seekoff.md) | 相対位置指定での移動 (protected virtual)。 | |
| [`seekpos`](basic_streambuf/seekpos.md) | 絶対位置指定での移動 (protected virtual)。 | |
| [`sync`](basic_streambuf/sync.md) | 出力列の同期 (protected virtual)。 | |

### 入力

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`in_avail`](basic_streambuf/in_avail.md) | 現在の入力列の読み取り可能な文字数を返す。 | |
| [`snextc`](basic_streambuf/snextc.md) | 入力列の1文字を捨てて、次の文字を読み取る。 | |
| [`sbumpc`](basic_streambuf/sbumpc.md) | 入力列の現在位置の文字を読み取り、現在位置を1文字進める。 | |
| [`uflow`](basic_streambuf/uflow.md) | 入力部分列の領域を消費し切った際の処理 (protected virtual)。 |
| [`sgetc`](basic_streambuf/sgetc.md) | 入力列の現在位置の文字を読み取る。 | |
| [`underflow`](basic_streambuf/underflow.md) | 入力部分列の領域を消費し切った際の処理 (protected virtual)。 |
| [`sgetn`](basic_streambuf/sgetn.md) | 入力列から複数文字を読み取る。 | |
| [`xsgetn`](basic_streambuf/xsgetn.md) | 入力列から複数文字を読み取る (protected virtual)。 | |
| [`showmanyc`](basic_streambuf/showmanyc.md) | ブロックせずに読み取れると期待される文字数を得る (protected virtual)。 | |

### 入力の読み戻し

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`sputbackc`](basic_streambuf/sputbackc.md) | 任意の1文字を入力列に戻す。 | |
| [`sungetc`](basic_streambuf/sungetc.md) | 直前に読み取った1文字を入力列に戻す。 | |
| [`pbackfail`](basic_streambuf/pbackfail.md) | 1文字を入力列に戻す (protected virtual)。 | |

### 入力部分列の操作

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`eback`](basic_streambuf/eback.md) | 入力部分列の先頭へのポインタを返す (protected)。 | |
| [`gptr`](basic_streambuf/gptr.md) | 入力部分列の現在位置へのポインタを返す (protected)。 | |
| [`egptr`](basic_streambuf/egptr.md) | 入力部分列の終端へのポインタを返す (protected)。 | |
| [`gbump`](basic_streambuf/gbump.md) | 入力部分列の現在位置を指定した量だけ進める (protected)。 | |
| [`setg`](basic_streambuf/setg.md) | 入力部分列の各ポインタを設定する (protected)。 | |

### 出力

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`sputc`](basic_streambuf/sputc.md) | 出力列に1文字書き込む。 | |
| [`overflow`](basic_streambuf/overflow.md) | 出力部分列の領域を消費し切った際の処理 (protected virtual)。 |
| [`sputn`](basic_streambuf/sputn.md) | 出力列に複数文字を書き込む。 | |
| [`xsputn`](basic_streambuf/xsputn.md) | 出力列に複数文字を書き込む (protected virtual)。 | |

### 出力部分列の操作

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`pbase`](basic_streambuf/pbase.md) | 出力部分列の先頭へのポインタを返す (protected)。 | |
| [`pptr`](basic_streambuf/pptr.md) | 出力部分列の現在位置へのポインタを返す (protected)。 | |
| [`epptr`](basic_streambuf/epptr.md) | 出力部分列の終端へのポインタを返す (protected)。 | |
| [`pbump`](basic_streambuf/pbump.md) | 出力部分列の現在位置を指定した量だけ進める (protected)。 | |
| [`setp`](basic_streambuf/setp.md) | 出力部分列の各ポインタを設定する (protected)。 | |

## 参照
