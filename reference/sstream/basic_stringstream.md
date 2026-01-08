# basic_stringstream
* sstream[meta header]
* std[meta namespace]
* class template[meta id-type]
* stringstream,wstringstream[meta alias]

```cpp
namespace std {
  template <class CharT, class Traits = char_traits<CharT>,
            class Allocator = allocator<CharT> >
  class basic_stringstream : public basic_iostream<CharT, Traits>;

  using stringstream  = basic_stringstream<char>;
  using wstringstream = basic_stringstream<wchar_t>;
}
```
* char_traits[link /reference/string/char_traits.md]
* allocator[link /reference/memory/allocator.md]
* basic_iostream[link /reference/istream/basic_iostream.md]

## 概要
`std::basic_stringstream`クラスは、文字列を出力先・入力元とするストリームであり、読み取りと書き込みの両方の操作ができる。

このクラスは、内部バッファに文字列を保持し、ストリーム操作で文字列の内容を組み立てたり、文字列内容を解析したりすることができる。


## メンバ関数

| 名前                                | 説明                                       | 対応バージョン |
|-------------------------------------|--------------------------------------------|----------------|
| [`(constructor)`](basic_stringstream/op_constructor.md) | コンストラクタ                             | |
| [`(destructor)`](basic_stringstream/op_destructor.md)  | デストラクタ                               | |
| [`operator=`](basic_stringstream/op_assign.md)         | ムーブ代入                                 | C++11 |
| [`swap`](basic_stringstream/swap.md)                   | 値の交換                                   | C++11 |
| [`rdbuf`](basic_stringstream/rdbuf.md)                 | ストリームバッファオブジェクトの設定・取得 | |
| [`str`](basic_stringstream/str.md)                     | 文字列オブジェクトの設定・取得             | |
| [`view`](basic_stringstream/view.md)                   | 文字列ビューオブジェクトの取得             | C++20 |


## 非メンバ関数

| 名前   | 説明                          | 対応バージョン |
|--------|-------------------------------|----------------|
| [`swap`](basic_stringstream/swap_free.md) | 2つのオブジェクトを入れ替える | C++11 |


## メンバ型

| 名前             | 説明                          | 対応バージョン |
|------------------|-------------------------------|----------------|
| `char_type`      | テンプレート仮引数`CharT`     | |
| `int_type`       | `Traits::int_type`            | |
| `pos_type`       | `Traits::pos_type`            | |
| `off_type`       | `Traits::off_type`            | |
| `traits_type`    | テンプレート仮引数`Traits`    | |
| `allocator_type` | テンプレート仮引数`Allocator` | |

## 例
```cpp example
#include <iostream>
#include <sstream>
#include <string>

int main()
{
  // 読み取りと書き込みが可能なストリーム
  std::stringstream ss;
  
  // データを書き込む
  ss << "Hello " << 123 << " World " << 45.67;
  
  // 文字列として取得
  std::cout << "Content: " << ss.str() << std::endl;
  
  // 読み取り位置をリセット
  ss.seekg(0);
  
  // データを読み取る
  std::string word1, word3;
  int num1;
  double num2;
  
  ss >> word1 >> num1 >> word3 >> num2;
  
  std::cout << "Read: word1=" << word1 
            << ", num1=" << num1 
            << ", word3=" << word3 
            << ", num2=" << num2 << std::endl;
  
  // 新しい内容でリセット
  ss.str("42 3.14159 test");
  ss.clear();  // エラーフラグをクリア
  
  int value;
  double pi;
  std::string text;
  ss >> value >> pi >> text;
  
  std::cout << "New data: " << value << ", " << pi << ", " << text << std::endl;
}
```
* ss.str[link basic_stringstream/str.md]
* ss.seekg[link /reference/istream/basic_istream/seekg.md]
* ss.clear[link /reference/ios/basic_ios/clear.md]

### 出力
```
Content: Hello 123 World 45.67
Read: word1=Hello, num1=123, word3=World, num2=45.67
New data: 42, 3.14159, test
```

## 参照
- [P0408R7 Efficient Access to `basic_stringbuf`’s Buffer](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0408r7.pdf)
