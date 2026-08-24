# name
* locale[meta header]
* std[meta namespace]
* locale[meta class]
* function[meta id-type]

```cpp
string name() const; // (1) C++03
```
* string[link /reference/string/basic_string.md]

## 概要
ロケールの名前を取得する。


## 戻り値
`*this`が名前を持つ場合、その名前を表す文字列を返す。名前を持たない場合、`"*"`を返す。


## 例
```cpp example
#include <iostream>
#include <locale>

int main()
{
  std::locale c = std::locale::classic();
  std::cout << c.name() << std::endl;

  // ファセットを差し替えたロケールは名前を持たない
  std::locale unnamed(c, new std::ctype<char>);
  std::cout << unnamed.name() << std::endl;
}
```
* c.name()[color ff0000]
* unnamed.name()[color ff0000]
* classic()[link classic.md]
* std::ctype[link ../ctype.md]

### 出力
```
C
*
```


## バージョン
### 言語
- C++03


## 関連項目
- [`locale::classic`](classic.md)
- [`locale::global`](global.md)


## 参照
- [LWG Issue 2394. `locale::name` specification unclear — what is implementation-defined?](https://cplusplus.github.io/LWG/issue2394)
    - 「名前を持つ場合`locale(name().c_str())`は`*this`と等価である」「文字列の内容の詳細はそれ以外は処理系定義」という文言が削除され、戻り値は「名前があればその名前、なければ`"*"`」のみの規定となった
    - この修正は欠陥報告(DR)であり、C++98に遡及して適用される。戻り値は最初の一文で既に完全に規定されており、何が処理系定義なのか不明瞭だった冗長な記述の削除であって、処理系の挙動は変わらないため
