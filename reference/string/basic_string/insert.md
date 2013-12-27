#insert
```cpp
basic_string& insert(size_type pos1, const basic_string& str);    // (1)
basic_string& insert(size_type pos1, const basic_string& str,
                     size_type pos2, size_type n);                // (2)
basic_string& insert(size_type pos, const charT* s, size_type n); // (3)
basic_string& insert(size_type pos, const charT* s);              // (4)
basic_string& insert(size_type pos, size_type n, charT c);        // (5)

iterator insert(iterator p, charT c);                             // (6) C++03まで
iterator insert(const_iterator p, charT c);                       // (6) C++11から

iterator insert(iterator p, size_type n, charT c);                // (7) C++03まで
iterator insert(const_iterator p, size_type n, charT c);          // (7) C++11から

template<class InputIterator>
iterator insert(iterator p,
                InputIterator first, InputIterator last);         // (8) C++03まで
template<class InputIterator>
iterator insert(const_iterator p,
                InputIterator first, InputIterator last);         // (8) C++11から

iterator insert(const_iterator p, initializer_list<charT>);       // (9) C++11から
```
* initializer_list[link /reference/initializer_list.md]

##概要
文字／文字列を挿入する。


##要件
- (1) : `pos <=` [`size()`](./size.md)
- (2) : `pos1 <=` [`size()`](./size.md)および`pos2 <= str.`[`size()`](./size.md)
- (3) : 文字配列へのポインタ`s`が指す配列が少なくても`n`要素あり、`pos <=` [`size()`](./size.md)であること。
- (4) : `pos <=` [`size()`](./size.md)、および文字配列へのポインタ`s`が、少なくても[`traits::length`](/reference/string/char_traits/length.md)`(s) + 1`個の要素を指す配列を指していること。
- (6) : イテレータ`p`が、`*this`に対して有効であること。
- (7) : イテレータ`p`が、`*this`に対して有効であること。
- (8) : イテレータ`p`が、`*this`に対して有効であること。`[first, last)`が有効な範囲であること。


##効果
- (1) : `insert(pos, str.`[`data()`](./data.md)`, str.`[`size()`](./size.md)`)`
- (2) : `str.`[`size()`](./size.md) `- pos2`と`n`のうち小さい方を`rlen`とし、`insert(pos1, str.`[`data()`](./data.md) `+ pos2, rlen)`を呼び出す。
- (3) : `*this`の`pos`番目に、文字配列`s`の先頭`n`文字を挿入する。
- (4) : `insert(pos, s,` [`traits::length`](/reference/string/char_traits/length.md)`(s))`と同じ効果を持つ。
- (5) : `insert(pos, basic_string(n, c))`と同じ効果を持つ。
- (6) : イテレータ`p`が指す要素の前に、文字`c`のコピーを挿入する。
- (7) : イテレータ`p`が指す要素の前に、文字`c`のコピーを`n`個挿入する。
- (8) : `insert(p -` [`begin()`](./begin.md)`, basic_string(first, last))`と同じ効果を持つ。
- (9) : `insert(p, il.`[`begin()`](/reference/initializer_list/begin.md)`, il.`[`end()`](/reference/initializer_list/end.md)`)`


##戻り値
- (1) : `*this`
- (2) : `*this`
- (3) : `*this`
- (4) : `*this`
- (5) : `*this`
- (6) : 挿入された文字を指すイテレータを返す。
- (7) : 挿入された最初の文字を指すイテレータを返す。`n == 0`なら`p`を返す。
- (8) : 挿入された最初の文字を指すイテレータを返す。`first == last`なら`p`を返す。


##例外
- (1) : `pos >` [`size()`](./size.md)の場合、[`out_of_range`](/reference/stdexcept.md)例外を送出する。
- (2) : `pos1 >` [`size()`](./size.md)もしくは`pos2 > str.`[`size()`](./size.md)の場合、[`out_of_range`](/reference/stdexcept.md)例外を送出する。
- (3) : `pos >` [`size()`](./size.md)の場合、[`out_of_range`](/reference/stdexcept.md)例外を送出する。また、[`size()`](./size.md) `+ n >` [`max_size()`](./max_size.md)の場合には[`length_error`](/reference/stdexcept.md)例外を送出する。


##例
```cpp
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
}
```

###出力
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
```

##参照

