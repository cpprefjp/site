# hash
* locale[meta header]
* std[meta namespace]
* collate[meta class]
* function[meta id-type]

```cpp
long hash(const charT* low, const charT* high) const; // (1) C++98
```

## 概要
文字範囲のハッシュ値を求める。


## 戻り値
[`do_hash(low, high)`](do_hash.md)


## 例
```cpp example
#include <iostream>
#include <locale>

int main()
{
  const auto& col = std::use_facet<std::collate<char>>(std::locale::classic());

  const char a[] = "abc";

  // 同じ文字列に対しては同じハッシュ値が得られる
  std::cout << std::boolalpha << (col.hash(a, a + 3) == col.hash(a, a + 3)) << std::endl;
}
```
* hash[color ff0000]
* std::collate[link /reference/locale/collate.md]
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
- [`collate::do_hash`](do_hash.md)
