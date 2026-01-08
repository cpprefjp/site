# basic_fstream
* fstream[meta header]
* std[meta namespace]
* class template[meta id-type]
* fstream,wfstream[meta alias]

```cpp
namespace std {
  template <class CharT, class Traits = char_traits<CharT>>
  class basic_fstream : public basic_iostream<CharT, Traits>;

  using fstream  = basic_fstream<char>;
  using wfstream = basic_fstream<wchar_t>;
}
```
* char_traits[link /reference/string/char_traits.md]
* basic_iostream[link /reference/istream/basic_iostream.md]

## 概要
ファイルに対する入出力を提供する高水準な機構

## メンバ関数

| 名前                                             | 説明                                 | 対応バージョン |
|--------------------------------------------------|--------------------------------------|----------------|
| [(constructor)](basic_fstream/op_constructor.md) | コンストラクタ                       | |
| (destructor)                                     | デストラクタ                         | |
| `operator=`                                      | ムーブ代入                           | C++11 |
| `swap`                                           | 値の交換                             | C++11 |
| [`rdbuf`](basic_fstream/rdbuf.md)                | ストリームバッファオブジェクトの取得 | |
| [`is_open`](basic_fstream/is_open.md)            | ファイルを開いているかの判定         | |
| [`open`](basic_fstream/open.md)                  | ファイルを開く                       | |
| [`close`](basic_fstream/close.md)                | ファイルを閉じる                     | |


### ネイティブハンドルの取得

| 名前 | 説明 | 対応バージョン |
|-----|------|--------------|
| [`native_handle()`](basic_fstream/native_handle.md) | ネイティブハンドルを取得する［処理系定義］ | C++26 |


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
#include <ios>
#include <iostream>
#include <string>

int main() {
  std::fstream fs;
  fs.exceptions(std::ios::failbit | std::ios::badbit); // 例外を有効化する
  try {
    fs.open("./temp.txt", std::ios_base::out | std::ios_base::in | std::ios_base::trunc);
    if (!fs.is_open()) {
      throw std::runtime_error("Failed to open file"); // ファイルが開けなかった場合
    }
    int a = 1;
    long double b = 3.141592;
    std::string c = "hello";
    fs << a << " " << b << " " << c << std::endl;
    fs.seekg(0);
    int d;
    long double e;
    std::string f;
    fs >> d >> e >> f;
    if (!fs) {
      throw std::runtime_error("Failed to read from file"); // ファイルから読み取れなかった場合
    }
    std::cout << d << " " << e << " " << f << std::endl;
  } catch (const std::exception& e) {
    std::cerr << "Error: " << e.what() << std::endl;
    return 1;
  }
  return 0;
}
```
