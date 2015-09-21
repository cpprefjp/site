#getloc (C++11)
* regex[meta header]
* std[meta namespace]
* regex_traits[meta class]
* function[meta id-type]

```cpp
locale_type getloc() const;
```


##概要
ロケールを取得する。getlocはget localeの略称。


##戻り値
[`imbue()`](./imbue.md)メンバ関数によってすでにロケールオブジェクトが設定されている場合は、そのコピーを返す。そうでない場合、グローバルロケールオブジェクトのコピーを返す。


##例
```cpp
#include <regex>
#include <cassert>

int main()
{
  std::regex_traits<char> traits;

  traits.imbue(std::locale("ja_JP.UTF-8"));
  std::locale loc = traits.getloc();
    
  assert(loc.name() == "ja_JP.UTF-8");
}
```
* std::locale[link /reference/locale/locale.md]
* imbue[link ./imbue.md]
* name()[link /reference/locale/locale/name.md.nolink]
* assert[link /reference/cassert/assert.md.nolink]

###出力
```
```


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++11 mode](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC](/implementation.md#gcc): -
- [GCC, C++11 mode](/implementation.md#gcc): 4.9.0, 4.9.1, 4.9.2, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

