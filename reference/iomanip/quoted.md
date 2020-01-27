# quoted
* iomanip[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp14[meta cpp]

```cpp
namespace std {
  template <class CharT>
  unspecified quoted(const CharT* s,
                     CharT delim=CharT('"'),
                     CharT escape=CharT('\\'));                       // (1)

  template <class CharT, class Traits, class Allocator>
  unspecified quoted(const std::basic_string<CharT, Traits, Allocator>& s,
                     CharT delim=CharT('"'),
                     CharT escape=CharT('\\'));                       // (2)

  template <class CharT, class Traits>
  unspecified quoted(std::basic_string_view<CharT, Traits> s,
                     CharT delim = CharT('"'),
                     CharT escape = CharT('\\'));                     // (3) C++17

  template <class CharT, class Traits, class Allocator>
  unspecified quoted(std::basic_string<CharT, Traits, Allocator>& s,
                     CharT delim=CharT('"'),
                     CharT escape=CharT('\\'));                       // (4)
}
```
* unspecified[italic]

## 概要
囲み文�指定で入出力する。

このマニピュレータを使用して`cout << quoted("hello");`とすると、「`"hello"`」のように、引用符で囲まれた文�列が出力される。逆に、引用符で囲まれた文�列を`cin >> quoted(s);`のように入力すると、引用符が外された文�列を取得できる。

このような囲み文�を指定しての入出力は、たとえばXMLの属性や、CSVのフィールドで使用する。

- (1) : 出力用のオーバー�ード。文�配列を、囲み文�で修飾する。
- (2) : 出力用のオーバー�ード。[`std::basic_string`](/reference/string/basic_string.md)型の文�列を、囲み文�で修飾する。
- (3) : 出力用のオーバー�ード。[`std::basic_string_view`](/reference/string_view/basic_string_view.md)型の文�列を、囲み文�で修飾する。
- (4) : 入力用のオーバー�ード。囲み文�で修飾された入力から、囲まれている文�列を抽出する。


## 効果
- (1), (2), (3) : この関数で返された結果を出力ストリームに渡すと、以下のシーケンスが出力される。出力ストリームは、そのシーケンスに対して書式を適用する。
    1. `delim`を出力する。
    2. `s`の各要素を出力する。それら要素が`delim`もしくは`escape`と�しい場合、要素の前に`escape`を出力する。
        - 文�の�値比較には、[`std::char_traits<CharT>::eq()`](/reference/string/char_traits/eq.md)を使用する。
    3. `delim`を出力する。
- (4) : この関数で返された結果を入力ストリームに渡すと、以下のように入力される。
    - 開始の文�が、[`std::char_traits<CharT>::eq()`](/reference/string/char_traits/eq.md)関数で比較して`delim`と�価である場合、
        1. `skipws`フラグをオフにする。
        2. [`s.clear()`](/reference/string/basic_string/clear.md)を呼び出す。
        3. エスケープされない`delim`が�み込まれるか、ストリームが終端に達するまで、`s`に1文�ずつ�み込まれ追加される(`escape`文�以外)。
        4. 最後の`delim`が破棄される。
        5. `skipws`フラグを、元の値に戻す。
    - そうでない場合、`istream >> s`で�み込みが行われる。
    - この関数で返された結果を出力ストリームに渡した場合は、(2)の動作となる。


## 例
```cpp example
#include <iostream>
#include <sstream>
#include <string_view>
#include <iomanip>

int main()
{
  // (1) : ダブルクォーテーションで文�列を囲んで出力する
  {
    std::stringstream ss;
    ss << std::quoted("hello");
    std::cout << "(1) : " << ss.str() << std::endl;
  }

  // (2) : std::basic_string文�列をシングルクォーテーションで囲んで出力する
  {
    std::string s = "hello";

    std::stringstream ss;
    ss << std::quoted(s, '\'');
    std::cout << "(2) : " << ss.str() << std::endl;
  }

  // (3) : std::basic_string_view文�列を、ダブルクォーテーションで囲んで出力する
  {
    std::string_view sv = "hello";

    std::stringstream ss;
    ss << std::quoted(sv);
    std::cout << "(3) : " << ss.str() << std::endl;
  }

  // (4) : ダブルクォーテーションで囲まれた文�列を抽出する
  {
    std::stringstream ss;
    ss << "\"hello\"";

    std::string input;
    ss >> std::quoted(input);
    std::cout << "(4) : " << input << std::endl;
  }

  // (4) : ダブルクォーテーションで囲まれていない文�列も�み込める
  {
    std::stringstream ss;
    ss << "hello";

    std::string input;
    ss >> std::quoted(input);
    std::cout << "(4)-2 : " << input << std::endl;
  }
}
```
* std::quoted[color ff0000]
* std::stringstream[link /reference/sstream/basic_stringstream.md.nolink]

## 出力
```
(1) : "hello"
(2) : 'hello'
(3) : "hello"
(4) : hello
(4)-2 : hello
```


## バージョン
### 言語
- C++14

### 処理系
- [Clang](/implementation.md#clang): 3.4
- [GCC](/implementation.md#gcc): 4.9
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [N3654 Quoted Strings Library Proposal (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3654.html)
- [LWG Issue 2272. `quoted` should use `char_traits::eq` for character comparison](https://wg21.cmeerw.net/lwg/issue2272)
- [LWG Issue 2344. `quoted()`'s interaction with padding is unclear](https://wg21.cmeerw.net/lwg/issue2344)
- [LWG Issue 2785. `quoted` should work with `basic_string_view`](https://wg21.cmeerw.net/lwg/issue2785)
