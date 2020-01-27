# replace
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
basic_string& replace(size_type pos1, size_type n1,
                      const basic_string& str);                     // (1)

basic_string& replace(size_type pos1, size_type n1,
                      const basic_string& str,
                      size_type pos2, size_type n2);                // (2) C++11
basic_string& replace(size_type pos1, size_type n1,
                      const basic_string& str,
                      size_type pos2, size_type n2 = npos);         // (2) C++14

basic_string& replace(size_type pos, size_type n1, const charT* s,
                      size_type n2);                                // (3)
basic_string& replace(size_type pos, size_type n1, const charT* s); // (4)
basic_string& replace(size_type pos, size_type n1, size_type n2,
                      charT c);                                     // (5)

basic_string& replace(iterator i1, iterator i2,
                      const basic_string& str);                     // (6) C++03
basic_string& replace(const_iterator i1, const_iterator i2,
                      const basic_string& str);                     // (6) C++11

basic_string& replace(iterator i1, iterator i2,
                      const charT* s, size_type n);                 // (7) C++03
basic_string& replace(const_iterator i1, const_iterator i2,
                      const charT* s, size_type n);                 // (7) C++11

basic_string& replace(iterator i1, iterator i2,
                      const charT* s);                              // (8) C++03
basic_string& replace(const_iterator i1, const_iterator i2,
                      const charT* s);                              // (8) C++11

basic_string& replace(iterator i1, iterator i2,
                      size_type n, charT c);                        // (9) C++03
basic_string& replace(const_iterator i1, const_iterator i2,
                      size_type n, charT c);                        // (9) C++11

template <class InputIterator>
basic_string& replace(iterator i1, iterator i2,
                      InputIterator j1, InputIterator j2);          // (10) C++03
template <class InputIterator>
basic_string& replace(const_iterator i1, const_iterator i2,
                      InputIterator j1, InputIterator j2);          // (10) C++11

basic_string& replace(const_iterator i1, const_iterator i2,
                      initializer_list<charT> il);                  // (11) C++11

basic_string& replace(size_type pos1,
                      size_type n1,
                      std::basic_string_view<charT, traits> sv);    // (12) C++17

basic_string& replace(size_type pos1,
                      size_type n1,
                      std::basic_string_view<charT, traits> sv,
                      size_type pos2,
                      size_type n2 = npos);                         // (13) C++17

basic_string& replace(const_iterator i1,
                      const_iterator i2,
                      std::basic_string_view<charT, traits> sv);    // (14) C++17
