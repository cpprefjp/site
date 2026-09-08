# wctob
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int wctob(wint_t c);
}
```
* wint_t[link wint_t.md]


## 概要
ワイド文字を、1バイト文字へ変換する。


## 効果
`c`が初期変換状態において1バイトのマルチバイト文字として表現できる場合、そのバイト値へ変換する。


## 戻り値
変換できた場合はそのバイト値を`unsigned char`から`int`へ変換した値を返す。表現できない場合は`EOF`を返す。


## 例
```cpp example
#include <cwchar>
#include <iostream>

int main()
{
  std::wcout << (std::wctob(L'a') == 'a') << std::endl;
}
```
* std::wctob[color ff0000]
* std::wcout[link /reference/iostream/wcout.md]

### 出力
```
1
```


## バージョン
### 言語
- C++98


## 関連項目
- [`btowc`](btowc.md): 逆方向の変換
