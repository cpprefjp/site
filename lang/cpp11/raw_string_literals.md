#生文字列リテラル
* cpp11[meta cpp]

##概要
`R`プレフィックスを付けた文字列リテラル内の丸カッコ`( )`で囲まれた部分は、エスケープシーケンスが無視される。この機能を「生文字列リテラル (Raw string literals)」という。

たとえばJSON形式でデータを記述する場合、通常の文字列リテラルでは以下のように書くことになる：

```cpp
std::string json = "{\"user_id\": 123, \"name\": \"Alice\"}";
```

文字列リテラル内にダブルクォーテーションを入力するために、多くのエスケープ文字`\`が必要となっている。このような状況で生文字列リテラルを使用することで、エスケープ文字をなくし、以下のように書ける：

```cpp
std::string json = R"({"user_id": 123, "name": "Alice"})";
```

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


##参照
- [N2053 Raw String Literals](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n2053.html)
- [N2146 Raw String Literals (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2146.html)
- [N2295 Raw and Unicode String Literals; Unified Proposal](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2295.html)
- [N2384 Raw and Unicode String Literals; Unified Proposal (Rev. 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2384.html)
- [N2442 Raw and Unicode String Literals; Unified Proposal (Rev. 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2442.htm)
- [N3077 Alternative approach to Raw String issues](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3077.html)

