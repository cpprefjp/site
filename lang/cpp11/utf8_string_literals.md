#UTF-8文字列リテラル
* cpp11[meta cpp]

##概要
`char`の文字列リテラルに`u8`プレフィックスを付けることで、その文字列リテラルはUCS/Unicode文字コードのUTF-8符号化形式にエンコードされる。

```cpp
// 変数sには、UTF-8エンコーディングされた「あいうえお」という文字列が代入される
char s[] = u8"あいうえお";

// 文字列中にユニバーサルキャラクタ名を直接入力できる。
// \uからはじめて4桁、もしくは\Uからはじめて8桁がユニバーサルキャラクタ名として扱われる。
char t[] = u8"\U00020BB7野家"; // 𠮷野家
```

`u8`プレフィックスを指定しない場合は、実装定義のマルチバイト文字コードにエンコードされる。その実装定義の文字コードは、ASCII文字コードと互換があることは保証されない。そのため、UTF-8のASCII互換部分が、実装定義の文字コードと互換があることも、保証されない。


##仕様
- 文字列リテラルに`u8`プレフィックスを付けることで、UTF-8にエンコードされた`char`型の配列に初期化される。
- UTF-8の文字列リテラルとワイド文字列リテラルが隣接していた場合、文字列は連結されずに、プログラムは不適格となる。

    ```cpp
wchar_t ws[] = "hello" L" world";     // OK : L"hello world"
//wchar_t ws[] = u8"hello" L" world"; // コンパイルエラー！
```

- 文字列リテラルのなかには、UCS／Unicodeのユニバーサルキャラクタ名を直接記述できる。たとえば、UTF-8文字列リテラル`u8"\u215A"`は[U+215A](http://www.charbase.com/215a-unicode-vulgar-fraction-five-sixths)コードポイントを含む文字列である`"⅚"` (VULGAR FRACTION FIVE SIXTHS) を表す。`\u`の場合は16進数で4桁固定のユニバーサルキャラクタ名を、`\U`の場合は16進数で8桁固定のユニバーサルキャラクタ名を記述する。
- 文字リテラルに`u8`プレフィックスは使用できない。


##備考
C++11時点での標準ライブラリでは、文字列と整数の変換を行う関数、および入出力の機能は、UTF-8に対応していない。そのため、システムのマルチバイト文字コードに変換する必要がある。たとえば、コンソール、ターミナル、コマンドプロンプトといった標準出力の出力先にUTF-8で直接出力できない場合には、出力可能な文字コードに変換する必要がある。そのシステムのマルチバイト文字コードがUTF-8であれば、変換の必要はない。


##例
```cpp
#include <iostream>
#include <string>

int main()
{
  std::string s = u8"あいうえお";

  // バイト数を取得
  // UTF-8のため、ひとつのコードポイント(≒文字)のバイト数は固定ではない
  std::size_t byte_size = s.size();

  std::cout << byte_size << std::endl;
}
```
* std::string[link /reference/string/basic_string.md]
* s.size()[link /reference/string/basic_string/size.md]
* std::size_t[link /reference/cstddef/size_t.md]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]

###出力
```
15
```


##関連項目
- [C++11 `char16_t`と`char32_t`](char16_32.md)


##参照
- [N2159 UTF-8 String Literals](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2159.html)
- [N2209 UTF-8 String Literals](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2209.html)
- [N2295 Raw and Unicode String Literals; Unified Proposal](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2295.html)

