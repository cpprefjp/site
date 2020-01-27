# 生文�列リテラル
* cpp11[meta cpp]

## 概要
`R`プレフィックスを付けた文�列リテラル内の丸カッコ`( )`で囲まれた部分は、エスケープシーケンスが無視される。この機能を「生文�列リテラル (Raw string literals)」という。

たとえばJSON形式でデータを記述する場合、通常の文�列リテラルでは以下のように書くことになる：

```cpp
std::string json = "{\"user_id\": 123, \"name\": \"Alice\"}";
```

文�列リテラル内にダブルクォーテーションを入力するために、多くのエスケープ文�`\`が必要となっている。このような状況で生文�列リテラルを使用することで、エスケープ文�をなくし、以下のように書ける：

```cpp
std::string json = R"({"user_id": 123, "name": "Alice"})";
```

この機能は、�規表現を書く場合、ファイルパスをコード�に記述するような場合にも役立つ。

そのほか、改行を含む文章を文�列リテラルで記述する場合にも、生文�列リテラルは使用できる：

```cpp example
#include <iostream>
#include <string>

int main()
{
  std::string text = R"(begin
a,
b,
c
end)";

  std::cout << text << std::endl;
}
```

出力：

```
begin
a,
b,
c
end
```

生文�列リテラルの範囲内では、改行をすることでエスケープ文�`'\n'`に変換される。


## 仕様
生文�列リテラルは、以下の構文を持つ：

```
encoding-prefix R"d-char-sequence opt (r-char-sequence opt) d-char-sequence opt"
```
* opt[italic]

encoding-prefixとは、`u8`、`u`、`U`、`L`といった、文�列リテラルの文�エンコードを指定するプレフィックス。たとえば、UTF-8の生文�列リテラルは、`u8R"(hello)"`のように書く。

文�列�の丸カッコのなか`r-char-sequence`には、エスケープシーケンスを無視する文�列リテラルを書く。丸カッコのなかは省略可能。

丸カッコの前後`d-char-sequence`には、生文�列の範囲を明確にするための文�列を指定する。これは前後で同じ文�列を指定する必要がある。これは、文�列リテラルのなかにダブルクォーテーションや閉じ丸カッコが指定されるような状況で必要となる：

```cpp example
#include <iostream>
#include <string>

int main()
{
  std::string s = R"***(文�列�に生文�列リテラルの閉じカッコと閉じダブルクォーテーションを書く)")***";
  std::cout << s << std::endl;
}
```

出力：

```
文�列�に生文�列リテラルの閉じカッコと閉じダブルクォーテーションを書く)"
```

ここで、生文�列リテラルの範囲を単なる丸カッコではなく、ユーザーがカッコの形を指定できれば、すなわち`***(`を開きカッコ、`)***`を閉じカッコ、のように指定できれば、文�列リテラルのなかに単純な閉じ丸カッコが指定されたとしても、それが生文�列リテラルの範囲終了とは見なされなくなる。

生文�列リテラルの内容である`r-char-sequence`には、「`')'` + `d-char-sequence`で指定された文�列 + `"`」の組み合わせは使用できない。

生文�列リテラルの範囲をユーザーが規定するための`d-char-sequence`は16文�以下で、各文�は基本ソース文�集合のうち次の文�を除いたものが使用できる：スペース `' '`、左丸カッコ `'('`、右丸カッコ `')'`、バックスラッシュ `'\\'`に加えて、水平タブ `'\t'`、垂直タブ `'\v'`、改ページ `'\f'`、改行`'\n'`の制御文�。


生文�列リテラルの内容である`r-char-sequence`の要素として改行が入力された場合、それは改行の制御文�`'\n'`に変換される。


