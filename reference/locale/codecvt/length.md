# length
* locale[meta header]
* std[meta namespace]
* codecvt[meta class]
* function[meta id-type]

```cpp
int
  length(stateT& state,
         const externT* from,
         const externT* from_end,
         size_t max) const; // (1) C++98
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
内部型文字列への変換で消費される外部型文字列の長さを取得する。


## 戻り値
[`do_length(state, from, from_end, max)`](do_length.md)


## 例
```cpp example
#include <iostream>
#include <locale>
#include <cwchar>

int main()
{
  using codecvt_t = std::codecvt<wchar_t, char, std::mbstate_t>;
  const auto& cv = std::use_facet<codecvt_t>(std::locale::classic());

  const char from[] = "abc";
  std::mbstate_t state{};

  // 内部型で2文字を得るために消費する外部型の文字数
  std::cout << cv.length(state, from, from + 3, 2) << std::endl;
}
```
* length[color ff0000]
* std::codecvt[link /reference/locale/codecvt.md]
* std::use_facet[link /reference/locale/use_facet.md]
* std::locale::classic()[link /reference/locale/locale/classic.md]

### 出力
```
2
```

## バージョン
### 言語
- C++98


## 関連項目
- [`codecvt::do_length`](do_length.md)
- [`codecvt::max_length`](max_length.md)
