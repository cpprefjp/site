# compare
* locale[meta header]
* std[meta namespace]
* collate[meta class]
* function[meta id-type]

```cpp
int compare(const charT* low1, const charT* high1,
            const charT* low2, const charT* high2) const; // (1) C++98
```

## 概要
文字列を比較する。範囲`[low1, high1)`と範囲`[low2, high2)`の文字列を、ロケールの照合順序で比較する。


## 戻り値
[`do_compare(low1, high1, low2, high2)`](do_compare.md)


## 例
```cpp example
#include <iostream>
#include <locale>

int main()
{
  const auto& col = std::use_facet<std::collate<char>>(std::locale::classic());

  const char a[] = "abc";
  const char b[] = "abd";

  std::cout << col.compare(a, a + 3, b, b + 3) << std::endl;
  std::cout << col.compare(b, b + 3, a, a + 3) << std::endl;
  std::cout << col.compare(a, a + 3, a, a + 3) << std::endl;
}
```
* compare[color ff0000]
* std::collate[link /reference/locale/collate.md]
* std::use_facet[link /reference/locale/use_facet.md]
* std::locale::classic()[link /reference/locale/locale/classic.md]

### 出力
```
-1
1
0
```

## バージョン
### 言語
- C++98


## 関連項目
- [`collate::do_compare`](do_compare.md)
- [`locale::operator()`](/reference/locale/locale/op_call.md)
