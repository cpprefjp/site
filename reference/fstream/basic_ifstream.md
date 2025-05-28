# basic_ifstream
* fstream[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class CharT, class Traits = char_traits<CharT>>
  class basic_ifstream : public basic_istream<CharT, Traits>;

  using ifstream  = basic_ifstream<char>;
  using wifstream = basic_ifstream<wchar_t>;
}
```
* char_traits[link /reference/string/char_traits.md]
* basic_istream[link /reference/istream/basic_istream.md]

## 概要

少なくとも読み取り操作のできるファイルストリーム

## メンバ関数

| 名前                                             | 説明                                 | 対応バージョン |
|--------------------------------------------------|--------------------------------------|----------------|
| [(constructor)](basic_ifstream/op_constructor.md) | コンストラクタ                       | |
| (destructor)                                     | デストラクタ                         | |
| `operator=`                                      | ムーブ代入                           | C++11 |
| `swap`                                           | 値の交換                             | C++11 |
| [`rdbuf`](basic_ifstream/rdbuf.md)                | ストリームバッファオブジェクトの取得 | |
| [`is_open`](basic_ifstream/is_open.md)            | ファイルを開いているかの判定         | |
| [`open`](basic_ifstream/open.md)                  | ファイルを開く                       | |
| [`close`](basic_ifstream/close.md)                | ファイルを閉じる                     | |


### ネイティブハンドルの取得

| 名前 | 説明 | 対応バージョン |
|-----|------|--------------|
| [`native_handle()`](basic_ifstream/native_handle.md) | ネイティブハンドルを取得する［処理系定義］ | C++26 |


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
  // example.txtファイルを読み取り専用で開く
  std::ifstream ifs("example.txt");
  if (!ifs.is_open()) {
    std::cerr << "ファイルを開けませんでした" << std::endl;
    return 1;
  }

  // ファイルの内容を1行ずつ読み取り、出力する
  std::string line;
  while (std::getline(ifs, line)) {
    std::cout << line << std::endl;
  }

  // ファイルを閉じる (デストラクタでも自動的に閉じられる)
  ifs.close();
}
```
* std::ifstream[color ff0000]
* ifs.is_open[link basic_ifstream/is_open.md]
* ifs.close[link basic_ifstream/close.md]
* std::getline[link /reference/string/basic_string/getline.md]

