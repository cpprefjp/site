# iswgraph
* cwctype[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int iswgraph(wint_t wc);
}
```
* wint_t[link /reference/cwchar/wint_t.md]


## 概要
ワイド文字`wc`が空白を除く表示文字であるかを判定する。判定は、ロケールの[`LC_CTYPE`](/reference/clocale/lc_ctype.md)カテゴリの影響を受ける。


## 戻り値
`wc`が空白を除く表示文字であると判定されれば非ゼロの値を、そうでなければ`0`を返す。


## 例
```cpp example
#include <cwctype>
#include <iostream>

int main()
{
  std::cout << std::boolalpha;
  std::cout << (std::iswgraph(L'a') != 0) << std::endl;
  std::cout << (std::iswgraph(L' ') != 0) << std::endl;
}
```
* std::iswgraph[color ff0000]

### 出力
```
true
false
```


## バージョン
### 言語
- C++98


## 関連項目
- [`isgraph`](/reference/cctype/isgraph.md) : 1バイト文字に対する同じ判定
- [`iswctype`](iswctype.md) : 種別を実行時に指定して判定する
