# operator==
* locale[meta header]
* std[meta namespace]
* locale[meta class]
* function[meta id-type]

```cpp
bool operator==(const locale& other) const; // (1) C++03
```

## 概要
`locale`オブジェクトの等値比較を行う。


## 戻り値
両方が同じロケールである場合、または一方が他方のコピーである場合、またはそれぞれに名前があり、名前が同一である場合は`true`、それ以外の場合は`false`を返す。


## 例
```cpp
#include <cassert>
#include <locale>

int main()
{
  std::locale a = std::locale::classic();
  std::locale b = std::locale::classic();
  std::locale c("");

  assert(a == b);
  assert(!(a == c));
}
```

### 出力
```
```
