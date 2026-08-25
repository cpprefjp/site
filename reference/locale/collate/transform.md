# transform
* locale[meta header]
* std[meta namespace]
* collate[meta class]
* function[meta id-type]

```cpp
string_type transform(const charT* low, const charT* high) const; // (1) C++98
```

## 概要
文字の範囲を、照合順序での比較に使用できる文字列へ変換する。


## 戻り値
[`do_transform(low, high)`](do_transform.md)


## 備考
変換後の文字列同士を辞書順で比較した結果は、変換前の文字列同士を[`compare()`](compare.md)で比較した結果と一致する。同じ文字列を何度も比較する場合、あらかじめ変換しておくことで比較のコストを下げられる。


## 例
```cpp example
#include <iostream>
#include <locale>
#include <string>

int main()
{
  const auto& col = std::use_facet<std::collate<char>>(std::locale::classic());

  const char a[] = "abc";
  const char b[] = "abd";

  std::string ka = col.transform(a, a + 3);
  std::string kb = col.transform(b, b + 3);

  // 変換後の文字列の辞書順比較は、compare()の結果と一致する
  std::cout << std::boolalpha << ((ka < kb) == (col.compare(a, a + 3, b, b + 3) < 0)) << std::endl;
}
```
* transform[color ff0000]
* std::collate[link /reference/locale/collate.md]
* col.compare[link compare.md]
* std::use_facet[link /reference/locale/use_facet.md]
* std::locale::classic()[link /reference/locale/locale/classic.md]

### 出力
```
true
```

## バージョン
### 言語
- C++98


## 関連項目
- [`collate::do_transform`](do_transform.md)
- [`collate::compare`](compare.md)
