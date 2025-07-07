# insert
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
basic_string&
  insert(size_type pos1, const basic_string& str);    // (1) C++03
constexpr basic_string&
  insert(size_type pos1, const basic_string& str);    // (1) C++20

basic_string&
  insert(size_type pos1, const basic_string& str,
         size_type pos2, size_type n);                // (2) C++03
basic_string&
  insert(size_type pos1, const basic_string& str,
         size_type pos2, size_type n = npos);         // (2) C++14
constexpr basic_string&
  insert(size_type pos1, const basic_string& str,
         size_type pos2, size_type n = npos);         // (2) C++20

basic_string&
  insert(size_type pos, const charT* s, size_type n); // (3) C++03
constexpr basic_string&
  insert(size_type pos, const charT* s, size_type n); // (3) C++20

basic_string&
  insert(size_type pos, const charT* s);              // (4) C++03
constexpr basic_string&
  insert(size_type pos, const charT* s);              // (4) C++20

basic_string&
  insert(size_type pos, size_type n, charT c);        // (5) C++03
constexpr basic_string&
  insert(size_type pos, size_type n, charT c);        // (5) C++20

iterator insert(iterator p, charT c);                 // (6) C++03
iterator insert(const_iterator p, charT c);           // (6) C++11
constexpr iterator insert(const_iterator p, charT c); // (6) C++20

void insert(iterator p, size_type n, charT c);                     // (7) C++03
iterator insert(const_iterator p, size_type n, charT c);           // (7) C++11
constexpr iterator insert(const_iterator p, size_type n, charT c); // (7) C++20

template<class InputIterator>
void
  insert(iterator p,
         InputIterator first, InputIterator last); // (8) C++03
template<class InputIterator>
iterator
  insert(const_iterator p,
         InputIterator first, InputIterator last); // (8) C++11
template<class InputIterator>
constexpr iterator
  insert(const_iterator p,
         InputIterator first, InputIterator last); // (8) C++20

iterator
  insert(const_iterator p, initializer_list<charT>); // (9) C++11
constexpr iterator
  insert(const_iterator p, initializer_list<charT>); // (9) C++20

// string_viewを引数に取るオーバーロード
template<class T>
basic_string&
  insert(size_type pos1,
         const T& t);    // (10) C++17
template<class T>
constexpr basic_string&
  insert(size_type pos1,
         const T& t);    // (10) C++20

template<class T>
basic_string&
  insert(size_type pos1,
         const T& t,
         size_type pos2,
         size_type n = npos); // (11) C++17
template<class T>
constexpr basic_string&
  insert(size_type pos1,
         const T& t,
         size_type pos2,
         size_type n = npos); // (11) C++20
