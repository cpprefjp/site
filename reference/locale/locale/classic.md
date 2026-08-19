# classic
* locale[meta header]
* std[meta namespace]
* locale[meta class]
* function[meta id-type]

```cpp
static const locale& classic(); // (1) C++03
```

## 概要
Cロケール（"C"ロケール）を表す`locale`オブジェクトを取得する。

Cロケールは、C言語の標準ロケールに相当する、移植性のある既定のロケールである。


## 戻り値
"C"ロケールを表す`locale`オブジェクトへの参照。


## 例外
投げない。


## 例
```cpp example
#include <iostream>
#include <locale>

int main()
{
  std::locale c = std::locale::classic();
  std::cout << c.name() << std::endl;
}
```
* classic()[color ff0000]
* c.name()[link name.md]

### 出力
```
C
```


## バージョン
### 言語
- C++03


## 関連項目
- [`locale::global`](global.md)
- [`locale::name`](name.md)
