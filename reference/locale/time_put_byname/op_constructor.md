# コンストラクタ
* locale[meta header]
* std[meta namespace]
* time_put_byname[meta class]
* function[meta id-type]

```cpp
explicit time_put_byname(const char* name, size_t refs = 0);   // (1) C++98
explicit time_put_byname(const string& name, size_t refs = 0); // (2) C++98
```
* size_t[link /reference/cstddef/size_t.md]
* string[link /reference/string/basic_string.md]

## 概要
名前で指定したロケールの、日時の出力ファセットオブジェクトを構築する。

- (1) : ロケール名を`const char*`で受け取る
- (2) : ロケール名を[`string`](/reference/string/basic_string.md)で受け取る


## 効果
- (1) : `name`を名前として[`locale(const char*)`](/reference/locale/locale/op_constructor.md)で構築されるロケールの、[`time_put`](/reference/locale/time_put.md)ファセットと等価な仮想関数の意味論を持つよう構築する。`refs`は基底クラスのコンストラクタへ渡される
- (2) : `time_put_byname(name.c_str(), refs)`と同じ効果を持つ


## 例外
`name`が妥当なロケール名でない場合、もしくはヌルポインタである場合、[`std::runtime_error`](/reference/stdexcept.md)を送出する。


## 備考
`refs`は、このファセットの参照カウントの初期値である。

- `refs == 0`の場合、このファセットを保持する[`locale`](/reference/locale/locale.md)オブジェクトが破棄されるとき、ファセットも破棄される
- `refs == 1`の場合、[`locale`](/reference/locale/locale.md)オブジェクトの破棄によってファセットが破棄されることはない

妥当なロケール名は処理系定義である。`"C"`と、処理系のネイティブロケールを表す空文字列`""`は、すべての処理系でサポートされる。

## 例
```cpp example
#include <iostream>
#include <sstream>
#include <locale>
#include <iterator>
#include <ctime>

std::string format(const std::locale& loc)
{
  std::ostringstream oss;
  oss.imbue(loc);

  std::tm t{};
  t.tm_year = 126; // 2026年

  const auto& facet = std::use_facet<std::time_put<char>>(loc);
  facet.put(std::ostreambuf_iterator<char>{oss}, oss, ' ', &t, 'Y');

  return oss.str();
}

int main()
{
  // ファセットのデストラクタはprotectedであるため、
  // newで確保してlocaleに所有権を渡す
  std::locale a{std::locale::classic(), new std::time_put_byname<char>{"C"}};

  // 同じ名前で構築したロケール
  std::locale b{"C"};

  // bynameファセットは、同じ名前で構築したロケールのファセットと同じ意味論を持つ
  std::cout << std::boolalpha << (format(a) == format(b)) << std::endl;
}
```
* std::time_put_byname[color ff0000]
* std::locale[link /reference/locale/locale.md]
* std::locale::classic()[link /reference/locale/locale/classic.md]
* std::use_facet[link /reference/locale/use_facet.md]
* std::time_put[link /reference/locale/time_put.md]
* facet.put[link /reference/locale/time_put/put.md]
* oss.imbue[link /reference/ios/basic_ios/imbue.md]
* std::ostreambuf_iterator[link /reference/iterator/ostreambuf_iterator.md]
* oss.str()[link /reference/sstream/basic_ostringstream/str.md]
* std::tm[link /reference/ctime/tm.md]

### 出力
```
true
```

## バージョン
### 言語
- C++98


## 関連項目
- [`time_put`](/reference/locale/time_put.md)
- [`locale`のコンストラクタ](/reference/locale/locale/op_constructor.md)
- [`locale::facet`](/reference/locale/locale/facet.md)
