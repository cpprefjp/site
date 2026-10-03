# wctrans
* cwctype[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  wctrans_t wctrans(const char* property);
}
```
* wctrans_t[link wctrans_t.md]


## 概要
変換規則の名前から、[`towctrans()`](towctrans.md)に渡す変換規則の値を取得する。

変換規則の名前は、現在のロケールの[`LC_CTYPE`](/reference/clocale/lc_ctype.md)カテゴリが定義する。`"tolower"`と`"toupper"`はどのロケールでも有効であり、それぞれ[`towlower()`](towlower.md)・[`towupper()`](towupper.md)と同じ変換になる。


## 戻り値
`property`に対応する変換規則を表す[`wctrans_t`](wctrans_t.md)型の値。現在のロケールが`property`という名前の変換規則を定義していない場合は`0`を返す。


## 例
```cpp example
#include <cwctype>
#include <iostream>

int main()
{
  std::cout << std::boolalpha;

  // 有効な変換規則名からは0以外の値が得られる
  std::cout << (std::wctrans("toupper") != 0) << std::endl;

  // 定義されていない変換規則名に対しては0を返す
  std::cout << (std::wctrans("nonexistent") != 0) << std::endl;
}
```
* std::wctrans[color ff0000]

### 出力
```
true
false
```


## バージョン
### 言語
- C++98


## 関連項目
- [`towctrans`](towctrans.md)
- [`wctrans_t`](wctrans_t.md)
- [`wctype`](wctype.md)
