# 変数テンプレートのデフォルトテンプレート引数を許可
* cpp17[meta cpp]

## 概要
C++17では、[変数テンプレート](/lang/cpp14/variable_templates.md)のテンプレートパラメータがデフォルト引数を持てることとなった。


## 例
```cpp
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
