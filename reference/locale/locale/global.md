# global
* locale[meta header]
* std[meta namespace]
* locale[meta class]
* function[meta id-type]

```cpp
static locale global(const locale& loc); // (1) C++03
```

## 概要
グローバルロケールを設定する。

この関数は、C++のグローバルロケールを`loc`に設定する。さらに、`loc`が名前を持つ場合は、C言語の[`std::setlocale`](/reference/clocale/setlocale.md)`(LC_ALL, loc.`[`name`](name.md)`().c_str())`を呼び出したのと同じ効果を持つ。そうでない場合、C言語のロケールへの影響は処理系定義である。


## 戻り値
この関数を呼び出す前のグローバルロケール。


## 備考
グローバルロケールを設定しても、既に構築済みの`locale`オブジェクトや、既にストリームに`imbue`されているロケールには影響しない。デフォルトコンストラクタで構築される`locale`は、この関数で設定されたグローバルロケールのコピーとなる。


## 例
```cpp example
#include <iostream>
#include <locale>

int main()
{
  // グローバルロケールをCロケールに設定し、以前のグローバルロケールを取得する
  std::locale prev = std::locale::global(std::locale::classic());

  // 以降、デフォルト構築されるlocaleは"C"ロケールのコピーとなる
  std::locale current;
  std::cout << current.name() << std::endl;
}
```
* std::locale::global[color ff0000]
* classic()[link classic.md]
* current.name()[link name.md]

### 出力
```
C
```


## バージョン
### 言語
- C++03


## 関連項目
- [`locale::classic`](classic.md)
- [`locale::name`](name.md)
- [`setlocale`](/reference/clocale/setlocale.md)
