#data
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
const charT* data() const;				// C++03 まで

const charT* data() const noexcept;		// C++11 から
```

##概要
文字配列表現を取得する。  
なお、C++11 からは本メンバ関数は [`c_str`](c_str.md) と完全に同一となっているため、以下は C++03 までの挙動についてのみ記載する。  
C++11 からの挙動については [`c_str`](c_str.md) を参照のこと。


##戻り値
文字配列の先頭へのポインタ（備考も参照）


##備考
- 本メンバ関数で返されたポインタが指す配列の値を変更してはいけない。

- 本メンバ関数を呼び出すと、対象オブジェクトの要素への既存の参照、ポインタ、イテレータは無効になる可能性がある。

- 本メンバ関数で返されたポインタは、対象オブジェクトに対する非コンストメンバ関数呼び出しにより無効になる可能性がある。  
	なお、規格書に記載はないものの、[`basic_string`](/reference/string/basic_string.md) への非コンスト参照を引数に取る標準ライブラリ関数を、対象オブジェクトを渡して呼び出した場合にも、無効になる可能性があるものと思われる

- 本メンバが返すポインタは、[`size`](size.md)`() != 0` の場合、長さが [`size`](size.md)`()` の `charT` 型の配列を指す。この配列の要素は対象オブジェクトの文字列と等しい。
	[`size`](size.md)`() == 0` の場合、NULL ポインタ**ではなく**、当該ポインタのコピー、および、当該ポインタに対してゼロの加算が可能な値である。

- [`c_str`](c_str.md) と異なり、本メンバ関数で返る配列は NULL（`charT()`）で終端されていないので、注意すること。（通常は、[`size`](size.md)`()` と併せて利用することになるだろう）


##例
```cpp
#include <string>
#include <cstdio>
#include <cstring>

int main()
{
  std::string s("Hello, world!\n");
  std::fwrite(s.data(), 1, s.size(), stdout);
}
```
* string[link /reference/string.md]
* size[link ./size.md]
* data[color ff0000]

###出力
```
Hello, world!
```


##関連項目

| 名前                  | 説明                           |
|-----------------------|--------------------------------|
| [`c_str`](c_str.md) | C 言語での文字列表現を取得する |
