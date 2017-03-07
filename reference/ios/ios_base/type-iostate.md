#iostate
* ios[meta header]
* type-alias[meta id-type]
* std[meta namespace]
* ios_base[meta class]

```cpp
using iostate = T2;
```
* T2[italic]

*`T2`* は処理系定義の型。

##概要
`iostate` はストリームの状態に関するフラグを保持するためのビットマスク型である。  
`iostate` には以下の表のようなビットマスク値が存在し、全て [`ios_base`](../ios_base.md) の静的メンバ定数として定義されている。

| 定数 | 設定された場合の効果 |
|------|----------------------|
| `badbit`  | 入出力シーケンスの整合性が失われた事を示す。（ファイルからの回復不能な読み込みエラーなど） |
| `eofbit`  | 入力操作において、入力シーケンスの最後に到達した事を示す。 |
| `failbit` | 入力操作において想定した文字の読み込みに失敗した、あるいは、出力操作において要求した文字の生成に失敗した、といった事を示す。 |


また、上記に加えて、上記のいずれも発生していない事を示す、値ゼロの `goodbit` も [`ios_base`](../ios_base.md) の静的メンバ定数として定義されている。


##備考
通常はこれらのフラグを直接使用することはあまり無く、サブクラスの [`basic_ios`](../basic_ios.md) に存在する対応する状態チェック用関数を使用することが一般的である。  
ただし、[`fail`](../basic_ios/fail.md)`()` はその名前に反して（？）`failbit` と `badbit` のいずれかがセットされていれば `true` を返す事に注意が必要。


##例
```cpp
#include <iostream>
#include <sstream>
#include <string>

void printstate(std::ios_base::iostate state)
{
  std::cout << std::boolalpha;
  std::cout << "badbit  = " << ((state & std::ios_base::badbit) != 0) << '\n';
  std::cout << "eofbit  = " << ((state & std::ios_base::eofbit) != 0) << '\n';
  std::cout << "failbit = " << ((state & std::ios_base::failbit) != 0) << "\n\n";
}

int main()
{
  std::istringstream iss("abc");
  int i;
  iss >> i;
  printstate(iss.rdstate());

  iss.clear();
  std::string s;
  iss >> s;
  printstate(iss.rdstate());

  iss.clear();
  iss.putback('d');
  printstate(iss.rdstate());
}
```
* std::istringstream[link ../../sstream/basic_istringstream.md]
* std::ios_base[link ../ios_base.md]
* iostate[color ff0000]
* badbit[color ff0000]
* eofbit[color ff0000]
* failbit[color ff0000]
* rdstate()[link ../basic_ios/rdstate.md]
* clear()[link ../basic_ios/clear.md]
* putback[link ../../istream/basic_istream/putback.md]

###出力
```
badbit  = false
eofbit  = false
failbit = true

badbit  = false
eofbit  = true
failbit = false

badbit  = true
eofbit  = false
failbit = false

```


##バージョン
##言語
- C++98

###処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5.0, 3.6.0, 3.7.0, 3.8.0
- [GCC](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0, 4.9.1, 4.9.2, 5.1.0, 5.2.0, 6.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


##参照
- [`basic_ios`](../basic_ios.md)`::`[`operator bool`](../basic_ios/op_bool.md)`()`
- [`basic_ios`](../basic_ios.md)`::`[`operator!`](../basic_ios/op_not.md)`()`
- [`basic_ios`](../basic_ios.md)`::`[`rdstate`](../basic_ios/rdstate.md)`()`
- [`basic_ios`](../basic_ios.md)`::`[`clear`](../basic_ios/clear.md)`()`
- [`basic_ios`](../basic_ios.md)`::`[`setstate`](../basic_ios/setstate.md)`()`
- [`basic_ios`](../basic_ios.md)`::`[`good`](../basic_ios/good.md)`()`
- [`basic_ios`](../basic_ios.md)`::`[`eof`](../basic_ios/eof.md)`()`
- [`basic_ios`](../basic_ios.md)`::`[`fail`](../basic_ios/fail.md)`()`
- [`basic_ios`](../basic_ios.md)`::`[`bad`](../basic_ios/bad.md)`()`
- [`basic_ios`](../basic_ios.md)`::`[`exceptions`](../basic_ios/exceptions.md)`()`
