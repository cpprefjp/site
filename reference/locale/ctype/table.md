# table
* locale[meta header]
* std[meta namespace]
* ctype[meta class]
* function[meta id-type]

```cpp
const mask* table() const throw();  // (1) C++98
const mask* table() const noexcept; // (1) C++11
```
* mask[link /reference/locale/ctype_base.md]

## 概要
文字の分類テーブルを取得する。

このメンバ関数は、`ctype<char>`の特殊化にのみ存在する。


## 戻り値
コンストラクタの第1引数が非ヌルポインタであった場合はその値、そうでない場合は[`classic_table()`](classic_table.md)を返す。


## 備考
`ctype<char>`のメンバ関数は、この配列を索くことで文字の分類を判定する。添字は`unsigned char`へキャストした文字の値である。

`v >= table_size`であるような`unsigned char`の値`v`について、`table()[v]`は配列の索引を行わずに処理系固有の値を持つものと仮定される。


## 例
```cpp example
#include <iostream>
#include <locale>

int main()
{
  const auto& ct = std::use_facet<std::ctype<char>>(std::locale::classic());

  const std::ctype<char>::mask* tbl = ct.table();

  if (tbl == nullptr) {
    std::cout << "no table" << std::endl;
  }
  else {
    // '5'は数字に分類される
    std::cout << std::boolalpha
              << ((tbl[static_cast<unsigned char>('5')] & std::ctype_base::digit) != 0)
              << std::endl;
  }
}
```
* table[color ff0000]
* std::ctype[link /reference/locale/ctype.md]
* std::ctype_base::digit[link /reference/locale/ctype_base.md]
* std::use_facet[link /reference/locale/use_facet.md]
* std::locale::classic()[link /reference/locale/locale/classic.md]

### 出力例
```
true
```

- 規格上はテーブルへの有効なポインタが返るが、一部の環境ではヌルポインタが返り`no table`が出力される（下記の備考を参照）

## バージョン
### 言語
- C++98


### 備考
- macOS上のlibstdc++など、一部の環境では`table()`と[`classic_table()`](classic_table.md)がヌルポインタを返す


## 関連項目
- [`ctype::classic_table`](classic_table.md)
- [`ctype_base`](/reference/locale/ctype_base.md)
- [`ctype::is`](is.md)
