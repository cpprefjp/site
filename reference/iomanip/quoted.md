#quoted (C++14)
* iomanip[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  template <class CharT>
  unspecified quoted(const CharT* s, CharT delim=CharT('"'), CharT escape=CharT('\\'));

  template <class CharT, class Traits, class Allocator>
  unspecified quoted(const basic_string<CharT, Traits, Allocator>& s,
                     CharT delim=CharT('"'), CharT escape=CharT('\\'));

  template <class CharT, class Traits, class Allocator>
  unspecified quoted(basic_string<CharT, Traits, Allocator>& s,
                     CharT delim=CharT('"'), CharT escape=CharT('\\'));
}
```
* unspecified[italic]
* basic_string[link /reference/string/basic_string.md]

##概要
囲み文字指定で入出力する。

このマニピュレータを使用して`cout << quoted("hello");`とすると、「`"hello"`」のように、引用符で囲まれた文字列が出力される。逆に、引用符で囲まれた文字列を`cin >> quoted(s);`のように入力すると、引用符が外された文字列を取得できる。

このような囲み文字を指定しての入出力は、たとえばXMLの属性や、CSVのフィールドで使用する。


##例
```cpp
```

##出力
```
```


##バージョン
###言語
- C++14

###処理系
- [Clang, C++14 mode](/implementation.md#clang): ??
- [GCC, C++14 mode](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


##参照
- [N3654 Quoted Strings Library Proposal (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3654.html)
- [LWG Issue 2272. `quoted` should use `char_traits::eq` for character comparison](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2272)
- [LWG Issue 2344. `quoted()`'s interaction with padding is unclear](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2344)

