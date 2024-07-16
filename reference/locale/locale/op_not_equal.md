# operator!=
* locale[meta header]
* std[meta namespace]
* locale[meta class]
* function[meta id-type]

```cpp
// operator==により、以下のオーバーロードが使用可能になる (C++20)
bool operator!=(const locale& other) const; // (1) C++03
```

## 概要
`locale`オブジェクトの非等値比較を行う。


## 戻り値
```cpp
return !(*this == other);
```

## 例
```cpp
#include <cassert>
#include <locale>

int main()
{
  std::locale a = std::locale::classic();
  std::locale b = std::locale::classic();
  std::locale c("");

  assert(!(a != b));
  assert(a != c);
}
```

### 出力
```
```

## 参照
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