## 例
### JSON文�列を構築する
```cpp example
#include <iostream>
#include <cstdio>
#include <string>
#include <sstream>

// 文�列のフォーマット関数
// not thread-safe, スレッドセーフな実装ではないので注意
// Boost.Formatやcppformatを使用することを推奨
template <class... Args>
std::string format(const char* fmt, Args&&... args)
{
  std::streambuf* backup = std::cout.rdbuf();
  std::stringstream sout;
  std::streambuf* soutbuf = sout.rdbuf();
  std::cout.rdbuf(soutbuf);

  std::fprintf(stdout, fmt, args...);

  std::string result = sout.str();

  std::cout.rdbuf(backup);
  return result;
}

int main()
{
  int user_id = 123;
  std::string name = "Alice";
  std::string json = format(R"({"user_id": %d, "name": "%s"})", user_id, name.c_str());

  std::cout << json << std::endl;
}
```
* c_str()[link /reference/string/basic_string/c_str.md]
* std::streambuf[link /reference/streambuf/basic_streambuf.md]
* rdbuf[link /reference/ios/basic_ios/rdbuf.md]
* std::stringstream[link /reference/sstream/basic_stringstream.md.nolink]
* str()[link /reference/sstream/basic_stringstream/str.md.nolink]
* std::fprintf[link /reference/cstdio/fprintf.md.nolink]
* Boost.Format[link http://www.boost.org/libs/format]
* cppformat[link https://github.com/cppformat/cppformat]

#### 出力
```
{"user_id": 123, "name": "Alice"}
```


### ファイルパスを入力する
```cpp example
#include <iostream>
#include <string>

int main()
{
  // バックスラッシュ区切りになっているWindowsのファイルパスを入力
  std::string path = R"(C:\language\cpp\main.cpp)";
  std::cout << path << std::endl;
}
```

#### 出力
```
C:\language\cpp\main.cpp
```


### バックスラッシュを含む�規表現を入力する
```cpp example
#include <iostream>
#include <regex>
#include <string>

int main()
{
  // 「英数�、バックスラッシュ、英数�」の順に
  // なっていることを要求する�規表現。
  // 生文�列リテラルを使わない場合は"\\w\\\\\\w"となる。
  std::regex rex(R"(\w\\\w)");

  std::string input = R"(a\b)";
  if (std::regex_match(input, rex)) {
    std::cout << "matched" << std::endl;
  }
  else {
    std::cout << "not matched" << std::endl;
  }
}
```
* std::regex[link /reference/regex/basic_regex.md]
* std::regex_match[link /reference/regex/regex_match.md]

#### 出力
```
matched
```


### 雛形のHTMLを処理する
```cpp example
#include <fstream>
#include <string>
#include <regex>

// 雛形のHTMLを用意して、その一部の要素を文�列置換によってプ�グラムから入力する。
//
// 雛形のHTMLを事前にファイルとして作成し、それをあとからプ�グラムに文�列リテラルとして
// 貼り付ける。その際、生文�列リテラルを使用することで、改行文�やバックスラッシュを
// 加工することなくそのまま扱える。
const std::string html_template = u8R"(<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
  <title>$title$</title>
</head>
<body>
  <p>$body$</p>
</body>
</html>)";

int main()
{
  std::string html = html_template;

  html = std::regex_replace(html, std::regex(u8R"(\$title\$)"), u8"タイトル");
  html = std::regex_replace(html, std::regex(u8R"(\$body\$)"), u8"ボディ");

  std::ofstream file("index.html");
  file.write(html.data(), html.size());
}
```
* std::regex[link /reference/regex/basic_regex.md]
* std::regex_replace[link /reference/regex/regex_replace.md]
* std::ofstream[link /reference/fstream/basic_ofstream.md]
* file.write[link /reference/ostream/basic_ostream/write.md]
* html.data()[link /reference/string/basic_string/data.md]
* html.size()[link /reference/string/basic_string/size.md]

#### 出力(index.html)
```
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
  <title>タイトル</title>
</head>
<body>
  <p>ボディ</p>
</body>
</html>
```


## この機能が必要になった背景・経緯
生文�列リテラルが提案された2006年当時にはすでに、HTMLやXMLといったマークアップ言語や�規表現を、C++で処理することが多かった。それらの言語では、バックスラッシュや引用符が多用されるため、文�列リテラルとしてそれらを�しく入力するのが困難だった。

Perl、Python、Luaやその他の言語ではこの問題に対応するために、通常の文�列リテラルに加えて、生文�列リテラル(raw string literals)を持っている。それは単純にエスケープシーケンスを無視するという機能で、多くの言語で受け入れられてきた。

こういった経緯から、C++にも生文�列リテラルが提案された。


## 検討されたほかの選択肢
プレフィックスの`R`は、最初に提案された頃から変わっていない。これは「Raw」を意味する。

生文�列リテラル内にユニバーサル�ャラクタ名を入力できるようにして、それだけはエスケープを無視せずに変換する案があったが、バグの元となるために却下された。


## 参照
- [N2053 Raw String Literals](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n2053.html)
- [N2146 Raw String Literals (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2146.html)
- [N2295 Raw and Unicode String Literals; Unified Proposal](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2295.html)
- [N2384 Raw and Unicode String Literals; Unified Proposal (Rev. 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2384.html)
- [N2442 Raw and Unicode String Literals; Unified Proposal (Rev. 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2442.htm)
- [N3077 Alternative approach to Raw String issues](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3077.html)

