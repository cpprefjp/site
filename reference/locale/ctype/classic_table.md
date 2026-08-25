# classic_table
* locale[meta header]
* std[meta namespace]
* ctype[meta class]
* function[meta id-type]

```cpp
static const mask* classic_table() throw();  // (1) C++98
static const mask* classic_table() noexcept; // (1) C++11
```
* mask[link /reference/locale/ctype_base.md]

## 概要
`"C"`ロケールにおける文字の分類テーブルを取得する。

このメンバ関数は、`ctype<char>`の特殊化にのみ存在する。


## 戻り値
`"C"`ロケールの`ctype`の意味論を実装するのに十分な、`table_size`個の要素を持つ配列の先頭へのポインタを返す。


## 例
```cpp example
#include <iostream>
#include <locale>

int main()
{
  const std::ctype<char>::mask* tbl = std::ctype<char>::classic_table();

  if (tbl == nullptr) {
    std::cout << "no table" << std::endl;
  }
  else {
    // 'a'は英字に分類される
    std::cout << std::boolalpha
              << ((tbl[static_cast<unsigned char>('a')] & std::ctype_base::alpha) != 0)
              << std::endl;
  }
}
```
* classic_table[color ff0000]
* std::ctype[link /reference/locale/ctype.md]
* std::ctype_base::alpha[link /reference/locale/ctype_base.md]

### 出力例
```
true
```

- 規格上はテーブルへの有効なポインタが返るが、一部の環境ではヌルポインタが返り`no table`が出力される（下記の備考を参照）

## バージョン
### 言語
- C++98


### 備考
- macOS上のlibstdc++など、一部の環境では`classic_table()`がヌルポインタを返す


## 関連項目
- [`ctype::table`](table.md)
- [`ctype_base`](/reference/locale/ctype_base.md)