```
* initializer_list[link /reference/initializer_list/initializer_list.md]

## 概要
文字／文字列を挿入する。

## テンプレートパラメータ制約

- (10), (11) : 以下の両方を満たしていること
    - [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<const T&, `[`basic_string_view`](/reference/string_view/basic_string_view.md)`<charT, traits>> == true`
    - [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<const T&, const charT*> == false`

## 要件
- (1) : `pos <=` [`size()`](size.md)
- (2) : `pos1 <=` [`size()`](size.md)および`pos2 <= str.`[`size()`](size.md)
- (3) : 文字配列へのポインタ`s`が指す配列が少なくても`n`要素あり、`pos <=` [`size()`](size.md)であること。
- (4) : `pos <=` [`size()`](size.md)、および文字配列へのポインタ`s`が、少なくても[`traits::length`](/reference/string/char_traits/length.md)`(s) + 1`個の要素を指す配列を指していること。
- (6) : イテレータ`p`が、`*this`に対して有効であること。
- (7) : イテレータ`p`が、`*this`に対して有効であること。
- (8) : イテレータ`p`が、`*this`に対して有効であること。`[first, last)`が有効な範囲であること。


## 効果
- (1) : `insert(pos, str.`[`data()`](data.md)`, str.`[`size()`](size.md)`)`
- (2) :
	- `str.`[`size()`](size.md) `- pos2`と`n`のうち小さい方を`rlen`とする。`n == npos` の場合は、 `str.`[`size`](size.md)`() - pos2` が使用される。
	- `insert(pos1, str.`[`data()`](data.md) `+ pos2, rlen)`を呼び出す。
- (3) : `*this`の`pos`番目に、文字配列`s`の先頭`n`文字を挿入する。
- (4) : `insert(pos, s,` [`traits::length`](/reference/string/char_traits/length.md)`(s))`と等価の効果を持つ。
- (5) : `insert(pos, basic_string(n, c))`と等価の効果を持つ。
- (6) : イテレータ`p`が指す要素の前に、文字`c`のコピーを挿入する。
- (7) : イテレータ`p`が指す要素の前に、文字`c`のコピーを`n`個挿入する。
- (8) : `insert(p -` [`begin()`](begin.md)`, basic_string(first, last))`と等価の効果を持つ。
- (9) : `insert(p, il.`[`begin()`](/reference/initializer_list/initializer_list/begin.md)`, il.`[`end()`](/reference/initializer_list/initializer_list/end.md)`)`
- (10) : 以下と等価。
    ```cpp
    basic_string_view<charT, traits> sv = t;
    return insert(pos1, sv.data(), sv.size());
    ```

- (11) : 以下と等価。
    ```cpp
    basic_string_view<charT, traits> sv = t;
    return insert(pos1, sv.substr(pos2, n));
    ```
    * substr[link /reference/string_view/basic_string_view/substr.md]


## 戻り値
- (1) : `*this`
- (2) : `*this`
- (3) : `*this`
- (4) : `*this`
- (5) : `*this`
- (6) : 挿入された文字を指すイテレータを返す。
- (7) : 挿入された最初の文字を指すイテレータを返す。`n == 0`なら`p`を返す。
- (8) : 挿入された最初の文字を指すイテレータを返す。`first == last`なら`p`を返す。
- (10) : `*this`
- (11) : `*this`


## 例外
- (1) : `pos >` [`size()`](size.md)の場合、[`out_of_range`](/reference/stdexcept.md)例外を送出する。
- (2) : `pos1 >` [`size()`](size.md)もしくは`pos2 > str.`[`size()`](size.md)の場合、[`out_of_range`](/reference/stdexcept.md)例外を送出する。
- (3) : `pos >` [`size()`](size.md)の場合、[`out_of_range`](/reference/stdexcept.md)例外を送出する。また、[`size()`](size.md) `+ n >` [`max_size()`](max_size.md)の場合には[`length_error`](/reference/stdexcept.md)例外を送出する。
- (11) : `pos1 >` [`size()`](size.md)もしくは`pos2 > sv.`[`size()`](/reference/string_view/basic_string_view/size.md)の場合、[`out_of_range`](/reference/stdexcept.md)例外を送出する。


## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  // (1) 指定位置に文字列を挿入する
  {
    std::string s1 = "aaaaa";
    std::string s2 = "bbbbb";

    s1.insert(2, s2);

    std::cout << "(1) : " << s1 << std::endl;
  }

  // (2) 指定位置に、部分文字列を挿入する
  {
    std::string s1 = "aaaaa";
    std::string s2 = "12345";

    // s2.substr(2, 3)を挿入する
    s1.insert(2, s2, 2, 3);

    std::cout << "(2) : " << s1 << std::endl;
  }

  // (3) 指定位置に、文字配列の先頭N文字を挿入する
  {
    std::string s = "aaaaa";

    s.insert(2, "bbbbb", 3);

    std::cout << "(3) : " << s << std::endl;
  }

  // (4) 指定位置に文字配列を挿入する
  {
    std::string s = "aaaaa";

    s.insert(2, "bbbbb");

    std::cout << "(4) : " << s << std::endl;
  }

  // (5) 指定位置に、N個の文字を挿入する
  {
    std::string s = "aaaaa";

    s.insert(2, 3, 'b');

    std::cout << "(5) : " << s << std::endl;
  }

  // (6) 指定したイテレータが指す要素の前に、文字を挿入する
  {
    std::string s = "aaaaa";

    s.insert(s.begin(), 'b');

    std::cout << "(6) : " << s << std::endl;
  }

  // (7) 指定したイテレータが指す要素の前に、N個の文字を挿入する
  {
    std::string s = "aaaaa";

    s.insert(s.begin(), 3, 'b');

    std::cout << "(7) : " << s << std::endl;
  }

  // (8) 指定したイテレータが指す要素の前に、文字の範囲を挿入する
  {
    std::string s1 = "aaaaa";
    std::string s2 = "bbbbb";

    s1.insert(s1.begin(), s2.begin(), s2.end());

    std::cout << "(8) : " << s1 << std::endl;
  }

  // (9) 指定したイテレータが指す要素の前に、文字の初期化子リストを挿入する
  {
    std::string s = "aaaaa";

    s.insert(s.begin(), {'b', 'b', 'b', 'b', 'b'});

    std::cout << "(9) : " << s << std::endl;
  }

  // (10) 指定位置にbasic_string_viewが参照する文字列範囲を挿入する
  {
    std::string s1 = "aaaaa";
    std::string_view sv2 = std::string_view{"CCCbbbbbDDD"}.substr(3, 5);

    s1.insert(2, sv2);

    std::cout << "(10) : " << s1 << std::endl;
  }

  // (11) 指定位置に、basic_string_viewの指定された範囲を挿入する
  {
    std::string s1 = "aaaaa";
    std::string_view sv2 = "CCCbbbbbDDD";

    s1.insert(2, sv2, 3, 5);

    std::cout << "(11) : " << s1 << std::endl;
  }
}
```
* insert[color ff0000]
* begin()[link begin.md]
* end()[link end.md]

### 出力
```
(1) : aabbbbbaaa
(2) : aa345aaa
(3) : aabbbaaa
(4) : aabbbbbaaa
(5) : aabbbaaa
(6) : baaaaa
(7) : bbbaaaaa
(8) : bbbbbaaaaa
(9) : bbbbbaaaaa
(10) : aabbbbbaaa
(11) : aabbbbbaaa
```

## 参照
- [LWG Issue 180. Container member iterator arguments constness has unintended consequences](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#180)
- [LWG ISsue 2268. Setting a default argument in the declaration of a member function `assign` of `std::basic_string`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2268)
    - C++14から(2)のオーバーロードに、`n = npos`のデフォルト引数を追加。
- [P0254R2 Integrating `std::string_view` and `std::string`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0254r2.pdf)
- [LWG Issue 2758. `std::string{}.assign("ABCDE", 0, 1)` is ambiguous](https://wg21.cmeerw.net/lwg/issue2758)
- [LWG Issue 2946. LWG 2758's resolution missed further corrections](https://wg21.cmeerw.net/lwg/issue2946)
    - 意図しない暗黙変換防止のために`string_view`を受けるオーバーロード(10), (11)の引数型を`const T&`に変更
- [P0980R1 Making `std::string` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0980r1.pdf)
