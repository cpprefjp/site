# 変数テンプレートのデフォルトテンプレート引数を許可
* cpp17[meta cpp]

<!-- start lang caution -->

このページはC++17に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++17では、[変数テンプレート](/lang/cpp14/variable_templates.md)のテンプレートパラメータがデフォルト引数を持てることとなった。


## 例
```cpp example
#include <iostream>

// x変数テンプレートは、テンプレートパラメータTの
// デフォルトテンプレート引数としてintを持つ
template <class T=int>
T x = T();

int main()
{
  int y = x<>;
  std::cout << y << std::endl;
}
```

### 出力
```
0
```


## 参照
- [CWG Issue 2032. Default template-arguments of variable templates](https://wg21.cmeerw.net/cwg/issue2032)