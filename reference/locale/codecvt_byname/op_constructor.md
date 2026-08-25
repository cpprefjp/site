# コンストラクタ
* locale[meta header]
* std[meta namespace]
* codecvt_byname[meta class]
* function[meta id-type]

```cpp
explicit codecvt_byname(const char* name, size_t refs = 0);   // (1) C++98
explicit codecvt_byname(const string& name, size_t refs = 0); // (2) C++98
```
* size_t[link /reference/cstddef/size_t.md]
* string[link /reference/string/basic_string.md]

## 概要
名前で指定したロケールの、文字コード変換ファセットオブジェクトを構築する。

- (1) : ロケール名を`const char*`で受け取る
- (2) : ロケール名を[`string`](/reference/string/basic_string.md)で受け取る


## 効果
- (1) : `name`を名前として[`locale(const char*)`](/reference/locale/locale/op_constructor.md)で構築されるロケールの、[`codecvt`](/reference/locale/codecvt.md)ファセットと等価な仮想関数の意味論を持つよう構築する。`refs`は基底クラスのコンストラクタへ渡される
- (2) : `codecvt_byname(name.c_str(), refs)`と同じ効果を持つ


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
#include <locale>
#include <cwchar>

int main()
{
  // ファセットのデストラクタはprotectedであるため、
  // newで確保してlocaleに所有権を渡す
  std::locale a{std::locale::classic(),
                new std::codecvt_byname<wchar_t, char, std::mbstate_t>{"C"}};

  // 同じ名前で構築したロケール
  std::locale b{"C"};

  using codecvt_t = std::codecvt<wchar_t, char, std::mbstate_t>;

  const auto& fa = std::use_facet<codecvt_t>(a);
  const auto& fb = std::use_facet<codecvt_t>(b);

  // bynameファセットは、同じ名前で構築したロケールのファセットと同じ意味論を持つ
  std::cout << std::boolalpha
            << (fa.always_noconv() == fb.always_noconv()) << std::endl;
}
```
* std::codecvt_byname[color ff0000]
* std::locale[link /reference/locale/locale.md]
* std::locale::classic()[link /reference/locale/locale/classic.md]
* std::use_facet[link /reference/locale/use_facet.md]
* std::codecvt[link /reference/locale/codecvt.md]
* fa.always_noconv()[link /reference/locale/codecvt/always_noconv.md]

### 出力
```
true
```


## バージョン
### 言語
- C++98


## 関連項目
- [`codecvt`](/reference/locale/codecvt.md)
- [`locale`のコンストラクタ](/reference/locale/locale/op_constructor.md)
- [`locale::facet`](/reference/locale/locale/facet.md)
