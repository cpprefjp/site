# コンストラクタ
* locale[meta header]
* std[meta namespace]
* num_get[meta class]
* function[meta id-type]

```cpp
explicit num_get(size_t refs = 0);
```

## 概要
`num_get`ファセットオブジェクトを構築する。


## 効果
基底クラスを[`locale::facet`](/reference/locale/locale/facet.md)`(refs)`で初期化する。


## 備考
`refs`は、このファセットの参照カウントの初期値である。

- `refs == 0`の場合、このファセットを保持する[`locale`](/reference/locale/locale.md)オブジェクトが破棄されるとき、ファセットも破棄される
- `refs == 1`の場合、[`locale`](/reference/locale/locale.md)オブジェクトの破棄によってファセットが破棄されることはない。ファセットの寿命を利用者が管理する場合に使用する


## 例
```cpp example
#include <iostream>
#include <locale>
#include <sstream>
#include <iterator>

// num_getを継承して、独自のファセットを定義する
struct my_num_get : std::num_get<char> {
  // 基底クラスのコンストラクタに参照カウントを渡す
  explicit my_num_get(std::size_t refs = 0)
    : std::num_get<char>(refs) {}
};

int main()
{
  std::istringstream iss{"42"};

  // 独自ファセットを設定したロケールを構築する
  std::locale loc{iss.getloc(), new my_num_get{}};
  iss.imbue(loc);

  long value = 0;
  iss >> value;

  std::cout << value << std::endl;
}
```
* std::num_get[link /reference/locale/num_get.md]
* std::locale[link /reference/locale/locale.md]
* iss.getloc()[link /reference/ios/ios_base/getloc.md]
* iss.imbue[link /reference/ios/basic_ios/imbue.md]

### 出力
```
42
```

## バージョン
### 言語
- C++98


## 関連項目
- [`locale::facet`](/reference/locale/locale/facet.md)
- [`num_get::get`](get.md)
