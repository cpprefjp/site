# UTF-8文�列リテラル
* cpp11[meta cpp]

## 概要
`char`の文�列リテラルに`u8`プレフィックスを付けることで、その文�列リテラルはUCS/Unicode文�コードのUTF-8符号化形式にエンコードされる。

```cpp
// 変数sには、UTF-8エンコーディングされた「あいうえお」という文�列が代入される
char s[] = u8"あいうえお";

// 文�列�にユニバーサル�ャラクタ名を直接入力できる。
// \uからはじめて4桁、もしくは\Uからはじめて8桁がユニバーサル�ャラクタ名として扱われる。
char t[] = u8"\U00020BB7野家"; // 𠮷野家
```

`u8`プレフィックスを指定しない場合は、実装定義のマルチバイト文�コードにエンコードされる。その実装定義の文�コードは、ASCII文�コードと互換があることは保証されない。そのため、UTF-8のASCII互換部分が、実装定義の文�コードと互換があることも、保証されない。


## 仕様
- 文�列リテラルに`u8`プレフィックスを付けることで、UTF-8にエンコードされた`char`型の配列に初期化される。
- UTF-8の文�列リテラルとワイド文�列リテラルが隣接していた場合、文�列は連結されずに、プ�グラムは不適格となる。

    ```cpp
    wchar_t ws[] = "hello" L" world";     // OK : L"hello world"
    //wchar_t ws[] = u8"hello" L" world"; // コンパイルエラー！
    ```

- 文�列リテラルのなかには、UCS／Unicodeのユニバーサル�ャラクタ名を直接記述できる。たとえば、UTF-8文�列リテラル`u8"\u215A"`は[U+215A](http://www.charbase.com/215a-unicode-vulgar-fraction-five-sixths)コードポイントを含む文�列である`"⅚"` (VULGAR FRACTION FIVE SIXTHS) を表す。`\u`の場合は16進数で4桁固定のユニバーサル�ャラクタ名を、`\U`の場合は16進数で8桁固定のユニバーサル�ャラクタ名を記述する。
- 文�リテラルに`u8`プレフィックスは使用できない。


### 参照するUCSの規格
C++11時点の規格では、UCS (Universal Coded Character Set) の規格としてISO/IEC 10646-1:1993を参照する。


## 備考
C++11時点での標準ライブラリでは、文�列と整数の変換を行う関数、および入出力の機能は、UTF-8に対応していない。そのため、システムのマルチバイト文�コードに変換する必要がある。たとえば、コンソール、ターミナル、コマンドプ�ンプトといった標準出力の出力先にUTF-8で直接出力できない場合には、出力可能な文�コードに変換する必要がある。そのシステムのマルチバイト文�コードがUTF-8であれば、変換の必要はない。


## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  std::string s = u8"あいうえお";

  // バイト数を取得
  // UTF-8のため、ひとつのコードポイント(≒文�)のバイト数は固定ではない
  std::size_t byte_size = s.size();

  std::cout << byte_size << std::endl;
}
```
* s.size()[link /reference/string/basic_string/size.md]

### 出力
```
15
```


## 関連項目
- [C++11 `char16_t`と`char32_t`](char16_32.md)
- [C++17 UTF-8文�リテラル](/lang/cpp17/utf8_character_literals.md)
- [C++20 UTF-8エンコーディングされた文�の型として`char8_t`を追加](/lang/cpp20/char8_t.md)


## 参照
- [N2159 UTF-8 String Literals](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2159.html)
- [N2209 UTF-8 String Literals](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2209.html)
- [N2295 Raw and Unicode String Literals; Unified Proposal](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2295.html)

