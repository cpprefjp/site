# holds_alternative
* variant[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class T, class... Types>
  constexpr bool holds_alternative(const variant<Types...>& x) noexcept;
}
```

## 概要
`variant`オブジェクトが指定の候補型を現在保持しているかを判定する。


## 要件
- 型`T`が`Types...`内に一度だけ現れること。そうでない場合、プ�グラムは不適格となる


## 戻り値
型`T`の`Types...`でのインデックスと[`x.index()`](variant/index.md)が�値である場合に`true`を返し、そうでなければ`false`を返す。


## 例
```cpp example
#include <iostream>
#include <variant>

int main()
{
  std::variant<int, char, double> v = 'a';

  if (std::holds_alternative<char>(v)) {
    std::cout << "vはchar型を現在保持している" << std::endl;
  }

  if (!std::holds_alternative<int>(v)) {
    std::cout << "vはint型を現在保持していない" << std::endl;
  }
}
```
* std::holds_alternative[color ff0000]

### 出力
```
vはchar型を現在保持している
vはint型を現在保持していない
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0
- [GCC](/implementation.md#gcc): 7.3
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
