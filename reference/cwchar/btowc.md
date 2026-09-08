# btowc
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  wint_t btowc(int c);
}
```
* wint_t[link wint_t.md]


## 概要
1バイト文字を、ワイド文字へ変換する。


## 効果
`c`が初期変換状態における1バイトのマルチバイト文字として有効であれば、対応するワイド文字へ変換する。


## 戻り値
変換できた場合はそのワイド文字を[`wint_t`](wint_t.md)型で返す。`c`が`EOF`である場合、または有効な1バイト文字でない場合は`WEOF`を返す。


## 例
```cpp example
#include <cwchar>
#include <iostream>

int main()
{
  std::wcout << (std::btowc('a') == L'a') << std::endl;
  std::wcout << (std::btowc(EOF) == WEOF) << std::endl;
}
```
* std::btowc[color ff0000]
* std::wcout[link /reference/iostream/wcout.md]

### 出力
```
1
1
```


## バージョン
### 言語
- C++98


## 関連項目
- [`wctob`](wctob.md): 逆方向の変換
