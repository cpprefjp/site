# unshift
* locale[meta header]
* std[meta namespace]
* codecvt[meta class]
* function[meta id-type]

```cpp
result
  unshift(stateT& state,
          externT* to,
          externT* to_end,
          externT*& to_next) const; // (1) C++98
```

## 概要
文字列を終端するために必要な、シフト状態を戻す文字列を出力する。


## 戻り値
[`do_unshift(state, to, to_end, to_next)`](do_unshift.md)


## 例
```cpp example
#include <iostream>
#include <locale>
#include <cwchar>

int main()
{
  using codecvt_t = std::codecvt<wchar_t, char, std::mbstate_t>;
  const auto& cv = std::use_facet<codecvt_t>(std::locale::classic());

  char to[8] = {};

  std::mbstate_t state{};
  char* to_next = nullptr;

  codecvt_t::result r = cv.unshift(state, to, to + 8, to_next);

  // "C"ロケールは状態依存のエンコーディングではないため、終端処理は失敗しない
  // 終端文字を出力する場合はok、出力するものが無い場合はnoconvが返る
  std::cout << std::boolalpha
            << (r == codecvt_t::ok || r == codecvt_t::noconv) << std::endl;
}
```
* unshift[color ff0000]
* std::codecvt[link /reference/locale/codecvt.md]
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
- [`codecvt::do_unshift`](do_unshift.md)
- [`codecvt_base`](/reference/locale/codecvt_base.md)
