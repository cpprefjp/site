# imbue
* regex[meta header]
* std[meta namespace]
* regex_traits[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
locale_type imbue(locale_type loc);
```


## 概要
�ケールを�定する。


## 効果
パラメータ`loc`のコピーを`*this`に保持する。


## 戻り値
この関数を呼び出す前に�定されている�ケールオブジェクトがある場合は、そのコピーを返す。そうでない場合、グ�ーバル�ケールオブジェクトのコピーを返す。


## 例
```cpp example
#include <regex>

int main()
{
  std::regex_traits<char> traits;

  std::locale loc("ja_JP.UTF-8");
  traits.imbue(loc);
}
```
* imbue[color ff0000]
* std::locale[link /reference/locale/locale.md]

### 出力
```
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): -
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC](/implementation.md#gcc): 4.9.0, 4.9.1, 4.9.2, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

