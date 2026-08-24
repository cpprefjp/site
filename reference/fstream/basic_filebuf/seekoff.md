# seekoff
* fstream[meta header]
* std[meta namespace]
* basic_filebuf[meta class]
* function[meta id-type]

```cpp
protected:
  virtual pos_type
    seekoff(off_type off,
            ios_base::seekdir way,
            ios_base::openmode which = ios_base::in | ios_base::out);  // (1) C++03
  pos_type
    seekoff(off_type off,
            ios_base::seekdir way,
            ios_base::openmode which = ios_base::in | ios_base::out) override; // (1) C++17
```
* ios_base::seekdir[link /reference/ios/ios_base/type-seekdir.md]
* ios_base::openmode[link /reference/ios/ios_base/type-openmode.md]

## 概要
相対位置指定でファイル位置を移動する。

このメンバ関数は`protected`であり、[`std::basic_streambuf`](/reference/streambuf/basic_streambuf.md)の`public`メンバ関数[`pubseekoff()`](/reference/streambuf/basic_streambuf/pubseekoff.md)を通して間接的に呼び出される。


## 効果
現在のロケールの[`codecvt`](/reference/locale/codecvt.md)ファセットの`encoding()`の値を`width`とする。

- [`is_open()`](is_open.md)`== false`である場合、もしくは`off != 0 && width <= 0`である場合、位置指定操作は失敗する
- そうでない場合、`way != `[`ios_base::cur`](/reference/ios/ios_base/type-seekdir.md)もしくは`off != 0`であり、かつ直前の操作が出力であった場合は、出力シーケンスを更新し、シフト状態を戻すシーケンス（unshift sequence）を書き込む
- 続いて新しい位置へ移動する。`width > 0`の場合は[`std::fseek`](/reference/cstdio/fseek.md.nolink)`(file, width * off, whence)`を、そうでない場合は[`std::fseek`](/reference/cstdio/fseek.md.nolink)`(file, 0, whence)`を呼び出す

`whence`の値は、`way`の値に応じて以下のように決まる。

| `way`の値 | `stdio`での対応する値 |
|-----------|-----------------------|
| [`ios_base::beg`](/reference/ios/ios_base/type-seekdir.md) | `SEEK_SET` |
| [`ios_base::cur`](/reference/ios/ios_base/type-seekdir.md) | `SEEK_CUR` |
| [`ios_base::end`](/reference/ios/ios_base/type-seekdir.md) | `SEEK_END` |


## 戻り値
可能であれば、移動結果のストリーム位置を保持する`pos_type`オブジェクトを構築して返す。

位置指定操作が失敗した場合、または移動結果のストリーム位置を`pos_type`オブジェクトで表現できない場合は、`pos_type(off_type(-1))`を返す。


## 備考
「直前の操作が出力であった」とは、直前の仮想関数の操作が[`overflow`](overflow.md)であったか、もしくはput領域が空でないことを意味する。

「シフト状態を戻すシーケンスを書き込む」とは、`width`が負である場合に[`codecvt`](/reference/locale/codecvt.md)ファセットの`unshift()`を呼び出し、その結果得られたシーケンスを出力することを意味する。


## 例
```cpp example
#include <iostream>
#include <fstream>

int main()
{
  {
    std::filebuf out;
    out.open("test.txt", std::ios_base::out);
    out.sputn("ABCDE", 5);
  }

  std::filebuf buf;
  buf.open("test.txt", std::ios_base::in);

  // 先頭から2文字目へ移動する
  buf.pubseekoff(2, std::ios_base::beg);
  std::cout << static_cast<char>(buf.sbumpc()) << std::endl;

  // 現在位置から1文字進める
  buf.pubseekoff(1, std::ios_base::cur);
  std::cout << static_cast<char>(buf.sbumpc()) << std::endl;
}
```
* std::filebuf[link /reference/fstream/basic_filebuf.md]
* out.open[link open.md]
* buf.open[link open.md]
* out.sputn[link /reference/streambuf/basic_streambuf/sputn.md]
* buf.pubseekoff[link /reference/streambuf/basic_streambuf/pubseekoff.md]
* buf.sbumpc()[link /reference/streambuf/basic_streambuf/sbumpc.md]

### 出力
```
C
E
```

## バージョン
### 言語
- C++98


## 関連項目
- [`basic_filebuf::seekpos`](seekpos.md)
- [`basic_streambuf::seekoff`](/reference/streambuf/basic_streambuf/seekoff.md)
- [`basic_streambuf::pubseekoff`](/reference/streambuf/basic_streambuf/pubseekoff.md)


## 参照
- [LWG Issue 2473. `basic_filebuf`'s relation to C `FILE` semantics](https://cplusplus.github.io/LWG/issue2473)
    - `seekoff`と`seekpos`のCの対応関数（`fseek`/`fsetpos`）との関係が整理された
