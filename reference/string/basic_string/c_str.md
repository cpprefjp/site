#c_str
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
const charT* c_str() const;				// C++03 まで

const charT* c_str() const noexcept;	// C++11 から
```

##概要
C 言語での文字列表現を取得する。


##戻り値
C 言語で使用されている文字列表現である、NULL（つまり `charT()`）で終端された文字配列の先頭へのポインタ（備考も参照）


##例外
- C++03 まで：規定なし
- C++11 から：投げない


##計算量
- C++03 まで：規定なし
- C++11 から：定数時間


##備考
- 本メンバ関数で返されたポインタが指す配列の値を変更してはいけない。

- 本メンバ関数の呼び出しによる、対象オブジェクトの要素への既存の参照、ポインタ、イテレータの有効性への影響は以下の通りである。
	* C++03 まで：本メンバ関数を呼び出すと、対象オブジェクトの要素への既存の参照、ポインタ、イテレータは無効になる可能性がある。
	* C++11 から：本メンバ関数を呼び出しても、対象オブジェクトの要素への既存の参照、ポインタ、イテレータは無効にはならない。

- 本メンバ関数で返されたポインタは、以下のような操作により無効になる可能性がある。
	* C++03 まで：対象オブジェクトに対する非コンストメンバ関数呼び出し  
		なお、規格書に記載はないものの、[`basic_string`](/reference/string/basic_string.md) への非コンスト参照を引数に取る標準ライブラリ関数を、対象オブジェクトを渡して呼び出した場合にも、無効になるものと思われる
	* C++11 から：対象オブジェクトに対する [`operator[]`](./op_at.md)、[`at`](./at.md)、[`front`](./front.md)、[`back`](./back.md)、[`begin`](./begin.md)、[`rbegin`](./rbegin.md)、[`end`](./end.md)、[`rend`](./rend.md) 以外の非コンストメンバ関数呼び出し、あるいは、[`basic_string`](/reference/string/basic_string.md) への非コンスト参照を引数に取る標準ライブラリ関数の、対象オブジェクトを渡しての呼び出し

- 本メンバが返すポインタは、長さが [`size`](./size.md)`() + 1` の `charT` 型の配列を指す。この配列は、最初の [`size`](./size.md)`()` 要素は対象オブジェクトの文字列と等しく、最後の要素は NULL 文字、すなわち `charT()` である。  
	なお、C++11 からは、本メンバ関数が返すポインタを `p` とすると、範囲 `[0, `[`size`](./size.md)`()]` の全ての `i` について `p + i == &operator[](i)` を満たす。このことから、`*`[`end`](./end.md)`() == charT()` を満たす。

- 対象オブジェクト内に NULL 文字があった場合、C 言語の文字列表現では正しく扱うことができないので注意すること。

- [`data`](./data.md) は、C++03 までは NULL で終端されていない文字配列へのポインタを返していたが、C++11 からは本メンバ関数と全く同じものとなった。


##例
```cpp
#include <string>
#include <cstdio>
#include <cstring>

int main()
{
  std::string s("Hello, world!");
  std::puts(s.c_str());

  s[5] = '\0';
  std::puts(s.c_str());  // ',' 以降は出力されない
}
```
* string[link /reference/string.md]
* c_str[color ff0000]

###出力
```
Hello, world!
Hello
```


##参照
|                     |                        |
|---------------------|------------------------|
| [`data`](./data.md) | 文字配列表現を取得する |
