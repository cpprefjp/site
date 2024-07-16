# data
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
const charT* data() const;                    // (1) C++03
const charT* data() const noexcept;           // (1) C++11
constexpr const charT* data() const noexcept; // (1) C++20

charT* data() noexcept;                       // (2) C++17
constexpr charT* data() noexcept;             // (2) C++20
```

## 概要
文字配列表現を取得する。

- (1) : 読み取り専用で文字配列の先頭へのポインタを取得する
- (2) : 文字配列の先頭へのポインタを取得する


## 戻り値
- (1) :
    - C++03 : 文字配列の先頭へのポインタを返す。ただし、NULLで終端はされない
    - C++11 : C 言語で使用されている文字列表現である、NULL（つまり `charT()`）で終端された文字配列の先頭へのポインタを返す
- (2) :
    - C 言語で使用されている文字列表現である、NULL（つまり `charT()`）で終端された文字配列の先頭へのポインタを返す


## 計算量
- (1), (2) : 定数時間


## 備考
- (1) :
    - C++03まで :
        - 本メンバ関数で返されたポインタが指す配列の値を変更してはいけない。
        - 本メンバ関数を呼び出すと、対象オブジェクトの要素への既存の参照、ポインタ、イテレータは無効になる可能性がある。
        - 本メンバ関数で返されたポインタは、対象オブジェクトに対する非constメンバ関数呼び出しにより無効になる可能性がある。
            - なお、規格書に記載はないものの、[`basic_string`](/reference/string/basic_string.md) への非const参照を引数に取る標準ライブラリ関数を、対象オブジェクトを渡して呼び出した場合にも、無効になる可能性があるものと思われる
        - 本メンバが返すポインタは、[`size`](size.md)`() != 0` の場合、長さが [`size`](size.md)`()` の `charT` 型の配列を指す。この配列の要素は対象オブジェクトの文字列と等しい。
        - [`size`](size.md)`() == 0` の場合、NULL ポインタ**ではなく**、当該ポインタのコピー、および、当該ポインタに対してゼロの加算が可能な値である。
        - [`c_str()`](c_str.md) と異なり、本メンバ関数で返る配列は NULL（`charT()`）で終端されていないので、注意すること。（通常は、[`size`](size.md)`()` と併せて利用することになるだろう）
    - C++11から :
        - [`c_str()`](c_str.md)メンバ関数と同一の動作をする。
        - 本メンバ関数を呼び出しても、対象オブジェクトの要素への既存の参照、ポインタ、イテレータは無効にはならない。
        - 本メンバ関数で返されたポインタは、対象オブジェクトに対する非constメンバ関数呼び出しにより無効になる可能性がある。
        - 本メンバが返すポインタは、長さが [`size`](size.md)`() + 1` の `charT` 型の配列を指す。この配列は、最初の [`size`](size.md)`()` 要素は対象オブジェクトの文字列と等しく、最後の要素は NULL 文字、すなわち `charT()` である。  
            - 本メンバ関数が返すポインタを `p` とすると、範囲 `[0,` [`size`](size.md)`()]` の全ての `i` について `p + i ==` [`addressof`](/reference/memory/addressof.md)`(operator[](i))` を満たす。このことから、`*`[`end`](end.md)`() == charT()` を満たす。
- 対象オブジェクト内に NULL 文字があった場合、C 言語の文字列表現では正しく扱うことができないので注意すること。
- (2) :
    - この関数を使用するユーザーは、`p +` [`size()`](size.md) (NULL終端) に格納されている値を変更してはならない


## 例
```cpp example
#include <string>
#include <cstdio>
#include <cstring>

int main()
{
  std::string s("Hello, world!\n");
  std::fwrite(s.data(), 1, s.size(), stdout);
}
```
* data()[color ff0000]
* s.size()[link size.md]

### 出力
```
Hello, world!
```


## 関連項目

| 名前                  | 説明                           |
|-----------------------|--------------------------------|
| [`c_str`](c_str.md) | C 言語での文字列表現を取得する |


## 参照
- [P0272R1 Give `std::string` a non-const `.data()` member function.](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0272r1.html)
- [LWG Issue 3131. `addressof` all the things](https://wg21.cmeerw.net/lwg/issue3131)
- [P0980R1 Making `std::string` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0980r1.pdf)
