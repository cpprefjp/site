#生文字列リテラル
* cpp11[meta cpp]

##概要
`R`プレフィックスを付けた文字列リテラル内の丸カッコ`( )`で囲まれた部分は、エスケープシーケンスが無視される。この機能を「生文字列リテラル (Raw string literals)」という。

たとえばJSON形式でデータを記述する場合、通常の文字列リテラルでは以下のように書くことになる：

```cpp
std::string json = "{\"user_id\": 123, \"name\": \"Alice\"}";
```
* std::string[link /reference/string/basic_string.md]

文字列リテラル内にダブルクォーテーションを入力するために、多くのエスケープ文字`\`が必要となっている。このような状況で生文字列リテラルを使用することで、エスケープ文字をなくし、以下のように書ける：

```cpp
std::string json = R"({"user_id": 123, "name": "Alice"})";
```
* std::string[link /reference/string/basic_string.md]

この機能は、正規表現を書く場合、ファイルパスをコード中に記述するような場合にも役立つ。

そのほか、改行を含む文章を文字列リテラルで記述する場合にも、生文字列リテラルは使用できる：

```cpp
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
* std::string[link /reference/string/basic_string.md]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]

出力：

```
begin
a,
b,
c
end
```

生文字列リテラルの範囲内では、改行をすることでエスケープ文字`'\n'`に変換される。


##仕様
生文字列リテラルは、以下の構文を持つ：

```
encoding-prefix R"d-char-sequence opt (r-char-sequence opt) d-char-sequence opt"
```
* opt[italic]

encoding-prefixとは、`u8`、`u`、`U`、`L`といった、文字列リテラルの文字エンコードを指定するプレフィックス。たとえば、UTF-8の生文字列リテラルは、`u8R"(hello)"`のように書く。

文字列中の丸カッコのなか`r-char-sequence`には、エスケープシーケンスを無視する文字列リテラルを書く。丸カッコのなかは省略可能。

丸カッコの前後`d-char-sequence`には、生文字列の範囲を明確にするための文字列を指定する。これは前後で同じ文字列を指定する必要がある。これは、文字列リテラルのなかにダブルクォーテーションや閉じ丸カッコが指定されるような状況で必要となる：

```cpp
#include <iostream>
#include <string>

int main()
{
  std::string s = R"***(文字列中に生文字列リテラルの閉じカッコと閉じダブルクォーテーションを書く)")***";
  std::cout << s << std::endl;
}
```
* std::string[link /reference/string/basic_string.md]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]

出力：

```
文字列中に生文字列リテラルの閉じカッコと閉じダブルクォーテーションを書く)"
```

ここで、生文字列リテラルの範囲を単なる丸カッコではなく、ユーザーがカッコの形を指定できれば、すなわち`***(`を開きカッコ、`)***`を閉じカッコ、のように指定できれば、文字列リテラルのなかに単純な閉じ丸カッコが指定されたとしても、それが生文字列リテラルの範囲終了とは見なされなくなる。

生文字列リテラルの内容である`r-char-sequence`には、「`')'` + `d-char-sequence`で指定された文字列 + `"`」の組み合わせは使用できない。

生文字列リテラルの範囲をユーザーが規定するための`d-char-sequence`の各文字には、以下の文字は使用できない： スペース `' '`、左丸カッコ `'('`、右丸カッコ `')'`、バックスラッシュ `\`に加えて、水平タブ `'\t'`、垂直タブ `'\v'`、改ページ `'\f'`、改行`'\n'`の制御文字。


生文字列リテラルの内容である`r-char-sequence`の要素として改行が入力された場合、それは改行の制御文字`'\n'`に変換される。


##例
```cpp
```

###出力
```


##参照
- [N2053 Raw String Literals](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n2053.html)
- [N2146 Raw String Literals (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2146.html)
- [N2295 Raw and Unicode String Literals; Unified Proposal](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2295.html)
- [N2384 Raw and Unicode String Literals; Unified Proposal (Rev. 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2384.html)
- [N2442 Raw and Unicode String Literals; Unified Proposal (Rev. 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2442.htm)
- [N3077 Alternative approach to Raw String issues](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3077.html)

