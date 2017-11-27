# quoted
* iomanip[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp14[meta cpp]

```cpp
namespace std {
  template <class CharT>
  unspecified quoted(const CharT* s,
                     CharT delim=CharT('"'),
                     CharT escape=CharT('\\'));                       // (1)

  template <class CharT, class Traits, class Allocator>
  unspecified quoted(const basic_string<CharT, Traits, Allocator>& s,
                     CharT delim=CharT('"'),
                     CharT escape=CharT('\\'));                       // (2)

  template <class CharT, class Traits, class Allocator>
  unspecified quoted(basic_string<CharT, Traits, Allocator>& s,
                     CharT delim=CharT('"'),
                     CharT escape=CharT('\\'));                       // (3)
}
```
* unspecified[italic]
* basic_string[link /reference/string/basic_string.md]

## 概要
囲み文字指定で入出力する。

このマニピュレータを使用して`cout << quoted("hello");`とすると、「`"hello"`」のように、引用符で囲まれた文字列が出力される。逆に、引用符で囲まれた文字列を`cin >> quoted(s);`のように入力すると、引用符が外された文字列を取得できる。

このような囲み文字を指定しての入出力は、たとえばXMLの属性や、CSVのフィールドで使用する。

- (1) : 出力用のオーバーロード。文字配列を、囲み文字で修飾する。
- (2) : 出力用のオーバーロード。`basic_string`型の文字列を、囲み文字で修飾する。
- (3) : 入力用のオーバーロード。囲み文字で修飾された入力から、囲まれている文字列を抽出する。


## 効果
- (1), (2) : この関数で返された結果を出力ストリームに渡すと、以下のシーケンスが出力される。出力ストリームは、そのシーケンスに対して書式を適用する。
    1. `delim`を出力する。
    2. `s`の各要素を出力する。それら要素が`delim`もしくは`escape`と等しい場合、要素の前に`escape`を出力する。
        - 文字の等値比較には、[`std::char_traits<CharT>::eq()`](/reference/string/char_traits/eq.md)を使用する。
    3. `delim`を出力する。
- (3) : この関数で返された結果を入力ストリームに渡すと、以下のように入力される。
    - 開始の文字が、[`std::char_traits<CharT>::eq()`](/reference/string/char_traits/eq.md)関数で比較して`delim`と等価である場合、
        1. `skipws`フラグをオフにする。
        2. [`s.clear()`](/reference/string/basic_string/clear.md)を呼び出す。
        3. エスケープされない`delim`が読み込まれるか、ストリームが終端に達するまで、`s`に1文字ずつ読み込まれ追加される(`escape`文字以外)。
        4. 最後の`delim`が破棄される。
        5. `skipws`フラグを、元の値に戻す。
    - そうでない場合、`istream >> s`で読み込みが行われる。
    - この関数で返された結果を出力ストリームに渡した場合は、(2)の動作となる。


## 例
```cpp example
#include <iostream>
#include <sstream>
#include <iomanip>

int main()
{
  std::stringstream ss;

  // (1), (2) : ダブルクォーテーションで文字列を囲んで出力する
  ss << std::quoted("hello");
  std::cout << ss.str() << std::endl;

  // (3) : ダブルクォーテーションで囲まれた文字列を抽出する
  std::string input;
  ss >> std::quoted(input);
  std::cout << input << std::endl;
}
```
* std::quoted[color ff0000]
* std::stringstream[link /reference/sstream/basic_stringstream.md.nolink]

## 出力
```
"hello"
hello
```


## バージョン
### 言語
- C++14

### 処理系
- [Clang, C++14 mode](/implementation.md#clang): 3.4
- [GCC, C++14 mode](/implementation.md#gcc): 4.9
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [N3654 Quoted Strings Library Proposal (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3654.html)
- [LWG Issue 2272. `quoted` should use `char_traits::eq` for character comparison](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2272)
- [LWG Issue 2344. `quoted()`'s interaction with padding is unclear](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2344)

