#get
```cpp
// 文字
int_type get();
basic_istream<CharT, Traits>& get(char_type c);

// 文字列
basic_istream<CharT, Traits>& get(char_type* s, streamsize n);
basic_istream<CharT, Traits>& get(char_type* s, streamsize n, char_type delim);
basic_istream<CharT, Traits>& get(basic_streambuf<char_type, Traits>* sb);
basic_istream<CharT, Traits>& get(basic_streambuf<char_type, Traits>* sb, char_type delim);
```

##概要

（非書式化入力関数）ストリームから文字または文字列を入力する。

##効果

##戻り値

##例
TBD

##出力
TBD

##実装例
TBD

##バージョン
###言語
- C++98

##参照
