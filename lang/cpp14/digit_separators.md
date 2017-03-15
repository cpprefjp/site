# 数値リテラルの桁区切り文字
* cpp14[meta cpp]

## 概要
整数リテラルと浮動小数点数リテラルには、途中にシングルクォーテーション(`'`)を入力することで、値を読みやすくできる。

日本を含む多くの国では、数値を3桁区切りする傾向がある。たとえば、「100万円」を表す場合、`0`を6個入力する必要があるが、`1000000`という数値を見て、即座に`0`の数が6個あることを認識するのは難しい。そういった状況では、「1,000,000円」のように3桁ごとにカンマで区切ることで、数値を読みやすくする工夫が行われる。

C++においては、桁区切り文字としてシングルクォーテーションを使用する。これを使用して「100万円」を入力すると、以下のようになる：

```cpp
int price = 1'000'000; // 100万円
```

また、2進数を入力する場合には、4桁で区切ることで読みやすくできる：

```cpp
int binary_value = 0b1000'1111;
```

桁区切り文字は、数値を読みやすくするためだけにあり、それによる値への影響はない。


## 仕様
- 桁区切り文字(digit separators)は、数値リテラルの読みやすさを向上させるため導入された、数値リテラルの間に挿入することを許可された特殊な文字である
- 桁区切り文字には、シングルクォーテーション(`'`)を使用する
- 桁区切り文字は、整数リテラルと浮動小数点数リテラルに対して使用できる
- 桁区切り文字は、リテラルの先頭に入力することはできない
- 浮動小数点数リテラルでは、小数部にも桁区切り文字を入力できる


## 例
```cpp
#include <iostream>
#include <limits>

int main()
{
  int decimal_value = 123'456;
  std::cout << decimal_value << std::endl;

  int octal_value = 0123'456;
  std::cout << octal_value << std::endl;

  int hex_value = 0x123'456;
  std::cout << hex_value << std::endl;

  int binary_value = 0b1010'1010;
  std::cout << binary_value << std::endl;

  double floating_point_value = 12'345.678'901;
  std::cout.precision(std::numeric_limits<double>::max_digits10);
  std::cout << floating_point_value << std::endl;
}
```
* <limits>[link /reference/limits.md]
* precision[link /reference/ios/ios_base/precision.md]
* std::numeric_limits[link /reference/limits/numeric_limits.md]
* max_digits10[link /reference/limits/numeric_limits/max_digits10.md]

### 出力
```
123456
42798
1193046
170
12345.678900999999
```


## この機能が必要になった背景・経緯
数値の読みにくさについて、以下のような問題があった：

- `7237498123`のような長い値を発音することが難しい
- 2つの値`237498123`と`237499123`が等しいか比較することが難しい
- 2つの値`237499123`と`20249472`のどちらが大きいか判断することが難しい

このような問題に対しては、執筆、活版印刷といった分野において、古くから桁区切り文字(digit separators)による解決が行われてきた。桁区切り文字を使用すれば、先ほどの3つの問題は解決できる：

- 値`7,237,498,123`を発音してみよう
- 2つの値`237,498,123`と`237,499,123`が等しいか比較してみよう
- 2つの値`237,499,123`と`20,249,472`のどちらが大きいか確認してみよう

C++においては、構文の互換性を極力維持するために、複数ある桁区切り文字の選択肢の中から、シングルクォーテーション(`'`)が採用された。これは、上付きカンマと見なせる。


## 検討されたほかの選択肢
### カンマ
桁区切り文字のために、真っ先に検討されたのはカンマ(`,`)である。しかしカンマには、配列リテラルの互換性を破壊する問題がある。たとえば、C++11まで有効だった、`123`、`456`を要素とする配列定義の以下の式が、

```cpp
int ar[] = {123,456}; // スペースを空けずに複数個の要素を記述
```

カンマを桁区切り文字として採用すると、値`123456`を唯一の要素とする配列の定義になってしまう。


### アンダースコア
アンダースコアは、Perl、Ruby、Java 7、Adaといった多くの言語で、桁区切り文字として採用されている。これは文化的な互換性として非常に有力な候補となった。しかし、C++11で導入された[ユーザー定義リテラル](/lang/cpp11/user_defined_literals.md)は、アンダースコアを先頭としたリテラル演算子の定義を許可していたために、アンダースコアを桁区切り文字として採用すると、その互換性が破壊されてしまう。

```cpp
int operator"" _456(unsigned long long int x)
{ return x; }

int x = 123_456; // 値123を表すリテラル
```

C++14という言語バージョンは、C++11の仕様に対するバグ修正を主な目的としている。上記のような数値を含むリテラル演算子を仕様のバグとして、これを許可しない規定を追加することも検討されたが、採用はされなかった。


### それ以外の選択肢
カンマとアンダースコアは互換性を破壊してしまうため、そのほかの以下のような選択肢が検討された：

- スペース `1 048 576`
- グレイヴ・アクセント(バッククォート) <code>1\`048\`576</code>
- シングルクォーテーション `1'048'576`
- ダブルアンダースコア `1__048__576`
- スコープ解決演算子 `1::048::576`
- ダブル小数点 `1..048..576`
- バックスラッシュ `1\048\576`

これらが検討された上で、上付きカンマと見なせるシングルクォーテーション(`'`)が採用された。


## 関連項目
- [C++14 2進数リテラル](binary_literals.md)


## 参照
- [N3499 Digit Separators](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3499.html)
- [N3661 Digit Separators](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3661.html)
- [N3781 Single-Quotation-Mark as a Digit Separator](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3781.pdf)

他言語の桁区切り文字：

- Perl : [Underscores in numbers](http://www.perlmonks.org/?node=72112)
- Ruby : [アンダーバーによる数値の区切り](http://www.rubylife.jp/ini/num/index2.html)
- Java 7 : [Underscores in Numeric Literals](http://docs.oracle.com/javase/7/docs/technotes/guides/language/underscores-literals.html)
- Ada : [Ada '83 Language Reference Manual](http://archive.adaic.com/standards/83lrm/html/lrm-02-04.html#2.4)


