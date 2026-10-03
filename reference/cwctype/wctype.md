# wctype
* cwctype[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  wctype_t wctype(const char* property);
}
```
* wctype_t[link wctype_t.md]


## 概要
種別の名前から、[`iswctype()`](iswctype.md)に渡す種別の値を取得する。

種別の名前は、現在のロケールの[`LC_CTYPE`](/reference/clocale/lc_ctype.md)カテゴリが定義する。`"alnum"`・`"alpha"`・`"blank"`・`"cntrl"`・`"digit"`・`"graph"`・`"lower"`・`"print"`・`"punct"`・`"space"`・`"upper"`・`"xdigit"`はどのロケールでも有効であり、それぞれ[`iswalnum()`](iswalnum.md)などの関数と同じ判定になる。


## 戻り値
`property`に対応する種別を表す[`wctype_t`](wctype_t.md)型の値。現在のロケールが`property`という名前の種別を定義していない場合は`0`を返す。


## 例
```cpp example
#include <cwctype>
#include <iostream>

int main()
{
  std::cout << std::boolalpha;

  // 有効な種別名からは0以外の値が得られる
  std::cout << (std::wctype("digit") != 0) << std::endl;

  // 定義されていない種別名に対しては0を返す
  std::cout << (std::wctype("nonexistent") != 0) << std::endl;
}
```
* std::wctype[color ff0000]

### 出力
```
true
false
```


## バージョン
### 言語
- C++98


## 関連項目
- [`iswctype`](iswctype.md)
- [`wctype_t`](wctype_t.md)
- [`wctrans`](wctrans.md)