```

## 概要
文�列の一部を置換する。


## 要件
- (1) : `pos1 <=` [`size()`](size.md)
- (2) : `pos1 <=` [`size()`](size.md)、および`pos2 <= str.`[`size()`](size.md)であること。
- (3) : `pos1 <=` [`size()`](size.md)、および文�配列へのポインタ`s`が、少なくても`n2`個の要素を持つ配列を指していること。
- (4) : `pos <=` [`size()`](size.md)、および文�配列へのポインタ`s`が、少なくても[`traits::length`](/reference/string/char_traits/length.md)`(s) + 1`個の要素を指す配列を指していること。
- (6) : `[`[`begin()`](begin.md)`, i1)`および`[i1, i2)`が有効は範囲であること。
- (7) : `[`[`begin()`](begin.md)`, i1)`および`[i1, i2)`が有効は範囲であること。また、文�配列へのポインタ`s`が、少なくても`n`個の要素を持つ配列を指していること。
- (8) : `[`[`begin()`](begin.md)`, i1)`および`[i1, i2)`が有効は範囲であること。および文�配列へのポインタ`s`が、少なくても[`traits::length`](/reference/string/char_traits/length.md)`(s) + 1`個の要素を指す配列を指していること。
- (9) : `[`[`begin()`](begin.md)`, i1)`および`[i1, i2)`が有効は範囲であること。
- (10) : `[`[`begin()`](begin.md)`, i1)`、`[i1, i2)`、および`[j1, j2)`が有効は範囲であること。
- (11) : `[`[`begin()`](begin.md)`, i1)`および`[i1, i2)`が有効は範囲であること。
- (14) : `[`[`begin()`](begin.md)`, i1)`および`[i1, i2)`が有効は範囲であること。


## 効果
- (1) : `replace(pos1, n1, str.`[`data()`](data.md)`, str.`[`size()`](size.md)`)`を呼び出す。
- (2) :
    - `n2`と`str.`[`size()`](size.md) `- pos2`のうち小さい方を`rlen`とする。`n == npos` の場合は、 `str.`[`size`](size.md)`() - pos2` が使用される。
    - `replace(pos1, n1, str.`[`data()`](data.md) `+ pos2, rlen)`を呼び出す。
- (3) : `n1`と[`size()`](size.md) `- pos1`のうち小さい方を`xlen`とし、自身の`pos1`番目から`xlen`個の要素を、文�配列`s`の先�`n2`文�で置き換える。
- (4) : `replace(pos, n, s,` [`traits::length`](/reference/string/char_traits/length.md)`(s))`を呼び出す。
- (5) : `replace(pos1, n1, basic_string(n2, c))`と同じ効果を持つ。
- (6) : `replace(i1 -` [`begin()`](begin.md)`, i2 - i1, str)`を呼び出す。
- (7) : `replace(i1 -` [`begin()`](begin.md)`, i2 - i1, s, n)`を呼び出す。
- (8) : `replace(i1 -` [`begin()`](begin.md)`, i2 - i1, s,` [`traits::length`](/reference/string/char_traits.md)`(s))`を呼び出す。
- (9) : `replace(i1 -` [`begin()`](begin.md)`, i2 - i1, basic_string(n, c))`を呼び出す。
- (10) : `replace(i1 -` [`begin()`](begin.md)`, i2 - i1, basic_string(j1, j2))`を呼び出す。
- (11) : `replace(i1 -` [`begin()`](begin.md)`, i2 - i1, il.`[`begin()`](/reference/initializer_list/initializer_list/begin.md)`, il.`[`size()`](/reference/initializer_list/initializer_list/size.md)`)`を呼び出す。
- (12) : `return replace(pos1, n1,` [`sv.data()`](/reference/string_view/basic_string_view/data.md)`,` [`sv.size()`](/reference/string_view/basic_string_view/size.md)`);` と�価
- (13) :
    - `n2`と`sv.`[`size()`](/reference/string_view/basic_string_view/size.md) `- pos2`のうち小さい方を`rlen`とする。
    - `replace(pos1, n1,` [`sv.data()`](/reference/string_view/basic_string_view/data.md) `+ pos2, rlen)` を呼び出す
- (14) : `replace(i1 -` [`begin()`](begin.md)`, i2 - i1, sv)` を呼び出す


## 戻り値
`*this`


## 例外
- (1) : `pos1 >` [`size()`](size.md)の場合、[`out_of_range`](/reference/stdexcept.md)例外を送出する。
- (2) : `pos1 >` [`size()`](size.md)もしくは`pos2 > str.`[`size()`](size.md)である場合、[`out_of_range`](/reference/stdexcept.md)例外を送出する。
- (3) : `pos1 >` [`size()`](size.md)の場合、[`out_of_range`](/reference/stdexcept.md)例外を送出する。また、置き換え結果の文�列が`max_size()`を超えた場合、[`length_error`](/reference/stdexcept.md)例外を送出する。
- (13) : `pos1 >` [`size()`](size.md)もしくは`pos2 > sv.`[`size()`](/reference/string_view/basic_string_view/size.md)である場合、[`out_of_range`](/reference/stdexcept.md)例外を送出する。


## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  // (1) 指定した位置からN文�を、文�列で置き換える
  {
    std::string s1 = "12345";
    std::string s2 = "abcde";

    // 1番目から2文�を、s2文�列で置き換える
    s1.replace(1, 2, s2);

    std::cout << "(1) : " << s1 << std::endl;
  }

  // (2) 指定した一からN文�を、文�列の一部で置き換える
  {
    std::string s1 = "12345";
    std::string s2 = "abcde";

    // 1番目から2文�を、s2.substr(2, 3)で置き換える
    s1.replace(1, 2, s2, 2, 3);

    std::cout << "(2) : " << s1 << std::endl;
  }

  // (3) 指定した位置からN文�を、文�配列の先�M文�で置き換える
  {
    std::string s1 = "12345";

    // 1番目から2文�を、"abcde"の先�3文�で置き換える
    s1.replace(1, 2, "abcde", 3);

    std::cout << "(3) : " << s1 << std::endl;
  }

  // (4) 指定した位置からN文�を、文�配列で置き換える
  {
    std::string s = "12345";

    s.replace(1, 2, "abcde");

    std::cout << "(4) : " << s << std::endl;
  }

  // (5) 指定した位置からN文�を、M個の文�で置き換える
  {
    std::string s = "12345";

    // 1番目から2文�を、3個の'x'で置き換える
    s.replace(1, 2, 3, 'x');

    std::cout << "(5) : " << s << std::endl;
  }

  // (6) 指定したイテレータ範囲を、文�列で置き換える
  {
    std::string s1 = "12345";
    std::string s2 = "abcde";

    // '2'から'3'をs2で置き換える
    s1.replace(s1.begin() + 1, s1.begin() + 3, s2);

    std::cout << "(6) : " << s1 << std::endl;
  }

  // (7) 指定したイテレータ範囲を、文�配列の先�N文�で置き換える
  {
    std::string s = "12345";

    // '2'から'3'を、"abcde"の先�3文�で置き換える
    s.replace(s.begin() + 1, s.begin() + 3, "abcde", 3);

    std::cout << "(7) : " << s << std::endl;
  }

  // (8) 指定したイテレータ範囲を、文�配列で置き換える
  {
    std::string s = "12345";

    s.replace(s.begin() + 1, s.begin() + 3, "abcde");

    std::cout << "(8) : " << s << std::endl;
  }

  // (9) 指定したイテレータ範囲を、N個の文�で置き換える
  {
    std::string s = "12345";

    // '2'から'3'を、3個の'x'で置き換える
    s.replace(s.begin() + 1, s.begin() + 3, 3, 'x');

    std::cout << "(9) : " << s << std::endl;
  }

  // (10) 指定したイテレータ範囲を、他のイテレータ文�範囲で置き換える
  {
    std::string s1 = "12345";
    std::string s2 = "abcde";

    s1.replace(s1.begin() + 1, s1.begin() + 3, s2.begin(), s2.end());

    std::cout << "(10) : " << s1 << std::endl;
  }

  // (11) 指定したイテレータ範囲を、文�の初期化�リストで置き換える
  {
    std::string s = "12345";

    s.replace(s.begin() + 1, s.begin() + 3, {'a', 'b', 'c', 'd', 'e'});

    std::cout << "(11) : " << s << std::endl;
  }

  // (12) 指定した範囲を、basic_string_viewが参照する文�列範囲で置き換える
  {
    std::string s1 = "12345";
    std::string_view sv2 = std::string_view{"XXXabcdeYYY"}.substr(3, 5);

    // 1番目から2文�を、sv2文�列で置き換える
    s1.replace(1, 2, sv2);

    std::cout << "(12) : " << s1 << std::endl;
  }

  // (13) 指定した範囲を、basic_string_viewの指定された範囲で置き換える
  {
    std::string s1 = "12345";
    std::string_view sv2 = "XXXabcdeYYY";

    // 1番目から2文�を、sv2文�列で置き換える
    s1.replace(1, 2, sv2, 3, 5);

    std::cout << "(13) : " << s1 << std::endl;
  }

  // (14) 指定したイテレータ範囲を、basic_string_viewが参照する文�列範囲で置き換える
  {
    std::string s1 = "12345";
    std::string_view sv2 = std::string_view{"XXXabcdeYYY"}.substr(3, 5);

    // 1番目から2文�を、sv2文�列で置き換える
    s1.replace(s1.begin() + 1, s1.begin() + 3, sv2);

    std::cout << "(14) : " << s1 << std::endl;
  }
}
```
* replace[color ff0000]
* begin()[link begin.md]
* end()[link end.md]

### 出力
```
(1) : 1abcde45
(2) : 1cde45
(3) : 1abc45
(4) : 1abcde45
(5) : 1xxx45
(6) : 1abcde45
(7) : 1abc45
(8) : 1abcde45
(9) : 1xxx45
(10) : 1abcde45
(11) : 1abcde45
(12) : 1abcde45
(13) : 1abcde45
(14) : 1abcde45
```


## 参照
- [N2679 Initializer Lists for Standard Containers(Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2679.pdf)
    - (11)の経緯となる提案文書
- [LWG ISsue 2268. Setting a default argument in the declaration of a member function `assign` of `std::basic_string`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2268)
    - C++14から(2)のオーバー�ードに、`n = npos`のデフォルト引数を追加。
- [P0254R2 Integrating `std::string_view` and `std::string`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0254r2.pdf)
