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

テンプレートパラメータとして文�型を受け取るようになっており、使用を容易にするため、以下のパラメータ�定済みエイリアスが定義されている。
このエイリアスは`<streambuf>`ヘッダと`<iosfwd>`ヘッダで定義されている。

| エイリアス   | 説明 | 対応バージョン |
|--------------|------|----------------|
| `streambuf`  | `char`型。ASCII、UTF-8�のマルチバイト文�列や、バイナリデータとして使用する。 | |
| `wstreambuf` | `wchar_t`型。ワイド文�列として使用する。                                      | |

### ストリームバッファについて

`basic_streambuf`はストリームバッファを取り扱うクラステンプレートである。
ストリームバッファは入力列と出力列からなる。

入力列と出力列それぞれについて、`basic_streambuf`から直接アクセスできる部分は全体の一部分のみである（もちろん、全体がそこに収まっている場合もある）。
その直接アクセスできる部分列は`CharT`の配列として表現され、先�・現在位置・終端の3つのポインタで指し示す。
ただし、先�・現在位置・終端のポインタがすべてnullptrである状態もありえる。

`basic_streambuf`に対するすべての入出力処理は、この3つ組のポインタに対する処理や列全体と部分列の対応を変更する処理として実現されている。

たとえば`basic_filebuf`では、ファイルの内容を列全体と見なし、basic_filebuf内でバッファリングしている部分が先�・現在位置・終端の3つのポインタで指し示されるという構成になる。

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
| `operator=`                                           | コピー代入 (protected)     | C++11          |
| `swap`                                                | 値の交換 (protected)       | C++11          |

### �ケール

| 名前                                      | 説明                                     | 対応バージョン |
|-------------------------------------------|------------------------------------------|----------------|
| [`getloc`](basic_streambuf/getloc.md)     | 現在の�ケールを返す。                   |                |
| [`pubimbue`](basic_streambuf/pubimbue.md) | �ケールを�定する。                     |                |
| [`imbue`](basic_streambuf/imbue.md)       | �ケールを�定する (protected virtual)。 |                |

### バッファとポジショニング

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `pubsetbuf` | バッファ領域を与える。 | |
| `pubseekoff` | 相対位置指定での移動。 | |
| `pubseekpos` | 絶対位置指定での移動。 | |
| `pubsync` | 出力列の同期。 | |
| `setbuf` | バッファ領域を与える (protected virtual)。 | |
| `seekoff` | 相対位置指定での移動 (protected virtual)。 | |
| `seekpos` | 絶対位置指定での移動 (protected virtual)。 | |
| `sync` | 出力列の同期 (protected virtual)。 | |

### 入力

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `in_avail` | 現在の部分列から�み取り可能な文�数を返す。 | |
| `snextc` | 1文�捨てて、次の文�を�み取る。 | |
| `sbumpc` | 現在位置の文�を�み取り、現在位置を1文�進める。 | |
| `uflow` | (protected virtual) |
| `sgetc` | 現在位置の文�を�み取る。 | |
| `underflow` | (protected virtual) |
| `sgetn` | 複数文�を�み取る。 | |
| `xsgetn` | 複数文�を�み取る (protected virtual)。 | |
| `showmasync` | ブ�ックせずに�み取れると期待される文�数を得る (protected virtual)。 | |

### 入力の�み戻し

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `sputbackc` | 任意の1文�を入力列に戻す。 | |
| `sungetc` | 直前に�み取った1文�を入力列に戻す。 | |
| `pbackfail` | 1文�を入力列に戻す (protected virtual) | |

### 入力部分列の操作

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `eback` | 入力部分列の先�へのポインタを返す (protected)。 | |
| `gptr` | 入力部分列の現在位置へのポインタを返す (protected)。 | |
| `egptr` | 入力部分列の終端へのポインタを返す (protected)。 | |
| `gbump` | 入力部分列の現在位置を指定した量だけ進める (protected)。 | |
| `setg` | 入力部分列の各ポインタを�定する (protected)。 | |

### 出力

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `sputc` | 1文�を出力。 | |
| `overflow` | (protected virtual) |
| `sputn` | 複数文�を出力。 | |
| `xsputn` | 複数文�を出力 (protected virtual)。 | |

### 出力部分列の操作

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `pbase` | 出力部分列の先�へのポインタを返す (protected)。 | |
| `pptr` | 出力部分列の現在位置へのポインタを返す (protected)。 | |
| `epptr` | 出力部分列の終端へのポインタを返す (protected)。 | |
| `pbump` | 出力部分列の現在位置を指定した量だけ進める (protected)。 | |
| `setp` | 出力部分列の各ポインタを�定する (protected)。 | |

## 参照

