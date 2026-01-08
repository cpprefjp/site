# basic_ofstream
* fstream[meta header]
* std[meta namespace]
* class template[meta id-type]
* ofstream,wofstream[meta alias]

```cpp
namespace std {
  template <class CharT, class Traits = char_traits<CharT>>
  class basic_ofstream : public basic_ostream<CharT, Traits>;

  using ofstream  = basic_ofstream<char>;
  using wofstream = basic_ofstream<wchar_t>;
}
```
* char_traits[link /reference/string/char_traits.md]
* basic_ostream[link /reference/ostream/basic_ostream.md]

## 概要

少なくとも書き込み操作のできるファイルストリーム

## メンバ関数

| 名前                                             | 説明                                 | 対応バージョン |
|--------------------------------------------------|--------------------------------------|----------------|
| [(constructor)](basic_ofstream/op_constructor.md) | コンストラクタ                       | |
| (destructor)                                     | デストラクタ                         | |
| `operator=`                                      | ムーブ代入                           | C++11 |
| `swap`                                           | 値の交換                             | C++11 |
| [`rdbuf`](basic_ofstream/rdbuf.md)                | ストリームバッファオブジェクトの取得 | |
| [`is_open`](basic_ofstream/is_open.md)            | ファイルを開いているかの判定         | |
| [`open`](basic_ofstream/open.md)                  | ファイルを開く                       | |
| [`close`](basic_ofstream/close.md)                | ファイルを閉じる                     | |


### ネイティブハンドルの取得

| 名前 | 説明 | 対応バージョン |
|-----|------|--------------|
| [`native_handle()`](basic_ofstream/native_handle.md) | ネイティブハンドルを取得する［処理系定義］ | C++26 |


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
| `native_handle_type` | 処理系定義のネイティブハンドルの型`typename basic_filebuf<CharT, Traits>::native_handle_type` | C++26 |


## 例
```cpp example
#include <fstream>
#include <iostream>
#include <string>

int main() {
  // example.txtファイルを出力専用で開く
  std::ofstream ofs("example.txt");
  if (!ofs.is_open()) {
    std::cerr << "ファイルを開けませんでした" << std::endl;
    return 1;
  }

  // ファイルに文字列を書き込む
  ofs << "Hello, world!" << std::endl;

  // ファイルを閉じる (デストラクタでも自動的に閉じられる)
  ofs.close();
}
```
* std::ofstream[color ff0000]
* ofs.is_open[link basic_ofstream/is_open.md]
* ofs.close[link basic_ofstream/close.md]
